import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Iowa counties (batch 1 + batch 2 — 47 counties) */
export const iowaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  polk: { seat: 'Des Moines', metro: 'polk-metro-ia' },
  linn: { seat: 'Cedar Rapids', metro: 'linn-metro-ia' },
  scott: { seat: 'Davenport', metro: 'scott-metro-ia' },
  johnson: { seat: 'Iowa City', metro: 'johnson-metro-ia' },
  'black-hawk': { seat: 'Waterloo', metro: 'black-hawk-metro-ia' },
  dallas: { seat: 'Adel', metro: 'dallas-metro-ia' },
  woodbury: { seat: 'Sioux City', metro: 'woodbury-metro-ia' },
  story: { seat: 'Nevada', metro: 'story-metro-ia' },
  dubuque: { seat: 'Dubuque', metro: 'dubuque-metro-ia' },
  pottawattamie: { seat: 'Council Bluffs', metro: 'pottawattamie-metro-ia' },
  warren: { seat: 'Indianola', metro: 'warren-metro-ia' },
  clinton: { seat: 'Clinton', metro: 'clinton-metro-ia' },
  'cerro-gordo': { seat: 'Mason City', metro: 'cerro-gordo-metro-ia' },
  muscatine: { seat: 'Muscatine', metro: 'muscatine-metro-ia' },
  marshall: { seat: 'Marshalltown', metro: 'marshall-metro-ia' },
  jasper: { seat: 'Newton', metro: 'jasper-metro-ia' },
  'des-moines': { seat: 'Burlington', metro: 'des-moines-metro-ia' },
  webster: { seat: 'Fort Dodge', metro: 'webster-metro-ia' },
  sioux: { seat: 'Orange City', metro: 'sioux-metro-ia' },
  wapello: { seat: 'Ottumwa', metro: 'wapello-metro-ia' },
  marion: { seat: 'Knoxville', metro: 'marion-metro-ia' },
  lee: { seat: 'Fort Madison', metro: 'lee-metro-ia' },
  boone: { seat: 'Boone', metro: 'boone-metro-ia' },
  benton: { seat: 'Vinton', metro: 'benton-metro-ia' },
  plymouth: { seat: 'Le Mars', metro: 'plymouth-metro-ia' },
  bremer: { seat: 'Waverly', metro: 'bremer-metro-ia' },
  washington: { seat: 'Washington', metro: 'washington-metro-ia' },
  mahaska: { seat: 'Oskaloosa', metro: 'mahaska-metro-ia' },
  jones: { seat: 'Anamosa', metro: 'jones-metro-ia' },
  buchanan: { seat: 'Independence', metro: 'buchanan-metro-ia' },
  'buena-vista': { seat: 'Storm Lake', metro: 'buena-vista-metro-ia' },
  carroll: { seat: 'Carroll', metro: 'carroll-metro-ia' },
  winneshiek: { seat: 'Decorah', metro: 'winneshiek-metro-ia' },
  henry: { seat: 'Mount Pleasant', metro: 'henry-metro-ia' },
  jackson: { seat: 'Maquoketa', metro: 'jackson-metro-ia' },
  fayette: { seat: 'West Union', metro: 'fayette-metro-ia' },
  cedar: { seat: 'Tipton', metro: 'cedar-metro-ia' },
  poweshiek: { seat: 'Montezuma', metro: 'poweshiek-metro-ia' },
  dickinson: { seat: 'Spirit Lake', metro: 'dickinson-metro-ia' },
  delaware: { seat: 'Manchester', metro: 'delaware-metro-ia' },
  iowa: { seat: 'Marengo', metro: 'iowa-metro-ia' },
  hardin: { seat: 'Eldora', metro: 'hardin-metro-ia' },
  crawford: { seat: 'Denison', metro: 'crawford-metro-ia' },
  clay: { seat: 'Spencer', metro: 'clay-metro-ia' },
  jefferson: { seat: 'Fairfield', metro: 'jefferson-metro-ia' },
  hamilton: { seat: 'Webster City', metro: 'hamilton-metro-ia' },
  mills: { seat: 'Glenwood', metro: 'mills-metro-ia' },
};

export function applyIowaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'iowa') return county;
  const override = iowaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
