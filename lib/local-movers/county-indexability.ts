import { hasCitedCountyResearchContent } from '@/lib/local-movers/county-research-citations';
import { hasDeepCountyResearch } from '@/data/deep-county-research';
import { isBatchTemplateCountyResearch } from '@/lib/local-movers/county-content-quality';
import { getCountyResearch, hasCountyResearch } from '@/lib/local-movers/county-research';
import { isPremiumMetroCounty } from '@/lib/local-movers/premium-metro-counties';
import {
  countExplicitCountyMovers,
  getMoversForCounty,
} from '@/lib/local-movers/index';
import { hasAttributableCountyReviews } from '@/lib/trust/verified-reviews';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export type CountyIndexTier = 'index' | 'noindex';

export type CountyIndexDecision = {
  tier: CountyIndexTier;
  reason: string;
};

/** Counties need 3+ explicitly assigned movers — regional metro pools do not qualify. */
export const MIN_EXPLICIT_MOVERS_TO_INDEX = 3;

type CountyMoverResult = {
  county: LocalCounty;
  movers: LocalMover[];
  isRegionalFallback: boolean;
};

export function evaluateCountyIndexabilityFromResult(
  stateSlug: string,
  countySlug: string,
  result: CountyMoverResult | null
): CountyIndexDecision {
  if (!result) {
    return { tier: 'noindex', reason: 'missing_county' };
  }

  const { isRegionalFallback } = result;
  const explicitCount = countExplicitCountyMovers(stateSlug, countySlug);
  const research = getCountyResearch(stateSlug, countySlug);
  const hasResearch = hasCountyResearch(stateSlug, countySlug);

  if (explicitCount === 0) {
    return { tier: 'noindex', reason: 'no_explicit_assignment' };
  }

  if (isRegionalFallback) {
    return { tier: 'noindex', reason: 'regional_metro_fallback' };
  }

  if (explicitCount < MIN_EXPLICIT_MOVERS_TO_INDEX) {
    return { tier: 'noindex', reason: 'insufficient_explicit_movers' };
  }

  if (!hasResearch) {
    return { tier: 'noindex', reason: 'missing_county_research' };
  }

  if (isBatchTemplateCountyResearch(stateSlug, countySlug)) {
    return { tier: 'noindex', reason: 'batch_template_research' };
  }

  if (!hasCitedCountyResearchContent(research)) {
    return { tier: 'noindex', reason: 'uncited_research' };
  }

  if (!hasDeepCountyResearch(stateSlug, countySlug) && !isPremiumMetroCounty(stateSlug, countySlug)) {
    return { tier: 'noindex', reason: 'outside_tier1_coverage_wave' };
  }

  return { tier: 'index', reason: 'explicit_curated_county' };
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