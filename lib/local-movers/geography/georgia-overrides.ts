import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Georgia counties */
export const georgiaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  fulton: { seat: 'Atlanta', metro: 'atlanta-metro-ga' },
  gwinnett: { seat: 'Lawrenceville', metro: 'atlanta-metro-ga' },
  cobb: { seat: 'Marietta', metro: 'atlanta-metro-ga' },
  dekalb: { seat: 'Decatur', metro: 'atlanta-metro-ga' },
  clayton: { seat: 'Jonesboro', metro: 'atlanta-metro-ga' },
  cherokee: { seat: 'Canton', metro: 'atlanta-metro-ga' },
  forsyth: { seat: 'Cumming', metro: 'atlanta-metro-ga' },
  henry: { seat: 'McDonough', metro: 'atlanta-metro-ga' },
  fayette: { seat: 'Fayetteville', metro: 'atlanta-metro-ga' },
  douglas: { seat: 'Douglasville', metro: 'atlanta-metro-ga' },
  rockdale: { seat: 'Conyers', metro: 'atlanta-metro-ga' },
  paulding: { seat: 'Dallas', metro: 'atlanta-metro-ga' },
  coweta: { seat: 'Newnan', metro: 'atlanta-metro-ga' },
  barrow: { seat: 'Winder', metro: 'atlanta-metro-ga' },
  newton: { seat: 'Covington', metro: 'atlanta-metro-ga' },
  hall: { seat: 'Gainesville', metro: 'atlanta-metro-ga' },
  walton: { seat: 'Monroe', metro: 'atlanta-metro-ga' },
  chatham: { seat: 'Savannah', metro: 'savannah-metro-ga' },
  richmond: { seat: 'Augusta', metro: 'augusta-metro-ga' },
  muscogee: { seat: 'Columbus', metro: 'columbus-metro-ga' },
  pickens: { seat: 'Jasper', metro: 'atlanta-metro-ga' },
  bartow: { seat: 'Cartersville', metro: 'atlanta-metro-ga' },
  spalding: { seat: 'Griffin', metro: 'atlanta-metro-ga' },
  butts: { seat: 'Jackson', metro: 'atlanta-metro-ga' },
  carroll: { seat: 'Carrollton', metro: 'atlanta-metro-ga' },
  dawson: { seat: 'Dawsonville', metro: 'atlanta-metro-ga' },
  lumpkin: { seat: 'Dahlonega', metro: 'atlanta-metro-ga' },
  morgan: { seat: 'Madison', metro: 'atlanta-metro-ga' },
  oconee: { seat: 'Watkinsville', metro: 'atlanta-metro-ga' },
  jackson: { seat: 'Jefferson', metro: 'atlanta-metro-ga' },
  haralson: { seat: 'Buchanan', metro: 'atlanta-metro-ga' },
  polk: { seat: 'Cedartown', metro: 'atlanta-metro-ga' },
  heard: { seat: 'Franklin', metro: 'atlanta-metro-ga' },
  meriwether: { seat: 'Greenville', metro: 'atlanta-metro-ga' },
  floyd: { seat: 'Rome', metro: 'rome-metro-ga' },
  gordon: { seat: 'Calhoun', metro: 'rome-metro-ga' },
  chattooga: { seat: 'Summerville', metro: 'rome-metro-ga' },
  walker: { seat: 'LaFayette', metro: 'chattanooga-metro-ga' },
  whitfield: { seat: 'Dalton', metro: 'dalton-metro-ga' },
  murray: { seat: 'Chatsworth', metro: 'dalton-metro-ga' },
  catoosa: { seat: 'Ringgold', metro: 'chattanooga-metro-ga' },
  dade: { seat: 'Trenton', metro: 'chattanooga-metro-ga' },
  appling: { seat: 'Baxley', metro: 'savannah-metro-ga' },
  atkinson: { seat: 'Pearson', metro: 'valdosta-metro-ga' },
  bacon: { seat: 'Alma', metro: 'savannah-metro-ga' },
  baker: { seat: 'Newton', metro: 'albany-metro-ga' },
  baldwin: { seat: 'Milledgeville', metro: 'macon-metro-ga' },
  banks: { seat: 'Homer', metro: 'atlanta-metro-ga' },
  berrien: { seat: 'Nashville', metro: 'valdosta-metro-ga' },
  bibb: { seat: 'Macon', metro: 'macon-metro-ga' },
  bleckley: { seat: 'Cochran', metro: 'macon-metro-ga' },
  brantley: { seat: 'Nahunta', metro: 'savannah-metro-ga' },
};

export function applyGeorgiaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'georgia') return county;
  const override = georgiaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}