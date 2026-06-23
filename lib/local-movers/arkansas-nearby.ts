import { generatedCounties } from '@/data/generated/index';
import { applyArkansasCountyOverrides } from '@/lib/local-movers/geography/arkansas-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const arkansasCounties = generatedCounties
  .filter((c) => c.stateSlug === 'arkansas')
  .map(applyArkansasCountyOverrides);
const countyNameBySlug = new Map(arkansasCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated AR county pages — expands as counties are researched */
const AR_COUNTY_NEIGHBORS: Record<string, string[]> = {
  pulaski: ['saline', 'lonoke', 'faulkner', 'jefferson', 'grant', 'perry'],
};

export function getArkansasNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = AR_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = arkansasCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}