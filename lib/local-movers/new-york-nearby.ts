import { newYorkCounties } from '@/lib/local-movers/geography/new-york';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Geographic adjacency for internal linking on NY county pages */
const NY_COUNTY_NEIGHBORS: Record<string, string[]> = {
  albany: ['rensselaer', 'schenectady', 'saratoga', 'schoharie', 'greene', 'columbia'],
  allegany: ['cattaraugus', 'wyoming', 'livingston', 'steuben'],
  bronx: ['new-york', 'queens', 'westchester'],
  broome: ['tioga', 'chenango', 'delaware'],
  cattaraugus: ['erie', 'chautauqua', 'allegany', 'wyoming'],
  cayuga: ['seneca', 'wayne', 'onondaga', 'cortland', 'tompkins'],
  chautauqua: ['erie', 'cattaraugus'],
  chemung: ['schuyler', 'steuben', 'tioga', 'tompkins'],
  chenango: ['madison', 'otsego', 'delaware', 'broome', 'cortland'],
  clinton: ['essex', 'franklin', 'st-lawrence'],
  columbia: ['albany', 'rensselaer', 'greene', 'ulster', 'dutchess'],
  cortland: ['onondaga', 'cayuga', 'tompkins', 'chenango', 'madison'],
  delaware: ['otsego', 'schoharie', 'greene', 'ulster', 'sullivan', 'chenango', 'broome'],
  dutchess: ['columbia', 'ulster', 'orange', 'putnam', 'westchester'],
  erie: ['niagara', 'wyoming', 'cattaraugus', 'chautauqua'],
  essex: ['clinton', 'franklin', 'hamilton', 'warren', 'washington'],
  franklin: ['clinton', 'essex', 'hamilton', 'st-lawrence'],
  fulton: ['montgomery', 'herkimer', 'hamilton', 'saratoga', 'schenectady'],
  genesee: ['orleans', 'monroe', 'wyoming', 'livingston'],
  greene: ['albany', 'schoharie', 'delaware', 'ulster', 'columbia'],
  hamilton: ['franklin', 'essex', 'warren', 'fulton', 'herkimer'],
  herkimer: ['oneida', 'madison', 'otsego', 'montgomery', 'fulton', 'hamilton'],
  jefferson: ['st-lawrence', 'lewis', 'oswego'],
  kings: ['new-york', 'queens', 'richmond'],
  lewis: ['jefferson', 'st-lawrence', 'oswego', 'oneida', 'herkimer'],
  livingston: ['monroe', 'ontario', 'wayne', 'genesee', 'wyoming', 'allegany', 'steuben'],
  madison: ['oneida', 'onondaga', 'cortland', 'chenango', 'otsego', 'herkimer'],
  monroe: ['wayne', 'ontario', 'livingston', 'orleans', 'genesee'],
  montgomery: ['fulton', 'herkimer', 'otsego', 'schoharie', 'schenectady'],
  nassau: ['queens', 'suffolk', 'new-york'],
  'new-york': ['bronx', 'queens', 'kings', 'richmond'],
  niagara: ['erie', 'orleans', 'genesee'],
  oneida: ['herkimer', 'madison', 'oswego', 'lewis', 'onondaga'],
  onondaga: ['cayuga', 'madison', 'cortland', 'oswego', 'oneida'],
  ontario: ['monroe', 'wayne', 'seneca', 'yates', 'livingston'],
  orange: ['rockland', 'westchester', 'putnam', 'dutchess', 'sullivan', 'ulster'],
  orleans: ['niagara', 'genesee', 'monroe'],
  oswego: ['onondaga', 'cayuga', 'jefferson', 'lewis', 'oneida'],
  otsego: ['herkimer', 'montgomery', 'schoharie', 'delaware', 'chenango', 'madison'],
  putnam: ['westchester', 'dutchess', 'orange', 'rockland'],
  queens: ['kings', 'new-york', 'bronx', 'nassau', 'suffolk'],
  rensselaer: ['albany', 'columbia', 'greene', 'washington', 'saratoga'],
  richmond: ['kings', 'new-york'],
  rockland: ['orange', 'putnam', 'westchester'],
  saratoga: ['albany', 'schenectady', 'warren', 'washington', 'fulton', 'montgomery', 'rensselaer'],
  schenectady: ['albany', 'saratoga', 'montgomery', 'schoharie', 'fulton'],
  schoharie: ['albany', 'schenectady', 'montgomery', 'otsego', 'delaware', 'greene'],
  schuyler: ['chemung', 'steuben', 'tompkins', 'yates'],
  seneca: ['cayuga', 'ontario', 'yates', 'wayne'],
  'st-lawrence': ['jefferson', 'lewis', 'franklin', 'clinton'],
  steuben: ['chemung', 'schuyler', 'livingston', 'allegany', 'yates'],
  suffolk: ['nassau', 'queens'],
  sullivan: ['ulster', 'delaware', 'orange'],
  tioga: ['broome', 'chemung', 'tompkins'],
  tompkins: ['cayuga', 'cortland', 'chemung', 'schuyler', 'tioga'],
  ulster: ['greene', 'delaware', 'sullivan', 'orange', 'dutchess', 'columbia'],
  warren: ['saratoga', 'washington', 'essex', 'hamilton'],
  washington: ['warren', 'essex', 'rensselaer', 'saratoga'],
  wayne: ['monroe', 'ontario', 'seneca', 'cayuga', 'livingston'],
  westchester: ['bronx', 'putnam', 'rockland', 'orange', 'dutchess'],
  wyoming: ['genesee', 'erie', 'cattaraugus', 'allegany', 'livingston'],
  yates: ['ontario', 'seneca', 'schuyler', 'steuben'],
};

const countyNameBySlug = new Map(newYorkCounties.map((c) => [c.slug, c.name]));

export function getNewYorkNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = NY_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = newYorkCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    })
    .filter(
      (c) =>
        countyNameBySlug.has(c.slug) ||
        newYorkCounties.some((ny) => ny.slug === c.slug)
    );
}