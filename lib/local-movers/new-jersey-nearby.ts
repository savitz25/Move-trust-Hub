import { newJerseyCounties } from '@/lib/local-movers/geography/new-jersey';

/** Geographic adjacency for internal linking on NJ county pages */
const NJ_COUNTY_NEIGHBORS: Record<string, string[]> = {
  atlantic: ['burlington', 'camden', 'cape-may', 'ocean', 'gloucester'],
  bergen: ['hudson', 'essex', 'passaic'],
  burlington: ['atlantic', 'camden', 'mercer', 'monmouth', 'ocean', 'gloucester'],
  camden: ['atlantic', 'burlington', 'gloucester'],
  'cape-may': ['atlantic', 'cumberland'],
  cumberland: ['cape-may', 'atlantic', 'gloucester', 'salem'],
  essex: ['bergen', 'hudson', 'union', 'morris', 'passaic'],
  gloucester: ['camden', 'atlantic', 'cumberland', 'salem', 'burlington'],
  hudson: ['bergen', 'essex', 'union'],
  hunterdon: ['somerset', 'morris', 'warren', 'mercer'],
  mercer: ['burlington', 'monmouth', 'somerset', 'hunterdon', 'middlesex'],
  middlesex: ['monmouth', 'somerset', 'union', 'mercer'],
  monmouth: ['middlesex', 'mercer', 'burlington', 'ocean'],
  morris: ['essex', 'union', 'somerset', 'hunterdon', 'warren', 'sussex', 'passaic'],
  ocean: ['monmouth', 'burlington', 'atlantic'],
  passaic: ['bergen', 'morris', 'essex', 'sussex'],
  salem: ['gloucester', 'cumberland'],
  somerset: ['morris', 'hunterdon', 'mercer', 'middlesex', 'union'],
  sussex: ['passaic', 'morris', 'warren'],
  union: ['essex', 'hudson', 'morris', 'somerset', 'middlesex'],
  warren: ['sussex', 'morris', 'hunterdon'],
};

const countyNameBySlug = new Map(newJerseyCounties.map((c) => [c.slug, c.name]));

export type NearbyCountyLink = {
  slug: string;
  name: string;
  seat?: string;
};

export function getNewJerseyNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = NJ_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = newJerseyCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    })
    .filter(
      (c) =>
        countyNameBySlug.has(c.slug) ||
        newJerseyCounties.some((nj) => nj.slug === c.slug)
    );
}