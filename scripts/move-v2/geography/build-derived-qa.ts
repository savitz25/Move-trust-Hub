import { readFileSync, writeFileSync } from "node:fs";
import { Client } from "pg";
import type { WashingtonUtcRecord } from "../../../lib/move-v2/state-authority/washington";
import { directDatabaseUrl, ssl } from "../db/connection";

const csv = (value: unknown) => `"${String(value ?? "").replaceAll('"','""')}"`;
async function main() {
  const wa = JSON.parse(readFileSync("artifacts/move-v2/state/wa-utc-pilot.json","utf8")) as WashingtonUtcRecord[];
  const picked = [...wa.filter(x=>x.status==="ACTIVE"&&x.dbaName).slice(0,8),...wa.filter(x=>x.status==="ACTIVE"&&!x.dbaName).slice(0,12),...wa.filter(x=>x.status!=="ACTIVE").slice(0,5)];
  const client = new Client({connectionString:directDatabaseUrl(),ssl}); await client.connect();
  try {
    const rows:string[][]=[["state","official_id","official_status","legal_name","dba","usdot","ubi","official_detail","qa_result","notes"]];
    for(const item of picked) rows.push(["WA",item.utcId,item.status,item.legalName,item.dbaName??"",item.usdot??"",item.ubi??"",item.detailUrl,item.usdot?"IDENTIFIER_TRACEABLE":"STATE_REVIEW","Official UTC source; active status is not inferred from name"]);
    const fl=await client.query(`select a.provider_id::text,f.usdot,a.radius_miles::text,count(c.*)::text counties from move_v2.provider_derived_area a join move_v2.fmcsa_provider_fact f using(provider_id) left join move_v2.provider_county_placement c on c.provider_derived_area_id=a.provider_derived_area_id and c.active=true where a.state='FL' and a.superseded_at is null group by a.provider_id,f.usdot,a.radius_miles order by a.provider_id`);
    for(const item of fl.rows) rows.push(["FL",item.provider_id,"STATE_VERIFIED_LOCAL_MOVER","","",item.usdot,"","FDACS release retained in move_v2", "DERIVED_PLACEMENT_REVIEWED",`${item.radius_miles} mile fallback; ${item.counties} county relationships; Florida-clipped`]);
    writeFileSync("docs/task-005-manual-qa.csv",`${rows.map(row=>row.map(csv).join(",")).join("\n")}\n`);
    console.log(JSON.stringify({washingtonRows:picked.length,floridaRows:fl.rowCount,total:rows.length-1}));
  } finally { await client.end(); }
}
void main();
