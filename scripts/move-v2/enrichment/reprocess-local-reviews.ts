import { Client } from "pg";
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
import { directDatabaseUrl, ssl } from "../db/connection";

const RULE = "MOVE_GOOGLE_MATCH_2026_08_V3_LOCAL_CORROBORATION";
const RUN =
  process.env.MOVE_ENRICHMENT_RUN_ID ?? "TASK006_FL_WA_REVIEW_2026_08_17_V1";
const cap = Math.min(150, Number(process.env.MOVE_GOOGLE_DAILY_CAP ?? 150));
const text = (v: unknown) =>
  typeof v === "string" && v.trim() ? v.trim() : null;
const candidate = (x: GooglePlacesSearchCandidate): GoogleCandidate => ({
  placeId: x.placeId,
  displayName: x.displayName,
  formattedAddress: x.formattedAddress,
  phone: x.nationalPhoneNumber || x.internationalPhoneNumber,
  websiteUri: x.websiteUri,
  businessStatus: x.businessStatus,
});
const unique = (items: { label: string; query: string }[]) =>
  [
    ...new Map(
      items
        .filter((x) => x.query.trim())
        .map((x) => [x.query.toLowerCase(), x]),
    ).values(),
  ].slice(0, 3);

async function main() {
  loadEnvLocal();
  const c = new Client({ connectionString: directDatabaseUrl(), ssl });
  await c.connect();
  let calls = 0;
  const stats: Record<string, number> = {
    providers: 0,
    variantsReserved: 0,
    billable: 0,
    accepted: 0,
    reviewRetained: 0,
    noCandidate: 0,
  };
  try {
    const rows =
      await c.query(`select e.provider_id,e.state,coalesce(sr.legal_name,f.legal_name) legal_name,coalesce(sr.dba_name,f.dba_name) dba_name,coalesce(sr.phone,f.phone) phone,coalesce(sr.address,f.physical_address) address,f.usdot,coalesce(fc.classification,'LOCAL_INTRASTATE_CARRIER_CANDIDATE') classification,m.match_status prior_status
 from move_v2.provider_local_eligibility e join move_v2.google_place_match m using(provider_id) join move_v2.fmcsa_provider_fact f using(provider_id) left join move_v2.fmcsa_classification_result fc on fc.provider_id=e.provider_id and fc.superseded_at is null
 left join lateral(select s.* from move_v2.provider_state_authority_match pm join move_v2.state_authority_source_record s using(state_authority_source_record_id) where pm.provider_id=e.provider_id and pm.match_status='STATE_MATCH_HIGH_CONFIDENCE' order by s.created_at desc limit 1)sr on true
 where e.superseded_at is null and e.state in('FL','WA') and e.eligibility='STATE_VERIFIED_LOCAL_MOVER' and m.match_status in('GOOGLE_MATCH_REVIEW','GOOGLE_MULTIPLE_PLAUSIBLE_MATCHES') order by e.state,e.provider_id`);
    for (const row of rows.rows) {
      stats.providers++;
      const a = (row.address ?? {}) as Record<string, unknown>;
      const identity: RegulatoryIdentity = {
        providerId: row.provider_id,
        usdot: text(row.usdot),
        legalName: text(row.legal_name) ?? "",
        dbaName: text(row.dba_name),
        phone: text(row.phone),
        street: text(a.street) ?? text(a.address),
        city: text(a.city),
        state: row.state,
        postalCode: text(a.postal_code) ?? text(a.postalCode),
        classification: row.classification,
      };
      const variants = unique([
        {
          label: "DBA_CITY",
          query: [identity.dbaName, identity.city, identity.state]
            .filter(Boolean)
            .join(" "),
        },
        {
          label: "LEGAL_PHONE",
          query: [identity.legalName, identity.phone].filter(Boolean).join(" "),
        },
        {
          label: "NAME_STREET_ZIP",
          query: [
            identity.dbaName || identity.legalName,
            identity.street,
            identity.postalCode,
          ]
            .filter(Boolean)
            .join(" "),
        },
      ]);
      let accepted: {
        x: GooglePlacesSearchCandidate;
        d: ReturnType<typeof decideGoogleMatch>;
        label: string;
      } | null = null;
      for (const v of variants) {
        if (calls >= cap) break;
        const key = `google-search:${identity.providerId}:${RULE}:${v.label}`;
        const reserved = await c.query(
          `insert into move_v2.enrichment_request_ledger(provider_id,request_type,idempotency_key,requested_at,response_status,billable_count,run_id) values($1,'SEARCH_TEXT',$2,now(),'STARTED',0,$3) on conflict(idempotency_key) do nothing returning request_id`,
          [identity.providerId, key, RUN],
        );
        if (!reserved.rowCount) continue;
        stats.variantsReserved++;
        calls++;
        const response = await searchGooglePlacesOnce(v.query);
        stats.billable++;
        await c.query(
          `update move_v2.enrichment_request_ledger set response_status=$2,billable_count=1 where request_id=$1`,
          [reserved.rows[0].request_id, response.error ? "ERROR" : "OK"],
        );
        if (response.error) continue;
        const scored = response.candidates
          .map((x) => ({ x, d: decideGoogleMatch(identity, candidate(x)) }))
          .sort((a, b) => b.d.score - a.d.score);
        const best = scored[0];
        if (!best) {
          stats.noCandidate++;
          continue;
        }
        const plausible = scored.filter((x) => x.d.score >= 70).length;
        const d = decideGoogleMatch(identity, candidate(best.x), {
          plausibleCandidates: plausible,
        });
        await c.query(
          `insert into move_v2.google_identity_decision_history(provider_id,place_id,decision_status,score,reason_codes,conflict_codes,rule_version,query_variant,acquisition_method,decided_at) values($1,$2,$3,$4,$5,$6,$7,$8,'NEW_GOOGLE_LOOKUP',now()) on conflict do nothing`,
          [
            identity.providerId,
            d.placeId,
            d.status,
            d.score,
            d.reasonCodes,
            d.conflictCodes,
            RULE,
            v.label,
          ],
        );
        if (
          d.status === "GOOGLE_MATCH_HIGH_CONFIDENCE" ||
          d.status === "GOOGLE_CLOSED_BUSINESS"
        ) {
          accepted = { x: best.x, d, label: v.label };
          break;
        }
      }
      if (!accepted) {
        stats.reviewRetained++;
        continue;
      }
      stats.accepted++;
      const { x, d, label } = accepted;
      await c.query("begin");
      try {
        await c.query(
          `update move_v2.google_place_match set place_id=$2,match_status=$3,score=$4,reason_codes=$5,conflict_codes=$6,match_rule_version=$7,acquisition_method='NEW_GOOGLE_LOOKUP',matched_at=now() where provider_id=$1`,
          [
            identity.providerId,
            d.placeId,
            d.status,
            d.score,
            [...d.reasonCodes, `QUERY_${label}`],
            d.conflictCodes,
            RULE,
          ],
        );
        await c.query(
          `insert into move_v2.google_place_cache(provider_id,place_id,display_name,formatted_address,national_phone,international_phone,website_uri,latitude,longitude,business_status,rating,rating_count,primary_type,pure_service_area_business,retrieved_at,expires_at,source_payload) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,now(),now()+interval '30 days','{}') on conflict(provider_id) do update set place_id=excluded.place_id,display_name=excluded.display_name,formatted_address=excluded.formatted_address,national_phone=excluded.national_phone,international_phone=excluded.international_phone,website_uri=excluded.website_uri,latitude=excluded.latitude,longitude=excluded.longitude,business_status=excluded.business_status,rating=excluded.rating,rating_count=excluded.rating_count,primary_type=excluded.primary_type,pure_service_area_business=excluded.pure_service_area_business,retrieved_at=excluded.retrieved_at,expires_at=excluded.expires_at`,
          [
            identity.providerId,
            x.placeId,
            x.displayName,
            x.formattedAddress,
            x.nationalPhoneNumber,
            x.internationalPhoneNumber,
            x.websiteUri,
            x.latitude,
            x.longitude,
            x.businessStatus,
            x.rating,
            x.ratingCount,
            x.primaryType,
            x.pureServiceAreaBusiness,
          ],
        );
        await c.query(
          `update move_v2.enrichment_queue set status='COMPLETED',completed_at=now(),error_code=null where provider_id=$1`,
          [identity.providerId],
        );
        await c.query("commit");
      } catch (e) {
        await c.query("rollback");
        throw e;
      }
    }
    console.log(JSON.stringify({ ...stats, cap, ruleVersion: RULE }));
  } finally {
    await c.end();
  }
}
void main();
