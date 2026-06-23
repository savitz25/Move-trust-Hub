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
  'st-louis': ['st-louis-city', 'st-charles', 'jefferson', 'franklin', 'warren', 'lincoln'],
  jackson: ['clay', 'cass', 'lafayette', 'ray', 'johnson', 'platte'],
  'st-charles': ['st-louis', 'st-louis-city', 'warren', 'lincoln', 'franklin', 'jefferson'],
  greene: ['christian', 'webster', 'polk', 'dallas', 'lawrence'],
  'st-louis-city': ['st-louis', 'st-charles', 'jefferson'],
  clay: ['jackson', 'platte', 'ray', 'clinton', 'lafayette'],
  jefferson: ['st-louis', 'st-louis-city', 'franklin', 'ste-genevieve', 'st-francois', 'washington'],
  boone: ['callaway', 'audrain', 'randolph', 'moniteau', 'cooper', 'howard'],
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