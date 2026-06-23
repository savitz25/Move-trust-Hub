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
  onslow: { seat: 'Jacksonville', metro: 'jacksonville-metro-nc' },
  iredell: { seat: 'Statesville', metro: 'charlotte-metro-nc' },
  alamance: { seat: 'Graham', metro: 'greensboro-high-point-metro-nc' },
  pitt: { seat: 'Greenville', metro: 'greenville-metro-nc' },
  brunswick: { seat: 'Bolivia', metro: 'wilmington-metro-nc' },
  davidson: { seat: 'Lexington', metro: 'winston-salem-triad-metro-nc' },
  catawba: { seat: 'Newton', metro: 'hickory-lenoir-metro-nc' },
  rowan: { seat: 'Salisbury', metro: 'charlotte-metro-nc' },
  harnett: { seat: 'Lillington', metro: 'raleigh-triangle-metro-nc' },
  orange: { seat: 'Hillsborough', metro: 'durham-chapel-hill-metro-nc' },
  randolph: { seat: 'Asheboro', metro: 'greensboro-high-point-metro-nc' },
  henderson: { seat: 'Hendersonville', metro: 'asheville-metro-nc' },
  wayne: { seat: 'Goldsboro', metro: 'goldsboro-metro-nc' },
  robeson: { seat: 'Lumberton', metro: 'fayetteville-metro-nc' },
  moore: { seat: 'Carthage', metro: 'pinehurst-metro-nc' },
  craven: { seat: 'New Bern', metro: 'new-bern-metro-nc' },
  cleveland: { seat: 'Shelby', metro: 'charlotte-metro-nc' },
  nash: { seat: 'Nashville', metro: 'rocky-mount-metro-nc' },
  lincoln: { seat: 'Lincolnton', metro: 'charlotte-metro-nc' },
  rockingham: { seat: 'Wentworth', metro: 'greensboro-high-point-metro-nc' },
  burke: { seat: 'Morganton', metro: 'hickory-lenoir-metro-nc' },
  chatham: { seat: 'Pittsboro', metro: 'raleigh-triangle-metro-nc' },
  franklin: { seat: 'Louisburg', metro: 'raleigh-triangle-metro-nc' },
  wilson: { seat: 'Wilson', metro: 'wilson-metro-nc' },
  caldwell: { seat: 'Lenoir', metro: 'hickory-lenoir-metro-nc' },
  pender: { seat: 'Burgaw', metro: 'wilmington-metro-nc' },
  surry: { seat: 'Dobson', metro: 'greensboro-high-point-metro-nc' },
  lee: { seat: 'Sanford', metro: 'sanford-metro-nc' },
  carteret: { seat: 'Beaufort', metro: 'crystal-coast-metro-nc' },
  stanly: { seat: 'Albemarle', metro: 'charlotte-metro-nc' },
  wilkes: { seat: 'Wilkesboro', metro: 'hickory-lenoir-metro-nc' },
  rutherford: { seat: 'Rutherfordton', metro: 'hickory-lenoir-metro-nc' },
  haywood: { seat: 'Waynesville', metro: 'asheville-metro-nc' },
  sampson: { seat: 'Clinton', metro: 'fayetteville-metro-nc' },
  granville: { seat: 'Oxford', metro: 'durham-chapel-hill-metro-nc' },
  hoke: { seat: 'Raeford', metro: 'fayetteville-metro-nc' },
  lenoir: { seat: 'Kinston', metro: 'kinston-metro-nc' },
  watauga: { seat: 'Boone', metro: 'boone-metro-nc' },
  duplin: { seat: 'Kenansville', metro: 'goldsboro-metro-nc' },
  columbus: { seat: 'Whiteville', metro: 'wilmington-metro-nc' },
  edgecombe: { seat: 'Tarboro', metro: 'rocky-mount-metro-nc' },
  stokes: { seat: 'Danbury', metro: 'greensboro-high-point-metro-nc' },
};

export function applyNorthCarolinaCountyOverrides(
  county: LocalCounty
): LocalCounty {
  if (county.stateSlug !== 'north-carolina') return county;
  const override = northCarolinaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}