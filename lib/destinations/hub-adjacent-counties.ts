/**
 * Adjacent counties that should feed a destination hub's mover list.
 * Keys are market slugs (e.g. eugene-or); values are county keys (lane-or).
 *
 * Manual corridors stay explicit; proximity (~150 miles) is layered on top
 * so local movers appear on regional hubs without over-spamming distant markets.
 */

import { markets } from '@/lib/destinations/markets';
import { getProximityCountiesForHub } from '@/lib/destinations/hub-proximity';

export const HUB_MARKET_ADJACENT_COUNTIES: Record<string, string[]> = {
  // Eugene hub (Lane) — Douglas County is ~70 miles south on I-5 (Roseburg/Winston)
  'eugene-or': ['douglas-or'],
  // Salem — Linn/Albany corridor is a short I-5 hop
  'salem-or': ['linn-or'],
  // Corvallis — Linn is twin valley county
  'corvallis-or': ['linn-or'],
  // Bend — Jefferson (Madras) is the north Cascades approach
  'bend-or': ['jefferson-or'],
  // Portland metro already includes Multnomah/Washington/Clackamas
  'portland-or': ['yamhill-or', 'clark-wa'],
  // Hillsboro/Beaverton — Multnomah adjacency for westside
  'hillsboro-beaverton-or': ['multnomah-or'],
  // SoCal: Inland Empire ↔ Orange / LA / San Diego corridors (~30–100 mi)
  'riverside-san-bernardino-ca': ['orange-ca', 'los-angeles-ca', 'san-diego-ca'],
  'san-diego-ca': ['orange-ca', 'riverside-ca'],
  'palmdale-lancaster-ca': ['orange-ca', 'ventura-ca'],
  'ventura-oxnard-ca': ['los-angeles-ca', 'orange-ca'],
};

/** County keys to load for a hub market (primary + manual adjacent + proximity). */
export function countyKeysForHubMarket(
  marketSlug: string,
  primaryCounties: string[]
): string[] {
  const manual = HUB_MARKET_ADJACENT_COUNTIES[marketSlug] ?? [];
  const market = markets.find((m) => m.slug === marketSlug);
  const proximity = market && !market.isClusterParent ? getProximityCountiesForHub(market) : [];

  const seen = new Set<string>();
  const out: string[] = [];
  for (const key of [...primaryCounties, ...manual, ...proximity]) {
    const k = key.trim().toLowerCase();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(k);
  }
  return out;
}
