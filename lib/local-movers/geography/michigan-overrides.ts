import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Michigan counties */
export const michiganCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  wayne: { seat: 'Detroit', metro: 'detroit-metro-mi' },
  oakland: { seat: 'Pontiac', metro: 'detroit-metro-mi' },
  macomb: { seat: 'Mount Clemens', metro: 'detroit-metro-mi' },
  kent: { seat: 'Grand Rapids', metro: 'grand-rapids-metro-mi' },
  ottawa: { seat: 'Grand Haven', metro: 'grand-rapids-metro-mi' },
  genesee: { seat: 'Flint', metro: 'flint-metro-mi' },
  washtenaw: { seat: 'Ann Arbor', metro: 'ann-arbor-metro-mi' },
  ingham: { seat: 'Mason', metro: 'lansing-metro-mi' },
  kalamazoo: { seat: 'Kalamazoo', metro: 'kalamazoo-metro-mi' },
  livingston: { seat: 'Howell', metro: 'detroit-metro-mi' },
  saginaw: { seat: 'Saginaw', metro: 'saginaw-metro-mi' },
  muskegon: { seat: 'Muskegon', metro: 'muskegon-metro-mi' },
  'st-clair': { seat: 'Port Huron', metro: 'port-huron-metro-mi' },
  jackson: { seat: 'Jackson', metro: 'jackson-metro-mi' },
  monroe: { seat: 'Monroe', metro: 'detroit-metro-mi' },
  berrien: { seat: 'St. Joseph', metro: 'southwest-michigan-mi' },
  calhoun: { seat: 'Marshall', metro: 'battle-creek-metro-mi' },
};

export function applyMichiganCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'michigan') return county;
  const override = michiganCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}