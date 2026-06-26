'use client';

import dynamic from 'next/dynamic';
import type { Company } from '@/types';

const DirectoryClient = dynamic(
  () => import('@/components/directory/directory-client').then((m) => m.DirectoryClient),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[600px] rounded-xl border bg-muted/30 animate-pulse"
        aria-hidden="true"
      />
    ),
  }
);

export function DirectoryLoader({ initialCompanies }: { initialCompanies: Company[] }) {
  return <DirectoryClient initialCompanies={initialCompanies} />;
}