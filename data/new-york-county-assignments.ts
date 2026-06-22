import { newYorkCounties } from '@/lib/local-movers/geography/new-york';
import { metroMoverPools } from '@/data/local-movers-seed';
import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated lists — Grok-researched counties + high-traffic metros */
const CURATED_NY_COUNTIES: Record<string, string[]> = {
  albany: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  allegany: [
    'ck-local-movers-olean',
    'mabeys-moving-storage-albany',
    'dans-moving-storage-wny',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
};

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickFromMetroPool(
  metroId: string | undefined,
  countySlug: string,
  targetCount: number
): string[] {
  if (!metroId) return [];
  const pool = metroMoverPools[metroId]?.moverIds ?? [];
  if (!pool.length) return [];

  const offset = hashSlug(countySlug) % pool.length;
  const picked: string[] = [];

  for (let i = 0; picked.length < targetCount && i < pool.length * 2; i++) {
    const id = pool[(offset + i) % pool.length];
    if (!picked.includes(id)) picked.push(id);
  }

  return picked;
}

function moverCountForCounty(countySlug: string): number {
  return 3 + (hashSlug(countySlug) % 3);
}

/** Curated counties get hand-ranked lists; others use metro pool until researched */
export const newYorkCountyMoverAssignments: CountyMoverAssignment[] =
  newYorkCounties.map((county) => {
    const curated = CURATED_NY_COUNTIES[county.slug];
    if (curated) {
      return {
        stateSlug: 'new-york',
        countySlug: county.slug,
        moverIds: curated,
      };
    }

    const count = moverCountForCounty(county.slug);
    const moverIds = pickFromMetroPool(county.metro, county.slug, count);

    return {
      stateSlug: 'new-york',
      countySlug: county.slug,
      moverIds,
    };
  });