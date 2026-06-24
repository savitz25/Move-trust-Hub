import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Pennsylvania counties — batches 1–3 */
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
  luzerne: { seat: 'Wilkes-Barre', metro: 'luzerne-metro-pa' },
  northampton: { seat: 'Easton', metro: 'northampton-metro-pa' },
  dauphin: { seat: 'Harrisburg', metro: 'dauphin-metro-pa' },
  cumberland: { seat: 'Carlisle', metro: 'cumberland-metro-pa' },
  erie: { seat: 'Erie', metro: 'erie-metro-pa' },
  lackawanna: { seat: 'Scranton', metro: 'lackawanna-metro-pa' },
  washington: { seat: 'Washington', metro: 'washington-metro-pa' },
  butler: { seat: 'Butler', metro: 'butler-metro-pa' },
  monroe: { seat: 'Stroudsburg', metro: 'monroe-metro-pa' },
  beaver: { seat: 'Beaver', metro: 'beaver-metro-pa' },
  franklin: { seat: 'Chambersburg', metro: 'franklin-metro-pa' },
  centre: { seat: 'Bellefonte', metro: 'centre-metro-pa' },
  lebanon: { seat: 'Lebanon', metro: 'lebanon-metro-pa' },
  schuylkill: { seat: 'Pottsville', metro: 'schuylkill-metro-pa' },
};

export function applyPennsylvaniaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = pennsylvaniaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}