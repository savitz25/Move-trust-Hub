/**
 * Phase 5 — measurement baseline for Insurance Trust Hub SEO + integrity program.
 *
 * Future GA4 / GSC comparisons (DOI verification usage, calculator completions,
 * organic landings on county/state/Medicare surfaces) use this date as the
 * program-close marker. Do not invent historical metrics.
 */

export const INSURANCE_MEASUREMENT_BASELINE_DATE = '2026-08-07';

export const INSURANCE_MEASUREMENT_BASELINE_LABEL = 'insurance-trust-hub-phase-5';

export const INSURANCE_MEASUREMENT_BASELINE_NOTE =
  'Baseline: 2026-08-07 — Phase 5 priority research events + canonical sitemaps (hubs, Medicare, tools).';

/**
 * Priority GA4 event names for the Insurance stream
 * (NEXT_PUBLIC_GA_MEASUREMENT_ID_INSURANCE when set).
 */
export const INSURANCE_PRIORITY_EVENTS = [
  'license_verification_lookup',
  'outbound_regulator_lookup',
  'insurance_calculator_complete',
  'medicare_dashboard_view',
  'agency_profile_view',
  'insurance_compare_action',
  'my_insurance_save',
  'my_insurance_return',
  'outbound_primary_source',
  'outbound_specialist_hub',
  'research_path_click',
] as const;

export type InsurancePriorityEvent = (typeof INSURANCE_PRIORITY_EVENTS)[number];
