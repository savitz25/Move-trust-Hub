/**
 * GA4 (gtag) helpers for destination-attributed quote events.
 * Loaded via app/layout.tsx — measurement ID G-433BDVV8MJ
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type DestinationQuoteEventParams = {
  destination_slug: string;
  market_priority: number;
  source: string;
  to_zip?: string;
  from_zip?: string;
};

export function trackDestinationQuoteOpen(params: DestinationQuoteEventParams) {
  window.gtag?.('event', 'quote_form_open', {
    destination_slug: params.destination_slug,
    market_priority: params.market_priority,
    source: params.source,
    to_zip: params.to_zip,
    from_zip: params.from_zip,
  });
}

export function trackDestinationQuoteSubmit(params: DestinationQuoteEventParams) {
  window.gtag?.('event', 'quote_form_submit', {
    destination_slug: params.destination_slug,
    market_priority: params.market_priority,
    source: params.source,
    to_zip: params.to_zip,
    from_zip: params.from_zip,
  });
}

export function trackDestinationHubView(slug: string, priority: number) {
  window.gtag?.('event', 'destination_hub_view', {
    destination_slug: slug,
    market_priority: priority,
  });
}