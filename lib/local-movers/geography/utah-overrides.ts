import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Utah counties (batch 1) */
export const utahCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  'salt-lake': { seat: 'Salt Lake City', metro: 'salt-lake-metro-ut' },
  utah: { seat: 'Provo', metro: 'utah-metro-ut' },
  davis: { seat: 'Farmington', metro: 'davis-metro-ut' },
  weber: { seat: 'Ogden', metro: 'weber-metro-ut' },
};

export function applyUtahCountyOverrides(county: LocalCounty): LocalCounty {
  const override = utahCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}