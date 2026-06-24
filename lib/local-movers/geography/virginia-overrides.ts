import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Virginia counties */
export const virginiaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro' | 'name'>>
> = {
  fairfax: { seat: 'Fairfax', metro: 'northern-virginia-metro-va', name: 'Fairfax' },
};

/** Fairfax County and Fairfax City both slugify to "fairfax" in generated data */
const VIRGINIA_INDEPENDENT_CITY_METROS: Record<string, { slug: string; name: string }> =
  {
    'virginia-region-5': { slug: 'fairfax-city', name: 'Fairfax City' },
    'virginia-region-2': { slug: 'richmond-city', name: 'Richmond City' },
  };

export function applyVirginiaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'virginia') return county;

  const cityDisambiguation =
    county.slug === 'fairfax' || county.slug === 'richmond'
      ? VIRGINIA_INDEPENDENT_CITY_METROS[county.metro ?? '']
      : undefined;

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