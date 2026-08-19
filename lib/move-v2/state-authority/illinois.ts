import type { StateAuthorityRecord } from "./types";

export const ILLINOIS_ADAPTER_VERSION = "IL_ICC_MCIS_2026_08_V1" as const;
export type IllinoisMoveObservation = { year: number; reportedMoveCount: number };
export type IllinoisInsuranceObservation = { authority: string; group: string; required: boolean; onFileNotCancelled: boolean };
export interface IllinoisIccRecord extends StateAuthorityRecord {
  state: "IL"; authorityType: "IL_ILCC_HHG"; entityId: string;
  annualMoves: IllinoisMoveObservation[]; insurance: IllinoisInsuranceObservation[];
  complaintText: string | null; warehousingStatus: string | null;
}
const text = (html: string) => html.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
const capture = (value: string, re: RegExp) => value.match(re)?.[1]?.trim();

/** Parse only an ordinary public MCIS entity profile; search discovery is deliberately separate. */
export function parseIllinoisEntityProfile(html: string, sourceUrl: string): IllinoisIccRecord {
  const entityId = sourceUrl.match(/\/entity\/(\d+)/)?.[1];
  if (!entityId) throw new Error("ICC_ENTITY_ID_MISSING");
  const plain = text(html);
  const ilcc = capture(plain,/\bILCC:\s*(\d+)/i);
  const legalName = capture(html,/<h1[^>]*>([\s\S]*?)<\/h1>/i) ?? capture(html,/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  if (!ilcc || !legalName) throw new Error("ICC_PROFILE_IDENTITY_MISSING");
  const usdot = capture(plain,/\bUS\s*DOT:\s*(\d+)/i);
  const hhg = plain.match(/Household Goods Movers\s+Status\s+(.+?)(?=Number of Complaints|No complaints|Reported Number of Moves|No moves found|Public Carrier Certificate|Warehousing|$)/i)?.[1]?.trim() ?? "STATUS_NOT_DISPLAYED";
  const annualMoves: IllinoisMoveObservation[] = [];
  for (const m of plain.matchAll(/\b(20\d{2})\s+([\d,]+)(?=\s|$)/g)) {
    const prefix=plain.slice(Math.max(0,(m.index??0)-180),m.index);
    if (/Reported Number of Moves/i.test(prefix) || annualMoves.length) annualMoves.push({year:Number(m[1]),reportedMoveCount:Number(m[2].replaceAll(",",""))});
  }
  const insurance: IllinoisInsuranceObservation[]=[];
  for(const m of plain.matchAll(/(Cargo Insurance|Liability Insurance|Warehouse Insurance)\s+([XY])\s+([YN])/gi)) insurance.push({authority:/warehouse/i.test(m[1])?"WAREHOUSING":"DISPLAYED_AUTHORITY",group:m[1],required:m[2].toUpperCase()==="X",onFileNotCancelled:m[3].toUpperCase()==="Y"});
  const assumed=plain.match(/Assumed Name\(s\)\s+(.+?)(?=Authorities|Filings|$)/i)?.[1]?.trim();
  return {state:"IL",authorityType:"IL_ILCC_HHG",licenseNumber:ilcc,status:hhg,legalName:text(legalName),dbaName:assumed,usdot,entityId,
    annualMoves:[...new Map(annualMoves.map(x=>[x.year,x])).values()],insurance,
    complaintText:plain.match(/(?:Number of Complaints|No complaints)[\s\S]*?(?=Reported Number of Moves|No moves found|Public Carrier Certificate|Warehousing|$)/i)?.[0]?.trim()??null,
    warehousingStatus:plain.match(/Warehousing\s+(Active|Pending|Expired|Revoked)(?:\s+[A-Z][a-z]+\s+\d{1,2},\s+\d{4})?/i)?.[1]??null,
    sourceRecordReference:`ICC_ENTITY:${entityId}`,};
}

export function exactUsdotIdentity(record: IllinoisIccRecord, provider: { usdot?: string | number | null }) {
  const a=(record.usdot??"").replace(/\D/g,""),b=String(provider.usdot??"").replace(/\D/g,"");
  return a.length>0&&a===b?{status:"STATE_MATCH_HIGH_CONFIDENCE" as const,reasonCodes:["USDOT_EXACT"]}:{status:"STATE_MATCH_REVIEW" as const,reasonCodes:a&&b?["USDOT_CONFLICT"]:["USDOT_UNAVAILABLE"]};
}
