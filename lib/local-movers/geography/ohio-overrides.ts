import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Ohio counties */
export const ohioCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  franklin: { seat: 'Columbus', metro: 'columbus-metro-oh' },
  cuyahoga: { seat: 'Cleveland', metro: 'cleveland-metro-oh' },
  hamilton: { seat: 'Cincinnati', metro: 'cincinnati-metro-oh' },
  montgomery: { seat: 'Dayton', metro: 'dayton-metro-oh' },
  summit: { seat: 'Akron', metro: 'akron-metro-oh' },
  lucas: { seat: 'Toledo', metro: 'toledo-metro-oh' },
};

export function applyOhioCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'ohio') return county;
  const override = ohioCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}