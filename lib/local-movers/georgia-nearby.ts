import { generatedCounties } from '@/data/generated/index';
import { applyGeorgiaCountyOverrides } from '@/lib/local-movers/geography/georgia-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const georgiaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'georgia')
  .map(applyGeorgiaCountyOverrides);
const countyNameBySlug = new Map(georgiaCounties.map((c) => [c.slug, c.name]));

/** Metro adjacency for curated GA county pages — expands as counties are researched */
const GA_COUNTY_NEIGHBORS: Record<string, string[]> = {
  fulton: ['cobb', 'dekalb', 'forsyth', 'gwinnett', 'cherokee', 'clayton'],
  gwinnett: ['fulton', 'barrow', 'forsyth', 'hall', 'jackson', 'walton'],
  cobb: ['fulton', 'cherokee', 'paulding', 'douglas', 'fayette', 'bartow'],
  dekalb: ['fulton', 'gwinnett', 'rockdale', 'henry', 'clayton', 'walton'],
  clayton: ['fulton', 'dekalb', 'henry', 'fayette', 'rockdale', 'spalding'],
  cherokee: ['cobb', 'fulton', 'forsyth', 'pickens', 'bartow', 'paulding'],
  forsyth: ['gwinnett', 'fulton', 'cherokee', 'hall', 'dawson', 'lumpkin'],
  henry: ['clayton', 'fayette', 'rockdale', 'newton', 'butts', 'spalding'],
  fayette: ['clayton', 'fulton', 'henry', 'coweta', 'spalding', 'heard'],
  douglas: ['cobb', 'paulding', 'fulton', 'carroll', 'fayette', 'haralson'],
  rockdale: ['dekalb', 'gwinnett', 'newton', 'henry', 'walton', 'morgan'],
  paulding: ['cobb', 'douglas', 'bartow', 'polk', 'cherokee', 'haralson'],
  coweta: ['fayette', 'fulton', 'spalding', 'heard', 'meriwether', 'carroll'],
  barrow: ['gwinnett', 'walton', 'jackson', 'oconee', 'clarke', 'banks'],
  newton: ['rockdale', 'walton', 'morgan', 'jasper', 'henry', 'butts'],
  hall: ['gwinnett', 'forsyth', 'banks', 'lumpkin', 'white', 'jackson'],
  walton: ['gwinnett', 'rockdale', 'newton', 'morgan', 'oconee', 'barrow'],
  chatham: ['bryan', 'effingham', 'liberty', 'bulloch', 'screven', 'jasper'],
  richmond: ['columbia', 'mcduffie', 'jefferson', 'burke', 'glascock', 'warren'],
  muscogee: ['harris', 'talbot', 'chattahoochee', 'stewart', 'marion', 'schley'],
};

export function getGeorgiaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = GA_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = georgiaCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    })
    .filter(
      (c) =>
        countyNameBySlug.has(c.slug) ||
        georgiaCounties.some((ga) => ga.slug === c.slug)
    );
}