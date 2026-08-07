/**
 * Phase 5 — measurement baseline for Move Trust Hub SEO + integrity program.
 *
 * Future GA4 / GSC comparisons (tool usage, outbound verification, Tier 1 organic
 * landings) should use this date as the pre-instrumentation / program-close marker.
 * Do not backdate or invent historical metrics.
 */

/** ISO date when Phase 5 measurement instrumentation shipped to production intent. */
export const MEASUREMENT_BASELINE_DATE = '2026-08-07';

/** Short label for ops notes and dashboards. */
export const MEASUREMENT_BASELINE_LABEL = 'move-trust-hub-phase-5';

/** Human-readable marker for handoff docs. */
export const MEASUREMENT_BASELINE_NOTE =
  'Baseline: 2026-08-07 — Phase 5 priority research events + GSC tier-aware sitemaps live.';

/**
 * Priority GA4 event names (Move stream G-433BDVV8MJ).
 * Register as custom events / conversions in GA4 Admin after deploy.
 */
export const PRIORITY_RESEARCH_EVENTS = [
  'verify_dot_lookup_complete',
  'calculator_complete',
  'compare_session_multi',
  'save_my_move_mover',
  'save_my_move_inventory',
  'save_my_move_comparison',
  'save_my_move_return',
  'outbound_primary_source',
  'outbound_specialist_hub',
  'research_path_click',
] as const;

export type PriorityResearchEvent = (typeof PRIORITY_RESEARCH_EVENTS)[number];
