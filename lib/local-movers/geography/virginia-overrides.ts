import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Virginia counties */
export const virginiaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro' | 'name'>>
> = {
  fairfax: { seat: 'Fairfax', metro: 'northern-virginia-metro-va', name: 'Fairfax' },
  'prince-william': { seat: 'Manassas', metro: 'prince-william-metro-va' },
  loudoun: { seat: 'Leesburg', metro: 'loudoun-metro-va' },
  'virginia-beach': { seat: 'Virginia Beach', metro: 'virginia-beach-metro-va' },
  chesterfield: { seat: 'Chesterfield', metro: 'chesterfield-metro-va' },
  henrico: { seat: 'Laurel', metro: 'henrico-metro-va' },
  chesapeake: { seat: 'Chesapeake', metro: 'chesapeake-metro-va' },
  arlington: { seat: 'Arlington', metro: 'arlington-metro-va' },
  richmond: { seat: 'Richmond', metro: 'richmond-metro-va' },
  norfolk: { seat: 'Norfolk', metro: 'norfolk-metro-va' },
  'newport-news': { seat: 'Newport News', metro: 'newport-news-metro-va' },
  stafford: { seat: 'Stafford', metro: 'stafford-metro-va' },
  alexandria: { seat: 'Alexandria', metro: 'alexandria-metro-va' },
  spotsylvania: { seat: 'Spotsylvania', metro: 'spotsylvania-metro-va' },
  hampton: { seat: 'Hampton', metro: 'hampton-metro-va' },
  albemarle: { seat: 'Charlottesville', metro: 'albemarle-metro-va' },
  hanover: { seat: 'Hanover', metro: 'hanover-metro-va' },
  suffolk: { seat: 'Suffolk', metro: 'suffolk-metro-va' },
  frederick: { seat: 'Winchester', metro: 'frederick-metro-va' },
  roanoke: { seat: 'Roanoke', metro: 'roanoke-metro-va' },
  'roanoke-county': { seat: 'Salem', metro: 'roanoke-county-metro-va', name: 'Roanoke County' },
  montgomery: { seat: 'Christiansburg', metro: 'montgomery-metro-va' },
  portsmouth: { seat: 'Portsmouth', metro: 'portsmouth-metro-va' },
  rockingham: { seat: 'Harrisonburg', metro: 'rockingham-metro-va' },
  'james-city': { seat: 'Williamsburg', metro: 'james-city-metro-va' },
  bedford: { seat: 'Bedford', metro: 'bedford-metro-va' },
  lynchburg: { seat: 'Lynchburg', metro: 'lynchburg-metro-va' },
  augusta: { seat: 'Staunton', metro: 'augusta-metro-va' },
  fauquier: { seat: 'Warrenton', metro: 'fauquier-metro-va' },
  york: { seat: 'Yorktown', metro: 'york-metro-va' },
  pittsylvania: { seat: 'Chatham', metro: 'pittsylvania-metro-va' },
  culpeper: { seat: 'Culpeper', metro: 'culpeper-metro-va' },
  campbell: { seat: 'Rustburg', metro: 'campbell-metro-va' },
  franklin: { seat: 'Rocky Mount', metro: 'franklin-metro-va' },
  washington: { seat: 'Abingdon', metro: 'washington-metro-va', name: 'Washington County' },
  harrisonburg: { seat: 'Harrisonburg', metro: 'harrisonburg-metro-va' },
  henry: { seat: 'Martinsville', metro: 'henry-metro-va' },
  shenandoah: { seat: 'Woodstock', metro: 'shenandoah-metro-va' },
  manassas: { seat: 'Manassas', metro: 'manassas-metro-va' },
  charlottesville: { seat: 'Charlottesville', metro: 'charlottesville-metro-va' },
  'prince-george': { seat: 'Prince George', metro: 'prince-george-metro-va' },
  louisa: { seat: 'Louisa', metro: 'louisa-metro-va' },
  warren: { seat: 'Front Royal', metro: 'warren-metro-va' },
  'isle-of-wight': { seat: 'Isle of Wight', metro: 'isle-of-wight-metro-va' },
  danville: { seat: 'Danville', metro: 'danville-metro-va' },
  orange: { seat: 'Orange', metro: 'orange-metro-va' },
  gloucester: { seat: 'Gloucester', metro: 'gloucester-metro-va' },
  tazewell: { seat: 'Tazewell', metro: 'tazewell-metro-va' },
  caroline: { seat: 'Bowling Green', metro: 'caroline-metro-va' },
  wise: { seat: 'Wise', metro: 'wise-metro-va' },
  botetourt: { seat: 'Fincastle', metro: 'botetourt-metro-va' },
  accomack: { seat: 'Accomac', metro: 'accomack-metro-va' },
  pulaski: { seat: 'Pulaski', metro: 'pulaski-metro-va' },
  petersburg: { seat: 'Petersburg', metro: 'petersburg-metro-va' },
  halifax: { seat: 'Halifax', metro: 'halifax-metro-va' },
  powhatan: { seat: 'Powhatan', metro: 'powhatan-metro-va' },
  amherst: { seat: 'Amherst', metro: 'amherst-metro-va' },
  fredericksburg: { seat: 'Fredericksburg', metro: 'fredericksburg-metro-va' },
  mecklenburg: { seat: 'Boydton', metro: 'mecklenburg-metro-va' },
  'king-george': { seat: 'King George', metro: 'king-george-metro-va' },
  goochland: { seat: 'Goochland', metro: 'goochland-metro-va' },
  carroll: { seat: 'Hillsville', metro: 'carroll-metro-va' },
  fluvanna: { seat: 'Palmyra', metro: 'fluvanna-metro-va' },
  dinwiddie: { seat: 'Dinwiddie', metro: 'dinwiddie-metro-va' },
  'new-kent': { seat: 'New Kent', metro: 'new-kent-metro-va' },
};

/** Duplicate FIPS slugs disambiguated by generated metro region */
const VIRGINIA_DUPLICATE_SLUG_METROS: Record<
  string,
  Record<string, { slug: string; name: string }>
> = {
  fairfax: {
    'virginia-region-5': { slug: 'fairfax-city', name: 'Fairfax City' },
  },
  richmond: {
    'virginia-region-1': { slug: 'richmond-county', name: 'Richmond County' },
    'virginia-region-2': { slug: 'richmond', name: 'Richmond' },
  },
  roanoke: {
    'virginia-region-3': { slug: 'roanoke-county', name: 'Roanoke County' },
    'virginia-region-4': { slug: 'roanoke', name: 'Roanoke' },
  },
  bedford: {
    'virginia-region-1': { slug: 'bedford', name: 'Bedford' },
    'virginia-region-2': { slug: 'bedford-city', name: 'Bedford City' },
  },
  franklin: {
    'virginia-region-5': { slug: 'franklin', name: 'Franklin' },
    'virginia-region-1': { slug: 'franklin-city', name: 'Franklin City' },
  },
};

export function applyVirginiaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'virginia') return county;

  const duplicateMap = VIRGINIA_DUPLICATE_SLUG_METROS[county.slug];
  const cityDisambiguation = duplicateMap?.[county.metro ?? ''];

  if (cityDisambiguation) {
    return {
      ...county,
      slug: cityDisambiguation.slug,
      name: cityDisambiguation.name,
    };
  }

  const override = virginiaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}