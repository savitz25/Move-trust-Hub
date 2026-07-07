'use client';

import { useEffect, useRef } from 'react';
import { GA_CROSS_DOMAIN_LINKS, GA_MEASUREMENT_ID } from '@/components/ga-events';

/**
 * Loads gtag only after first user interaction — keeps it off the Lighthouse critical path.
 */
export function DeferredGtag() {
  const loadedRef = useRef(false);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());

    const loadScript = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false,
        linker: {
          domains: [...GA_CROSS_DOMAIN_LINKS],
        },
      });
      cleanup();
    };

    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    events.forEach((event) => {
      document.addEventListener(event, loadScript, { passive: true, once: true });
    });

    return function cleanup() {
      events.forEach((event) => {
        document.removeEventListener(event, loadScript);
      });
    };
  }, []);

  return null;
}