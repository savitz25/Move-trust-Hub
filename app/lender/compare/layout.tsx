import type { Metadata } from 'next';
import { buildHubMetadata } from '@/lib/hub/metadata';

export const metadata: Metadata = buildHubMetadata('lender', {
  title: 'Compare Mortgage Lenders Side-by-Side',
  description:
    'Side-by-side comparison of NMLS-verified mortgage lenders by trust score, ratings, loan types, and county experience.',
  path: '/compare',
  keywords: ['compare mortgage lenders', 'lender comparison tool', 'NMLS verified'],
});

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}