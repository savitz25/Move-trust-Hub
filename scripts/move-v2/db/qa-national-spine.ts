import { writeFileSync } from 'node:fs';
import { Client } from 'pg';
import { directDatabaseUrl, ssl } from './connection';
import { loadEnvLocal } from '../../../lib/verification/load-env-local';
import { fetchCarrierByDot } from '../../../lib/fmcsa/refresh/fetch-carrier-core';

const targets:Record<string,number>={INTERSTATE_CARRIER:25,LOCAL_INTRASTATE_CARRIER_CANDIDATE:25,AUTHORIZED_BROKER:25,DUAL_ROLE_CARRIER_BROKER:10,INACTIVE_ENTITY:10,NEEDS_REGULATORY_REVIEW:20};
const cell=(v:unknown)=>`"${String(v??'').replace(/"/g,'""')}"`;

async function main(){
 loadEnvLocal();const c=new Client({connectionString:directDatabaseUrl(),ssl});await c.connect();
 try{
  // PostgreSQL JSON/array fields are intentionally retained in their driver-native shapes for the QA export.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows:any[]=[];
  for(const [classification,limit] of Object.entries(targets)){
   const q=await c.query(`with candidates as(select f.*,c.classification,c.reason_codes,c.conflicts,row_number() over(partition by f.physical_address->>'state' order by f.provider_id) state_rank from move_v2.fmcsa_provider_fact f join move_v2.fmcsa_classification_result c using(provider_id) where c.superseded_at is null and c.classification=$1) select x.provider_id,x.usdot,x.display_name,x.legal_name,x.dba_name,x.usdot_status,x.physical_address->>'state' state,x.power_units,x.drivers,x.classification,x.reason_codes,x.conflicts,(select count(*) from move_v2.fmcsa_authority a where a.provider_id=x.provider_id) authority_rows,(select count(*) from move_v2.fmcsa_authority_event e where e.provider_id=x.provider_id) history_rows,(select count(*) from move_v2.fmcsa_insurance_filing i where i.provider_id=x.provider_id) insurance_rows,(select count(*) from move_v2.fmcsa_docket_identifier d where d.provider_id=x.provider_id) census_dockets from candidates x order by state_rank,x.physical_address->>'state',x.provider_id limit $2`,[classification,limit]);rows.push(...q.rows);
  }
  const checked=rows.map(r=>({...r,dba_display_pass:r.dba_name? r.display_name===r.dba_name:r.display_name===r.legal_name,trace_pass:Number(r.authority_rows)+Number(r.history_rows)+Number(r.insurance_rows)+Number(r.census_dockets)>0||r.reason_codes.length>0}));
  const headers=Object.keys(checked[0]);writeFileSync('docs/task-002-entity-qa.csv',[headers.map(cell).join(','),...checked.map(r=>headers.map(h=>cell(r[h])).join(','))].join('\n')+'\n');
  const key=process.env.FMCSA_WEB_KEY?.trim();if(!key)throw new Error('FMCSA_WEB_KEY missing');
  const spot=[];for(const r of checked.filter((_,i)=>i%6===0).slice(0,20)){const api=await fetchCarrierByDot(r.usdot,key);spot.push({usdot:r.usdot,classification:r.classification,bulkLegal:r.legal_name,publicLegal:api?.legalName??null,bulkDba:r.dba_name,publicDba:api?.dbaName??null,bulkStatus:r.usdot_status,publicAllowed:api?.allowedToOperate??null,bulkPowerUnits:r.power_units,publicPowerUnits:api?.totalPowerUnits??null,bulkDrivers:r.drivers,publicDrivers:api?.totalDrivers??null,nameMatch:Boolean(api)&&api!.legalName?.trim().toUpperCase()===r.legal_name.trim().toUpperCase()});await new Promise(ok=>setTimeout(ok,250));}
  writeFileSync('docs/task-002-official-spot-check.json',JSON.stringify(spot,null,2)+'\n');
  console.log(`Entity QA: ${checked.length}/${Object.values(targets).reduce((a,b)=>a+b,0)} sampled; DBA display ${checked.filter(x=>x.dba_display_pass).length} pass; trace ${checked.filter(x=>x.trace_pass).length} pass`);
  console.log(`Official bounded spot checks: ${spot.length}; exact legal-name matches: ${spot.filter(x=>x.nameMatch).length}; discrepancies preserved: ${spot.filter(x=>!x.nameMatch).length}`);
 }finally{await c.end();}
}
void main();
