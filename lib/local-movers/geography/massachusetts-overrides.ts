import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Massachusetts counties */
export const massachusettsCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  middlesex: { seat: 'Cambridge', metro: 'middlesex-metro-ma' },
  worcester: { seat: 'Worcester', metro: 'worcester-metro-ma' },
  essex: { seat: 'Salem', metro: 'essex-metro-ma' },
  suffolk: { seat: 'Boston', metro: 'suffolk-metro-ma' },
  norfolk: { seat: 'Dedham', metro: 'norfolk-metro-ma' },
  bristol: { seat: 'Taunton', metro: 'bristol-metro-ma' },
  plymouth: { seat: 'Plymouth', metro: 'plymouth-metro-ma' },
  hampden: { seat: 'Springfield', metro: 'hampden-metro-ma' },
  barnstable: { seat: 'Barnstable', metro: 'barnstable-metro-ma' },
  hampshire: { seat: 'Northampton', metro: 'hampshire-metro-ma' },
  berkshire: { seat: 'Pittsfield', metro: 'berkshire-metro-ma' },
  franklin: { seat: 'Greenfield', metro: 'franklin-metro-ma' },
  dukes: { seat: 'Edgartown', metro: 'dukes-metro-ma' },
  nantucket: { seat: 'Nantucket', metro: 'nantucket-metro-ma' },
};

export function applyMassachusettsCountyOverrides(county: LocalCounty): LocalCounty {
  const override = massachusettsCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}