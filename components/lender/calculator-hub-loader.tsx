'use client';

import dynamic from 'next/dynamic';
import type { CalcId } from '@/lib/lender/calculators/registry';

const CalculatorHub = dynamic(
  () => import('@/components/lender/CalculatorHub').then((m) => m.CalculatorHub),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 rounded-xl border bg-muted/30 animate-pulse" />
        ))}
      </div>
    ),
  }
);

export function CalculatorHubLoader({ defaultCalc }: { defaultCalc?: CalcId }) {
  return <CalculatorHub defaultCalc={defaultCalc} />;
}