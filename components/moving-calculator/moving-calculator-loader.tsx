'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { CalculatorSkeleton } from '@/components/moving-calculator/calculator-skeleton';
import { MovingCalculatorClient } from '@/components/moving-calculator/moving-calculator-client';

/**
 * Calculator is client-only (Zustand + useSearchParams).
 * Avoid next/dynamic({ ssr: false }) here — soft navigations with homepage
 * prefill query params were resolving broken chunk URLs (*.undefined.js).
 */
export function MovingCalculatorLoader() {
  return (
    <ErrorBoundary
      fallbackTitle="Unable to load the moving calculator"
      onRetry={() => {
        if (typeof window !== 'undefined') window.location.reload();
      }}
    >
      <Suspense fallback={<CalculatorSkeleton />}>
        <MovingCalculatorClient />
      </Suspense>
    </ErrorBoundary>
  );
}
