'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';
import { MOVE_HERO_FORM } from '@/lib/design/move-design-system';
import { cn } from '@/lib/utils';

/**
 * Intent-gated Move Plan island.
 * Full wizard chunk loads only after click/focus (keeps homepage first paint light).
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
      className="min-h-[22rem] rounded-2xl border border-border/80 bg-white p-6 shadow-move-glow sm:min-h-[24rem]"
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

function RouteFormGate({ onStart }: { onStart: () => void }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border/80 bg-white/95',
        'p-5 shadow-trust-lg sm:p-6 md:p-7',
        'ring-1 ring-primary/10'
      )}
    >
      {/* Soft orange edge accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-move-soft to-primary"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {MOVE_HERO_FORM.stepLabel}
      </p>
      <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-[#0A2540] sm:text-2xl">
        {MOVE_HERO_FORM.title}
      </h2>

      <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block text-left">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-primary">
            {MOVE_HERO_FORM.fromLabel}
          </span>
          <span className="flex min-h-14 items-center gap-2 rounded-2xl border-2 border-border/80 bg-white px-3 shadow-sm transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
            <MapPin className="h-5 w-5 shrink-0 text-primary/80" aria-hidden />
            <input
              type="text"
              name="move-from-preview"
              autoComplete="address-level2"
              placeholder={MOVE_HERO_FORM.fieldPlaceholder}
              className="w-full min-h-11 bg-transparent text-base text-foreground outline-none placeholder:text-[#5a6b7d]"
              onFocus={onStart}
              onClick={onStart}
              aria-label="Moving from city or ZIP"
            />
          </span>
        </label>
        <label className="block text-left">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-primary">
            {MOVE_HERO_FORM.toLabel}
          </span>
          <span className="flex min-h-14 items-center gap-2 rounded-2xl border-2 border-border/80 bg-white px-3 shadow-sm transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
            <MapPin className="h-5 w-5 shrink-0 text-primary/80" aria-hidden />
            <input
              type="text"
              name="move-to-preview"
              autoComplete="address-level2"
              placeholder={MOVE_HERO_FORM.fieldPlaceholder}
              className="w-full min-h-11 bg-transparent text-base text-foreground outline-none placeholder:text-[#5a6b7d]"
              onFocus={onStart}
              onClick={onStart}
              aria-label="Moving to city or ZIP"
            />
          </span>
        </label>
      </div>

      <button
        type="button"
        onClick={onStart}
        className={cn(
          'move-cta mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl px-6',
          'text-sm font-semibold transition-[filter,transform] hover:brightness-105',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'sm:w-auto sm:min-w-[14rem]'
        )}
      >
        {MOVE_HERO_FORM.cta}
      </button>

      <p className="mt-3 text-xs leading-relaxed text-[#3d4f63]">
        {MOVE_HERO_FORM.micro}
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

/**
 * Primary hero form card — loads full Move Plan wizard on intent.
 */
export function HeroRouteForm() {
  const [started, setStarted] = useState(false);

  const start = useCallback(() => {
    setStarted(true);
  }, []);

  if (started) {
    return (
      <div className="min-h-[22rem] sm:min-h-[24rem]">
        <MyMovePlanWizard fallbackMovers={[]} />
      </div>
    );
  }

  return <RouteFormGate onStart={start} />;
}
