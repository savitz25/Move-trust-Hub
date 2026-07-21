import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Vermont counties */
export const vermontCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  chittenden: { seat: 'Burlington', metro: 'chittenden-metro-vt' },
  washington: { seat: 'Montpelier', metro: 'washington-metro-vt' },
  rutland: { seat: 'Rutland', metro: 'rutland-metro-vt' },
  windsor: { seat: 'Woodstock', metro: 'windsor-metro-vt' },
  franklin: { seat: 'St. Albans', metro: 'franklin-metro-vt' },
  windham: { seat: 'Brattleboro', metro: 'windham-metro-vt' },
  addison: { seat: 'Middlebury', metro: 'addison-metro-vt' },
  bennington: { seat: 'Bennington', metro: 'bennington-metro-vt' },
  caledonia: { seat: 'St. Johnsbury', metro: 'caledonia-metro-vt' },
  orange: { seat: 'Chelsea', metro: 'orange-metro-vt' },
  orleans: { seat: 'Newport', metro: 'orleans-metro-vt' },
  lamoille: { seat: 'Hyde Park', metro: 'lamoille-metro-vt' },
  'grand-isle': { seat: 'North Hero', metro: 'grand-isle-metro-vt' },
  essex: { seat: 'Guildhall', metro: 'essex-metro-vt' },
};

export function applyVermontCountyOverrides(county: LocalCounty): LocalCounty {
  
if (county.stateSlug !== 'vermont') return county;
  const override = vermontCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}