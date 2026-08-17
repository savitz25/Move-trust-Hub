export const SERVICE_GEOGRAPHY_RULE_VERSION="MOVE_SERVICE_GEOGRAPHY_2026_08_V2" as const;
export type ServiceClaimType="EXHAUSTIVE_EXPLICIT_AREA"|"POSITIVE_EXPLICIT_AREA"|"EXPLICIT_EXCLUSION"|"EXAMPLE_LOCATION_MENTION"|"VAGUE_REGION"|"SERVICE_AREA_REVIEW";
export type GeographyType="STATE"|"COUNTY"|"PLACE"|"CITY"|"ZIP"|"REGION"|"NAMED_SERVICE_AREA";
export type OfficialPlace={name:string;geoid:string;stateFips?:string};
export type GeographyObservation={rawClaim:string;claimType:ServiceClaimType;geographyType:GeographyType;normalizedLabel:string|null;normalizedGeoid:string|null;normalizationReason:string;isExhaustive:boolean;isExclusion:boolean;confidence:number};
const regions=["South Florida","Central Florida","North Florida","Puget Sound","Seattle metro","Tampa Bay","Treasure Coast","Space Coast","Chicagoland","Chicago metro","Central Illinois","Southern Illinois"];
const clean=(html:string)=>html.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<nav[\s\S]*?<\/nav>/gi," ").replace(/<[^>]+>/g," ").replace(/&(?:nbsp|amp);/g," ").replace(/\s+/g," ").trim();
const escape=(v:string)=>v.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
export function classifyServiceClaim(raw:string):ServiceClaimType{
  if(/\b(?:do not|don't|does not|excluding|except|limited to|only within|city limits only)\b/i.test(raw))return "EXPLICIT_EXCLUSION";
  if(/\b(?:for example|e\.g\.|such as|moving from .+ to|our [A-Z][a-z]+ movers|testimonial|customer stor)/i.test(raw))return "EXAMPLE_LOCATION_MENTION";
  if(/(?:\b(?:serve only|service area consists of|following counties|service limited to)\b|\bareas we serve\s*:)/i.test(raw))return "EXHAUSTIVE_EXPLICIT_AREA";
  if(/\b(?:and beyond|throughout the region|greater .+ area)\b/i.test(raw))return "VAGUE_REGION";
  if(/\b(?:serve|serves|serving|service area|moving services? (?:in|throughout)|local moves? (?:in|within))\b/i.test(raw))return "POSITIVE_EXPLICIT_AREA";
  return "SERVICE_AREA_REVIEW";
}
export function extractServiceClaims(html:string){const value=clean(html);return[...new Set(value.split(/(?<=[.!?])\s+|\s+(?=Areas? we serve\s*:)/i).filter(s=>s.length>=12&&s.length<=600&&/(serv(?:e|es|ing|ice area)|areas? we serve|moving services? (?:in|throughout)|local moves? (?:in|within)|do not serve|service limited|count(?:y|ies)|city limits)/i.test(s)).map(s=>s.trim()))]}
export function normalizeServiceClaim(rawClaim:string,counties:{name:string;geoid:string}[],places:(OfficialPlace|string)[]=[]):GeographyObservation[]{
 const claimType=classifyServiceClaim(rawClaim),isExhaustive=claimType==="EXHAUSTIVE_EXPLICIT_AREA",isExclusion=claimType==="EXPLICIT_EXCLUSION";
 if(claimType==="EXAMPLE_LOCATION_MENTION")return[{rawClaim,claimType,geographyType:"NAMED_SERVICE_AREA",normalizedLabel:null,normalizedGeoid:null,normalizationReason:"EXAMPLE_MENTION_REJECTED",isExhaustive:false,isExclusion:false,confidence:.98}];
 const out:GeographyObservation[]=[];
 for(const c of counties)if(new RegExp(`\\b${escape(c.name)}(?: County)?\\b`,`i`).test(rawClaim))out.push({rawClaim,claimType,geographyType:"COUNTY",normalizedLabel:`${c.name} County`,normalizedGeoid:c.geoid,normalizationReason:"EXACT_OFFICIAL_COUNTY_NAME",isExhaustive,isExclusion,confidence:.98});
 for(const z of new Set(rawClaim.match(/\b\d{5}\b/g)??[]))out.push({rawClaim,claimType,geographyType:"ZIP",normalizedLabel:z,normalizedGeoid:z,normalizationReason:"EXACT_PUBLISHED_FIVE_DIGIT_CODE; ZCTA_RESOLUTION_SEPARATE",isExhaustive,isExclusion,confidence:.9});
 for(const region of regions)if(new RegExp(`\\b${escape(region)}\\b`,`i`).test(rawClaim))out.push({rawClaim,claimType:claimType==="POSITIVE_EXPLICIT_AREA"?"VAGUE_REGION":claimType,geographyType:"REGION",normalizedLabel:region,normalizedGeoid:null,normalizationReason:"NAMED_REGION_RETAINED_WITHOUT_BOUNDARY_INFERENCE",isExhaustive:false,isExclusion,confidence:.8});
 for(const item of places){const p=typeof item==="string"?{name:item,geoid:null}:{name:item.name,geoid:item.geoid};if(new RegExp(`\\b${escape(p.name)}\\b`,`i`).test(rawClaim))out.push({rawClaim,claimType,geographyType:"PLACE",normalizedLabel:p.name,normalizedGeoid:p.geoid,normalizationReason:p.geoid?"EXACT_OFFICIAL_CENSUS_PLACE_NAME; NO_COUNTY_EXPANSION":"RECOGNIZED_CITY_NAME; NO_COUNTY_EXPANSION",isExhaustive,isExclusion,confidence:p.geoid?.98:.9});}
 if(!out.length)out.push({rawClaim,claimType,geographyType:"NAMED_SERVICE_AREA",normalizedLabel:null,normalizedGeoid:null,normalizationReason:"UNSTRUCTURED_LANGUAGE_RETAINED_WITHOUT_INFERENCE",isExhaustive:false,isExclusion,confidence:.55});return out;
}
export const mayUseAsPositiveGroundTruth=(o:GeographyObservation)=>["POSITIVE_EXPLICIT_AREA","EXHAUSTIVE_EXPLICIT_AREA"].includes(o.claimType)&&!!(o.normalizedGeoid??o.normalizedLabel);
export const mayUseAsNegativeGroundTruth=(o:GeographyObservation)=>o.claimType==="EXHAUSTIVE_EXPLICIT_AREA"||o.claimType==="EXPLICIT_EXCLUSION";
export function geographyConflict(rows:GeographyObservation[]){const keys=new Map<string,Set<boolean>>();for(const r of rows){if(!r.normalizedGeoid&&!r.normalizedLabel)continue;const k=`${r.geographyType}:${r.normalizedGeoid??r.normalizedLabel}`,s=keys.get(k)??new Set<boolean>();s.add(r.isExclusion);keys.set(k,s)}return[...keys.values()].some(x=>x.size>1)}
