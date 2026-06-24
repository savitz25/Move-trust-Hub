import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Maryland counties — batches 1–2 */
export const marylandCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  montgomery: { seat: 'Rockville', metro: 'montgomery-metro-md' },
  'prince-georges': { seat: 'Upper Marlboro', metro: 'prince-georges-metro-md' },
  baltimore: { seat: 'Towson', metro: 'baltimore-metro-md' },
  'anne-arundel': { seat: 'Annapolis', metro: 'anne-arundel-metro-md' },
  'baltimore-city': { seat: 'Baltimore', metro: 'baltimore-city-metro-md' },
  howard: { seat: 'Ellicott City', metro: 'howard-metro-md' },
  frederick: { seat: 'Frederick', metro: 'frederick-metro-md' },
  harford: { seat: 'Bel Air', metro: 'harford-metro-md' },
  charles: { seat: 'La Plata', metro: 'charles-metro-md' },
};

export function applyMarylandCountyOverrides(county: LocalCounty): LocalCounty {
  const override = marylandCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}