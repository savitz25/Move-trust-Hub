import { scoreCountyQuality } from '@/lib/local-movers/county-quality-score';
import {
  countExplicitCountyMovers,
  getMoversForCounty,
} from '@/lib/local-movers/index';
import {
  MIN_LOCAL_OR_LICENSED_MOVERS,
  countQualifyingCountyMovers,
  listedCountyMovers,
} from '@/lib/seo/unique-local-movers';
// MIN_LOCAL_OR_LICENSED_MOVERS stays exported for older callers. Indexability
// itself requires one qualifying mover, not three.
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
 * Counties need 3+ movers based in or licensed for that county.
 * Confirmed out-of-state carriers do not count. Regional metro fallback pools do not qualify.
 */
export const MIN_EXPLICIT_MOVERS_TO_INDEX = MIN_LOCAL_OR_LICENSED_MOVERS;

/** Hard deploy stop — see scripts/lib/tier1-circuit-breaker.ts */
export const MAX_TIER1_COUNT = 400;

type CountyMoverResult = {
  county: LocalCounty;
  movers: LocalMover[];
  isRegionalFallback: boolean;
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

  const qualifyingMovers = countQualifyingCountyMovers(result.county, result.movers);
  // Index when at least one evidenced, publishable, qualifying mover remains.
  // Zero stays noindex. The old three-mover qualifying gate is not reapplied
  // after seed fills are removed. Premium and Standard content scores are unchanged.
  if (qualifyingMovers < 1) {
    return {
      tier: 'noindex',
      reason: 'no_qualifying_publishable_movers',
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

  return {
    tier: 'index',
    reason: quality.reason,
    seoTier: quality.tier,
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
