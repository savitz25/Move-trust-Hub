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
  cottle: ['childress', 'hardeman', 'foard', 'king', 'motley', 'dickens'],
  edwards: ['kinney', 'real', 'val-verde', 'kerr', 'uvalde', 'bandera'],
  foard: ['knox', 'king', 'hardeman', 'wilbarger', 'baylor', 'cottle'],
  glasscock: ['midland', 'reagan', 'sterling', 'upton', 'crockett', 'mitchell'],
  irion: ['tom-green', 'schleicher', 'crockett', 'sterling', 'reagan', 'concho'],
  kenedy: ['kleberg', 'brooks', 'willacy', 'hidalgo', 'jim-wells'],
  king: ['dickens', 'knox', 'stonewall', 'haskell', 'throckmorton', 'foard'],
  loving: ['winkler', 'ward', 'reeves', 'ector', 'andrews'],
  sterling: ['glasscock', 'irion', 'tom-green', 'reagan', 'mitchell', 'coke'],
  stonewall: ['king', 'haskell', 'jones', 'fisher', 'kent', 'throckmorton'],
  throckmorton: ['haskell', 'stonewall', 'young', 'stephens', 'shackelford', 'king'],
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