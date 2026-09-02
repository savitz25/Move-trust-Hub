/**
 * Task 011A — National Intrastate / Local Regulatory Program types.
 * Architecture only. No production publication. No Google Places dependency.
 *
 * CORE SEPARATION:
 *   A) Regulatory eligibility — may this provider legally perform an intrastate move?
 *   B) Service-area discovery — where should an eligible provider appear geographically?
 * Derived geography must NEVER create legal eligibility.
 */

export const STATE_HHG_ACCESS_TIERS = ['A', 'B', 'C', 'D'] as const;
export type StateHhgAccessTier = (typeof STATE_HHG_ACCESS_TIERS)[number];

export const STATE_AUTHORITY_REQUIREMENTS = [
  'YES',
  'NO',
  'CONDITIONAL',
  'UNKNOWN',
] as const;
export type StateAuthorityRequirement = (typeof STATE_AUTHORITY_REQUIREMENTS)[number];

export const STATE_AUTHORITY_VERIFICATION_STATES = [
  'VERIFIED',
  'REVIEW_REQUIRED',
  'UNRESOLVED',
  'HISTORICAL',
] as const;
export type StateAuthorityVerificationState =
  (typeof STATE_AUTHORITY_VERIFICATION_STATES)[number];

export const STATE_AUTHORITY_STATUSES = [
  'active',
  'inactive',
  'expired',
  'suspended',
  'revoked',
  'unknown',
] as const;
export type StateAuthorityStatus = (typeof STATE_AUTHORITY_STATUSES)[number];

export const STATE_AUTHORITY_TYPES = [
  'intrastate_hhg_carrier',
  'intrastate_hhg_broker',
  'intrastate_mover_registration',
  'intrastate_certificate',
  'local_mover_license',
  'warehouse',
  'intrastate_public_mover',
  'intrastate_public_warehouseman',
  'intrastate_public_mover_and_warehouseman',
  'other',
] as const;
export type StateAuthorityType = (typeof STATE_AUTHORITY_TYPES)[number];

/** Registry access quality for a state source. */
export type StateRegulatorySourceMatrixRow = {
  stateCode: string;
  stateName: string;
  primaryRegulator: string;
  secondaryRegulator: string | null;
  intrastateHhgAuthorityRequired: StateAuthorityRequirement;
  moverSpecificLicense: string | null;
  brokerRegulation: string | null;
  warehouseRegulation: string | null;
  licenseIdFormat: string | null;
  publicLookupUrl: string | null;
  bulkCsvApiAvailable: boolean | 'UNKNOWN';
  machineReadableAccess: boolean | 'UNKNOWN';
  fields: {
    currentStatus: boolean | 'UNKNOWN';
    issueDate: boolean | 'UNKNOWN';
    expirationDate: boolean | 'UNKNOWN';
    legalName: boolean | 'UNKNOWN';
    dba: boolean | 'UNKNOWN';
    usdotLinkage: boolean | 'UNKNOWN';
    physicalAddress: boolean | 'UNKNOWN';
    mailingAddress: boolean | 'UNKNOWN';
    phone: boolean | 'UNKNOWN';
    email: boolean | 'UNKNOWN';
    website: boolean | 'UNKNOWN';
    ownersOfficers: boolean | 'UNKNOWN';
    registeredAgent: boolean | 'UNKNOWN';
    insurance: boolean | 'UNKNOWN';
    bond: boolean | 'UNKNOWN';
    complaints: boolean | 'UNKNOWN';
    enforcement: boolean | 'UNKNOWN';
    disciplinaryActions: boolean | 'UNKNOWN';
    fines: boolean | 'UNKNOWN';
    suspensions: boolean | 'UNKNOWN';
    revocations: boolean | 'UNKNOWN';
    historicalNames: boolean | 'UNKNOWN';
  };
  publicRecordsRequestAvailable: boolean | 'UNKNOWN';
  sourceFreshness: string | null;
  dataRestrictions: string | null;
  publicationConfidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
  regulatoryValue: 1 | 2 | 3 | 4 | 5 | 'UNKNOWN';
  customClientFileYield: 1 | 2 | 3 | 4 | 5 | 'UNKNOWN';
  accessTier: StateHhgAccessTier;
  researchNotes: string;
  researchStatus: 'DOCUMENTED' | 'RESEARCH_REQUIRED' | 'UNKNOWN';
};

/** Canonical additive authority record (schema design — not migrated in 011A). */
export type ProviderStateAuthorityRecord = {
  providerId: string;
  stateCode: string;
  authorityType: StateAuthorityType;
  authorityNumber: string | null;
  status: StateAuthorityStatus;
  issueDate: string | null;
  expirationDate: string | null;
  legalName: string | null;
  dba: string | null;
  regulator: string;
  source: string;
  sourceUrl: string | null;
  retrievedAt: string;
  evidenceHash: string | null;
  verificationState: StateAuthorityVerificationState;
};

