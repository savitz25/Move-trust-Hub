import { south_carolinaCounties } from '@/data/generated/states/south-carolina';
import { applySouthCarolinaCountyOverrides } from '@/lib/local-movers/geography/south-carolina-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const scCounties = south_carolinaCounties.map(applySouthCarolinaCountyOverrides);
const countyNameBySlug = new Map(scCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for internal linking on SC county pages */
const SC_COUNTY_NEIGHBORS: Record<string, string[]> = {
  aiken: ['edgefield', 'saluda', 'lexington', 'barnwell', 'bamberg', 'orangeburg'],
  dorchester: [
    'charleston',
    'berkeley',
    'colleton',
    'orangeburg',
    'bamberg',
    'lexington',
  ],
  pickens: ['greenville', 'anderson', 'oconee', 'abbeville', 'laurens', 'greenwood'],
  florence: ['darlington', 'marlboro', 'dillon', 'marion', 'sumter', 'williamsburg'],
  lancaster: ['chester', 'york', 'union', 'kershaw', 'fairfield', 'richland'],
  sumter: ['florence', 'darlington', 'lee', 'clarendon', 'calhoun', 'richland'],
};

export function getSouthCarolinaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = SC_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = scCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}