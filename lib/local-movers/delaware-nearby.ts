import { generatedCounties } from '@/data/generated/index';
import { applyDelawareCountyOverrides } from '@/lib/local-movers/geography/delaware-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const delawareCounties = generatedCounties
  .filter((c) => c.stateSlug === 'delaware')
  .map(applyDelawareCountyOverrides);
const countyNameBySlug = new Map(delawareCounties.map((c) => [c.slug, c.name]));

const DE_COUNTY_NEIGHBORS: Record<string, string[]> = {
  'new-castle': ['kent', 'sussex'],
  sussex: ['kent', 'new-castle'],
  kent: ['new-castle', 'sussex'],
};

export function getDelawareNearbyCounties(countySlug: string): NearbyCountyLink[] {
  const neighbors = DE_COUNTY_NEIGHBORS[countySlug];
  if (!neighbors) return [];

  return neighbors
    .filter((slug) => countyNameBySlug.has(slug))
    .map((slug) => ({
      slug,
      name: countyNameBySlug.get(slug)!,
      href: `/local-movers/delaware/${slug}`,
    }));
}