import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Alabama counties */
export const alabamaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  jefferson: { seat: 'Birmingham', metro: 'birmingham-metro-al' },
  baldwin: { seat: 'Bay Minette', metro: 'baldwin-coastal-al' },
  tuscaloosa: { seat: 'Tuscaloosa', metro: 'tuscaloosa-metro-al' },
  shelby: { seat: 'Columbiana', metro: 'birmingham-metro-al' },
  montgomery: { seat: 'Montgomery', metro: 'montgomery-metro-al' },
  lee: { seat: 'Opelika', metro: 'auburn-opelika-metro-al' },
  limestone: { seat: 'Athens', metro: 'huntsville-metro-al' },
  morgan: { seat: 'Decatur', metro: 'decatur-metro-al' },
  calhoun: { seat: 'Anniston', metro: 'anniston-metro-al' },
  houston: { seat: 'Dothan', metro: 'dothan-metro-al' },
  etowah: { seat: 'Gadsden', metro: 'gadsden-metro-al' },
  marshall: { seat: 'Guntersville', metro: 'marshall-lakes-al' },
  'st-clair': { seat: 'Pell City', metro: 'birmingham-metro-al' },
  lauderdale: { seat: 'Florence', metro: 'florence-shoals-metro-al' },
  cullman: { seat: 'Cullman', metro: 'cullman-metro-al' },
  elmore: { seat: 'Wetumpka', metro: 'montgomery-metro-al' },
  talladega: { seat: 'Talladega', metro: 'talladega-metro-al' },
  dekalb: { seat: 'Fort Payne', metro: 'fort-payne-metro-al' },
  walker: { seat: 'Jasper', metro: 'jasper-metro-al' },
  autauga: { seat: 'Prattville', metro: 'montgomery-metro-al' },
  blount: { seat: 'Oneonta', metro: 'birmingham-metro-al' },
  colbert: { seat: 'Tuscumbia', metro: 'florence-shoals-metro-al' },
};

export function applyAlabamaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'alabama') return county;
  const override = alabamaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}