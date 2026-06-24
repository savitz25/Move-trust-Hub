import { generatedCounties } from '@/data/generated/index';
import { applyMichiganCountyOverrides } from '@/lib/local-movers/geography/michigan-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const michiganCounties = generatedCounties
  .filter((c) => c.stateSlug === 'michigan')
  .map(applyMichiganCountyOverrides);
const countyNameBySlug = new Map(michiganCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated MI county pages — expands as counties are researched */
const MI_COUNTY_NEIGHBORS: Record<string, string[]> = {
  wayne: ['oakland', 'macomb', 'washtenaw', 'monroe'],
  oakland: ['wayne', 'macomb', 'lapeer', 'livingston', 'washtenaw', 'genesee'],
  macomb: ['wayne', 'oakland', 'st-clair', 'lapeer'],
};

export function getMichiganNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = MI_COUNTY_NEIGHBORS[countySlug];
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
      href: `/local-movers/michigan/${slug}`,
    }));
}