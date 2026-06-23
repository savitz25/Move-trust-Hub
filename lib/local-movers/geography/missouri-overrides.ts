import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Missouri counties */
export const missouriCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  'st-louis': { seat: 'Clayton', metro: 'st-louis-metro-mo' },
};

export function applyMissouriCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'missouri') return county;
  const override = missouriCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}