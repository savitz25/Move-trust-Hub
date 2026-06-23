import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Kansas counties */
export const kansasCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  johnson: { seat: 'Olathe', metro: 'kansas-city-metro-ks' },
};

export function applyKansasCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'kansas') return county;
  const override = kansasCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}