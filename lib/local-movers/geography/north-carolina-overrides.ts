import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated North Carolina counties */
export const northCarolinaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  wake: { seat: 'Raleigh', metro: 'raleigh-triangle-metro-nc' },
  mecklenburg: { seat: 'Charlotte', metro: 'charlotte-metro-nc' },
  guilford: { seat: 'Greensboro', metro: 'greensboro-high-point-metro-nc' },
  forsyth: { seat: 'Winston-Salem', metro: 'winston-salem-triad-metro-nc' },
  durham: { seat: 'Durham', metro: 'durham-chapel-hill-metro-nc' },
  cumberland: { seat: 'Fayetteville', metro: 'fayetteville-metro-nc' },
  buncombe: { seat: 'Asheville', metro: 'asheville-metro-nc' },
  union: { seat: 'Monroe', metro: 'charlotte-metro-nc' },
  johnston: { seat: 'Smithfield', metro: 'raleigh-triangle-metro-nc' },
  cabarrus: { seat: 'Concord', metro: 'charlotte-metro-nc' },
  gaston: { seat: 'Gastonia', metro: 'charlotte-metro-nc' },
  'new-hanover': { seat: 'Wilmington', metro: 'wilmington-metro-nc' },
};

export function applyNorthCarolinaCountyOverrides(
  county: LocalCounty
): LocalCounty {
  if (county.stateSlug !== 'north-carolina') return county;
  const override = northCarolinaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}