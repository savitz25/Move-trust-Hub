'use client';

import { useEffect, useState } from 'react';
import {
  GA_CROSS_DOMAIN_LINKS_MOVE,
  type GaHub,
  isGaConfigured,
  warnIfGaMisconfigured,
} from '@/lib/analytics/ga-config';
import { GaPageViewTracker } from '@/components/analytics/ga-page-view-tracker';
import { ResearchClickTracker } from '@/components/analytics/research-click-tracker';
import {
  MEASUREMENT_BASELINE_DATE,
  MEASUREMENT_BASELINE_LABEL,
} from '@/lib/analytics/measurement-baseline';
import {
  INSURANCE_MEASUREMENT_BASELINE_DATE,
  INSURANCE_MEASUREMENT_BASELINE_LABEL,
} from '@/lib/analytics/insurance-measurement-baseline';
import {
  GTAG_LOAD_OPTIONS,
  GTAG_SCRIPT_ORIGIN,
} from '@/lib/performance/external-scripts';

type Props = {
  measurementId: string;
  hub: GaHub;
};

declare global {
  interface Window {
    __MTH_GA_INIT?: boolean;
    __MTH_GA_MEASUREMENT_ID?: string;
    __MTH_GA_HUB?: string;
    __MTH_MEASUREMENT_BASELINE?: string;
    __MTH_MEASUREMENT_BASELINE_LABEL?: string;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Inject GA4 after idle — no next/script (avoids early preload of gtag).
 * Single init via window.__MTH_GA_INIT; trackers mount only after ready.
 */
function injectGa4(measurementId: string, hub: GaHub) {
  if (typeof window === 'undefined' || window.__MTH_GA_INIT) return;
  window.__MTH_GA_INIT = true;

  const baselineDate =
    hub === 'insurance' ? INSURANCE_MEASUREMENT_BASELINE_DATE : MEASUREMENT_BASELINE_DATE;
  const baselineLabel =
    hub === 'insurance' ? INSURANCE_MEASUREMENT_BASELINE_LABEL : MEASUREMENT_BASELINE_LABEL;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;
  window.__MTH_GA_MEASUREMENT_ID = measurementId;
  window.__MTH_GA_HUB = hub;
  window.__MTH_MEASUREMENT_BASELINE = baselineDate;
  window.__MTH_MEASUREMENT_BASELINE_LABEL = baselineLabel;

  gtag('js', new Date());
  const config: Record<string, unknown> = {
    send_page_view: true,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  };
  if (hub === 'move') {
    config.linker = { domains: [...GA_CROSS_DOMAIN_LINKS_MOVE] };
  }
  gtag('config', measurementId, config);

  const existing = document.querySelector(
    `script[data-mth-ga="gtag-js"][data-ga-id="${measurementId}"]`
  );
  if (existing) return;

  const script = document.createElement('script');
  script.async = GTAG_LOAD_OPTIONS.async;
  script.defer = GTAG_LOAD_OPTIONS.defer;
  script.fetchPriority = GTAG_LOAD_OPTIONS.fetchPriority;
  script.crossOrigin = GTAG_LOAD_OPTIONS.crossOrigin;
  script.dataset.mthGa = 'gtag-js';
  script.dataset.gaId = measurementId;
  script.src = `${GTAG_SCRIPT_ORIGIN}/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

/**
 * Client GA4 loader — deferred so it does not compete with hero LCP / first interaction.
 * - Idle / timeout gate before injecting gtag (DOM inject, no early preload)
 * - Single init (no DeferredGtag double-load)
 * - Research click tracker mounts after GA ready
 */
export function GoogleAnalytics({ measurementId, hub }: Props) {
  warnIfGaMisconfigured(measurementId, hub);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isGaConfigured(measurementId)) return;
    let cancelled = false;
    let idleId: number | undefined;
    let maxId: ReturnType<typeof setTimeout> | undefined;

    const enable = () => {
      if (cancelled) return;
      injectGa4(measurementId, hub);
      setReady(true);
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => enable(), { timeout: 3500 });
    } else {
      maxId = setTimeout(enable, 2500);
    }
    const hardCap = setTimeout(enable, 4500);

    return () => {
      cancelled = true;
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (maxId) clearTimeout(maxId);
      clearTimeout(hardCap);
    };
  }, [measurementId, hub]);

  if (!isGaConfigured(measurementId) || !ready) {
    return null;
  }

  return (
    <>
      <GaPageViewTracker measurementId={measurementId} hub={hub} />
      {hub === 'move' || hub === 'insurance' ? (
        <ResearchClickTracker hub={hub === 'insurance' ? 'insurance' : 'move'} />
      ) : null}
    </>
  );
}
