import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Iowa counties (batch 1 — 21 counties) */
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
};

export function applyIowaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'iowa') return county;
  const override = iowaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
