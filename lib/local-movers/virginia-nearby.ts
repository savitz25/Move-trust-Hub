import { generatedCounties } from '@/data/generated/index';
import { applyVirginiaCountyOverrides } from '@/lib/local-movers/geography/virginia-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const virginiaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'virginia')
  .map(applyVirginiaCountyOverrides);
const countyNameBySlug = new Map(virginiaCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated VA county pages â€” expands as counties are researched */
const VA_COUNTY_NEIGHBORS: Record<string, string[]> = {
  'fairfax-city': [
    'fairfax',
    'arlington',
    'alexandria',
    'falls-church',
    'prince-william',
  ],
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
  'bedford-city': [
    'bedford',
    'lynchburg',
    'campbell',
    'franklin',
    'roanoke-county',
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
  washington: [
    'scott',
    'russell',
    'bristol',
    'smyth',
    'grayson',
  ],
  harrisonburg: [
    'rockingham',
    'augusta',
    'page',
    'greene',
    'albemarle',
  ],
  henry: [
    'martinsville',
    'pittsylvania',
    'franklin',
    'patrick',
    'danville',
  ],
  shenandoah: [
    'warren',
    'frederick',
    'page',
    'rockingham',
    'clarke',
  ],
  manassas: [
    'prince-william',
    'fairfax',
    'loudoun',
    'fauquier',
    'stafford',
  ],
  charlottesville: [
    'albemarle',
    'greene',
    'nelson',
    'orange',
    'fluvanna',
  ],
  'prince-george': [
    'chesterfield',
    'hopewell',
    'dinwiddie',
    'surry',
    'colonial-heights',
  ],
  louisa: [
    'spotsylvania',
    'orange',
    'goochland',
    'fluvanna',
    'hanover',
  ],
  warren: [
    'frederick',
    'shenandoah',
    'fauquier',
    'clarke',
    'loudoun',
  ],
  'isle-of-wight': [
    'suffolk',
    'southampton',
    'franklin-city',
    'newport-news',
    'portsmouth',
  ],
  danville: [
    'pittsylvania',
    'henry',
    'halifax',
    'campbell',
    'martinsville',
  ],
  orange: [
    'culpeper',
    'spotsylvania',
    'louisa',
    'madison',
    'greene',
  ],
  gloucester: [
    'james-city',
    'york',
    'mathews',
    'middlesex',
    'king-and-queen',
  ],
  tazewell: [
    'buchanan',
    'smyth',
    'russell',
    'bland',
    'wise',
  ],
  caroline: [
    'spotsylvania',
    'hanover',
    'king-george',
    'essex',
    'louisa',
  ],
  wise: [
    'dickenson',
    'buchanan',
    'lee',
    'scott',
    'norton',
  ],
  botetourt: [
    'roanoke',
    'roanoke-county',
    'craig',
    'rockbridge',
    'alleghany',
  ],
  accomack: [
    'northampton',
    'mathews',
    'gloucester',
    'james-city',
    'virginia-beach',
  ],
  pulaski: [
    'montgomery',
    'radford',
    'carroll',
    'wythe',
    'giles',
  ],
  petersburg: [
    'dinwiddie',
    'prince-george',
    'colonial-heights',
    'hopewell',
    'chesterfield',
  ],
  halifax: [
    'pittsylvania',
    'campbell',
    'mecklenburg',
    'charlotte',
    'danville',
  ],
  powhatan: [
    'chesterfield',
    'goochland',
    'cumberland',
    'amelia',
    'richmond',
  ],
  amherst: [
    'lynchburg',
    'bedford',
    'nelson',
    'appomattox',
    'rockbridge',
  ],
  fredericksburg: [
    'spotsylvania',
    'stafford',
    'king-george',
    'caroline',
    'culpeper',
  ],
  mecklenburg: [
    'halifax',
    'brunswick',
    'lunenburg',
    'charlotte',
    'pittsylvania',
  ],
  'king-george': [
    'stafford',
    'caroline',
    'westmoreland',
    'spotsylvania',
    'fredericksburg',
  ],
  goochland: [
    'powhatan',
    'henrico',
    'richmond',
    'cumberland',
    'louisa',
  ],
  carroll: [
    'grayson',
    'wythe',
    'pulaski',
    'patrick',
    'floyd',
  ],
  fluvanna: [
    'albemarle',
    'louisa',
    'goochland',
    'buckingham',
    'charlottesville',
  ],
  dinwiddie: [
    'petersburg',
    'prince-george',
    'chesterfield',
    'sussex',
    'greensville',
  ],
  'new-kent': [
    'king-william',
    'charles-city',
    'henrico',
    'richmond',
    'james-city',
  ],
  'colonial-heights': [
    'petersburg', 'hopewell', 'chesterfield', 'prince-george', 'dinwiddie'
  ],
  buchanan: [
    'dickenson', 'wise', 'tazewell', 'russell', 'mcdowell'
  ],
  southampton: [
    'isle-of-wight', 'suffolk', 'franklin-city', 'greensville', 'sussex'
  ],
  patrick: [
    'carroll', 'henry', 'floyd', 'stuart', 'martinsville'
  ],
  appomattox: [
    'lynchburg', 'campbell', 'amherst', 'bedford', 'buckingham'
  ],
  radford: [
    'montgomery', 'pulaski', 'giles', 'christiansburg', 'wythe'
  ],
  buckingham: [
    'appomattox', 'nelson', 'fluvanna', 'cumberland', 'amherst'
  ],
  'manassas-park': [
    'manassas', 'prince-william', 'fairfax', 'loudoun', 'stafford'
  ],
  giles: [
    'pulaski', 'montgomery', 'bland', 'mercer', 'tazewell'
  ],
  bristol: [
    'washington', 'scott', 'sullivan', 'wise', 'abingdon'
  ],
  nottoway: [
    'amelia', 'lunenburg', 'prince-edward', 'dinwiddie', 'chesterfield'
  ],
  floyd: [
    'carroll', 'patrick', 'montgomery', 'pulaski', 'roanoke'
  ],
  williamsburg: [
    'james-city', 'york', 'newport-news', 'charles-city', 'gloucester'
  ],
  brunswick: [
    'greensville', 'lunenburg', 'mecklenburg', 'halifax', 'nottoway'
  ],
  clarke: [
    'frederick', 'warren', 'loudoun', 'fauquier', 'shenandoah'
  ],
  'falls-church': [
    'arlington', 'fairfax', 'alexandria', 'fairfax-city', 'prince-william'
  ],
  grayson: [
    'carroll', 'wythe', 'surry', 'ashe', 'galax'
  ],
  nelson: [
    'amherst', 'augusta', 'albemarle', 'buckingham', 'appomattox'
  ],
  alleghany: [
    'botetourt', 'rockbridge', 'bath', 'craig', 'covington'
  ],
  madison: [
    'orange', 'culpeper', 'greene', 'page', 'rappahannock'
  ],
  martinsville: [
    'henry', 'patrick', 'rockingham', 'pittsylvania', 'franklin'
  ],
  poquoson: [
    'york', 'hampton', 'newport-news', 'james-city', 'gloucester'
  ],
  amelia: [
    'powhatan', 'chesterfield', 'nottoway', 'cumberland', 'prince-edward'
  ],
  dickenson: [
    'wise', 'buchanan', 'russell', 'scott', 'pike'
  ],
  northumberland: [
    'lancaster', 'richmond-county', 'westmoreland', 'essex', 'king-george'
  ],
  lunenburg: [
    'nottoway', 'brunswick', 'mecklenburg', 'charlotte', 'greensville'
  ],
  northampton: [
    'accomack', 'virginia-beach', 'norfolk', 'mathews', 'gloucester'
  ],
  charlotte: [
    'lunenburg', 'campbell', 'pittsylvania', 'halifax', 'mecklenburg'
  ],
  greensville: [
    'emporia', 'sussex', 'southampton', 'brunswick', 'dinwiddie'
  ],
  lancaster: [
    'northumberland', 'richmond-county', 'middlesex', 'king-george', 'westmoreland'
  ],
  sussex: [
    'dinwiddie', 'greensville', 'southampton', 'prince-george', 'surry'
  ],
  middlesex: [
    'lancaster', 'gloucester', 'mathews', 'king-and-queen', 'richmond-county'
  ],
  essex: [
    'king-and-queen', 'richmond-county', 'westmoreland', 'king-george', 'caroline'
  ],
  cumberland: [
    'powhatan', 'goochland', 'buckingham', 'amelia', 'fluvanna'
  ],
  'richmond-county': [
    'lancaster', 'northumberland', 'westmoreland', 'essex', 'king-george'
  ],
  'franklin-city': [
    'southampton', 'isle-of-wight', 'suffolk', 'greensville', 'sussex'
  ],
  mathews: [
    'gloucester', 'middlesex', 'lancaster', 'york', 'james-city'
  ],
  lexington: [
    'rockbridge', 'bath', 'alleghany', 'augusta', 'buena-vista'
  ],
  rappahannock: [
    'madison', 'culpeper', 'fauquier', 'warren', 'page'
  ],
  'king-and-queen': [
    'essex', 'new-kent', 'king-william', 'middlesex', 'caroline'
  ],
  'buena-vista': [
    'rockbridge', 'lexington', 'alleghany', 'bath', 'augusta'
  ],
  'charles-city': [
    'new-kent', 'james-city', 'henrico', 'surry', 'prince-george'
  ],
  galax: [
    'carroll', 'grayson', 'wythe', 'patrick', 'bristol'
  ],
  surry: [
    'isle-of-wight', 'james-city', 'charles-city', 'sussex', 'prince-george'
  ],
  bland: [
    'wythe', 'giles', 'tazewell', 'pulaski', 'montgomery'
  ],
  covington: [
    'alleghany', 'bath', 'rockbridge', 'botetourt', 'craig'
  ],
  emporia: [
    'greensville', 'sussex', 'brunswick', 'southampton', 'halifax'
  ],
  craig: [
    'roanoke-county', 'botetourt', 'alleghany', 'montgomery', 'giles'
  ],
  bath: [
    'highland', 'alleghany', 'augusta', 'rockbridge', 'covington'
  ],
  norton: [
    'wise', 'lee', 'scott', 'dickenson', 'bristol'
  ],
  highland: [
    'bath', 'augusta', 'rockbridge', 'alleghany', 'madison'
  ],
  greene: ['madison', 'albemarle', 'orange', 'page', 'rockingham'],
  hopewell: ['colonial-heights', 'petersburg', 'chesterfield', 'prince-george', 'dinwiddie'],
  'king-william': ['new-kent', 'hanover', 'king-and-queen', 'richmond-county', 'caroline'],
  lee: ['scott', 'wise', 'russell', 'dickenson', 'buchanan'],
  page: ['warren', 'rappahannock', 'greene', 'rockingham', 'madison'],
  'prince-edward': ['charlotte', 'lunenburg', 'nottoway', 'amelia', 'cumberland'],
  rockbridge: ['lexington', 'bath', 'alleghany', 'botetourt', 'augusta'],
  russell: ['buchanan', 'dickenson', 'wise', 'tazewell', 'scott'],
  salem: ['roanoke', 'roanoke-county', 'montgomery', 'bedford', 'craig'],
  scott: ['lee', 'wise', 'washington', 'russell', 'bristol'],
  smyth: ['washington', 'wythe', 'grayson', 'bland', 'tazewell'],
  staunton: ['augusta', 'waynesboro', 'rockingham', 'nelson', 'highland'],
  waynesboro: ['augusta', 'staunton', 'nelson', 'albemarle', 'rockingham'],
  westmoreland: ['richmond-county', 'northumberland', 'lancaster', 'king-george', 'essex'],
  winchester: ['frederick', 'clarke', 'warren', 'fauquier', 'shenandoah'],
  wythe: ['pulaski', 'grayson', 'bland', 'carroll', 'montgomery'],
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