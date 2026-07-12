'use client';

import dynamic from 'next/dynamic';

const SearchBar = dynamic(
  () => import('@/components/lender/SearchBar').then((m) => m.SearchBar),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-12 w-full max-w-lg rounded-xl border bg-muted/30 animate-pulse"
        aria-hidden="true"
      />
    ),
  }
);

export function SearchBarLoader({ className }: { className?: string }) {
  return <SearchBar className={className} />;
}