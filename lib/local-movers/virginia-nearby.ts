import { generatedCounties } from '@/data/generated/index';
import { applyVirginiaCountyOverrides } from '@/lib/local-movers/geography/virginia-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const virginiaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'virginia')
  .map(applyVirginiaCountyOverrides);
const countyNameBySlug = new Map(virginiaCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated VA county pages — expands as counties are researched */
const VA_COUNTY_NEIGHBORS: Record<string, string[]> = {
  fairfax: [
    'loudoun',
    'prince-william',
    'arlington',
    'alexandria',
    'falls-church',
    'fairfax-city',
    'fauquier',
  ],
};

export function getVirginiaNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = VA_COUNTY_NEIGHBORS[countySlug];
  if (!neighbors) return [];

  return neighbors
    .filter((slug) => countyNameBySlug.has(slug))
    .map((slug) => ({
      slug,
      name: countyNameBySlug.get(slug)!,
      href: `/local-movers/virginia/${slug}`,
    }));
}