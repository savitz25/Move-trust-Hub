'use client';

import dynamic from 'next/dynamic';
import type { Company } from '@/types';

const CompareClient = dynamic(
  () => import('@/components/compare/compare-client').then((m) => m.CompareClient),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 border rounded-xl bg-muted/30 animate-pulse" aria-hidden="true" />
    ),
  }
);

export function CompareLoader({ allCompanies }: { allCompanies: Company[] }) {
  return <CompareClient allCompanies={allCompanies} />;
}