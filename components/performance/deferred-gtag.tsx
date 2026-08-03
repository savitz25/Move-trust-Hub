'use client';

import { useEffect, useRef } from 'react';
import {
  GA_CROSS_DOMAIN_LINKS_MOVE,
  GA_MEASUREMENT_ID_MOVE_CANONICAL,
  resolveGaMeasurementIdForHost,
  sanitizeMoveMeasurementId,
} from '@/lib/analytics/ga-config';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';
import { GTAG_LOAD_OPTIONS, GTAG_SCRIPT_ORIGIN } from '@/lib/performance/external-scripts';

type Props = {
  interactionOnly?: boolean;
};

/**
 * @deprecated Prefer root GoogleAnalyticsRoot (afterInteractive, not interaction-gated).
 * Kept for legacy lender GtagProvider — host-aware and will not load Move ID on ITH.
 */
export function DeferredGtag({ interactionOnly = true }: Props) {
  const loadedRef = useRef(false);
  const ready = useDeferredLoad({
    idleTimeout: 8_000,
    maxWait: 30_000,
    interactionOnly,
  });

  useEffect(() => {
    // If root GA already initialized for this host, do nothing.
    if (typeof window !== 'undefined' && window.__MTH_GA_MEASUREMENT_ID) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
  }, []);

  useEffect(() => {
    if (!ready || loadedRef.current) return;
    if (typeof window !== 'undefined' && window.__MTH_GA_MEASUREMENT_ID) {
      return;
    }

    const host = typeof window !== 'undefined' ? window.location.host : null;
    const { measurementId, hub } = resolveGaMeasurementIdForHost(host);
    if (!measurementId) return;

    // Belt-and-suspenders: never inject Move stream on insurance host via this path.
    if (hub === 'insurance' && measurementId === GA_MEASUREMENT_ID_MOVE_CANONICAL) {
      return;
    }

    loadedRef.current = true;
    const id =
      hub === 'move' ? sanitizeMoveMeasurementId(measurementId) : measurementId;

    const script = document.createElement('script');
    script.async = GTAG_LOAD_OPTIONS.async;
    script.defer = GTAG_LOAD_OPTIONS.defer;
    script.fetchPriority = GTAG_LOAD_OPTIONS.fetchPriority;
    script.crossOrigin = GTAG_LOAD_OPTIONS.crossOrigin;
    script.src = `${GTAG_SCRIPT_ORIGIN}/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.__MTH_GA_MEASUREMENT_ID = id;
    window.__MTH_GA_HUB = hub;
    window.gtag?.('config', id, {
      send_page_view: true,
      ...(hub === 'move'
        ? { linker: { domains: [...GA_CROSS_DOMAIN_LINKS_MOVE] } }
        : {}),
    });
  }, [ready]);

  return null;
}
