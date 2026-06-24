import { generatedCounties } from '@/data/generated/index';
import { applyKentuckyCountyOverrides } from '@/lib/local-movers/geography/kentucky-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const kentuckyCounties = generatedCounties
  .filter((c) => c.stateSlug === 'kentucky')
  .map(applyKentuckyCountyOverrides);
const countyNameBySlug = new Map(kentuckyCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated KY county pages — expands as counties are researched */
const KY_COUNTY_NEIGHBORS: Record<string, string[]> = {
  jefferson: ['bullitt', 'oldham', 'shelby', 'spencer', 'nelson', 'hardin'],
  fayette: ['madison', 'clark', 'bourbon', 'woodford', 'jessamine', 'scott'],
  kenton: ['campbell', 'boone', 'grant', 'pendleton', 'bracken', 'gallatin'],
  warren: ['butler', 'edmonson', 'barren', 'simpson', 'allen', 'logan'],
};

export function getKentuckyNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = KY_COUNTY_NEIGHBORS[countySlug];
  if (!neighbors) return [];

  return neighbors
    .map((slug) => {
      const name = countyNameBySlug.get(slug);
      if (!name) return null;
      return { slug, name, stateSlug: 'kentucky' as const };
    })
    .filter((link): link is NearbyCountyLink => link !== null);
}