import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Washington counties */
export const washingtonCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  king: { seat: 'Seattle', metro: 'king-metro-wa' },
};

export function applyWashingtonCountyOverrides(county: LocalCounty): LocalCounty {
  const override = washingtonCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}