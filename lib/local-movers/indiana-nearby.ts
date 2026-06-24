import { generatedCounties } from '@/data/generated/index';
import { applyIndianaCountyOverrides } from '@/lib/local-movers/geography/indiana-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const indianaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'indiana')
  .map(applyIndianaCountyOverrides);
const countyNameBySlug = new Map(indianaCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated IN county pages — expands as counties are researched */
const IN_COUNTY_NEIGHBORS: Record<string, string[]> = {
  marion: ['hamilton', 'hancock', 'hendricks', 'johnson', 'morgan', 'boone', 'shelby'],
  lake: ['porter', 'laporte', 'newton', 'jasper'],
  allen: ['dekalb', 'noble', 'whitley', 'wells', 'adams'],
  hamilton: ['marion', 'hancock', 'madison', 'tipton', 'boone', 'clinton'],
  'st-joseph': ['elkhart', 'marshall', 'lagrange', 'starke', 'kosciusko'],
  elkhart: ['st-joseph', 'lagrange', 'noble', 'kosciusko', 'marshall', 'laporte'],
  hendricks: ['marion', 'johnson', 'morgan', 'putnam', 'boone', 'montgomery'],
  tippecanoe: ['white', 'carroll', 'benton', 'fountain', 'warren', 'clinton'],
  vanderburgh: ['warrick', 'posey', 'gibson', 'spencer'],
  johnson: ['marion', 'morgan', 'shelby', 'bartholomew', 'brown', 'hendricks'],
  porter: ['lake', 'laporte', 'jasper', 'starke'],
  monroe: ['brown', 'lawrence', 'morgan', 'greene', 'owen', 'jackson'],
};

export function getIndianaNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = IN_COUNTY_NEIGHBORS[countySlug];
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
      href: `/local-movers/indiana/${slug}`,
    }));
}