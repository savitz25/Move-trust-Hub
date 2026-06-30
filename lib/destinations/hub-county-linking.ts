import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { parseCountyKey } from '@/lib/destinations/county-keys';
import type { DestinationHubLink } from '@/lib/destinations/county-destination-links';
import { getMarketPath, markets } from '@/lib/destinations/markets';
import type { Market } from '@/lib/destinations/types';

type CountyHubEntry = {
  market: Market;
  priority: number;
};

const publishedSlugs = new Set(getPublishedCityHubSlugs());

/** county map key: `{stateSlug}/{countySlug}` → best matching city hub */
const countyToCityHub = new Map<string, CountyHubEntry>();

/** state slug → published cluster parent market */
const stateClusterHub = new Map<string, Market>();

for (const market of markets) {
  if (!publishedSlugs.has(market.slug)) continue;

  if (market.isClusterParent) {
    stateClusterHub.set(market.slug, market);
    continue;
  }

  for (const countyKey of market.primaryCounties) {
    const parsed = parseCountyKey(countyKey);
    if (!parsed) continue;

    const mapKey = `${parsed.stateSlug}/${parsed.countySlug}`;
    const existing = countyToCityHub.get(mapKey);
    if (!existing || market.priority < existing.priority) {
      countyToCityHub.set(mapKey, { market, priority: market.priority });
    }
  }
}

function buildHubLink(market: Market, countyLabel?: string): DestinationHubLink {
  const label = `Moving to ${market.displayName}`;
  return {
    label,
    href: getMarketPath(market),
    description: countyLabel
      ? `Inbound guide for ${countyLabel} — costs, routes, and FMCSA-licensed movers`
      : market.inboundGrowthStat ||
        `Inbound moving guide for ${market.displayName}, ${market.stateCode}`,
  };
}

/**
 * Auto-derived county → destination hub link from `market.primaryCounties`.
 * Falls back to state cluster hub when no city hub claims the county.
 */
export function getAutoDestinationHubLinkForCounty(
  stateSlug: string,
  countySlug: string,
  countyLabel?: string
): DestinationHubLink | undefined {
  const cityEntry = countyToCityHub.get(`${stateSlug}/${countySlug}`);
  if (cityEntry) {
    return buildHubLink(cityEntry.market, countyLabel);
  }

  const cluster = stateClusterHub.get(stateSlug);
  if (cluster) {
    return {
      label: `Moving to ${cluster.displayName}`,
      href: getMarketPath(cluster),
      description: `Statewide inbound guides, routes, and movers serving ${countyLabel ?? cluster.displayName}`,
    };
  }

  return undefined;
}

export function countAutoCountyHubLinks(): number {
  return countyToCityHub.size;
}