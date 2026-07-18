'use client';

import { useMemo, useState } from 'react';
import { Zap } from 'lucide-react';
import { MyMovePlanWizard } from '@/components/my-move-plan/my-move-plan-wizard';
import type { HomeRouteMover } from '@/lib/home/resolve-route-from-zip';
import type { MyMovePlanStep } from '@/lib/my-move-plan/types';
import { stepToPhase } from '@/lib/my-move-plan/readiness';
import { cn } from '@/lib/utils';

const HERO_BY_PHASE = {
  plan: {
    title: 'Where are you moving from and to?',
    body: 'Start one free Move Plan: lock your route, shortlist up to three trusted movers, build an inventory, and get a report you can send for comparable estimates.',
    chip: 'City or ZIP · trusted movers · free tools',
  },
  build: {
    title: 'Build your shortlist and shared inventory',
    body: 'Pick up to three movers, then document the same load for each. A shared inventory is how you get fair, apples-to-apples estimates — not guesswork.',
    chip: 'Why 3? · same inventory · comparable quotes',
  },
  book: {
    title: 'Your move report is ready',
    body: 'Send one documented plan to your shortlisted movers so every quote uses the same route and inventory. Independent directory — no lead resellers.',
    chip: 'Report ready · send for estimates · no lead fees',
  },
} as const;

type Props = {
  fallbackMovers?: HomeRouteMover[];
};

export function HomeWizardSection({ fallbackMovers = [] }: Props) {
  const [step, setStep] = useState<MyMovePlanStep>('route');
  const phase = stepToPhase(step);
  const hero = useMemo(() => HERO_BY_PHASE[phase], [phase]);

  return (
    <>
      <div className="mx-auto max-w-4xl text-center">
        <h1
          className={cn(
            'text-balance font-semibold leading-[1.1] tracking-tighter text-[#0A2540]',
            'text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem]',
            'transition-opacity duration-300'
          )}
        >
          {hero.title}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {hero.body}
        </p>

        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Zap className="h-3.5 w-3.5" aria-hidden />
          {hero.chip}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl sm:mt-10">
        <MyMovePlanWizard
          fallbackMovers={fallbackMovers}
          onStepChange={setStep}
        />
      </div>
    </>
  );
}
