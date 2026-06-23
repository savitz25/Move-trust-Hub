import { generatedCounties } from '@/data/generated/index';
import { applyLouisianaCountyOverrides } from '@/lib/local-movers/geography/louisiana-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const louisianaParishes = generatedCounties
  .filter((c) => c.stateSlug === 'louisiana')
  .map(applyLouisianaCountyOverrides);
const parishNameBySlug = new Map(louisianaParishes.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated LA parish pages — expands as parishes are researched */
const LA_PARISH_NEIGHBORS: Record<string, string[]> = {
  'east-baton-rouge': [
    'west-baton-rouge',
    'livingston',
    'ascension',
    'iberville',
    'east-feliciana',
    'west-feliciana',
  ],
};

export function getLouisianaNearbyCounties(
  parishSlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = LA_PARISH_NEIGHBORS[parishSlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const parish = louisianaParishes.find((c) => c.slug === slug);
      return parish
        ? { slug: parish.slug, name: parish.name, seat: parish.seat }
        : { slug, name: parishNameBySlug.get(slug) ?? slug };
    });
}