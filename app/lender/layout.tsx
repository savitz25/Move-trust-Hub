import type { Metadata } from 'next';
import { buildHubLayoutMetadata } from '@/lib/hub/metadata';

export const metadata: Metadata = buildHubLayoutMetadata('lender');

export default function LenderHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}