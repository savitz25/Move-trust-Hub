import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Maryland counties — batch 1 */
export const marylandCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  montgomery: { seat: 'Rockville', metro: 'montgomery-metro-md' },
  'prince-georges': { seat: 'Upper Marlboro', metro: 'prince-georges-metro-md' },
  baltimore: { seat: 'Towson', metro: 'baltimore-metro-md' },
};

export function applyMarylandCountyOverrides(county: LocalCounty): LocalCounty {
  const override = marylandCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}