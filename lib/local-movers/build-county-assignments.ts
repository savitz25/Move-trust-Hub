import type { CountyMoverAssignment, LocalCounty } from '@/lib/local-movers/types';

export function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function moverCountForCounty(countySlug: string): number {
  return 3 + (hashSlug(countySlug) % 3);
}

export function pickFromMetroPool(
  pool: string[],
  countySlug: string,
  targetCount: number
): string[] {
  if (!pool.length) return [];

  const offset = hashSlug(countySlug) % pool.length;
  const picked: string[] = [];

  for (let i = 0; picked.length < targetCount && i < pool.length * 2; i++) {
    const id = pool[(offset + i) % pool.length];
    if (!picked.includes(id)) picked.push(id);
  }

  return picked;
}

export function buildCountyAssignments(params: {
  stateSlug: string;
  counties: LocalCounty[];
  metroPools: Record<string, string[]>;
  curated?: Record<string, string[]>;
}): CountyMoverAssignment[] {
  const { stateSlug, counties, metroPools, curated = {} } = params;

  return counties.map((county) => {
    const curatedIds = curated[county.slug];
    if (curatedIds?.length) {
      return { stateSlug, countySlug: county.slug, moverIds: curatedIds };
    }

    const pool = county.metro ? metroPools[county.metro] ?? [] : [];
    const count = moverCountForCounty(county.slug);

    return {
      stateSlug,
      countySlug: county.slug,
      moverIds: pickFromMetroPool(pool, county.slug, count),
    };
  });
}