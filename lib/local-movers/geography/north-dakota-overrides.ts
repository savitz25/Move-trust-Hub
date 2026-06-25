import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated North Dakota counties (25/53) */
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
};

export function applyNorthDakotaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = northDakotaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
