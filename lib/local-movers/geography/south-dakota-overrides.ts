import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated South Dakota counties (batch 1: 26/66) */
export const southDakotaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  minnehaha: { seat: 'Sioux Falls', metro: 'minnehaha-metro-sd' },
  pennington: { seat: 'Rapid City', metro: 'pennington-metro-sd' },
  lincoln: { seat: 'Canton', metro: 'lincoln-metro-sd' },
  brookings: { seat: 'Brookings', metro: 'brookings-metro-sd' },
  brown: { seat: 'Aberdeen', metro: 'brown-metro-sd' },
  meade: { seat: 'Sturgis', metro: 'meade-metro-sd' },
  lawrence: { seat: 'Deadwood', metro: 'lawrence-metro-sd' },
  codington: { seat: 'Watertown', metro: 'codington-metro-sd' },
  yankton: { seat: 'Yankton', metro: 'yankton-metro-sd' },
  davison: { seat: 'Mitchell', metro: 'davison-metro-sd' },
  beadle: { seat: 'Huron', metro: 'beadle-metro-sd' },
  hughes: { seat: 'Pierre', metro: 'hughes-metro-sd' },
  union: { seat: 'Elk Point', metro: 'union-metro-sd' },
  clay: { seat: 'Vermillion', metro: 'clay-metro-sd' },
  shannon: { seat: 'Pine Ridge', metro: 'shannon-metro-sd' },
  lake: { seat: 'Madison', metro: 'lake-metro-sd' },
  butte: { seat: 'Belle Fourche', metro: 'butte-metro-sd' },
  roberts: { seat: 'Sisseton', metro: 'roberts-metro-sd' },
  custer: { seat: 'Custer', metro: 'custer-metro-sd' },
  turner: { seat: 'Parker', metro: 'turner-metro-sd' },
  'charles-mix': { seat: 'Lake Andes', metro: 'charles-mix-metro-sd' },
  todd: { seat: 'Mission', metro: 'todd-metro-sd' },
  'fall-river': { seat: 'Hot Springs', metro: 'fall-river-metro-sd' },
  grant: { seat: 'Milbank', metro: 'grant-metro-sd' },
  hutchinson: { seat: 'Olivet', metro: 'hutchinson-metro-sd' },
  'bon-homme': { seat: 'Tyndall', metro: 'bon-homme-metro-sd' },
};

export function applySouthDakotaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = southDakotaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
