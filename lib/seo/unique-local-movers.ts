/**
 * MOVE-THIN-PAGES-INDEXING-001
 * Unique local inventory: movers based in the county, or licensed in that state
 * for the county. Confirmed out-of-state headquarters are national filler.
 */

import { classifyMoverLocality } from '@/lib/local-movers/locality-rules';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

/** Default index threshold: movers based in or licensed for the county or city. */
export const MIN_LOCAL_OR_LICENSED_MOVERS = 3;

export function isOutOfStateCarrier(mover: LocalMover, stateCode: string): boolean {
  const hq = (mover.headquartersState ?? '').trim().toUpperCase();
  const page = stateCode.trim().toUpperCase();
  return Boolean(hq && page && hq !== page);
}

/**
 * Based in: local HQ / in-county match.
 * Licensed for the county: same-state headquarters, or a county assignment whose
 * headquarters state is blank. Blank headquarters is not an out-of-state carrier.
 * Confirmed out-of-state headquarters do not count.
 */
export function isBasedInOrLicensedForCounty(mover: LocalMover, county: LocalCounty): boolean {
  if (isOutOfStateCarrier(mover, county.stateCode)) return false;
  const verdict = classifyMoverLocality(mover, county);
  return verdict.class === 'local' || verdict.class === 'regional';
}

export function qualifyingCountyMovers(county: LocalCounty, movers: LocalMover[]): LocalMover[] {
  return movers.filter((mover) => isBasedInOrLicensedForCounty(mover, county));
}

export function countQualifyingCountyMovers(county: LocalCounty, movers: LocalMover[]): number {
  return qualifyingCountyMovers(county, movers).length;
}

/** Carriers that may be listed on the county page. Drops confirmed out-of-state filler. */
export function listedCountyMovers(movers: LocalMover[], stateCode: string): LocalMover[] {
  return movers.filter((mover) => !isOutOfStateCarrier(mover, stateCode));
}
