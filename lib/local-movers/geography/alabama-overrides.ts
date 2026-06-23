import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Alabama counties */
export const alabamaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  jefferson: { seat: 'Birmingham', metro: 'birmingham-metro-al' },
  baldwin: { seat: 'Bay Minette', metro: 'baldwin-coastal-al' },
  tuscaloosa: { seat: 'Tuscaloosa', metro: 'tuscaloosa-metro-al' },
  shelby: { seat: 'Columbiana', metro: 'birmingham-metro-al' },
  montgomery: { seat: 'Montgomery', metro: 'montgomery-metro-al' },
};

export function applyAlabamaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'alabama') return county;
  const override = alabamaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}