export type StateAdapterSourceMetadata = {
  stateCode: string;
  regulator: string;
  sourceName: string;
  sourceUrl: string | null;
  retrievedAt: string;
  accessTier: StateHhgAccessTier;
  googlePlacesRequests: 0;
};

export type NormalizedStateMoverRecord = {
  stateCode: string;
  authorityNumber: string | null;
  legalName: string;
  dba: string | null;
  status: StateAuthorityStatus;
  issueDate: string | null;
  expirationDate: string | null;
  physicalAddress: string | null;
  mailingAddress: string | null;
  city: string | null;
  postalCode: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  usdot: string | null;
  raw: Record<string, unknown>;
};

/**
 * Reusable state adapter contract.
 * Each state feeds the SAME canonical regulatory schema.
 * Implementations must be Google-Places-free.
 */
export interface StateMoverAdapter {
  readonly stateCode: string;
  getSourceMetadata(): Promise<StateAdapterSourceMetadata> | StateAdapterSourceMetadata;
  fetchOrLoadRegistry(): Promise<readonly Record<string, unknown>[]>;
  normalizeRecord(raw: Record<string, unknown>): NormalizedStateMoverRecord;
  resolveAuthority(record: NormalizedStateMoverRecord): ProviderStateAuthorityRecord;
  resolveBrokerRole(record: NormalizedStateMoverRecord): boolean;
  resolveStatus(record: NormalizedStateMoverRecord): StateAuthorityStatus;
  resolveIdentityEvidence(record: NormalizedStateMoverRecord): {
    legalName: string;
    dba: string | null;
    usdot: string | null;
  };
  resolveContactEvidence(record: NormalizedStateMoverRecord): {
    phone: string | null;
    email: string | null;
    website: string | null;
  };
  resolveInsuranceEvidence?(record: NormalizedStateMoverRecord): Record<string, unknown> | null;
  resolveEnforcementEvidence?(record: NormalizedStateMoverRecord): Record<string, unknown> | null;
  resolveComplaintEvidence?(record: NormalizedStateMoverRecord): Record<string, unknown> | null;
}

/** Move routing — federal vs state authority gates. */
export type MoveJurisdictionKind = 'same_state_intrastate' | 'interstate';

export type IntrastateEligibilityInput = {
  providerId: string;
  originState: string;
  destinationState: string;
  stateAuthorities: readonly ProviderStateAuthorityRecord[];
  hasFederalHhgCarrier?: boolean;
  hasFederalHhgBroker?: boolean;
};

export type IntrastateEligibilityResult = {
  eligible: boolean;
  moveKind: MoveJurisdictionKind;
  reason: string;
  requiredState: string | null;
  authority: ProviderStateAuthorityRecord | null;
};

/** Service-area evidence priority (discovery only — never creates eligibility). */
export const SERVICE_AREA_EVIDENCE_PRIORITY = [
  'EXPLICIT_VERIFIED',
  'REGULATOR_TERRITORY',
  'CURATED_INTERNAL',
  'DERIVED_RADIUS',
] as const;
export type ServiceAreaEvidenceType = (typeof SERVICE_AREA_EVIDENCE_PRIORITY)[number];

export const SERVICE_AREA_COVERAGE_TYPES = ['VERIFIED', 'DERIVED'] as const;
export type ServiceAreaCoverageType = (typeof SERVICE_AREA_COVERAGE_TYPES)[number];

export type ProviderCountyCoverageDesign = {
  providerId: string;
  stateCode: string;
  countyFips: string;
  coverageType: ServiceAreaCoverageType;
  evidenceType: ServiceAreaEvidenceType;
  radiusMiles: number | null;
  modelVersion: string | null;
  confidence: number | null;
  source: string;
  method: string | null;
};

/** Experimental radius bands — NOT consumer-published. */
export const EXPERIMENTAL_POWER_UNIT_RADIUS_BANDS = [
  {
    id: 'very_small',
    powerUnitsMax: 2,
    candidateRadiusMiles: 25,
    label: 'EXPERIMENTAL / NOT CONSUMER-PUBLISHED',
  },
  {
    id: 'small',
    powerUnitsMax: 5,
    candidateRadiusMiles: 40,
    label: 'EXPERIMENTAL / NOT CONSUMER-PUBLISHED',
  },
  {
    id: 'medium',
    powerUnitsMax: 15,
    candidateRadiusMiles: 75,
    label: 'EXPERIMENTAL / NOT CONSUMER-PUBLISHED',
  },
  {
    id: 'large',
    powerUnitsMax: 50,
    candidateRadiusMiles: 125,
    label: 'EXPERIMENTAL / NOT CONSUMER-PUBLISHED',
  },
  {
    id: 'very_large',
    powerUnitsMax: null,
    candidateRadiusMiles: 200,
    label: 'EXPERIMENTAL / NOT CONSUMER-PUBLISHED',
  },
] as const;
