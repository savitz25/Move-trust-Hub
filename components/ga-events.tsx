'use client';

export {
  GA_CROSS_DOMAIN_LINKS,
  GA_CROSS_DOMAIN_LINKS_MOVE,
  GA_MEASUREMENT_ID,
  GA_MEASUREMENT_ID_MOVE_CANONICAL,
} from '@/lib/analytics/ga-config';

type GaEventParams = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function sanitizeParams(params: GaEventParams): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== ''
    )
  ) as Record<string, string | number | boolean>;
}

export function trackGaEvent(eventName: string, params: GaEventParams = {}) {
  if (typeof window === 'undefined') return;

  const gtag = window.gtag;
  if (typeof gtag !== 'function') return;

  gtag('event', eventName, sanitizeParams(params));
}

export type MoveLaunchEventName =
  | 'move_search' | 'move_path_selected' | 'trust_report_open' | 'source_open'
  | 'compare_add' | 'compare_view' | 'shortlist_add' | 'shortlist_remove'
  | 'calculator_start' | 'calculator_complete' | 'move_plan_start'
  | 'provider_website_click' | 'provider_phone_click';

const MOVE_EVENT_FIELDS = new Set([
  'state', 'move_path', 'evidence_tier', 'provider_id', 'source_type',
  'count', 'page_path', 'calculator_type',
]);

/** Privacy-bounded launch analytics. ZIPs, contact data, dates and free text are rejected. */
export function trackMoveLaunchEvent(name: MoveLaunchEventName, params: GaEventParams = {}, onceKey?: string) {
  for (const key of Object.keys(params)) {
    if (!MOVE_EVENT_FIELDS.has(key)) throw new Error(`Move analytics field not approved: ${key}`);
  }
  if (onceKey && typeof window !== 'undefined') {
    const key = `mth_move_event:${name}:${onceKey}`;
    try { if (sessionStorage.getItem(key) === '1') return; sessionStorage.setItem(key, '1'); } catch { /* analytics remains non-critical */ }
  }
  trackGaEvent(name, params);
}

export function trackCalculatorStart(params: {
  interaction: string;
  mode?: string;
}) {
  trackGaEvent('calculator_start', {
    interaction: params.interaction,
    calculator_mode: params.mode,
    page_path: '/moving-calculator',
  });
}

export function trackCalculatorComplete(params: {
  volume: number;
  weight: number;
  truck_size: string;
  move_size: string;
  item_count: number;
  mode?: string;
}) {
  trackGaEvent('calculator_complete', {
    volume: params.volume,
    weight: params.weight,
    truck_size: params.truck_size,
    move_size: params.move_size,
    item_count: params.item_count,
    calculator_mode: params.mode,
    page_path: '/moving-calculator',
  });
}

export function trackPresetSelected(params: { preset: string }) {
  trackGaEvent('preset_selected', {
    preset: params.preset,
    page_path: '/moving-calculator',
  });
}

export function trackItemAdded(params: {
  item_name: string;
  room?: string;
  mode?: string;
  source?: string;
}) {
  trackGaEvent('item_added', {
    item_name: params.item_name,
    room: params.room,
    calculator_mode: params.mode,
    source: params.source,
    page_path: '/moving-calculator',
  });
}

export function trackPdfDownloaded(params: {
  volume: number;
  item_count: number;
}) {
  trackGaEvent('pdf_downloaded', {
    volume: params.volume,
    item_count: params.item_count,
    page_path: '/moving-calculator',
  });
}

export function trackInventoryShared(params: { method: string }) {
  trackGaEvent('inventory_shared', {
    method: params.method,
    page_path: '/moving-calculator',
  });
}

export function trackBoxesSuggested(params: { box_count: number }) {
  trackGaEvent('boxes_suggested_added', {
    box_count: params.box_count,
    page_path: '/moving-calculator',
  });
}

export function trackSaveMyMoveAuth(params: { method: string }) {
  trackGaEvent('save_my_move_auth_started', {
    method: params.method,
  });
}

export function trackSaveMyMoveInventory(params: { item_count: number }) {
  trackGaEvent('save_my_move_inventory', {
    item_count: params.item_count,
  });
}

export function trackSaveMyMoveMover(params: { company_slug: string }) {
  trackGaEvent('save_my_move_mover', {
    company_slug: params.company_slug,
  });
}

export function trackSaveMyMoveComparison(params: { mover_count: number }) {
  trackGaEvent('save_my_move_comparison', {
    mover_count: params.mover_count,
  });
}

