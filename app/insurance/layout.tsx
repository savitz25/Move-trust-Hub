import type { Metadata, Viewport } from 'next';
import { HubSegmentShell } from '@/components/hub/hub-segment-shell';
import { MyInsuranceShell } from '@/components/insurance/my-insurance/my-insurance-shell';
import { getHubConfig, INSURANCE_LOGO_VERSION } from '@/lib/hub/config';
import { INSURANCE_SITE_URL } from '@/lib/hub/domains';
import { buildHubLayoutMetadata } from '@/lib/hub/metadata';

const insuranceConfig = getHubConfig('insurance');
const v = INSURANCE_LOGO_VERSION;

export const viewport: Viewport = {
  themeColor: '#0A2540',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  ...buildHubLayoutMetadata('insurance'),
  metadataBase: new URL(INSURANCE_SITE_URL),
  applicationName: 'Insurance Trust Hub',
  creator: 'InsuranceTrustHub',
  publisher: 'InsuranceTrustHub',
  authors: [{ name: 'InsuranceTrustHub', url: INSURANCE_SITE_URL }],
  title: {
    default: insuranceConfig.homeTitle,
    template: insuranceConfig.metadataTitleTemplate,
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Insurance HQ',
    statusBarStyle: 'default',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  icons: {
    icon: [
      {
        url: `/insurance/brand/insurance-trust-hub-favicon-16.png?v=${v}`,
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: `/insurance/brand/insurance-trust-hub-favicon-32.png?v=${v}`,
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: `/insurance/brand/insurance-trust-hub-favicon-48.png?v=${v}`,
        sizes: '48x48',
        type: 'image/png',
      },
      {
        url: `/insurance/brand/favicon.ico?v=${v}`,
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        url: `/insurance/brand/insurance-trust-hub-icon-192.png?v=${v}`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: `/insurance/brand/insurance-trust-hub-icon.png?v=${v}`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: `/insurance/brand/apple-touch-icon.png?v=${v}`,
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function InsuranceHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MyInsuranceShell>
      <HubSegmentShell hubId="insurance">{children}</HubSegmentShell>
    </MyInsuranceShell>
  );
}
