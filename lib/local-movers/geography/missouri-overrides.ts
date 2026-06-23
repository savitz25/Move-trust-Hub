import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Missouri counties */
export const missouriCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  'st-louis': { seat: 'Clayton', metro: 'st-louis-metro-mo' },
  jackson: { seat: 'Independence', metro: 'kansas-city-metro-mo' },
  'st-charles': { seat: 'St. Charles', metro: 'st-louis-metro-west-mo' },
  greene: { seat: 'Springfield', metro: 'springfield-metro-mo' },
  'st-louis-city': { seat: 'St. Louis', metro: 'st-louis-metro-mo' },
  clay: { seat: 'Liberty', metro: 'kansas-city-metro-north-mo' },
  jefferson: { seat: 'Hillsboro', metro: 'st-louis-metro-south-mo' },
  boone: { seat: 'Columbia', metro: 'columbia-metro-mo' },
};

export function applyMissouriCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'missouri') return county;
  const override = missouriCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}