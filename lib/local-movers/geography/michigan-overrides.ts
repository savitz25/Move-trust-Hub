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
  allegan: { seat: 'Allegan', metro: 'holland-allegan-metro-mi' },
  eaton: { seat: 'Charlotte', metro: 'lansing-metro-mi' },
  bay: { seat: 'Bay City', metro: 'bay-city-metro-mi' },
  lenawee: { seat: 'Adrian', metro: 'adrian-metro-mi' },
  'grand-traverse': { seat: 'Traverse City', metro: 'traverse-city-metro-mi' },
  lapeer: { seat: 'Lapeer', metro: 'detroit-metro-mi' },
  midland: { seat: 'Midland', metro: 'midland-metro-mi' },
  clinton: { seat: 'St. Johns', metro: 'lansing-metro-mi' },
  'van-buren': { seat: 'Paw Paw', metro: 'southwest-michigan-mi' },
  montcalm: { seat: 'Stanton', metro: 'central-michigan-mi' },
  marquette: { seat: 'Marquette', metro: 'marquette-metro-mi' },
  shiawassee: { seat: 'Corunna', metro: 'owosso-metro-mi' },
  ionia: { seat: 'Ionia', metro: 'ionia-metro-mi' },
  isabella: { seat: 'Mount Pleasant', metro: 'mount-pleasant-metro-mi' },
  barry: { seat: 'Hastings', metro: 'hastings-metro-mi' },
  'st-joseph': { seat: 'Centreville', metro: 'three-rivers-metro-mi' },
  tuscola: { seat: 'Caro', metro: 'caro-metro-mi' },
  newaygo: { seat: 'White Cloud', metro: 'newaygo-metro-mi' },
  cass: { seat: 'Cassopolis', metro: 'southwest-michigan-mi' },
  branch: { seat: 'Coldwater', metro: 'coldwater-metro-mi' },
  hillsdale: { seat: 'Hillsdale', metro: 'hillsdale-metro-mi' },
  mecosta: { seat: 'Big Rapids', metro: 'big-rapids-metro-mi' },
  gratiot: { seat: 'Ithaca', metro: 'central-michigan-mi' },
  sanilac: { seat: 'Sandusky', metro: 'sandusky-metro-mi' },
};

export function applyMichiganCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'michigan') return county;
  const override = michiganCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}