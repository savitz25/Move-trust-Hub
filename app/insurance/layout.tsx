import type { Metadata } from 'next';
import { HubSegmentShell } from '@/components/hub/hub-segment-shell';
import { getHubConfig } from '@/lib/hub/config';
import { INSURANCE_SITE_URL } from '@/lib/hub/domains';
import { buildHubLayoutMetadata } from '@/lib/hub/metadata';

const insuranceConfig = getHubConfig('insurance');

export const metadata: Metadata = {
  ...buildHubLayoutMetadata('insurance'),
  metadataBase: new URL(INSURANCE_SITE_URL),
  applicationName: insuranceConfig.applicationName,
  creator: 'InsuranceTrustHub',
  publisher: 'InsuranceTrustHub',
  authors: [{ name: 'InsuranceTrustHub', url: INSURANCE_SITE_URL }],
  title: {
    default: insuranceConfig.homeTitle,
    template: insuranceConfig.metadataTitleTemplate,
  },
  icons: {
    icon: [
      {
        url: '/insurance/brand/insurance-trust-hub-favicon-32.png?v=20260728r2',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/insurance/brand/insurance-trust-hub-icon-192.png?v=20260728r2',
        sizes: '192x192',
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
  return <HubSegmentShell hubId="insurance">{children}</HubSegmentShell>;
}