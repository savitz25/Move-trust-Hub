import { TrustMark } from '@/components/network/trust-mark';
import { HomeMoverSearch } from '@/components/home/home-mover-search';
import { MOVE_HOME_H1 } from '@/lib/intelligence/home-types';

export function HomeIntelHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60" aria-labelledby="move-intel-hero-heading">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50/80 via-[#F7F8FA] to-[#EEF2F7]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-0 h-[26rem] w-[26rem] rounded-full bg-primary/[0.09] blur-3xl"
        aria-hidden
      />

      <div className="move-section-inner relative py-10 sm:py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Move Trust Hub · Independent moving research
        </p>
        <div className="mt-2.5">
          <TrustMark />
        </div>
        <h1
          id="move-intel-hero-heading"
          className="mt-4 max-w-3xl text-balance font-semibold leading-[1.08] tracking-tighter text-[#0A2540] text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem]"
        >
          {MOVE_HOME_H1}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#1E293B] sm:text-lg">
          Independent research of mover identity, carrier and broker roles, FMCSA authority,
          and state guides — then the planner, calculator, Compare, and My Move tools you
          already use. Not a marketplace, ranking board, or endorsement.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="#moving-intelligence"
            className="move-cta inline-flex h-11 min-w-[12rem] items-center justify-center rounded-xl px-5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            data-intel-event="move_intel_explore"
          >
            Explore Moving Intelligence
          </a>
          <a
            href="#plan-your-move"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-white px-5 text-sm font-semibold text-[#0A2540] hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            data-intel-event="move_intel_plan_continue"
          >
            Plan your move
          </a>
        </div>

        <div className="mt-6">
          <HomeMoverSearch compact />
        </div>
      </div>
    </section>
  );
}
