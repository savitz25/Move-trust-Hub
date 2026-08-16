export type SourceType =
  | 'FMCSA'
  | 'STATE_REGULATOR'
  | 'GOOGLE_PLACES'
  | 'OFFICIAL_WEBSITE'
  | 'PROVIDER_SUBMITTED'
  | 'TRUSTHUB_DERIVED';

export type ProviderClassification =
  | 'INTERSTATE_CARRIER'
  | 'LOCAL_INTRASTATE_CARRIER'
  | 'LOCAL_INTRASTATE_CARRIER_CANDIDATE'
  | 'AUTHORIZED_BROKER'
  | 'DUAL_ROLE_CARRIER_BROKER'
  | 'INACTIVE_ENTITY'
  | 'NEEDS_REGULATORY_REVIEW'
  | 'UNKNOWN_UNCLASSIFIED';

export type MoveType = 'LOCAL' | 'INTRASTATE' | 'INTERSTATE' | 'UNKNOWN';
export type EvidenceStatus = 'VALID' | 'NOT_AUTHORIZED' | 'INACTIVE' | 'UNKNOWN';

export interface Provenance {
  sourceType: SourceType;
  sourceRecordId?: string;
  sourceUrl?: string;
  retrievedAt: string;
  effectiveAt?: string;
  confidence?: number;
  derivationRuleVersion?: string;
}

export interface RegulatoryFacts {
  sourceEvidenceIds: string[];
  registrationStatus: 'ACTIVE' | 'INACTIVE' | 'UNKNOWN';
  entityRoles: Array<'CARRIER' | 'BROKER'>;
  interstateHhgAuthority: EvidenceStatus;
  brokerAuthority: EvidenceStatus;
}

export interface ClassificationResult {
  classification: ProviderClassification;
  classificationReason: string;
  classificationRuleVersion: string;
  classifiedAt: string;
  supportingEvidenceIds: string[];
}

export interface ProviderIdentity {
  providerId: string;
  legalName: string;
  dbaName?: string;
  displayName: string;
  identifiers: Array<{
    type: 'USDOT' | 'MC' | 'MX' | 'STATE_LICENSE';
    value: string;
    issuingJurisdiction?: string;
    provenance: Provenance;
  }>;
}

export interface ProviderContact {
  contactId: string;
  providerId: string;
  contactType: 'PHONE' | 'EMAIL' | 'WEBSITE';
  value: string;
  normalizedValue: string;
  label?: string;
  provenance: Provenance;
  firstSeenAt: string;
  lastSeenAt: string;
  lastVerifiedAt?: string;
  isPrimary: boolean;
  status: 'ACTIVE' | 'STALE' | 'INVALID' | 'UNKNOWN';
  confidence?: number;
}

export interface ProviderServiceArea {
  providerId: string;
  areaType: 'STATE' | 'COUNTY' | 'CITY' | 'POSTAL_CODE' | 'METRO' | 'OTHER';
  authorityScope:
    | 'REGULATORY_ALLOWED_AREA'
    | 'PROVIDER_PUBLISHED_SERVICE_AREA'
    | 'TRUSTHUB_DERIVED_SEARCH_AREA';
  state?: string;
  county?: string;
  city?: string;
  postalCode?: string;
  label: string;
  provenance: Provenance;
}

export interface MoveContext {
  originZip?: string;
  destinationZip?: string;
  originState?: string;
  destinationState?: string;
  moveType: MoveType;
  moveDate?: string;
  inventoryStatus?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE';
  shortlistedProviderIds: string[];
}

export interface MovePlan {
  movePlanId: string;
  context: MoveContext;
  currentStage:
    | 'ROUTE' | 'INVENTORY' | 'RESEARCH_MOVERS' | 'SHORTLIST' | 'ESTIMATES'
    | 'COMPARE' | 'VERIFY' | 'MOVING_DAY' | 'DELIVERY' | 'CLAIMS';
}

export interface EstimateDocumentLink {
  documentId: string;
  providerId?: string;
  documentType:
    | 'MOVING_ESTIMATE' | 'ORDER_FOR_SERVICE' | 'BILL_OF_LADING' | 'INVENTORY'
    | 'BINDING_ESTIMATE' | 'NON_BINDING_ESTIMATE';
  identityResolutionStatus: 'MATCHED' | 'IDENTITY_REVIEW' | 'UNMATCHED';
}
