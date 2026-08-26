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
  geographicScope: 'florida_statewide' | 'florida_hq' | 'county_credential' | 'unattributed';
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

/** Plug-in slots for later county datasets. Readiness is the public gate. */
export type CountyIntelModuleId =
  | 'county_credentials'
  | 'county_complaints'
  | 'enforcement_dispositions'
  | 'permit_local_credential'
  | 'county_consumer_affairs'
  | 'civil_public_regulatory'
  | 'expanded_contact_observations'
  | 'operating_activity_evidence';

export type CountyIntelModuleStatus = {
  id: CountyIntelModuleId;
  label: string;
  readiness: MetricReadiness;
  publicEligibility: MetricPublicEligibility;
  note: string;
};

export type CountyCredentialCensus = {
  datasetPresent: boolean;
  agency: string | null;
  credentialType: string | null;
  sourceKey: string | null;
  sourceUrl: string | null;
  total: number | null;
  published: number | null;
  internalOnly: number | null;
  asOf: string | null;
  attribution: string;
};

export type CountyDiscoveryLink = {
  id: string;
  label: string;
  href: string;
  semantics: string;
};

export type CountyMoveIntelligencePayload = {
  state: 'florida';
  countySlug: string;
  countyName: string;
  canonicalPath: string;
  version: string;
  generatedAt: string;
  asOf: string | null;
  timedOut: boolean;
  coverageLevel: ResearchCoverageLevel;
  enhancedGateDocumented: boolean;
  enhancedGateActivated: boolean;
  metrics: IntelligenceMetricValue[];
  modules: CountyIntelModuleStatus[];
  credentials: CountyCredentialCensus;
  evidenceSources: IntelligenceEvidenceSource[];
  coverage: IntelligenceCoverageItem[];
  education: IntelligenceEducationModule[];
  discoveryLinks: CountyDiscoveryLink[];
};
