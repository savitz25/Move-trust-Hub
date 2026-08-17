import { Client } from "pg";
import { directDatabaseUrl, ssl } from "../db/connection";

const queries = [
  "select match_status,count(*) from move_v2.google_place_match group by 1 order by 1",
  "select match_status,count(*) from move_v2.provider_website_identity group by 1 order by 1",
  "select geography_type,count(*),count(distinct provider_id) providers from move_v2.provider_service_geography_observation group by 1 order by 1",
  "select column_name,data_type from information_schema.columns where table_schema='move_v2' and table_name='fmcsa_provider_fact' order by ordinal_position",
  `select e.state,f.provider_id,f.legal_name,f.dba_name,f.phone fmcsa_phone,f.physical_address,f.mailing_address,
    s.phone state_phone,s.address state_address,g.formatted_address,g.national_phone google_phone,g.latitude,g.longitude,m.match_status,
    w.website_url,w.match_status website_status
   from move_v2.provider_local_eligibility e join move_v2.fmcsa_provider_fact f using(provider_id)
   left join move_v2.google_place_match m using(provider_id) left join move_v2.google_place_cache g using(provider_id)
   left join move_v2.provider_website_identity w using(provider_id)
   left join lateral(select sr.* from move_v2.provider_state_authority_match sm join move_v2.state_authority_source_record sr using(state_authority_source_record_id) where sm.provider_id=e.provider_id and sm.match_status='STATE_MATCH_HIGH_CONFIDENCE' order by sr.created_at desc limit 1)s on true
   where e.superseded_at is null and e.eligibility='STATE_VERIFIED_LOCAL_MOVER' and e.state in('FL','WA') order by e.state,f.legal_name`,
  `select provider_id,raw_claim,geography_type,normalized_label,normalized_geoid,source_url from move_v2.provider_service_geography_observation order by provider_id,geography_type,raw_claim`,
];

async function main() {
  const client = new Client({ connectionString: directDatabaseUrl(), ssl });
  await client.connect();
  try {
    for (const query of queries) console.log(JSON.stringify((await client.query(query)).rows));
  } finally {
    await client.end();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
