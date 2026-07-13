'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CalendarDays, Package, Sparkles } from 'lucide-react';
import { TrustBadges } from '@/components/trust/trust-badges';
import { ProgressRing } from '@/components/save-my-move/move-hq/progress-ring';
import { ConfettiBurst } from '@/components/save-my-move/move-hq/confetti-burst';
import type { MoveReadiness } from '@/lib/save-my-move/dashboard-utils';
import { cn } from '@/lib/utils';

type MoveHqHeroProps = {
  greetingName: string;
  totalVolume: number;
  inventoryCount: number;
  readiness: MoveReadiness;
};

export function MoveHqHero({
  greetingName,
  totalVolume,
  inventoryCount,
  readiness,
}: MoveHqHeroProps) {
  const prevCompleted = useRef(readiness.completedCount);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    if (readiness.completedCount > prevCompleted.current) {
      setCelebrate(true);
    }
    prevCompleted.current = readiness.completedCount;
  }, [readiness.completedCount]);

  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/8 via-background to-emerald-500/5 p-5 md:p-8 shadow-sm">
      <ConfettiBurst active={celebrate} onDone={() => setCelebrate(false)} />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Move HQ
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back, {greetingName}
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl">
              Your independent command center — inventories, shortlists, and comparisons in one
              place. No lead fees, ever.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl border bg-background/90 px-4 py-3 shadow-sm">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                Total volume
              </p>
              <p className="text-xl font-bold tabular-nums mt-0.5">
                {Math.round(totalVolume).toLocaleString()}
                <span className="text-sm font-medium text-muted-foreground ml-1">cu ft</span>
              </p>
            </div>
            <div className="rounded-xl border bg-background/90 px-4 py-3 shadow-sm">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                Inventories
              </p>
              <p className="text-xl font-bold tabular-nums mt-0.5 flex items-center gap-1.5">
                <Package className="h-4 w-4 text-primary" aria-hidden="true" />
                {inventoryCount}
              </p>
            </div>
            <div className="rounded-xl border bg-background/90 px-4 py-3 shadow-sm">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
                <CalendarDays className="h-3 w-3" aria-hidden="true" />
                Move date
              </p>
              <Link
                href="/moving-calculator"
                className="text-sm font-medium text-primary hover:underline mt-1 inline-block"
              >
                Set in calculator →
              </Link>
            </div>
          </div>

          <TrustBadges variant="compact" className="opacity-90" />
        </div>

        <div className="flex flex-col items-center gap-4 lg:items-end shrink-0">
          <ProgressRing value={readiness.score} label={`Move readiness score ${readiness.score}`} />
          <ol
            className="grid grid-cols-5 gap-1.5 w-full max-w-xs lg:max-w-sm"
            aria-label="Move journey progress"
          >
            {readiness.steps.map((step) => (
              <li key={step.id} className="text-center">
                <div
                  className={cn(
                    'mx-auto h-2 w-2 rounded-full mb-1 transition-colors',
                    step.complete ? 'bg-[#22c55e]' : 'bg-muted-foreground/30'
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    'text-[9px] md:text-[10px] font-medium leading-tight block',
                    step.complete ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}