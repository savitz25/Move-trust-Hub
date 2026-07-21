/**
 * Adjacent counties that should feed a destination hub's mover list.
 * Keys are market slugs (e.g. eugene-or); values are county keys (lane-or).
 *
 * Use when a hub's primary county is the core city, but nearby counties on the
 * same corridor (I-5, etc.) are close enough for local service association.
 */

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
};

/** County keys to load for a hub market (primary + adjacent, deduped). */
export function countyKeysForHubMarket(
  marketSlug: string,
  primaryCounties: string[]
): string[] {
  const adjacent = HUB_MARKET_ADJACENT_COUNTIES[marketSlug] ?? [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const key of [...primaryCounties, ...adjacent]) {
    const k = key.trim().toLowerCase();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(k);
  }
  return out;
}
