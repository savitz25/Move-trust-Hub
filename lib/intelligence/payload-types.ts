import type { ResearchCoverageLevel } from './coverage';
import type { MetricReadiness } from './readiness';
import type { EntityCounted, MetricPublicEligibility } from './types';

export type IntelligenceMetricValue = {
  id: string;
  label: string;
  value: number | null;
  entityCounted: EntityCounted;
  definition: string;
  querySource: string;
  readiness: MetricReadiness;
  geographicScope: 'florida_statewide' | 'florida_hq';
  asOf: string | null;
  disclosure: string;
  publicEligibility: MetricPublicEligibility;
  href?: string;
};

export type IntelligenceEvidenceSource = {
  id: string;
  agency: string;
  label: string;
  whatItContains: string;
  coveragePeriod: string;
  observationCount: number | null;
  attributionStatus: string;
  limitation: string;
  lastExtractedAt: string | null;
  sourceUrl: string | null;
  cadence: string;
};

export type IntelligenceCoverageItem = {
  id: string;
  label: string;
  status: 'included' | 'expanding';
  note: string;
};

export type IntelligenceEducationModule = {
  id: string;
  title: string;
  body: string;
  href?: string;
};

export type IntelligenceCountyCard = {
  slug: string;
  name: string;
  href: string;
  coverageLevel: ResearchCoverageLevel;
  evidenceNote: string;
};

export type FloridaMoveIntelligencePayload = {
  state: 'florida';
  version: string;
  generatedAt: string;
  asOf: string | null;
  timedOut: boolean;
  metrics: IntelligenceMetricValue[];
  evidenceSources: IntelligenceEvidenceSource[];
  coverage: IntelligenceCoverageItem[];
  education: IntelligenceEducationModule[];
  researchCounties: IntelligenceCountyCard[];
};
