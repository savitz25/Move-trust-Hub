import { generatedCounties } from '@/data/generated/index';
import { applyOhioCountyOverrides } from '@/lib/local-movers/geography/ohio-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const ohioCounties = generatedCounties
  .filter((c) => c.stateSlug === 'ohio')
  .map(applyOhioCountyOverrides);
const countyNameBySlug = new Map(ohioCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated OH county pages — expands as counties are researched */
const OH_COUNTY_NEIGHBORS: Record<string, string[]> = {
  franklin: ['delaware', 'licking', 'fairfield', 'pickaway', 'madison', 'union'],
};

export function getOhioNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = OH_COUNTY_NEIGHBORS[countySlug];
  if (!neighbors) return [];

  const seen = new Set<string>();
  return neighbors
    .filter((slug) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return countyNameBySlug.has(slug);
    })
    .map((slug) => ({
      slug,
      name: countyNameBySlug.get(slug)!,
      href: `/local-movers/ohio/${slug}`,
    }));
}