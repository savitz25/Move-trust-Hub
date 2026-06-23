import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated South Carolina counties */
export const southCarolinaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  aiken: { seat: 'Aiken', metro: 'augusta-aiken-metro-sc' },
  dorchester: { seat: 'St. George', metro: 'charleston-metro-sc' },
  pickens: { seat: 'Pickens', metro: 'greenville-metro-sc' },
  florence: { seat: 'Florence', metro: 'florence-metro-sc' },
  lancaster: { seat: 'Lancaster', metro: 'charlotte-metro-sc' },
  sumter: { seat: 'Sumter', metro: 'sumter-metro-sc' },
};

export function applySouthCarolinaCountyOverrides(
  county: LocalCounty
): LocalCounty {
  if (county.stateSlug !== 'south-carolina') return county;
  const override = southCarolinaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}