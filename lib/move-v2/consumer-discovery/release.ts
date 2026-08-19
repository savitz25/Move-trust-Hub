import{createHash}from"node:crypto";
export const CONSUMER_DISCOVERY_V2="MOVE_CONSUMER_DISCOVERY_2026_08_V2" as const;
export type ReleaseInputs={authority:unknown;identity:unknown;locations:unknown;explicitService:unknown;websites:unknown;contacts:unknown;geographyVintage:unknown};
const stable=(value:unknown):string=>{if(Array.isArray(value))return`[${value.map(stable).join(",")}]`;if(value&&typeof value==="object")return`{${Object.entries(value as Record<string,unknown>).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>`${JSON.stringify(k)}:${stable(v)}`).join(",")}}`;return JSON.stringify(value)};
export const releaseFingerprint=(inputs:ReleaseInputs)=>createHash("sha256").update(stable(inputs)).digest("hex");
export function rebuildDecision(currentFingerprint:string|null,inputs:ReleaseInputs){const fingerprint=releaseFingerprint(inputs);return{fingerprint,action:fingerprint===currentFingerprint?"NO_OP":"CREATE_IMMUTABLE_RELEASE" as const}}
