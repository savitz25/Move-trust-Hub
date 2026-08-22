/**
 * Conservative fail-closed pilot eligibility (ASK-SEARCH-006A).
 * Read-only — does not mutate source records.
 */

import { parseHeadquarters } from './geography';
import { usdotDigits } from './map-company';
import type { EligibilityFailureReason, MoveCompanySnapshotRow } from './types';

export type EligibilityResult =
  | { ok: true }
  | { ok: false; reason: EligibilityFailureReason };

/**
 * Pilot predicate (AND):
 * 1. slug present
 * 2. display name present
 * 3. USDOT with ≥5 digits (stable identity for this snapshot)
 * 4. out_of_service === false
 * 5. authority_active === true
 * 6. headquarters yields parseable USPS state (city-only HQ is insufficient)
 *
 * Explicitly NOT used: payment, premium, ratings, review_count, Trust Score.
 * is_verified is NOT required (would shrink cohort without safety gain for FIND).
 */
export function evaluatePilotEligibility(row: MoveCompanySnapshotRow): EligibilityResult {
  if (!row.slug || !String(row.slug).trim()) return { ok: false, reason: 'missing_slug' };
  if (!row.name || !String(row.name).trim()) return { ok: false, reason: 'missing_display_name' };

  const usdot = usdotDigits(row.usdot_number);
  if (usdot.length < 5) return { ok: false, reason: 'missing_usdot' };

  if (row.out_of_service === true) return { ok: false, reason: 'out_of_service' };
  if (row.authority_active !== true) return { ok: false, reason: 'authority_inactive' };

  const geo = parseHeadquarters(row.headquarters);
  if (!geo?.complete || !geo.state || !/^[A-Z]{2}$/.test(geo.state)) {
    return { ok: false, reason: 'insufficient_geography' };
  }

  return { ok: true };
}
