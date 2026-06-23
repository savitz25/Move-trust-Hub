import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Mississippi counties */
export const mississippiCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  harrison: { seat: 'Gulfport', metro: 'gulfport-biloxi-metro-ms' },
  hinds: { seat: 'Jackson', metro: 'jackson-ms-metro-ms' },
  desoto: { seat: 'Hernando', metro: 'desoto-metro-ms' },
  rankin: { seat: 'Brandon', metro: 'jackson-ms-metro-ms' },
  jackson: { seat: 'Pascagoula', metro: 'pascagoula-metro-ms' },
  madison: { seat: 'Canton', metro: 'jackson-ms-metro-ms' },
  lee: { seat: 'Tupelo', metro: 'tupelo-metro-ms' },
  forrest: { seat: 'Hattiesburg', metro: 'hattiesburg-metro-ms' },
  lauderdale: { seat: 'Meridian', metro: 'meridian-metro-ms' },
  lamar: { seat: 'Purvis', metro: 'hattiesburg-metro-ms' },
  jones: { seat: 'Laurel', metro: 'laurel-metro-ms' },
  'pearl-river': { seat: 'Poplarville', metro: 'picayune-metro-ms' },
  lafayette: { seat: 'Oxford', metro: 'oxford-metro-ms' },
  lowndes: { seat: 'Columbus', metro: 'columbus-ms-metro-ms' },
  oktibbeha: { seat: 'Starkville', metro: 'starkville-metro-ms' },
  hancock: { seat: 'Bay St. Louis', metro: 'hancock-coastal-ms' },
  warren: { seat: 'Vicksburg', metro: 'vicksburg-metro-ms' },
  washington: { seat: 'Greenville', metro: 'greenville-metro-ms' },
  pike: { seat: 'McComb', metro: 'mccomb-metro-ms' },
  lincoln: { seat: 'Brookhaven', metro: 'brookhaven-metro-ms' },
  marshall: { seat: 'Holly Springs', metro: 'holly-springs-metro-ms' },
  alcorn: { seat: 'Corinth', metro: 'corinth-metro-ms' },
  monroe: { seat: 'Aberdeen', metro: 'aberdeen-metro-ms' },
  panola: { seat: 'Batesville', metro: 'batesville-metro-ms' },
  pontotoc: { seat: 'Pontotoc', metro: 'pontotoc-metro-ms' },
};

export function applyMississippiCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'mississippi') return county;
  const override = mississippiCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}