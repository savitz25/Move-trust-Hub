import type { CountyIndexDecision } from '@/lib/local-movers/county-indexability';
import {
  assessCountyQuality,
  type CountySeoTier,
} from '@/lib/local-movers/county-quality-tiers';
import { hasDeepCountyResearch } from '@/data/deep-county-research';

/**
 * Product guide tiers for state-hub badges and UI.
 * Maps Phase 3 SEO tiers: Premium / Standard / Development.
 */
export type CountyGuideTier = 'tier1' | 'tier2' | 'tier3';

export type CountyGuideTierMeta = {
  tier: CountyGuideTier;
  seoTier: CountySeoTier;
  label: string;
  badge: string;
  score: number;
};

export function classifyCountyGuideTier(
  indexDecision: CountyIndexDecision
): CountyGuideTier {
  const seo = indexDecision.seoTier;
  if (seo === 1) return 'tier1';
  if (seo === 2) return 'tier2';
  if (indexDecision.tier === 'index') return 'tier2';
  return 'tier3';
}

export function getCountyGuideTierMeta(
  indexDecision: CountyIndexDecision,
  stateSlug: string,
  countySlug: string
): CountyGuideTierMeta {
  const quality = assessCountyQuality(stateSlug, countySlug);
  const seoTier = quality.tier;
  const deep = hasDeepCountyResearch(stateSlug, countySlug);

  if (seoTier === 1) {
    return {
      tier: 'tier1',
      seoTier,
      label: deep ? 'Premium deep county guide' : 'Premium county guide',
      badge: deep ? 'Deep guide' : 'Premium',
      score: quality.score,
    };
  }
  if (seoTier === 2) {
    return {
      tier: 'tier2',
      seoTier,
      label: 'Standard county guide',
      badge: 'Standard',
      score: quality.score,
    };
  }
  return {
    tier: 'tier3',
    seoTier: 3,
    label: 'Development — limited coverage',
    badge: 'Limited',
    score: quality.score,
  };
}
