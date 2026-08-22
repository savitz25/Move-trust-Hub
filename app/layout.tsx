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
import { ClientRuntimeGuard } from '@/components/reliability/client-runtime-guard';
import { rootLayoutMetadata } from '@/lib/seo/site-metadata';
import { ASK_NETWORK_STANDARD_VERSION } from '@/lib/network/standard-version';
import { TH_CHASSIS_VERSION } from '@/lib/design/trusthub-visual-standard';

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

  const buildId =
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_BUILD_ID ||
    'local';

  return (
    <html
      lang="en"
      className={`light ${siteFontVariables}`}
      data-build-id={buildId}
      // Extensions often mutate <html>; suppress noise that becomes React #418
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased"
        data-network-standard={ASK_NETWORK_STANDARD_VERSION}
        data-th-chassis={TH_CHASSIS_VERSION}
        suppressHydrationWarning
      >
        {/* network-standard: {ASK_NETWORK_STANDARD_VERSION} */}
        <SchemaInjector data={rootSchema} />
        {/* ChunkLoadError recovery + client error reporting (ops visibility) */}
        <ClientRuntimeGuard />
        {children}
        {/* GA deferred (idle) — must not compete with hero LCP */}
        <GoogleAnalyticsRoot />
        <DeferredUiStyles />
        <ThirdPartyOrchestrator />
      </body>
    </html>
  );
}
