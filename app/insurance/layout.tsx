import type { Metadata } from 'next';
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
  return children;
}