import { floridaCounties } from '@/lib/local-movers/geography/florida';

/** Geographic / metro adjacency for internal linking on FL county pages */
const FL_COUNTY_NEIGHBORS: Record<string, string[]> = {
  alachua: ['bradford', 'union', 'gilchrist', 'levy', 'marion', 'columbia', 'baker'],
  baker: ['nassau', 'duval', 'bradford', 'union', 'columbia'],
  bay: ['gulf', 'walton', 'washington', 'jackson', 'calhoun', 'franklin'],
  bradford: ['alachua', 'union', 'baker', 'clay', 'putnam'],
  brevard: ['volusia', 'orange', 'osceola', 'indian-river'],
  broward: ['miami-dade', 'palm-beach', 'collier'],
  calhoun: ['jackson', 'gulf', 'liberty', 'franklin', 'bay'],
  charlotte: ['lee', 'desoto', 'sarasota', 'hendry'],
  citrus: ['levy', 'marion', 'hernando', 'sumter', 'pasco'],
  clay: ['duval', 'baker', 'bradford', 'putnam', 'st-johns'],
  collier: ['lee', 'hendry', 'broward', 'monroe'],
  columbia: ['suwannee', 'hamilton', 'baker', 'union', 'alachua'],
  desoto: ['charlotte', 'hardee', 'manatee', 'sarasota'],
  dixie: ['levy', 'gilchrist', 'lafayette', 'suwannee', 'taylor'],
  duval: ['nassau', 'baker', 'clay', 'st-johns', 'bradford'],
  escambia: ['santa-rosa', 'okaloosa'],
  flagler: ['volusia', 'st-johns', 'putnam'],
  franklin: ['gulf', 'liberty', 'wakulla', 'leon', 'bay'],
  gadsden: ['leon', 'liberty', 'wakulla', 'jackson', 'calhoun'],
  gilchrist: ['alachua', 'levy', 'dixie', 'suwannee'],
  glades: ['hendry', 'okeechobee', 'highlands', 'charlotte', 'lee'],
  gulf: ['bay', 'franklin', 'calhoun', 'liberty'],
  hamilton: ['suwannee', 'columbia', 'madison', 'lafayette'],
  hardee: ['desoto', 'highlands', 'polk', 'manatee', 'okeechobee'],
  hendry: ['collier', 'lee', 'glades', 'charlotte'],
  hernando: ['pasco', 'citrus', 'sumter', 'hillsborough'],
  highlands: ['hardee', 'polk', 'okeechobee', 'glades', 'desoto'],
  hillsborough: ['pinellas', 'pasco', 'polk', 'manatee', 'hernando'],
  holmes: ['washington', 'walton', 'jackson', 'bay'],
  'indian-river': ['brevard', 'martin', 'st-lucie', 'okeechobee'],
  jackson: ['bay', 'calhoun', 'holmes', 'washington', 'gadsden'],
  jefferson: ['madison', 'taylor', 'leon', 'wakulla'],
  lafayette: ['dixie', 'suwannee', 'hamilton', 'madison', 'taylor'],
  lake: ['orange', 'seminole', 'volusia', 'sumter', 'marion', 'polk'],
  lee: ['charlotte', 'collier', 'hendry', 'glades'],
  leon: ['wakulla', 'jefferson', 'madison', 'gadsden', 'liberty'],
  levy: ['citrus', 'alachua', 'marion', 'dixie', 'gilchrist'],
  liberty: ['franklin', 'gulf', 'calhoun', 'gadsden', 'wakulla'],
  madison: ['hamilton', 'suwannee', 'jefferson', 'taylor', 'leon'],
  manatee: ['hillsborough', 'sarasota', 'desoto', 'hardee', 'pinellas'],
  marion: ['alachua', 'levy', 'citrus', 'sumter', 'lake', 'volusia'],
  martin: ['st-lucie', 'indian-river', 'palm-beach', 'okeechobee'],
  'miami-dade': ['broward', 'monroe', 'collier'],
  monroe: ['miami-dade', 'collier', 'lee'],
  nassau: ['duval', 'baker', 'clay'],
  okaloosa: ['santa-rosa', 'walton', 'escambia'],
  okeechobee: ['highlands', 'glades', 'martin', 'indian-river', 'polk'],
  orange: ['seminole', 'osceola', 'lake', 'volusia', 'brevard', 'polk'],
  osceola: ['orange', 'polk', 'brevard', 'highlands'],
  'palm-beach': ['broward', 'martin', 'hendry', 'glades'],
  pasco: ['hernando', 'hillsborough', 'pinellas', 'polk', 'citrus'],
  pinellas: ['hillsborough', 'pasco', 'manatee', 'hernando'],
  polk: ['hillsborough', 'osceola', 'hardee', 'highlands', 'lake', 'pasco'],
  putnam: ['st-johns', 'clay', 'bradford', 'flagler', 'alachua'],
  'santa-rosa': ['escambia', 'okaloosa', 'walton'],
  sarasota: ['manatee', 'desoto', 'charlotte', 'hillsborough'],
  seminole: ['orange', 'volusia', 'lake', 'brevard'],
  'st-johns': ['duval', 'flagler', 'putnam', 'clay'],
  'st-lucie': ['martin', 'indian-river', 'okeechobee', 'palm-beach'],
  sumter: ['lake', 'marion', 'citrus', 'hernando', 'pasco'],
  suwannee: ['hamilton', 'madison', 'lafayette', 'dixie', 'columbia'],
  taylor: ['jefferson', 'madison', 'lafayette', 'dixie'],
  union: ['alachua', 'bradford', 'baker', 'columbia', 'gilchrist'],
  volusia: ['brevard', 'seminole', 'lake', 'flagler', 'marion'],
  wakulla: ['leon', 'franklin', 'jefferson', 'liberty'],
  walton: ['okaloosa', 'santa-rosa', 'bay', 'holmes'],
  washington: ['holmes', 'jackson', 'bay', 'walton'],
};

const countyNameBySlug = new Map(floridaCounties.map((c) => [c.slug, c.name]));

export type NearbyCountyLink = {
  slug: string;
  name: string;
  seat?: string;
};

export function getFloridaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = FL_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = floridaCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    })
    .filter((c) => countyNameBySlug.has(c.slug) || floridaCounties.some((fc) => fc.slug === c.slug));
}