'use client';

import { useEffect, useRef } from 'react';
import { GA_MEASUREMENT_ID } from '@/components/ga-events';

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
      });
      cleanup();
    };

    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    events.forEach((event) => {
      document.addEventListener(event, loadScript, { passive: true, once: true });
    });

    const idleId =
      'requestIdleCallback' in window
        ? window.requestIdleCallback(loadScript, { timeout: 4000 })
        : window.setTimeout(loadScript, 4000);

    const maxId = window.setTimeout(loadScript, 12000);

    function cleanup() {
      events.forEach((event) => {
        document.removeEventListener(event, loadScript);
      });
      if (typeof idleId === 'number') {
        window.clearTimeout(idleId);
      } else if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      window.clearTimeout(maxId);
    }

    return cleanup;
  }, []);

  return null;
}