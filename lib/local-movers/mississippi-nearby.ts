import { generatedCounties } from '@/data/generated/index';
import { applyMississippiCountyOverrides } from '@/lib/local-movers/geography/mississippi-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const mississippiCounties = generatedCounties
  .filter((c) => c.stateSlug === 'mississippi')
  .map(applyMississippiCountyOverrides);
const countyNameBySlug = new Map(mississippiCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated MS county pages — expands as counties are researched */
const MS_COUNTY_NEIGHBORS: Record<string, string[]> = {
  harrison: ['hancock', 'stone', 'jackson', 'pearl-river', 'greene', 'george'],
  hinds: ['madison', 'rankin', 'copiah', 'claiborne', 'yazoo', 'warren'],
  desoto: ['marshall', 'tate', 'tunica', 'benton', 'panola', 'quitman'],
  rankin: ['hinds', 'madison', 'scott', 'smith', 'simpson', 'copiah'],
  jackson: ['harrison', 'stone', 'george', 'greene', 'perry', 'wayne'],
};

export function getMississippiNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = MS_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = mississippiCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}