import 'server-only';

import { parseCountyKey } from '@/lib/destinations/county-keys';
import type { MarketMoverEntry } from '@/lib/destinations/get-movers-for-market';
import { buildMarketMoverEntries } from '@/lib/destinations/get-movers-for-market';
import { countyKeysForHubMarket } from '@/lib/destinations/hub-adjacent-counties';
import type { Market } from '@/lib/destinations/types';
import { getMoversForCountyAsync } from '@/lib/local-movers/get-movers-for-county-async';

export async function getMoversForMarketAsync(
  market: Market,
  limit = 18
): Promise<MarketMoverEntry[]> {
  // Primary hub counties first, then adjacent corridor counties (e.g. Douglas → Eugene).
  const countyKeys = countyKeysForHubMarket(market.slug, market.primaryCounties);

  const countyResults = await Promise.all(
    countyKeys.map(async (countyKey) => {
      const parsed = parseCountyKey(countyKey);
      return {
        countyKey,
        result: parsed
          ? await getMoversForCountyAsync(parsed.stateSlug, parsed.countySlug)
          : null,
      };
    })
  );

  return buildMarketMoverEntries(market, limit, countyResults);
}

export async function countMoversForMarketAsync(market: Market): Promise<number> {
  const movers = await getMoversForMarketAsync(market, 100);
  return movers.length;
}