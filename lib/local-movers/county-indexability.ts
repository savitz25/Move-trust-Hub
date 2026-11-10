import { scoreCountyQuality } from '@/lib/local-movers/county-quality-score';
import { countExplicitCountyMovers, getMoversForCounty } from '@/lib/local-movers/index';
import { listedCountyMovers } from '@/lib/seo/unique-local-movers';
import { hasCountyServiceEvidence } from '@/lib/local-movers/county-evidence';
import { isPremiumCountyWithinCap } from '@/lib/local-movers/premium-county-cap';
import { hasAttributableCountyReviews } from '@/lib/trust/verified-reviews';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export type CountyIndexTier = 'index' | 'noindex';

export type CountyIndexDecision = {
  tier: CountyIndexTier;
  reason: string;
  /** Phase 3 SEO product tier when scored */
  seoTier?: 1 | 2 | 3;
  qualityScore?: number;
};

/**
 * A county needs at least one publishable, evidence-supported business.
 * Editorial quality gates still determine whether that inventory is enough to index.
 */
export const MIN_EXPLICIT_MOVERS_TO_INDEX = 1;

/** Hard deploy stop — see scripts/lib/tier1-circuit-breaker.ts */
export const MAX_TIER1_COUNT = 400;

type CountyMoverResult = {
  county: LocalCounty;
  movers: LocalMover[];
  isRegionalFallback: boolean;
  sourceMode?: 'db' | 'seed' | 'hybrid' | 'degraded';
};

/**
 * Indexability via Phase 3 quality score:
 * Tier 1 Premium + Tier 2 Standard → index
 * Tier 3 Development → noindex, follow
 */
export function evaluateCountyIndexabilityFromResult(
  stateSlug: string,
  countySlug: string,
  result: CountyMoverResult | null
): CountyIndexDecision {
  if (!result) {
    return { tier: 'noindex', reason: 'missing_county', seoTier: 3, qualityScore: 0 };
  }

  const quality = scoreCountyQuality({
    stateSlug,
    countySlug,
    county: result.county,
    movers: result.movers,
    isRegionalFallback: result.isRegionalFallback,
  });

  if (result.sourceMode === 'degraded') {
    return { tier: 'noindex', reason: 'publication_lookup_degraded', seoTier: 3, qualityScore: quality.score };
  }
  const qualifyingMovers = result.movers.filter((mover) =>
    hasCountyServiceEvidence(mover, result.county)
  ).length;
  if (qualifyingMovers === 0) {
    return {
      tier: 'noindex',
      reason: 'no_evidence_supported_movers',
      seoTier: 3,
      qualityScore: quality.score,
    };
  }

  if (!quality.indexable) {
    return {
      tier: 'noindex',
      reason: quality.reason,
      seoTier: quality.tier,
      qualityScore: quality.score,
    };
  }

  // Kept by the 3-mover rule, but the county page lists nobody after the
  // out-of-state filter. Those pages stay up and stay noindex.
  if (listedCountyMovers(result.movers, result.county).length === 0) {
    return {
      tier: 'noindex',
      reason: 'no_listed_movers',
      seoTier: quality.tier,
      qualityScore: quality.score,
    };
  }

  const withinPremiumCap = quality.tier !== 1 || isPremiumCountyWithinCap(stateSlug, countySlug);
  return {
    tier: 'index',
    reason: !withinPremiumCap
      ? 'premium_cap_standard'
      : quality.reason,
    seoTier: !withinPremiumCap
      ? 2
      : quality.tier,
    qualityScore: quality.score,
  };
}

/** Sync evaluator — uses seed/assignment catalog only (no Supabase approved movers). */
export function evaluateCountyIndexability(
  stateSlug: string,
  countySlug: string
): CountyIndexDecision {
  return evaluateCountyIndexabilityFromResult(
    stateSlug,
    countySlug,
    getMoversForCounty(stateSlug, countySlug)
  );
}

export function shouldIndexCounty(stateSlug: string, countySlug: string): boolean {
  return evaluateCountyIndexability(stateSlug, countySlug).tier === 'index';
}

export function shouldUseCuratedTestimonials(movers: LocalMover[]): boolean {
  return hasAttributableCountyReviews(movers);
}

/** Explicit count still used by audits */
export { countExplicitCountyMovers };
