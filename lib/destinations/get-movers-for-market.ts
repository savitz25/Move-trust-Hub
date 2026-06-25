import { parseCountyKey } from '@/lib/destinations/county-keys';
import type { Market } from '@/lib/destinations/types';
import { getMoversForCounty } from '@/lib/local-movers';
import type { LocalMover } from '@/lib/local-movers/types';

export type MarketMoverEntry = {
  mover: LocalMover;
  countyLabel: string;
  stateCode: string;
  stateSlug: string;
  countySlug: string;
};

export function getMoversForMarket(market: Market, limit = 18): MarketMoverEntry[] {
  const seen = new Set<string>();
  const entries: MarketMoverEntry[] = [];

  for (const countyKey of market.primaryCounties) {
    const parsed = parseCountyKey(countyKey);
    if (!parsed) continue;

    const result = getMoversForCounty(parsed.stateSlug, parsed.countySlug);
    if (!result) continue;

    const stateCode = countyKey.slice(countyKey.lastIndexOf('-') + 1).toUpperCase();
    const countyLabel = result.county.name.includes('County')
      ? result.county.name
      : `${result.county.name} County`;

    for (const mover of result.movers) {
      if (seen.has(mover.id)) continue;
      seen.add(mover.id);
      entries.push({
        mover,
        countyLabel,
        stateCode,
        stateSlug: parsed.stateSlug,
        countySlug: parsed.countySlug,
      });
      if (entries.length >= limit) return entries;
    }
  }

  return entries;
}

export function countMoversForMarket(market: Market): number {
  return getMoversForMarket(market, 100).length;
}