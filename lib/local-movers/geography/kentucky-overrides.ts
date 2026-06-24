import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Kentucky counties */
export const kentuckyCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  jefferson: { seat: 'Louisville', metro: 'louisville-metro-ky' },
  fayette: { seat: 'Lexington', metro: 'lexington-metro-ky' },
  kenton: { seat: 'Covington', metro: 'cincinnati-metro-ky' },
  warren: { seat: 'Bowling Green', metro: 'bowling-green-metro-ky' },
};

export function applyKentuckyCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'kentucky') return county;
  const override = kentuckyCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}