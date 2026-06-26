'use client';

export const GA_MEASUREMENT_ID = 'G-433BDVV8MJ';

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