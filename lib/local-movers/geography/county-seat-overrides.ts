import type { LocalCounty } from '@/lib/local-movers/types';

/**
 * Manual county-seat corrections ahead of full FIPS reconciliation.
 * Applied after state-specific override maps so known errors always win.
 */
type CountySeatOverride = {
  seat: string;
  metro?: string;
};

export const COUNTY_SEAT_OVERRIDES: Readonly<
  Record<string, Readonly<Record<string, Readonly<CountySeatOverride>>>>
> = {
  colorado: {
    douglas: { seat: 'Castle Rock', metro: 'douglas-metro-co' },
  },
  nebraska: {
    sherman: { seat: 'Loup City' },
    douglas: { seat: 'Omaha' },
  },
  'south-dakota': {
    douglas: { seat: 'Armour' },
  },
  florida: {
    'miami-dade': { seat: 'Miami' },
    broward: { seat: 'Fort Lauderdale' },
    orange: { seat: 'Orlando' },
    hillsborough: { seat: 'Tampa' },
    pinellas: { seat: 'Clearwater' },
  },
  georgia: {
    fulton: { seat: 'Atlanta', metro: 'atlanta-metro-ga' },
  },
  ohio: {
    franklin: { seat: 'Columbus', metro: 'columbus-metro-oh' },
  },
};

export function applyCountySeatOverrides(county: LocalCounty): LocalCounty {
  const override = COUNTY_SEAT_OVERRIDES[county.stateSlug]?.[county.slug];
  if (!override?.seat) return county;
  return {
    ...county,
    seat: override.seat,
    ...(override.metro ? { metro: override.metro } : {}),
  };
}