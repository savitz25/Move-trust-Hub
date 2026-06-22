import { generatedCounties } from '@/data/generated/index';
import { applyTexasCountyOverrides } from '@/lib/local-movers/geography/texas-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const texasCounties = generatedCounties
  .filter((c) => c.stateSlug === 'texas')
  .map(applyTexasCountyOverrides);
const countyNameBySlug = new Map(texasCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for internal linking on curated TX county pages */
const TX_COUNTY_NEIGHBORS: Record<string, string[]> = {
  armstrong: ['briscoe', 'donley', 'randall', 'carson', 'potter', 'swisher'],
  borden: ['howard', 'mitchell', 'dawson', 'garza', 'scurry', 'fisher'],
  briscoe: ['armstrong', 'donley', 'hall', 'swisher', 'floyd', 'motley'],
  cochran: ['hockley', 'yoakum', 'bailey', 'lamb', 'terry', 'gaines'],
  coke: ['sterling', 'mitchell', 'nolan', 'runnels', 'tom-green', 'irion'],
  collingsworth: ['childress', 'donley', 'hall', 'gray', 'wheeler', 'hardeman'],
  crockett: ['irion', 'reagan', 'upton', 'val-verde', 'sutton', 'schleicher'],
  cottle: ['childress', 'hardeman', 'foard', 'king', 'motley', 'dickens'],
  culberson: ['hudspeth', 'jeff-davis', 'reeves', 'el-paso', 'presidio'],
  dickens: ['king', 'kent', 'stonewall', 'haskell', 'crosby', 'garza'],
  donley: ['armstrong', 'briscoe', 'hall', 'gray', 'collingsworth', 'childress'],
  edwards: ['kinney', 'real', 'val-verde', 'kerr', 'uvalde', 'bandera'],
  foard: ['knox', 'king', 'hardeman', 'wilbarger', 'baylor', 'cottle'],
  glasscock: ['midland', 'reagan', 'sterling', 'upton', 'crockett', 'mitchell'],
  hall: ['donley', 'childress', 'collingsworth', 'gray', 'motley', 'briscoe'],
  irion: ['tom-green', 'schleicher', 'crockett', 'sterling', 'reagan', 'concho'],
  'jeff-davis': ['brewster', 'pecos', 'presidio', 'reeves', 'culberson'],
  kenedy: ['kleberg', 'brooks', 'willacy', 'hidalgo', 'jim-wells'],
  kinney: ['edwards', 'real', 'val-verde', 'maverick', 'uvalde', 'kerr'],
  lipscomb: ['ochiltree', 'hansford', 'hemphill', 'roberts', 'wheeler', 'collingsworth'],
  king: ['dickens', 'knox', 'stonewall', 'haskell', 'throckmorton', 'foard'],
  loving: ['winkler', 'ward', 'reeves', 'ector', 'andrews'],
  menard: ['kimble', 'mason', 'mcculloch', 'concho', 'schleicher', 'sutton'],
  oldham: ['hartley', 'deaf-smith', 'potter', 'randall', 'moore', 'hutchinson'],
  real: ['edwards', 'bandera', 'kerr', 'uvalde', 'val-verde', 'kendall'],
  reagan: ['upton', 'crockett', 'irion', 'sterling', 'tom-green', 'glasscock'],
  schleicher: ['irion', 'sutton', 'tom-green', 'crockett', 'menard', 'kimble'],
  shackelford: ['throckmorton', 'stephens', 'young', 'callahan', 'haskell', 'eastland'],
  sutton: ['kimble', 'edwards', 'crockett', 'schleicher', 'menard', 'val-verde'],
  sherman: ['hansford', 'moore', 'dallam', 'hartley', 'hutchinson', 'oldham'],
  sterling: ['glasscock', 'irion', 'tom-green', 'reagan', 'mitchell', 'coke'],
  stonewall: ['king', 'haskell', 'jones', 'fisher', 'kent', 'throckmorton'],
  throckmorton: ['haskell', 'stonewall', 'young', 'stephens', 'shackelford', 'king'],
  upton: ['crane', 'reagan', 'glasscock', 'crockett', 'midland', 'ector'],
};

export function getTexasNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = TX_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = texasCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    })
    .filter(
      (c) =>
        countyNameBySlug.has(c.slug) ||
        texasCounties.some((tx) => tx.slug === c.slug)
    );
}