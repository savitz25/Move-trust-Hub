import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated South Carolina counties */
export const southCarolinaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  aiken: { seat: 'Aiken', metro: 'augusta-aiken-metro-sc' },
  dorchester: { seat: 'St. George', metro: 'charleston-metro-sc' },
  pickens: { seat: 'Pickens', metro: 'greenville-metro-sc' },
  florence: { seat: 'Florence', metro: 'florence-metro-sc' },
  lancaster: { seat: 'Lancaster', metro: 'charlotte-metro-sc' },
  sumter: { seat: 'Sumter', metro: 'sumter-metro-sc' },
  oconee: { seat: 'Walhalla', metro: 'greenville-metro-sc' },
  orangeburg: { seat: 'Orangeburg', metro: 'sumter-metro-sc' },
  kershaw: { seat: 'Camden', metro: 'sumter-metro-sc' },
  laurens: { seat: 'Laurens', metro: 'greenville-metro-sc' },
  greenwood: { seat: 'Greenwood', metro: 'greenville-metro-sc' },
  georgetown: { seat: 'Georgetown', metro: 'myrtle-beach-metro-sc' },
  darlington: { seat: 'Darlington', metro: 'florence-metro-sc' },
  cherokee: { seat: 'Gaffney', metro: 'spartanburg-metro-sc' },
  chesterfield: { seat: 'Chesterfield', metro: 'florence-metro-sc' },
  jasper: { seat: 'Ridgeland', metro: 'charleston-metro-sc' },
  newberry: { seat: 'Newberry', metro: 'sumter-metro-sc' },
  colleton: { seat: 'Walterboro', metro: 'charleston-metro-sc' },
  chester: { seat: 'Chester', metro: 'charlotte-metro-sc' },
  clarendon: { seat: 'Manning', metro: 'sumter-metro-sc' },
  edgefield: { seat: 'Edgefield', metro: 'augusta-aiken-metro-sc' },
  williamsburg: { seat: 'Kingstree', metro: 'florence-metro-sc' },
  marion: { seat: 'Marion', metro: 'florence-metro-sc' },
  dillon: { seat: 'Dillon', metro: 'florence-metro-sc' },
  union: { seat: 'Union', metro: 'spartanburg-metro-sc' },
  marlboro: { seat: 'Bennettsville', metro: 'florence-metro-sc' },
  abbeville: { seat: 'Abbeville', metro: 'greenville-metro-sc' },
  barnwell: { seat: 'Barnwell', metro: 'augusta-aiken-metro-sc' },
  fairfield: { seat: 'Winnsboro', metro: 'sumter-metro-sc' },
  saluda: { seat: 'Saluda', metro: 'sumter-metro-sc' },
  hampton: { seat: 'Hampton', metro: 'charleston-metro-sc' },
  lee: { seat: 'Bishopville', metro: 'sumter-metro-sc' },
  calhoun: { seat: 'St. Matthews', metro: 'sumter-metro-sc' },
  bamberg: { seat: 'Bamberg', metro: 'sumter-metro-sc' },
  mccormick: { seat: 'McCormick', metro: 'augusta-aiken-metro-sc' },
  allendale: { seat: 'Allendale', metro: 'augusta-aiken-metro-sc' },
  horry: { seat: 'Conway', metro: 'myrtle-beach-metro-sc' },
  spartanburg: { seat: 'Spartanburg', metro: 'spartanburg-metro-sc' },
  york: { seat: 'York', metro: 'charlotte-metro-sc' },
  anderson: { seat: 'Anderson', metro: 'greenville-metro-sc' },
  beaufort: { seat: 'Beaufort', metro: 'charleston-metro-sc' },
  berkeley: { seat: 'Moncks Corner', metro: 'charleston-metro-sc' },
  lexington: { seat: 'Lexington', metro: 'sumter-metro-sc' },
};

export function applySouthCarolinaCountyOverrides(
  county: LocalCounty
): LocalCounty {
  if (county.stateSlug !== 'south-carolina') return county;
  const override = southCarolinaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}