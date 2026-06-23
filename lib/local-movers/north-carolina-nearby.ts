import { north_carolinaCounties } from '@/data/generated/states/north-carolina';
import { applyNorthCarolinaCountyOverrides } from '@/lib/local-movers/geography/north-carolina-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const ncCounties = north_carolinaCounties.map(applyNorthCarolinaCountyOverrides);
const countyNameBySlug = new Map(ncCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for internal linking on NC county pages */
const NC_COUNTY_NEIGHBORS: Record<string, string[]> = {
  wake: ['durham', 'johnston', 'franklin', 'chatham', 'harnett', 'nash'],
  mecklenburg: ['union', 'gaston', 'cabarrus', 'iredell', 'lincoln', 'rowan'],
  guilford: ['forsyth', 'alamance', 'randolph', 'rockingham', 'davidson'],
  forsyth: ['guilford', 'davidson', 'davie', 'yadkin', 'surry', 'stokes'],
  durham: ['wake', 'orange', 'granville', 'person', 'chatham', 'alamance'],
  cumberland: ['hoke', 'harnett', 'sampson', 'bladen', 'robeson', 'moore'],
  buncombe: ['henderson', 'madison', 'yancey', 'mcdowell', 'rutherford', 'haywood'],
};

export function getNorthCarolinaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = NC_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = ncCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}