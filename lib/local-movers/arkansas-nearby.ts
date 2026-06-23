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
  grant: ['saline', 'jefferson', 'hot-spring', 'pulaski', 'dallas', 'clark'],
  hempstead: ['nevada', 'lafayette', 'columbia', 'little-river', 'miller', 'pike'],
  randolph: ['clay', 'greene', 'lawrence', 'sharp', 'independence', 'fulton'],
  madison: ['washington', 'benton', 'newton', 'carroll', 'johnson', 'franklin'],
  sharp: ['independence', 'izard', 'stone', 'randolph', 'fulton', 'cleburne'],
  franklin: ['johnson', 'logan', 'crawford', 'sebastian', 'madison', 'pope'],
  ashley: ['union', 'chicot', 'bradley', 'drew', 'grant', 'desha'],
  marion: ['baxter', 'boone', 'newton', 'searcy', 'stone', 'fulton'],
  drew: ['ashley', 'bradley', 'chicot', 'lincoln', 'jefferson', 'desha'],
  jackson: ['independence', 'woodruff', 'poinsett', 'cross', 'sharp', 'lawrence'],
  lawrence: ['randolph', 'sharp', 'greene', 'craighead', 'independence', 'jackson'],
  'van-buren': ['cleburne', 'faulkner', 'stone', 'pope', 'conway', 'independence'],
  cross: ['craighead', 'poinsett', 'mississippi', 'st-francis', 'jackson', 'woodruff'],
  sevier: ['polk', 'howard', 'little-river', 'hempstead', 'pike', 'miller'],
  arkansas: ['lonoke', 'jefferson', 'monroe', 'prairie', 'desha', 'phillips'],
  izard: ['fulton', 'sharp', 'stone', 'baxter', 'randolph', 'independence'],
  clay: ['randolph', 'greene', 'craighead', 'sharp', 'lawrence', 'fulton'],
  phillips: ['lee', 'monroe', 'arkansas', 'desha', 'st-francis', 'crittenden'],
  stone: ['izard', 'independence', 'cleburne', 'van-buren', 'searcy', 'fulton'],
  lincoln: ['drew', 'jefferson', 'cleveland', 'arkansas', 'bradley', 'desha'],
  fulton: ['izard', 'sharp', 'randolph', 'stone', 'baxter', 'marion'],
  howard: ['sevier', 'polk', 'pike', 'little-river', 'miller', 'hempstead'],
  'little-river': ['miller', 'hempstead', 'sevier', 'howard', 'pike', 'polk'],
  perry: ['saline', 'pulaski', 'garland', 'yell', 'conway', 'faulkner'],
  scott: ['polk', 'logan', 'sebastian', 'montgomery', 'yell', 'howard'],
  pike: ['clark', 'hempstead', 'nevada', 'montgomery', 'howard', 'polk'],
  desha: ['arkansas', 'chicot', 'ashley', 'jefferson', 'lincoln', 'bolivar'],
  bradley: ['union', 'columbia', 'calhoun', 'drew', 'ashley', 'ouachita'],
  chicot: ['desha', 'ashley', 'lincoln', 'drew', 'jefferson', 'phillips'],
  montgomery: ['polk', 'scott', 'pike', 'garland', 'yell', 'hot-spring'],
  lee: ['phillips', 'st-francis', 'monroe', 'crittenden', 'cross', 'woodruff'],
  prairie: ['lonoke', 'white', 'arkansas', 'monroe', 'woodruff', 'jackson'],
  nevada: ['hempstead', 'clark', 'pike', 'columbia', 'lafayette', 'ouachita'],
  searcy: ['marion', 'boone', 'newton', 'stone', 'van-buren', 'baxter'],
  cleveland: ['jefferson', 'lincoln', 'drew', 'grant', 'bradley', 'calhoun'],
  newton: ['johnson', 'pope', 'madison', 'carroll', 'boone', 'searcy'],
  monroe: ['arkansas', 'phillips', 'lee', 'prairie', 'woodruff', 'st-francis'],
  dallas: ['calhoun', 'ouachita', 'columbia', 'union', 'bradley', 'clark'],
  lafayette: ['miller', 'columbia', 'hempstead', 'nevada', 'little-river', 'ouachita'],
  woodruff: ['jackson', 'prairie', 'cross', 'st-francis', 'monroe', 'white'],
  calhoun: ['bradley', 'columbia', 'ouachita', 'union', 'dallas', 'cleveland'],
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