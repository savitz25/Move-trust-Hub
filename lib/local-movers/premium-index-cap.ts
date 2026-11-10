import { MAX_TIER1_COUNT } from '@/lib/local-movers/county-indexability';
import { COUNTY_QUALITY_THRESHOLDS } from '@/lib/local-movers/county-quality-score';
import type { CountyIndexDecision } from '@/lib/local-movers/county-indexability';

/**
 * Premium index cap.
 *
 * At most MAX_TIER1_COUNT (400) counties may be indexable Premium.
 * Ordering is quality score descending, then `state/county` ascending, so the
 * same 400 win on every run. Standard counties are not ranked and do not use
 * a slot.
 *
 * The cap changes a county only when more than 400 counties actually qualify
 * as indexable Premium. At or under 400, every qualifying Premium county stays
 * Premium. Past the cap, a county falls back to Standard when it still meets
 * the Standard score floor, and noindex otherwise.
 */
export const PREMIUM_INDEX_CAP = MAX_TIER1_COUNT;

export type PremiumCapRow = {
  stateSlug: string;
  countySlug: string;
  tier: 'index' | 'noindex';
  seoTier?: 1 | 2 | 3;
  qualityScore?: number;
};

export function premiumCapKey(stateSlug: string, countySlug: string): string {
  return `${stateSlug}/${countySlug}`;
}

export function rankPremiumCandidates<T extends PremiumCapRow>(rows: readonly T[]): T[] {
  return rows
    .filter((row) => row.tier === 'index' && row.seoTier === 1)
    .slice()
    .sort((a, b) => {
      const score = (b.qualityScore ?? 0) - (a.qualityScore ?? 0);
      if (score !== 0) return score;
      return premiumCapKey(a.stateSlug, a.countySlug).localeCompare(
        premiumCapKey(b.stateSlug, b.countySlug)
      );
    });
}

/** Keys allowed to remain Premium. Length is at most the cap. */
export function premiumAllowanceKeys(rows: readonly PremiumCapRow[]): Set<string> {
  return new Set(
    rankPremiumCandidates(rows)
      .slice(0, PREMIUM_INDEX_CAP)
      .map((row) => premiumCapKey(row.stateSlug, row.countySlug))
  );
}

export function applyPremiumCapToDecision(
  decision: CountyIndexDecision,
  stateSlug: string,
  countySlug: string,
  allowedPremiumKeys: ReadonlySet<string>,
  /** How many counties actually qualify as indexable Premium. */
  premiumCount = allowedPremiumKeys.size
): CountyIndexDecision {
  if (decision.tier !== 'index' || decision.seoTier !== 1) return decision;
  if (premiumCount <= PREMIUM_INDEX_CAP) return decision;
  if (allowedPremiumKeys.has(premiumCapKey(stateSlug, countySlug))) return decision;

  const meetsStandard = (decision.qualityScore ?? 0) >= COUNTY_QUALITY_THRESHOLDS.tier2MinScore;
  if (meetsStandard) {
    return {
      ...decision,
      tier: 'index',
      seoTier: 2,
      reason: 'premium_cap_fallback_standard',
    };
  }
  return {
    ...decision,
    tier: 'noindex',
    seoTier: 3,
    reason: 'premium_cap_noindex',
  };
}
