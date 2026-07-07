'use client';

import type { Company } from '@/types';
import { ErrorBoundary } from '@/components/error-boundary';
import { createClientLoader } from '@/lib/performance/create-client-loader';

const DirectoryClient = createClientLoader<{ initialCompanies: Company[] }>(
  () => import('@/components/directory/directory-client'),
  'DirectoryClient',
  {
    loading: () => (
      <div
        className="h-[600px] rounded-xl border bg-muted/30 animate-pulse"
        aria-hidden="true"
      />
    ),
  },
);

import type { DirectorySearchScope } from '@/lib/directory/search-scope';

type LoaderProps = {
  initialCompanies: Company[];
  sourcePage?: string;
  scope?: DirectorySearchScope;
};

export function DirectoryLoader({ initialCompanies, sourcePage, scope }: LoaderProps) {
  return (
    <ErrorBoundary fallbackTitle="Unable to load the company directory">
      <DirectoryClient
        initialCompanies={initialCompanies}
        sourcePage={sourcePage}
        scope={scope}
      />
    </ErrorBoundary>
  );
}