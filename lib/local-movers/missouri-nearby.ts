import { generatedCounties } from '@/data/generated/index';
import { applyMissouriCountyOverrides } from '@/lib/local-movers/geography/missouri-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const missouriCounties = generatedCounties
  .filter((c) => c.stateSlug === 'missouri')
  .map(applyMissouriCountyOverrides);
const countyNameBySlug = new Map(missouriCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated MO county pages — expands as counties are researched */
const MO_COUNTY_NEIGHBORS: Record<string, string[]> = {
  'st-louis': ['st-charles', 'jefferson', 'franklin', 'warren', 'lincoln'],
};

export function getMissouriNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = MO_COUNTY_NEIGHBORS[countySlug];
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
      href: `/local-movers/missouri/${slug}`,
    }));
}