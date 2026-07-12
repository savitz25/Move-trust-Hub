import { siteFontVariables } from './fonts';
import type { Viewport } from 'next';
import { preload } from 'react-dom';
import './critical.css';
import './globals.css';
import { SchemaInjector } from '@/components/hub/schema-injector';

import { buildTrustHubNetworkSchema } from '@/lib/hub/schemas';
import { Suspense } from 'react';
import { DeferredUiStyles } from '@/components/performance/deferred-ui-styles';
import { ThirdPartyOrchestrator } from '@/components/performance/third-party-orchestrator';
import { getCachedPerformanceFlags } from '@/lib/performance/flags-cache';
import { rootLayoutMetadata } from '@/lib/seo/site-metadata';

export const metadata = rootLayoutMetadata;

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const performanceFlags = await getCachedPerformanceFlags();

  preload('/fonts/geist-latin-600.woff2', {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  });

  return (
    <html lang="en" className={`light ${siteFontVariables}`}>
      <body className="font-sans antialiased">
        <SchemaInjector data={buildTrustHubNetworkSchema()} />
        <Suspense
          fallback={
            <div className="min-h-[50vh] animate-pulse bg-muted/10" aria-hidden="true" />
          }
        >
          {children}
        </Suspense>
        <DeferredUiStyles />
        <ThirdPartyOrchestrator flags={performanceFlags} />
      </body>
    </html>
  );
}