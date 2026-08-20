/**
 * Canonical provider architecture (Task 001).
 *
 * Company identity stays on public.companies. Authorities, capabilities,
 * locations, and service areas are first-class records so one company can
 * hold multiple independently verified roles without duplicate profiles.
 */

export const PROVIDER_CAPABILITIES = [
  'hhg_interstate_carrier',
  'hhg_broker',
  'hhg_intrastate',
  'hhg_local',
  'auto_carrier',
  'auto_broker',
] as const;

export type ProviderCapability = (typeof PROVIDER_CAPABILITIES)[number];

export const CONSUMER_ROLES = [
  'local_mover',
  'hhg_carrier',
  'hhg_broker',
  'hhg_carrier_broker',
  'auto_carrier',
  'auto_broker',
  'auto_carrier_broker',
  'multi_service',
] as const;

export type ConsumerRole = (typeof CONSUMER_ROLES)[number];

export const PUBLICATION_STATES = [
  'INGESTED',
  'CLASSIFIED',
  'VERIFIED',
  'REVIEW_REQUIRED',
  'INACTIVE',
  'PUBLISHABLE',
  'INDEXABLE',
] as const;

export type PublicationState = (typeof PUBLICATION_STATES)[number];

export const AUTHORITY_JURISDICTIONS = ['federal', 'state'] as const;
export type AuthorityJurisdiction = (typeof AUTHORITY_JURISDICTIONS)[number];

export const AUTHORITY_TYPES = [
  'hhg_carrier',
  'hhg_broker',
  'property_carrier',
  'property_broker',
  'mc_docket',
  'usdot_registration',
  'state_mover',
] as const;

export type AuthorityType = (typeof AUTHORITY_TYPES)[number];

export const SERVICE_AREA_LEVELS = [
  'national',
  'regional',
  'state',
  'county',
  'city',
  'zip',
] as const;

export type ServiceAreaLevel = (typeof SERVICE_AREA_LEVELS)[number];

export type AuthorityStatus = 'active' | 'inactive' | 'revoked' | 'unknown';

export interface ProviderAuthorityRecord {
  readonly type: AuthorityType;
  readonly jurisdiction: AuthorityJurisdiction;
  readonly issuingAgency: string;
  readonly number: string | null;
  readonly status: AuthorityStatus;
  readonly source: string;
}

export interface ProviderClassification {
  readonly capabilities: readonly ProviderCapability[];
  readonly roles: readonly ConsumerRole[];
  readonly hhgLabel: string | null;
  readonly autoLabel: string | null;
  readonly displayRoles: readonly string[];
  readonly publicationState: PublicationState;
  readonly indexable: boolean;
  readonly identityReviewRequired: boolean;
}

export interface ProviderEligibility {
  readonly interstateHhgCarrier: boolean;
  readonly interstateHhgBroker: boolean;
  readonly intrastateHhg: boolean;
  readonly autoTransport: boolean;
  readonly reasons: readonly string[];
}

export interface IdentityCollision {
  readonly kind: 'usdot' | 'mc' | 'legal_name_address';
  readonly key: string;
  readonly companyIds: readonly string[];
  readonly resolution: 'REVIEW_REQUIRED';
}
