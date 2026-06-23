import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated North Carolina counties */
export const northCarolinaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  wake: { seat: 'Raleigh', metro: 'raleigh-triangle-metro-nc' },
};

export function applyNorthCarolinaCountyOverrides(
  county: LocalCounty
): LocalCounty {
  if (county.stateSlug !== 'north-carolina') return county;
  const override = northCarolinaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}