export type LocationConflict="STATE_VS_FMCSA_ADDRESS_CHANGE"|"GOOGLE_WRONG_STATE"|"MULTIPLE_BRANCH_AMBIGUITY"|"LEGAL_NAME_COLLISION"|"DBA_COLLISION"|"OLD_ADDRESS"|"VIRTUAL_OFFICE_REVIEW"|"INSUFFICIENT_CORROBORATION";
export type LocationObservation={source:"STATE_REGULATOR"|"FMCSA_PHYSICAL"|"FMCSA_MAILING"|"GOOGLE"|"OFFICIAL_WEBSITE";address?:string|null;city?:string|null;state?:string|null;zip?:string|null;phone?:string|null;latitude?:number|null;longitude?:number|null;observedAt?:string|null};
export type LocationDecision={status:"VERIFIED"|"LOCATION_REVIEW"|"NOT_RESOLVED";selected:LocationObservation|null;reason:string;conflicts:LocationConflict[];decisionVersion:"MOVE_LOCATION_DECISION_2026_08_V2";observations:LocationObservation[]};
const digits=(v?:string|null)=>(v??"").replace(/\D/g,"").slice(-10);
const zip5=(v?:string|null)=>(v??"").match(/\b\d{5}\b/)?.[0]??"";
const norm=(v?:string|null)=>(v??"").toUpperCase().replace(/\b(STREET|ST)\b/g,"ST").replace(/\b(ROAD|RD)\b/g,"RD").replace(/\b(AVENUE|AVE)\b/g,"AVE").replace(/[^A-Z0-9]/g,"");
const samePhone=(a?:string|null,b?:string|null)=>digits(a).length===10&&digits(a)===digits(b);
const sameAddress=(a?:string|null,b?:string|null)=>{const az=zip5(a),bz=zip5(b);return !!az&&az===bz&&norm(a).slice(0,12)===norm(b).slice(0,12)};
export function resolveLocation(input:{expectedState:string;googleStatus?:string|null;observations:LocationObservation[]}):LocationDecision{
 const observations=input.observations.filter(o=>o.address||o.phone||o.latitude!=null);const google=observations.find(o=>o.source==="GOOGLE");const official=observations.filter(o=>o.source==="STATE_REGULATOR"||o.source==="FMCSA_PHYSICAL");const conflicts:LocationConflict[]=[];
 if(!google?.latitude||google.longitude==null)return{status:observations.length?"LOCATION_REVIEW":"NOT_RESOLVED",selected:null,reason:"No sufficiently resolved coordinates",conflicts:["INSUFFICIENT_CORROBORATION"],decisionVersion:"MOVE_LOCATION_DECISION_2026_08_V2",observations};
 if(google.state&&google.state!==input.expectedState){conflicts.push("GOOGLE_WRONG_STATE");return{status:"LOCATION_REVIEW",selected:null,reason:"Google coordinates are in a different state",conflicts,decisionVersion:"MOVE_LOCATION_DECISION_2026_08_V2",observations};}
 if(input.googleStatus?.includes("MULTIPLE")){conflicts.push("MULTIPLE_BRANCH_AMBIGUITY");return{status:"LOCATION_REVIEW",selected:null,reason:"Multiple plausible identities remain",conflicts,decisionVersion:"MOVE_LOCATION_DECISION_2026_08_V2",observations};}
 if(input.googleStatus?.includes("CLOSED")){conflicts.push("OLD_ADDRESS");return{status:"LOCATION_REVIEW",selected:null,reason:"Candidate is reported closed",conflicts,decisionVersion:"MOVE_LOCATION_DECISION_2026_08_V2",observations};}
 const phoneMatch=official.some(o=>samePhone(o.phone,google.phone));const addressMatch=official.some(o=>sameAddress(o.address,google.address)||(zip5(o.zip)===zip5(google.zip)&&norm(o.city)===norm(google.city)));
 if(phoneMatch||addressMatch)return{status:"VERIFIED",selected:google,reason:phoneMatch&&addressMatch?"Google location corroborated by official phone and address":"Google location corroborated by an independent official "+(phoneMatch?"phone":"address"),conflicts,decisionVersion:"MOVE_LOCATION_DECISION_2026_08_V2",observations};
 return{status:"LOCATION_REVIEW",selected:null,reason:"Name-only or otherwise insufficient location corroboration",conflicts:["INSUFFICIENT_CORROBORATION"],decisionVersion:"MOVE_LOCATION_DECISION_2026_08_V2",observations};
}

export type ContactObservation={kind:string;value:string;source:string;observedAt:string;identityConfidence:string;businessRelevant:boolean;conflict?:boolean};
export function selectPrimaryContact(rows:ContactObservation[],kind:"PHONE"|"EMAIL"){
 const weight:Record<string,number>={OFFICIAL_WEBSITE:4,STATE_REGULATOR:3,GOOGLE:2,FMCSA:1};
 return rows.filter(x=>x.kind===kind&&x.identityConfidence==="HIGH"&&x.businessRelevant&&!x.conflict).sort((a,b)=>Date.parse(b.observedAt)-Date.parse(a.observedAt)||(weight[b.source]??0)-(weight[a.source]??0)||a.value.localeCompare(b.value))[0]??null;
}
export const websiteCorroborated=(candidate:{emailDomainOnly?:boolean;phoneMatch?:boolean;addressMatch?:boolean;identityMatch?:boolean;redirectRelated?:boolean})=>!candidate.emailDomainOnly&&candidate.identityMatch===true&&candidate.redirectRelated!==false&&(candidate.phoneMatch===true||candidate.addressMatch===true);
