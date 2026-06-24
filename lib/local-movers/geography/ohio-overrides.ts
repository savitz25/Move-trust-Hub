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
  geauga: { seat: 'Chardon', metro: 'cleveland-metro-oh' },
  tuscarawas: { seat: 'New Philadelphia', metro: 'canton-metro-oh' },
  muskingum: { seat: 'Zanesville', metro: 'zanesville-metro-oh' },
  ross: { seat: 'Chillicothe', metro: 'chillicothe-metro-oh' },
  hancock: { seat: 'Findlay', metro: 'findlay-metro-oh' },
  union: { seat: 'Marysville', metro: 'columbus-metro-oh' },
  erie: { seat: 'Sandusky', metro: 'cleveland-metro-oh' },
  scioto: { seat: 'Portsmouth', metro: 'portsmouth-metro-oh' },
  marion: { seat: 'Marion', metro: 'columbus-metro-oh' },
  knox: { seat: 'Mount Vernon', metro: 'columbus-metro-oh' },
  belmont: { seat: 'St. Clairsville', metro: 'youngstown-metro-oh' },
  pickaway: { seat: 'Circleville', metro: 'columbus-metro-oh' },
  highland: { seat: 'Hillsboro', metro: 'chillicothe-metro-oh' },
  mercer: { seat: 'Celina', metro: 'celina-metro-oh' },
  clinton: { seat: 'Wilmington', metro: 'cincinnati-metro-oh' },
  crawford: { seat: 'Bucyrus', metro: 'mansfield-metro-oh' },
  fulton: { seat: 'Wauseon', metro: 'toledo-metro-oh' },
  preble: { seat: 'Eaton', metro: 'dayton-metro-oh' },
  ottawa: { seat: 'Port Clinton', metro: 'cleveland-metro-oh' },
  champaign: { seat: 'Urbana', metro: 'springfield-metro-oh' },
  guernsey: { seat: 'Cambridge', metro: 'cambridge-metro-oh' },
  defiance: { seat: 'Defiance', metro: 'defiance-metro-oh' },
  coshocton: { seat: 'Coshocton', metro: 'coshocton-metro-oh' },
  morrow: { seat: 'Mount Gilead', metro: 'columbus-metro-oh' },
  williams: { seat: 'Bryan', metro: 'bryan-metro-oh' },
  perry: { seat: 'New Lexington', metro: 'columbus-metro-oh' },
  putnam: { seat: 'Ottawa', metro: 'toledo-metro-oh' },
};

export function applyOhioCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'ohio') return county;
  const override = ohioCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}