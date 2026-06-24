import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Pennsylvania counties — batches 1–4 */
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
  cambria: { seat: 'Ebensburg', metro: 'cambria-metro-pa' },
  fayette: { seat: 'Uniontown', metro: 'fayette-metro-pa' },
  blair: { seat: 'Hollidaysburg', metro: 'blair-metro-pa' },
  lycoming: { seat: 'Williamsport', metro: 'lycoming-metro-pa' },
  adams: { seat: 'Gettysburg', metro: 'adams-metro-pa' },
  mercer: { seat: 'Mercer', metro: 'mercer-metro-pa' },
  northumberland: { seat: 'Sunbury', metro: 'northumberland-metro-pa' },
  lawrence: { seat: 'New Castle', metro: 'lawrence-metro-pa' },
  indiana: { seat: 'Indiana', metro: 'indiana-metro-pa' },
  crawford: { seat: 'Meadville', metro: 'crawford-metro-pa' },
  clearfield: { seat: 'Clearfield', metro: 'clearfield-metro-pa' },
  somerset: { seat: 'Somerset', metro: 'somerset-metro-pa' },
  columbia: { seat: 'Bloomsburg', metro: 'columbia-metro-pa' },
  carbon: { seat: 'Jim Thorpe', metro: 'carbon-metro-pa' },
  armstrong: { seat: 'Kittanning', metro: 'armstrong-metro-pa' },
  pike: { seat: 'Milford', metro: 'pike-metro-pa' },
};

export function applyPennsylvaniaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = pennsylvaniaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}