'use client';

import { Suspense, type ReactNode } from 'react';
import type { Lender } from '@/lib/lender/mockData';
import { LenderSearchProvider, useLenderSearch } from '@/components/lender/lender-search-context';
import { LenderSearchField } from '@/components/lender/lender-search-field';
import { LenderSearchResults } from '@/components/lender/lender-search-results';

function LocalLendersSearchHero() {
  return (
    <section className="border-b border-zinc-200 bg-gradient-to-br from-[#0A2540] to-[#0d3a5c] py-14 text-white">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-3 inline-flex rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-1.5 text-sm">
          NMLS Verified • County-Level Data • No Paid Placements
        </p>
        <h1 className="text-3xl font-bold md:text-5xl">Find Verified Mortgage Lenders</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
          Search by ZIP or lender name, or browse by state and county. Trust scores from NMLS, BBB,
          Google, and more.
        </p>
        <LenderSearchField
          className="mx-auto mt-8 max-w-xl"
          variant="dark"
          helperText="ZIP opens your county page. Lender name, city, or loan type shows matching results below."
        />
      </div>
    </section>
  );
}

function LocalLendersSearchResults() {
  const { hasQuery } = useLenderSearch();
  if (!hasQuery) return null;
  return <LenderSearchResults showPreview={false} compact />;
}

function LocalLendersHubInner({ children }: { children: ReactNode }) {
  return (
    <>
      <LocalLendersSearchHero />
      <LocalLendersSearchResults />
      {children}
    </>
  );
}

export function LocalLendersHubClient({
  lenders,
  children,
}: {
  lenders: Lender[];
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-[12rem]" aria-hidden="true" />}>
      <LenderSearchProvider lenders={lenders} basePath="/local-lenders">
        <LocalLendersHubInner>{children}</LocalLendersHubInner>
      </LenderSearchProvider>
    </Suspense>
  );
}