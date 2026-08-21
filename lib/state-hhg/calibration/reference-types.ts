/**
 * Task 011C.1A — expanded reference evidence types.
 * PARTIAL unmentioned counties are UNKNOWN, never automatic negatives.
 */

export const EVIDENCE_COMPLETENESS = [
  'EXHAUSTIVE',
  'PARTIAL',
  'RADIUS_EXPLICIT',
  'REGION_EXPLICIT',
  'UNKNOWN_COMPLETENESS',
] as const;
export type EvidenceCompleteness = (typeof EVIDENCE_COMPLETENESS)[number];

export const EVIDENCE_QUALITY = ['HIGH', 'MEDIUM', 'LOW'] as const;
export type EvidenceQuality = (typeof EVIDENCE_QUALITY)[number];

export type ExpandedReferenceProvider = {
  providerId: string;
  stateCode: 'FL' | 'WA';
  canonicalName: string | null;
  legalName: string | null;
  sourceUrl: string | null;
  sourceType:
    | 'home_county_operating_point'
    | 'curated_destination_assignment'
    | 'provider_website'
    | 'regulator_physical';
  retrievedAt: string;
  evidenceCompleteness: EvidenceCompleteness;
  positiveCountyFips: string[];
  negativeCountyFips: string[];
  unknownCountyFips: string[];
  originalPlaceStatements: string[];
  explicitRadiusMiles: number | null;
  explicitRegionText: string | null;
  identityConfidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNRESOLVED';
  evidenceQuality: EvidenceQuality;
  multiLocation: boolean;
  franchiseSafetyHold: boolean;
  reviewNotes: string[];
  scorableForPrecision: boolean;
};
