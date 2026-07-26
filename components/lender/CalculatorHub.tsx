'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  CALCULATORS,
  CALC_JOURNEYS,
  PLANNING_JOURNEY,
  getCalcById,
  getCalcsForJourney,
  type CalcId,
  type CalcJourney,
  type CalcMeta,
} from '@/lib/lender/calculators/registry';
import { trackCalcEvent } from '@/lib/lender/analytics/calculators';
import { CalcHubSkeleton } from '@/components/lender/calculators/shared/CalcSkeleton';
import { SessionSnapshot } from '@/components/lender/calculators/SessionSnapshot';
import { CalcMatchCTA } from '@/components/lender/calculators/shared/CalcMatchCTA';
import { cn } from '@/lib/lender/utils';

const calcLoaders: Record<CalcId, () => Promise<{ default: React.ComponentType }>> = {
  payment: () => import('@/components/lender/calculators/MortgagePaymentPITI'),
  affordability: () => import('@/components/lender/AffordabilityFinder'),
  refinance: () => import('@/components/lender/RefinanceROICalc'),
  amortization: () => import('@/components/lender/calculators/AmortizationPlanner'),
  compare: () => import('@/components/lender/LoanTypeComparator'),
  'rent-vs-buy': () => import('@/components/lender/calculators/RentVsBuyCalc'),
  heloc: () => import('@/components/lender/calculators/HELOCCalc'),
  'down-payment': () => import('@/components/lender/calculators/DownPaymentCalc'),
  rental: () => import('@/components/lender/calculators/RentalCashFlowCalc'),
  dti: () => import('@/components/lender/DTIAnalyzer'),
  closing: () => import('@/components/lender/ClosingCostsEstimator'),
};

function lazyCalc(id: CalcId) {
  return dynamic(calcLoaders[id], {
    ssr: false,
    loading: () => <CalcHubSkeleton />,
  });
}

const CalcComponents: Partial<Record<CalcId, React.ComponentType>> = {};
(CALCULATORS.map((c) => c.id) as CalcId[]).forEach((id) => {
  CalcComponents[id] = lazyCalc(id);
});

const FlagshipPayment = lazyCalc('payment');

const GRID_JOURNEYS: CalcJourney[] = [...CALC_JOURNEYS, PLANNING_JOURNEY];

