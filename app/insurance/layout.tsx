import type { Metadata } from 'next';
import { HubSegmentShell } from '@/components/hub/hub-segment-shell';
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
  return <HubSegmentShell hubId="insurance">{children}</HubSegmentShell>;
}