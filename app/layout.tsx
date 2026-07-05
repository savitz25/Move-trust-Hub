import type { Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SchemaInjector } from '@/components/hub/schema-injector';

import { buildTrustHubNetworkSchema } from '@/lib/hub/schemas';
import { Suspense } from 'react';
import { DeferredHubAnalytics } from '@/components/hub/deferred-hub-analytics';
import { DeferredWidgets } from '@/components/performance/deferred-widgets';
import { DeferredAnalytics } from '@/components/performance/deferred-analytics';
import { DeferredGtag } from '@/components/performance/deferred-gtag';
import { rootLayoutMetadata } from '@/lib/seo/site-metadata';

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
        <Suspense
          fallback={
            <div className="min-h-[50vh] animate-pulse bg-muted/10" aria-hidden="true" />
          }
        >
          {children}
        </Suspense>
        <DeferredHubAnalytics />
        <DeferredWidgets />
        <DeferredGtag />
        <DeferredAnalytics />
      </body>
    </html>
  );
}