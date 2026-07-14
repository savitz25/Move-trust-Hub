/**
 * County mover badge counts for state directory grids.
 *
 * California & Texas keep explicit hand-synced maps (also mirrored in
 * usa-listed-counts.generated.ts). All other states use the generated USA map.
 *
 * Live state pages prefer getMoversForCounty().length so badges always match
 * county pages even if maps lag.
 *
 * Regenerators:
 *   npx tsx scripts/rebuild-california-county-movers.ts
 *   npx tsx scripts/sync-california-badge-counts.ts
 *   npx tsx scripts/rebuild-texas-county-movers.ts
 *   npx tsx scripts/sync-texas-badge-counts.ts
 *   npx tsx scripts/rebuild-all-states-county-movers.ts
 */

import { californiaMarketMoverCounts } from '@/lib/local-movers/market-mover-counts/california-counts';
import { texasMarketMoverCounts } from '@/lib/local-movers/market-mover-counts/texas-counts';
import { usaListedMoverCounts } from '@/lib/local-movers/market-mover-counts/usa-listed-counts.generated';

export { californiaMarketMoverCounts, texasMarketMoverCounts };

/**
 * Listed count for a county, if we have a map entry.
 * Returns null when no map exists (caller falls back to live listing count).
 */
export function getCountyMarketMoverCount(
  stateSlug: string,
  countySlug: string
): number | null {
  // Prefer explicit CA/TX modules, then full USA generated map
  if (stateSlug === 'california') {
    const n = californiaMarketMoverCounts[countySlug];
    return typeof n === 'number' ? n : null;
  }
  if (stateSlug === 'texas') {
    const n = texasMarketMoverCounts[countySlug];
    return typeof n === 'number' ? n : null;
  }
  const map = usaListedMoverCounts[stateSlug];
  if (!map) return null;
  const n = map[countySlug];
  return typeof n === 'number' ? n : null;
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
