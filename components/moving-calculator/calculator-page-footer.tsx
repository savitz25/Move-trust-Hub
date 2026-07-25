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
    <div className="mt-8 space-y-4">
      <div className="rounded-xl border bg-card p-5 text-sm text-muted-foreground leading-relaxed">
        <p className="font-medium text-foreground mb-2">Next research steps</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <Link href="/companies" className="text-primary font-medium hover:underline">
              Browse the FMCSA mover directory
            </Link>{' '}
            — independent listings, no lead fees
          </li>
          <li>
            <Link href="/local-movers" className="text-primary font-medium hover:underline">
              Local movers by state and county
            </Link>
          </li>
          <li>
            <Link href="/compare" className="text-primary font-medium hover:underline">
              Compare up to four movers side-by-side
            </Link>
          </li>
          <li>
            <Link href="/verify-dot" className="text-primary font-medium hover:underline">
              Verify a USDOT / MC number
            </Link>
          </li>
          <li>
            <Link href="/resources/routes" className="text-primary font-medium hover:underline">
              Interstate route cost &amp; planning guides
            </Link>
          </li>
          <li>
            <Link
              href="/about/how-we-score-movers"
              className="text-primary font-medium hover:underline"
            >
              Trust Center — how we score and vet movers
            </Link>
          </li>
        </ul>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Calculator outputs are volume estimates only — not binding quotes from carriers.
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
