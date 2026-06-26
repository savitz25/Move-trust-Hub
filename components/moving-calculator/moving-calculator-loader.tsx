'use client';

import dynamic from 'next/dynamic';
import { CalculatorSkeleton } from '@/components/moving-calculator/calculator-skeleton';

const MovingCalculatorClient = dynamic(
  () =>
    import('@/components/moving-calculator/moving-calculator-client').then(
      (m) => m.MovingCalculatorClient
    ),
  { ssr: false, loading: () => <CalculatorSkeleton /> }
);

export function MovingCalculatorLoader() {
  return <MovingCalculatorClient />;
}