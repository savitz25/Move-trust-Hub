import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Rhode Island counties */
export const rhodeIslandCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  providence: { seat: 'Providence', metro: 'providence-metro-ri' },
  kent: { seat: 'East Greenwich', metro: 'kent-metro-ri' },
  washington: { seat: 'South Kingstown', metro: 'washington-metro-ri' },
  newport: { seat: 'Newport', metro: 'newport-metro-ri' },
  bristol: { seat: 'Bristol', metro: 'bristol-metro-ri' },
};

export function applyRhodeIslandCountyOverrides(county: LocalCounty): LocalCounty {
  
if (county.stateSlug !== 'rhode-island') return county;
  const override = rhodeIslandCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}