export function trackSaveMyMoveMerge(params: {
  merged_inventory: boolean;
  merged_compare: boolean;
}) {
  trackGaEvent('save_my_move_merge', {
    merged_inventory: params.merged_inventory,
    merged_compare: params.merged_compare,
  });
}

export function trackLegacyArrival(params: {
  legacy_source: string;
  hub: string;
  page_path?: string;
}) {
  trackGaEvent('legacy_redirect_arrival', {
    legacy_source: params.legacy_source,
    hub: params.hub,
    page_path: params.page_path,
  });
}

export function trackHubPageView(params: {
  hub: string;
  page_path: string;
  page_title?: string;
}) {
  trackGaEvent('page_view', {
    hub: params.hub,
    page_path: params.page_path,
    page_title: params.page_title,
  });
}

export function trackZipSearch(params: {
  hub: string;
  zip: string;
  destination: string;
}) {
  trackGaEvent('zip_search', {
    hub: params.hub,
    zip: params.zip,
    destination: params.destination,
  });
}

export function trackHubCalculatorUse(params: {
  hub: string;
  calculator_name: string;
  page_path: string;
}) {
  trackGaEvent('hub_calculator_use', {
    hub: params.hub,
    calculator_name: params.calculator_name,
    page_path: params.page_path,
  });
}

export function trackQuoteFormSubmit(params: {
  from_zip: string;
  to_zip: string;
  home_size: string;
  source: string;
  service_type?: string;
  estimated_volume?: number | null;
  estimated_weight?: number | null;
  has_inventory?: boolean;
  has_phone?: boolean;
}) {
  trackGaEvent('quote_form_submit', {
    from_zip: params.from_zip,
    to_zip: params.to_zip,
    home_size: params.home_size,
    source: params.source,
    service_type: params.service_type,
    estimated_volume: params.estimated_volume ?? undefined,
    estimated_weight: params.estimated_weight ?? undefined,
    has_inventory: params.has_inventory ?? false,
    has_phone: params.has_phone ?? false,
  });
}

// ── Phase 5 priority research events ────────────────────────────────────────

/** Verify DOT lookup finished (match, no-match, or multi-candidate picker). */
export function trackVerifyDotLookupComplete(params: {
  mode: 'license' | 'name';
  outcome: 'match' | 'no_match' | 'multi_candidate' | 'error';
  source_page?: string;
  has_directory_slug?: boolean;
}) {
  trackGaEvent('verify_dot_lookup_complete', {
    search_mode: params.mode,
    outcome: params.outcome,
    source_page: params.source_page,
    has_directory_slug: params.has_directory_slug ?? false,
    page_path: '/verify-dot',
  });
}

/**
 * Compare session reached 2+ movers (once per browser session).
 * Mirrors the product moment: side-by-side research started.
 */
export function trackCompareSessionMulti(params: {
  mover_count: number;
  page_path?: string;
}) {
  if (typeof window !== 'undefined') {
    try {
      const key = 'mth_compare_session_multi';
      if (sessionStorage.getItem(key) === '1') return;
      sessionStorage.setItem(key, '1');
    } catch {
      /* private mode — still fire once per call site */
    }
  }
  trackGaEvent('compare_session_multi', {
    mover_count: params.mover_count,
    page_path: params.page_path ?? '/compare',
  });
}

/** Authenticated or returning visitor opens My Move workspace. */
export function trackSaveMyMoveReturn(params: {
  authenticated: boolean;
  page_path?: string;
}) {
  if (typeof window !== 'undefined') {
    try {
      const key = 'mth_my_move_return';
      if (sessionStorage.getItem(key) === '1') return;
      sessionStorage.setItem(key, '1');
    } catch {
      /* ignore */
    }
  }
  trackGaEvent('save_my_move_return', {
    authenticated: params.authenticated,
    page_path: params.page_path ?? '/my-move',
  });
}

/** Outbound click to FMCSA SAFER or other primary government sources. */
export function trackOutboundPrimarySource(params: {
  destination_host: string;
  link_label?: string;
  page_path?: string;
}) {
  trackGaEvent('outbound_primary_source', {
    destination_host: params.destination_host,
    link_label: params.link_label,
    page_path: params.page_path,
  });
}

/** Outbound click to Ask / Lender / Insurance / Move specialist hubs. */
export function trackOutboundSpecialistHub(params: {
  hub: 'ask' | 'lender' | 'insurance' | 'move' | 'contractor';
  destination_host: string;
  page_path?: string;
}) {
  trackGaEvent('outbound_specialist_hub', {
    specialist_hub: params.hub,
    destination_host: params.destination_host,
    page_path: params.page_path,
  });
}

