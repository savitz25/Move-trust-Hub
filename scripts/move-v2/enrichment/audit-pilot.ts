import { writeFileSync } from "node:fs";
import { Client } from "pg";
import { directDatabaseUrl, ssl } from "../db/connection";
async function main() {
  const c = new Client({ connectionString: directDatabaseUrl(), ssl });
  await c.connect();
  try {
    const queries: Record<string, string> = {
      queue: `select status,count(*)::integer count from move_v2.enrichment_queue where wave='PILOT' group by status`,
      matches: `select match_status,acquisition_method,count(*)::integer count from move_v2.google_place_match group by match_status,acquisition_method`,
      requests: `select request_type,response_status,sum(billable_count)::integer calls,count(*)::integer rows from move_v2.enrichment_request_ledger group by request_type,response_status`,
      websites: `select match_status,count(*)::integer count from move_v2.provider_website_identity group by match_status`,
      observations: `select observation_type,count(*)::integer count from move_v2.provider_published_observation group by observation_type`,
      geography: `select evidence_status,derived_service_area_required,count(*)::integer count from move_v2.provider_geography_evidence group by evidence_status,derived_service_area_required`,
    };
    const out: Record<string, unknown> = {};
    for (const [key, sql] of Object.entries(queries))
      out[key] = (await c.query(sql)).rows;
    out.waveA = (
      await c.query(
        `select count(distinct provider_id)::integer providers from (select provider_id from move_v2.fmcsa_classification_result where superseded_at is null and classification in ('INTERSTATE_CARRIER','AUTHORIZED_BROKER','DUAL_ROLE_CARRIER_BROKER') union all select provider_id from move_v2.provider_service_role where vertical='AUTO_TRANSPORT' and superseded_at is null and classification in ('AUTO_TRANSPORT_CARRIER','AUTO_TRANSPORT_BROKER','AUTO_TRANSPORT_DUAL_ROLE'))x`,
      )
    ).rows[0].providers;
    out.v1 = (
      await c.query(
        `select (select count(*) from public.companies)::integer companies,(select count(*) from public.reviews)::integer reviews`,
      )
    ).rows[0];
    out.uniqueDiscoveries = (
      await c.query(
        `select observation_type,count(distinct (provider_id,normalized_value))::integer count from move_v2.provider_published_observation group by observation_type`,
      )
    ).rows;
    out.services = (
      await c.query(
        `select normalized_value,count(*)::integer count from move_v2.provider_published_observation where observation_type='SERVICE' group by normalized_value order by normalized_value`,
      )
    ).rows;
    out.identityConflicts = (
      await c.query(
        `select count(*)::integer providers from move_v2.google_place_match where cardinality(conflict_codes)>0`,
      )
    ).rows[0].providers;
    out.branches = (
      await c.query(
        `select count(*)::integer count from move_v2.provider_business_location`,
      )
    ).rows[0].count;
    writeFileSync(
      "docs/task-003-pilot-audit.json",
      JSON.stringify(out, null, 2) + "\n",
    );
    console.log(JSON.stringify(out, null, 2));
  } finally {
    await c.end();
  }
}
void main();
