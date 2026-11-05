import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { getMoversForCounty } from '@/lib/local-movers/index';
import { evaluateCountyIndexabilityFromResult } from '@/lib/local-movers/county-indexability';
import type { LocalCounty } from '@/lib/local-movers/types';

const countyCache = new Map<string, readonly LocalCounty[]>();

/** Static seed catalog for server-rendered county links. The county sitemap uses getMoversForCountyAsync. */
export function getIndexableCounties(stateSlug: string): readonly LocalCounty[] {
  const cached = countyCache.get(stateSlug);
  if (cached) return cached;
  const counties = getCountiesForState(stateSlug).filter((county) => {
    const result = getMoversForCounty(stateSlug, county.slug);
    return evaluateCountyIndexabilityFromResult(stateSlug, county.slug, result).tier === 'index';
  });
  countyCache.set(stateSlug, counties);
  return counties;
}
