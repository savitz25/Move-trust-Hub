import { generatedCounties } from '@/data/generated/index';
import { applyOklahomaCountyOverrides } from '@/lib/local-movers/geography/oklahoma-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const oklahomaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'oklahoma')
  .map(applyOklahomaCountyOverrides);
const countyNameBySlug = new Map(oklahomaCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated OK county pages — expands as counties are researched */
const OK_COUNTY_NEIGHBORS: Record<string, string[]> = {
  oklahoma: ['canadian', 'cleveland', 'pottawatomie', 'mcclain', 'grady', 'logan'],
};

export function getOklahomaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = OK_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = oklahomaCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}