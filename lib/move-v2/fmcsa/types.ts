export type FmcsaSourceEra = 'MCMIS_CENSUS_CURRENT' | 'MOTUS_CURRENT' | 'LEGACY_LI_HISTORICAL';

export type FmcsaClassification =
  | 'INTERSTATE_CARRIER'
  | 'LOCAL_INTRASTATE_CARRIER_CANDIDATE'
  | 'AUTHORIZED_BROKER'
  | 'DUAL_ROLE_CARRIER_BROKER'
  | 'HHG_FREIGHT_FORWARDER'
  | 'INACTIVE_ENTITY'
  | 'NEEDS_REGULATORY_REVIEW';

export type FmcsaReasonCode =
  | 'ACTIVE_USDOT' | 'INACTIVE_USDOT' | 'HHG_CARGO_REPORTED'
  | 'ACTIVE_INTERSTATE_HHG_AUTHORITY' | 'NO_INTERSTATE_HHG_AUTHORITY'
  | 'ACTIVE_BROKER_AUTHORITY' | 'BROKER_BOND_REPORTED'
  | 'ACTIVE_HHG_FREIGHT_FORWARDER_AUTHORITY'
  | 'AUTHORITY_SUSPENDED' | 'AUTHORITY_REVOKED' | 'STATE_AUTHORITY_PENDING'
  | 'MISSING_REQUIRED_CARGO_FILING' | 'MISSING_REQUIRED_BIPD_FILING'
  | 'MISSING_BROKER_FINANCIAL_RESPONSIBILITY' | 'SOURCE_CONFLICT'
  | 'V1_KNOWN_PROVIDER' | 'MOTUS_CURRENT_PREFERRED_OVER_LEGACY';

export interface CurrentAuthorityFact {
  sourceRecordKey: string;
  docketNumber: string;
  authorityType: string;
  authorityStatus: string;
  cargoRequired: boolean | null;
  cargoOnFile: boolean | null;
  bondRequired: boolean | null;
  bondOnFile: boolean | null;
  minimumBipdCoverage: number | null;
  bipdOnFile: number | null;
}

export interface AuthorityEvent {
  sourceRecordKey: string;
  docketNumber: string;
  authorityType: string;
  authorityStatus: string;
  eventDate?: string;
  reason?: string;
  sourceEra: FmcsaSourceEra;
}

export interface FmcsaClassificationInput {
  usdot: string;
  censusStatus: 'A' | 'I' | 'P' | 'UNKNOWN';
  carrierOperation?: string;
  householdGoodsCargo: boolean;
  powerUnits?: number | null;
  currentAuthorities: CurrentAuthorityFact[];
  authorityEvents: AuthorityEvent[];
  brokerFinancialResponsibilityReported: boolean;
  knownV1Provider: boolean;
}

export interface FmcsaClassificationResult {
  classification: FmcsaClassification;
  ruleVersion: typeof FMCSA_CLASSIFICATION_RULE_VERSION;
  reasonCodes: FmcsaReasonCode[];
  conflictCodes: FmcsaReasonCode[];
  supportingSourceRecordKeys: string[];
}

export const FMCSA_CLASSIFICATION_RULE_VERSION = 'MOVE_CLASSIFICATION_RULESET_2026_08_V1' as const;
