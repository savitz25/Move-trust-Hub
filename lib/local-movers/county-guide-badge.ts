/**
 * State hub county-directory badges — strict count threshold.
 *
 * Rule (locked):
 *   moverCount > 30  → "Deep guide"
 *   moverCount ≤ 30  → "Limited"
 *
 * Examples:
 *   35 → Deep guide
 *   31 → Deep guide
 *   30 → Limited
 *   29 → Limited
 *   28 → Limited
 *   12 → Limited
 *
 * Editorial overrides: DISABLED this pass. Every county follows the count rule
 * only. (Previously hasDeepCountyResearch forced Deep guide under 30 and
 * mislabeled Florida 26–30 mover counties.)
 *
 * Optional future override (not enabled): genuine deep research AND only
 * 1–2 movers under the line (count 28–29). Document any exception in
 * EDITORIAL_BADGE_OVERRIDES below if re-enabled.
 *
 * Badge types on cards: "Deep guide" | "Limited" only.
 */

export type StateHubDirectoryBadge = 'Deep guide' | 'Limited';

/** Listed movers must be strictly greater than this to earn Deep guide. */
export const DEEP_GUIDE_MOVER_THRESHOLD = 30;

/**
 * Max distance under the Deep-guide line for a *potential* editorial override.
 * Not applied unless `allowNearThresholdEditorial` is true.
 * 1–2 under the line ⇒ counts 28–29 only (30 stays Limited).
 */
export const EDITORIAL_NEAR_THRESHOLD_MIN = 28;
export const EDITORIAL_NEAR_THRESHOLD_MAX = 29;

/**
 * Documented editorial badge overrides (state/county).
 * Empty — strict count rule only this pass.
 */
export const EDITORIAL_BADGE_OVERRIDES: ReadonlyArray<{
  stateSlug: string;
  countySlug: string;
  reason: string;
}> = [
  // Intentionally empty under strict threshold policy.
];

/**
 * Resolve the badge label for a state hub county card.
 *
 * @param moverCount - Live listed/verified movers for the county (same count
 *   shown on the card).
 * @param options.hasDeepResearch - genuine deep research content flag
 * @param options.allowNearThresholdEditorial - when true, deep-research counties
 *   with count 28–29 may keep Deep guide (off by default / this pass)
 */
export function resolveStateHubDirectoryBadge(
  moverCount: number,
  options?: {
    hasDeepResearch?: boolean;
    allowNearThresholdEditorial?: boolean;
    /** @deprecated No longer forces Deep guide; kept for call-site compatibility. */
    editorialDeepGuide?: boolean;
  }
): StateHubDirectoryBadge {
  const n = Number.isFinite(moverCount) ? Math.max(0, Math.floor(moverCount)) : 0;

  // Strict primary rule
  if (n > DEEP_GUIDE_MOVER_THRESHOLD) {
    return 'Deep guide';
  }

  // Near-threshold editorial (opt-in only; disabled in production call sites)
  if (
    options?.allowNearThresholdEditorial &&
    options?.hasDeepResearch &&
    n >= EDITORIAL_NEAR_THRESHOLD_MIN &&
    n <= EDITORIAL_NEAR_THRESHOLD_MAX
  ) {
    return 'Deep guide';
  }

  return 'Limited';
}

/** True when badge should read Deep guide under the strict count rule. */
export function isDeepGuideByMoverCount(moverCount: number): boolean {
  return resolveStateHubDirectoryBadge(moverCount) === 'Deep guide';
}
