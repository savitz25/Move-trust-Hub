/**
 * Estimated active movers serving each county market (density-based).
 * Used on state county grids for scanable “X Movers” badges.
 * Distinct from curated listing length on county detail pages.
 *
 * Full USA map: lib/local-movers/market-mover-counts/usa-market-mover-counts.generated.ts
 * Regenerate: npx tsx scripts/generate-usa-market-mover-counts.ts
 */

import { californiaMarketMoverCounts } from '@/lib/local-movers/market-mover-counts/california';
import { usaMarketMoverCounts } from '@/lib/local-movers/market-mover-counts/usa-market-mover-counts.generated';

export { californiaMarketMoverCounts };

/**
 * Market-availability estimate for a county, if we have one.
 * Returns null when no market map exists (caller may fall back to curated count).
 */
export function getCountyMarketMoverCount(
  stateSlug: string,
  countySlug: string
): number | null {
  const map = usaMarketMoverCounts[stateSlug];
  if (!map) return null;
  const n = map[countySlug];
  return typeof n === 'number' ? n : null;
}

/** True when we have a full market-count map for the state. */
export function stateHasMarketMoverCounts(stateSlug: string): boolean {
  const map = usaMarketMoverCounts[stateSlug];
  return Boolean(map && Object.keys(map).length > 0);
}

export type MoverCountBadgeTier = 'high' | 'medium' | 'low' | 'zero';

export function getMoverCountBadgeTier(count: number): MoverCountBadgeTier {
  if (count <= 0) return 'zero';
  if (count >= 50) return 'high';
  if (count >= 10) return 'medium';
  return 'low';
}

export function formatMoverCountLabel(count: number): string {
  if (count <= 0) return 'Contact Us';
  if (count === 1) return '1 Mover';
  return `${count} Movers`;
}
