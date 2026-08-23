/**
 * FL-AUDIT-STATE-001 — Florida state enrichment forensic definitions.
 * Read-only. Production writes: 0. Google Places: 0. Does not start FL-012.
 */
export const FL_AUDIT_STATE_001_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_AUDIT_STATE_001_PRODUCTION_WRITES = 0 as const;
export const FL_AUDIT_STATE_001_TASK = 'FL-AUDIT-STATE-001' as const;
export const FL_STATE_ENRICHMENT_ATTRIBUTE_DICTIONARY_V1 =
  'FL_STATE_ENRICHMENT_ATTRIBUTE_DICTIONARY_V1' as const;
export const SCHEMA_STORAGE_COMPATIBILITY_ONLY = 'SCHEMA_STORAGE_COMPATIBILITY_ONLY' as const;

export const STATE_ENRICHMENT_ATTRIBUTES = [
  'deterministic_fl_state_regulatory_identity',
  'im_identifier',
  'im_source_status',
  'im_source_freshness_provenance',
  'mb_identifier',
  'mb_source_status',
  'mb_source_freshness_provenance',
  'source_phone_observation_newly_gained',
  'source_email_observation_newly_gained',
  'source_address_observation_newly_gained',
  'deterministic_federal_state_relationship_newly_established',
  'deterministic_mover_broker_relationship_newly_established',
  'new_canonical_company_identity_created',
  'consumer_visible_florida_state_regulatory_presentation',
] as const;
export type StateEnrichmentAttribute = (typeof STATE_ENRICHMENT_ATTRIBUTES)[number];

export const MATERIAL_RESEARCHABLE_DEFINITION =
  'MATERIALLY_RESEARCHABLE_FROM_STATE_ENRICHMENT: company gained at least one deterministic Florida state regulatory identity/authority AND at least two additional state-derived useful fields/relationships (status, contact observation, federal-state relationship, broker role, or new canonical identity). Frozen in FL-AUDIT-STATE-001. Not a marketing metric.' as const;

export const IDENTITY_ATTRIBUTES = new Set<StateEnrichmentAttribute>([
  'deterministic_fl_state_regulatory_identity',
  'im_identifier',
  'mb_identifier',
]);

export const ADDITIONAL_USEFUL_ATTRIBUTES = new Set<StateEnrichmentAttribute>([
  'im_source_status',
  'im_source_freshness_provenance',
  'mb_source_status',
  'mb_source_freshness_provenance',
  'source_phone_observation_newly_gained',
  'source_email_observation_newly_gained',
  'source_address_observation_newly_gained',
  'deterministic_federal_state_relationship_newly_established',
  'deterministic_mover_broker_relationship_newly_established',
  'new_canonical_company_identity_created',
  'consumer_visible_florida_state_regulatory_presentation',
]);

export type DepthBucket = '0' | '1' | '2-3' | '4-6' | '7+';

export function depthBucket(n: number): DepthBucket {
  if (n <= 0) return '0';
  if (n === 1) return '1';
  if (n <= 3) return '2-3';
  if (n <= 6) return '4-6';
  return '7+';
}

export function isMateriallyResearchable(attrs: readonly StateEnrichmentAttribute[]): boolean {
  const identity = attrs.filter((a) => IDENTITY_ATTRIBUTES.has(a)).length;
  const extra = attrs.filter((a) => ADDITIONAL_USEFUL_ATTRIBUTES.has(a)).length;
  return identity >= 1 && extra >= 2;
}

export function coveragePct(represented: number, active: number): number {
  if (active <= 0) return 0;
  return Math.round((represented / active) * 1000) / 10;
}

export function partitionValid(active: number, represented: number, unresolved: number): boolean {
  return active === represented + unresolved;
}

export function classifyBrokerServiceScopeStorage(input: {
  entityType: string | null;
  serviceScope: string | null;
  usdotNumber: string | null;
}): 'SCHEMA_STORAGE_COMPATIBILITY_ONLY' | 'HAS_AUTHORITATIVE_FEDERAL_ID' {
  const digits = String(input.usdotNumber ?? '').replace(/\D/g, '');
  if (digits.length >= 5 && digits.length <= 8) return 'HAS_AUTHORITATIVE_FEDERAL_ID';
  return SCHEMA_STORAGE_COMPATIBILITY_ONLY;
}

