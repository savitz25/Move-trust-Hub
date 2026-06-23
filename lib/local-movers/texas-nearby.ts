import { generatedCounties } from '@/data/generated/index';
import { applyTexasCountyOverrides } from '@/lib/local-movers/geography/texas-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';
import { TX_COUNTY_NEIGHBORS_GENERATED } from '@/lib/local-movers/texas-nearby.generated';

export type { NearbyCountyLink };

const texasCounties = generatedCounties
  .filter((c) => c.stateSlug === 'texas')
  .map(applyTexasCountyOverrides);
const countyNameBySlug = new Map(texasCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for internal linking on curated TX county pages (254/254) */
const TX_COUNTY_NEIGHBORS = TX_COUNTY_NEIGHBORS_GENERATED;

export function getTexasNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = TX_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = texasCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    })
    .filter(
      (c) =>
        countyNameBySlug.has(c.slug) ||
        texasCounties.some((tx) => tx.slug === c.slug)
    );
}