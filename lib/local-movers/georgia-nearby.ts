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