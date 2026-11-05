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

/**
 * Blank headquarters counts as local or regional only with a real locality signal.
 * The unknown-headquarters fallback is not that confirmation.
 */
function isConfirmedLocalOrRegional(mover: LocalMover, county: LocalCounty): boolean {
  const verdict = classifyMoverLocality(mover, county);
  if (verdict.reason === 'insufficient_local_signals') return false;
  return verdict.class === 'local' || verdict.class === 'regional';
}

/**
 * Out of state on a county mover list when headquarters is another state,
 * or blank and not confirmed local or regional for this county.
 * Index counts still use isOutOfStateCarrier, which ignores blank headquarters.
 */
export function isCountyListOutOfState(mover: LocalMover, county: LocalCounty): boolean {
  const hq = (mover.headquartersState ?? '').trim().toUpperCase();
  const page = county.stateCode.trim().toUpperCase();
  if (hq && page && hq !== page) return true;
  if (!hq) return !isConfirmedLocalOrRegional(mover, county);
  return false;
}

/** Carriers that may be listed on the county page. */
export function listedCountyMovers(movers: LocalMover[], county: LocalCounty): LocalMover[] {
  return movers.filter((mover) => !isCountyListOutOfState(mover, county));
}
