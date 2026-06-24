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
  butler: { seat: 'Hamilton', metro: 'cincinnati-metro-oh' },
  stark: { seat: 'Canton', metro: 'canton-metro-oh' },
  lorain: { seat: 'Elyria', metro: 'cleveland-metro-oh' },
  warren: { seat: 'Lebanon', metro: 'cincinnati-metro-oh' },
  delaware: { seat: 'Delaware', metro: 'columbus-metro-oh' },
  lake: { seat: 'Painesville', metro: 'cleveland-metro-oh' },
  mahoning: { seat: 'Youngstown', metro: 'youngstown-metro-oh' },
  clermont: { seat: 'Batavia', metro: 'cincinnati-metro-oh' },
  trumbull: { seat: 'Warren', metro: 'youngstown-metro-oh' },
  licking: { seat: 'Newark', metro: 'columbus-metro-oh' },
  medina: { seat: 'Medina', metro: 'cleveland-metro-oh' },
  greene: { seat: 'Xenia', metro: 'dayton-metro-oh' },
  fairfield: { seat: 'Lancaster', metro: 'columbus-metro-oh' },
  portage: { seat: 'Ravenna', metro: 'akron-metro-oh' },
  wood: { seat: 'Bowling Green', metro: 'toledo-metro-oh' },
  clark: { seat: 'Springfield', metro: 'springfield-metro-oh' },
  richland: { seat: 'Mansfield', metro: 'mansfield-metro-oh' },
  wayne: { seat: 'Wooster', metro: 'akron-metro-oh' },
  miami: { seat: 'Troy', metro: 'dayton-metro-oh' },
  allen: { seat: 'Lima', metro: 'lima-metro-oh' },
  columbiana: { seat: 'Lisbon', metro: 'youngstown-metro-oh' },
  ashtabula: { seat: 'Jefferson', metro: 'cleveland-metro-oh' },
};

export function applyOhioCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'ohio') return county;
  const override = ohioCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}