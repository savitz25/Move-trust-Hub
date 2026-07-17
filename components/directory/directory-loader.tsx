'use client';

import { Suspense } from 'react';
import type { Company } from '@/types';
import { ErrorBoundary } from '@/components/error-boundary';
import { createClientLoader } from '@/lib/performance/create-client-loader';
import type { DirectorySearchScope } from '@/lib/directory/search-scope';
import { DIRECTORY_PAGE_SIZE } from '@/lib/directory/page-size';

type DirectoryClientProps = {
  initialCompanies: Company[];
  /** Total matches for the SSR query; defaults to initialCompanies.length. */
  initialTotal?: number;
  pageSize?: number;
  sourcePage?: string;
  scope?: DirectorySearchScope;
};

const DirectorySkeleton = () => (
  <div
    className="h-[600px] rounded-xl border bg-muted/30 animate-pulse"
    aria-hidden="true"
  />
);

const DirectoryClient = createClientLoader<DirectoryClientProps>(
  () => import('@/components/directory/directory-client'),
  'DirectoryClient',
  {
    loading: () => <DirectorySkeleton />,
  }
);

type LoaderProps = DirectoryClientProps;

export function DirectoryLoader({
  initialCompanies,
  initialTotal,
  pageSize = DIRECTORY_PAGE_SIZE,
  sourcePage,
  scope,
}: LoaderProps) {
  const total = initialTotal ?? initialCompanies.length;

  return (
    <ErrorBoundary
      fallbackTitle="Unable to load the company directory"
      onRetry={() => window.location.reload()}
    >
      <Suspense fallback={<DirectorySkeleton />}>
        <DirectoryClient
          initialCompanies={initialCompanies}
          initialTotal={total}
          pageSize={pageSize}
          sourcePage={sourcePage}
          scope={scope}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
