import { createReadStream } from 'node:fs';
import { Client } from 'pg';
import { parse } from 'csv-parse';
import { directDatabaseUrl, ssl } from './connection';

async function main(){
 const c=new Client({connectionString:directDatabaseUrl(),ssl});await c.connect();
 try{
  const release=await c.query(`select source_release_id from move_v2.fmcsa_source_release where dataset_id='az4n-8mr2' and ingestion_status='PUBLISHED'`);
  if(!release.rowCount)throw new Error('Published Census release not found');
  const parser=createReadStream('.data/fmcsa/2026-08-16/company-census-hhg-dockets.csv').pipe(parse({columns:true,bom:true,skip_empty_lines:true}));
  let values:string[]=[];let params:string[]=[];let p=2;let observations=0;
  const flush=async()=>{if(!values.length)return;await c.query(`insert into move_v2.fmcsa_docket_identifier(provider_id,source_release_id,usdot,docket_prefix,docket_number,official_value,status_code) select f.provider_id,$1,v.usdot,v.prefix,v.number,v.official,v.status from (values ${values.join(',')}) v(usdot,prefix,number,official,status) join move_v2.fmcsa_provider_fact f on f.usdot=v.usdot on conflict do nothing`,[release.rows[0].source_release_id,...params]);values=[];params=[];p=2;};
  for await(const raw of parser){const row=raw as Record<string,string>;for(const n of ['1','2','3']){const prefix=(row[`docket${n}prefix`]??'').toUpperCase().trim();const number=(row[`docket${n}`]??'').replace(/\D/g,'').replace(/^0+(?=\d)/,'');if(!['MC','MX','FF'].includes(prefix)||!number)continue;values.push(`($${p++},$${p++},$${p++},$${p++},$${p++})`);params.push(row.dot_number.replace(/\D/g,''),prefix,number,`${prefix}${number}`,row[`docket${n}_status_code`]??'');observations++;if(values.length===250)await flush();}}await flush();
  console.log(`Census docket publication: PASS (${observations} observations scanned)`);
 }finally{await c.end();}
}
void main();
