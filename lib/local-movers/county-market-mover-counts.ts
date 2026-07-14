/**
 * Estimated active movers serving each county market (density-based).
 * Used on state county grids for scanable “X Movers” badges.
 * Distinct from curated listing length on county detail pages.
 */

/** California — all 58 counties */
export const californiaMarketMoverCounts: Record<string, number> = {
  alameda: 98,
  alpine: 2,
  amador: 8,
  butte: 18,
  calaveras: 7,
  colusa: 5,
  'contra-costa': 76,
  'del-norte': 4,
  'el-dorado': 22,
  fresno: 58,
  glenn: 4,
  humboldt: 14,
  imperial: 12,
  inyo: 3,
  kern: 52,
  kings: 11,
  lake: 6,
  lassen: 3,
  'los-angeles': 312,
  madera: 14,
  marin: 42,
  mariposa: 4,
  mendocino: 9,
  merced: 16,
  modoc: 1,
  mono: 2,
  monterey: 28,
  napa: 24,
  nevada: 12,
  orange: 186,
  placer: 48,
  plumas: 3,
  riverside: 118,
  sacramento: 94,
  'san-benito': 10,
  'san-bernardino': 124,
  'san-diego': 168,
  'san-francisco': 88,
  'san-joaquin': 44,
  'san-luis-obispo': 26,
  'san-mateo': 72,
  'santa-barbara': 34,
  'santa-clara': 142,
  'santa-cruz': 32,
  shasta: 18,
  sierra: 1,
  siskiyou: 5,
  solano: 36,
  sonoma: 46,
  stanislaus: 38,
  sutter: 11,
  tehama: 6,
  trinity: 2,
  tulare: 28,
  tuolumne: 8,
  ventura: 64,
  yolo: 28,
  yuba: 10,
};

const marketCountsByState: Record<string, Record<string, number>> = {
  california: californiaMarketMoverCounts,
};

/**
 * Market-availability estimate for a county, if we have one.
 * Returns null when no market map exists (caller may fall back to curated count).
 */
export function getCountyMarketMoverCount(
  stateSlug: string,
  countySlug: string
): number | null {
  const map = marketCountsByState[stateSlug];
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
