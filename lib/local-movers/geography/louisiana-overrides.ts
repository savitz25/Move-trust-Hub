import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Louisiana parishes */
export const louisianaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  'east-baton-rouge': { seat: 'Baton Rouge', metro: 'baton-rouge-metro-la' },
};

export function applyLouisianaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'louisiana') return county;
  const override = louisianaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}