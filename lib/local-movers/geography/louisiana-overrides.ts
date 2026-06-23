import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Louisiana parishes */
export const louisianaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  'east-baton-rouge': { seat: 'Baton Rouge', metro: 'baton-rouge-metro-la' },
  jefferson: { seat: 'Gretna', metro: 'new-orleans-metro-la' },
  orleans: { seat: 'New Orleans', metro: 'new-orleans-metro-la' },
  'st-tammany': { seat: 'Covington', metro: 'north-shore-metro-la' },
  lafayette: { seat: 'Lafayette', metro: 'lafayette-metro-la' },
  caddo: { seat: 'Shreveport', metro: 'shreveport-bossier-metro-la' },
  calcasieu: { seat: 'Lake Charles', metro: 'lake-charles-metro-la' },
  ouachita: { seat: 'Monroe', metro: 'monroe-metro-la' },
  livingston: { seat: 'Livingston', metro: 'baton-rouge-metro-la' },
  tangipahoa: { seat: 'Amite City', metro: 'hammond-metro-la' },
  ascension: { seat: 'Donaldsonville', metro: 'baton-rouge-metro-la' },
  bossier: { seat: 'Benton', metro: 'shreveport-bossier-metro-la' },
};

export function applyLouisianaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'louisiana') return county;
  const override = louisianaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}