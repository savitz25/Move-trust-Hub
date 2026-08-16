export const AUTO_RULE_VERSION='MOVE_AUTO_CLASSIFICATION_RULESET_2026_08_V1' as const;
export type AutoRelevance='AUTO_RELEVANT'|'AUTO_REVIEW'|'NOT_AUTO_RELEVANT';
export type AutoRole='AUTO_TRANSPORT_CARRIER'|'AUTO_TRANSPORT_BROKER'|'AUTO_TRANSPORT_DUAL_ROLE'|'AUTO_TRANSPORT_REVIEW'|'AUTO_TRANSPORT_INACTIVE';
export type AutoAuthority={sourceRecordKey:string;type:string;status:string;docket?:string|null;bipdRequired?:number|null;bipdOnFile?:number|null;bondRequired?:boolean|null;bondOnFile?:boolean|null};
export type AutoInput={providerId:string;usdot:string;legalName:string;motorVehiclesCargoReported:boolean;censusStatus:string;authorities:AutoAuthority[];insuranceForms:string[];currentSuspensionOrRevocation:boolean;historicalAutoEvidence?:boolean};
export type AutoResult={providerId:string;vertical:'AUTO_TRANSPORT';relevance:AutoRelevance;classification:AutoRole|null;ruleVersion:typeof AUTO_RULE_VERSION;reasonCodes:string[];conflicts:string[];supportingSourceKeys:string[]};
export const AUTO_PROVIDER_PUBLISHED_ATTRIBUTE_CONTRACT=['OPEN_TRANSPORT','ENCLOSED_TRANSPORT','EXPEDITED_TRANSPORT','MOTORCYCLE_TRANSPORT','CLASSIC_EXOTIC_TRANSPORT','INOPERABLE_VEHICLE_TRANSPORT','DEALER_AUCTION_TRANSPORT','SERVICE_AREA','BUSINESS_EMAIL','ADDITIONAL_PHONE','WEBSITE'] as const;
