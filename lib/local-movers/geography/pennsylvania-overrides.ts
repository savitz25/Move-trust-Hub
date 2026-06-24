import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Pennsylvania counties — batches 1–2 */
export const pennsylvaniaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  philadelphia: { seat: 'Philadelphia', metro: 'philadelphia-metro-pa' },
  allegheny: { seat: 'Pittsburgh', metro: 'allegheny-metro-pa' },
  montgomery: { seat: 'Norristown', metro: 'montgomery-metro-pa' },
  bucks: { seat: 'Doylestown', metro: 'bucks-metro-pa' },
  delaware: { seat: 'Media', metro: 'delaware-metro-pa' },
  lancaster: { seat: 'Lancaster', metro: 'lancaster-metro-pa' },
  chester: { seat: 'West Chester', metro: 'chester-metro-pa' },
  york: { seat: 'York', metro: 'york-metro-pa' },
  berks: { seat: 'Reading', metro: 'berks-metro-pa' },
  lehigh: { seat: 'Allentown', metro: 'lehigh-metro-pa' },
  westmoreland: { seat: 'Greensburg', metro: 'westmoreland-metro-pa' },
};

export function applyPennsylvaniaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = pennsylvaniaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}