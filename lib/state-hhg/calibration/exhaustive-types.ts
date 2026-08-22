/**
 * Task 011C.1B — exhaustive / radius-explicit evidence types.
 * Ground truth must never be derived from POWER_* / FIXED_* model outputs.
 */

export const EXHAUSTIVE_COMPLETENESS_CLASSES = [
  'PARTIAL',
  'REGION_EXPLICIT',
  'EXHAUSTIVE_LIST',
  'RADIUS_EXPLICIT',
  'EXPLICIT_STATEWIDE',
  'EXPLICIT_EXCLUSION',
  'UNKNOWN',
] as const;
export type ExhaustiveCompletenessClass =
  (typeof EXHAUSTIVE_COMPLETENESS_CLASSES)[number];

export type ExhaustiveEvidenceRecord = {
  evidenceId: string;
  providerId: string;
  stateCode: 'FL' | 'WA';
  sourceUrl: string;
  sourceType:
    | 'provider_website'
    | 'provider_faq'
    | 'provider_terms'
    | 'provider_service_area_page'
    | 'regulator_tariff'
    | 'regulator_filing'
    | 'other_first_party';
  retrievedAt: string;
  quotedStatement: string;
  identityEvidence: string[];
  identityConfidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNRESOLVED';
  completenessClass: ExhaustiveCompletenessClass;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  explicitRadiusMiles: number | null;
  positiveGeographyText: string[];
  negativeGeographyText: string[];
  positiveCountyFips: string[];
  negativeCountyFips: string[];
  unknownCountyFips: string[];
  reviewNotes: string[];
  secondCheckPass: boolean;
  scorableForPrecision: boolean;
  franchiseSafetyHold: boolean;
};
