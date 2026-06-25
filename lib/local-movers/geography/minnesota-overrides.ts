import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Minnesota counties (batches 1–2 — 37 counties) */
export const minnesotaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  hennepin: { seat: "Minneapolis", metro: "hennepin-metro-mn" },
  ramsey: { seat: "Saint Paul", metro: "ramsey-metro-mn" },
  dakota: { seat: "Hastings", metro: "dakota-metro-mn" },
  anoka: { seat: "Anoka", metro: "anoka-metro-mn" },
  washington: { seat: "Stillwater", metro: "washington-metro-mn" },
  'st-louis': { seat: "Duluth", metro: "st-louis-metro-mn" },
  olmsted: { seat: "Rochester", metro: "olmsted-metro-mn" },
  stearns: { seat: "St. Cloud", metro: "stearns-metro-mn" },
  scott: { seat: "Shakopee", metro: "scott-metro-mn" },
  wright: { seat: "Buffalo", metro: "wright-metro-mn" },
  carver: { seat: "Chaska", metro: "carver-metro-mn" },
  sherburne: { seat: "Elk River", metro: "sherburne-metro-mn" },
  'blue-earth': { seat: "Mankato", metro: "blue-earth-metro-mn" },
  rice: { seat: "Faribault", metro: "rice-metro-mn" },
  'crow-wing': { seat: "Brainerd", metro: "crow-wing-metro-mn" },
  clay: { seat: "Moorhead", metro: "clay-metro-mn" },
  'otter-tail': { seat: "Fergus Falls", metro: "otter-tail-metro-mn" },
  chisago: { seat: "Center City", metro: "chisago-metro-mn" },
  winona: { seat: "Winona", metro: "winona-metro-mn" },
  goodhue: { seat: "Red Wing", metro: "goodhue-metro-mn" },
  beltrami: { seat: "Bemidji", metro: "beltrami-metro-mn" },
  itasca: { seat: "Grand Rapids", metro: "itasca-metro-mn" },
  isanti: { seat: "Cambridge", metro: "isanti-metro-mn" },
  kandiyohi: { seat: "Willmar", metro: "kandiyohi-metro-mn" },
  benton: { seat: "Foley", metro: "benton-metro-mn" },
  mower: { seat: "Austin", metro: "mower-metro-mn" },
  douglas: { seat: "Alexandria", metro: "douglas-metro-mn" },
  steele: { seat: "Owatonna", metro: "steele-metro-mn" },
  carlton: { seat: "Carlton", metro: "carlton-metro-mn" },
  mcleod: { seat: "Glencoe", metro: "mcleod-metro-mn" },
  becker: { seat: "Detroit Lakes", metro: "becker-metro-mn" },
  morrison: { seat: "Little Falls", metro: "morrison-metro-mn" },
  nicollet: { seat: "St. Peter", metro: "nicollet-metro-mn" },
  cass: { seat: "Walker", metro: "cass-metro-mn" },
  pine: { seat: "Pine City", metro: "pine-metro-mn" },
  freeborn: { seat: "Albert Lea", metro: "freeborn-metro-mn" },
  polk: { seat: "Crookston", metro: "polk-metro-mn" },
};

export function applyMinnesotaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'minnesota') return county;
  const override = minnesotaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
