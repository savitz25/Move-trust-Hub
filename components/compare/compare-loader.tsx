'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { Company } from '@/types';
import { ErrorBoundary } from '@/components/error-boundary';

const CompareSkeleton = () => (
  <div className="h-96 border rounded-xl bg-muted/30 animate-pulse" aria-hidden="true" />
);

const CompareClient = dynamic(
  () => import('@/components/compare/compare-client').then((m) => m.CompareClient),
  {
    ssr: false,
    loading: () => <CompareSkeleton />,
  }
);

export function CompareLoader({ allCompanies }: { allCompanies: Company[] }) {
  return (
    <ErrorBoundary
      fallbackTitle="Unable to load the compare tool"
      onRetry={() => window.location.reload()}
    >
      <Suspense fallback={<CompareSkeleton />}>
        <CompareClient allCompanies={allCompanies} />
      </Suspense>
    </ErrorBoundary>
  );
}