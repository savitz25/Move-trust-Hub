import type { MetricPublicEligibility } from './types';

export const MOVE_HOME_INTEL_VERSION = 'move-home-intel-v1' as const;

export const MOVE_HOME_H1 = 'Understand the moving market before you book.';

export type HomeEntityClass = 'Carrier' | 'Broker' | 'Carrier/Broker' | 'Unknown';

export type HomeEvidenceStatus =
  | 'Available'
  | 'Partial'
  | 'State-specific'
  | 'Not currently available as a national homepage metric';

export type MoveHomeMetric = {
  id: string;
  label: string;
  value: number;
  entityCounted: 'directory_profile' | 'landing_page';
  definition: string;
  grain: string;
  cohort: string;
  denominator: string | null;
  source: string;
  querySource: string;
  asOf: string;
  geographicScope: string;
  disclosure: string;
  exclusions: string;
  whyNotFmcsaUniverse: string;
  publicEligibility: MetricPublicEligibility;
};

export type MoveHomeEntityClassCount = {
  class: HomeEntityClass;
  count: number;
};

export type MoveHomeAuthoritySplit = {
  active: number;
  notCurrent: number;
  unknown: number;
  total: number;
};

export type MoveHomeSiteCoverage = {
  landingCount: number;
  stateCount: number;
  includesDc: boolean;
  allFiftyStatesAndDc: boolean;
  source: string;
  limitation: string;
};

export type MoveHomeEvidenceItem = {
  id: string;
  label: string;
  status: HomeEvidenceStatus;
  note: string;
};

export type MoveHomeSource = {
  id: string;
  agency: string;
  label: string;
  whatItContains: string;
  coveragePeriod: string;
  limitation: string;
  sourceUrl: string | null;
};

export type MoveHomeIntelligencePayload = {
  version: typeof MOVE_HOME_INTEL_VERSION;
  generatedAt: string;
  asOf: string | null;
  timedOut: boolean;
  canonicalFingerprint: string;
  sources: MoveHomeSource[];
  limitations: string[];
  metrics: MoveHomeMetric[];
  entityClasses: MoveHomeEntityClassCount[] | null;
  authority: MoveHomeAuthoritySplit | null;
  siteCoverage: MoveHomeSiteCoverage;
  evidenceDepth: MoveHomeEvidenceItem[];
};
