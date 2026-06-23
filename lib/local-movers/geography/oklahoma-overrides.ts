import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Oklahoma counties */
export const oklahomaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  oklahoma: { seat: 'Oklahoma City', metro: 'oklahoma-city-metro-ok' },
};

export function applyOklahomaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'oklahoma') return county;
  const override = oklahomaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}