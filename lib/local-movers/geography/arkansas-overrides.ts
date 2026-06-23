import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Arkansas counties */
export const arkansasCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  pulaski: { seat: 'Little Rock', metro: 'little-rock-metro-ar' },
};

export function applyArkansasCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'arkansas') return county;
  const override = arkansasCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}