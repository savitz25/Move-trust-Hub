import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Pennsylvania counties — batch 1 */
export const pennsylvaniaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  philadelphia: { seat: 'Philadelphia', metro: 'philadelphia-metro-pa' },
  allegheny: { seat: 'Pittsburgh', metro: 'allegheny-metro-pa' },
  montgomery: { seat: 'Norristown', metro: 'montgomery-metro-pa' },
};

export function applyPennsylvaniaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = pennsylvaniaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}