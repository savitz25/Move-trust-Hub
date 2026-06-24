import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Maryland counties — complete state */
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
  carroll: { seat: 'Westminster', metro: 'carroll-metro-md' },
  washington: { seat: 'Hagerstown', metro: 'washington-metro-md' },
  'st-marys': { seat: 'Leonardtown', metro: 'st-marys-metro-md' },
  cecil: { seat: 'Elkton', metro: 'cecil-metro-md' },
  wicomico: { seat: 'Salisbury', metro: 'wicomico-metro-md' },
  calvert: { seat: 'Prince Frederick', metro: 'calvert-metro-md' },
  allegany: { seat: 'Cumberland', metro: 'allegany-metro-md' },
  'queen-annes': { seat: 'Centreville', metro: 'queen-annes-metro-md' },
  worcester: { seat: 'Snow Hill', metro: 'worcester-metro-md' },
  talbot: { seat: 'Easton', metro: 'talbot-metro-md' },
  caroline: { seat: 'Denton', metro: 'caroline-metro-md' },
  dorchester: { seat: 'Cambridge', metro: 'dorchester-metro-md' },
  garrett: { seat: 'Oakland', metro: 'garrett-metro-md' },
  somerset: { seat: 'Princess Anne', metro: 'somerset-metro-md' },
  kent: { seat: 'Chestertown', metro: 'kent-metro-md' },
};

export function applyMarylandCountyOverrides(county: LocalCounty): LocalCounty {
  const override = marylandCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}