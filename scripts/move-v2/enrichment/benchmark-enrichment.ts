import { writeFileSync } from "node:fs";
import { Client } from "pg";
import { directDatabaseUrl, ssl } from "../db/connection";

const queries: Record<string, string> = {
  providerGoogle: `select * from move_v2.google_place_match where provider_id=(select provider_id from move_v2.google_place_match limit 1)`,
  placeProvider: `select provider_id from move_v2.google_place_match where place_id=(select place_id from move_v2.google_place_match where place_id is not null limit 1)`,
  providerWebsite: `select * from move_v2.provider_website_identity where provider_id=(select provider_id from move_v2.provider_website_identity limit 1)`,
  providerContacts: `select * from move_v2.provider_contact where provider_id=(select provider_id from move_v2.google_place_match limit 1)`,
  providerServices: `select * from move_v2.provider_published_observation where provider_id=(select provider_id from move_v2.provider_published_observation limit 1)`,
  providerLocations: `select * from move_v2.provider_business_location where provider_id=(select provider_id from move_v2.google_place_match limit 1)`,
  providerServiceAreas: `select * from move_v2.provider_published_observation where provider_id=(select provider_id from move_v2.provider_published_observation where observation_type='SERVICE_AREA' limit 1) and observation_type='SERVICE_AREA'`,
  reviewQueue: `select provider_id,score,reason_codes,conflict_codes from move_v2.google_place_match where match_status in ('GOOGLE_MATCH_REVIEW','GOOGLE_MULTIPLE_PLAUSIBLE_MATCHES') order by score desc limit 50`,
};

async function main() {
  const client = new Client({ connectionString: directDatabaseUrl(), ssl });
  await client.connect();
  try {
    const results: Record<string, { executionMs: number; plan: string[] }> = {};
    for (const [name, sql] of Object.entries(queries)) {
      const result = await client.query(
        `explain (analyze, buffers, format text) ${sql}`,
      );
      const plan = result.rows.map((row) => String(row["QUERY PLAN"]));
      const timing = plan
        .find((line) => line.includes("Execution Time:"))
        ?.match(/[\d.]+/);
      results[name] = { executionMs: timing ? Number(timing[0]) : -1, plan };
    }
    writeFileSync(
      "docs/task-003-query-benchmarks.json",
      `${JSON.stringify(results, null, 2)}\n`,
    );
    console.log(
      JSON.stringify(
        Object.fromEntries(
          Object.entries(results).map(([key, value]) => [
            key,
            value.executionMs,
          ]),
        ),
        null,
        2,
      ),
    );
  } finally {
    await client.end();
  }
}

void main();
