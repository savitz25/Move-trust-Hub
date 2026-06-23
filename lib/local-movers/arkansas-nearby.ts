import { generatedCounties } from '@/data/generated/index';
import { applyArkansasCountyOverrides } from '@/lib/local-movers/geography/arkansas-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const arkansasCounties = generatedCounties
  .filter((c) => c.stateSlug === 'arkansas')
  .map(applyArkansasCountyOverrides);
const countyNameBySlug = new Map(arkansasCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated AR county pages — expands as counties are researched */
const AR_COUNTY_NEIGHBORS: Record<string, string[]> = {
  pulaski: ['saline', 'lonoke', 'faulkner', 'jefferson', 'grant', 'perry'],
  benton: ['washington', 'carroll', 'madison', 'crawford', 'sebastian', 'newton'],
  washington: ['benton', 'madison', 'crawford', 'franklin', 'johnson', 'newton'],
  faulkner: ['pulaski', 'white', 'van-buren', 'cleburne', 'perry', 'lonoke'],
  saline: ['pulaski', 'grant', 'garland', 'hot-spring', 'perry', 'jefferson'],
  sebastian: ['crawford', 'franklin', 'scott', 'logan', 'benton', 'washington'],
  craighead: ['greene', 'poinsett', 'jackson', 'cross', 'lawrence', 'randolph'],
  garland: ['saline', 'hot-spring', 'perry', 'montgomery', 'yell', 'grant'],
  white: ['faulkner', 'cleburne', 'independence', 'jackson', 'woodruff', 'prairie'],
  lonoke: ['pulaski', 'faulkner', 'white', 'prairie', 'arkansas', 'jefferson'],
  pope: ['johnson', 'newton', 'van-buren', 'conway', 'yell', 'logan'],
  crawford: ['sebastian', 'washington', 'franklin', 'logan', 'scott', 'benton'],
  jefferson: ['pulaski', 'lonoke', 'arkansas', 'lincoln', 'cleveland', 'grant'],
  greene: ['craighead', 'clay', 'randolph', 'lawrence', 'sharp', 'jackson'],
  crittenden: ['mississippi', 'st-francis', 'cross', 'lee', 'craighead', 'greene'],
  baxter: ['marion', 'fulton', 'izard', 'stone', 'searcy', 'newton'],
  miller: ['little-river', 'lafayette', 'hempstead', 'nevada', 'caddo', 'sebastian'],
  independence: ['white', 'cleburne', 'sharp', 'izard', 'stone', 'jackson'],
  boone: ['carroll', 'newton', 'marion', 'searcy', 'baxter', 'madison'],
  mississippi: ['crittenden', 'cross', 'poinsett', 'craighead', 'greene', 'lee'],
  union: ['columbia', 'ouachita', 'ashley', 'bradley', 'calhoun', 'chicot'],
  'hot-spring': ['garland', 'saline', 'grant', 'clark', 'dallas', 'jefferson'],
  carroll: ['boone', 'benton', 'madison', 'newton', 'washington', 'marion'],
  johnson: ['pope', 'newton', 'franklin', 'logan', 'yell', 'conway'],
  cleburne: ['white', 'independence', 'faulkner', 'van-buren', 'stone', 'jackson'],
  poinsett: ['craighead', 'cross', 'mississippi', 'jackson', 'woodruff', 'greene'],
  columbia: ['union', 'lafayette', 'hempstead', 'nevada', 'ouachita', 'calhoun'],
  logan: ['pope', 'johnson', 'yell', 'scott', 'franklin', 'sebastian'],
  'st-francis': ['crittenden', 'lee', 'cross', 'monroe', 'phillips', 'woodruff'],
  ouachita: ['union', 'columbia', 'calhoun', 'dallas', 'nevada', 'clark'],
  conway: ['pope', 'van-buren', 'faulkner', 'perry', 'yell', 'johnson'],
  clark: ['hot-spring', 'garland', 'pike', 'hempstead', 'nevada', 'dallas'],
  yell: ['pope', 'logan', 'johnson', 'perry', 'garland', 'montgomery'],
  polk: ['scott', 'sebastian', 'howard', 'montgomery', 'crawford', 'logan'],
};

export function getArkansasNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = AR_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = arkansasCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}