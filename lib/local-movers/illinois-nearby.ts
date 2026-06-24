import { generatedCounties } from '@/data/generated/index';
import { applyIllinoisCountyOverrides } from '@/lib/local-movers/geography/illinois-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const illinoisCounties = generatedCounties
  .filter((c) => c.stateSlug === 'illinois')
  .map(applyIllinoisCountyOverrides);
const countyNameBySlug = new Map(illinoisCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated IL county pages — expands as counties are researched */
const IL_COUNTY_NEIGHBORS: Record<string, string[]> = {
  cook: ['dupage', 'lake', 'will', 'kane'],
  dupage: ['cook', 'kane', 'will', 'kendall'],
  lake: ['cook', 'mchenry'],
  will: ['cook', 'dupage', 'kendall', 'grundy', 'kankakee'],
  kane: ['cook', 'dupage', 'mchenry', 'dekalb', 'kendall'],
};

export function getIllinoisNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = IL_COUNTY_NEIGHBORS[countySlug];
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
      href: `/local-movers/illinois/${slug}`,
    }));
}