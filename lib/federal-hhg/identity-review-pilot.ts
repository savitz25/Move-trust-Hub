import { classifyIdentityReview } from '@/lib/federal-hhg/identity-review';
import { nameTokens, namesLookSimilar } from '@/lib/federal-hhg/match';
import { normalizeMc, normalizeState, normalizeUsdot } from '@/lib/federal-hhg/normalize';
import { TASK_002_PROTECTED_IDENTITIES } from '@/lib/federal-hhg/protected-identities';
import { US_STATES_AND_DC } from '@/lib/federal-hhg/wave-eligibility';

export const PILOT_ID = 'FEDERAL_HHG_IDENTITY_REVIEW_PILOT_2026_08';
export const PILOT_CATEGORY = 'SAME_NAME_DIFFERENT_LOCATION' as const;
export const PILOT_LIMIT = 200;

export const IDENTITY_RESOLUTIONS = [
  'RESOLVED_DISTINCT',
  'REMAIN_REVIEW_REQUIRED',
  'BRAND_OR_FRANCHISE_REVIEW',
  'POSSIBLE_SUCCESSOR_PREDECESSOR',
  'POSSIBLE_DUPLICATE',
  'LEGAL_ENTITY_CONFLICT',
] as const;

export type IdentityResolution = (typeof IDENTITY_RESOLUTIONS)[number];

const FRANCHISE_OR_NETWORK = [
  'two men and a truck',
  'college hunks',
  'allied van',
  'allied',
  'mayflower',
  'atlas van',
  'wheaton',
  'north american',
  'national van',
  'united van',
  'bekins',
  'starving students',
  'u-haul',
  'uhaul',
  'graebel',
  'pods',
  'pod s',
];

const ENTITY_SUFFIX =
  /\b(llc|l l c|inc|incorporated|corp|corporation|co|company|ltd|limited|lp|llp|pllc|dba)\b/g;

export type ExistingIdentity = {
  id: string;
  slug: string;
  name: string;
  usdot: string;
  mc: string;
  city: string;
  state: string;
  phone: string;
  legalName?: string | null;
  physicalAddress?: string | null;
};

export type PilotCandidate = {
  usdot: string;
  mc: string | null;
  legalName: string;
  dbaName: string | null;
  city: string;
  state: string;
  phone: string | null;
  classification: string;
  disposition: string;
  matchReason: string | null;
  hhgCarrierVerified: boolean;
  hhgBrokerVerified: boolean;
  matchedExisting: ExistingIdentity[];
};

export type ResolutionResult = {
  resolution: IdentityResolution;
  confidence: 'high' | 'medium' | 'low';
  eligibleForCanonicalization: boolean;
  public: false;
  indexable: false;
  autoMerge: false;
  reasons: string[];
  matchedCompanyId: string | null;
  matchedCompanyUsdot: string | null;
};

