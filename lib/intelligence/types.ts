export type MetricPublicEligibility = 'public' | 'internal_only';

export type EntityCounted =
  | 'registration'
  | 'directory_profile'
  | 'contact_observation'
  | 'county_credential'
  | 'authority_link';

export type MetricDefinition = {
  id: string;
  label: string;
  entityCounted: EntityCounted;
  definition: string;
  numerator: string;
  denominator: string;
  source: string;
  geographicSemantics: string;
  dateSemantics: string;
  attribution: string;
  publicEligibility: MetricPublicEligibility;
  defaultReadiness: 'READY' | 'INTERNAL_ONLY' | 'NOT_READY';
  limitation: string;
};
