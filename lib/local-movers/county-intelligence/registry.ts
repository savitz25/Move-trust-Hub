import { alamedaCountyIntelligence } from '@/lib/local-movers/county-intelligence/alameda-ca';
import { bergenCountyIntelligence } from '@/lib/local-movers/county-intelligence/bergen-nj';
import { contraCostaCountyIntelligence } from '@/lib/local-movers/county-intelligence/contra-costa-ca';
import { essexCountyIntelligence } from '@/lib/local-movers/county-intelligence/essex-nj';
import { fresnoCountyIntelligence } from '@/lib/local-movers/county-intelligence/fresno-ca';
import { kernCountyIntelligence } from '@/lib/local-movers/county-intelligence/kern-ca';
import { losAngelesCountyIntelligence } from '@/lib/local-movers/county-intelligence/los-angeles-ca';
import { middlesexCountyIntelligence } from '@/lib/local-movers/county-intelligence/middlesex-nj';
import { monmouthCountyIntelligence } from '@/lib/local-movers/county-intelligence/monmouth-nj';
import { montereyCountyIntelligence } from '@/lib/local-movers/county-intelligence/monterey-ca';
import { morrisCountyIntelligence } from '@/lib/local-movers/county-intelligence/morris-nj';
import { oceanCountyIntelligence } from '@/lib/local-movers/county-intelligence/ocean-nj';
import { orangeCountyIntelligence } from '@/lib/local-movers/county-intelligence/orange-ca';
import { placerCountyIntelligence } from '@/lib/local-movers/county-intelligence/placer-ca';
import { riversideCountyIntelligence } from '@/lib/local-movers/county-intelligence/riverside-ca';
import { sacramentoCountyIntelligence } from '@/lib/local-movers/county-intelligence/sacramento-ca';
import { sanBernardinoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-bernardino-ca';
import { sanDiegoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-diego-ca';
import { sanFranciscoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-francisco-ca';
import { sanJoaquinCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-joaquin-ca';
import { sanMateoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-mateo-ca';
import { santaBarbaraCountyIntelligence } from '@/lib/local-movers/county-intelligence/santa-barbara-ca';
import { santaClaraCountyIntelligence } from '@/lib/local-movers/county-intelligence/santa-clara-ca';
import { sonomaCountyIntelligence } from '@/lib/local-movers/county-intelligence/sonoma-ca';
import { venturaCountyIntelligence } from '@/lib/local-movers/county-intelligence/ventura-ca';
import { warrenCountyIntelligence } from '@/lib/local-movers/county-intelligence/warren-nj';
import { atlanticCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/atlantic-nj';
import { gloucesterCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/gloucester-nj';
import { hunterdonCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/hunterdon-nj';
import { mercerCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/mercer-nj';
import { somersetCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/somerset-nj';
import { sussexCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/sussex-nj';
// Florida Core 12
import { miamiDadeCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/miami-dade-fl';
import { browardCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/broward-fl';
import { palmBeachCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/palm-beach-fl';
import { hillsboroughCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/hillsborough-fl';
import { orangeCountyFlIntelligence } from '@/lib/local-movers/county-intelligence/florida/orange-fl';
import { pinellasCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/pinellas-fl';
import { duvalCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/duval-fl';
import { leeCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/lee-fl';
import { polkCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/polk-fl';
import { brevardCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/brevard-fl';
import { pascoCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/pasco-fl';
import { volusiaCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/volusia-fl';
// Texas Core 12
import { harrisCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/harris-tx';
import { dallasCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/dallas-tx';
import { tarrantCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/tarrant-tx';
import { bexarCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/bexar-tx';
import { travisCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/travis-tx';
import { collinCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/collin-tx';
import { dentonCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/denton-tx';
import { fortBendCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/fort-bend-tx';
import { montgomeryCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/montgomery-tx';
import { williamsonCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/williamson-tx';
import { elPasoCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/el-paso-tx';
import { hidalgoCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/hidalgo-tx';
// Georgia Core 6 (metro) + Wave 2
import { fultonCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/fulton-ga';
import { gwinnettCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/gwinnett-ga';
import { cobbCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/cobb-ga';
import { dekalbCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/dekalb-ga';
import { cherokeeCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/cherokee-ga';
import { forsythCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/forsyth-ga';
import { claytonCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/clayton-ga';
import { henryCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/henry-ga';
import { hallCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/hall-ga';
import { chathamCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/chatham-ga';
import { richmondCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/richmond-ga';
import { muscogeeCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/muscogee-ga';
// New York Core 12
import { kingsCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/kings-ny';
import { queensCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/queens-ny';
import { newYorkCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/new-york-ny';
import { bronxCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/bronx-ny';
import { richmondCountyIntelligence as richmondCountyNyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/richmond-ny';
import { nassauCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/nassau-ny';
import { suffolkCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/suffolk-ny';
import { westchesterCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/westchester-ny';
import { erieCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/erie-ny';
import { monroeCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/monroe-ny';
import { onondagaCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/onondaga-ny';
import { albanyCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/albany-ny';
import { enhanceCaliforniaIntelligencePack } from '@/lib/local-movers/county-intelligence/california-relocation';
import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Flagship CA / FL / TX / GA / NY / NJ Tier-1 intelligence packs.
 * California packs are post-processed for relocation, specialized modules, and collapsible deep content.
 */
const RAW_PACKS: CountyIntelligencePack[] = [
  // California
  alamedaCountyIntelligence,
  contraCostaCountyIntelligence,
  fresnoCountyIntelligence,
  kernCountyIntelligence,
  losAngelesCountyIntelligence,
  montereyCountyIntelligence,
  orangeCountyIntelligence,
  placerCountyIntelligence,
  riversideCountyIntelligence,
  sacramentoCountyIntelligence,
  sanBernardinoCountyIntelligence,
  sanDiegoCountyIntelligence,
  sanFranciscoCountyIntelligence,
  sanJoaquinCountyIntelligence,
  sanMateoCountyIntelligence,
  santaBarbaraCountyIntelligence,
  santaClaraCountyIntelligence,
  sonomaCountyIntelligence,
  venturaCountyIntelligence,
  // Florida Core 12
  miamiDadeCountyIntelligence,
  browardCountyIntelligence,
  palmBeachCountyIntelligence,
  hillsboroughCountyIntelligence,
  orangeCountyFlIntelligence,
  pinellasCountyIntelligence,
  duvalCountyIntelligence,
  leeCountyIntelligence,
  polkCountyIntelligence,
  brevardCountyIntelligence,
  pascoCountyIntelligence,
  volusiaCountyIntelligence,
  // Texas Core 12
  harrisCountyIntelligence,
  dallasCountyIntelligence,
  tarrantCountyIntelligence,
  bexarCountyIntelligence,
  travisCountyIntelligence,
  collinCountyIntelligence,
  dentonCountyIntelligence,
  fortBendCountyIntelligence,
  montgomeryCountyIntelligence,
  williamsonCountyIntelligence,
  elPasoCountyIntelligence,
  hidalgoCountyIntelligence,
  // Georgia Core 6 (metro)
  fultonCountyIntelligence,
  gwinnettCountyIntelligence,
  cobbCountyIntelligence,
  dekalbCountyIntelligence,
  cherokeeCountyIntelligence,
  forsythCountyIntelligence,
  // Georgia Wave 2
  claytonCountyIntelligence,
  henryCountyIntelligence,
  hallCountyIntelligence,
  chathamCountyIntelligence,
  richmondCountyIntelligence,
  muscogeeCountyIntelligence,
  // New York Core 12
  kingsCountyIntelligence,
  queensCountyIntelligence,
  newYorkCountyIntelligence,
  bronxCountyIntelligence,
  richmondCountyNyIntelligence,
  nassauCountyIntelligence,
  suffolkCountyIntelligence,
  westchesterCountyIntelligence,
  erieCountyIntelligence,
  monroeCountyIntelligence,
  onondagaCountyIntelligence,
  albanyCountyIntelligence,
  // New Jersey
  bergenCountyIntelligence,
  essexCountyIntelligence,
  middlesexCountyIntelligence,
  monmouthCountyIntelligence,
  morrisCountyIntelligence,
  oceanCountyIntelligence,
  warrenCountyIntelligence,
  mercerCountyNjIntelligence,
  somersetCountyNjIntelligence,
  atlanticCountyNjIntelligence,
  gloucesterCountyNjIntelligence,
  hunterdonCountyNjIntelligence,
  sussexCountyNjIntelligence,
];

const PACKS: CountyIntelligencePack[] = RAW_PACKS.map((pack) =>
  pack.stateSlug === 'california' ? enhanceCaliforniaIntelligencePack(pack) : pack
);

const byKey = new Map(
  PACKS.map((p) => [`${p.stateSlug}/${p.countySlug}`, p] as const)
);

/** Hyper-local intelligence pack when curated for this county. */
export function getCountyIntelligencePack(
  stateSlug: string,
  countySlug: string
): CountyIntelligencePack | null {
  return byKey.get(`${stateSlug}/${countySlug}`) ?? null;
}

export function hasCountyIntelligencePack(
  stateSlug: string,
  countySlug: string
): boolean {
  return byKey.has(`${stateSlug}/${countySlug}`);
}

export function listCountyIntelligencePacks(): CountyIntelligencePack[] {
  return [...PACKS];
}

export const CA_TIER1_CORE12 = [
  'los-angeles',
  'orange',
  'san-diego',
  'santa-clara',
  'alameda',
  'riverside',
  'san-bernardino',
  'sacramento',
  'contra-costa',
  'san-francisco',
  'san-mateo',
  'ventura',
] as const;

export const CA_TIER1_WAVE2 = [
  'fresno',
  'kern',
  'san-joaquin',
  'sonoma',
  'placer',
  'santa-barbara',
  'monterey',
] as const;

export const CA_TIER1_ALL = [...CA_TIER1_CORE12, ...CA_TIER1_WAVE2] as const;

/** Florida Tier-1 Core 12. */
export const FL_TIER1_CORE12 = [
  'miami-dade',
  'broward',
  'palm-beach',
  'hillsborough',
  'orange',
  'pinellas',
  'duval',
  'lee',
  'polk',
  'brevard',
  'pasco',
  'volusia',
] as const;

/** Texas Tier-1 Core 12. */
export const TX_TIER1_CORE12 = [
  'harris',
  'dallas',
  'tarrant',
  'bexar',
  'travis',
  'collin',
  'denton',
  'fort-bend',
  'montgomery',
  'williamson',
  'el-paso',
  'hidalgo',
] as const;

/** Georgia Tier-1 Core 12 (metro + coastal/regional). */
export const GA_TIER1_CORE12 = [
  'fulton',
  'gwinnett',
  'cobb',
  'dekalb',
  'chatham',
  'cherokee',
  'clayton',
  'forsyth',
  'henry',
  'hall',
  'richmond',
  'muscogee',
] as const;

/** @deprecated Use GA_TIER1_CORE12 */
export const GA_TIER1_CORE6 = [
  'fulton',
  'gwinnett',
  'cobb',
  'dekalb',
  'cherokee',
  'forsyth',
] as const;

/** @deprecated Use GA_TIER1_CORE12 */
export const GA_TIER1_WAVE2 = [
  'clayton',
  'henry',
  'hall',
  'chatham',
  'richmond',
  'muscogee',
] as const;

export const GA_TIER1_ALL = [...GA_TIER1_CORE12] as const;

/** New York Tier-1 Core 12 (NYC boroughs + LI + Westchester + upstate). */
export const NY_TIER1_CORE12 = [
  'kings',
  'queens',
  'new-york',
  'bronx',
  'richmond',
  'nassau',
  'suffolk',
  'westchester',
  'erie',
  'monroe',
  'onondaga',
  'albany',
] as const;
