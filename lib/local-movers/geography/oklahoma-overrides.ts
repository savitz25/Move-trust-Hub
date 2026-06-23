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
  washington: { seat: 'Bartlesville', metro: 'bartlesville-metro-ok' },
  bryan: { seat: 'Durant', metro: 'durant-metro-ok' },
  mcclain: { seat: 'Purcell', metro: 'oklahoma-city-metro-ok' },
  'le-flore': { seat: 'Poteau', metro: 'poteau-metro-ok' },
  cherokee: { seat: 'Tahlequah', metro: 'tahlequah-metro-ok' },
  carter: { seat: 'Ardmore', metro: 'ardmore-metro-ok' },
  osage: { seat: 'Pawhuska', metro: 'tulsa-metro-ok' },
  stephens: { seat: 'Duncan', metro: 'duncan-metro-ok' },
  kay: { seat: 'Newkirk', metro: 'ponca-city-metro-ok' },
  pittsburg: { seat: 'McAlester', metro: 'mcalester-metro-ok' },
  delaware: { seat: 'Jay', metro: 'jay-metro-ok' },
  sequoyah: { seat: 'Sallisaw', metro: 'sallisaw-metro-ok' },
  mayes: { seat: 'Pryor', metro: 'pryor-metro-ok' },
  pontotoc: { seat: 'Ada', metro: 'ada-metro-ok' },
  okmulgee: { seat: 'Okmulgee', metro: 'okmulgee-metro-ok' },
  lincoln: { seat: 'Chandler', metro: 'chandler-metro-ok' },
  mccurtain: { seat: 'Idabel', metro: 'idabel-metro-ok' },
  ottawa: { seat: 'Miami', metro: 'miami-metro-ok' },
  custer: { seat: 'Arapaho', metro: 'weatherford-metro-ok' },
  garvin: { seat: 'Pauls Valley', metro: 'pauls-valley-metro-ok' },
  caddo: { seat: 'Anadarko', metro: 'anadarko-metro-ok' },
  jackson: { seat: 'Altus', metro: 'altus-metro-ok' },
  seminole: { seat: 'Wewoka', metro: 'seminole-metro-ok' },
  beckham: { seat: 'Sayre', metro: 'sayre-metro-ok' },
  texas: { seat: 'Guymon', metro: 'guymon-metro-ok' },
  adair: { seat: 'Stilwell', metro: 'stilwell-metro-ok' },
  mcintosh: { seat: 'Eufaula', metro: 'eufaula-metro-ok' },
  woodward: { seat: 'Woodward', metro: 'woodward-metro-ok' },
  marshall: { seat: 'Madill', metro: 'madill-metro-ok' },
  pawnee: { seat: 'Pawnee', metro: 'pawnee-metro-ok' },
};

export function applyOklahomaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'oklahoma') return county;
  const override = oklahomaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}