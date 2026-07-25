'use client';

import { useMemo, useState } from 'react';
import { MyMovePlanWizard } from '@/components/my-move-plan/my-move-plan-wizard';
import { ErrorBoundary } from '@/components/error-boundary';
import type { HomeRouteMover } from '@/lib/home/resolve-route-from-zip';
import type { MyMovePlanStep } from '@/lib/my-move-plan/types';
import { stepToPhase } from '@/lib/my-move-plan/readiness';

const STATUS_BY_PHASE = {
  plan: {
    label: 'Step 1 — Route',
    body: 'Enter From & To city or ZIP to start your free Move Plan.',
  },
  build: {
    label: 'Step 2 — Shortlist & inventory',
    body: 'Pick up to three movers and document the same load for comparable estimates.',
  },
  book: {
    label: 'Step 3 — Report ready',
    body: 'Send one documented plan so every quote uses the same route and inventory.',
  },
} as const;

type Props = {
  fallbackMovers?: HomeRouteMover[];
};

/**
 * Client-only interactive ZIP / Move Plan island.
 * H1, intro, and trust links are server-rendered in HomeHeroSsr above this widget.
 */
export function HomeWizardSection({ fallbackMovers = [] }: Props) {
  const [step, setStep] = useState<MyMovePlanStep>('route');
  const phase = stepToPhase(step);
  const status = useMemo(() => STATUS_BY_PHASE[phase], [phase]);

  return (
    <div className="mx-auto mt-8 max-w-4xl sm:mt-10">
      <div className="mb-4 text-center sm:mb-5" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {status.label}
        </p>
        <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">{status.body}</p>
      </div>

      <ErrorBoundary fallbackTitle="My Move Plan hit a temporary issue">
        <MyMovePlanWizard fallbackMovers={fallbackMovers} onStepChange={setStep} />
      </ErrorBoundary>

      <noscript>
        <div className="mt-6 rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground leading-relaxed">
          <p className="font-medium text-foreground">JavaScript is off — you can still research:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <a href="/companies" className="text-primary underline">
                Browse the FMCSA mover directory
              </a>
            </li>
            <li>
              <a href="/local-movers" className="text-primary underline">
                Open local movers by state and county
              </a>
            </li>
            <li>
              <a href="/moving-calculator" className="text-primary underline">
                Estimate cubic feet with the moving calculator
              </a>
            </li>
            <li>
              <a href="/verify-dot" className="text-primary underline">
                Verify a USDOT / MC number
              </a>
            </li>
          </ul>
        </div>
      </noscript>
    </div>
  );
}
