'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
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

type Props = {
  measurementId: string;
  hub: GaHub;
};

/**
 * Client GA4 loader — deferred so it does not compete with hero LCP / first interaction.
 * - Idle / timeout gate before injecting gtag (lazyOnload + max wait)
 * - Single init (no DeferredGtag double-load)
 * - Research click tracker mounts after GA ready
 */
export function GoogleAnalytics({ measurementId, hub }: Props) {
  warnIfGaMisconfigured(measurementId, hub);
  const [allowLoad, setAllowLoad] = useState(false);

  useEffect(() => {
    if (!isGaConfigured(measurementId)) return;
    let cancelled = false;
    let idleId: number | undefined;
    let maxId: ReturnType<typeof setTimeout> | undefined;

    const enable = () => {
      if (!cancelled) setAllowLoad(true);
    };

    // Prefer idle; never wait forever (max ~4s after mount for measurement)
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => enable(), { timeout: 3500 });
    } else {
      maxId = setTimeout(enable, 2500);
    }
    // Hard cap so GA still loads on busy threads
    const hardCap = setTimeout(enable, 4500);

    return () => {
      cancelled = true;
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (maxId) clearTimeout(maxId);
      clearTimeout(hardCap);
    };
  }, [measurementId]);

  if (!isGaConfigured(measurementId) || !allowLoad) {
    return null;
  }

  const linkerDomains =
    hub === 'move'
      ? JSON.stringify([...GA_CROSS_DOMAIN_LINKS_MOVE])
      : JSON.stringify([]);

  const baselineDate =
    hub === 'insurance' ? INSURANCE_MEASUREMENT_BASELINE_DATE : MEASUREMENT_BASELINE_DATE;
  const baselineLabel =
    hub === 'insurance' ? INSURANCE_MEASUREMENT_BASELINE_LABEL : MEASUREMENT_BASELINE_LABEL;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id={`ga4-init-${hub}`} strategy="lazyOnload">
        {`
          if (!window.__MTH_GA_INIT) {
            window.__MTH_GA_INIT = true;
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            window.__MTH_GA_MEASUREMENT_ID = ${JSON.stringify(measurementId)};
            window.__MTH_GA_HUB = ${JSON.stringify(hub)};
            window.__MTH_MEASUREMENT_BASELINE = ${JSON.stringify(baselineDate)};
            window.__MTH_MEASUREMENT_BASELINE_LABEL = ${JSON.stringify(baselineLabel)};
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(measurementId)}, {
              send_page_view: true,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              ${hub === 'move' ? `linker: { domains: ${linkerDomains} },` : ''}
            });
          }
        `}
      </Script>
      <GaPageViewTracker measurementId={measurementId} hub={hub} />
      {hub === 'move' || hub === 'insurance' ? (
        <ResearchClickTracker hub={hub === 'insurance' ? 'insurance' : 'move'} />
      ) : null}
    </>
  );
}
