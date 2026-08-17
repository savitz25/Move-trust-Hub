import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { Client } from "pg";
import { loadEnvLocal } from "../../../lib/verification/load-env-local";
import { fetchCarrierByDot } from "../../../lib/fmcsa/refresh/fetch-carrier-core";
import { databaseUrl, ssl } from "../db/connection";
import { assertOperationsAuthorization } from "../../../lib/move-v2/evidence-operations/authorization";
type Provider = {
  providerId: string;
  state: "FL" | "WA";
  displayName: string;
  legalName: string;
  dbaName: string | null;
  usdot: string | null;
  authorityNumber: string;
  authorityStatus: string;
  locationStatus: "VERIFIED" | "LOCATION_REVIEW";
  latitude: number | null;
  longitude: number | null;
  website: string | null;
  locationDecision: { observations: unknown[] };
  serviceEvidence: unknown[];
  phone: string | null;
};
const ids = [
  "72ce5037-b67d-5e2e-9c69-79b15685ecea",
  "52692620-1382-5ab6-bbf7-b97443278e19",
  "8d07756f-d8cb-5249-87a0-aae21d883a4c",
  "8121ce9c-dde1-5ddb-ab3d-1e4c2060ea8e",
  "ffe23473-d4f7-5d7e-9ecb-3b7ec2e1812e",
  "7c9de215-4fb6-53a7-bdfa-4f8eff4564da",
  "6b894502-b9be-5c7c-8c04-8db4e4528e2a",
  "2d727c1e-87a5-5da9-b240-bc2ccc5c18e5",
];
const waNodes: Record<string, string> = {
  "ffe23473-d4f7-5d7e-9ecb-3b7ec2e1812e": "50219",
  "7c9de215-4fb6-53a7-bdfa-4f8eff4564da": "46379",
  "6b894502-b9be-5c7c-8c04-8db4e4528e2a": "43780",
  "2d727c1e-87a5-5da9-b240-bc2ccc5c18e5": "42437",
};
const sha = (x: unknown) =>
  createHash("sha256").update(JSON.stringify(x)).digest("hex");
