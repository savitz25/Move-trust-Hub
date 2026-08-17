import { writeFileSync } from "node:fs";
import { Client } from "pg";
import { directDatabaseUrl, ssl } from "../db/connection";

const benchmarks: Record<string, string> = {
  countyToMovers: `select p.provider_id,p.placement_type from move_v2.provider_county_placement p join move_v2.provider_local_eligibility e using(provider_id) where p.active=true and p.state='WA' and p.county_geoid='53033' and e.superseded_at is null and e.eligibility='STATE_VERIFIED_LOCAL_MOVER' limit 50`,
  providerToCounties: `select county_geoid,placement_type,estimated_overlap from move_v2.provider_county_placement where provider_id=(select provider_id from move_v2.provider_county_placement limit 1) and active=true`,
  providerToReason: `select model_version,input_snapshot,reason_code from move_v2.provider_derived_area where provider_id=(select provider_id from move_v2.provider_derived_area limit 1) and superseded_at is null`,
};

async function main() {
  const client = new Client({ connectionString: directDatabaseUrl(), ssl });
  await client.connect();
  try {
    const summary = (await client.query(`select
      (select count(*)::int from move_v2.provider_derived_area where superseded_at is null) active_areas,
      (select count(*)::int from move_v2.provider_county_placement where active=true) active_placements,
      (select count(*)::int from move_v2.provider_derived_area where superseded_at is null and state='FL') fl_areas,
      (select count(*)::int from move_v2.provider_derived_area where superseded_at is null and state='WA') wa_areas,
      (select count(*)::int from move_v2.provider_derived_area where superseded_at is null and state='NJ') nj_areas,
      (select count(*)::int from move_v2.derived_area_calibration_result where model_version='MOVE_LOCAL_DERIVED_2026_08_V1') calibration_count`)).rows[0];
    const distributions = (await client.query(`select state,placement_type,count(*)::int rows from move_v2.provider_county_placement where active=true group by state,placement_type order by state,placement_type`)).rows;
    const areas = (await client.query(`select a.provider_id,n.name_value display_name,a.state,a.radius_miles,a.reason_code,count(c.*)::int county_rows from move_v2.provider_derived_area a left join lateral(select name_value from move_v2.provider_name where provider_id=a.provider_id and name_type='DISPLAY' order by created_at desc limit 1)n on true left join move_v2.provider_county_placement c on c.provider_derived_area_id=a.provider_derived_area_id and c.active=true where a.superseded_at is null group by a.provider_id,n.name_value,a.state,a.radius_miles,a.reason_code order by a.state,n.name_value`)).rows;
    const plans: Record<string, { executionMs: number; plan: string[] }> = {};
    for (const [name, sql] of Object.entries(benchmarks)) {
      const result = await client.query(`explain (analyze,buffers,format text) ${sql}`);
      const plan = result.rows.map((row) => String(row["QUERY PLAN"]));
      const match = plan.find((line) => line.includes("Execution Time:"))?.match(/[\d.]+/);
      plans[name] = { executionMs: match ? Number(match[0]) : -1, plan };
    }
    const report = { generatedAt: new Date().toISOString(), summary, distributions, areas, benchmarks: plans };
    writeFileSync("docs/task-005-derived-placement-audit.json", `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify({ summary, distributions, benchmarks: Object.fromEntries(Object.entries(plans).map(([k,v]) => [k,v.executionMs])) }));
  } finally { await client.end(); }
}
void main();
