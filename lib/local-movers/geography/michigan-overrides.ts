import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Michigan counties */
export const michiganCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  wayne: { seat: 'Detroit', metro: 'detroit-metro-mi' },
};

export function applyMichiganCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'michigan') return county;
  const override = michiganCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}