import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Oregon premium counties */
export const oregonCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  multnomah: { seat: 'Portland', metro: 'multnomah-metro-or' },
  washington: { seat: 'Hillsboro', metro: 'washington-metro-or' },
  clackamas: { seat: 'Oregon City', metro: 'clackamas-metro-or' },
  lane: { seat: 'Eugene', metro: 'lane-metro-or' },
  marion: { seat: 'Salem', metro: 'marion-metro-or' },
  jackson: { seat: 'Medford', metro: 'jackson-metro-or' },
  deschutes: { seat: 'Bend', metro: 'deschutes-metro-or' },
  linn: { seat: 'Albany', metro: 'linn-metro-or' },
  douglas: { seat: 'Roseburg', metro: 'douglas-metro-or' },
  yamhill: { seat: 'McMinnville', metro: 'yamhill-metro-or' },
  benton: { seat: 'Corvallis', metro: 'benton-metro-or' },
};

export function applyOregonCountyOverrides(county: LocalCounty): LocalCounty {
  const override = oregonCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}