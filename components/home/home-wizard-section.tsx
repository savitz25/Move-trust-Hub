'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

/**
 * Intent-gated Move Plan island.
 * The full wizard chunk is NOT requested until the user starts the plan (click/focus/keyboard).
 * Keeps homepage first-load JS free of wizard / directory / comparison graph.
 */
const MyMovePlanWizard = dynamic(
  () =>
    import('@/components/my-move-plan/my-move-plan-wizard').then(
      (m) => m.MyMovePlanWizard
    ),
  {
    ssr: false,
    loading: () => <WizardLoadingSlot />,
  }
);

function WizardLoadingSlot() {
  return (
    <div
      className="min-h-[22rem] rounded-2xl border bg-white/90 p-6 shadow-sm sm:min-h-[24rem]"
      aria-busy="true"
      aria-label="Loading move plan"
    >
      <div className="mb-4 h-3 w-40 animate-pulse rounded bg-muted" />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="h-16 animate-pulse rounded-xl bg-muted/70" />
        <div className="h-16 animate-pulse rounded-xl bg-muted/70" />
      </div>
      <div className="mt-4 h-12 w-full max-w-xs animate-pulse rounded-xl bg-muted/60" />
    </div>
  );
}

/** Lightweight static shell — same height budget as the wizard for CLS. */
function WizardStartGate({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-[22rem] rounded-2xl border-2 border-border/80 bg-white/95 p-5 shadow-sm sm:min-h-[24rem] sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        Step 1 — Route
      </p>
      <p className="mt-1 text-sm text-[#3d4f63]">
        Enter From &amp; To city or ZIP to start your free Move Plan.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block text-left">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-primary">
            From
          </span>
          <span className="flex min-h-14 items-center gap-2 rounded-2xl border-2 border-border/80 bg-white px-3 shadow-sm">
            <MapPin className="h-5 w-5 shrink-0 text-[#3d4f63]" aria-hidden />
            <input
              type="text"
              name="move-from-preview"
              autoComplete="address-level2"
              placeholder="City or ZIP"
              className="w-full min-h-11 bg-transparent text-base text-foreground outline-none placeholder:text-[#5a6b7d]"
              onFocus={onStart}
              onClick={onStart}
            />
          </span>
        </label>
        <label className="block text-left">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-primary">
            To
          </span>
          <span className="flex min-h-14 items-center gap-2 rounded-2xl border-2 border-border/80 bg-white px-3 shadow-sm">
            <MapPin className="h-5 w-5 shrink-0 text-[#3d4f63]" aria-hidden />
            <input
              type="text"
              name="move-to-preview"
              autoComplete="address-level2"
              placeholder="City or ZIP"
              className="w-full min-h-11 bg-transparent text-base text-foreground outline-none placeholder:text-[#5a6b7d]"
              onFocus={onStart}
              onClick={onStart}
            />
          </span>
        </label>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto sm:min-w-[12rem]"
      >
        Start free Move Plan
      </button>

      <p className="mt-3 text-xs text-[#3d4f63]">
        No lead fees · Independent directory · Works with city or ZIP
      </p>

      <noscript>
        <div className="mt-6 rounded-xl border bg-muted/40 p-4 text-sm text-[#3d4f63] leading-relaxed">
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

type Props = {
  /** Optional; kept for API compat. Not required for first paint. */
  fallbackMovers?: unknown[];
};

/**
 * Client island for the Move Plan wizard only.
 * H1 stays in HomeHeroSsr (SSR LCP). Wizard JS loads only after user intent.
 */
export function HomeWizardSection(_props: Props = {}) {
  const [started, setStarted] = useState(false);

  const start = useCallback(() => {
    setStarted(true);
  }, []);

  return (
    <div className="mx-auto mt-8 max-w-4xl sm:mt-10">
      {started ? (
        <MyMovePlanWizard fallbackMovers={[]} />
      ) : (
        <WizardStartGate onStart={start} />
      )}
    </div>
  );
}
