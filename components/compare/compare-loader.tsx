'use client';

import { Suspense } from 'react';
import type { Company } from '@/types';
import { ErrorBoundary } from '@/components/error-boundary';
import { CompareClient } from '@/components/compare/compare-client';

const CompareSkeleton = () => (
  <div className="h-96 border rounded-xl bg-muted/30 animate-pulse" aria-hidden="true" />
);

/**
 * Compare tool with SSR enabled so the empty state / shell is in the HTML.
 * Deep-link selection still hydrates from ?add= on the client.
 */
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
