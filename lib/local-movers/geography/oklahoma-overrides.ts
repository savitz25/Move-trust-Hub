import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Oklahoma counties */
export const oklahomaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  oklahoma: { seat: 'Oklahoma City', metro: 'oklahoma-city-metro-ok' },
  tulsa: { seat: 'Tulsa', metro: 'tulsa-metro-ok' },
  cleveland: { seat: 'Norman', metro: 'oklahoma-city-metro-ok' },
  canadian: { seat: 'El Reno', metro: 'oklahoma-city-metro-ok' },
  comanche: { seat: 'Lawton', metro: 'lawton-metro-ok' },
  rogers: { seat: 'Claremore', metro: 'tulsa-metro-ok' },
  wagoner: { seat: 'Wagoner', metro: 'tulsa-metro-ok' },
  payne: { seat: 'Stillwater', metro: 'stillwater-metro-ok' },
  creek: { seat: 'Sapulpa', metro: 'tulsa-metro-ok' },
  pottawatomie: { seat: 'Shawnee', metro: 'shawnee-metro-ok' },
  muskogee: { seat: 'Muskogee', metro: 'muskogee-metro-ok' },
  garfield: { seat: 'Enid', metro: 'enid-metro-ok' },
  grady: { seat: 'Chickasha', metro: 'chickasha-metro-ok' },
  logan: { seat: 'Guthrie', metro: 'oklahoma-city-metro-ok' },
};

export function applyOklahomaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'oklahoma') return county;
  const override = oklahomaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}