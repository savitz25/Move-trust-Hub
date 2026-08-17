import { writeFileSync } from "node:fs";
import { Client } from "pg";
import {
  findLocalMoversByOriginCounty,
  findLocalMoversByOriginZip,
} from "../../../lib/move-v2/geography/origin-search";
import { directDatabaseUrl, ssl } from "../db/connection";
const tests = {
  zipResolution: `select * from move_v2.postal_zip_resolution where postal_zip='98101'`,
  zipMovers: `select o.provider_id,o.placement_reason from move_v2.origin_search_placement o where o.active and o.invalidated_at is null and o.zcta='98101' order by evidence_tier limit 50`,
  countyMovers: `select o.provider_id,o.placement_reason from move_v2.origin_search_placement o where o.active and o.invalidated_at is null and o.state='WA' and o.county_geoid='53033' and o.zcta is null order by evidence_tier limit 50`,
  providerPlacements: `select * from move_v2.origin_search_placement where provider_id=(select provider_id from move_v2.origin_search_placement where active limit 1) and active`,
  providerEvidence: `select placement_reason,evidence_reference from move_v2.origin_search_placement where provider_id=(select provider_id from move_v2.origin_search_placement where active limit 1) and active`,
};
async function main() {
  const c = new Client({ connectionString: directDatabaseUrl(), ssl });
  await c.connect();
  try {
    const q = async (sql: string) => (await c.query(sql)).rows;
    const counts = {
      zcta: await q(
        `select state,count(*)::int zctas from move_v2.postal_zip_resolution where status='GEOGRAPHIC_ZCTA' group by state order by state`,
      ),
      crossCounty: await q(
        `select state,count(distinct zcta)::int zctas from move_v2.zcta_county_relationship where relationship_type='CROSS_COUNTY' group by state order by state`,
      ),
      placements: await q(
        `select placement_reason,count(*)::int rows,count(distinct provider_id)::int providers from move_v2.origin_search_placement where active and invalidated_at is null group by placement_reason order by placement_reason`,
      ),
      rows: await q(
        `select count(*) filter(where zcta is null)::int county_rows,count(*) filter(where zcta is not null)::int zip_rows,count(distinct provider_id)::int providers from move_v2.origin_search_placement where active and invalidated_at is null`,
      ),
      explicit: await q(
        `select geography_type,count(*)::int observations,count(distinct provider_id)::int providers from move_v2.provider_service_geography_observation group by geography_type order by geography_type`,
      ),
      decisions: await q(
        `select decision_status,count(*)::int decisions,count(distinct provider_id)::int providers from move_v2.google_identity_decision_history group by decision_status order by decision_status`,
      ),
    };
    const plans: Record<
      string,
      { coldishWallMs: number; warmMs: number; plan: string[] }
    > = {};
    for (const [name, sql] of Object.entries(tests)) {
      const started = performance.now();
      await c.query(sql);
      const coldishWallMs = performance.now() - started;
      const r = await c.query(`explain(analyze,buffers,format text) ${sql}`),
        plan = r.rows.map((x) => String(x["QUERY PLAN"])),
        m = plan.find((x) => x.includes("Execution Time:"))?.match(/[\d.]+/);
      plans[name] = {
        coldishWallMs: Number(coldishWallMs.toFixed(3)),
        warmMs: m ? Number(m[0]) : -1,
        plan,
      };
    }
    const zipCases = [];
    for (const zip of [
      "98101",
      "98004",
      "98402",
      "98201",
      "99201",
      "33101",
      "33139",
      "33401",
      "33602",
      "99999",
    ]) {
      const result = await findLocalMoversByOriginZip(c, zip);
      zipCases.push({
        zip,
        status: result.resolution.status,
        state: result.resolution.state,
        county: result.resolution.countyGeoid,
        providers: result.providers.length,
        reason: result.resolution.explanation,
      });
    }
    const countyCases = [];
    for (const [state, county] of [
      ["WA", "53033"],
      ["WA", "53053"],
      ["WA", "53061"],
      ["WA", "53063"],
      ["WA", "53051"],
      ["FL", "12086"],
      ["FL", "12011"],
      ["FL", "12099"],
      ["FL", "12095"],
      ["FL", "12057"],
    ])
      countyCases.push({
        state,
        county,
        providers: (await findLocalMoversByOriginCounty(c, state, county))
          .length,
      });
    const report = {
      generatedAt: new Date().toISOString(),
      counts,
      benchmarks: plans,
      zipCases,
      countyCases,
    };
    writeFileSync(
      "docs/task-006-origin-search-audit.json",
      `${JSON.stringify(report, null, 2)}\n`,
    );
    writeFileSync(
      "docs/task-006-origin-search-qa.csv",
      `type,input,status,providers,explanation\n${zipCases.map((x) => `ZIP,${x.zip},${x.status},${x.providers},"${x.reason.replaceAll('"', '""')}"`).join("\n")}\n${countyCases.map((x) => `COUNTY,${x.state}-${x.county},GEOGRAPHIC_COUNTY,${x.providers},"Precomputed origin placement"`).join("\n")}\n`,
    );
    console.log(
      JSON.stringify({
        counts,
        benchmarks: Object.fromEntries(
          Object.entries(plans).map(([k, v]) => [k, v.warmMs]),
        ),
        zipCases: zipCases.length,
        countyCases: countyCases.length,
      }),
    );
  } finally {
    await c.end();
  }
}
void main();
