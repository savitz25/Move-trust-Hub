import { Client } from "pg";
import { directDatabaseUrl, ssl } from "../db/connection";
import { decideGoogleMatch } from "../../../lib/move-v2/enrichment/google-match";
import type {
  GoogleCandidate,
  RegulatoryIdentity,
} from "../../../lib/move-v2/enrichment/types";
import {
  searchGooglePlacesOnce,
  type GooglePlacesSearchCandidate,
} from "../../../lib/verification/google-places";
import { loadEnvLocal } from "../../../lib/verification/load-env-local";
const runId = process.env.MOVE_ENRICHMENT_RUN_ID || "TASK003_PILOT_2026_08_16_V2";
const wave = process.env.MOVE_ENRICHMENT_WAVE || "PILOT";
const cap = Number(process.env.MOVE_GOOGLE_DAILY_CAP || 250);
type Row = Record<string, unknown>;
const s = (v: unknown) => (typeof v === "string" ? v : null);
function candidateFromGoogle(
  g: Record<string, unknown>,
): GoogleCandidate | null {
  const id = s(g.place_id);
  const name = s(g.name);
  if (!id || !name) return null;
  return {
    placeId: id,
    displayName: name,
    formattedAddress: s(g.formatted_address),
    phone: s(g.phone),
    websiteUri: s(g.website_url),
    businessStatus: s(g.business_status),
  };
}
function fromSearch(x: GooglePlacesSearchCandidate): GoogleCandidate {
  return {
    placeId: x.placeId,
    displayName: x.displayName,
    formattedAddress: x.formattedAddress,
    phone: x.nationalPhoneNumber || x.internationalPhoneNumber,
    websiteUri: x.websiteUri,
    businessStatus: x.businessStatus,
  };
}
async function main() {
  loadEnvLocal();
  const c = new Client({ connectionString: directDatabaseUrl(), ssl });
  await c.connect();
  let calls = 0;
  const stats: Record<string, number> = {
    attempted: 0,
    reused: 0,
    searches: 0,
    details: 0,
  };
  try {
    await c.query(
      `update move_v2.google_place_match set match_status='GOOGLE_MATCH_REVIEW' where match_status='GOOGLE_EXISTING_MATCH_REUSED' and cardinality(conflict_codes)>0`,
    );
    await c.query(
      `update move_v2.enrichment_queue q set status='REVIEW',completed_at=null,error_code='EXISTING_IDENTITY_CONFLICT' where exists(select 1 from move_v2.google_place_match m where m.provider_id=q.provider_id and m.acquisition_method='REUSED_EXISTING_GOOGLE_IDENTITY' and m.match_status='GOOGLE_MATCH_REVIEW')`,
    );
    const demoted = `select provider_id from move_v2.google_place_match where acquisition_method='REUSED_EXISTING_GOOGLE_IDENTITY' and match_status='GOOGLE_MATCH_REVIEW' and cardinality(conflict_codes)>0`;
    await c.query(
      `delete from move_v2.provider_contact where source_type='OFFICIAL_WEBSITE' and provider_id in (${demoted})`,
    );
    await c.query(
      `delete from move_v2.provider_published_observation where provider_id in (${demoted})`,
    );
    await c.query(
      `delete from move_v2.provider_business_location where provider_id in (${demoted})`,
    );
    await c.query(
      `delete from move_v2.provider_geography_evidence where provider_id in (${demoted})`,
    );
    await c.query(
      `delete from move_v2.provider_website_identity where provider_id in (${demoted})`,
    );
    await c.query(
      `update move_v2.enrichment_request_ledger set response_status='CONFIG_ERROR',billable_count=0 where run_id='TASK003_PILOT_2026_08_16_V1' and response_status='ERROR'`,
    );
    await c.query(
      `delete from move_v2.google_place_match m using move_v2.enrichment_request_ledger l where l.provider_id=m.provider_id and l.run_id='TASK003_PILOT_2026_08_16_V1' and l.response_status='CONFIG_ERROR' and m.match_status='GOOGLE_NO_MATCH'`,
    );
    await c.query(
      `update move_v2.enrichment_queue q set status='PENDING',completed_at=null,error_code=null where exists(select 1 from move_v2.enrichment_request_ledger l where l.provider_id=q.provider_id and l.run_id='TASK003_PILOT_2026_08_16_V1' and l.response_status='CONFIG_ERROR')`,
    );
    await c.query(
      `update move_v2.enrichment_request_ledger set response_status='CONFIG_ERROR_REPAIRED' where run_id='TASK003_PILOT_2026_08_16_V1' and response_status='CONFIG_ERROR'`,
    );
    await c.query(
      `insert into move_v2.google_place_match(provider_id,place_id,match_status,score,reason_codes,conflict_codes,match_rule_version,acquisition_method,matched_at) select l.provider_id,null,'GOOGLE_NO_MATCH',0,'{}','{}','MOVE_GOOGLE_MATCH_2026_08_V1','NEW_GOOGLE_LOOKUP',l.requested_at from move_v2.enrichment_request_ledger l where l.run_id='TASK003_PILOT_2026_08_16_V2' and l.response_status='OK' and not exists(select 1 from move_v2.google_place_match m where m.provider_id=l.provider_id) on conflict(provider_id) do nothing`,
    );
    await c.query(
      `update move_v2.enrichment_queue q set status='COMPLETED',completed_at=coalesce(completed_at,now()) where exists(select 1 from move_v2.google_place_match m where m.provider_id=q.provider_id and m.match_status in ('GOOGLE_NO_MATCH','GOOGLE_MATCH_HIGH_CONFIDENCE','GOOGLE_EXISTING_MATCH_REUSED','GOOGLE_CLOSED_BUSINESS'))`,
    );
    const rows = await c.query(
      `select q.*,coalesce(s.legal_name,h.legal_name,a.legal_name) legal_name,coalesce(s.dba_name,h.dba_name,a.dba_name) dba_name,
       coalesce(s.phone,h.phone,a.phone) phone,coalesce(s.address,h.physical_address,a.physical_address) physical_address,
       coalesce(s.address->>'city',h.physical_address->>'city',a.city) city,coalesce(s.state,h.physical_address->>'state',a.state) state,
       coalesce(h.usdot,a.usdot) usdot,coalesce(hc.classification,ar.classification) classification
       from move_v2.enrichment_queue q
       left join move_v2.provider_local_eligibility le on le.provider_id=q.provider_id and le.superseded_at is null
       left join lateral (select sr.* from move_v2.provider_state_authority_match sm join move_v2.state_authority_source_record sr using(state_authority_source_record_id)
         where sm.provider_id=q.provider_id and sm.match_status='STATE_MATCH_HIGH_CONFIDENCE' order by sr.created_at desc limit 1) s on true
       left join move_v2.fmcsa_provider_fact h on h.provider_id=q.provider_id left join move_v2.fmcsa_classification_result hc on hc.provider_id=q.provider_id and hc.superseded_at is null
       left join move_v2.fmcsa_auto_provider_fact a on a.provider_id=q.provider_id left join move_v2.provider_service_role ar on ar.provider_id=q.provider_id and ar.vertical='AUTO_TRANSPORT' and ar.superseded_at is null
       where q.wave=$1 and q.status in ('PENDING','RETRY') order by q.priority,q.provider_id`, [wave]
    );
    for (const row of rows.rows as Row[]) {
      stats.attempted++;
      const address = (row.physical_address ?? {}) as Record<string, unknown>;
      const identity: RegulatoryIdentity = {
        providerId: String(row.provider_id),
        usdot: s(row.usdot),
        legalName: s(row.legal_name) ?? "",
        dbaName: s(row.dba_name),
        phone: s(row.phone),
        street: s(address.street),
        city: s(row.city),
        state: s(row.state),
        postalCode: s(address.postal_code),
        classification: s(row.classification) ?? "UNKNOWN",
      };
      let acquisition = "NEW_GOOGLE_LOOKUP";
      let selected: GooglePlacesSearchCandidate | null = null;
      let decision;
      const reuse = (row.reuse_candidate ?? null) as {
        google?: Record<string, unknown>;
      } | null;
      const reuseGoogle = reuse?.google;
      const reusedCandidate = reuseGoogle
        ? candidateFromGoogle(reuseGoogle)
        : null;
      if (reusedCandidate && reuseGoogle) {
        decision = decideGoogleMatch(identity, reusedCandidate, {
          existingPlaceId: reusedCandidate.placeId,
        });
        if (decision.status === "GOOGLE_EXISTING_MATCH_REUSED") {
          acquisition = "REUSED_EXISTING_GOOGLE_IDENTITY";
          stats.reused++;
          selected = {
            placeId: reusedCandidate.placeId,
            displayName: reusedCandidate.displayName,
            formattedAddress: reusedCandidate.formattedAddress ?? null,
            websiteUri: reusedCandidate.websiteUri ?? null,
            nationalPhoneNumber: reusedCandidate.phone ?? null,
            internationalPhoneNumber: null,
            latitude: null,
            longitude: null,
            businessStatus: reusedCandidate.businessStatus ?? null,
            rating:
              typeof reuseGoogle.rating === "number"
                ? reuseGoogle.rating
                : null,
            ratingCount:
              typeof reuseGoogle.review_count === "number"
                ? reuseGoogle.review_count
                : null,
            primaryType: null,
            pureServiceAreaBusiness: null,
          };
        }
      }
      if (!selected) {
        if (calls >= cap) {
          await c.query(
            `update move_v2.enrichment_queue set status='CAP_DEFERRED' where provider_id=$1`,
            [identity.providerId],
          );
          continue;
        }
        const key = `google-search:${identity.providerId}:MOVE_GOOGLE_MATCH_2026_08_V2`;
        const reserved = await c.query(
          `insert into move_v2.enrichment_request_ledger(provider_id,request_type,idempotency_key,requested_at,response_status,billable_count,run_id) values($1,'SEARCH_TEXT',$2,now(),'STARTED',0,$3) on conflict(idempotency_key) do nothing returning request_id`,
          [identity.providerId, key, runId],
        );
        if (!reserved.rowCount) {
          await c.query(
            `update move_v2.enrichment_queue set status='REVIEW',error_code='REQUEST_ALREADY_RECORDED' where provider_id=$1`,
            [identity.providerId],
          );
          continue;
        }
        calls++;
        stats.searches++;
        const query = [
          identity.dbaName || identity.legalName,
          identity.street,
          identity.city,
          identity.state,
        ]
          .filter(Boolean)
          .join(" ");
        const response = await searchGooglePlacesOnce(query);
        await c.query(
          `update move_v2.enrichment_request_ledger set response_status=$2,billable_count=1 where request_id=$1`,
          [reserved.rows[0].request_id, response.error ? "ERROR" : "OK"],
        );
        if (response.error) {
          await c.query(
            `update move_v2.enrichment_queue set status='RETRY',attempt_count=attempt_count+1,last_attempt_at=now(),error_code='GOOGLE_API_ERROR' where provider_id=$1`,
            [identity.providerId],
          );
          stats.GOOGLE_API_ERROR = (stats.GOOGLE_API_ERROR ?? 0) + 1;
          continue;
        }
        const scored = response.candidates
          .map((x) => ({
            x,
            decision: decideGoogleMatch(identity, fromSearch(x)),
          }))
          .sort((a, b) => b.decision.score - a.decision.score);
        const best = scored[0];
        selected = best?.x ?? null;
        decision = best
          ? decideGoogleMatch(identity, fromSearch(best.x), {
              plausibleCandidates: scored.filter((x) => x.decision.score >= 70)
                .length,
            })
          : decideGoogleMatch(identity, null);
      }
      if (!decision)
        decision = decideGoogleMatch(
          identity,
          selected ? fromSearch(selected) : null,
        );
      if (decision.placeId) {
        const owner = await c.query(
          `select provider_id from move_v2.google_place_match where place_id=$1 and provider_id<>$2`,
          [decision.placeId, identity.providerId],
        );
        if (owner.rowCount)
          decision = {
            ...decision,
            status: "GOOGLE_MULTIPLE_PLAUSIBLE_MATCHES",
            conflictCodes: [
              ...decision.conflictCodes,
              "PLACE_ID_ALREADY_LINKED",
            ],
          };
      }
      const completed = [
        "GOOGLE_MATCH_HIGH_CONFIDENCE",
        "GOOGLE_EXISTING_MATCH_REUSED",
        "GOOGLE_CLOSED_BUSINESS",
        "GOOGLE_NO_MATCH",
      ].includes(decision.status);
      await c.query("begin");
      try {
        await c.query(
          `insert into move_v2.google_place_match(provider_id,place_id,match_status,score,reason_codes,conflict_codes,match_rule_version,acquisition_method,matched_at) values($1,$2,$3,$4,$5,$6,$7,$8,now()) on conflict(provider_id) do update set place_id=excluded.place_id,match_status=excluded.match_status,score=excluded.score,reason_codes=excluded.reason_codes,conflict_codes=excluded.conflict_codes,match_rule_version=excluded.match_rule_version,acquisition_method=excluded.acquisition_method,matched_at=excluded.matched_at`,
          [
            identity.providerId,
            decision.placeId,
            decision.status,
            decision.score,
            decision.reasonCodes,
            decision.conflictCodes,
            decision.ruleVersion,
            acquisition,
          ],
        );
        if (selected && decision.placeId) {
          await c.query(
            `insert into move_v2.google_place_cache(provider_id,place_id,display_name,formatted_address,national_phone,international_phone,website_uri,latitude,longitude,business_status,rating,rating_count,primary_type,pure_service_area_business,retrieved_at,expires_at,source_payload) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,now(),now()+interval '30 days','{}') on conflict(provider_id) do update set place_id=excluded.place_id,display_name=excluded.display_name,formatted_address=excluded.formatted_address,national_phone=excluded.national_phone,international_phone=excluded.international_phone,website_uri=excluded.website_uri,latitude=excluded.latitude,longitude=excluded.longitude,business_status=excluded.business_status,rating=excluded.rating,rating_count=excluded.rating_count,primary_type=excluded.primary_type,pure_service_area_business=excluded.pure_service_area_business,retrieved_at=excluded.retrieved_at,expires_at=excluded.expires_at`,
            [
              identity.providerId,
              selected.placeId,
              selected.displayName,
              selected.formattedAddress,
              selected.nationalPhoneNumber,
              selected.internationalPhoneNumber,
              selected.websiteUri,
              selected.latitude,
              selected.longitude,
              selected.businessStatus,
              selected.rating,
              selected.ratingCount,
              selected.primaryType,
              selected.pureServiceAreaBusiness,
            ],
          );
        }
        if (!completed)
          await c.query(
            `insert into move_v2.identity_review(provider_id,review_type,candidate,score,status) values($1,'GOOGLE_IDENTITY',$2,$3,'PENDING')`,
            [
              identity.providerId,
              JSON.stringify(selected ?? {}),
              JSON.stringify(decision),
            ],
          );
        await c.query(
          `update move_v2.enrichment_queue set status=$2,attempt_count=attempt_count+1,last_attempt_at=now(),completed_at=case when $2='COMPLETED' then now() end where provider_id=$1`,
          [identity.providerId, completed ? "COMPLETED" : "REVIEW"],
        );
        await c.query("commit");
      } catch (e) {
        await c.query("rollback");
        throw e;
      }
      stats[decision.status] = (stats[decision.status] ?? 0) + 1;
    }
    console.log(JSON.stringify({ ...stats, billableCalls: calls }, null, 2));
  } finally {
    await c.end();
  }
}
void main();
