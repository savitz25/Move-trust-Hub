'use client';

import { useEffect, useRef } from 'react';
import {
  GA_CROSS_DOMAIN_LINKS,
  GA_MEASUREMENT_ID,
} from '@/lib/analytics/ga-config';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';
import { GTAG_LOAD_OPTIONS, GTAG_SCRIPT_ORIGIN } from '@/lib/performance/external-scripts';

type Props = {
  interactionOnly?: boolean;
};

/**
 * GA4 gtag.js — never in document head at build time.
 * Stub queues events in dataLayer until the async script loads.
 */
export function DeferredGtag({ interactionOnly = true }: Props) {
  const loadedRef = useRef(false);
  const ready = useDeferredLoad({
    idleTimeout: 8_000,
    maxWait: 30_000,
    interactionOnly,
  });

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
  }, []);

  useEffect(() => {
    if (!ready || loadedRef.current) return;

    loadedRef.current = true;
    const script = document.createElement('script');
    script.async = GTAG_LOAD_OPTIONS.async;
    script.defer = GTAG_LOAD_OPTIONS.defer;
    script.fetchPriority = GTAG_LOAD_OPTIONS.fetchPriority;
    script.crossOrigin = GTAG_LOAD_OPTIONS.crossOrigin;
    script.src = `${GTAG_SCRIPT_ORIGIN}/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.gtag?.('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      linker: {
        domains: [...GA_CROSS_DOMAIN_LINKS],
      },
    });
  }, [ready]);

  return null;
}