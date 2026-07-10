import type { Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SchemaInjector } from '@/components/hub/schema-injector';

import { buildTrustHubNetworkSchema } from '@/lib/hub/schemas';
import { Suspense } from 'react';
import { DeferredHubAnalytics } from '@/components/hub/deferred-hub-analytics';
import { DeferredWidgets } from '@/components/performance/deferred-widgets';
import { DeferredAnalytics } from '@/components/performance/deferred-analytics';
import { rootLayoutMetadata } from '@/lib/seo/site-metadata';

// GA4 FIXED - G-433BDVV8MJ - verified in page source
const GA_MEASUREMENT_ID = 'G-433BDVV8MJ';
const GA_LINKER_DOMAINS = JSON.stringify([
  'movetrusthub.com',
  'www.movetrusthub.com',
  'lendertrusthub.com',
  'www.lendertrusthub.com',
  'insurancetrusthub.com',
  'www.insurancetrusthub.com',
]);

// LCP hero uses font-semibold (600). Preload only 400 + 600 — drop 700 to save one font file.
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'optional',
  preload: false,
  adjustFontFallback: true,
});

export const metadata = rootLayoutMetadata;

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <SchemaInjector data={buildTrustHubNetworkSchema()} />
        <Suspense fallback={null}>{children}</Suspense>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: true,
              linker: { domains: ${GA_LINKER_DOMAINS} }
            });
          `}
        </Script>
        <DeferredHubAnalytics />
        <DeferredWidgets />
        <DeferredAnalytics />
      </body>
    </html>
  );
}