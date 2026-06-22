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
  bronx: [
    'two-men-and-a-truck-bronx',
    'all-my-sons-bronx',
    'gentle-giant-bronx',
    'helping-hand-movers-bronx',
    'pure-moving-bronx',
    'college-hunks-bronx',
    'five-boro-moving-bronx',
  ],
  broome: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
    'lamanna-moving-albany',
  ],
  cattaraugus: [
    'ck-local-movers-olean',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  cayuga: [
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  chautauqua: [
    'dans-moving-storage-wny',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  chemung: [
    'naglee-moving-elmira',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  chenango: [
    'dimon-bacorn-binghamton',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  clinton: [
    'stafford-moving-plattsburgh',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  columbia: [
    'triangle-movers-hudson-valley',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
  ],
  cortland: [
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'dimon-bacorn-binghamton',
    'busy-bee-movers-albany',
  ],
  delaware: [
    'dimon-bacorn-binghamton',
    'triangle-movers-hudson-valley',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
  ],
  dutchess: [
    'piece-of-cake-moving-dutchess',
    'booth-movers-bergen',
    'triangle-movers-hudson-valley',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'white-glove-moving-burlington',
    'optimum-moving-bergen',
    'movers-201-bergen',
  ],
  erie: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'corrigan-moving-buffalo',
    'two-men-and-a-truck-buffalo',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  essex: [
    'stafford-moving-plattsburgh',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  franklin: [
    'stafford-moving-plattsburgh',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'arnoff-moving-storage-albany',
  ],
  fulton: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'clark-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  genesee: [
    'corrigan-moving-buffalo',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'dans-moving-storage-wny',
    'busy-bee-movers-albany',
  ],
  greene: [
    'triangle-movers-hudson-valley',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'busy-bee-movers-albany',
  ],
  hamilton: [
    'stafford-moving-plattsburgh',
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
  ],
  herkimer: [
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  jefferson: [
    'pinnacle-moving-watertown',
    'reliable-movers-syracuse',
    'stafford-moving-plattsburgh',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  kings: [
    'piece-of-cake-moving-kings',
    'booth-movers-kings',
    'white-glove-moving-kings',
    'zip-to-zip-moving-kings',
    'optimum-moving-kings',
    'all-my-sons-kings',
    'gentle-giant-kings',
  ],
  lewis: [
    'pinnacle-moving-watertown',
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
  ],
  livingston: [
    'rochester-moving-storage-rochester',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  madison: [
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'dimon-bacorn-binghamton',
    'busy-bee-movers-albany',
  ],
  monroe: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'rochester-moving-storage-rochester',
    'corrigan-moving-buffalo',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  montgomery: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'reliable-movers-syracuse',
    'lamanna-moving-albany',
    'busy-bee-movers-albany',
  ],
  nassau: [
    'piece-of-cake-moving-nassau',
    'booth-movers-nassau',
    'white-glove-moving-nassau',
    'zip-to-zip-moving-nassau',
    'optimum-moving-nassau',
    'all-my-sons-nassau',
    'gentle-giant-nassau',
    'college-hunks-nassau',
  ],
  'new-york': [
    'piece-of-cake-moving-manhattan',
    'booth-movers-manhattan',
    'white-glove-moving-manhattan',
    'zip-to-zip-moving-manhattan',
    'optimum-moving-manhattan',
    'all-my-sons-manhattan',
    'gentle-giant-manhattan',
  ],
  niagara: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'corrigan-moving-buffalo',
    'two-men-and-a-truck-buffalo',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  oneida: [
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  onondaga: [
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
    'lamanna-moving-albany',
  ],
  ontario: [
    'rochester-moving-storage-rochester',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  orange: [
    'piece-of-cake-moving-orange',
    'booth-movers-orange',
    'triangle-movers-hudson-valley',
    'white-glove-moving-burlington',
    'zip-to-zip-moving-atlantic',
    'optimum-moving-bergen',
    'all-my-sons-burlington',
    'mabeys-moving-storage-albany',
  ],
  orleans: [
    'rochester-moving-storage-rochester',
    'corrigan-moving-buffalo',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  oswego: [
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  otsego: [
    'dimon-bacorn-binghamton',
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  putnam: [
    'piece-of-cake-moving-putnam',
    'booth-movers-putnam',
    'triangle-movers-hudson-valley',
    'white-glove-moving-burlington',
    'zip-to-zip-moving-atlantic',
    'optimum-moving-bergen',
  ],
  queens: [
    'piece-of-cake-moving-queens',
    'booth-movers-queens',
    'white-glove-moving-queens',
    'zip-to-zip-moving-queens',
    'optimum-moving-queens',
    'all-my-sons-queens',
    'gentle-giant-queens',
  ],
  rensselaer: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  richmond: [
    'piece-of-cake-moving-richmond',
    'booth-movers-richmond',
    'white-glove-moving-richmond',
    'zip-to-zip-moving-richmond',
    'optimum-moving-richmond',
    'all-my-sons-richmond',
    'gentle-giant-richmond',
  ],
  rockland: [
    'piece-of-cake-moving-rockland',
    'booth-movers-rockland',
    'triangle-movers-hudson-valley',
    'white-glove-moving-burlington',
    'zip-to-zip-moving-atlantic',
    'optimum-moving-bergen',
    'all-my-sons-burlington',
    'mabeys-moving-storage-albany',
  ],
  saratoga: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
    'booth-movers-bergen',
  ],
  schenectady: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'all-ways-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  schoharie: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'clark-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  schuyler: [
    'naglee-moving-elmira',
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
  ],
  seneca: [
    'reliable-movers-syracuse',
    'rochester-moving-storage-rochester',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  'st-lawrence': [
    'pinnacle-moving-watertown',
    'stafford-moving-plattsburgh',
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  steuben: [
    'naglee-moving-elmira',
    'rochester-moving-storage-rochester',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  suffolk: [
    'piece-of-cake-moving-suffolk',
    'booth-movers-suffolk',
    'white-glove-moving-suffolk',
    'zip-to-zip-moving-suffolk',
    'optimum-moving-suffolk',
    'all-my-sons-suffolk',
    'gentle-giant-suffolk',
    'college-hunks-suffolk',
  ],
  sullivan: [
    'triangle-movers-hudson-valley',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'busy-bee-movers-albany',
  ],
  tioga: [
    'dimon-bacorn-binghamton',
    'naglee-moving-elmira',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  tompkins: [
    'hired-hands-moving-ithaca',
    'reliable-movers-syracuse',
    'dimon-bacorn-binghamton',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  ulster: [
    'triangle-movers-hudson-valley',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'clark-moving-storage-albany',
    'arnoff-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  warren: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'clark-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  washington: [
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'lamanna-moving-albany',
    'clark-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  wayne: [
    'rochester-moving-storage-rochester',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
    'clark-moving-storage-albany',
    'busy-bee-movers-albany',
  ],
  westchester: [
    'piece-of-cake-moving-westchester',
    'booth-movers-westchester',
    'white-glove-moving-westchester',
    'zip-to-zip-moving-westchester',
    'optimum-moving-westchester',
    'all-my-sons-westchester',
    'gentle-giant-westchester',
    'college-hunks-westchester',
  ],
  wyoming: [
    'corrigan-moving-buffalo',
    'dans-moving-storage-wny',
    'rochester-moving-storage-rochester',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
  ],
  yates: [
    'rochester-moving-storage-rochester',
    'reliable-movers-syracuse',
    'mabeys-moving-storage-albany',
    'dons-moving-storage-albany',
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