import { generatedCounties } from '@/data/generated/index';
import { applyWestVirginiaCountyOverrides } from '@/lib/local-movers/geography/west-virginia-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const westVirginiaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'west-virginia')
  .map(applyWestVirginiaCountyOverrides);
const countyNameBySlug = new Map(westVirginiaCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated WV county pages — expands as counties are researched */
const WV_COUNTY_NEIGHBORS: Record<string, string[]> = {
  kanawha: ['boone', 'clay', 'fayette', 'jackson', 'lincoln', 'putnam', 'nicholas', 'roane'],
  berkeley: ['jefferson', 'morgan', 'hampshire', 'mineral', 'grant', 'hardy'],
  monongalia: ['preston', 'marion', 'taylor', 'wetzel', 'harrison', 'tyler'],
  cabell: ['wayne', 'lincoln', 'putnam', 'mason', 'jackson', 'logan'],
  wood: ['pleasants', 'wirt', 'jackson', 'ritchie', 'tyler', 'calhoun'],
  raleigh: ['fayette', 'wyoming', 'summers', 'mercer', 'nicholas', 'boone'],
  jefferson: ['berkeley', 'morgan', 'hampshire', 'grant', 'hardy', 'mineral'],
  harrison: ['doddridge', 'lewis', 'gilmer', 'marion', 'taylor', 'barbour', 'upshur'],
  mercer: ['raleigh', 'wyoming', 'summers', 'mcdowell', 'monroe', 'mingo'],
};

export function getWestVirginiaNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = WV_COUNTY_NEIGHBORS[countySlug];
  if (!neighbors) return [];

  return neighbors
    .filter((slug) => countyNameBySlug.has(slug))
    .map((slug) => ({
      slug,
      name: countyNameBySlug.get(slug)!,
      href: `/local-movers/west-virginia/${slug}`,
    }));
}