/**
 * Internal research path: county→profile, profile→compare, tool→directory, etc.
 */
export function trackResearchPathClick(params: {
  path_kind: string;
  from_path: string;
  to_path: string;
}) {
  trackGaEvent('research_path_click', {
    path_kind: params.path_kind,
    from_path: params.from_path,
    to_path: params.to_path,
  });
}

// ── Insurance Trust Hub Phase 5 priority events ─────────────────────────────

/** User initiated official state DOI / regulator lookup (consent confirmed). */
export function trackLicenseVerificationLookup(params: {
  state_code: string;
  destination_host?: string;
  has_name_hint?: boolean;
}) {
  trackGaEvent('license_verification_lookup', {
    state_code: params.state_code,
    destination_host: params.destination_host,
    has_name_hint: params.has_name_hint ?? false,
    page_path: '/tools/license-verification',
  });
}

/** Explicit outbound to regulator lookup (also covered by click tracker). */
export function trackOutboundRegulatorLookup(params: {
  state_code?: string;
  destination_host: string;
  page_path?: string;
}) {
  trackGaEvent('outbound_regulator_lookup', {
    state_code: params.state_code,
    destination_host: params.destination_host,
    page_path: params.page_path,
  });
}

/** Insurance educational calculator finished a result (once per session per tool). */
export function trackInsuranceCalculatorComplete(params: {
  calculator_name: string;
  page_path: string;
}) {
  if (typeof window !== 'undefined') {
    try {
      const key = `ith_calc_complete_${params.calculator_name}`;
      if (sessionStorage.getItem(key) === '1') return;
      sessionStorage.setItem(key, '1');
    } catch {
      /* ignore */
    }
  }
  trackGaEvent('insurance_calculator_complete', {
    calculator_name: params.calculator_name,
    page_path: params.page_path,
  });
}

/** Medicare silo dashboard engagement (once per session per path). */
export function trackMedicareDashboardView(params: {
  state_slug?: string;
  county_slug?: string;
  page_path: string;
}) {
  if (typeof window !== 'undefined') {
    try {
      const key = `ith_medicare_view_${params.page_path}`;
      if (sessionStorage.getItem(key) === '1') return;
      sessionStorage.setItem(key, '1');
    } catch {
      /* ignore */
    }
  }
  trackGaEvent('medicare_dashboard_view', {
    state_slug: params.state_slug,
    county_slug: params.county_slug,
    page_path: params.page_path,
  });
}

/** Agency profile research view (once per session per slug). */
export function trackAgencyProfileView(params: {
  provider_slug: string;
  page_path?: string;
}) {
  if (typeof window !== 'undefined') {
    try {
      const key = `ith_profile_view_${params.provider_slug}`;
      if (sessionStorage.getItem(key) === '1') return;
      sessionStorage.setItem(key, '1');
    } catch {
      /* ignore */
    }
  }
  trackGaEvent('agency_profile_view', {
    provider_slug: params.provider_slug,
    page_path: params.page_path ?? `/providers/${params.provider_slug}`,
  });
}

/** Compare tray add / multi-agency compare session. */
export function trackInsuranceCompareAction(params: {
  action: 'add' | 'remove' | 'open_compare';
  provider_count?: number;
  provider_slug?: string;
}) {
  trackGaEvent('insurance_compare_action', {
    compare_action: params.action,
    provider_count: params.provider_count,
    provider_slug: params.provider_slug,
  });
}

/** My Insurance save (provider, calculator, etc.). */
export function trackMyInsuranceSave(params: {
  save_type: 'provider' | 'calculator' | 'drug_basket' | 'guest_provider';
  provider_slug?: string;
}) {
  trackGaEvent('my_insurance_save', {
    save_type: params.save_type,
    provider_slug: params.provider_slug,
  });
}

/** Visitor opens My Insurance workspace (once / session). */
export function trackMyInsuranceReturn(params: {
  authenticated: boolean;
  page_path?: string;
}) {
  if (typeof window !== 'undefined') {
    try {
      const key = 'ith_my_insurance_return';
      if (sessionStorage.getItem(key) === '1') return;
      sessionStorage.setItem(key, '1');
    } catch {
      /* ignore */
    }
  }
  trackGaEvent('my_insurance_return', {
    authenticated: params.authenticated,
    page_path: params.page_path ?? '/my-insurance',
  });
}

/** Reserved for optional global GA helpers; tracking runs via exported functions. */
export function GaEvents() {
  return null;
}
