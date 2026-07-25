import Script from 'next/script';
import {
  GA_CROSS_DOMAIN_LINKS,
  GA_MEASUREMENT_ID,
  isGaConfigured,
  warnIfGaMisconfigured,
} from '@/lib/analytics/ga-config';
import { GaPageViewTracker } from '@/components/analytics/ga-page-view-tracker';

/**
 * Root-level GA4 — must stay in app/layout.tsx so page/SEO deploys cannot drop it.
 * - Loads gtag afterInteractive (not interaction-gated)
 * - First page_view via config send_page_view
 * - SPA navigations via GaPageViewTracker
 */
export function GoogleAnalytics() {
  warnIfGaMisconfigured();

  if (!isGaConfigured()) {
    return null;
  }

  const linkerDomains = JSON.stringify([...GA_CROSS_DOMAIN_LINKS]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: true,
            anonymize_ip: false,
            linker: { domains: ${linkerDomains} }
          });
        `}
      </Script>
      <GaPageViewTracker />
    </>
  );
}
