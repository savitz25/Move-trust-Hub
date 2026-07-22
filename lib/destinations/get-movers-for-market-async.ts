import 'server-only';

import {
  companyToStateCarrierEntry,
  isCaEnrichedHub,
  selectEnrichedCaHubMovers,
  CA_HUB_MOVER_CARD_LIMIT,
} from '@/lib/destinations/ca-hub-mover-enrichment';
import { parseCountyKey } from '@/lib/destinations/county-keys';
import type { MarketMoverEntry } from '@/lib/destinations/get-movers-for-market';
import { buildMarketMoverEntries } from '@/lib/destinations/get-movers-for-market';
import { countyKeysForHubMarket } from '@/lib/destinations/hub-adjacent-counties';
import type { Market } from '@/lib/destinations/types';
import { getCompanyBySlugAsync } from '@/lib/data-server';
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

/**
 * California destination hubs: up to 9 cards prioritizing core-county locals,
 * nearby-county locals, then a few strong state-level carriers.
 */
export async function getEnrichedMoversForCaHub(
  market: Market,
  featuredInterstateSlugs: string[] = []
): Promise<{
  movers: MarketMoverEntry[];
  totalAvailable: number;
}> {
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

  // Pull a generous pool so local prioritization can rank across primary + nearby.
  const countyEntries = buildMarketMoverEntries(market, 80, countyResults);

  const stateCompanies = (
    await Promise.all(
      featuredInterstateSlugs.map((slug) => getCompanyBySlugAsync(slug))
    )
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  const stateCarrierEntries = stateCompanies.map((company) =>
    companyToStateCarrierEntry(company, market)
  );

  const movers = selectEnrichedCaHubMovers({
    market,
    countyEntries,
    stateCarrierEntries,
    limit: CA_HUB_MOVER_CARD_LIMIT,
  });

  return {
    movers,
    totalAvailable: Math.max(countyEntries.length + stateCarrierEntries.length, movers.length),
  };
}

export async function countMoversForMarketAsync(market: Market): Promise<number> {
  if (isCaEnrichedHub(market.slug)) {
    const { totalAvailable } = await getEnrichedMoversForCaHub(market);
    return totalAvailable;
  }
  const movers = await getMoversForMarketAsync(market, 100);
  return movers.length;
}