import type { Metadata } from 'next';
import { HubChrome } from '@/components/hub/hub-chrome';
import { getHubConfig } from '@/lib/hub/config';
import { buildHubLayoutMetadata } from '@/lib/hub/metadata';

const lenderConfig = getHubConfig('lender');

export const metadata: Metadata = {
  ...buildHubLayoutMetadata('lender'),
  title: {
    default: lenderConfig.homeTitle,
    template: lenderConfig.metadataTitleTemplate,
  },
};

export default function LenderHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HubChrome hubId="lender">{children}</HubChrome>;
}