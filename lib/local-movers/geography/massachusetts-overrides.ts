import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Massachusetts counties */
export const massachusettsCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  middlesex: { seat: 'Cambridge', metro: 'middlesex-metro-ma' },
  worcester: { seat: 'Worcester', metro: 'worcester-metro-ma' },
  essex: { seat: 'Salem', metro: 'essex-metro-ma' },
};

export function applyMassachusettsCountyOverrides(county: LocalCounty): LocalCounty {
  const override = massachusettsCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}