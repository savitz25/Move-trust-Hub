import { siteFontVariables } from './fonts';
import type { Viewport } from 'next';
import { headers } from 'next/headers';
import { preload } from 'react-dom';
import './critical.css';
import './globals.css';
import { SchemaInjector } from '@/components/hub/schema-injector';
import {
  buildInsuranceStandaloneRootSchema,
  buildTrustHubNetworkSchema,
} from '@/lib/hub/schemas';
import { isInsuranceStandaloneHost } from '@/lib/hub/domains';
import { GoogleAnalyticsRoot } from '@/components/analytics/google-analytics-root';
import { DeferredUiStyles } from '@/components/performance/deferred-ui-styles';
import { ThirdPartyOrchestrator } from '@/components/performance/third-party-orchestrator';
import { rootLayoutMetadata } from '@/lib/seo/site-metadata';
import { ASK_NETWORK_STANDARD_VERSION } from '@/lib/network/standard-version';

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
  preload('/fonts/geist-latin-600.woff2', {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  });

  const host = (await headers()).get('host');
  const isInsuranceHost = isInsuranceStandaloneHost(host);
  const rootSchema = isInsuranceHost
    ? buildInsuranceStandaloneRootSchema()
    : buildTrustHubNetworkSchema();

  return (
    <html lang="en" className={`light ${siteFontVariables}`}>
      <body
        className="font-sans antialiased"
        data-network-standard={ASK_NETWORK_STANDARD_VERSION}
      >
        {/* network-standard: {ASK_NETWORK_STANDARD_VERSION} */}
        <SchemaInjector data={rootSchema} />
        {children}
        <GoogleAnalyticsRoot />
        <DeferredUiStyles />
        <ThirdPartyOrchestrator />
      </body>
    </html>
  );
}
