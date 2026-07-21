import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated North Dakota counties (53/53) */
export const northDakotaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  cass: { seat: 'Fargo', metro: 'cass-metro-nd' },
  burleigh: { seat: 'Bismarck', metro: 'burleigh-metro-nd' },
  'grand-forks': { seat: 'Grand Forks', metro: 'grand-forks-metro-nd' },
  ward: { seat: 'Minot', metro: 'ward-metro-nd' },
  williams: { seat: 'Williston', metro: 'williams-metro-nd' },
  morton: { seat: 'Mandan', metro: 'morton-metro-nd' },
  stark: { seat: 'Dickinson', metro: 'stark-metro-nd' },
  stutsman: { seat: 'Jamestown', metro: 'stutsman-metro-nd' },
  richland: { seat: 'Wahpeton', metro: 'richland-metro-nd' },
  mckenzie: { seat: 'Watford City', metro: 'mckenzie-metro-nd' },
  rolette: { seat: 'Rolla', metro: 'rolette-metro-nd' },
  ramsey: { seat: 'Devils Lake', metro: 'ramsey-metro-nd' },
  barnes: { seat: 'Valley City', metro: 'barnes-metro-nd' },
  walsh: { seat: 'Grafton', metro: 'walsh-metro-nd' },
  mclean: { seat: 'Washburn', metro: 'mclean-metro-nd' },
  mountrail: { seat: 'Stanley', metro: 'mountrail-metro-nd' },
  mercer: { seat: 'Stanton', metro: 'mercer-metro-nd' },
  traill: { seat: 'Hillsboro', metro: 'traill-metro-nd' },
  pembina: { seat: 'Cavalier', metro: 'pembina-metro-nd' },
  bottineau: { seat: 'Bottineau', metro: 'bottineau-metro-nd' },
  benson: { seat: 'Minnewaukan', metro: 'benson-metro-nd' },
  ransom: { seat: 'Lisbon', metro: 'ransom-metro-nd' },
  lamoure: { seat: 'LaMoure', metro: 'lamoure-metro-nd' },
  dunn: { seat: 'Killdeer', metro: 'dunn-metro-nd' },
  pierce: { seat: 'Rugby', metro: 'pierce-metro-nd' },
  sargent: { seat: 'Forman', metro: 'sargent-metro-nd' },
  wells: { seat: 'Fessenden', metro: 'wells-metro-nd' },
  sioux: { seat: 'Fort Yates', metro: 'sioux-metro-nd' },
  cavalier: { seat: 'Langdon', metro: 'cavalier-metro-nd' },
  emmons: { seat: 'Linton', metro: 'emmons-metro-nd' },
  foster: { seat: 'Carrington', metro: 'foster-metro-nd' },
  nelson: { seat: 'Lakota', metro: 'nelson-metro-nd' },
  bowman: { seat: 'Bowman', metro: 'bowman-metro-nd' },
  hettinger: { seat: 'Hettinger', metro: 'hettinger-metro-nd' },
  mcintosh: { seat: 'Ashley', metro: 'mcintosh-metro-nd' },
  kidder: { seat: 'Steele', metro: 'kidder-metro-nd' },
  renville: { seat: 'Mohall', metro: 'renville-metro-nd' },
  adams: { seat: 'Hettinger', metro: 'adams-metro-nd' },
  eddy: { seat: 'New Rockford', metro: 'eddy-metro-nd' },
  griggs: { seat: 'Cooperstown', metro: 'griggs-metro-nd' },
  grant: { seat: 'Carson', metro: 'grant-metro-nd' },
  burke: { seat: 'Bowbells', metro: 'burke-metro-nd' },
  divide: { seat: 'Crosby', metro: 'divide-metro-nd' },
  towner: { seat: 'Cando', metro: 'towner-metro-nd' },
  oliver: { seat: 'Center', metro: 'oliver-metro-nd' },
  'golden-valley': { seat: 'Beach', metro: 'golden-valley-metro-nd' },
  logan: { seat: 'Napoleon', metro: 'logan-metro-nd' },
  steele: { seat: 'Finley', metro: 'steele-metro-nd' },
  sheridan: { seat: 'McClusky', metro: 'sheridan-metro-nd' },
  billings: { seat: 'Medora', metro: 'billings-metro-nd' },
  slope: { seat: 'Amidon', metro: 'slope-metro-nd' },
  dickey: { seat: 'Ellendale', metro: 'dickey-metro-nd' },
  mchenry: { seat: 'Towner', metro: 'mchenry-metro-nd' },
};

export function applyNorthDakotaCountyOverrides(county: LocalCounty): LocalCounty {
  
if (county.stateSlug !== 'north-dakota') return county;
  const override = northDakotaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