export type TaskClass =
  | 'RESEARCH_ONLY'
  | 'MODEL_ONLY'
  | 'INTERNAL_WRITE'
  | 'PUBLICATION_WRITE'
  | 'QA_ONLY'
  | 'REMEDIATION'
  | 'OBSERVATION';

export const TASK_HISTORY: Array<{
  task: string;
  classification: TaskClass;
  productionCompanyDelta: number;
  notes: string;
}> = [
  { task: 'FL-001', classification: 'RESEARCH_ONLY', productionCompanyDelta: 0, notes: 'Discovery; no company writes.' },
  { task: 'FL-002', classification: 'INTERNAL_WRITE', productionCompanyDelta: 0, notes: '3875 source observations; 0 company inserts; 0 canonical promotions.' },
  { task: 'FL-003', classification: 'RESEARCH_ONLY', productionCompanyDelta: 0, notes: 'Qualification cohort; no writes.' },
  { task: 'FL-004', classification: 'INTERNAL_WRITE', productionCompanyDelta: 37, notes: '37 INSERT INGESTED + 1 LINK; 2 Suddath HOLD.' },
  { task: 'FL-005', classification: 'QA_ONLY', productionCompanyDelta: 0, notes: 'Internal profile QA.' },
  { task: 'FL-006', classification: 'INTERNAL_WRITE', productionCompanyDelta: 0, notes: 'Suddath IM3813 attach to existing wa-hg-064493; no new company.' },
  { task: 'FL-007', classification: 'MODEL_ONLY', productionCompanyDelta: 0, notes: 'Cross-state holds; no bulk writes.' },
  { task: 'FL-008', classification: 'RESEARCH_ONLY', productionCompanyDelta: 0, notes: 'Publication readiness; no apply.' },
  { task: 'FL-009', classification: 'RESEARCH_ONLY', productionCompanyDelta: 0, notes: 'Wave 1 manifest prep apply=false.' },
  { task: 'FL-010', classification: 'QA_ONLY', productionCompanyDelta: 0, notes: 'Blocked; not applied.' },
  { task: 'FL-010A', classification: 'PUBLICATION_WRITE', productionCompanyDelta: 0, notes: '37 INGESTED→PUBLISHABLE; companies count 0; indexable 0.' },
  { task: 'FL-010R', classification: 'REMEDIATION', productionCompanyDelta: 0, notes: 'Hard-404 remediation.' },
  { task: 'FL-011', classification: 'OBSERVATION', productionCompanyDelta: 0, notes: 'Wave 1 observation.' },
  { task: 'FL-011A', classification: 'REMEDIATION', productionCompanyDelta: 0, notes: 'Wave 1 FDACS shell copy.' },
  { task: 'FL-011B', classification: 'INTERNAL_WRITE', productionCompanyDelta: 0, notes: 'PSA ingest/staging; company count 0.' },
  { task: 'FL-011C', classification: 'RESEARCH_ONLY', productionCompanyDelta: 0, notes: '281 gap classified; apply=false.' },
  { task: 'FL-011D', classification: 'INTERNAL_WRITE', productionCompanyDelta: 32, notes: '32 INSERT + 81 LINK; 168 withheld.' },
  { task: 'FL-011E', classification: 'QA_ONLY', productionCompanyDelta: 0, notes: 'Coverage recompute 930/1098.' },
  { task: 'FL-011F', classification: 'RESEARCH_ONLY', productionCompanyDelta: 0, notes: 'Unresolved 168; ready 0.' },
  { task: 'FL-011G', classification: 'OBSERVATION', productionCompanyDelta: 0, notes: 'Checkpoint; FL-012 wait.' },
  { task: 'FL-011H', classification: 'RESEARCH_ONLY', productionCompanyDelta: 0, notes: 'Broker model; apply=false draft.' },
  { task: 'FL-011I', classification: 'INTERNAL_WRITE', productionCompanyDelta: 17, notes: '17 fl-mb INSERT + 1 MB LINK; 18 PSA ATTACH.' },
];

export function realizedCompanyInserts(): number {
  return TASK_HISTORY.reduce((n, t) => n + t.productionCompanyDelta, 0);
}
