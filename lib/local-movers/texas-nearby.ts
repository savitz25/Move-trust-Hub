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
  bailey: ['parmer', 'lamb', 'cochran', 'hockley', 'yoakum', 'castro'],
  baylor: ['archer', 'clay', 'foard', 'knox', 'wilbarger', 'childress'],
  borden: ['howard', 'mitchell', 'dawson', 'garza', 'scurry', 'fisher'],
  briscoe: ['armstrong', 'donley', 'hall', 'swisher', 'floyd', 'motley'],
  carson: ['armstrong', 'potter', 'randall', 'hutchinson', 'gray', 'moore'],
  cochran: ['hockley', 'yoakum', 'bailey', 'lamb', 'terry', 'gaines'],
  coke: ['sterling', 'mitchell', 'nolan', 'runnels', 'tom-green', 'irion'],
  collingsworth: ['childress', 'donley', 'hall', 'gray', 'wheeler', 'hardeman'],
  concho: ['menard', 'mcculloch', 'tom-green', 'runnels', 'coleman', 'brown'],
  crane: ['upton', 'ector', 'ward', 'reagan', 'pecos', 'andrews'],
  crockett: ['irion', 'reagan', 'upton', 'val-verde', 'sutton', 'schleicher'],
  crosby: ['floyd', 'dickens', 'garza', 'lubbock', 'kent', 'king'],
  childress: ['hall', 'collingsworth', 'hardeman', 'cottle', 'donley', 'baylor'],
  cottle: ['childress', 'hardeman', 'foard', 'king', 'motley', 'dickens'],
  culberson: ['hudspeth', 'jeff-davis', 'reeves', 'el-paso', 'presidio'],
  delta: ['hopkins', 'lamar', 'fannin', 'hunt', 'franklin', 'red-river'],
  dickens: ['king', 'kent', 'stonewall', 'haskell', 'crosby', 'garza'],
  donley: ['armstrong', 'briscoe', 'hall', 'gray', 'collingsworth', 'childress'],
  edwards: ['kinney', 'real', 'val-verde', 'kerr', 'uvalde', 'bandera'],
  fisher: ['jones', 'nolan', 'mitchell', 'scurry', 'stonewall', 'haskell'],
  floyd: ['crosby', 'motley', 'swisher', 'briscoe', 'hale', 'lubbock'],
  foard: ['knox', 'king', 'hardeman', 'wilbarger', 'baylor', 'cottle'],
  garza: ['borden', 'lynn', 'crosby', 'dickens', 'kent', 'scurry'],
  glasscock: ['midland', 'reagan', 'sterling', 'upton', 'crockett', 'mitchell'],
  goliad: ['victoria', 'refugio', 'bee', 'karnes', 'dewitt', 'calhoun'],
  hall: ['donley', 'childress', 'collingsworth', 'gray', 'motley', 'briscoe'],
  hardeman: ['childress', 'foard', 'wilbarger', 'cottle', 'collingsworth', 'baylor'],
  hartley: ['oldham', 'sherman', 'moore', 'dallam', 'deaf-smith', 'hutchinson'],
  haskell: ['stonewall', 'throckmorton', 'knox', 'king', 'jones', 'shackelford'],
  hansford: ['hutchinson', 'ochiltree', 'lipscomb', 'moore', 'sherman', 'roberts'],
  hemphill: ['lipscomb', 'roberts', 'wheeler', 'collingsworth', 'ochiltree', 'gray'],
  hudspeth: ['culberson', 'el-paso', 'jeff-davis', 'presidio', 'reeves'],
  irion: ['tom-green', 'schleicher', 'crockett', 'sterling', 'reagan', 'concho'],
  'jeff-davis': ['brewster', 'pecos', 'presidio', 'reeves', 'culberson'],
  'jim-hogg': ['webb', 'duval', 'brooks', 'zapata', 'starr', 'kenedy'],
  kenedy: ['kleberg', 'brooks', 'willacy', 'hidalgo', 'jim-wells'],
  kimble: ['edwards', 'sutton', 'mason', 'kerr', 'gillespie', 'menard'],
  kinney: ['edwards', 'real', 'val-verde', 'maverick', 'uvalde', 'kerr'],
  knox: ['king', 'baylor', 'foard', 'haskell', 'stonewall', 'throckmorton'],
  lipscomb: ['ochiltree', 'hansford', 'hemphill', 'roberts', 'wheeler', 'collingsworth'],
  king: ['dickens', 'knox', 'stonewall', 'haskell', 'throckmorton', 'foard'],
  'la-salle': ['webb', 'mcmullen', 'frio', 'dimmit', 'zavala', 'atascosa'],
  loving: ['winkler', 'ward', 'reeves', 'ector', 'andrews'],
  lynn: ['lubbock', 'garza', 'dickens', 'crosby', 'gaines', 'borden'],
  martin: ['midland', 'glasscock', 'howard', 'dawson', 'gaines', 'andrews'],
  mills: ['brown', 'comanche', 'hamilton', 'lampasas', 'san-saba', 'mcculloch'],
  mason: ['menard', 'kimble', 'llano', 'gillespie', 'mcculloch', 'san-saba'],
  menard: ['kimble', 'mason', 'mcculloch', 'concho', 'schleicher', 'sutton'],
  oldham: ['hartley', 'deaf-smith', 'potter', 'randall', 'moore', 'hutchinson'],
  presidio: ['jeff-davis', 'brewster', 'el-paso', 'culberson', 'hudspeth', 'reeves'],
  real: ['edwards', 'bandera', 'kerr', 'uvalde', 'val-verde', 'kendall'],
  reagan: ['upton', 'crockett', 'irion', 'sterling', 'tom-green', 'glasscock'],
  refugio: ['victoria', 'goliad', 'aransas', 'san-patricio', 'bee', 'calhoun'],
  schleicher: ['irion', 'sutton', 'tom-green', 'crockett', 'menard', 'kimble'],
  shackelford: ['throckmorton', 'stephens', 'young', 'callahan', 'haskell', 'eastland'],
  'san-saba': ['mills', 'mason', 'mcculloch', 'brown', 'lampasas', 'llano'],
  sutton: ['kimble', 'edwards', 'crockett', 'schleicher', 'menard', 'val-verde'],
  sherman: ['hansford', 'moore', 'dallam', 'hartley', 'hutchinson', 'oldham'],
  sterling: ['glasscock', 'irion', 'tom-green', 'reagan', 'mitchell', 'coke'],
  stonewall: ['king', 'haskell', 'jones', 'fisher', 'kent', 'throckmorton'],
  throckmorton: ['haskell', 'stonewall', 'young', 'stephens', 'shackelford', 'king'],
  upton: ['crane', 'reagan', 'glasscock', 'crockett', 'midland', 'ector'],
  wheeler: ['hemphill', 'collingsworth', 'donley', 'gray', 'carson', 'motley'],
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