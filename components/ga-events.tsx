'use client';

export {
  GA_CROSS_DOMAIN_LINKS,
  GA_MEASUREMENT_ID,
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

/** Reserved for optional global GA helpers; tracking runs via exported functions. */
export function GaEvents() {
  return null;
}