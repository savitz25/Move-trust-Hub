import {
  getCountyResearch,
  hasCountyResearch,
  marketNotesDescribeThinMarket,
} from '@/lib/local-movers/county-research';
import { getMoversForCounty, hasExplicitCountyAssignment } from '@/lib/local-movers/index';
import { hasAttributableCountyReviews } from '@/lib/trust/verified-reviews';
import type { LocalMover } from '@/lib/local-movers/types';

export type CountyIndexTier = 'index' | 'noindex';

export type CountyIndexDecision = {
  tier: CountyIndexTier;
  reason: string;
};

const MIN_MOVERS_TO_INDEX = 5;
const MIN_MOVERS_PREMIUM_INDEX = 8;

export function evaluateCountyIndexability(
  stateSlug: string,
  countySlug: string
): CountyIndexDecision {
  const result = getMoversForCounty(stateSlug, countySlug);
  if (!result) {
    return { tier: 'noindex', reason: 'missing_county' };
  }

  const { county, movers, isRegionalFallback } = result;
  const moverCount = movers.length;
  const research = getCountyResearch(stateSlug, countySlug);
  const hasResearch = hasCountyResearch(stateSlug, countySlug);
  const hasCuratedReviews = hasAttributableCountyReviews(movers);
  const hasExplicit = hasExplicitCountyAssignment(stateSlug, countySlug);
  const thinMarket = marketNotesDescribeThinMarket(research?.marketNotes);

  if (moverCount === 0) {
    return { tier: 'noindex', reason: 'zero_movers' };
  }

  if (isRegionalFallback) {
    return { tier: 'noindex', reason: 'regional_metro_fallback' };
  }

  if (moverCount < MIN_MOVERS_TO_INDEX) {
    return { tier: 'noindex', reason: 'insufficient_verified_movers' };
  }

  if (thinMarket && moverCount < MIN_MOVERS_PREMIUM_INDEX) {
    return { tier: 'noindex', reason: 'thin_market_limited_coverage' };
  }

  if (hasExplicit && hasResearch && hasCuratedReviews && moverCount >= MIN_MOVERS_TO_INDEX) {
    return { tier: 'index', reason: 'fully_curated_county' };
  }

  if (hasResearch && moverCount >= MIN_MOVERS_PREMIUM_INDEX) {
    return { tier: 'index', reason: 'researched_substantive_listings' };
  }

  if (hasExplicit && moverCount >= MIN_MOVERS_PREMIUM_INDEX) {
    return { tier: 'index', reason: 'explicit_assignment_substantive_listings' };
  }

  if (!hasResearch && moverCount < MIN_MOVERS_PREMIUM_INDEX) {
    return { tier: 'noindex', reason: 'uncurated_template_page' };
  }

  if (moverCount >= MIN_MOVERS_TO_INDEX && hasResearch && hasCuratedReviews) {
    return { tier: 'index', reason: 'curated_minimum_listings' };
  }

  return { tier: 'noindex', reason: 'default_quality_guard' };
}

export function shouldIndexCounty(stateSlug: string, countySlug: string): boolean {
  return evaluateCountyIndexability(stateSlug, countySlug).tier === 'index';
}

export function shouldUseCuratedTestimonials(movers: LocalMover[]): boolean {
  return hasAttributableCountyReviews(movers);
}