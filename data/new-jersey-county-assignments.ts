import { newJerseyCounties } from '@/lib/local-movers/geography/new-jersey';
import { metroMoverPools } from '@/data/local-movers-seed';
import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated lists — Grok-researched counties + high-traffic metros */
const CURATED_NJ_COUNTIES: Record<string, string[]> = {
  atlantic: [
    'zip-to-zip-moving-atlantic',
    'seacure-moving-atlantic',
    'safekeep-movers-atlantic',
    'american-dream-movers-atlantic',
    'all-my-sons-atlantic',
    'college-hunks-atlantic',
    'rush-hour-moving-atlantic',
  ],
  bergen: [
    'booth-movers-bergen',
    'top-notch-moving-bergen',
    'movers-201-bergen',
    'unwind-moving-bergen',
    'optimum-moving-bergen',
    'cardinal-moving-bergen',
    'aceline-movers-bergen',
  ],
  burlington: [
    'piece-of-cake-moving-burlington',
    'booth-movers-bergen',
    'white-glove-moving-burlington',
    'zip-to-zip-moving-atlantic',
    'seacure-moving-atlantic',
    'all-my-sons-burlington',
    'optimum-moving-bergen',
  ],
  camden: [
    'piece-of-cake-moving-burlington',
    'booth-movers-bergen',
    'white-glove-moving-burlington',
    'zip-to-zip-moving-atlantic',
    'seacure-moving-atlantic',
    'all-my-sons-burlington',
    'optimum-moving-bergen',
  ],
  'cape-may': [
    'seacure-moving-atlantic',
    'piece-of-cake-moving-burlington',
    'booth-movers-bergen',
    'zip-to-zip-moving-atlantic',
    'all-my-sons-burlington',
    'optimum-moving-bergen',
    'white-glove-moving-burlington',
  ],
  cumberland: [
    'piece-of-cake-moving-burlington',
    'seacure-moving-atlantic',
    'booth-movers-bergen',
    'zip-to-zip-moving-atlantic',
    'all-my-sons-burlington',
    'optimum-moving-bergen',
    'white-glove-moving-burlington',
  ],
  essex: [
    'booth-movers-bergen',
    'piece-of-cake-moving-burlington',
    'white-glove-moving-burlington',
    'zip-to-zip-moving-atlantic',
    'optimum-moving-bergen',
    'all-my-sons-burlington',
    'movers-201-bergen',
  ],
  gloucester: [
    'piece-of-cake-moving-burlington',
    'seacure-moving-atlantic',
    'booth-movers-bergen',
    'zip-to-zip-moving-atlantic',
    'all-my-sons-burlington',
    'optimum-moving-bergen',
    'white-glove-moving-burlington',
  ],
  hudson: [
    'piece-of-cake-moving-burlington',
    'booth-movers-bergen',
    'white-glove-moving-burlington',
    'zip-to-zip-moving-atlantic',
    'optimum-moving-bergen',
    'all-my-sons-burlington',
    'movers-201-bergen',
  ],
  hunterdon: [
    'piece-of-cake-moving-burlington',
    'booth-movers-bergen',
    'white-glove-moving-burlington',
    'zip-to-zip-moving-atlantic',
    'optimum-moving-bergen',
    'all-my-sons-burlington',
    'movers-201-bergen',
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

/** Every New Jersey county gets 5 movers minimum once curated; metro fallback until researched */
export const newJerseyCountyMoverAssignments: CountyMoverAssignment[] =
  newJerseyCounties.map((county) => {
    const curated = CURATED_NJ_COUNTIES[county.slug];
    if (curated) {
      return {
        stateSlug: 'new-jersey',
        countySlug: county.slug,
        moverIds: curated,
      };
    }

    const count = moverCountForCounty(county.slug);
    const moverIds = pickFromMetroPool(county.metro, county.slug, count);

    return {
      stateSlug: 'new-jersey',
      countySlug: county.slug,
      moverIds,
    };
  });