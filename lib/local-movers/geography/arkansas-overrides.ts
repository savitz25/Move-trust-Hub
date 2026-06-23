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
};

export function applyArkansasCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'arkansas') return county;
  const override = arkansasCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}