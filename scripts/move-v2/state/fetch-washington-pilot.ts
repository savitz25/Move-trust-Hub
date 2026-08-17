import {createHash} from "node:crypto"; import {existsSync,mkdirSync,readFileSync,writeFileSync} from "node:fs";
import {enrichWashingtonDetail,parseWashingtonList} from "../../../lib/move-v2/state-authority/washington";
import type {WashingtonUtcRecord} from "../../../lib/move-v2/state-authority/washington";
const root="https://www.utc.wa.gov"; const headers={"user-agent":"MoveTrustHub state-regulatory pilot/1.0 (+https://movetrusthub.com)"};
const get=async(url:string)=>{for(let attempt=1;attempt<=3;attempt++){const r=await fetch(url,{headers,signal:AbortSignal.timeout(60_000)});if(r.ok)return r.text();if(attempt<3)await new Promise(x=>setTimeout(x,attempt*1000));else throw new Error(`UTC ${r.status}`)}throw new Error("UTC retry exhausted")};
const pause=()=>new Promise(r=>setTimeout(r,250));
async function main(){
 const activeHtml=await get(`${root}/companies?combine=&exposed_select_industry=568&regulatory_status=1&usdot=`);
 const allHtml=await get(`${root}/companies?combine=&exposed_select_industry=568&regulatory_status=All&usdot=`);
 const active=parseWashingtonList(activeHtml).filter(x=>x.status==="ACTIVE").slice(0,50);
 const nonactive=parseWashingtonList(allHtml).filter(x=>x.status!=="ACTIVE").slice(0,15);
 const selected=[...active,...nonactive]; const enriched:WashingtonUtcRecord[]=[];
 const prior:WashingtonUtcRecord[]=existsSync("artifacts/move-v2/state/wa-utc-pilot.json")?JSON.parse(readFileSync("artifacts/move-v2/state/wa-utc-pilot.json","utf8")) as WashingtonUtcRecord[]:[];
 const cached=new Map(prior.map((x)=>[x.utcId,x]));
 for(const record of selected){const old=cached.get(record.utcId);if(old?.address){enriched.push({...old,...record,ubi:record.ubi,relationshipObservations:(old.relationshipObservations??[]).filter((x)=>!["PRIMARY","CONTACT"].includes(x.term))});continue}await pause();try{enriched.push(enrichWashingtonDetail(record,await get(record.detailUrl)))}catch{enriched.push(record)}}
 mkdirSync("artifacts/move-v2/state",{recursive:true});const json=JSON.stringify(enriched,null,2);
 writeFileSync("artifacts/move-v2/state/wa-utc-pilot.json",json);
 console.log(JSON.stringify({active:active.length,nonactive:nonactive.length,total:enriched.length,sha256:createHash("sha256").update(json).digest("hex"),bytes:Buffer.byteLength(json)}));
}
void main();
