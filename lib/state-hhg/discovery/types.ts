/**
 * Task 011D.1 — Conservative local discovery foundation.
 * Radius models remain NOT APPROVED / consumer-disabled.
 * Google Places requests: 0
 */

export const GOOGLE_PLACES_REQUESTS = 0 as const;

/** Historical experiments — never consumer-enabled. */
export const RETIRED_RADIUS_MODELS = {
  POWER_UNIT_RADIUS: 'NOT_APPROVED',
  FIXED_25: 'NOT_APPROVED',
  FIXED_40: 'NOT_APPROVED',
  FIXED_50: 'NOT_APPROVED',
  consumerEnabled: false,
} as const;

export const LOCAL_DISCOVERY_BASES = [
  'EXPLICIT_SERVICE_AREA',
  'VERIFIED_HOME_COUNTY',
  'REGULATOR_TERRITORY',
  'CURATED_VERIFIED',
  'DERIVED_EXPERIMENTAL',
  'NONE',
] as const;
export type LocalDiscoveryBasis = (typeof LOCAL_DISCOVERY_BASES)[number];

/** Bases allowed for future consumer discovery. */
export const CONSUMER_APPROVED_DISCOVERY_BASES: readonly LocalDiscoveryBasis[] = [
  'EXPLICIT_SERVICE_AREA',
  'VERIFIED_HOME_COUNTY',
  'REGULATOR_TERRITORY',
  'CURATED_VERIFIED',
] as const;

export const ADDRESS_QUALITY_CLASSES = [
  'PHYSICAL_OPERATING',
  'BUSINESS_ADDRESS',
  'MAILING_ONLY',
  'PO_BOX',
  'AMBIGUOUS',
  'UNRESOLVED',
] as const;
export type AddressQualityClass = (typeof ADDRESS_QUALITY_CLASSES)[number];

export type ProviderLocalDiscoveryEvidence = {
  providerId: string;
  stateCode: 'FL' | 'WA' | string;
  countyFips: string;
  basis: LocalDiscoveryBasis;
  evidenceSource: string;
  sourceUrl: string | null;
  observedAt: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  verificationState: 'VERIFIED' | 'REVIEW_REQUIRED' | 'UNRESOLVED' | 'HISTORICAL';
  consumerEligible: boolean;
  notes: string[];
};

export type HomeCountyAuditRow = {
  providerId: string;
  stateCode: 'FL' | 'WA';
  legalName: string | null;
  canonicalName: string | null;
  authorityNumber: string | null;
  addressRaw: string | null;
  addressQuality: AddressQualityClass;
  countyFips: string | null;
  countyName: string | null;
  geocodeStatus: string | null;
  homeCountyEligible: boolean;
  blockReason: string | null;
};

export const NEW_PROVIDER_READINESS = [
  'READY_FOR_CANONICALIZATION',
  'REVIEW_REQUIRED',
  'INACTIVE_HOLD',
  'ADDRESS_UNRESOLVED',
] as const;
export type NewProviderReadiness = (typeof NEW_PROVIDER_READINESS)[number];

export type NewProviderReadinessRow = {
  stagingKey: string;
  stateCode: 'FL' | 'WA';
  authorityNumber: string | null;
  legalName: string | null;
  dba: string | null;
  disposition: string;
  statusNormalized: string;
  roleClass: string;
  usdot: string | null;
  phone: string | null;
  email: string | null;
  physicalAddress: string | null;
  addressQuality: AddressQualityClass;
  homeCountyResolvable: boolean;
  franchiseHold: boolean;
  readiness: NewProviderReadiness;
  notes: string[];
};

/** Future UI copy contract — not wired to production UI in 011D.1. */
export const FUTURE_UI_COPY = {
  homeCounty: {
    locationLine: 'Based in {countyName}',
    authorityLine: '{stateName} mover registration verified',
    cta: 'Confirm pickup availability for your address.',
  },
  explicitService: {
    line: 'Provider identifies {countyName} as a service area.',
  },
  forbiddenWithoutEvidence: [
    'Guaranteed service',
    'Covers entire county',
    'Serves nearby counties',
    '40-mile service radius',
    'Serves all South Florida',
    'Available statewide',
  ],
} as const;

/** Evidence precedence for future discovery (strongest first). */
export const DISCOVERY_EVIDENCE_PRECEDENCE: readonly LocalDiscoveryBasis[] = [
  'REGULATOR_TERRITORY',
  'EXPLICIT_SERVICE_AREA',
  'CURATED_VERIFIED',
  'VERIFIED_HOME_COUNTY',
] as const;
