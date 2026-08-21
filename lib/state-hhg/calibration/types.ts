/**
 * Task 011C.1 — service-area calibration types.
 * Origin service area vs regulatory destination authority remain distinct.
 * No Google Places. No provider_county_coverage edge writes.
 */

export const GOOGLE_PLACES_REQUESTS = 0 as const;

export type CalibrationStateCode = 'FL' | 'WA';

export type OperatingAddressType =
  | 'regulator_physical'
  | 'regulator_business'
  | 'canonical_operating'
  | 'other_official';

export type GeocodeStatus =
  | 'MATCH'
  | 'TIE'
  | 'NO_MATCH'
  | 'GEOCODE_UNRESOLVED'
  | 'ZIP_CENTROID_LOW_CONFIDENCE';

export type FleetFreshness = 'fresh' | 'stale' | 'unknown' | 'zero' | 'missing_usdot';

export type ReferenceEvidenceType =
  | 'PROVIDER_EXPLICIT'
  | 'REGULATOR_TERRITORY'
  | 'CURATED_INTERNAL';

export type RadiusModelId =
  | 'POWER_UNIT_RADIUS_BASELINE_011A'
  | 'POWER_UNIT_RADIUS_CONSERVATIVE_B'
  | 'POWER_UNIT_RADIUS_INTERMEDIATE_C';

export type RadiusBand = {
  id: string;
  powerUnitsMax: number | null;
  radiusMiles: number;
};

export type CalibrationCohortMember = {
  providerId: string;
  stateCode: CalibrationStateCode;
  authorityNumber: string | null;
  authorityType: string;
  authorityStatus: string;
  verificationState: 'VERIFIED';
  legalName: string | null;
  dbaName: string | null;
  usdot: string | null;
  stagingPhysicalAddress: string | null;
  stagingCity: string | null;
  stagingPostalCode: string | null;
  canonicalPhysicalAddress: string | null;
  canonicalName: string | null;
  roleClass: 'mover';
};

export type OperatingLocationRecord = {
  providerId: string;
  stateCode: CalibrationStateCode;
  observedAddress: string;
  addressType: OperatingAddressType;
  source: string;
  retrievedAt: string;
  normalizedAddress: string | null;
  city: string | null;
  postalCode: string | null;
  geocodeStatus: GeocodeStatus;
  lat: number | null;
  lon: number | null;
  countyFips: string | null;
  geocodeSource: string | null;
  geocodeConfidence: number | null;
};

export type FleetObservation = {
  providerId: string;
  usdot: string | null;
  powerUnits: number | null;
  drivers: number | null;
  mcs150Date: string | null;
  carrierOperation: string | null;
  observationDate: string | null;
  source: string;
  freshness: FleetFreshness;
};

export type ReferenceCountyEvidence = {
  providerId: string;
  stateCode: CalibrationStateCode;
  countyFips: string;
  evidenceType: ReferenceEvidenceType;
  source: string;
  sourceUrl: string | null;
  retrievedAt: string;
  confidence: number;
  verificationState: 'VERIFIED' | 'REVIEW_REQUIRED' | 'UNRESOLVED';
};

export type ModelEvaluationMetrics = {
  truePositives: number;
  falsePositives: number;
  falseNegatives: number;
  precision: number | null;
  recall: number | null;
  f1: number | null;
  meanJaccard: number | null;
  avgCountiesPerProvider: number;
  medianCountiesPerProvider: number;
  p90CountiesPerProvider: number;
  maxCountiesPerProvider: number;
  providersEvaluated: number;
};

export type CatastrophicFailure = {
  providerId: string;
  stateCode: CalibrationStateCode;
  kind: string;
  detail: string;
};

export const MODEL_A_BANDS: readonly RadiusBand[] = [
  { id: 'very_small', powerUnitsMax: 2, radiusMiles: 25 },
  { id: 'small', powerUnitsMax: 5, radiusMiles: 40 },
  { id: 'medium', powerUnitsMax: 15, radiusMiles: 75 },
  { id: 'large', powerUnitsMax: 50, radiusMiles: 125 },
  { id: 'very_large', powerUnitsMax: null, radiusMiles: 200 },
] as const;

/** ~20–25% more conservative than Model A */
export const MODEL_B_BANDS: readonly RadiusBand[] = [
  { id: 'very_small', powerUnitsMax: 2, radiusMiles: 20 },
  { id: 'small', powerUnitsMax: 5, radiusMiles: 30 },
  { id: 'medium', powerUnitsMax: 15, radiusMiles: 55 },
  { id: 'large', powerUnitsMax: 50, radiusMiles: 95 },
  { id: 'very_large', powerUnitsMax: null, radiusMiles: 150 },
] as const;

/** Intermediate between A and B */
export const MODEL_C_BANDS: readonly RadiusBand[] = [
  { id: 'very_small', powerUnitsMax: 2, radiusMiles: 22 },
  { id: 'small', powerUnitsMax: 5, radiusMiles: 35 },
  { id: 'medium', powerUnitsMax: 15, radiusMiles: 65 },
  { id: 'large', powerUnitsMax: 50, radiusMiles: 110 },
  { id: 'very_large', powerUnitsMax: null, radiusMiles: 175 },
] as const;

export const RADIUS_MODELS: Record<
  RadiusModelId,
  { label: string; bands: readonly RadiusBand[] }
> = {
  POWER_UNIT_RADIUS_BASELINE_011A: {
    label: 'MODEL A — baseline 011A',
    bands: MODEL_A_BANDS,
  },
  POWER_UNIT_RADIUS_CONSERVATIVE_B: {
    label: 'MODEL B — ~20–25% more conservative',
    bands: MODEL_B_BANDS,
  },
  POWER_UNIT_RADIUS_INTERMEDIATE_C: {
    label: 'MODEL C — intermediate',
    bands: MODEL_C_BANDS,
  },
};

/** Fleet observation older than this is stale for radius modeling. */
export const FLEET_FRESHNESS_DAYS = 730;

/** Unknown fleet uses conservative small-band radius, never treated as zero. */
export const UNKNOWN_FLEET_RADIUS_MILES = 25;

export const HOLDOUT_FRACTION = 0.3;
export const HOLDOUT_PRECISION_TARGET = 0.9;
export const HOLDOUT_RECALL_PREFERRED = 0.65;
