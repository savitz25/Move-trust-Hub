import { parseCountyKey } from '@/lib/destinations/county-keys';
import { countyKeysForHubMarket } from '@/lib/destinations/hub-adjacent-counties';
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

export function buildMarketMoverEntries(
  market: Market,
  limit: number,
  countyResults: Array<{
    countyKey: string;
    result: { county: { name: string }; movers: LocalMover[] } | null;
  }>
): MarketMoverEntry[] {
  const seen = new Set<string>();
  const entries: MarketMoverEntry[] = [];

  for (const { countyKey, result } of countyResults) {
    if (!result) continue;
    const parsed = parseCountyKey(countyKey);
    if (!parsed) continue;

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

export function getMoversForMarket(market: Market, limit = 18): MarketMoverEntry[] {
  const countyKeys = countyKeysForHubMarket(market.slug, market.primaryCounties);
  const countyResults = countyKeys.map((countyKey) => {
    const parsed = parseCountyKey(countyKey);
    return {
      countyKey,
      result: parsed ? getMoversForCounty(parsed.stateSlug, parsed.countySlug) : null,
    };
  });

  return buildMarketMoverEntries(market, limit, countyResults);
}

export function countMoversForMarket(market: Market): number {
  return getMoversForMarket(market, 100).length;
}