import type { Metadata } from 'next';
import { buildHubLayoutMetadata } from '@/lib/hub/metadata';

export const metadata: Metadata = buildHubLayoutMetadata('insurance');

export default function InsuranceHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}