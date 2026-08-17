export type FreshnessStatus="CURRENT"|"REFRESH_DUE"|"STALE"|"SOURCE_UNAVAILABLE"|"REFRESH_FAILED"|"REVIEW_REQUIRED";
export type FreshnessPolicy={id:string;source:string;softDays:number;hardDays:number;hardBehavior:"EXCLUDE"|"LABEL_PENDING"|"REVIEW";retryHours:number;reviewAfterFailures:number};
export const FRESHNESS_POLICY_VERSION="MOVE_EVIDENCE_FRESHNESS_2026_08_V1";
export const FRESHNESS_POLICIES:FreshnessPolicy[]=[
 {id:"fmcsa",source:"FMCSA_CURRENT_AUTHORITY",softDays:30,hardDays:60,hardBehavior:"EXCLUDE",retryHours:24,reviewAfterFailures:3},
 {id:"fl",source:"FL_STATE_AUTHORITY",softDays:14,hardDays:30,hardBehavior:"EXCLUDE",retryHours:12,reviewAfterFailures:3},
 {id:"wa",source:"WA_STATE_AUTHORITY",softDays:14,hardDays:30,hardBehavior:"EXCLUDE",retryHours:12,reviewAfterFailures:3},
 {id:"google",source:"GOOGLE_BUSINESS_IDENTITY",softDays:180,hardDays:365,hardBehavior:"REVIEW",retryHours:72,reviewAfterFailures:3},
 {id:"website",source:"PROVIDER_WEBSITE",softDays:90,hardDays:180,hardBehavior:"LABEL_PENDING",retryHours:72,reviewAfterFailures:3},
 {id:"service",source:"SERVICE_GEOGRAPHY",softDays:90,hardDays:180,hardBehavior:"LABEL_PENDING",retryHours:72,reviewAfterFailures:3},
 {id:"census",source:"CENSUS_GEOGRAPHY",softDays:365,hardDays:730,hardBehavior:"REVIEW",retryHours:168,reviewAfterFailures:2}];
export function freshnessStatus(policy:FreshnessPolicy,lastSuccess:string,now:string,opts:{sourceUnavailable?:boolean;failed?:boolean;failures?:number}={}):FreshnessStatus{if(opts.sourceUnavailable)return"SOURCE_UNAVAILABLE";if(opts.failed)return(opts.failures??1)>=policy.reviewAfterFailures?"REVIEW_REQUIRED":"REFRESH_FAILED";const age=(Date.parse(now)-Date.parse(lastSuccess))/86400000;if(age>policy.hardDays)return"STALE";if(age>policy.softDays)return"REFRESH_DUE";return"CURRENT"}
export function staleAuthorityConsumerStatus(status:FreshnessStatus){return status==="STALE"?{include:false,label:"Verification refresh pending"}:status==="SOURCE_UNAVAILABLE"?{include:true,label:"Verification refresh pending"}:{include:true,label:null}}
