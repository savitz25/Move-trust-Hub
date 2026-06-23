import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Arkansas counties */
export const arkansasCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  pulaski: { seat: 'Little Rock', metro: 'little-rock-metro-ar' },
  benton: { seat: 'Bentonville', metro: 'northwest-arkansas-metro-ar' },
  washington: { seat: 'Fayetteville', metro: 'northwest-arkansas-metro-ar' },
  faulkner: { seat: 'Conway', metro: 'little-rock-metro-ar' },
  saline: { seat: 'Benton', metro: 'little-rock-metro-ar' },
  sebastian: { seat: 'Fort Smith', metro: 'fort-smith-metro-ar' },
  craighead: { seat: 'Jonesboro', metro: 'jonesboro-metro-ar' },
  garland: { seat: 'Hot Springs', metro: 'hot-springs-metro-ar' },
  white: { seat: 'Searcy', metro: 'searcy-metro-ar' },
  lonoke: { seat: 'Lonoke', metro: 'little-rock-metro-ar' },
  pope: { seat: 'Russellville', metro: 'russellville-metro-ar' },
  crawford: { seat: 'Van Buren', metro: 'fort-smith-metro-ar' },
  jefferson: { seat: 'Pine Bluff', metro: 'pine-bluff-metro-ar' },
  greene: { seat: 'Paragould', metro: 'paragould-metro-ar' },
  crittenden: { seat: 'Marion', metro: 'west-memphis-metro-ar' },
  baxter: { seat: 'Mountain Home', metro: 'mountain-home-metro-ar' },
  miller: { seat: 'Texarkana', metro: 'texarkana-metro-ar' },
  independence: { seat: 'Batesville', metro: 'batesville-metro-ar' },
  boone: { seat: 'Harrison', metro: 'harrison-metro-ar' },
  mississippi: { seat: 'Blytheville', metro: 'blytheville-metro-ar' },
};

export function applyArkansasCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'arkansas') return county;
  const override = arkansasCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}