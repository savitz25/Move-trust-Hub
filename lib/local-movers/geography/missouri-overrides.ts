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
  'st-francois': { seat: 'Farmington', metro: 'farmington-metro-mo' },
  lincoln: { seat: 'Troy', metro: 'st-louis-metro-north-mo' },
  newton: { seat: 'Neosho', metro: 'joplin-metro-mo' },
  johnson: { seat: 'Warrensburg', metro: 'warrensburg-metro-mo' },
  taney: { seat: 'Forsyth', metro: 'branson-metro-mo' },
  pulaski: { seat: 'Waynesville', metro: 'waynesville-metro-mo' },
  callaway: { seat: 'Fulton', metro: 'jefferson-city-metro-mo' },
  phelps: { seat: 'Rolla', metro: 'rolla-metro-mo' },
  pettis: { seat: 'Sedalia', metro: 'sedalia-metro-mo' },
  webster: { seat: 'Marshfield', metro: 'springfield-metro-east-mo' },
  camden: { seat: 'Camdenton', metro: 'camdenton-metro-mo' },
  butler: { seat: 'Poplar Bluff', metro: 'poplar-bluff-metro-mo' },
  howell: { seat: 'West Plains', metro: 'west-plains-metro-mo' },
  lawrence: { seat: 'Mount Vernon', metro: 'mount-vernon-metro-mo' },
  warren: { seat: 'Warrenton', metro: 'st-louis-metro-west-mo' },
  scott: { seat: 'Benton', metro: 'sikeston-metro-mo' },
  laclede: { seat: 'Lebanon', metro: 'lebanon-metro-mo' },
  barry: { seat: 'Cassville', metro: 'cassville-metro-mo' },
  polk: { seat: 'Bolivar', metro: 'bolivar-metro-mo' },
  lafayette: { seat: 'Lexington', metro: 'kansas-city-metro-east-mo' },
  stone: { seat: 'Galena', metro: 'branson-metro-mo' },
  marion: { seat: 'Palmyra', metro: 'hannibal-metro-mo' },
  stoddard: { seat: 'Bloomfield', metro: 'dexter-metro-mo' },
  dunklin: { seat: 'Kennett', metro: 'kennett-metro-mo' },
  texas: { seat: 'Houston', metro: 'houston-metro-mo' },
  miller: { seat: 'Tuscumbia', metro: 'lake-ozarks-metro-mo' },
  adair: { seat: 'Kirksville', metro: 'kirksville-metro-mo' },
};

export function applyMissouriCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'missouri') return county;
  const override = missouriCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}