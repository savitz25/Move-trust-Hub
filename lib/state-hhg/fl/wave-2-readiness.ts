/**
 * FL-011B — FL_STATE_WAVE_2_READINESS_V1.
 * Read-only qualification. Does not publish. Google Places: 0.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  assessStatusFreshness,
  qualifyFloridaPublicationReadiness,
  type ReadinessInput,
  type ReadinessResult,
  type StatusFreshness,
} from '@/lib/state-hhg/fl/publication-readiness';
import { FL_STATE_WAVE_1_ID, FL_009_DEFERRED_COMPANY_ID } from '@/lib/state-hhg/fl/wave-1';

export const FL_STATE_WAVE_2_READINESS_V1 = 'FL_STATE_WAVE_2_READINESS_V1' as const;
export const FL_STATE_WAVE_2_DRAFT_ID = 'FL_STATE_WAVE_2_DRAFT' as const;
export const FL_011B_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_011B_RECOMMENDED_CAP = 50 as const;

export const WAVE_2_STATES = [
  'READY_FOR_WAVE_2',
  'HOLD_PROFILE_THIN',
  'REVIEW_REQUIRED',
  'NOT_ELIGIBLE',
  'DEFERRED',
  'EXCLUDED_WAVE_1',
  'EXCLUDED_KEEP_80',
  'EXCLUDED_HOLD',
  'STATE_RECORD_ONLY',
] as const;

export type Wave2State = (typeof WAVE_2_STATES)[number];

export type Wave2ReadinessResult = ReadinessResult & {
  wave2State: Wave2State;
  rulesetVersion: typeof FL_STATE_WAVE_2_READINESS_V1;
};

export type Wave2DraftMember = {
  companyId: string;
  slug: string;
  fdacsId: string;
  fdacsIm: string;
  county: string | null;
  countyFips: string | null;
  readinessRuleVersion: typeof FL_STATE_WAVE_2_READINESS_V1;
  currentPublicationState: 'INGESTED';
  currentIndexable: false;
  intendedPublicationState: 'PUBLISHABLE';
  intendedIndexable: false;
  freshness: StatusFreshness;
  rollbackPublicationState: 'INGESTED';
  rollbackIndexable: false;
};

export function loadFl007HoldCompanyIds(
  path = resolve(process.cwd(), 'docs/task-fl-007-group-decisions.json')
): string[] {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    groups: Array<{
      action?: string;
      florida?: Array<{ company_id?: string | null }>;
      fl_company?: { id?: string | null };
    }>;
  };
  const ids = new Set<string>();
  for (const g of raw.groups ?? []) {
    if (g.action !== 'KEEP_HOLD') continue;
    if (g.fl_company?.id) ids.add(g.fl_company.id);
    for (const row of g.florida ?? []) {
      if (row.company_id) ids.add(row.company_id);
    }
  }
  ids.add(FL_009_DEFERRED_COMPANY_ID);
  return [...ids].sort();
}

export function qualifyWave2Readiness(input: ReadinessInput & {
  inWave1: boolean;
  inKeep80: boolean;
  inHoldList: boolean;
  missingCanonicalCompany: boolean;
}): Wave2ReadinessResult {
  const base: Wave2ReadinessResult = {
    ...qualifyFloridaPublicationReadiness(input),
    wave2State: 'NOT_ELIGIBLE',
    rulesetVersion: FL_STATE_WAVE_2_READINESS_V1,
  };

  if (input.inWave1) {
    return {
      ...base,
      state: 'NOT_ELIGIBLE',
      wave2State: 'EXCLUDED_WAVE_1',
      reasons: ['Exact FL_STATE_WAVE_1 member — excluded from Wave 2.'],
      missingRequirements: ['excluded_wave_1'],
    };
  }
  if (input.inKeep80) {
    return {
      ...base,
      state: 'NOT_ELIGIBLE',
      wave2State: 'EXCLUDED_KEEP_80',
      reasons: ['KEEP_80 canary member — Wave 2 remains separate.'],
      missingRequirements: ['excluded_keep_80'],
    };
  }
  if (input.inHoldList) {
    return {
      ...base,
      state: 'DEFERRED',
      wave2State: 'EXCLUDED_HOLD',
      reasons: ['Unresolved FL-007 / dual-credential hold — not auto-included.'],
      missingRequirements: ['excluded_hold'],
    };
  }
  if (input.missingCanonicalCompany) {
    return {
      ...base,
      state: 'REVIEW_REQUIRED',
      wave2State: 'STATE_RECORD_ONLY',
      reasons: ['Active FDACS IM exists but no safe canonical company is established.'],
      missingRequirements: ['canonical_company'],
    };
  }

  const mapped: Record<string, Wave2State> = {
    READY_FOR_PUBLISHABLE_CANARY: 'READY_FOR_WAVE_2',
    HOLD_PROFILE_THIN: 'HOLD_PROFILE_THIN',
    REVIEW_REQUIRED: 'REVIEW_REQUIRED',
    NOT_ELIGIBLE: 'NOT_ELIGIBLE',
    DEFERRED: 'DEFERRED',
  };
  return {
    ...base,
    wave2State: mapped[base.state] ?? 'NOT_ELIGIBLE',
    rulesetVersion: FL_STATE_WAVE_2_READINESS_V1,
  };
}

export function hashWave2Draft(members: readonly Wave2DraftMember[]): string {
  const payload = [...members]
    .map(
      (m) =>
        `${m.companyId}|${m.slug}|${m.fdacsIm}|${m.intendedPublicationState}|${m.intendedIndexable}`
    )
    .sort()
    .join('\n');
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

/** Round-robin by county so the controlled subset is not one-metro. */
export function recommendWave2Subset<T extends { county: string | null; companyId: string }>(
  ready: readonly T[],
  cap = FL_011B_RECOMMENDED_CAP
): T[] {
  const sorted = [...ready].sort((a, b) => a.companyId.localeCompare(b.companyId));
  if (sorted.length <= cap) return sorted;
  const buckets = new Map<string, T[]>();
  for (const row of sorted) {
    const key = row.county?.trim() || 'UNKNOWN';
    buckets.set(key, [...(buckets.get(key) ?? []), row]);
  }
  const counties = [...buckets.keys()].sort();
  const picked: T[] = [];
  const seen = new Set<string>();
  let i = 0;
  while (picked.length < cap) {
    let progressed = false;
    for (const county of counties) {
      const bucket = buckets.get(county) ?? [];
      const next = bucket[i];
      if (!next || seen.has(next.companyId)) continue;
      picked.push(next);
      seen.add(next.companyId);
      progressed = true;
      if (picked.length >= cap) break;
    }
    if (!progressed) break;
    i += 1;
  }
  return picked.sort((a, b) => a.companyId.localeCompare(b.companyId));
}

export function recommendedCapReason(readyCount: number, recommendedCount: number): string {
  if (readyCount === 0) {
    return 'No remaining INGESTED Florida IM companies passed FL_STATE_WAVE_2_READINESS_V1 after Wave 1 / KEEP_80 / hold exclusions.';
  }
  if (recommendedCount === readyCount && readyCount <= 25) {
    return `Ready pool is ${readyCount}; recommend the full pool (≤25) so Wave 2 stays precision-first.`;
  }
  if (recommendedCount === readyCount) {
    return `Ready pool is ${readyCount}; recommend the full pool. Size stays comparable to Wave 1 (37) without forcing a round number.`;
  }
  return `Ready pool is ${readyCount}; cap recommended Wave 2 at ${recommendedCount} with county round-robin so QA burden stays bounded and geography is not one-metro.`;
}

export { assessStatusFreshness, FL_STATE_WAVE_1_ID };
