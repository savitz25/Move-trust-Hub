/**
 * City hubs (/moving-to/<state>/<city>) index only with unique local data.
 * Default threshold: at least 3 movers based in or licensed for the city's counties.
 */

import { parseCountyKey } from '@/lib/destinations/county-keys';
import type { Market } from '@/lib/destinations/types';
import { getMoversForCounty } from '@/lib/local-movers';
import {
  MIN_LOCAL_OR_LICENSED_MOVERS,
  isBasedInOrLicensedForCounty,
} from '@/lib/seo/unique-local-movers';

export type CityIndexDecision = {
  tier: 'index' | 'noindex';
  reason: string;
  qualifyingMovers: number;
};

export function evaluateCityHubIndexability(market: Market): CityIndexDecision {
  const seen = new Set<string>();
  let qualifyingMovers = 0;
  const countyKeys = market.primaryCounties ?? [];

  for (const countyKey of countyKeys) {
    const parsed = parseCountyKey(countyKey);
    if (!parsed) continue;
    const result = getMoversForCounty(parsed.stateSlug, parsed.countySlug);
    if (!result) continue;
    for (const mover of result.movers) {
      if (seen.has(mover.id)) continue;
      if (!isBasedInOrLicensedForCounty(mover, result.county)) continue;
      seen.add(mover.id);
      qualifyingMovers += 1;
    }
  }

  if (qualifyingMovers >= MIN_LOCAL_OR_LICENSED_MOVERS) {
    return {
      tier: 'index',
      reason: 'local_or_licensed_movers',
      qualifyingMovers,
    };
  }

  return {
    tier: 'noindex',
    reason: qualifyingMovers === 0 ? 'no_unique_local_data' : 'insufficient_local_or_licensed_movers',
    qualifyingMovers,
  };
}
