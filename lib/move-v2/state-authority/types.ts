export const STATE_MATCH_RULE_VERSION = "MOVE_STATE_IDENTITY_2026_08_V1" as const;
export const STATE_ELIGIBILITY_RULE_VERSION = "MOVE_STATE_ELIGIBILITY_2026_08_V1" as const;

export type StateMatchStatus =
  | "STATE_MATCH_HIGH_CONFIDENCE"
  | "STATE_MATCH_REVIEW"
  | "STATE_NOT_FOUND"
  | "STATE_MULTIPLE_PLAUSIBLE_MATCHES";

export type StateEligibility =
  | "STATE_VERIFIED_LOCAL_MOVER"
  | "STATE_VERIFIED_MOVING_BROKER"
  | "STATE_INACTIVE_LOCAL_MOVER"
  | "STATE_AUTHORITY_NOT_FOUND"
  | "STATE_AUTHORITY_REVIEW";

export type StateAuthorityType = "NJ_PM" | "NJ_PW" | "NJ_PC" | "FL_IM" | "FL_MB" | "IL_ILCC_HHG";

export interface StateAuthorityRecord {
  state: "NJ" | "FL" | "WA" | "IL";
  authorityType: StateAuthorityType | "WA_UTC_HHG";
  licenseNumber: string;
  status: string;
  legalName: string;
  dbaName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  county?: string;
  phone?: string;
  email?: string;
  website?: string;
  relationshipObservations?: Array<{ term: string; name: string }>;
  effectiveDate?: string;
  expirationDate?: string;
  sourceRecordReference: string;
  usdot?: string;
}

export interface ProviderIdentityInput {
  legalName: string;
  dbaName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
}
