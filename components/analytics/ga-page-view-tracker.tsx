'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import type { GaHub } from '@/lib/analytics/ga-config';
import { isGaConfigured } from '@/lib/analytics/ga-config';
import { getHubFromPathname } from '@/lib/hub/paths';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __MTH_GA_MEASUREMENT_ID?: string;
    __MTH_GA_HUB?: string;
  }
}

function whenGtagReady(run: () => void, maxAttempts = 80): () => void {
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
  }, 50);

  return () => {
    if (timer) clearInterval(timer);
  };
}

type Props = {
  measurementId: string;
  hub: GaHub;
};

/**
 * App Router SPA page views — first hit is covered by gtag config send_page_view.
 * Subsequent client navigations re-config with page_path.
 */
export function GaPageViewTracker({ measurementId, hub }: Props) {
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();
  const isFirst = useRef(true);

  useEffect(() => {
    if (!isGaConfigured(measurementId)) return;

    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    const pageTitle = typeof document !== 'undefined' ? document.title : undefined;
    const pathHub = getHubFromPathname(pathname);

    // Initial HTML load: gtag config already sent page_view.
    if (isFirst.current) {
      isFirst.current = false;
      return whenGtagReady(() => {
        window.gtag?.('event', 'hub_page_view', {
          hub: hub === 'insurance' ? 'insurance' : pathHub,
          page_path: pagePath,
          page_title: pageTitle,
        });
      });
    }

    return whenGtagReady(() => {
      window.gtag?.('config', measurementId, {
        page_path: pagePath,
        page_title: pageTitle,
      });
      window.gtag?.('event', 'hub_page_view', {
        hub: hub === 'insurance' ? 'insurance' : pathHub,
        page_path: pagePath,
        page_title: pageTitle,
      });
    });
  }, [pathname, searchParams, measurementId, hub]);

  return null;
}
