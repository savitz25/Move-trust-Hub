import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Indiana counties */
export const indianaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  marion: { seat: 'Indianapolis', metro: 'indianapolis-metro-in' },
  lake: { seat: 'Crown Point', metro: 'northwest-indiana-metro-in' },
  allen: { seat: 'Fort Wayne', metro: 'fort-wayne-metro-in' },
  hamilton: { seat: 'Noblesville', metro: 'indianapolis-metro-in' },
  'st-joseph': { seat: 'South Bend', metro: 'south-bend-metro-in' },
};

export function applyIndianaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'indiana') return county;
  const override = indianaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}