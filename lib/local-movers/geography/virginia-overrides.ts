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