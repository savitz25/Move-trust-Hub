import { parseCountyKey } from '@/lib/destinations/county-keys';
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