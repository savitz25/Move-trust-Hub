import type { Metadata } from 'next';
import { HubChrome } from '@/components/hub/hub-chrome';
import { getHubConfig } from '@/lib/hub/config';
import { buildHubLayoutMetadata } from '@/lib/hub/metadata';

const insuranceConfig = getHubConfig('insurance');

export const metadata: Metadata = {
  ...buildHubLayoutMetadata('insurance'),
  title: {
    default: insuranceConfig.homeTitle,
    template: insuranceConfig.metadataTitleTemplate,
  },
};

export default function InsuranceHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HubChrome hubId="insurance">{children}</HubChrome>;
}