import { writeFileSync } from "node:fs";
import { Client } from "pg";
import { directDatabaseUrl, ssl } from "../db/connection";

async function main() {
  const client = new Client({ connectionString: directDatabaseUrl(), ssl });
  await client.connect();
  try {
    const columns = await client.query(
      `select column_name,data_type from information_schema.columns where table_schema='public' and table_name='companies' order by ordinal_position`,
    );
    const waveA =
      await client.query(`select count(distinct provider_id)::integer providers from (
      select provider_id from move_v2.fmcsa_classification_result where superseded_at is null and classification in ('INTERSTATE_CARRIER','AUTHORIZED_BROKER','DUAL_ROLE_CARRIER_BROKER')
      union all select provider_id from move_v2.provider_service_role where vertical='AUTO_TRANSPORT' and superseded_at is null and classification in ('AUTO_TRANSPORT_CARRIER','AUTO_TRANSPORT_BROKER','AUTO_TRANSPORT_DUAL_ROLE')
    ) x`);
    const likely = columns.rows
      .map((row) => row.column_name as string)
      .filter((name) =>
        /google|place|website|phone|usdot|dot|mc|verification|enrich/i.test(
          name,
        ),
      );
    const reuse = await client.query(`select count(*)::integer total,
      count(*) filter(where usdot_number is not null)::integer with_usdot,
      count(*) filter(where phone is not null)::integer with_phone,
      count(*) filter(where website is not null)::integer with_website,
      count(*) filter(where verification_sources->'google_places'->>'place_id' is not null)::integer with_place_id
      from public.companies`);
    writeFileSync(
      "docs/task-003-baseline-audit.json",
      JSON.stringify(
        {
          wave_a_unique_providers: waveA.rows[0].providers,
          company_columns: columns.rows,
          candidate_v1_columns: likely,
          v1_candidate_summary: reuse.rows[0],
        },
        null,
        2,
      ) + "\n",
    );
    console.log(
      `Task 003 baseline: Wave A ${waveA.rows[0].providers}; V1 rows ${reuse.rows[0].total}`,
    );
  } finally {
    await client.end();
  }
}
void main();
