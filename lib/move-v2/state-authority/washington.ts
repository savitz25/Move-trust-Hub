import type { StateAuthorityRecord } from "./types";

export interface WashingtonUtcRecord extends StateAuthorityRecord {
  state: "WA";
  authorityType: "WA_UTC_HHG";
  utcId: string;
  ubi?: string;
  usdot?: string;
  detailUrl: string;
}

const clean = (html: string) => html.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g,"\n").replace(/&amp;/g,"&").replace(/&#039;|&apos;/g,"'").split(/\r?\n/).map(x=>x.trim()).filter(Boolean);

export function parseWashingtonList(html: string): WashingtonUtcRecord[] {
  return [...html.matchAll(/<tr>([\s\S]*?)<\/tr>/gi)].flatMap((m) => {
    const row=m[1]; const detail=row.match(/href="(\/company\/\d+)"/i)?.[1]; if(!detail)return [];
    const cell=(field:string)=>row.match(new RegExp(`views-field-${field}[^>]*>([\\s\\S]*?)<\\/td>`,`i`))?.[1]??"";
    const text=(v:string)=>clean(v).join(" ").replace(/^DBA:\s*/i,"").replace(/^\[|\]$/g,"").trim();
    const utcId=text(cell("field-company-utc-id")); const legalName=text(cell("field-company-name"));
    if(!utcId||!legalName)return [];
    const dbaRaw=clean(cell("field-company-dba-names")).join(" ").replace(/DBA:\s*/gi,"|");
    const dbas=dbaRaw.split("|").map(x=>x.trim()).filter(Boolean);
    const status=text(cell("field-company-regulatory-status")).match(/Active|Inactive|Unregulated|Cancelled|Suspended/i)?.[0]?.toUpperCase()??"UNKNOWN";
    return [{state:"WA" as const,authorityType:"WA_UTC_HHG" as const,licenseNumber:utcId,status,legalName,dbaName:dbas[0],utcId,
      ubi:text(cell("field-company-ubi"))||undefined,usdot:text(cell("field-usdot"))||undefined,detailUrl:`https://www.utc.wa.gov${detail}`,
      sourceRecordReference:`WAUTC:${utcId}`}];
  });
}

export function enrichWashingtonDetail(base: WashingtonUtcRecord, html: string): WashingtonUtcRecord {
  const lines=clean(html);
  const contactIndex=lines.indexOf("Company Contacts");
  const addressIndex=lines.indexOf("Company Address");
  const phone=contactIndex>=0?lines.slice(contactIndex,addressIndex>contactIndex?addressIndex:contactIndex+30).find(x=>/^\d{3}[-.) ]\d{3}[- ]\d{4}/.test(x)):undefined;
  const email=contactIndex>=0?lines.slice(contactIndex,addressIndex>contactIndex?addressIndex:contactIndex+30).find(x=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x)):undefined;
  const physical=addressIndex>=0?lines.slice(addressIndex,addressIndex+20).find((x,i,a)=>i>0&&a[i-1]==="Physical Address"):undefined;
  const cityZip=physical?.match(/,\s*([^,]+),\s*WA\s+(\d{5})/i);
  return {...base,phone,email,address:physical,city:cityZip?.[1],postalCode:cityZip?.[2],
    relationshipObservations:contactIndex>=0&&addressIndex>contactIndex?lines.slice(contactIndex,addressIndex).flatMap((x,i,a)=>
      ["Owner","President","Manager","Member"].includes(x)&&a[i-1]?[{term:x.toUpperCase(),name:a[i-1]}]:[]):[]};
}
