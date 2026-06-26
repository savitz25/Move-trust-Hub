import { parseCountyKey, countyKeyToLabel } from '@/lib/destinations/county-keys';
import { getCountyPath } from '@/lib/local-movers';
import type { Market } from '@/lib/destinations/types';

/** Primary county local-movers directory for a destination market, or in-page movers anchor */
export function getMarketMoversDirectoryHref(
  market: Market,
  canonicalPath: string
): string {
  const firstKey = market.primaryCounties[0];
  if (!firstKey) return `${canonicalPath}#movers`;

  const parsed = parseCountyKey(firstKey);
  if (!parsed) return `${canonicalPath}#movers`;

  return getCountyPath(parsed.stateSlug, parsed.countySlug);
}

export function getMarketCountyDirectoryLinks(
  market: Market
): { href: string; label: string }[] {
  return market.primaryCounties
    .map((key) => {
      const parsed = parseCountyKey(key);
      if (!parsed) return null;
      return {
        href: getCountyPath(parsed.stateSlug, parsed.countySlug),
        label: countyKeyToLabel(key),
      };
    })
    .filter((entry): entry is { href: string; label: string } => Boolean(entry));
}

export function buildCalculatorHrefForMarket(market: Market): string {
  return `/moving-calculator?toZip=${market.defaultToZip}&dest=${market.slug}`;
}