const uuid = (x: string) => {
  const h = sha(x);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
};
async function http(url: string) {
  const started = Date.now();
  try {
    const r = await fetch(url, {
      headers: { "user-agent": "MoveTrustHub/2.0 bounded evidence refresh" },
      signal: AbortSignal.timeout(20000),
    });
    const body = await r.text();
    return {
      status: r.ok ? "SUCCESS" : "REFRESH_FAILED",
      http: r.status,
      elapsedMs: Date.now() - started,
      bodyHash: sha(body),
      bytes: body.length,
      title: body.match(/<title[^>]*>([^<]+)/i)?.[1]?.trim() ?? null,
    };
  } catch (e) {
    return {
      status: "SOURCE_UNAVAILABLE",
      http: null,
      elapsedMs: Date.now() - started,
      bodyHash: null,
      bytes: 0,
      error: e instanceof Error ? e.name : "Error",
    };
  }
}
async function main() {
  loadEnvLocal();
  assertOperationsAuthorization(process.env.ADMIN_SECRET);
  const all = JSON.parse(
    readFileSync("lib/move-v2/consumer-discovery/release-v2.json", "utf8"),
  ).providers as Provider[];
  const providers = ids
    .map((id) => all.find((p) => p.providerId === id))
    .filter((p): p is Provider => Boolean(p));
  if (providers.length !== 8) throw new Error("Pilot selection incomplete");
  const c = new Client({ connectionString: databaseUrl(), ssl });
  await c.connect();
  const results: Array<Record<string, unknown>> = [];
  try {
    const target = await c.query(
      `select current_database() db,(select count(*)::int from move_v2.provider) providers,(select count(*)::int from public.move_v2_review_case) reviews`,
    );
    const existing = await c.query(
      `select provider_id from move_v2.provider where provider_id=any($1::uuid[])`,
      [ids],
    );
    if (existing.rowCount !== 8)
      throw new Error("Pilot providers not present in Move V2 spine");
    const checkpoint = {
      at: new Date().toISOString(),
      databaseProjectRef: "arepfylnilkjmyduhwbz",
      databaseName: target.rows[0].db,
      providerCount: target.rows[0].providers,
      reviewCount: target.rows[0].reviews,
      v1Guard: "forbidden project uvqkyupfnpswdozmuzih not targeted",
    };
    const jobFp = sha({
      task: "011",
      ids,
      sources: ["FMCSA", "FL", "WA", "WEBSITE", "SERVICE"],
    });
    const job = await c.query(
      `insert into public.move_v2_refresh_job(job_type,mode,status,input_fingerprint,checkpoint)values('FMCSA_FRESHNESS','PREVIEW','PENDING',$1,$2)on conflict(input_fingerprint)do update set updated_at=move_v2_refresh_job.updated_at returning *`,
      [jobFp, { cursor: 0, limit: 8 }],
    );
    const jobId = job.rows[0].id;
    let cursor = Number(job.rows[0].checkpoint.cursor ?? 0);
    const key = process.env.FMCSA_WEB_KEY?.trim();
    if (!key) throw new Error("FMCSA key missing");
    for (let i = cursor; i < providers.length; i++) {
      const p = providers[i];
      let fmcsa: Record<string, unknown>;
      const started = Date.now();
      try {
        const x = await fetchCarrierByDot(p.usdot!, key);
        fmcsa = {
          status: x ? "SUCCESS" : "SOURCE_UNAVAILABLE",
          elapsedMs: Date.now() - started,
          usdot: p.usdot,
          legalName: x?.legalName ?? null,
          dbaName: x?.dbaName ?? null,
          allowedToOperate: x?.allowedToOperate ?? null,
          powerUnits: x?.totalPowerUnits ?? null,
          drivers: x?.totalDrivers ?? null,
        };
      } catch (e) {
        fmcsa = {
          status: "REFRESH_FAILED",
          elapsedMs: Date.now() - started,
          error: e instanceof Error ? e.name : "Error",
        };
      }
      const stateUrl =
        p.state === "FL"
          ? `https://csapp.fdacs.gov/CSPublicApp/BusinessSearch/BusinessSearch.aspx?program=IM`
          : `https://www.utc.wa.gov/company/${waNodes[p.providerId]}`;
      const state = await http(stateUrl);
      const website = p.website
        ? await http(p.website)
        : { status: "NO_CHANGE", elapsedMs: 0, reason: "no validated website" };
      const observations = [
        { source: "FMCSA", reference: `USDOT ${p.usdot}`, value: fmcsa },
        {
          source:
            p.state === "FL" ? "FL_STATE_AUTHORITY" : "WA_STATE_AUTHORITY",
          reference: stateUrl,
          value: state,
        },
        ...(p.website
          ? [
              {
                source: "WEBSITE_VALIDATION",
                reference: p.website,
                value: website,
              },
              {
                source: "WEBSITE_SERVICE_GEOGRAPHY",
                reference: p.website,
                value: { ...website, priorClaims: p.serviceEvidence.length },
              },
            ]
          : []),
      ];
      const stored = [];
      for (const o of observations) {
        const fp = sha(o.value);
        const q = await c.query(
          `insert into move_v2.refresh_observation(provider_id,source,source_reference,observed_at,source_status,evidence_fingerprint,observation,job_id)values($1,$2,$3,now(),$4,$5,$6,$7)on conflict(provider_id,source,evidence_fingerprint)do nothing returning refresh_observation_id`,
          [
            p.providerId,
            o.source,
            o.reference,
            String(o.value.status),
            fp,
            o.value,
            jobId,
          ],
        );
        const id =
          q.rows[0]?.refresh_observation_id ??
          (
            await c.query(
              `select refresh_observation_id from move_v2.refresh_observation where provider_id=$1 and source=$2 and evidence_fingerprint=$3`,
              [p.providerId, o.source, fp],
            )
          ).rows[0].refresh_observation_id;
        stored.push({
          source: o.source,
          id,
          fingerprint: fp,
          inserted: Boolean(q.rowCount),
          status: o.value.status,
        });
      }
      results.push({
        providerId: p.providerId,
        state: p.state,
        name: p.displayName,
        fmcsa,
        stateRefresh: state.status,
        website: website.status,
        stored,
      });
      cursor = i + 1;
      await c.query(
        `update public.move_v2_refresh_job set checkpoint=jsonb_set(checkpoint,'{cursor}',to_jsonb($2::int)),status=$3,attempts=attempts+1,updated_at=now() where id=$1`,
        [jobId, cursor, cursor === providers.length ? "COMPLETE" : "PENDING"],
      );
      await new Promise((ok) => setTimeout(ok, 250));
    }
    if (!results.length) {
      const prior = await c.query(
        `select provider_id,source,source_status,evidence_fingerprint,observation,refresh_observation_id from move_v2.refresh_observation where job_id=$1 order by provider_id,source`,
        [jobId],
      );
      for (const p of providers)
        results.push({
          providerId: p.providerId,
          state: p.state,
          name: p.displayName,
          stored: prior.rows
            .filter((r) => r.provider_id === p.providerId)
            .map((r) => ({
              source: r.source,
              id: r.refresh_observation_id,
              fingerprint: r.evidence_fingerprint,
              inserted: false,
              status: r.source_status,
              observation: r.observation,
            })),
        });
    }
    const reviewProviders = providers.filter(
      (p) => p.locationStatus === "LOCATION_REVIEW",
    );
    const decisions = [];
    for (const p of reviewProviders) {
      const fp = sha(p.locationDecision.observations);
      const caseId = uuid(`task011-case-${p.providerId}`);
      await c.query(
        `insert into public.move_v2_review_case(id,provider_id,review_type,status,priority,reason_code,summary,evidence_fingerprint,related_ids)values($1,$2,'LOCATION_CONFLICT','OPEN','MEDIUM','INSUFFICIENT_CORROBORATION',$3,$4,$5)on conflict(id)do nothing`,
        [
          caseId,
          p.providerId,
          `${p.displayName}: current official and Federal locations differ; retain review.`,
          fp,
          { sourceObservations: p.locationDecision.observations },
        ],
      );
      const obs = await c.query(
        `select refresh_observation_id from move_v2.refresh_observation where provider_id=$1 order by created_at limit 2`,
        [p.providerId],
      );
      const existingDecision = await c.query(
        `select id from public.move_v2_review_decision where review_case_id=$1 and decision_type='RETAIN_UNRESOLVED'`,
        [caseId],
      );
      let decisionId = existingDecision.rows[0]?.id;
      if (!decisionId) {
        const d = await c.query(
          `insert into public.move_v2_review_decision(review_case_id,provider_id,decision_type,decision_reason,reviewer,evidence_fingerprint,selected_observation_ids,rejected_observation_ids)values($1,$2,'RETAIN_UNRESOLVED','State, FMCSA, and business-location evidence still conflict; no current location selected.','task-011-server-pilot',$3,$4,'{}')returning id`,
          [
            caseId,
            p.providerId,
            fp,
            obs.rows.map((r) => r.refresh_observation_id),
          ],
        );
        decisionId = d.rows[0].id;
        await c.query(
          `update public.move_v2_review_case set status='RESOLVED_NO_DECISION',decision_version=decision_version+1,updated_at=now() where id=$1`,
          [caseId],
        );
      }
      decisions.push({
        caseId,
        providerId: p.providerId,
        decisionId,
        evidenceFingerprint: fp,
        citations: obs.rowCount,
        outcome: "RESOLVED_NO_DECISION",
      });
    }
    const candidates = providers.map((p) => ({
      providerId: p.providerId,
      state: p.state,
      locationStatus: p.locationStatus,
      latitude: p.latitude,
      longitude: p.longitude,
      locationEvidence: {
        decision: p.locationDecision,
        refreshTrace: results.find((r) => r.providerId === p.providerId),
      },
      explicitEvidence: p.serviceEvidence,
    }));
    const baselineFp = sha({ task: "011-checkpoint", providers: ids });
    let baseline = await c.query(
      `select * from move_v2.consumer_discovery_release where input_fingerprint=$1`,
      [baselineFp],
    );
    if (!baseline.rowCount)
      baseline = await c.query(
        `insert into move_v2.consumer_discovery_release(version,input_fingerprint,supported_states,origin_point_method,status,created_at,freshness_inputs)values('MOVE_CONSUMER_DISCOVERY_2026_08_V2_DB_CHECKPOINT',$1,array['FL','WA'],'ZCTA_CENTROID','CURRENT',now(),$2)returning *`,
        [
          baselineFp,
          { experimentalDerivedIncluded: false, task011Checkpoint: checkpoint },
        ],
      );
    for (const p of candidates)
      await c.query(
        `insert into move_v2.consumer_discovery_candidate(consumer_discovery_release_id,provider_id,state,eligibility,location_status,latitude,longitude,location_evidence,explicit_evidence)values($1,$2,$3,'STATE_VERIFIED_LOCAL_MOVER',$4,$5,$6,$7::jsonb,$8::jsonb)on conflict do nothing`,
        [
          baseline.rows[0].consumer_discovery_release_id,
          p.providerId,
          p.state,
          p.locationStatus,
          p.latitude,
          p.longitude,
          JSON.stringify(p.locationEvidence),
          JSON.stringify(p.explicitEvidence),
        ],
      );
    const newFp = sha({
      task: "011-operational-release",
      jobFp,
      decisions: decisions.map((d) => d.evidenceFingerprint),
      providers: ids,
    });
    let next = await c.query(
      `select * from move_v2.consumer_discovery_release where input_fingerprint=$1`,
      [newFp],
    );
    let releaseAction = "NO_OP";
    if (!next.rowCount) {
      await c.query(
        `update move_v2.consumer_discovery_release set status='HISTORICAL',superseded_at=now() where status='CURRENT'`,
      );
      next = await c.query(
        `insert into move_v2.consumer_discovery_release(version,input_fingerprint,supported_states,origin_point_method,status,created_at,freshness_inputs)values('MOVE_CONSUMER_DISCOVERY_2026_08_V3_OPERATIONAL_PILOT',$1,array['FL','WA'],'ZCTA_CENTROID','CURRENT',now(),$2)returning *`,
        [
          newFp,
          {
            experimentalDerivedIncluded: false,
            authorityRefreshJob: jobId,
            reviewDecisionIds: decisions.map((d) => d.decisionId),
          },
        ],
      );
      releaseAction = "CREATED";
    }
    for (const p of candidates)
      await c.query(
        `insert into move_v2.consumer_discovery_candidate(consumer_discovery_release_id,provider_id,state,eligibility,location_status,latitude,longitude,location_evidence,explicit_evidence)values($1,$2,$3,'STATE_VERIFIED_LOCAL_MOVER',$4,$5,$6,$7::jsonb,$8::jsonb)on conflict do nothing`,
        [
          next.rows[0].consumer_discovery_release_id,
          p.providerId,
          p.state,
          p.locationStatus,
          p.latitude,
          p.longitude,
          JSON.stringify(p.locationEvidence),
          JSON.stringify(p.explicitEvidence),
        ],
      );
    if (releaseAction === "CREATED") {
      const action = await c.query(
        `insert into move_v2.operational_action_log(actor,command,prior_fingerprint,new_fingerprint,release_id,details)values('task-011-server-pilot','rebuildConsumerDiscovery',$1,$2,$3,$4)returning operational_action_id`,
        [
          baselineFp,
          newFp,
          next.rows[0].consumer_discovery_release_id,
          { realSourcePilot: true },
        ],
      );
      await c.query(
        `insert into move_v2.discovery_release_pointer(pointer_name,current_release_id,prior_release_id,updated_at,operational_action_id)values('CONSUMER_CURRENT',$1,$2,now(),$3)on conflict(pointer_name)do update set prior_release_id=move_v2.discovery_release_pointer.current_release_id,current_release_id=excluded.current_release_id,updated_at=excluded.updated_at,operational_action_id=excluded.operational_action_id`,
        [
          next.rows[0].consumer_discovery_release_id,
          baseline.rows[0].consumer_discovery_release_id,
          action.rows[0].operational_action_id,
        ],
      );
    }
    const summary = {
      checkpoint,
      pilot: providers.map((p) => ({
        providerId: p.providerId,
        state: p.state,
        name: p.displayName,
        locationStatus: p.locationStatus,
        website: Boolean(p.website),
        explicitClaims: p.serviceEvidence.length,
      })),
      refreshResults: results,
      decisions,
      job: { id: jobId, fingerprint: jobFp, cursor, status: "COMPLETE" },
      release: {
        action: releaseAction,
        baselineId: baseline.rows[0].consumer_discovery_release_id,
        baselineFingerprint: baselineFp,
        currentId: next.rows[0].consumer_discovery_release_id,
        currentFingerprint: newFp,
        historicalPreserved: true,
        candidates: 8,
      },
      cost: { googleCalls: 0, paidApiRequests: 0, incrementalUsd: 0 },
    };
    writeFileSync(
      "docs/task-011-pilot-audit.json",
      JSON.stringify(summary, null, 2) + "\n",
    );
    console.log(
      JSON.stringify(
        {
          pilot: 8,
          fl: 4,
          wa: 4,
          refreshObservations: results.reduce(
            (n, r) => n + (r.stored as unknown[]).length,
            0,
          ),
          decisions: decisions.length,
          releaseAction,
          currentFingerprint: newFp,
          googleCalls: 0,
        },
        null,
        2,
      ),
    );
  } finally {
    await c.end();
  }
}
void main();
