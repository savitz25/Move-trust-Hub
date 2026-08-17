import { writeFileSync } from "node:fs";
import { Client } from "pg";
import { databaseUrl, ssl } from "../db/connection";
async function main() {
  const c = new Client({ connectionString: databaseUrl(), ssl });
  await c.connect();
  try {
    const pointer = (
      await c.query(
        `select p.current_release_id,p.prior_release_id,r.version,r.input_fingerprint,r.created_at from move_v2.discovery_release_pointer p join move_v2.consumer_discovery_release r on r.consumer_discovery_release_id=p.current_release_id where pointer_name='CONSUMER_CURRENT'`,
      )
    ).rows[0];
    const health = (
      await c.query(
        `select count(*)::int eligible,count(*)filter(where location_status='VERIFIED')::int verified_locations,count(*)filter(where location_status='LOCATION_REVIEW')::int location_review,count(*)filter(where jsonb_array_length(explicit_evidence)>0)::int explicit_providers,count(*)filter(where location_evidence::text like '%"website":true%')::int website_marked from move_v2.consumer_discovery_candidate where consumer_discovery_release_id=$1`,
        [pointer.current_release_id],
      )
    ).rows[0];
    const reviews = (
      await c.query(
        `select count(*)::int cases,count(*)filter(where status='RESOLVED_NO_DECISION')::int unresolved_retained,count(*)filter(where status='RESOLVED_ACCEPTED')::int resolved_control from public.move_v2_review_case`,
      )
    ).rows[0];
    const decisions = (
      await c.query(
        `select count(*)::int decisions,count(*)filter(where supersedes_decision_id is not null)::int supersessions from public.move_v2_review_decision`,
      )
    ).rows[0];
    const sources = (
      await c.query(
        `select source,source_status,count(*)::int attempts from move_v2.refresh_observation group by source,source_status order by source`,
      )
    ).rows;
    const integrity = (
      await c.query(
        `select (select count(*)::int from move_v2.provider) provider_spine,(select count(*)::int from move_v2.consumer_discovery_release) immutable_releases,(select count(*)::int from move_v2.consumer_discovery_candidate where consumer_discovery_release_id=$1) current_candidates,(select count(*)::int from move_v2.operational_action_log) audit_actions,(select count(*)::int from move_v2.refresh_observation) refresh_observations`,
        [pointer.current_release_id],
      )
    ).rows[0];
    const security = (
      await c.query(
        `select c.relname,c.relrowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace where (n.nspname='move_v2' and c.relname in('refresh_observation','operational_action_log','discovery_release_pointer')) or(n.nspname='public' and c.relname in('move_v2_review_case','move_v2_review_decision','move_v2_refresh_job')) order by c.relname`,
      )
    ).rows;
    const out = {
      checkedAt: new Date().toISOString(),
      databaseProjectRef: "arepfylnilkjmyduhwbz",
      pointer,
      health,
      reviews,
      decisions,
      sources,
      integrity,
      security,
      v1Integrity: integrity.provider_spine === 599326,
      experimentalDerivedIncluded: false,
      productionWrites: "NONE",
    };
    writeFileSync(
      "docs/task-011-final-db-audit.json",
      JSON.stringify(out, null, 2) + "\n",
    );
    console.log(JSON.stringify(out, null, 2));
  } finally {
    await c.end();
  }
}
void main();
