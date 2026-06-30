import type { StateNavGroup } from '@/lib/nav/destinations-menu-data';

/**
 * Relative nav weights for destination clusters.
 * Proxy for traffic / quote volume until live analytics feed is wired.
 * Higher score = surfaced earlier in Popular States.
 */
export const STATE_NAV_WEIGHTS: Record<string, number> = {
  florida: 100,
  texas: 96,
  'south-carolina': 92,
  california: 88,
  arizona: 84,
  'north-carolina': 80,
  georgia: 76,
  tennessee: 72,
  'new-york': 68,
  alabama: 52,
  idaho: 48,
  oregon: 46,
  oklahoma: 44,
  arkansas: 42,
};

export const FEATURED_STATES_LIMIT = 10;

export function computeStateNavScore(group: StateNavGroup): number {
  const weight = STATE_NAV_WEIGHTS[group.cluster.slug] ?? 20;
  const priorityBonus = Math.max(0, 4 - (group.cluster.priority ?? 3)) * 8;
  const cityBonus = Math.min(group.cityCount, 24) * 1.5;
  return weight + priorityBonus + cityBonus;
}

/** Return top N states sorted by composite intent score. */
export function rankFeaturedStates(
  groups: StateNavGroup[],
  limit = FEATURED_STATES_LIMIT
): StateNavGroup[] {
  return [...groups]
    .sort((a, b) => computeStateNavScore(b) - computeStateNavScore(a))
    .slice(0, limit);
}