function CalcCard({
  calc,
  onOpen,
  compact,
}: {
  calc: CalcMeta;
  onOpen: (id: CalcId) => void;
  compact?: boolean;
}) {
  const Icon = calc.icon;
  return (
    <article
      className={cn(
        'group flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all hover:border-[#93C5FD] hover:shadow-md',
        calc.featured && 'border-[#BFDBFE] bg-gradient-to-b from-white to-[#EFF6FF]',
        compact && 'p-4',
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <Icon className="h-8 w-8 shrink-0 text-[#2563EB]" aria-hidden />
        {calc.tag ? (
          <span className="rounded-full bg-[#DBEAFE] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1E40AF]">
            {calc.tag}
          </span>
        ) : null}
      </div>
      <h3 className="text-lg font-bold text-[#111827]">{calc.title}</h3>
      <p className="mt-1 flex-1 text-sm text-[#6B7280]">
        <span className="font-medium text-[#9CA3AF]">What does this tell me? </span>
        {calc.whatItTellsMe}
      </p>
      <button
        type="button"
        onClick={() => onOpen(calc.id)}
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
      >
        Open tool <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </article>
  );
}

export function CalculatorHub({ defaultCalc }: { defaultCalc?: CalcId }) {
  /** null = flagship payment visible in hero; other ids open workspace below */
  const [active, setActive] = useState<CalcId | null>(defaultCalc ?? null);
  const [focusJourney, setFocusJourney] = useState<CalcJourney['id'] | null>(null);

  const openCalc = useCallback((id: CalcId) => {
    setActive(id);
    trackCalcEvent('calc_launch', { calc_id: id });
    history.pushState({ calc: id }, '', `#${id}`);
    const target =
      id === 'payment'
        ? document.getElementById('flagship-calc')
        : document.getElementById('calc-workspace');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const openJourney = useCallback(
    (journey: CalcJourney) => {
      setFocusJourney(journey.id);
      openCalc(journey.primaryCalc);
      document.getElementById('calc-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [openCalc],
  );

  const closeWorkspace = useCallback(() => {
    setActive(null);
    history.replaceState({}, '', window.location.pathname + window.location.search);
    document.getElementById('flagship-calc')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as CalcId;
    if (hash && CALCULATORS.some((c) => c.id === hash)) setActive(hash);
    const onPop = () => {
      const h = window.location.hash.replace('#', '') as CalcId;
      setActive(CALCULATORS.some((c) => c.id === h) ? h : null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const workspaceId: CalcId | null =
    active && active !== 'payment' ? active : active === 'payment' ? null : null;
  const WorkspaceComponent = workspaceId ? CalcComponents[workspaceId] : null;
  const workspaceMeta = workspaceId ? getCalcById(workspaceId) : null;

  const journeysToShow = useMemo(() => {
    if (!focusJourney) return GRID_JOURNEYS;
    const focused = GRID_JOURNEYS.find((j) => j.id === focusJourney);
    if (!focused) return GRID_JOURNEYS;
    return [focused, ...GRID_JOURNEYS.filter((j) => j.id !== focusJourney)];
  }, [focusJourney]);

  return (
    <div className="space-y-14 md:space-y-20">
      {/* ——— 1. Hero utility: flagship PITI ——— */}
      <section
        id="flagship-calc"
        className="scroll-mt-20"
        aria-labelledby="flagship-heading"
      >
        <div className="mb-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Free · No account · Independent estimates
          </p>
          <h2
            id="flagship-heading"
            className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl"
          >
            Live mortgage payment (PITI)
          </h2>
          <p className="mt-2 text-[#6B7280]">
            Adjust price, down payment, rate, and term — your monthly estimate updates instantly.
            Taxes, insurance, PMI, and HOA are included so you see a full housing payment, not just
            principal &amp; interest.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7280]">
              <span className="rounded-full bg-[#DBEAFE] px-2 py-0.5 font-bold text-[#1E40AF]">
                Flagship tool
              </span>
              <span>Sticky result on mobile · Educational only · Not a loan offer</span>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 lg:p-8">
            {/* Sticky payment result on mobile — targets .calc-result-hero */}
            <div className="calc-flagship-piti [&_.calc-result-hero]:sticky [&_.calc-result-hero]:top-16 [&_.calc-result-hero]:z-20 [&_.calc-result-hero]:shadow-md lg:[&_.calc-result-hero]:static lg:[&_.calc-result-hero]:shadow-sm">
              <FlagshipPayment />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <SessionSnapshot />
        </div>
      </section>

      {/* ——— 2. Intent gateway ——— */}
      <section aria-labelledby="intent-heading">
        <div className="mb-6 text-center md:text-left">
          <h2 id="intent-heading" className="text-2xl font-bold text-[#111827] md:text-3xl">
            What are you trying to figure out?
          </h2>
          <p className="mt-2 max-w-2xl text-[#6B7280]">
            Pick a path — we open the best starting calculator and highlight related tools.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CALC_JOURNEYS.map((journey) => {
            const Icon = journey.icon;
            const selected = focusJourney === journey.id;
            return (
              <button
                key={journey.id}
                type="button"
                onClick={() => openJourney(journey)}
                className={cn(
                  'flex min-h-[9.5rem] flex-col rounded-2xl border bg-white p-5 text-left shadow-sm transition-all hover:border-[#93C5FD] hover:shadow-md',
                  selected
                    ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/20'
                    : 'border-[#E5E7EB]',
                )}
              >
                <Icon className="h-8 w-8 text-[#2563EB]" aria-hidden />
                <span className="mt-3 text-lg font-bold text-[#111827]">{journey.gatewayTitle}</span>
                <span className="mt-1 flex-1 text-sm text-[#6B7280]">
                  {journey.gatewayDescription}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB]">
                  Start here <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ——— 3. Organized calculator grid ——— */}
      <section id="calc-grid" className="scroll-mt-20" aria-labelledby="calc-grid-heading">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="calc-grid-heading" className="text-2xl font-bold text-[#111827] md:text-3xl">
              All calculators by journey
            </h2>
            <p className="mt-2 max-w-2xl text-[#6B7280]">
              Tools open inline below — no extra page load. Each card answers “what does this tell
              me?” in plain language.
            </p>
          </div>
          {focusJourney ? (
            <button
              type="button"
              onClick={() => setFocusJourney(null)}
              className="text-sm font-semibold text-[#2563EB] hover:underline"
            >
              Show all journeys
            </button>
          ) : null}
        </div>

        <div className="space-y-12">
          {journeysToShow.map((journey) => {
            const tools = getCalcsForJourney(journey);
            if (tools.length === 0) return null;
            return (
              <div key={journey.id}>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-lg font-bold text-[#111827]">{journey.title}</h3>
                  <span className="h-px flex-1 bg-[#E5E7EB]" aria-hidden />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {tools.map((calc) => (
                    <CalcCard key={`${journey.id}-${calc.id}`} calc={calc} onOpen={openCalc} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ——— 4. Secondary workspace (non-payment tools) ——— */}
      {WorkspaceComponent && workspaceMeta ? (
        <section
          id="calc-workspace"
          className="scroll-mt-20"
          aria-labelledby="workspace-heading"
        >
          <button
            type="button"
            onClick={closeWorkspace}
            className="mb-4 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to payment calculator
          </button>
          <div className="mb-4">
            <h2 id="workspace-heading" className="text-xl font-bold text-[#111827]">
              {workspaceMeta.title}
            </h2>
            <p className="mt-1 text-sm text-[#6B7280]">{workspaceMeta.whatItTellsMe}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">
            <WorkspaceComponent />
          </div>
        </section>
      ) : (
        <div id="calc-workspace" className="scroll-mt-20" aria-hidden />
      )}

      {/* ——— 5. Lender connection (light panel) ——— */}
      <section
        id="lender-next-step"
        className="scroll-mt-20 rounded-2xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] via-white to-[#F0FDFA] p-6 shadow-sm md:p-10"
        aria-labelledby="lender-next-heading"
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2563EB]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Next step — research, not a sales funnel
            </p>
            <h2
              id="lender-next-heading"
              className="mt-3 text-2xl font-bold text-[#111827] md:text-3xl"
            >
              Based on your estimated loan profile, research verified lenders
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
              After you have a payment or loan estimate, compare NMLS-verified mortgage lenders by
              county — the same independence standard as the rest of Lender Trust Hub.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Common loan types to research">
              {['Conventional', 'FHA', 'VA', 'Jumbo', 'Refinance'].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#374151] shadow-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2 text-sm font-medium text-[#047857]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              No paid placements. No lead fees. We do not sell your information.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/lender/local-lenders"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-6 py-3 text-sm font-bold text-white hover:bg-[#2563EB]"
              >
                <MapPin className="h-4 w-4" aria-hidden />
                Explore NMLS-verified lenders in your county
              </Link>
              <Link
                href="/lender"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#111827] hover:border-[#93C5FD]"
              >
                Browse full directory
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 text-[#111827] shadow-sm">
            <p className="text-sm font-semibold">Match from your calculator numbers</p>
            <p className="mt-1 text-xs text-[#6B7280]">
              Optional — uses loan size and payment from your session when available.
            </p>
            <div className="mt-4">
              <CalcMatchCTA
                profile={{
                  estimatedLoan: 340000,
                  estimatedRate: 6.75,
                  estimatedPayment: 2400,
                  loanType: 'Conventional',
                }}
                label="Match Me to Local Lenders"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
