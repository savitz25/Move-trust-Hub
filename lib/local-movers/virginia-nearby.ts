import { generatedCounties } from '@/data/generated/index';
import { applyVirginiaCountyOverrides } from '@/lib/local-movers/geography/virginia-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const virginiaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'virginia')
  .map(applyVirginiaCountyOverrides);
const countyNameBySlug = new Map(virginiaCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated VA county pages — expands as counties are researched */
const VA_COUNTY_NEIGHBORS: Record<string, string[]> = {
  fairfax: [
    'loudoun',
    'prince-william',
    'arlington',
    'alexandria',
    'falls-church',
    'fairfax-city',
    'fauquier',
  ],
  'prince-william': [
    'fairfax',
    'loudoun',
    'fauquier',
    'stafford',
    'arlington',
    'fairfax-city',
  ],
  loudoun: [
    'fairfax',
    'prince-william',
    'fauquier',
    'clarke',
    'warren',
    'fairfax-city',
  ],
  'virginia-beach': [
    'norfolk',
    'chesapeake',
    'suffolk',
    'hampton',
    'portsmouth',
  ],
  chesterfield: [
    'richmond',
    'henrico',
    'powhatan',
    'dinwiddie',
    'hopewell',
  ],
  henrico: [
    'richmond',
    'chesterfield',
    'hanover',
    'goochland',
    'richmond-county',
  ],
  chesapeake: [
    'virginia-beach',
    'norfolk',
    'suffolk',
    'portsmouth',
    'newport-news',
  ],
  arlington: [
    'fairfax',
    'alexandria',
    'falls-church',
    'fairfax-city',
    'prince-william',
  ],
  richmond: [
    'henrico',
    'chesterfield',
    'hanover',
    'goochland',
  ],
  norfolk: [
    'virginia-beach',
    'chesapeake',
    'portsmouth',
    'hampton',
    'newport-news',
  ],
  'newport-news': [
    'norfolk',
    'hampton',
    'york',
    'james-city',
    'portsmouth',
  ],
  stafford: [
    'prince-william',
    'fredericksburg',
    'spotsylvania',
    'king-george',
    'fauquier',
  ],
  alexandria: [
    'arlington',
    'fairfax',
    'falls-church',
    'prince-william',
    'fairfax-city',
  ],
  spotsylvania: [
    'stafford',
    'fredericksburg',
    'caroline',
    'orange',
    'culpeper',
    'louisa',
  ],
  hampton: [
    'newport-news',
    'norfolk',
    'york',
    'portsmouth',
    'virginia-beach',
  ],
  albemarle: [
    'charlottesville',
    'greene',
    'nelson',
    'buckingham',
    'orange',
    'fluvanna',
  ],
  hanover: [
    'richmond',
    'henrico',
    'chesterfield',
    'goochland',
    'caroline',
    'king-william',
  ],
  suffolk: [
    'chesapeake',
    'virginia-beach',
    'isle-of-wight',
    'southampton',
    'franklin-city',
  ],
  frederick: [
    'winchester',
    'warren',
    'clarke',
    'shenandoah',
    'page',
  ],
  roanoke: [
    'roanoke-county',
    'botetourt',
    'craig',
    'bedford',
    'montgomery',
  ],
  montgomery: [
    'roanoke',
    'pulaski',
    'giles',
    'radford',
    'floyd',
  ],
  'roanoke-county': [
    'roanoke',
    'montgomery',
    'botetourt',
    'craig',
    'bedford',
  ],
  portsmouth: [
    'norfolk',
    'chesapeake',
    'suffolk',
    'hampton',
    'virginia-beach',
  ],
  rockingham: [
    'augusta',
    'page',
    'greene',
    'albemarle',
    'harrisonburg',
  ],
  'james-city': [
    'york',
    'williamsburg',
    'newport-news',
    'charles-city',
    'gloucester',
  ],
  bedford: [
    'lynchburg',
    'campbell',
    'franklin',
    'roanoke-county',
    'pittsylvania',
  ],
  lynchburg: [
    'campbell',
    'bedford',
    'amherst',
    'appomattox',
    'henry',
  ],
  augusta: [
    'staunton',
    'waynesboro',
    'rockingham',
    'nelson',
    'bath',
  ],
  fauquier: [
    'loudoun',
    'prince-william',
    'culpeper',
    'rappahannock',
    'warren',
  ],
  york: [
    'james-city',
    'williamsburg',
    'newport-news',
    'poquoson',
    'hampton',
  ],
  pittsylvania: [
    'danville',
    'henry',
    'campbell',
    'bedford',
    'halifax',
  ],
  culpeper: [
    'fauquier',
    'orange',
    'madison',
    'rappahannock',
    'spotsylvania',
  ],
  campbell: [
    'lynchburg',
    'bedford',
    'pittsylvania',
    'appomattox',
    'amherst',
  ],
  franklin: [
    'pittsylvania',
    'henry',
    'bedford',
    'roanoke-county',
    'campbell',
  ],
};

export function getVirginiaNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = VA_COUNTY_NEIGHBORS[countySlug];
  if (!neighbors) return [];

  return neighbors
    .filter((slug) => countyNameBySlug.has(slug))
    .map((slug) => ({
      slug,
      name: countyNameBySlug.get(slug)!,
      href: `/local-movers/virginia/${slug}`,
    }));
}