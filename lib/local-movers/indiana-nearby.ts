import { generatedCounties } from '@/data/generated/index';
import { applyIndianaCountyOverrides } from '@/lib/local-movers/geography/indiana-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const indianaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'indiana')
  .map(applyIndianaCountyOverrides);
const countyNameBySlug = new Map(indianaCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated IN county pages — expands as counties are researched */
const IN_COUNTY_NEIGHBORS: Record<string, string[]> = {
  marion: ['hamilton', 'hancock', 'hendricks', 'johnson', 'morgan', 'boone', 'shelby'],
  lake: ['porter', 'laporte', 'newton', 'jasper'],
  allen: ['dekalb', 'noble', 'whitley', 'wells', 'adams'],
  hamilton: ['marion', 'hancock', 'madison', 'tipton', 'boone', 'clinton'],
  'st-joseph': ['elkhart', 'marshall', 'lagrange', 'starke', 'kosciusko'],
  elkhart: ['st-joseph', 'lagrange', 'noble', 'kosciusko', 'marshall', 'laporte'],
  hendricks: ['marion', 'johnson', 'morgan', 'putnam', 'boone', 'montgomery'],
  tippecanoe: ['white', 'carroll', 'benton', 'fountain', 'warren', 'clinton'],
  vanderburgh: ['warrick', 'posey', 'gibson', 'spencer'],
  johnson: ['marion', 'morgan', 'shelby', 'bartholomew', 'brown', 'hendricks'],
  porter: ['lake', 'laporte', 'jasper', 'starke'],
  monroe: ['brown', 'lawrence', 'morgan', 'greene', 'owen', 'jackson'],
  madison: ['hamilton', 'hancock', 'delaware', 'henry', 'grant', 'tipton'],
  clark: ['floyd', 'scott', 'washington', 'jefferson'],
  delaware: ['madison', 'grant', 'blackford', 'jay', 'henry', 'randolph'],
  laporte: ['porter', 'lake', 'starke', 'st-joseph', 'elkhart', 'newton'],
  vigo: ['parke', 'vermillion', 'clay', 'sullivan', 'greene', 'putnam'],
  hancock: ['marion', 'hamilton', 'madison', 'rush', 'shelby', 'henry'],
  bartholomew: ['johnson', 'brown', 'jennings', 'decatur', 'shelby', 'jackson'],
  howard: ['tipton', 'grant', 'miami', 'cass', 'carroll', 'clinton'],
  boone: ['marion', 'hamilton', 'hendricks', 'montgomery', 'clinton', 'tippecanoe'],
  floyd: ['clark', 'washington', 'scott', 'jefferson'],
  kosciusko: ['st-joseph', 'elkhart', 'marshall', 'noble', 'whitley', 'lagrange'],
  morgan: ['marion', 'johnson', 'hendricks', 'monroe', 'owen', 'putnam'],
  warrick: ['vanderburgh', 'spencer', 'dubois', 'pike', 'gibson'],
  grant: ['madison', 'delaware', 'howard', 'blackford', 'jay', 'wells'],
  wayne: ['henry', 'randolph', 'union', 'fayette', 'delaware', 'jay'],
  dearborn: ['ohio', 'ripley', 'franklin', 'switzerland', 'decatur', 'jennings'],
  henry: ['madison', 'delaware', 'rush', 'hancock', 'wayne', 'randolph'],
  noble: ['allen', 'dekalb', 'lagrange', 'elkhart', 'kosciusko', 'whitley'],
  jackson: ['bartholomew', 'jennings', 'scott', 'washington', 'brown', 'monroe'],
  marshall: ['st-joseph', 'kosciusko', 'starke', 'pulaski', 'fulton', 'elkhart'],
  shelby: ['marion', 'johnson', 'hancock', 'rush', 'decatur', 'bartholomew'],
  lawrence: ['monroe', 'jackson', 'orange', 'martin', 'washington', 'greene'],
  dekalb: ['noble', 'allen', 'steuben', 'lagrange', 'kosciusko', 'whitley'],
  dubois: ['pike', 'martin', 'orange', 'spencer', 'warrick', 'knox'],
  lagrange: ['elkhart', 'noble', 'steuben', 'kosciusko', 'st-joseph', 'dekalb'],
  harrison: ['floyd', 'crawford', 'washington', 'scott', 'jefferson', 'perry'],
  montgomery: ['tippecanoe', 'boone', 'putnam', 'parke', 'fountain', 'clinton'],
  putnam: ['hendricks', 'morgan', 'montgomery', 'clay', 'parke', 'owen'],
  cass: ['miami', 'howard', 'carroll', 'pulaski', 'white', 'fulton'],
  huntington: ['whitley', 'allen', 'wells', 'wabash', 'grant', 'dekalb'],
  adams: ['allen', 'wells', 'jay', 'dekalb', 'huntington', 'noble'],
  knox: ['sullivan', 'greene', 'pike', 'gibson', 'warrick', 'dubois'],
  whitley: ['kosciusko', 'huntington', 'noble', 'allen', 'dekalb', 'marshall'],
  steuben: ['dekalb', 'noble', 'lagrange', 'elkhart', 'kosciusko', 'allen'],
  miami: ['cass', 'howard', 'grant', 'wabash', 'fulton', 'carroll'],
};

export function getIndianaNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = IN_COUNTY_NEIGHBORS[countySlug];
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
      href: `/local-movers/indiana/${slug}`,
    }));
}