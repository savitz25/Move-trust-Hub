import { createReadStream, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { Client } from 'pg';
import { parse } from 'csv-parse';
import { directDatabaseUrl, ssl } from './connection';

const root = resolve('.data/fmcsa/2026-08-16');
const normalized = resolve(root, 'normalized');
const releases = [
  { key:'census', name:'Company Census File', id:'az4n-8mr2', file:'company-census-projected.csv', rows:4485162, sha:'a27d62ec46d67c2bb1de2b172cff12bcec0702d13f30d693107bb861223f777b', updated:'2026-08-15T10:52:32Z', metadata:'2026-08-16T10:22:57Z', era:'MCMIS_CENSUS_CURRENT' },
  { key:'carrier', name:'Motus Carrier - All With History', id:'inys-ebih', file:'motus-carrier.csv', rows:107097, sha:'9f3fb74bcb24f5b33c6bf442b5ea6573198ca356de3090e39e5ae347c9672e3d', updated:'2026-08-16T10:33:07Z', metadata:'2026-08-16T10:32:54Z', era:'MOTUS_CURRENT' },
  { key:'history', name:'Motus AuthHist - All With History', id:'yu5v-wbh6', file:'motus-authhist.csv', rows:120850, sha:'fb49afb4b555531ad17984421ad5e79c69acd654a991658ee71dd6c6ef2fceec', updated:'2026-08-16T10:34:42Z', metadata:'2026-08-16T10:34:35Z', era:'MOTUS_CURRENT' },
  { key:'insurance', name:'Motus Insur - All With History', id:'c5y8-a4uz', file:'motus-insurance.csv', rows:100645, sha:'18d248d480b8cfe19c4b8c81cb8b47db26a2c65253c9c91dfb0225928223f106', updated:'2026-08-16T10:33:14Z', metadata:'2026-08-16T10:33:08Z', era:'MOTUS_CURRENT' },
  { key:'boc3', name:'Motus BOC3 - All With History', id:'6snj-ed7q', file:'motus-boc3.csv', rows:110966, sha:'51673b59962350b8648654dea9fa737b379520e2fa5da44293cb105338a01caa', updated:'2026-08-16T10:34:23Z', metadata:'2026-08-16T10:34:14Z', era:'MOTUS_CURRENT' },
  { key:'revoke', name:'Motus RevokeSuspend - All With History', id:'wb4f-neki', file:'motus-revoke-suspend.csv', rows:9956, sha:'1ba1acab515fdd61b60f1d5cf214f21d4fa84ef08b9eb76c28e8213a246193d9', updated:'2026-08-16T10:32:47Z', metadata:'2026-08-16T10:32:46Z', era:'MOTUS_CURRENT' },
] as const;

const staging: Record<string,{file:string;columns:string[]}> = {
 providers:{file:'providers.csv',columns:['provider_id','usdot','display_name','legal_name','dba_name','census_status','carrier_operation','physical_street','physical_city','physical_state','physical_zip','physical_country','mailing_street','mailing_city','mailing_state','mailing_zip','mailing_country','phone','email','power_units','truck_units','total_drivers','mcs150_date','moving_relevance','relevance_reasons','classification','rule_version','reason_codes','conflict_codes','supporting_source_keys','source_release_date']},
 authorities:{file:'authorities.csv',columns:['source_record_key','provider_id','usdot','docket_number','docket_prefix','authority_type','authority_status','min_cov_amount','cargo_required','bond_required','bipd_on_file','cargo_on_file','bond_on_file','source_release_date']},
 history:{file:'authority-history.csv',columns:['source_record_key','provider_id','usdot','docket_number','authority_type','authority_status','reason','status_change_date','source_release_date']},
 insurance:{file:'insurance.csv',columns:['source_record_key','provider_id','usdot','docket_number','form_code','type_code','class_code','max_cov_amount','underlying_amount','effective_date','insurance_company_name','transaction_date','source_release_date']},
 revoke:{file:'revoke-suspend.csv',columns:['source_record_key','provider_id','usdot','docket_number','authority_type','serve_date','action_type','effective_date','source_release_date']},
 boc3:{file:'boc3.csv',columns:['source_record_key','provider_id','usdot','docket_number','blanket_company_name','source_release_date']},
};
const bool = (column:string) => `case ${column} when 'true' then true when 'false' then false else null end`;
const num = (column:string) => `nullif(${column},'')::integer`;

async function main() {
 const c=new Client({connectionString:directDatabaseUrl(),ssl}); await c.connect(); const started=Date.now();
 try {
  const existing=await c.query(`select (select count(*) from move_v2.fmcsa_source_release where ingestion_status='PUBLISHED' and (dataset_id,sha256) in (('az4n-8mr2','a27d62ec46d67c2bb1de2b172cff12bcec0702d13f30d693107bb861223f777b'),('inys-ebih','9f3fb74bcb24f5b33c6bf442b5ea6573198ca356de3090e39e5ae347c9672e3d'),('yu5v-wbh6','fb49afb4b555531ad17984421ad5e79c69acd654a991658ee71dd6c6ef2fceec'),('c5y8-a4uz','18d248d480b8cfe19c4b8c81cb8b47db26a2c65253c9c91dfb0225928223f106'),('6snj-ed7q','51673b59962350b8648654dea9fa737b379520e2fa5da44293cb105338a01caa'),('wb4f-neki','1ba1acab515fdd61b60f1d5cf214f21d4fa84ef08b9eb76c28e8213a246193d9')))::integer releases,(select count(*) from move_v2.fmcsa_provider_fact)::integer providers`);
  if(existing.rows[0].releases===6&&existing.rows[0].providers===277813){console.log('FMCSA database publication: IDEMPOTENT NO-OP');return;}
  await c.query('create schema if not exists move_v2_stage');
  await c.query('revoke all on schema move_v2_stage from public, anon, authenticated');
  const ids:Record<string,string>={};
  for(const r of releases){const path=resolve(root,r.file);const q=await c.query(`insert into move_v2.fmcsa_source_release(source_name,dataset_id,dataset_url,publisher,retrieved_at,source_data_updated_at,source_metadata_updated_at,record_count,file_size,sha256,schema_version,data_dictionary_reference,source_era,ingestion_status) values($1,$2,$3,'Federal Motor Carrier Safety Administration',$4,$5,$6,$7,$8,$9,'TASK002_2026_08_V1',$10,$11,'STAGED') on conflict(dataset_id,sha256) do update set ingestion_status=case when move_v2.fmcsa_source_release.ingestion_status='PUBLISHED' then 'PUBLISHED' else 'STAGED' end returning source_release_id`,[r.name,r.id,`https://data.transportation.gov/resource/${r.id}`,statSync(path).birthtime.toISOString(),r.updated,r.metadata,r.rows,statSync(path).size,r.sha,`https://data.transportation.gov/api/views/${r.id}`,r.era]);ids[r.key]=q.rows[0].source_release_id;}
  for(const [name,s] of Object.entries(staging)){
   const table=`move_v2_stage.stg_${name}`;
   await c.query(`create unlogged table if not exists ${table} (${s.columns.map(x=>`${x} text`).join(',')})`);
   await c.query(`truncate ${table}`);
   const parser=createReadStream(resolve(normalized,s.file)).pipe(parse({columns:true,bom:true,skip_empty_lines:true}));
   let batch:Record<string,string>[]=[];
   const flush=async()=>{if(!batch.length)return;const values:string[]=[];const params:string[]=[];let p=1;for(const row of batch){values.push(`(${s.columns.map(()=>`$${p++}`).join(',')})`);for(const col of s.columns)params.push(row[col]??'');}await c.query(`insert into ${table}(${s.columns.join(',')}) values ${values.join(',')}`,params);batch=[];};
   for await(const row of parser){batch.push(row as Record<string,string>);if(batch.length===250)await flush();}await flush();
  }
  await c.query('set search_path=move_v2_stage,public');
  await c.query(`insert into move_v2.provider(provider_id) select provider_id::uuid from stg_providers on conflict do nothing`);
  await c.query(`insert into move_v2.fmcsa_provider_fact(provider_id,source_release_id,usdot,legal_name,dba_name,display_name,entity_type,usdot_status,carrier_operation,hhg_cargo_reported,physical_address,mailing_address,phone,power_units,drivers,source_record_key,moving_relevance,relevance_reasons) select provider_id::uuid,$1,usdot,legal_name,nullif(dba_name,''),display_name,null,census_status,carrier_operation,relevance_reasons::jsonb ? 'FMCSA_CARGO_HOUSEHOLD_GOODS',jsonb_build_object('street',physical_street,'city',physical_city,'state',physical_state,'zip',physical_zip,'country',physical_country),jsonb_build_object('street',mailing_street,'city',mailing_city,'state',mailing_state,'zip',mailing_zip,'country',mailing_country),nullif(phone,''),${num('power_units')},${num('total_drivers')},'az4n-8mr2:'||usdot,moving_relevance,array(select jsonb_array_elements_text(relevance_reasons::jsonb)) from stg_providers on conflict(provider_id) do update set display_name=excluded.display_name,legal_name=excluded.legal_name,dba_name=excluded.dba_name,usdot_status=excluded.usdot_status,carrier_operation=excluded.carrier_operation,physical_address=excluded.physical_address,mailing_address=excluded.mailing_address,phone=excluded.phone,power_units=excluded.power_units,drivers=excluded.drivers,moving_relevance=excluded.moving_relevance,relevance_reasons=excluded.relevance_reasons,source_release_id=excluded.source_release_id`,[ids.census]);
  await c.query(`insert into move_v2.fmcsa_classification_result(provider_id,source_release_ids,classification,rule_version,classified_at,supporting_facts,reason_codes,conflicts) select provider_id::uuid,$1::uuid[],classification,rule_version,now(),jsonb_build_object('source_keys',supporting_source_keys::jsonb,'moving_relevance',moving_relevance),array(select jsonb_array_elements_text(reason_codes::jsonb)),array(select jsonb_array_elements_text(conflict_codes::jsonb)) from stg_providers p where not exists(select 1 from move_v2.fmcsa_classification_result x where x.provider_id=p.provider_id::uuid and x.rule_version=p.rule_version and x.superseded_at is null)`,[[...Object.values(ids)]]);
  await c.query('truncate stg_providers');
  await c.query(`insert into move_v2.fmcsa_authority(provider_id,source_release_id,source_record_key,usdot,docket_number,docket_prefix,authority_type,authority_status,cargo_required,cargo_on_file,bond_required,bond_on_file,minimum_bipd_coverage,bipd_on_file,raw_record_reference) select provider_id::uuid,$1,source_record_key,usdot,nullif(docket_number,''),nullif(docket_prefix,''),authority_type,authority_status,${bool('cargo_required')},${bool('cargo_on_file')},${bool('bond_required')},${bool('bond_on_file')},nullif(min_cov_amount,'')::bigint,nullif(bipd_on_file,'')::bigint,'artifact:motus-carrier.csv#'||source_record_key from stg_authorities on conflict do nothing`,[ids.carrier]);
  await c.query('truncate stg_authorities');
  await c.query(`insert into move_v2.fmcsa_authority_event(provider_id,source_release_id,source_record_key,usdot,docket_number,authority_type,authority_status,reason,status_change_date,event_kind,raw_record_reference) select provider_id::uuid,$1,source_record_key,usdot,nullif(docket_number,''),authority_type,authority_status,nullif(reason,''),nullif(status_change_date,'')::date,'AUTHORITY_HISTORY','artifact:motus-authhist.csv#'||source_record_key from stg_history on conflict do nothing`,[ids.history]);
  await c.query('truncate stg_history');
  await c.query(`insert into move_v2.fmcsa_authority_event(provider_id,source_release_id,source_record_key,usdot,docket_number,authority_type,authority_status,reason,status_change_date,event_kind,raw_record_reference) select provider_id::uuid,$1,source_record_key,usdot,nullif(docket_number,''),authority_type,action_type,concat_ws('; ','serve='||nullif(serve_date,''),'effective='||nullif(effective_date,'')),nullif(effective_date,'')::date,'REVOKE_SUSPEND','artifact:motus-revoke-suspend.csv#'||source_record_key from stg_revoke on conflict do nothing`,[ids.revoke]);
  await c.query('truncate stg_revoke');
  await c.query(`insert into move_v2.fmcsa_insurance_filing(provider_id,source_release_id,source_record_key,usdot,docket_number,filing_type,form_code,insurance_carrier,effective_date,policy_reference,filing_status,raw_record_reference) select provider_id::uuid,$1,source_record_key,usdot,nullif(docket_number,''),nullif(type_code,''),nullif(form_code,''),nullif(insurance_company_name,''),nullif(effective_date,'')::date,null,nullif(class_code,''),'artifact:motus-insurance.csv#'||source_record_key from stg_insurance on conflict do nothing`,[ids.insurance]);
  await c.query('truncate stg_insurance');
  await c.query(`insert into move_v2.fmcsa_boc3(provider_id,source_release_id,source_record_key,usdot,docket_number,raw_record_reference) select provider_id::uuid,$1,source_record_key,usdot,nullif(docket_number,''),'artifact:motus-boc3.csv#'||source_record_key||';company='||blanket_company_name from stg_boc3 on conflict do nothing`,[ids.boc3]);
  await c.query('truncate stg_boc3');
  const check=await c.query(`select count(*)::integer published from move_v2.fmcsa_provider_fact`);if(check.rows[0].published!==277813)throw new Error(`Provider reconciliation failed`);
  await c.query('begin');
  await c.query(`update move_v2.fmcsa_source_release set ingestion_status='PUBLISHED' where source_release_id=any($1::uuid[])`,[[...Object.values(ids)]]);
  await c.query('commit');
  await c.query('drop schema move_v2_stage cascade');
  console.log(`FMCSA database publication: PASS (${((Date.now()-started)/1000).toFixed(2)}s)`);
 } catch(e){try{await c.query('rollback');}catch{}throw e;} finally{await c.end();}
}
void main();
