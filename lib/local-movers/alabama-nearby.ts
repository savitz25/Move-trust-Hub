import { generatedCounties } from '@/data/generated/index';
import { applyAlabamaCountyOverrides } from '@/lib/local-movers/geography/alabama-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const alabamaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'alabama')
  .map(applyAlabamaCountyOverrides);
const countyNameBySlug = new Map(alabamaCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated AL county pages — expands as counties are researched */
const AL_COUNTY_NEIGHBORS: Record<string, string[]> = {
  jefferson: ['shelby', 'blount', 'walker', 'tuscaloosa', 'bibb', 'st-clair'],
};

export function getAlabamaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = AL_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = alabamaCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}