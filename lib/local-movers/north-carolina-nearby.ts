import { north_carolinaCounties } from '@/data/generated/states/north-carolina';
import { applyNorthCarolinaCountyOverrides } from '@/lib/local-movers/geography/north-carolina-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const ncCounties = north_carolinaCounties.map(applyNorthCarolinaCountyOverrides);
const countyNameBySlug = new Map(ncCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for internal linking on NC county pages */
const NC_COUNTY_NEIGHBORS: Record<string, string[]> = {
  wake: ['durham', 'johnston', 'franklin', 'chatham', 'harnett', 'nash'],
  mecklenburg: ['union', 'gaston', 'cabarrus', 'iredell', 'lincoln', 'rowan'],
  guilford: ['forsyth', 'alamance', 'randolph', 'rockingham', 'davidson'],
  forsyth: ['guilford', 'davidson', 'davie', 'yadkin', 'surry', 'stokes'],
  durham: ['wake', 'orange', 'granville', 'person', 'chatham', 'alamance'],
  cumberland: ['hoke', 'harnett', 'sampson', 'bladen', 'robeson', 'moore'],
  buncombe: ['henderson', 'madison', 'yancey', 'mcdowell', 'rutherford', 'haywood'],
  union: ['mecklenburg', 'cabarrus', 'stanly', 'anson'],
  johnston: ['wake', 'harnett', 'sampson', 'nash', 'wilson', 'wayne'],
  cabarrus: ['mecklenburg', 'union', 'rowan', 'stanly', 'iredell'],
  gaston: ['mecklenburg', 'lincoln', 'cleveland', 'burke'],
  'new-hanover': ['brunswick', 'pender', 'columbus', 'duplin'],
  onslow: ['new-hanover', 'pender', 'jones', 'carteret', 'duplin'],
  iredell: ['mecklenburg', 'cabarrus', 'rowan', 'alexander', 'catawba', 'lincoln'],
  alamance: ['guilford', 'orange', 'durham', 'chatham', 'caswell', 'randolph'],
  pitt: ['greene', 'lenoir', 'wilson', 'beaufort', 'edgecombe', 'martin'],
  brunswick: ['new-hanover', 'pender', 'columbus', 'bladen'],
  davidson: ['forsyth', 'guilford', 'davie', 'rowan', 'stanly', 'randolph'],
  catawba: ['iredell', 'lincoln', 'burke', 'alexander', 'caldwell', 'gaston'],
  rowan: ['cabarrus', 'iredell', 'davie', 'stanly', 'davidson', 'mecklenburg'],
  harnett: ['wake', 'johnston', 'cumberland', 'lee', 'moore', 'chatham'],
  orange: ['durham', 'wake', 'alamance', 'chatham', 'caswell', 'person'],
  randolph: ['guilford', 'alamance', 'davidson', 'montgomery', 'moore', 'chatham'],
  henderson: ['buncombe', 'transylvania', 'polk', 'rutherford', 'haywood', 'madison'],
  wayne: ['johnston', 'wilson', 'greene', 'lenoir', 'duplin', 'sampson'],
  robeson: ['cumberland', 'scotland', 'hoke', 'columbus', 'bladen', 'richmond'],
  moore: ['cumberland', 'hoke', 'harnett', 'lee', 'richmond', 'montgomery'],
  craven: ['carteret', 'jones', 'pamlico', 'lenoir', 'pitt', 'onslow'],
  cleveland: ['gaston', 'rutherford', 'mcdowell', 'burke', 'lincoln', 'mecklenburg'],
  nash: ['wilson', 'edgecombe', 'halifax', 'franklin', 'johnston', 'wake'],
  lincoln: ['catawba', 'iredell', 'gaston', 'mecklenburg', 'burke', 'alexander'],
  rockingham: ['guilford', 'caswell', 'person', 'stokes', 'forsyth', 'alamance'],
  burke: ['catawba', 'mcdowell', 'rutherford', 'caldwell', 'alexander', 'lincoln'],
  chatham: ['wake', 'orange', 'durham', 'alamance', 'lee', 'moore'],
  franklin: ['wake', 'nash', 'johnston', 'warren', 'vance', 'granville'],
  wilson: ['nash', 'edgecombe', 'pitt', 'wayne', 'johnston', 'greene'],
  caldwell: ['burke', 'alexander', 'catawba', 'watauga', 'wilkes', 'avery'],
  pender: ['new-hanover', 'brunswick', 'onslow', 'duplin', 'sampson', 'bladen'],
  surry: ['stokes', 'forsyth', 'yadkin', 'wilkes', 'alleghany', 'rockingham'],
  lee: ['chatham', 'harnett', 'cumberland', 'moore', 'hoke', 'randolph'],
  carteret: ['onslow', 'craven', 'jones', 'pamlico', 'hyde', 'pitt'],
  stanly: ['cabarrus', 'union', 'davidson', 'montgomery', 'anson', 'rowan'],
  wilkes: ['surry', 'alexander', 'iredell', 'caldwell', 'watauga', 'alleghany'],
  rutherford: ['buncombe', 'mcdowell', 'cleveland', 'henderson', 'polk', 'burke'],
  haywood: ['buncombe', 'jackson', 'macon', 'swain', 'transylvania', 'madison'],
  sampson: ['cumberland', 'hoke', 'johnston', 'duplin', 'bladen', 'columbus'],
  granville: ['durham', 'vance', 'franklin', 'wake', 'person', 'orange'],
  hoke: ['cumberland', 'robeson', 'scotland', 'moore', 'lee', 'sampson'],
  lenoir: ['wayne', 'greene', 'pitt', 'jones', 'craven', 'duplin'],
  watauga: ['avery', 'caldwell', 'wilkes', 'ashe', 'surry'],
  duplin: ['sampson', 'onslow', 'pender', 'lenoir', 'wayne', 'new-hanover'],
  columbus: ['bladen', 'brunswick', 'robeson', 'pender', 'new-hanover', 'sampson'],
  edgecombe: ['nash', 'wilson', 'pitt', 'halifax', 'martin', 'bertie'],
  stokes: ['surry', 'forsyth', 'rockingham', 'guilford', 'davie', 'davidson'],
  davie: ['forsyth', 'davidson', 'rowan', 'iredell', 'yadkin', 'stokes'],
  halifax: ['nash', 'edgecombe', 'martin', 'bertie', 'warren', 'vance'],
  mcdowell: ['burke', 'avery', 'mitchell', 'buncombe', 'rutherford', 'yancey'],
  jackson: ['haywood', 'macon', 'transylvania', 'swain', 'graham', 'buncombe'],
  beaufort: ['pitt', 'martin', 'hyde', 'craven', 'edgecombe', 'lenoir'],
  pasquotank: ['edgecombe', 'halifax', 'nash', 'pitt', 'craven', 'wilson'],
  vance: ['granville', 'franklin', 'warren', 'halifax', 'person', 'durham'],
  richmond: ['robeson', 'scotland', 'montgomery', 'anson', 'moore', 'cumberland'],
  person: ['granville', 'durham', 'orange', 'caswell', 'vance', 'franklin'],
  macon: ['jackson', 'swain', 'clay', 'graham', 'haywood', 'transylvania'],
  madison: ['buncombe', 'yancey', 'haywood', 'mitchell', 'avery', 'henderson'],
  anson: ['union', 'richmond', 'montgomery', 'stanly', 'cabarrus', 'mecklenburg'],
  martin: ['pitt', 'beaufort', 'bertie', 'edgecombe', 'halifax', 'nash'],
  greene: ['lenoir', 'wayne', 'pitt', 'wilson', 'edgecombe', 'duplin'],
  polk: ['rutherford', 'henderson', 'buncombe', 'cleveland', 'mcdowell', 'transylvania'],
  yancey: ['madison', 'mitchell', 'avery', 'buncombe', 'mcdowell', 'burke'],
  hertford: ['bertie', 'northampton', 'gates', 'chowan', 'pasquotank', 'halifax'],
  warren: ['vance', 'franklin', 'halifax', 'northampton', 'granville', 'person'],
  avery: ['watauga', 'caldwell', 'mitchell', 'burke', 'mcdowell', 'wilkes'],
  bertie: ['martin', 'pitt', 'chowan', 'northampton', 'hertford', 'edgecombe'],
  northampton: ['halifax', 'bertie', 'warren', 'hertford', 'edgecombe', 'nash'],
  mitchell: ['yancey', 'avery', 'mcdowell', 'buncombe', 'burke', 'madison'],
};

export function getNorthCarolinaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = NC_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = ncCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}