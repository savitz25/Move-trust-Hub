import { floridaCounties } from '@/lib/local-movers/geography/florida';
import { metroMoverPools } from '@/data/local-movers-seed';
import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated lists for high-traffic Florida counties */
const CURATED_FL_COUNTIES: Record<string, string[]> = {
  'miami-dade': [
    'miami-pro-movers',
    'coral-gables-moving-co',
    'moving-apt',
    'international-van-lines',
    'american-van-lines',
  ],
  broward: [
    'broward-express-moving',
    'american-van-lines',
    'colonial-van-lines',
    'sunshine-state-movers',
    'miami-pro-movers',
  ],
  'palm-beach': [
    'palm-beach-local-lines',
    'amerisafe-van-lines',
    'treasure-coast-moving',
    'colonial-van-lines',
    'broward-express-moving',
  ],
  orange: [
    'orlando-city-movers',
    'kissimmee-relocation',
    'seminole-local-movers',
    'central-fl-moving',
    'winter-park-moving',
  ],
  hillsborough: [
    'tampa-bay-movers',
    'brandon-express-moving',
    'clearwater-bay-movers',
    'st-pete-local-lines',
    'amerisafe-van-lines',
  ],
  pinellas: [
    'st-pete-local-lines',
    'clearwater-bay-movers',
    'tampa-bay-movers',
    'sarasota-coast-moving',
    'pasco-local-movers',
  ],
  duval: [
    'jax-local-moving',
    'first-coast-movers',
    'clay-county-moving',
    'nassau-county-movers',
    'colonial-van-lines',
  ],
  lee: [
    'gulf-coast-local',
    'naples-premier-moving',
    'charlotte-harbor-moving',
    'amerisafe-van-lines',
    'collier-local-lines',
  ],
  brevard: [
    'brevard-local-movers',
    'space-coast-movers',
    'indian-river-moving',
    'orlando-city-movers',
    'jax-local-moving',
  ],
  monroe: [
    'keys-island-moving',
    'marathon-keys-moving',
    'key-largo-local',
    'miami-pro-movers',
    'international-van-lines',
  ],
  collier: [
    'naples-premier-moving',
    'collier-local-lines',
    'gulf-coast-local',
    'charlotte-harbor-moving',
    'amerisafe-van-lines',
  ],
  polk: [
    'polk-county-moving',
    'central-fl-moving',
    'kissimmee-relocation',
    'orlando-city-movers',
    'lakeland-local-movers',
  ],
  sarasota: [
    'sarasota-coast-moving',
    'tampa-bay-movers',
    'gulf-coast-local',
    'manatee-local-movers',
    'st-pete-local-lines',
  ],
  seminole: [
    'seminole-local-movers',
    'orlando-city-movers',
    'winter-park-moving',
    'lake-county-movers',
    'central-fl-moving',
  ],
  volusia: [
    'volusia-local-lines',
    'first-coast-movers',
    'space-coast-movers',
    'jax-local-moving',
    'flagler-coast-movers',
  ],
  escambia: [
    'pensacola-bay-movers',
    'panhandle-moving-group',
    'emerald-coast-moving',
    'amerisafe-van-lines',
    'colonial-van-lines',
  ],
  leon: [
    'tallahassee-capital-movers',
    'panhandle-moving-group',
    'gainesville-local-movers',
    'amerisafe-van-lines',
    'emerald-coast-moving',
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
  // Deterministic 3, 4, or 5 movers per county
  return 3 + (hashSlug(countySlug) % 3);
}

/** Every Florida county gets 3–5 movers; curated where defined, rotated pool otherwise */
export const floridaCountyMoverAssignments: CountyMoverAssignment[] =
  floridaCounties.map((county) => {
    const curated = CURATED_FL_COUNTIES[county.slug];
    if (curated) {
      return {
        stateSlug: 'florida',
        countySlug: county.slug,
        moverIds: curated,
      };
    }

    const count = moverCountForCounty(county.slug);
    const moverIds = pickFromMetroPool(county.metro, county.slug, count);

    return {
      stateSlug: 'florida',
      countySlug: county.slug,
      moverIds,
    };
  });