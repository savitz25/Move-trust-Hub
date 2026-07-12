'use client';

import dynamic from 'next/dynamic';
import type { Lender } from '@/lib/lender/mockData';

const LenderCompareClient = dynamic(
  () =>
    import('@/components/lender/compare/lender-compare-client').then(
      (m) => m.LenderCompareClient
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto h-96 max-w-3xl rounded-xl border bg-muted/30 animate-pulse"
        aria-hidden="true"
      />
    ),
  }
);

export function LenderCompareLoader({ lenders }: { lenders: Lender[] }) {
  return <LenderCompareClient lenders={lenders} />;
}