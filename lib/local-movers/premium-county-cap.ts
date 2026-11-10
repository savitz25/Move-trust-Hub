import { hasDeepCountyResearch } from '@/data/deep-county-research';
import { getCountyIntelligencePack } from '@/lib/local-movers/county-intelligence/registry';
import { scoreCountyQuality } from '@/lib/local-movers/county-quality-score';
import { FOUNDER_PREMIUM_TO_STANDARD } from '@/lib/local-movers/founder-premium-demotions';
import { getAllCountyParams } from '@/lib/local-movers/geography/index';
import { getMoversForCounty } from '@/lib/local-movers/index';
import { isPremiumMetroCounty } from '@/lib/local-movers/premium-metro-counties';

/** A stable global priority order, shared by page metadata and sitemap evaluation. */
const PREMIUM_CAP = 400;
let eligible: Set<string> | null = null;

export function isPremiumCountyWithinCap(stateSlug: string, countySlug: string): boolean {
  if (!eligible) {
    const candidates = getAllCountyParams().flatMap(({ stateSlug: state, countySlug: county }) => {
      const key = `${state}/${county}`;
      if (FOUNDER_PREMIUM_TO_STANDARD.has(key)) return [];
      if (!hasDeepCountyResearch(state, county) &&
          !getCountyIntelligencePack(state, county) &&
          !isPremiumMetroCounty(state, county)) return [];
      const result = getMoversForCounty(state, county);
      const score = scoreCountyQuality({
        stateSlug: state,
        countySlug: county,
        county: result?.county ?? null,
        movers: result?.movers ?? [],
        isRegionalFallback: result?.isRegionalFallback ?? false,
      }).score;
      return [{ key, score }];
    });
    candidates.sort((a, b) => b.score - a.score || a.key.localeCompare(b.key));
    eligible = new Set(candidates.slice(0, PREMIUM_CAP).map((candidate) => candidate.key));
  }
  return eligible.has(`${stateSlug}/${countySlug}`);
}
