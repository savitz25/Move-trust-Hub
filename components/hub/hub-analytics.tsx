'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getHubFromPathname } from '@/lib/hub/paths';

/**
 * Optional hub dimension events. Uses the host-resolved ID from GoogleAnalyticsRoot
 * (window.__MTH_GA_MEASUREMENT_ID) — never hardcodes the Move stream on ITH.
 */
export function HubAnalytics() {
  const pathname = usePathname() ?? '/';
  const isFirstView = useRef(true);

  useEffect(() => {
    const hub = getHubFromPathname(pathname);
    const pageTitle = typeof document !== 'undefined' ? document.title : undefined;

    const fire = (id: string) => {
      const gtag = window.gtag;
      if (typeof gtag !== 'function') return;

      if (isFirstView.current) {
        isFirstView.current = false;
      } else {
        gtag('config', id, {
          page_path: pathname,
          page_title: pageTitle,
        });
      }

      gtag('event', 'hub_page_view', {
        hub,
        page_path: pathname,
        page_title: pageTitle,
      });
    };

    const existing = window.__MTH_GA_MEASUREMENT_ID;
    if (existing && typeof window.gtag === 'function') {
      fire(existing);
      return;
    }

    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      const id = window.__MTH_GA_MEASUREMENT_ID;
      if (typeof window.gtag === 'function' && id) {
        clearInterval(timer);
        fire(id);
      } else if (attempts >= 40) {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [pathname]);

  return null;
}
