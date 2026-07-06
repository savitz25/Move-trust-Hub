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

export function DirectoryLoader({ initialCompanies }: { initialCompanies: Company[] }) {
  return (
    <ErrorBoundary fallbackTitle="Unable to load the company directory">
      <DirectoryClient initialCompanies={initialCompanies} />
    </ErrorBoundary>
  );
}