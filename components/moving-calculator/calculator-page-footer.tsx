'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { isCalculatorFromPlan } from '@/lib/my-move-plan/calculator-bridge';
import { ReturnToPlanPrimaryButton } from '@/components/moving-calculator/return-to-plan-actions';

function CalculatorPageFooterInner() {
  const searchParams = useSearchParams();
  const fromPlan = isCalculatorFromPlan(searchParams);

  if (fromPlan) {
    return (
      <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6">
        <p className="text-sm text-muted-foreground mb-3">
          Finished updating your inventory? Continue to your Move Report with this load saved for
          comparable estimates.
        </p>
        <ReturnToPlanPrimaryButton
          size="lg"
          className="max-w-md"
          label="Continue to Move Report"
        />
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-xl border bg-card p-5 text-sm text-muted-foreground">
      <p>
        Ready to research carriers?{' '}
        <Link href="/companies" className="text-primary font-medium hover:underline">
          Compare trusted movers
        </Link>{' '}
        in our independent directory, or{' '}
        <Link href="/contact" className="text-primary font-medium hover:underline">
          contact us
        </Link>{' '}
        with questions about your estimate.
      </p>
    </div>
  );
}

export function CalculatorPageFooter() {
  return (
    <Suspense
      fallback={
        <div className="mt-8 rounded-xl border bg-card p-5 text-sm text-muted-foreground">
          Ready to research carriers?
        </div>
      }
    >
      <CalculatorPageFooterInner />
    </Suspense>
  );
}
