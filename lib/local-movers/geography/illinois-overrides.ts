import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Illinois counties */
export const illinoisCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  cook: { seat: 'Chicago', metro: 'chicago-metro-il' },
};

export function applyIllinoisCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'illinois') return county;
  const override = illinoisCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}