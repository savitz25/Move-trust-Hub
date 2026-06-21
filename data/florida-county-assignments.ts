import { floridaCounties } from '@/lib/local-movers/geography/florida';
import { metroMoverPools } from '@/data/local-movers-seed';
import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated lists — Grok-researched counties + high-traffic metros */
const CURATED_FL_COUNTIES: Record<string, string[]> = {
  alachua: [
    'uf-mover-guys-storage',
    '2-college-brothers-moving-storage',
    'sunbelt-moving-delivery',
    'two-men-and-a-truck-gainesville',
    'later-gator-moving',
  ],
  baker: [
    'baymeadows-moving-storage',
    'helping-hands-express-moving',
    'pro-touch-movers',
  ],
  bay: [
    'motivated-movers-panama-city',
    'two-men-and-a-truck-panama-city',
    'affordable-movers-bay-county',
    'allied-van-lines-panama-city',
  ],
  bradford: [
    '2-college-brothers-moving-storage',
    '1st-coast-express-moving',
    'pro-touch-movers',
  ],
  brevard: [
    'a-mothers-touch-movers',
    'two-men-and-a-truck-melbourne',
    'taylor-and-sons-moving',
    'just-good-movers-brevard',
    'green-team-logistics-brevard',
  ],
  'miami-dade': [
    'miami-pro-movers',
    'coral-gables-moving-co',
    'moving-apt',
    'international-van-lines',
    'american-van-lines',
  ],
  broward: [
    'two-men-and-a-truck-fort-lauderdale',
    'gentle-giant-moving-broward',
    'all-my-sons-fort-lauderdale',
    'pure-moving-company-fort-lauderdale',
    'best-in-broward-movers',
    'ox-strong-moving-ftl',
    'our-family-moving-storage',
    'joe-bonnie-son-moving-storage',
    'suddath-fort-lauderdale',
    'alberts-relocation-services',
  ],
  calhoun: [
    'lambert-moving-systems',
    'smart-moves-calhoun',
    'motivated-movers-panama-city',
  ],
  charlotte: [
    'curry-moving-storage',
    'master-movers-llc-charlotte',
    'm-and-b-movers',
  ],
  citrus: [
    'browns-moving-services',
    'elite-moving-hauling-crystal-river',
    'a-and-l-family-movers',
  ],
  clay: [
    '2-college-brothers-moving-storage',
    '1st-coast-express-moving',
    '904-movers',
  ],
  collier: [
    'helping-hand-movers-naples',
    'ray-the-mover-naples',
    'two-men-and-a-truck-naples',
  ],
  columbia: [
    'the-move-connection-lake-city',
    '2-college-brothers-moving-storage',
  ],
  desoto: [
    'gardiner-and-sons-moving',
    'c-and-f-movers',
  ],
  dixie: [
    'pro-touch-movers',
    'a-move-ahead-movers',
    'two-men-and-a-truck-gainesville',
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
    'suddath-jacksonville',
    'two-men-and-a-truck-jacksonville',
    'helping-hands-movers-jax',
    'stewart-moving-storage',
    'movebright-moving-storage',
    'baymeadows-moving-storage',
    'gate-parkway-movers',
    'jaguar-moving-jacksonville',
    'on-time-moving-storage-jax',
    'flex-moving-storage-jax',
  ],
  lee: [
    'gulf-coast-local',
    'naples-premier-moving',
    'charlotte-harbor-moving',
    'amerisafe-van-lines',
    'collier-local-lines',
  ],
  monroe: [
    'keys-island-moving',
    'marathon-keys-moving',
    'key-largo-local',
    'miami-pro-movers',
    'international-van-lines',
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
    'two-men-and-a-truck-pensacola',
    'rowes-moving',
    'all-my-sons-pensacola',
    'stewart-moving-storage-pensacola',
    'baymeadows-moving-storage',
    'helping-hands-express-moving',
    'suddath-pensacola',
    'colonial-van-lines',
  ],
  flagler: [
    'two-men-and-a-truck-palm-coast',
    'south-bound-moving-flagler',
    'flagler-coast-movers',
    'helping-hands-express-moving',
    'moving-with-prince-flagler',
  ],
  franklin: [
    'motivated-movers-panama-city',
    'tallahassee-capital-movers',
    'panhandle-moving-group',
  ],
  gadsden: [
    'tallahassee-capital-movers',
    'panhandle-moving-group',
    '2-college-brothers-moving-storage',
  ],
  gilchrist: [
    'uf-mover-guys-storage',
    '2-college-brothers-moving-storage',
    'two-men-and-a-truck-gainesville',
  ],
  glades: [
    'okeechobee-moving',
    'hardee-local-movers',
    'highlands-moving',
  ],
  hendry: [
    'gulf-coast-local',
    'okeechobee-moving',
    'hardee-local-movers',
  ],
  hernando: [
    'hernando-moving',
    'tampa-bay-movers',
    'pasco-local-movers',
  ],
  highlands: [
    'highlands-moving',
    'lakeland-local-movers',
    'polk-county-moving',
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