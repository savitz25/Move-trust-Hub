export const CONSUMER_DISCOVERY_VERSION="MOVE_CONSUMER_DISCOVERY_2026_08_V1" as const;
export type DiscoveryTier="TIER_A"|"TIER_B"|"TIER_C";
export type MoveRoute="LOCAL_INTRASTATE"|"INTERSTATE"|"LOCAL_ORIGIN_RESEARCH"|"UNSUPPORTED_LOCAL"|"INVALID";
export type LocationStatus="VERIFIED"|"LOCATION_REVIEW"|"NOT_RESOLVED";
export interface ConsumerProvider{providerId:string;state:"FL"|"WA";displayName:string;legalName:string;dbaName:string|null;usdot:string|null;powerUnits:number|null;phone:string|null;website:string|null;authorityLabel:string;authorityNumber:string;authorityStatus:string;locationStatus:LocationStatus;locationCity:string|null;latitude:number|null;longitude:number|null;locationSource:"GOOGLE_PLACES_CORROBORATED"|"NONE";explicitCountyGeoids:string[];explicitClaims:Array<{rawText:string;normalizedLabel:string;sourceUrl:string;claimType:"POSITIVE_EXPLICIT_AREA"|"EXHAUSTIVE_EXPLICIT_AREA"}>;sourceCount:number}
export interface ZipResolution{zip:string;state:string;zcta:string;latitude:number;longitude:number;countyGeoids:string[];explanation:string}
export interface DiscoveryResult extends ConsumerProvider{tier:DiscoveryTier;distanceMiles:number|null;explicitMatch:ConsumerProvider["explicitClaims"];why:string;serviceLanguage:string}
