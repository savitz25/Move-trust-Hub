import { generatedCounties } from '@/data/generated/index';
import { applyIllinoisCountyOverrides } from '@/lib/local-movers/geography/illinois-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const illinoisCounties = generatedCounties
  .filter((c) => c.stateSlug === 'illinois')
  .map(applyIllinoisCountyOverrides);
const countyNameBySlug = new Map(illinoisCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated IL county pages — expands as counties are researched */
const IL_COUNTY_NEIGHBORS: Record<string, string[]> = {
  cook: ['dupage', 'lake', 'will', 'kane'],
  dupage: ['cook', 'kane', 'will', 'kendall'],
  lake: ['cook', 'mchenry'],
  will: ['cook', 'dupage', 'kendall', 'grundy', 'kankakee'],
  kane: ['cook', 'dupage', 'mchenry', 'dekalb', 'kendall'],
  mchenry: ['lake', 'kane', 'boone', 'dekalb'],
  winnebago: ['boone', 'ogle', 'stephenson', 'mchenry', 'dekalb'],
  madison: ['st-clair', 'bond', 'macoupin', 'jersey'],
  'st-clair': ['madison', 'clinton', 'monroe', 'randolph', 'washington'],
  champaign: ['piatt', 'douglas', 'vermilion', 'ford', 'mclean'],
  sangamon: ['menard', 'logan', 'christian', 'macoupin', 'montgomery'],
  peoria: ['tazewell', 'woodford', 'marshall', 'stark', 'fulton'],
  mclean: ['woodford', 'livingston', 'ford', 'piatt', 'dewitt', 'logan'],
  kendall: ['will', 'dupage', 'kane', 'grundy', 'lasalle'],
  'rock-island': ['henry', 'mercer', 'whiteside'],
  tazewell: ['peoria', 'woodford', 'mclean', 'logan', 'mason'],
  lasalle: ['lee', 'bureau', 'putnam', 'kendall', 'grundy', 'livingston'],
  kankakee: ['will', 'ford', 'iroquois', 'grundy', 'livingston'],
  dekalb: ['kane', 'mchenry', 'boone', 'winnebago', 'lee', 'ogle'],
  macon: ['sangamon', 'mclean', 'piatt', 'shelby', 'christian', 'logan'],
  vermilion: ['champaign', 'douglas', 'edgar', 'ford', 'iroquois'],
  williamson: ['franklin', 'jackson', 'johnson', 'saline', 'union'],
  adams: ['brown', 'pike', 'schuyler', 'hancock', 'lewis'],
  grundy: ['will', 'kendall', 'lasalle', 'kankakee', 'livingston'],
  whiteside: ['rock-island', 'henry', 'carroll', 'lee', 'ogle'],
  boone: ['winnebago', 'mchenry', 'ogle', 'dekalb'],
  jackson: ['williamson', 'franklin', 'perry', 'randolph', 'union'],
  ogle: ['winnebago', 'boone', 'dekalb', 'lee', 'carroll', 'whiteside'],
  henry: ['rock-island', 'whiteside', 'knox', 'bureau', 'stark'],
  knox: ['henry', 'warren', 'peoria', 'stark', 'mcdonough'],
  coles: ['vermilion', 'edgar', 'douglas', 'shelby', 'macon', 'cumberland'],
  macoupin: ['madison', 'sangamon', 'montgomery', 'jersey', 'morgan'],
  stephenson: ['winnebago', 'carroll', 'ogle', 'boone', 'jo-daviess'],
  woodford: ['peoria', 'tazewell', 'mclean', 'livingston', 'marshall'],
  clinton: ['st-clair', 'washington', 'bond', 'fayette', 'marion'],
  fayette: ['clinton', 'bond', 'marion', 'effingham', 'shelby', 'montgomery'],
  shelby: ['macon', 'coles', 'fayette', 'christian', 'moultrie'],
  perry: ['washington', 'jefferson', 'franklin', 'jackson', 'williamson'],
  washington: ['st-clair', 'clinton', 'perry', 'jefferson', 'marion', 'fayette'],
  massac: ['johnson', 'pope', 'pulaski', 'mccracken'],
  johnson: ['williamson', 'massac', 'pope', 'union', 'saline'],
  ford: ['champaign', 'iroquois', 'kankakee', 'livingston', 'mclean', 'vermilion'],
  white: ['edwards', 'wabash', 'wayne', 'hamilton', 'gallatin', 'posey'],
  clay: ['effingham', 'fayette', 'marion', 'wayne', 'richland', 'jasper'],
  cass: ['morgan', 'menard', 'sangamon', 'brown', 'schuyler', 'mason'],
  mason: ['tazewell', 'peoria', 'fulton', 'logan', 'menard', 'marshall'],
  menard: ['sangamon', 'cass', 'mason', 'logan', 'christian'],
  marshall: ['peoria', 'woodford', 'stark', 'putnam', 'mason'],
  greene: ['jersey', 'macoupin', 'morgan', 'scott', 'pike', 'calhoun'],
  wabash: ['edwards', 'white', 'lawrence', 'knox', 'gibson'],
  cumberland: ['coles', 'shelby', 'moultrie', 'clark', 'jasper'],
  jasper: ['cumberland', 'effingham', 'clay', 'crawford', 'richland'],
  hamilton: ['white', 'wayne', 'jefferson', 'franklin', 'saline', 'williamson'],
  schuyler: ['adams', 'brown', 'cass', 'mcdonough', 'fulton', 'hancock'],
  brown: ['adams', 'schuyler', 'pike', 'cass', 'morgan'],
  henderson: ['warren', 'mercer', 'hancock', 'mcdonough', 'rock-island'],
  edwards: ['white', 'wabash', 'wayne', 'richland', 'gallatin'],
  putnam: ['marshall', 'bureau', 'lasalle', 'grundy', 'livingston'],
  stark: ['marshall', 'peoria', 'henry', 'bureau', 'knox'],
  scott: ['morgan', 'greene', 'pike', 'macoupin', 'cass'],
  pulaski: ['alexander', 'massac', 'johnson', 'union', 'ballard'],
  gallatin: ['white', 'hamilton', 'saline', 'hardin', 'posey'],
  alexander: ['pulaski', 'massac', 'union', 'ballard', 'cape-girardeau'],
  calhoun: ['greene', 'jersey', 'pike', 'macoupin', 'st-charles'],
  pope: ['johnson', 'massac', 'hardin', 'saline', 'livingston'],
  hardin: ['gallatin', 'pope', 'saline', 'union', 'crittenden'],
};

export function getIllinoisNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = IL_COUNTY_NEIGHBORS[countySlug];
  if (!neighbors) return [];

  const seen = new Set<string>();
  return neighbors
    .filter((slug) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return countyNameBySlug.has(slug);
    })
    .map((slug) => ({
      slug,
      name: countyNameBySlug.get(slug)!,
      href: `/local-movers/illinois/${slug}`,
    }));
}