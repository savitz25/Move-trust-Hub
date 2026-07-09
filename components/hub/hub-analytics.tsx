'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { GA_MEASUREMENT_ID } from '@/lib/analytics/ga-config';
import { getHubFromPathname } from '@/lib/hub/paths';

function whenGtagReady(run: () => void, maxAttempts = 50) {
  if (typeof window === 'undefined') return () => undefined;

  let attempts = 0;
  let timer: ReturnType<typeof setInterval> | undefined;

  const tryRun = () => {
    if (typeof window.gtag === 'function') {
      run();
      if (timer) clearInterval(timer);
      return true;
    }
    return false;
  };

  if (tryRun()) return () => undefined;

  timer = setInterval(() => {
    attempts += 1;
    if (tryRun() || attempts >= maxAttempts) {
      if (timer) clearInterval(timer);
    }
  }, 100);

  return () => {
    if (timer) clearInterval(timer);
  };
}

/** SPA page_view + hub dimension for Move / Lender / Insurance reporting. */
export function HubAnalytics() {
  const pathname = usePathname() ?? '/';
  const isFirstView = useRef(true);

  useEffect(() => {
    const hub = getHubFromPathname(pathname);
    const pageTitle = typeof document !== 'undefined' ? document.title : undefined;

    return whenGtagReady(() => {
      const gtag = window.gtag;
      if (typeof gtag !== 'function') return;

      if (isFirstView.current) {
        isFirstView.current = false;
      } else {
        gtag('config', GA_MEASUREMENT_ID, {
          page_path: pathname,
          page_title: pageTitle,
        });
      }

      gtag('event', 'hub_page_view', {
        hub,
        page_path: pathname,
        page_title: pageTitle,
      });
    });
  }, [pathname]);

  return null;
}