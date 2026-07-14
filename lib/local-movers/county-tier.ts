import { hasDeepCountyResearch } from '@/data/deep-county-research';
import { classifyCountyContentTier } from '@/lib/local-movers/county-content-quality';
import type { CountyIndexDecision } from '@/lib/local-movers/county-indexability';
import { hasCountyResearch } from '@/lib/local-movers/county-research';

/** Tier 1 = indexable, enriched county guides. Tier 2 = noindex,follow limited coverage. */
export type CountyGuideTier = 'tier1' | 'tier2';

export type CountyGuideTierMeta = {
  tier: CountyGuideTier;
  label: string;
  /** Short badge for state hub grids */
  badge: string;
};

export function classifyCountyGuideTier(
  indexDecision: CountyIndexDecision,
  stateSlug: string,
  countySlug: string
): CountyGuideTier {
  if (indexDecision.tier === 'noindex') return 'tier2';
  if (hasDeepCountyResearch(stateSlug, countySlug)) return 'tier1';
  const contentTier = classifyCountyContentTier(
    stateSlug,
    countySlug,
    hasCountyResearch(stateSlug, countySlug)
  );
  if (contentTier === 'grok_heavy_original') return 'tier1';
  return 'tier1';
}

export function getCountyGuideTierMeta(
  indexDecision: CountyIndexDecision,
  stateSlug: string,
  countySlug: string
): CountyGuideTierMeta {
  const tier = classifyCountyGuideTier(indexDecision, stateSlug, countySlug);
  if (tier === 'tier1') {
    return {
      tier,
      label: 'Full county guide',
      badge: hasDeepCountyResearch(stateSlug, countySlug) ? 'Enriched' : 'Full guide',
    };
  }
  return {
    tier,
    label: 'Limited coverage — movers and editorial content still expanding',
    badge: 'Limited',
  };
}