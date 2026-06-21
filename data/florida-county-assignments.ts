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
    'two-men-and-a-truck-miami-dade',
    'all-my-sons-miami-dade',
    'gentle-giant-miami-dade',
    'miami-pro-movers',
    'coral-gables-moving-co',
    'pure-moving-company-fort-lauderdale',
    'suddath-miami-dade',
    'international-van-lines',
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
    'two-men-and-a-truck-palm-beach',
    'gentle-giant-palm-beach',
    'all-my-sons-palm-beach',
    'suddath-palm-beach',
    'helping-hand-movers-palm-beach',
    'ray-the-mover-palm-beach',
    'best-in-palm-beach-movers',
    'palm-beach-local-lines',
    'amerisafe-van-lines',
    'colonial-van-lines',
  ],
  orange: [
    'two-men-and-a-truck-orange',
    'suddath-orange',
    'college-hunks-orange',
    'orlando-city-movers',
    'kissimmee-relocation',
    'winter-park-moving',
    'all-my-sons-orlando',
    'gentle-giant-orange',
  ],
  hillsborough: [
    'two-men-and-a-truck-hillsborough',
    'suddath-tampa',
    'college-hunks-hillsborough',
    'stewart-moving-storage-tampa',
    'movebright-moving-storage-tampa',
    'all-my-sons-tampa',
    'gentle-giant-moving-tampa',
    'brandon-express-moving',
  ],
  holmes: [
    'motivated-movers-panama-city',
    'two-men-and-a-truck-panama-city',
    'panhandle-moving-group',
  ],
  'indian-river': [
    'two-men-and-a-truck-indian-river',
    'indian-river-moving',
    'treasure-coast-moving',
    'two-men-and-a-truck-melbourne',
  ],
  pinellas: [
    'two-men-and-a-truck-pinellas',
    'suddath-pinellas',
    'college-hunks-pinellas',
    'clearwater-bay-movers',
    'st-pete-local-lines',
    'all-my-sons-pinellas',
    'gentle-giant-moving-tampa',
    'movebright-moving-storage-tampa',
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
    'two-men-and-a-truck-lee',
    'helping-hand-movers-naples',
    'ray-the-mover-naples',
    'gulf-coast-local',
    'all-my-sons-fort-myers',
    'college-hunks-lee',
    'charlotte-harbor-moving',
    'naples-premier-moving',
  ],
  monroe: [
    'keys-island-moving',
    'marathon-keys-moving',
    'key-largo-local',
    'miami-pro-movers',
  ],
  nassau: [
    'nassau-county-movers',
    'two-men-and-a-truck-jacksonville',
    'helping-hands-movers-jax',
    'baymeadows-moving-storage',
  ],
  polk: [
    'polk-county-moving',
    'lakeland-local-movers',
    'central-fl-moving',
    'two-men-and-a-truck-orange',
    'orlando-city-movers',
  ],
  sarasota: [
    'two-men-and-a-truck-sarasota',
    'suddath-sarasota',
    'ray-the-mover-sarasota',
    'sarasota-coast-moving',
    'all-my-sons-sarasota',
    'gentle-giant-moving-tampa',
    'manatee-local-movers',
    'gulf-coast-local',
  ],
  seminole: [
    'seminole-local-movers',
    'two-men-and-a-truck-orange',
    'orlando-city-movers',
    'winter-park-moving',
    'all-my-sons-orlando',
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
  jackson: [
    'motivated-movers-panama-city',
    'two-men-and-a-truck-panama-city',
    'panhandle-moving-group',
  ],
  jefferson: [
    'tallahassee-capital-movers',
    'panhandle-moving-group',
    'gainesville-local-movers',
  ],
  lafayette: [
    'suwannee-county-movers',
    'gainesville-local-movers',
    '2-college-brothers-moving-storage',
  ],
  lake: [
    'lake-county-movers',
    'orlando-city-movers',
    'kissimmee-relocation',
    'central-fl-moving',
    'winter-park-moving',
  ],
  leon: [
    '2-college-brothers-moving-storage',
    'tallahassee-capital-movers',
    'panhandle-moving-group',
    'two-men-and-a-truck-gainesville',
    'gainesville-local-movers',
  ],
  levy: [
    'levy-local-moving',
    'gainesville-local-movers',
    'central-fl-moving',
  ],
  liberty: [
    'motivated-movers-panama-city',
    'panhandle-moving-group',
    'tallahassee-capital-movers',
  ],
  madison: [
    'suwannee-county-movers',
    'tallahassee-capital-movers',
    'panhandle-moving-group',
  ],
  manatee: [
    'manatee-local-movers',
    'sarasota-coast-moving',
    'st-pete-local-lines',
    'tampa-bay-movers',
  ],
  marion: [
    'later-gator-moving',
    'central-fl-moving',
    'gainesville-local-movers',
    'two-men-and-a-truck-gainesville',
  ],
  martin: [
    'treasure-coast-moving',
    'indian-river-moving',
    'two-men-and-a-truck-indian-river',
    'two-men-and-a-truck-melbourne',
  ],
  okaloosa: [
    'two-men-and-a-truck-okaloosa',
    'emerald-coast-moving',
    'okaloosa-local-lines',
    'motivated-movers-panama-city',
  ],
  okeechobee: [
    'okeechobee-moving',
    'highlands-moving',
    'treasure-coast-moving',
  ],
  osceola: [
    'kissimmee-relocation',
    'two-men-and-a-truck-orange',
    'orlando-city-movers',
    'all-my-sons-orlando',
    'college-hunks-orange',
  ],
  pasco: [
    'pasco-local-movers',
    'tampa-bay-movers',
    'two-men-and-a-truck-hillsborough',
    'clearwater-bay-movers',
  ],
  putnam: [
    'putnam-county-movers',
    'two-men-and-a-truck-jacksonville',
    'gainesville-local-movers',
  ],
  'santa-rosa': [
    'two-men-and-a-truck-pensacola',
    'pensacola-bay-movers',
    'emerald-coast-moving',
    'panhandle-moving-group',
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