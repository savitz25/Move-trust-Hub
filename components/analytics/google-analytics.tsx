'use client';

import Script from 'next/script';
import {
  GA_CROSS_DOMAIN_LINKS_MOVE,
  type GaHub,
  isGaConfigured,
  warnIfGaMisconfigured,
} from '@/lib/analytics/ga-config';
import { GaPageViewTracker } from '@/components/analytics/ga-page-view-tracker';

type Props = {
  /** Resolved host-aware measurement ID (never guess on the client). */
  measurementId: string;
  hub: GaHub;
};

/**
 * Client GA4 loader — measurement ID is resolved on the server from Host.
 * - afterInteractive gtag (not interaction-gated)
 * - Initial page_view via config send_page_view
 * - SPA navigations via GaPageViewTracker
 */
export function GoogleAnalytics({ measurementId, hub }: Props) {
  warnIfGaMisconfigured(measurementId, hub);

  if (!isGaConfigured(measurementId)) {
    return null;
  }

  // Move linker only — never cross-link to insurancetrusthub.com sessions.
  const linkerDomains =
    hub === 'move'
      ? JSON.stringify([...GA_CROSS_DOMAIN_LINKS_MOVE])
      : JSON.stringify([]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id={`ga4-init-${hub}`} strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          window.__MTH_GA_MEASUREMENT_ID = ${JSON.stringify(measurementId)};
          window.__MTH_GA_HUB = ${JSON.stringify(hub)};
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(measurementId)}, {
            send_page_view: true,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
            ${hub === 'move' ? `linker: { domains: ${linkerDomains} },` : ''}
          });
        `}
      </Script>
      <GaPageViewTracker measurementId={measurementId} hub={hub} />
    </>
  );
}
