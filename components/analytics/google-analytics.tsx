import Script from 'next/script';
import {
  GA_CROSS_DOMAIN_LINKS,
  GA_MEASUREMENT_ID,
  isGaConfigured,
} from '@/lib/analytics/ga-config';

/**
 * GA4 gtag — loads afterInteractive on every hub (Move, Lender, Insurance).
 * Mounted once in app/layout.tsx so all routes are covered.
 */
export function GoogleAnalytics() {
  if (!isGaConfigured()) return null;

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
            linker: { domains: ${linkerDomains} }
          });
        `}
      </Script>
    </>
  );
}