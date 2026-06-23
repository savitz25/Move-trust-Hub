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
  jasper: { seat: 'Carthage', metro: 'joplin-metro-mo' },
  cass: { seat: 'Harrisonville', metro: 'kansas-city-metro-south-mo' },
  platte: { seat: 'Platte City', metro: 'kansas-city-metro-northwest-mo' },
  franklin: { seat: 'Union', metro: 'st-louis-metro-west-mo' },
  christian: { seat: 'Ozark', metro: 'springfield-metro-south-mo' },
  'cape-girardeau': { seat: 'Jackson', metro: 'cape-girardeau-metro-mo' },
  buchanan: { seat: 'St. Joseph', metro: 'st-joseph-metro-mo' },
  cole: { seat: 'Jefferson City', metro: 'jefferson-city-metro-mo' },
};

export function applyMissouriCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'missouri') return county;
  const override = missouriCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}