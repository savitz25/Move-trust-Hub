'use client';

import { Suspense, type ReactNode } from 'react';
import type { Lender } from '@/lib/lender/mockData';
import { LenderSearchProvider } from '@/components/lender/lender-search-context';

export function LenderSearchBoundary({
  lenders,
  children,
}: {
  lenders: Lender[];
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-[4rem]" aria-hidden="true" />}>
      <LenderSearchProvider lenders={lenders}>{children}</LenderSearchProvider>
    </Suspense>
  );
}