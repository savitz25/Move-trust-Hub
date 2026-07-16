'use client';

import { Suspense } from 'react';
import type { Company } from '@/types';
import { ErrorBoundary } from '@/components/error-boundary';
import { createClientLoader } from '@/lib/performance/create-client-loader';
import type { DirectorySearchScope } from '@/lib/directory/search-scope';

type DirectoryClientProps = {
  initialCompanies: Company[];
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
  },
);

type LoaderProps = DirectoryClientProps;

export function DirectoryLoader({ initialCompanies, sourcePage, scope }: LoaderProps) {
  return (
    <ErrorBoundary
      fallbackTitle="Unable to load the company directory"
      onRetry={() => window.location.reload()}
    >
      <Suspense fallback={<DirectorySkeleton />}>
        <DirectoryClient
          initialCompanies={initialCompanies}
          sourcePage={sourcePage}
          scope={scope}
        />
      </Suspense>
    </ErrorBoundary>
  );
}