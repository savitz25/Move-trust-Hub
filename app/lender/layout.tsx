import type { Metadata } from 'next';
import { HubSegmentShell } from '@/components/hub/hub-segment-shell';
import { getHubConfig } from '@/lib/hub/config';
import { buildHubLayoutMetadata } from '@/lib/hub/metadata';

const lenderConfig = getHubConfig('lender');

export const metadata: Metadata = {
  ...buildHubLayoutMetadata('lender'),
  title: {
    default: lenderConfig.homeTitle,
    template: lenderConfig.metadataTitleTemplate,
  },
  // Phase 0: residual monorepo tree must never be indexed on Move host.
  // Public traffic is 301'd to lendertrusthub.com (middleware + next.config).
  robots: { index: false, follow: false },
};

export default function LenderHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HubSegmentShell hubId="lender">{children}</HubSegmentShell>;
}