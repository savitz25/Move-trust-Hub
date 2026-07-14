import type { CountyIndexDecision } from '@/lib/local-movers/county-indexability';
import { isBatchTemplateCountyResearch } from '@/lib/local-movers/county-content-quality';
import { getCountyResearch } from '@/lib/local-movers/county-research';

/** Tier 1 = indexable county guides. Tier 2 = noindex limited coverage. */
export type CountyGuideTier = 'tier1' | 'tier2';

export type CountyGuideTierMeta = {
  tier: CountyGuideTier;
  label: string;
  /** Short badge for state hub grids */
  badge: string;
};

export function classifyCountyGuideTier(
  indexDecision: CountyIndexDecision
): CountyGuideTier {
  return indexDecision.tier === 'index' ? 'tier1' : 'tier2';
}

export function getCountyGuideTierMeta(
  indexDecision: CountyIndexDecision,
  stateSlug: string,
  countySlug: string
): CountyGuideTierMeta {
  const tier = classifyCountyGuideTier(indexDecision);
  if (tier === 'tier1') {
    const enriched = Boolean(
      getCountyResearch(stateSlug, countySlug) &&
        !isBatchTemplateCountyResearch(stateSlug, countySlug)
    );
    return {
      tier,
      label: 'Full county guide',
      badge: enriched ? 'Enriched' : 'Full guide',
    };
  }
  return {
    tier,
    label: 'Limited coverage — movers and editorial content still expanding',
    badge: 'Limited',
  };
}