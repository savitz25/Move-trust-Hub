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