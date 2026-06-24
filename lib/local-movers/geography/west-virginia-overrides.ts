import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated West Virginia counties */
export const westVirginiaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  kanawha: { seat: 'Charleston', metro: 'charleston-metro-wv' },
  berkeley: { seat: 'Martinsburg', metro: 'martinsburg-metro-wv' },
  monongalia: { seat: 'Morgantown', metro: 'morgantown-metro-wv' },
  cabell: { seat: 'Huntington', metro: 'huntington-metro-wv' },
  wood: { seat: 'Parkersburg', metro: 'parkersburg-metro-wv' },
  raleigh: { seat: 'Beckley', metro: 'beckley-metro-wv' },
  jefferson: { seat: 'Charles Town', metro: 'charles-town-metro-wv' },
  harrison: { seat: 'Clarksburg', metro: 'clarksburg-metro-wv' },
  mercer: { seat: 'Princeton', metro: 'princeton-metro-wv' },
};

export function applyWestVirginiaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = westVirginiaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}