import type { LocalCounty } from '@/lib/local-movers/types';

/**
 * Manual county-seat corrections ahead of full FIPS reconciliation.
 * Applied after state-specific override maps so known errors always win.
 */
export const COUNTY_SEAT_OVERRIDES: Readonly<
  Record<string, Readonly<Record<string, Readonly<{ seat: string }>>>>
> = {
  colorado: {
    douglas: { seat: 'Castle Rock' },
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
    fulton: { seat: 'Atlanta' },
  },
  ohio: {
    franklin: { seat: 'Columbus' },
  },
};

export function applyCountySeatOverrides(county: LocalCounty): LocalCounty {
  const override = COUNTY_SEAT_OVERRIDES[county.stateSlug]?.[county.slug];
  if (!override?.seat) return county;
  return { ...county, seat: override.seat };
}