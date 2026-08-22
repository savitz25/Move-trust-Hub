/**
 * Conservative fail-closed pilot eligibility (ASK-SEARCH-006A.1).
 * Read-only — does not mutate source records.
 */

import { usdotDigits } from './map-company';
import type { EligibilityFailureReason, MoveProviderRecord } from './types';

export type EligibilityResult =
  | { ok: true }
  | { ok: false; reason: EligibilityFailureReason };

/**
 * Pilot predicate (AND):
 * 1. slug present
 * 2. display name present
 * 3. stable identity: USDOT ≥5 digits OR canonical profile slug (move:co-{slug})
 * 4. out_of_service === false
 * 5. authority_active !== false (catalog membership implies active; explicit false fails)
 * 6. geography: physical USPS state OR ≥1 structured coverage county
 * 7. canonical profile slug is URL-safe
 *
 * Explicitly NOT used: payment, premium, ratings, review_count, Trust Score,
 * SEO indexability as Ask discoverability proxy.
 *
 * Free-text headquarters state is NOT required when structured coverage exists.
 */
export function evaluatePilotEligibility(row: MoveProviderRecord): EligibilityResult {
  if (!row.slug || !String(row.slug).trim()) return { ok: false, reason: 'missing_slug' };
  if (!row.name || !String(row.name).trim()) return { ok: false, reason: 'missing_display_name' };

  const usdot = usdotDigits(row.usdot_number);
  const hasUsdot = usdot.length >= 5;
  const hasSlugIdentity = Boolean(row.slug.trim());
  if (!hasUsdot && !hasSlugIdentity) {
    return { ok: false, reason: 'missing_identity' };
  }

  if (row.out_of_service === true) return { ok: false, reason: 'out_of_service' };
  if (row.authority_active === false) return { ok: false, reason: 'authority_inactive' };

  const physicalState = row.physical_state && /^[A-Z]{2}$/.test(row.physical_state)
    ? row.physical_state
    : undefined;
  const hasCoverage = (row.coverage_counties?.length || 0) > 0;

  if (!physicalState && !hasCoverage) {
    return { ok: false, reason: 'insufficient_geography' };
  }

  // Slug must be path-safe for /companies/{slug}
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(row.slug.trim())) {
    return { ok: false, reason: 'invalid_canonical_url' };
  }

  return { ok: true };
}