export function normalizeLegalCore(value: string | null | undefined): string {
  return (value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(ENTITY_SUFFIX, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeCity(value: string | null | undefined): string {
  return (value ?? '')
    .toLowerCase()
    .replace(/\bst\b/g, 'saint')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizePhone(value: string | null | undefined): string {
  const digits = (value ?? '').replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return digits.length === 10 ? digits : digits;
}

export function parseHeadquarters(headquarters: string | null | undefined): {
  city: string;
  state: string;
} {
  const raw = (headquarters ?? '').trim();
  if (!raw) return { city: '', state: '' };
  const parts = raw.split(',').map((part) => part.trim());
  if (parts.length >= 2) {
    return {
      city: parts.slice(0, -1).join(' '),
      state: normalizeState(parts[parts.length - 1]),
    };
  }
  return { city: raw, state: '' };
}

export function isProtectedIdentity(existing: ExistingIdentity): boolean {
  const expected = TASK_002_PROTECTED_IDENTITIES[existing.id];
  if (expected !== undefined) return true;
  const usdot = normalizeUsdot(existing.usdot);
  return Object.values(TASK_002_PROTECTED_IDENTITIES).some((dot) => dot && dot === usdot);
}

export function looksLikeFranchiseOrNetwork(
  legalName: string | null,
  dbaName: string | null,
  existingName?: string | null
): boolean {
  const hay = `${legalName ?? ''} ${dbaName ?? ''} ${existingName ?? ''}`.toLowerCase();
  return FRANCHISE_OR_NETWORK.some((token) => hay.includes(token));
}

function authorityVerified(candidate: PilotCandidate): boolean {
  if (candidate.classification === 'HHG_CARRIER') return candidate.hhgCarrierVerified;
  if (candidate.classification === 'HHG_BROKER') return candidate.hhgBrokerVerified;
  if (candidate.classification === 'HHG_CARRIER_BROKER') {
    return candidate.hhgCarrierVerified && candidate.hhgBrokerVerified;
  }
  return false;
}

function sameLocation(candidate: PilotCandidate, existing: ExistingIdentity): boolean {
  const cCity = normalizeCity(candidate.city);
  const eCity = normalizeCity(existing.city);
  const cState = normalizeState(candidate.state);
  const eState = normalizeState(existing.state);
  return Boolean(cCity && eCity && cState && eState && cCity === eCity && cState === eState);
}

function phonesCollide(candidate: PilotCandidate, existing: ExistingIdentity): boolean {
  const a = normalizePhone(candidate.phone);
  const b = normalizePhone(existing.phone);
  return Boolean(a && b && a.length >= 10 && b.length >= 10 && a === b);
}

function legalCoresEqual(candidate: PilotCandidate, existing: ExistingIdentity): boolean {
  const cores = [
    normalizeLegalCore(candidate.legalName),
    normalizeLegalCore(candidate.dbaName),
  ].filter(Boolean);
  const existingCores = [
    normalizeLegalCore(existing.name),
    normalizeLegalCore(existing.legalName),
  ].filter(Boolean);
  return cores.some((core) => existingCores.includes(core));
}

const GENERIC_INDUSTRY_TOKENS = new Set([
  'relocation',
  'relocating',
  'delivery',
  'deliveries',
  'transfer',
  'logistics',
  'management',
  'system',
  'systems',
  'group',
  'resource',
  'office',
  'special',
  'specialized',
  'nationwide',
  'professional',
  'installation',
  'installations',
  'worldwide',
  'global',
  'international',
]);

export function strongNameTokens(value: string): string[] {
  return nameTokens(value).filter((token) => !GENERIC_INDUSTRY_TOKENS.has(token));
}

export function tokenOverlap(a: string, b: string): number {
  const ta = new Set(strongNameTokens(a));
  const tb = new Set(strongNameTokens(b));
  let overlap = 0;
  for (const token of ta) if (tb.has(token)) overlap += 1;
  return overlap;
}

export function isStrongCounterpart(candidate: PilotCandidate, existing: ExistingIdentity): boolean {
  return legalCoresEqual(candidate, existing);
}

const COMMON_TRADE_TOKENS = new Set([
  'elite',
  'university',
  'affordable',
  'american',
  'nationwide',
  'professional',
  'sunshine',
  'select',
  'best',
  'express',
  'quality',
  'star',
  'plus',
  'budget',
  'discount',
  'metro',
  'city',
  'town',
]);

export function isCommonTradeCore(value: string | null | undefined): boolean {
  const tokens = strongNameTokens(value ?? '');
  return tokens.length > 0 && tokens.every((token) => COMMON_TRADE_TOKENS.has(token) || token.length <= 3);
}

function hasVanLineBrand(value: string | null | undefined): boolean {
  return /\bvan lines\b/i.test(value ?? '');
}

function distinctiveCoreContained(candidate: PilotCandidate, existing: ExistingIdentity): boolean {
  const cores = [normalizeLegalCore(candidate.legalName), normalizeLegalCore(candidate.dbaName)].filter(
    (core) => core.length >= 8
  );
  const against = [normalizeLegalCore(existing.name), normalizeLegalCore(existing.legalName)].filter(
    (core) => core.length >= 8
  );
  return cores.some((core) => against.some((other) => core !== other && (other.includes(core) || core.includes(other))));
}

function usableExisting(existing: ExistingIdentity): boolean {
  return Boolean(normalizeUsdot(existing.usdot) && normalizeCity(existing.city) && normalizeState(existing.state));
}

/**
 * Fail-closed distinctness. Different USDOT + different city is never enough by itself.
 */
export function resolveIdentityPilot(
  candidate: PilotCandidate,
  universe: { existingUsdots: ReadonlySet<string>; existingMcs: ReadonlySet<string> }
): ResolutionResult {
  const reasons: string[] = [];
  const deny = (
    resolution: IdentityResolution,
    reason: string,
    confidence: ResolutionResult['confidence'] = 'high'
  ): ResolutionResult => ({
    resolution,
    confidence,
    eligibleForCanonicalization: false,
    public: false,
    indexable: false,
    autoMerge: false,
    reasons: [...reasons, reason],
    matchedCompanyId: candidate.matchedExisting[0]?.id ?? null,
    matchedCompanyUsdot: normalizeUsdot(candidate.matchedExisting[0]?.usdot ?? '') || null,
  });

  if (candidate.disposition !== 'IDENTITY_REVIEW_REQUIRED') {
    return deny('REMAIN_REVIEW_REQUIRED', 'original_disposition_not_review');
  }

  const usdot = normalizeUsdot(candidate.usdot);
  if (!usdot) return deny('REMAIN_REVIEW_REQUIRED', 'missing_candidate_usdot');
  if (!candidate.legalName?.trim()) return deny('REMAIN_REVIEW_REQUIRED', 'missing_legal_name');
  if (!normalizeCity(candidate.city) || !normalizeState(candidate.state)) {
    return deny('REMAIN_REVIEW_REQUIRED', 'missing_candidate_hq');
  }
  if (!authorityVerified(candidate)) {
    return deny('REMAIN_REVIEW_REQUIRED', 'hhg_authority_not_verified');
  }
  if (!US_STATES_AND_DC.has(normalizeState(candidate.state))) {
    return deny('REMAIN_REVIEW_REQUIRED', 'geography_not_us_or_dc');
  }
  if (!candidate.matchedExisting.length) {
    return deny('REMAIN_REVIEW_REQUIRED', 'no_matched_existing_profile');
  }

  if (universe.existingUsdots.has(usdot)) {
    return deny('POSSIBLE_DUPLICATE', 'candidate_usdot_already_public');
  }

  const mc = normalizeMc(candidate.mc ?? '');
  if (mc && universe.existingMcs.has(mc)) {
    return deny('LEGAL_ENTITY_CONFLICT', 'exact_mc_collision');
  }
  if (looksLikeFranchiseOrNetwork(candidate.legalName, candidate.dbaName, null)) {
    return deny('BRAND_OR_FRANCHISE_REVIEW', 'franchise_or_network_token');
  }

  const counterparts = candidate.matchedExisting.filter(
    (existing) => usableExisting(existing) && isStrongCounterpart(candidate, existing)
  );
  if (!counterparts.length) {
    return deny('REMAIN_REVIEW_REQUIRED', 'no_strong_identity_counterpart');
  }

  for (const existing of counterparts) {
    if (isProtectedIdentity(existing)) {
      return deny('BRAND_OR_FRANCHISE_REVIEW', `protected_identity:${existing.id}`);
    }
    if (looksLikeFranchiseOrNetwork(candidate.legalName, candidate.dbaName, existing.name)) {
      return deny('BRAND_OR_FRANCHISE_REVIEW', 'franchise_or_network_token');
    }
    if (
      legalCoresEqual(candidate, existing) &&
      (hasVanLineBrand(candidate.legalName) ||
        hasVanLineBrand(candidate.dbaName) ||
        hasVanLineBrand(existing.name))
    ) {
      return deny('BRAND_OR_FRANCHISE_REVIEW', 'van_line_network_brand');
    }
    if (distinctiveCoreContained(candidate, existing)) {
      return deny('LEGAL_ENTITY_CONFLICT', 'distinctive_legal_core_contained');
    }
    const existingDot = normalizeUsdot(existing.usdot);
    if (existingDot === usdot) {
      return deny('POSSIBLE_DUPLICATE', 'same_usdot_as_existing');
    }
    if (sameLocation(candidate, existing)) {
      return deny('POSSIBLE_DUPLICATE', 'same_location_conflict');
    }
    if (phonesCollide(candidate, existing)) {
      return deny('LEGAL_ENTITY_CONFLICT', 'shared_official_phone');
    }
    const existingMc = normalizeMc(existing.mc);
    if (mc && existingMc && mc === existingMc) {
      return deny('LEGAL_ENTITY_CONFLICT', 'exact_mc_collision');
    }
    if (legalCoresEqual(candidate, existing)) {
      const bothPhones = normalizePhone(candidate.phone) && normalizePhone(existing.phone);
      if (!bothPhones || !mc || !existingMc) {
        return deny(
          'POSSIBLE_SUCCESSOR_PREDECESSOR',
          'identical_legal_core_insufficient_independence_evidence'
        );
      }
      if (
        isCommonTradeCore(candidate.legalName) ||
        isCommonTradeCore(candidate.dbaName) ||
        isCommonTradeCore(existing.name)
      ) {
        return deny('REMAIN_REVIEW_REQUIRED', 'common_trade_name');
      }
    }
  }

  const primary = counterparts[0]!;
  const triage = classifyIdentityReview({
    matchReason: candidate.matchReason,
    legalName: candidate.legalName,
    dbaName: candidate.dbaName,
    phyCity: candidate.city,
    phyState: candidate.state,
    existingName: primary.name,
    existingCity: primary.city,
    existingState: primary.state,
  });
  if (triage.category !== PILOT_CATEGORY) {
    return deny('REMAIN_REVIEW_REQUIRED', `category_${triage.category}`);
  }
  if (triage.autoMerge) {
    return deny('REMAIN_REVIEW_REQUIRED', 'auto_merge_forbidden');
  }

  const differentState = counterparts.every(
    (existing) => normalizeState(existing.state) !== normalizeState(candidate.state)
  );
  if (!differentState) {
    return deny('REMAIN_REVIEW_REQUIRED', 'not_all_matches_are_different_state');
  }

  reasons.push('different_verified_usdot');
  reasons.push('materially_different_hq_state');
  reasons.push('no_mc_collision');
  reasons.push('no_shared_phone');
  reasons.push('verified_hhg_authority');
  reasons.push('not_franchise_or_protected');

  return {
    resolution: 'RESOLVED_DISTINCT',
    confidence: 'high',
    eligibleForCanonicalization: true,
    public: false,
    indexable: false,
    autoMerge: false,
    reasons,
    matchedCompanyId: primary.id,
    matchedCompanyUsdot: normalizeUsdot(primary.usdot),
  };
}

/** Independent evidence checklist. Does not call resolveIdentityPilot. */
export function independentlyConfirmDistinct(
  candidate: PilotCandidate,
  universe: { existingUsdots: ReadonlySet<string>; existingMcs: ReadonlySet<string> }
): { ok: boolean; failures: string[] } {
  const failures: string[] = [];
  const usdot = normalizeUsdot(candidate.usdot);
  if (!usdot) failures.push('usdot missing');
  if (universe.existingUsdots.has(usdot)) failures.push('usdot already public');
  if (!authorityVerified(candidate)) failures.push('authority');
  const mc = normalizeMc(candidate.mc ?? '');
  if (mc && universe.existingMcs.has(mc)) failures.push('mc collision');
  const counterparts = candidate.matchedExisting.filter(
    (existing) => usableExisting(existing) && isStrongCounterpart(candidate, existing)
  );
  if (!counterparts.length) failures.push('no strong counterpart');
  if (!US_STATES_AND_DC.has(normalizeState(candidate.state))) failures.push('geography');
  for (const existing of counterparts) {
    if (normalizeUsdot(existing.usdot) === usdot) failures.push('same usdot');
    if (sameLocation(candidate, existing)) failures.push('same location');
    if (normalizeState(existing.state) === normalizeState(candidate.state)) {
      failures.push('same state as matched existing');
    }
    if (phonesCollide(candidate, existing)) failures.push('shared phone');
    if (isProtectedIdentity(existing)) failures.push('protected');
    if (looksLikeFranchiseOrNetwork(candidate.legalName, candidate.dbaName, existing.name)) {
      failures.push('franchise');
    }
    if (
      legalCoresEqual(candidate, existing) &&
      (hasVanLineBrand(candidate.legalName) ||
        hasVanLineBrand(candidate.dbaName) ||
        hasVanLineBrand(existing.name))
    ) {
      failures.push('van line brand');
    }
    if (distinctiveCoreContained(candidate, existing)) failures.push('contained legal core');
    if (legalCoresEqual(candidate, existing)) {
      if (!normalizePhone(candidate.phone) || !normalizePhone(existing.phone) || !mc) {
        failures.push('identical legal core without independent contacts');
      }
      if (
        isCommonTradeCore(candidate.legalName) ||
        isCommonTradeCore(candidate.dbaName) ||
        isCommonTradeCore(existing.name)
      ) {
        failures.push('common trade name');
      }
    }
  }
  return { ok: failures.length === 0, failures };
}

export function findSimilarCompanies(
  legalName: string,
  dbaName: string | null,
  companies: readonly ExistingIdentity[]
): ExistingIdentity[] {
  return companies.filter((company) => {
    const against = [legalName, dbaName ?? ''].filter(Boolean);
    return against.some(
      (name) =>
        namesLookSimilar(name, company.name) ||
        namesLookSimilar(name, company.legalName ?? '')
    );
  });
}

export function selectIdentityReviewPilot<
  T extends {
    usdot: string;
    classification: string;
    state: string;
    exactName: boolean;
  },
>(rows: readonly T[], limit = PILOT_LIMIT): T[] {
  const byRole = (role: string) =>
    [...rows.filter((row) => row.classification === role)].sort((a, b) =>
      a.usdot.localeCompare(b.usdot, 'en')
    );
  const selected: T[] = [];
  const used = new Set<string>();

  const take = (pool: T[], max: number) => {
    const buckets = new Map<string, T[]>();
    for (const row of pool) {
      if (used.has(row.usdot)) continue;
      const key = `${row.exactName ? 'E' : 'N'}:${row.state || 'ZZ'}`;
      buckets.set(key, [...(buckets.get(key) ?? []), row]);
    }
    const keys = [...buckets.keys()].sort();
    let i = 0;
    let added = 0;
    let idle = 0;
    while (added < max && selected.length < limit && keys.length && idle < keys.length) {
      const key = keys[i % keys.length]!;
      i += 1;
      const bucket = buckets.get(key) ?? [];
      const next = bucket.shift();
      if (!next) {
        idle += 1;
        continue;
      }
      used.add(next.usdot);
      selected.push(next);
      added += 1;
      idle = 0;
    }
  };

  const duals = byRole('HHG_CARRIER_BROKER');
  const brokers = byRole('HHG_BROKER');
  const carriers = byRole('HHG_CARRIER');
  take(duals, Math.min(duals.length, 20));
  take(brokers, Math.min(brokers.length, 40));
  take(carriers, limit);
  return selected.slice(0, limit);
}

export function resolutionDoesNotPublish(result: ResolutionResult): boolean {
  return result.public === false && result.indexable === false && result.autoMerge === false;
}
