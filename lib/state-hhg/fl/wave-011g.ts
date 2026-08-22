/**
 * FL-011G — read-only state observation checkpoint and FL-012 readiness freeze.
 * Production writes: 0. Google Places: 0. Does not start FL-012.
 */
export const FL_011G_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_011G_PRODUCTION_WRITES = 0 as const;
export const FL_011G_TASK = 'FL-011G' as const;
export const FL_STATE_ACTIVE_IM_COVERAGE_CHECKPOINT_V1 =
  'FL_STATE_ACTIVE_IM_COVERAGE_CHECKPOINT_V1' as const;
export const FL_STATE_UNRESOLVED_HOLD_V1 = 'FL_STATE_UNRESOLVED_HOLD_V1' as const;
export const FL_STATE_COMPLETION_CRITERIA_V1 = 'FL_STATE_COMPLETION_CRITERIA_V1' as const;
export const FL_STATE_PRE_FL012_IMPACT_CHECKPOINT_V1 =
  'FL_STATE_PRE_FL012_IMPACT_CHECKPOINT_V1' as const;

export const FL_012_MATURITY = '2026-09-05T14:45:00.000Z' as const;
export const FL_WAVE1_LAUNCH = '2026-08-22T14:45:00.000Z' as const;
export const EXPECTED_ACTIVE = 1098 as const;
export const EXPECTED_REPRESENTED = 930 as const;
export const EXPECTED_UNRESOLVED = 168 as const;
export const EXPECTED_COVERAGE_PCT = 84.7 as const;
export const WAVE2_DRAFT_HASH = 'a5d15f3dca32a59a' as const;
export const WAVE2_DRAFT_COUNT = 50 as const;
export const WAVE2_READY_POOL = 720 as const;

export const BROKER_IDENTITY_CLASSES = [
  'BROKER_EXISTING_CANONICAL_EXACT',
  'BROKER_STATE_RECORD_ONLY',
  'BROKER_IDENTITY_REVIEW',
  'BROKER_STATUS_BLOCKED',
  'BROKER_DUPLICATE_CONFLICT',
] as const;
export type BrokerIdentityClass = (typeof BROKER_IDENTITY_CLASSES)[number];

export const BROKER_PUB_CLASSES = [
  'BROKER_PUBLICATION_MODEL_READY',
  'BROKER_MODEL_REMEDIATION_REQUIRED',
  'BROKER_IDENTITY_NOT_READY',
  'BROKER_COMPANY_NOT_PUBLIC',
] as const;
export type BrokerPubClass = (typeof BROKER_PUB_CLASSES)[number];

export function coveragePartitionValid(active: number, represented: number, unresolved: number): boolean {
  return active === represented + unresolved;
}

export function fl012MayExecute(nowIso: string): boolean {
  return Date.parse(nowIso) >= Date.parse(FL_012_MATURITY);
}

export function observationElapsedHours(nowIso: string): number {
  return Math.round(((Date.parse(nowIso) - Date.parse(FL_WAVE1_LAUNCH)) / 36e5) * 10) / 10;
}

export function coverageSemantics(): string {
  return '84.7% of the current approved active FDACS intrastate-mover IM universe has a deterministic canonical MoveTrustHub representation.';
}

export function notCoverageSemantics(): string[] {
  return [
    '84.7% of all movers in Florida',
    '84.7% of brokers',
    '84.7% of FMCSA interstate carriers',
    '84.7% of all businesses offering moving services',
    '84.7% of county-regulated businesses',
    '930 published companies',
    '37 = state coverage',
  ];
}

export function classifyBrokerIdentity(input: {
  status: string;
  mbNumber: string | null;
  exactCanonicalCompanyId: string | null;
  nameOnlyHit: boolean;
  collidingCompanyIds: string[];
}): BrokerIdentityClass {
  const st = String(input.status || '').toLowerCase();
  if (st && st !== 'active') return 'BROKER_STATUS_BLOCKED';
  if (input.collidingCompanyIds.length > 1) return 'BROKER_DUPLICATE_CONFLICT';
  if (input.exactCanonicalCompanyId && !input.nameOnlyHit) return 'BROKER_EXISTING_CANONICAL_EXACT';
  if (input.nameOnlyHit) return 'BROKER_IDENTITY_REVIEW';
  return 'BROKER_STATE_RECORD_ONLY';
}

export function classifyBrokerPublication(identity: BrokerIdentityClass): BrokerPubClass {
  if (identity === 'BROKER_EXISTING_CANONICAL_EXACT') return 'BROKER_MODEL_REMEDIATION_REQUIRED';
  if (identity === 'BROKER_STATUS_BLOCKED' || identity === 'BROKER_DUPLICATE_CONFLICT') {
    return 'BROKER_IDENTITY_NOT_READY';
  }
  return 'BROKER_IDENTITY_NOT_READY';
}

export const FL012_DECISIONS = [
  'KEEP_WAVE_1',
  'KEEP_WITH_BOUNDED_REMEDIATION',
  'ROLLBACK_WAVE_1',
  'WAIT_FOR_MORE_OBSERVATION',
] as const;

export function fl012DecisionTriggers(): Record<(typeof FL012_DECISIONS)[number], string> {
  return {
    KEEP_WAVE_1:
      'Maturity reached; 37/37 200/noindex; sitemap 0; wrong-company 0; no unresolved critical incident; KEEP_80 and INDEXABLE healthy.',
    KEEP_WITH_BOUNDED_REMEDIATION:
      'Maturity reached; Wave 1 still consumer-safe but a bounded shell/copy/QA defect remains (same class as FL-011A).',
    ROLLBACK_WAVE_1:
      'Maturity reached and a material identity, wrong-company, or publication-contract failure is still live.',
    WAIT_FOR_MORE_OBSERVATION: 'Current UTC is before 2026-09-05T14:45:00Z — FL-012 is prohibited.',
  };
}
