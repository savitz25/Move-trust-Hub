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
    'jax-local-moving',
    'first-coast-movers',
  ],
  bay: [
    'motivated-movers-panama-city',
    'two-men-and-a-truck-panama-city',
    'affordable-movers-bay-county',
    'allied-van-lines-panama-city',
    'pensacola-bay-movers',
  ],
  bradford: [
    '2-college-brothers-moving-storage',
    '1st-coast-express-moving',
    'pro-touch-movers',
    'jax-local-moving',
    'first-coast-movers',
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
    'suddath-miami-dade',
    'good-greek-moving-miami',
    'our-family-moving-storage',
    'dixie-movers-miami',
    'mancav-movers-miami',
    'alberts-relocation-services',
    'miami-pro-movers',
  ],
  broward: [
    'two-men-and-a-truck-fort-lauderdale',
    'gentle-giant-moving-broward',
    'all-my-sons-fort-lauderdale',
    'pure-moving-company-fort-lauderdale',
    'best-in-broward-movers',
    'our-family-moving-storage',
    'alberts-relocation-services',
    'suddath-fort-lauderdale',
    'dixie-movers-broward',
    'fuentes-moving-broward',
  ],
  calhoun: [
    'lambert-moving-systems',
    'smart-moves-calhoun',
    'motivated-movers-panama-city',
    'pensacola-bay-movers',
    'panhandle-moving-group',
  ],
  charlotte: [
    'curry-moving-storage',
    'master-movers-llc-charlotte',
    'm-and-b-movers',
    'gulf-coast-local',
    'naples-premier-moving',
  ],
  citrus: [
    'browns-moving-services',
    'elite-moving-hauling-crystal-river',
    'a-and-l-family-movers',
    'citrus-county-movers',
    'levy-local-moving',
  ],
  clay: [
    '2-college-brothers-moving-storage',
    '1st-coast-express-moving',
    '904-movers',
    'jax-local-moving',
    'first-coast-movers',
  ],
  collier: [
    'helping-hand-movers-naples',
    'ray-the-mover-naples',
    'two-men-and-a-truck-naples',
    'gulf-coast-local',
    'naples-premier-moving',
  ],
  columbia: [
    'the-move-connection-lake-city',
    '2-college-brothers-moving-storage',
    'gainesville-local-movers',
    'alachua-county-movers',
    'suwannee-county-movers',
  ],
  desoto: [
    'gardiner-and-sons-moving',
    'c-and-f-movers',
    'gulf-coast-local',
    'naples-premier-moving',
    'collier-local-lines',
  ],
  dixie: [
    'pro-touch-movers',
    'a-move-ahead-movers',
    'two-men-and-a-truck-gainesville',
    'citrus-county-movers',
    'levy-local-moving',
  ],
  'palm-beach': [
    'two-men-and-a-truck-palm-beach',
    'gentle-giant-palm-beach',
    'all-my-sons-palm-beach',
    'suddath-palm-beach',
    'helping-hand-movers-palm-beach',
    'ray-the-mover-palm-beach',
    'best-in-palm-beach-movers',
    'joe-bonnie-son-moving-storage',
    'patriot-moving-palm-beach',
    'safebound-moving-palm-beach',
  ],
  orange: [
    'two-men-and-a-truck-orange',
    'suddath-orange',
    'college-hunks-orange',
    'orlando-city-movers',
    'all-my-sons-orlando',
    'gentle-giant-orange',
    'just-move-it-orlando',
    'mothers-pride-orlando',
    'best-usa-movers-orlando',
    'wildcat-moving-orlando',
  ],
  hillsborough: [
    'two-men-and-a-truck-hillsborough',
    'suddath-tampa',
    'college-hunks-hillsborough',
    'all-my-sons-tampa',
    'gentle-giant-moving-tampa',
    'movebright-moving-storage-tampa',
    'all-about-moving-tampa-bay',
    'shawn-and-shawn-moving-hillsborough',
    'stewart-moving-storage-tampa',
    'strong-college-students-hillsborough',
  ],
  holmes: [
    'motivated-movers-panama-city',
    'two-men-and-a-truck-panama-city',
    'panhandle-moving-group',
    'pensacola-bay-movers',
    'emerald-coast-moving',
  ],
  'indian-river': [
    'two-men-and-a-truck-indian-river',
    'indian-river-moving',
    'treasure-coast-moving',
    'two-men-and-a-truck-melbourne',
    'brevard-local-movers',
  ],
  pinellas: [
    'two-men-and-a-truck-pinellas',
    'suddath-pinellas',
    'college-hunks-pinellas',
    'clearwater-bay-movers',
    'st-pete-local-lines',
    'all-my-sons-pinellas',
    'all-about-moving-pinellas',
    'swift-moves-pinellas',
    'rm-moving-pinellas',
    'shawn-shawn-pinellas',
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
    'all-my-sons-fort-myers',
    'college-hunks-lee',
    'act-of-class-moving-lee',
    'southwest-florida-movers-lee',
    'helping-hand-movers-lee',
    'jws-moving-lee',
    'gulf-coast-local',
    'charlotte-harbor-moving',
    'frank-sons-moving-lee',
  ],
  monroe: [
    'keys-island-moving',
    'marathon-keys-moving',
    'key-largo-local',
    'miami-pro-movers',
    'international-van-lines',
  ],
  nassau: [
    'nassau-county-movers',
    'two-men-and-a-truck-jacksonville',
    'helping-hands-movers-jax',
    'baymeadows-moving-storage',
    'jax-local-moving',
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
    'all-my-sons-sarasota',
    'sunshine-movers-sarasota',
    'master-movers-sarasota',
    'sarasota-coast-moving',
    'bms-moving-sarasota',
    'two-brothers-and-a-truck-sarasota',
    'end-up-logistics-sarasota',
  ],
  seminole: [
    'seminole-local-movers',
    'two-men-and-a-truck-orange',
    'orlando-city-movers',
    'winter-park-moving',
    'all-my-sons-orlando',
  ],
  volusia: [
    'two-men-and-a-truck-volusia',
    'volusia-local-lines',
    'space-coast-movers',
    'two-men-and-a-truck-melbourne',
    'two-men-and-a-truck-palm-coast',
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
    'pensacola-bay-movers',
    'emerald-coast-moving',
  ],
  gadsden: [
    'tallahassee-capital-movers',
    'panhandle-moving-group',
    '2-college-brothers-moving-storage',
    'pensacola-bay-movers',
    'emerald-coast-moving',
  ],
  hamilton: [
    'suwannee-county-movers',
    'the-move-connection-lake-city',
    '2-college-brothers-moving-storage',
    'gainesville-local-movers',
    'alachua-county-movers',
  ],
  hardee: [
    'hardee-local-movers',
    'lakeland-local-movers',
    'polk-county-moving',
    'highlands-moving',
    'gardiner-and-sons-moving',
  ],
  gilchrist: [
    'uf-mover-guys-storage',
    '2-college-brothers-moving-storage',
    'two-men-and-a-truck-gainesville',
    'gainesville-local-movers',
    'alachua-county-movers',
  ],
  gulf: [
    'motivated-movers-panama-city',
    'two-men-and-a-truck-panama-city',
    'panhandle-moving-group',
    'emerald-coast-moving',
    'pensacola-bay-movers',
  ],
  glades: [
    'okeechobee-moving',
    'hardee-local-movers',
    'highlands-moving',
    'gulf-coast-local',
    'naples-premier-moving',
  ],
  hendry: [
    'gulf-coast-local',
    'okeechobee-moving',
    'hardee-local-movers',
    'naples-premier-moving',
    'collier-local-lines',
  ],
  hernando: [
    'hernando-moving',
    'tampa-bay-movers',
    'pasco-local-movers',
    'st-pete-local-lines',
    'clearwater-bay-movers',
  ],
  highlands: [
    'highlands-moving',
    'lakeland-local-movers',
    'polk-county-moving',
    'orlando-city-movers',
    'seminole-local-movers',
  ],
  jackson: [
    'motivated-movers-panama-city',
    'two-men-and-a-truck-panama-city',
    'panhandle-moving-group',
    'pensacola-bay-movers',
    'emerald-coast-moving',
  ],
  jefferson: [
    'tallahassee-capital-movers',
    'panhandle-moving-group',
    'gainesville-local-movers',
    'pensacola-bay-movers',
    'emerald-coast-moving',
  ],
  lafayette: [
    'suwannee-county-movers',
    'gainesville-local-movers',
    '2-college-brothers-moving-storage',
    'alachua-county-movers',
    'central-fl-moving',
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
    'citrus-county-movers',
    'tampa-bay-movers',
  ],
  liberty: [
    'motivated-movers-panama-city',
    'panhandle-moving-group',
    'tallahassee-capital-movers',
    'pensacola-bay-movers',
    'emerald-coast-moving',
  ],
  madison: [
    'suwannee-county-movers',
    'tallahassee-capital-movers',
    'panhandle-moving-group',
    'gainesville-local-movers',
    'alachua-county-movers',
  ],
  manatee: [
    'manatee-local-movers',
    'sarasota-coast-moving',
    'st-pete-local-lines',
    'tampa-bay-movers',
    'clearwater-bay-movers',
  ],
  marion: [
    'later-gator-moving',
    'central-fl-moving',
    'gainesville-local-movers',
    'two-men-and-a-truck-gainesville',
    'orlando-city-movers',
  ],
  martin: [
    'treasure-coast-moving',
    'indian-river-moving',
    'two-men-and-a-truck-indian-river',
    'two-men-and-a-truck-melbourne',
    'miami-pro-movers',
  ],
  okaloosa: [
    'two-men-and-a-truck-okaloosa',
    'emerald-coast-moving',
    'okaloosa-local-lines',
    'motivated-movers-panama-city',
    'pensacola-bay-movers',
  ],
  okeechobee: [
    'okeechobee-moving',
    'highlands-moving',
    'treasure-coast-moving',
    'orlando-city-movers',
    'seminole-local-movers',
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
    'st-pete-local-lines',
  ],
  putnam: [
    'putnam-county-movers',
    'two-men-and-a-truck-jacksonville',
    'gainesville-local-movers',
    'jax-local-moving',
    'first-coast-movers',
  ],
  'santa-rosa': [
    'two-men-and-a-truck-pensacola',
    'pensacola-bay-movers',
    'emerald-coast-moving',
    'panhandle-moving-group',
    'tallahassee-capital-movers',
  ],
  'st-johns': [
    'two-men-and-a-truck-st-johns',
    'first-coast-movers',
    'two-men-and-a-truck-jacksonville',
    'suddath-jacksonville',
    'helping-hands-movers-jax',
  ],
  'st-lucie': [
    'treasure-coast-moving',
    'two-men-and-a-truck-indian-river',
    'indian-river-moving',
    'two-men-and-a-truck-melbourne',
    'brevard-local-movers',
  ],
  sumter: [
    'central-fl-moving',
    'later-gator-moving',
    'two-men-and-a-truck-orange',
    'orlando-city-movers',
    'lakeland-local-movers',
  ],
  suwannee: [
    'suwannee-county-movers',
    'the-move-connection-lake-city',
    'gainesville-local-movers',
    '2-college-brothers-moving-storage',
    'two-men-and-a-truck-gainesville',
  ],
  taylor: [
    'tallahassee-capital-movers',
    'gainesville-local-movers',
    'panhandle-moving-group',
    'levy-local-moving',
    'citrus-county-movers',
  ],
  union: [
    'gainesville-local-movers',
    '2-college-brothers-moving-storage',
    'two-men-and-a-truck-gainesville',
    '1st-coast-express-moving',
    'alachua-county-movers',
  ],
  wakulla: [
    'tallahassee-capital-movers',
    'panhandle-moving-group',
    '2-college-brothers-moving-storage',
    'pensacola-bay-movers',
    'emerald-coast-moving',
  ],
  walton: [
    'walton-coast-movers',
    'emerald-coast-moving',
    'two-men-and-a-truck-okaloosa',
    'okaloosa-local-lines',
    'motivated-movers-panama-city',
  ],
  washington: [
    'motivated-movers-panama-city',
    'two-men-and-a-truck-panama-city',
    'panhandle-moving-group',
    'pensacola-bay-movers',
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

/** Every Florida county gets 5–10 movers; major metros up to 10, minimum 5 elsewhere */
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