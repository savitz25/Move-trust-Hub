import { writeFileSync } from "node:fs";
import { Client } from "pg";
import { databaseUrl, ssl } from "../db/connection";

async function main() {
  const client = new Client({ connectionString: databaseUrl(), ssl });
  await client.connect();
  const one = async (sql: string) => (await client.query(sql)).rows;
  const audit = {
    generatedAt: new Date().toISOString(),
    universes: await one(`select f.physical_address->>'state' state,count(*)::int total,
      count(*) filter(where f.power_units between 1 and 2)::int fleet_1_2,count(*) filter(where f.power_units between 3 and 5)::int fleet_3_5,
      count(*) filter(where f.power_units between 6 and 10)::int fleet_6_10,count(*) filter(where f.power_units between 11 and 20)::int fleet_11_20,
      count(*) filter(where f.power_units between 21 and 50)::int fleet_21_50,count(*) filter(where f.power_units>=51)::int fleet_51_plus,
      count(*) filter(where f.dba_name is not null)::int dba,count(*) filter(where f.phone is not null)::int phone
      from move_v2.fmcsa_provider_fact f join move_v2.fmcsa_classification_result cr using(provider_id)
      where cr.superseded_at is null and cr.classification='LOCAL_INTRASTATE_CARRIER_CANDIDATE' and f.physical_address->>'state' in ('NJ','FL') group by 1 order by 1`),
    releases: await one(`select state,source_name,source_url,retrieved_at,record_count,sha256,adapter_version,retrieval_method,ingestion_status from move_v2.state_source_release order by state,source_name`),
    sourceRecords: await one(`select state,authority_type,status,count(*)::int count from move_v2.state_authority_source_record group by 1,2,3 order by 1,2,3`),
    eligibility: await one(`select state,eligibility,count(*)::int count from move_v2.provider_local_eligibility where superseded_at is null group by 1,2 order by 1,2`),
    enrichment: await one(`select f.physical_address->>'state' state,count(*) filter(where gm.provider_id is not null)::int google_attempted,
      count(*) filter(where gm.match_status in ('GOOGLE_MATCH_HIGH_CONFIDENCE','GOOGLE_EXISTING_MATCH_REUSED'))::int google_accepted,
      count(*) filter(where wi.provider_id is not null)::int websites
      from move_v2.fmcsa_provider_fact f join move_v2.fmcsa_classification_result cr using(provider_id)
      left join move_v2.google_place_match gm using(provider_id) left join move_v2.provider_website_identity wi using(provider_id)
      where cr.superseded_at is null and cr.classification='LOCAL_INTRASTATE_CARRIER_CANDIDATE' and f.physical_address->>'state' in ('NJ','FL') group by 1 order by 1`),
    geography: await one(`select coalesce(g.evidence_status,'NOT_EVALUATED') status,count(*)::int count,count(*) filter(where coalesce(g.derived_service_area_required,false))::int derived_required
      from move_v2.provider_local_eligibility e left join move_v2.provider_geography_evidence g using(provider_id) where e.superseded_at is null group by 1 order by 1`),
    v1: await one(`select (select count(*) from public.companies)::int companies,(select count(*) from public.reviews)::int reviews`),
  };
  const sample = await one(`select e.state,e.eligibility,f.usdot,f.display_name,f.legal_name,f.dba_name,f.power_units,
    a.authority_type,a.license_registration_number,a.status,a.expiration_date,m.match_score,array_to_string(m.reason_codes,'|') reasons
    from move_v2.provider_local_eligibility e join move_v2.fmcsa_provider_fact f using(provider_id)
    join move_v2.provider_state_authority_match m using(provider_id,state)
    join move_v2.state_authority_source_record a on a.state_authority_source_record_id=m.state_authority_source_record_id
    where e.superseded_at is null order by e.eligibility,f.power_units desc nulls last,f.usdot`);
  const headers = Object.keys(sample[0] ?? {});
  const csv = [headers.join(","), ...sample.map((row) => headers.map((h) => JSON.stringify(row[h] ?? "")).join(","))].join("\n");
  const benchmarkSql = {
    stateVerified: `select provider_id from move_v2.provider_local_eligibility where state='FL' and eligibility='STATE_VERIFIED_LOCAL_MOVER' and superseded_at is null limit 50`,
    providerAuthority: `select * from move_v2.provider_state_authority where provider_id=(select provider_id from move_v2.provider_local_eligibility limit 1)`,
    licenseProvider: `select m.provider_id from move_v2.state_authority_source_record s join move_v2.provider_state_authority_match m using(state_authority_source_record_id) where s.state='FL' and s.license_registration_number='IM2736'`,
    explicitGeography: `select * from move_v2.provider_service_area where provider_id=(select provider_id from move_v2.provider_local_eligibility limit 1) and authority_scope='PROVIDER_PUBLISHED_SERVICE_AREA'`,
    derivedRequired: `select provider_id from move_v2.provider_geography_evidence where derived_service_area_required=true limit 50`,
  };
  const benchmarks: Record<string, unknown> = {};
  for (const [name, sql] of Object.entries(benchmarkSql)) benchmarks[name] = (await client.query(`explain (analyze,format json) ${sql}`)).rows[0]["QUERY PLAN"][0];
  writeFileSync("docs/task-004-db-audit.json", JSON.stringify(audit, null, 2));
  writeFileSync("docs/task-004-manual-qa.csv", csv);
  writeFileSync("docs/task-004-query-benchmarks.json", JSON.stringify(benchmarks, null, 2));
  console.log(JSON.stringify({ sample: sample.length, v1: audit.v1, eligibility: audit.eligibility }));
  await client.end();
}
void main();
