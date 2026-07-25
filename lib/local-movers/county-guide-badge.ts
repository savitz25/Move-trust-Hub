/**
 * State hub county-directory badges — data-driven from listed mover count.
 *
 * Rule (locked for directory cards):
 *   moverCount > 30  → "Deep guide"
 *   moverCount ≤ 30  → "Limited"
 *
 * Optional editorial override: counties with genuine deep research content may
 * keep "Deep guide" even when the listed count is slightly under 30.
 * Overrides are opt-in via `editorialDeepGuide` (see state-hub-helpers).
 *
 * Do not invent additional badge types (no "Enriched", "Full guide", "Tier 1")
 * on the directory cards — those labels confused the inventory-vs-content signal.
 */

export type StateHubDirectoryBadge = 'Deep guide' | 'Limited';

/** Listed movers must be strictly greater than this to earn Deep guide by count. */
export const DEEP_GUIDE_MOVER_THRESHOLD = 30;

/**
 * Resolve the badge label for a state hub county card.
 *
 * @param moverCount - Live listed/verified movers for the county (same count
 *   shown on the card and used on the county page).
 * @param options.editorialDeepGuide - When true, force Deep guide regardless of
 *   count (document which counties use this in the helper call site).
 */
export function resolveStateHubDirectoryBadge(
  moverCount: number,
  options?: { editorialDeepGuide?: boolean }
): StateHubDirectoryBadge {
  if (options?.editorialDeepGuide) {
    return 'Deep guide';
  }
  const n = Number.isFinite(moverCount) ? moverCount : 0;
  if (n > DEEP_GUIDE_MOVER_THRESHOLD) {
    return 'Deep guide';
  }
  return 'Limited';
}

/** True when badge should read Deep guide under the count rule (no editorial). */
export function isDeepGuideByMoverCount(moverCount: number): boolean {
  return resolveStateHubDirectoryBadge(moverCount) === 'Deep guide';
}
