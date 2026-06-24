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
  putnam: ['kanawha', 'cabell', 'lincoln', 'jackson', 'mason', 'boone'],
  marion: ['harrison', 'monongalia', 'preston', 'taylor', 'wetzel', 'barbour'],
  ohio: ['marshall', 'brooke', 'hancock', 'wetzel', 'tyler', 'pleasants'],
  fayette: ['kanawha', 'raleigh', 'nicholas', 'greenbrier', 'summers', 'wyoming'],
  wayne: ['cabell', 'lincoln', 'mingo', 'logan', 'boone', 'mcdowell'],
  preston: ['monongalia', 'marion', 'taylor', 'tucker', 'grant', 'barbour'],
  greenbrier: ['fayette', 'monroe', 'pocahontas', 'summers', 'nicholas', 'webster'],
  logan: ['wayne', 'lincoln', 'boone', 'mingo', 'wyoming', 'mcdowell'],
  marshall: ['ohio', 'wetzel', 'tyler', 'pleasants', 'hancock', 'brooke'],
  hancock: ['marshall', 'brooke', 'ohio', 'wetzel', 'pleasants'],
  jackson: ['kanawha', 'putnam', 'mason', 'wood', 'roane', 'wirt'],
  mineral: ['berkeley', 'jefferson', 'hampshire', 'grant', 'hardy', 'preston'],
  randolph: ['pendleton', 'pocahontas', 'webster', 'upshur', 'barbour', 'tucker'],
  mason: ['jackson', 'putnam', 'cabell', 'pleasants', 'wood', 'roane'],
  hampshire: ['berkeley', 'jefferson', 'mineral', 'hardy', 'morgan', 'grant'],
  upshur: ['barbour', 'lewis', 'randolph', 'webster', 'braxton', 'harrison'],
  nicholas: ['kanawha', 'fayette', 'greenbrier', 'webster', 'clay', 'raleigh'],
  mingo: ['wayne', 'logan', 'mcdowell', 'wyoming', 'boone', 'lincoln'],
  brooke: ['hancock', 'ohio', 'marshall', 'wetzel', 'jefferson'],
  boone: ['kanawha', 'lincoln', 'logan', 'wyoming', 'raleigh', 'mingo'],
  wyoming: ['mcdowell', 'raleigh', 'mercer', 'boone', 'mingo', 'logan'],
  lincoln: ['cabell', 'wayne', 'putnam', 'kanawha', 'boone', 'logan'],
  morgan: ['berkeley', 'hampshire', 'hardy', 'jefferson', 'mineral', 'grant'],
  mcdowell: ['mercer', 'wyoming', 'mingo', 'boone', 'raleigh', 'logan'],
  lewis: ['harrison', 'upshur', 'gilmer', 'braxton', 'webster', 'doddridge'],
  taylor: ['marion', 'harrison', 'barbour', 'preston', 'randolph', 'upshur'],
  barbour: ['harrison', 'upshur', 'randolph', 'taylor', 'preston', 'grant'],
  hardy: ['hampshire', 'grant', 'pendleton', 'mineral', 'morgan'],
  wetzel: ['tyler', 'marshall', 'ohio', 'pleasants', 'doddridge', 'monongalia'],
  roane: ['kanawha', 'jackson', 'clay', 'calhoun', 'wirt', 'mason'],
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