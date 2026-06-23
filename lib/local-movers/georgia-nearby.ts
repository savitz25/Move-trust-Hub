import { generatedCounties } from '@/data/generated/index';
import { applyGeorgiaCountyOverrides } from '@/lib/local-movers/geography/georgia-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const georgiaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'georgia')
  .map(applyGeorgiaCountyOverrides);
const countyNameBySlug = new Map(georgiaCounties.map((c) => [c.slug, c.name]));

/** Metro adjacency for curated GA county pages — expands as counties are researched */
const GA_COUNTY_NEIGHBORS: Record<string, string[]> = {
  fulton: ['cobb', 'dekalb', 'forsyth', 'gwinnett', 'cherokee', 'clayton'],
  gwinnett: ['fulton', 'barrow', 'forsyth', 'hall', 'jackson', 'walton'],
  cobb: ['fulton', 'cherokee', 'paulding', 'douglas', 'fayette', 'bartow'],
  dekalb: ['fulton', 'gwinnett', 'rockdale', 'henry', 'clayton', 'walton'],
  clayton: ['fulton', 'dekalb', 'henry', 'fayette', 'rockdale', 'spalding'],
  cherokee: ['cobb', 'fulton', 'forsyth', 'pickens', 'bartow', 'paulding'],
  forsyth: ['gwinnett', 'fulton', 'cherokee', 'hall', 'dawson', 'lumpkin'],
  henry: ['clayton', 'fayette', 'rockdale', 'newton', 'butts', 'spalding'],
  fayette: ['clayton', 'fulton', 'henry', 'coweta', 'spalding', 'heard'],
  douglas: ['cobb', 'paulding', 'fulton', 'carroll', 'fayette', 'haralson'],
  rockdale: ['dekalb', 'gwinnett', 'newton', 'henry', 'walton', 'morgan'],
  paulding: ['cobb', 'douglas', 'bartow', 'polk', 'cherokee', 'haralson'],
  coweta: ['fayette', 'fulton', 'spalding', 'heard', 'meriwether', 'carroll'],
  barrow: ['gwinnett', 'walton', 'jackson', 'oconee', 'clarke', 'banks'],
  newton: ['rockdale', 'walton', 'morgan', 'jasper', 'henry', 'butts'],
  hall: ['gwinnett', 'forsyth', 'banks', 'lumpkin', 'white', 'jackson'],
  walton: ['gwinnett', 'rockdale', 'newton', 'morgan', 'oconee', 'barrow'],
  chatham: ['bryan', 'effingham', 'liberty', 'bulloch', 'screven', 'jasper'],
  richmond: ['columbia', 'mcduffie', 'jefferson', 'burke', 'glascock', 'warren'],
  columbia: ['richmond', 'mcduffie', 'jefferson', 'lincoln', 'wilkes', 'burke'],
  muscogee: ['harris', 'talbot', 'chattahoochee', 'stewart', 'marion', 'schley'],
  pickens: ['cherokee', 'dawson', 'gilmer', 'gordon', 'forsyth', 'bartow'],
  bartow: ['cherokee', 'paulding', 'polk', 'cobb', 'gordon', 'pickens'],
  spalding: ['fayette', 'henry', 'clayton', 'butts', 'coweta', 'pike'],
  butts: ['henry', 'spalding', 'jasper', 'newton', 'lamar', 'monroe'],
  carroll: ['douglas', 'haralson', 'heard', 'coweta', 'fayette', 'paulding'],
  dawson: ['forsyth', 'hall', 'lumpkin', 'pickens', 'gwinnett', 'cherokee'],
  lumpkin: ['dawson', 'hall', 'white', 'banks', 'forsyth', 'union'],
  morgan: ['newton', 'walton', 'oconee', 'jasper', 'greene', 'putnam'],
  oconee: ['clarke', 'barrow', 'walton', 'morgan', 'greene', 'madison'],
  jackson: ['gwinnett', 'barrow', 'hall', 'banks', 'clarke', 'madison'],
  haralson: ['paulding', 'carroll', 'douglas', 'polk', 'coweta', 'heard'],
  polk: ['paulding', 'bartow', 'floyd', 'haralson', 'gordon', 'catoosa'],
  heard: ['carroll', 'coweta', 'fayette', 'troup', 'haralson', 'meriwether'],
  meriwether: ['coweta', 'fayette', 'heard', 'troup', 'pike', 'upson'],
  floyd: ['gordon', 'bartow', 'polk', 'chattooga', 'cherokee', 'whitfield'],
  gordon: ['floyd', 'bartow', 'pickens', 'murray', 'whitfield', 'cherokee'],
  chattooga: ['floyd', 'walker', 'haralson', 'polk', 'gordon', 'bartow'],
  walker: ['catoosa', 'dade', 'whitfield', 'murray', 'chattooga', 'gordon'],
  whitfield: ['murray', 'gordon', 'walker', 'catoosa', 'floyd', 'bartow'],
  murray: ['whitfield', 'gordon', 'fannin', 'gilmer', 'walker', 'pickens'],
  catoosa: ['walker', 'whitfield', 'dade', 'murray', 'gordon', 'floyd'],
  dade: ['walker', 'catoosa', 'chattooga', 'whitfield', 'murray', 'gordon'],
  appling: ['bacon', 'jeff-davis', 'ware', 'pierce', 'coffee', 'toombs'],
  atkinson: ['coffee', 'berrien', 'clinch', 'ware', 'lanier', 'lowndes'],
  bacon: ['appling', 'coffee', 'pierce', 'ware', 'jeff-davis', 'brantley'],
  baker: ['dougherty', 'mitchell', 'calhoun', 'early', 'decatur', 'miller'],
  baldwin: ['bibb', 'jones', 'putnam', 'hancock', 'washington', 'wilkinson'],
  banks: ['hall', 'jackson', 'barrow', 'franklin', 'habersham', 'stephens'],
  berrien: ['atkinson', 'cook', 'lanier', 'lowndes', 'irwin', 'tift'],
  bibb: ['baldwin', 'jones', 'monroe', 'crawford', 'peach', 'twiggs'],
  bleckley: ['bibb', 'dodge', 'pulaski', 'wilcox', 'laurens', 'twiggs'],
  brantley: ['charlton', 'camden', 'pierce', 'ware', 'glynn', 'bacon'],
  houston: ['peach', 'bibb', 'bleckley', 'pulaski', 'taylor', 'crawford'],
  lowndes: ['brooks', 'lanier', 'berrien', 'atkinson', 'cook', 'echols'],
  bulloch: ['evans', 'candler', 'emanuel', 'screven', 'jenkins', 'bryan'],
  effingham: ['bryan', 'chatham', 'bulloch', 'screven', 'jasper', 'liberty'],
  glynn: ['camden', 'mcintosh', 'wayne', 'brantley', 'pierce', 'ware'],
  dougherty: ['lee', 'worth', 'mitchell', 'baker', 'terrell', 'sumter'],
  troup: ['meriwether', 'coweta', 'heard', 'harris', 'muscogee', 'chattahoochee'],
  liberty: ['chatham', 'bryan', 'effingham', 'mcintosh', 'long', 'evans'],
  camden: ['glynn', 'charlton', 'ware', 'pierce', 'brantley', 'bryan'],
  bryan: ['chatham', 'effingham', 'liberty', 'bulloch', 'evans', 'mcintosh'],
  laurens: ['wilkinson', 'johnson', 'treutlen', 'wheeler', 'dodge', 'bleckley'],
  habersham: ['hall', 'banks', 'white', 'rabun', 'stephens', 'lumpkin'],
  colquitt: ['thomas', 'brooks', 'cook', 'tift', 'mitchell', 'worth'],
  thomas: ['brooks', 'colquitt', 'grady', 'mitchell', 'decatur', 'lowndes'],
};

export function getGeorgiaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = GA_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = georgiaCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    })
    .filter(
      (c) =>
        countyNameBySlug.has(c.slug) ||
        georgiaCounties.some((ga) => ga.slug === c.slug)
    );
}