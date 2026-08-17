import { writeFileSync } from "node:fs";
import { Client } from "pg";
import { databaseUrl, ssl } from "../db/connection";
async function main(){
 const c=new Client({connectionString:databaseUrl(),ssl});await c.connect(); const q=async(s:string,p:unknown[]=[])=>(await c.query(s,p)).rows;
 const run="TASK004B_STATE_QUALIFIED_2026_08_16_V1";
 const audit={generatedAt:new Date().toISOString(),
  stateReleases:await q(`select state,source_name,retrieved_at,record_count,sha256,retrieval_method,ingestion_status from move_v2.state_source_release order by retrieved_at`),
  distinctStateRecords:await q(`select state,authority_type,count(distinct license_registration_number)::int licenses,count(*)::int release_rows from move_v2.state_authority_source_record group by 1,2 order by 1,2`),
  matches:await q(`select state,match_status,count(distinct provider_id)::int providers from move_v2.provider_state_authority_match group by 1,2 order by 1,2`),
  eligibility:await q(`select state,eligibility,count(*)::int providers from move_v2.provider_local_eligibility where superseded_at is null group by 1,2 order by 1,2`),
  stateObservations:await q(`select contact_type,count(*)::int observations,count(distinct provider_id)::int providers from move_v2.state_authority_contact_observation group by 1 order by 1`),
  sourceFields:await q(`select count(*) filter(where dba_name is not null)::int dba,count(*) filter(where phone is not null)::int phone,count(*) filter(where email is not null)::int email,count(*) filter(where website is not null)::int website,count(*) filter(where jsonb_array_length(relationship_observations)>0)::int relationships from move_v2.state_authority_source_record`),
  google:await q(`select g.match_status,count(*)::int providers from move_v2.enrichment_queue e join move_v2.google_place_match g using(provider_id) where e.wave='STATE_004B' group by 1 order by 1`),
  googleRequests:await q(`select request_type,response_status,count(*)::int requests,sum(billable_count)::int billable from move_v2.enrichment_request_ledger where run_id=$1 group by 1,2 order by 1,2`,[run]),
  websites:await q(`select coalesce(w.match_status,'NO_WEBSITE_URI') status,count(*)::int providers from move_v2.enrichment_queue e join move_v2.google_place_match g using(provider_id) left join move_v2.provider_website_identity w using(provider_id) where e.wave='STATE_004B' and g.match_status='GOOGLE_MATCH_HIGH_CONFIDENCE' group by 1 order by 1`),
  websiteObservations:await q(`select o.observation_type,count(*)::int observations from move_v2.provider_published_observation o join move_v2.enrichment_queue e using(provider_id) where e.wave='STATE_004B' group by 1 order by 1`),
  geography:await q(`select g.evidence_status,count(*)::int providers,count(*) filter(where g.derived_service_area_required)::int derived_required from move_v2.provider_geography_evidence g join move_v2.enrichment_queue e using(provider_id) join move_v2.provider_local_eligibility le using(provider_id) where e.wave='STATE_004B' and le.superseded_at is null and le.eligibility='STATE_VERIFIED_LOCAL_MOVER' group by 1 order by 1`),
  v1:await q(`select (select count(*) from public.companies)::int companies,(select count(*) from public.reviews)::int reviews`)};
 const sample=await q(`select e.eligibility,f.usdot,f.display_name,f.legal_name,f.dba_name,f.power_units,
   s.authority_type,s.license_registration_number,s.status,s.expiration_date,m.match_score,array_to_string(m.reason_codes,'|') reasons
   from move_v2.provider_local_eligibility e join move_v2.fmcsa_provider_fact f using(provider_id)
   join move_v2.provider_state_authority_match m using(provider_id,state)
   join move_v2.state_authority_source_record s on s.state_authority_source_record_id=m.state_authority_source_record_id
   where e.state='FL' and e.superseded_at is null order by e.eligibility,f.power_units desc nulls last,f.usdot`);
 const headers=Object.keys(sample[0]??{});writeFileSync('docs/task-004b-manual-qa.csv',[headers.join(','),...sample.map(r=>headers.map(h=>JSON.stringify(r[h]??'')).join(','))].join('\n'));
 writeFileSync('docs/task-004b-db-audit.json',JSON.stringify(audit,null,2));console.log(JSON.stringify(audit));await c.end();}
void main();
