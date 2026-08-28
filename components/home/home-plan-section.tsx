import { HeroRouteForm } from '@/components/move/hero-route-form';

export function HomePlanSection() {
  return (
    <section
      id="plan-your-move"
      aria-labelledby="plan-your-move-heading"
      className="move-section border-y border-border/60 bg-gradient-to-b from-orange-50/30 to-background"
    >
      <div className="move-section-inner grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Plan your move
          </p>
          <h2
            id="plan-your-move-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl"
          >
            Plan your move with the research in hand
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Same Move Plan as before — From and To, then inventory, shortlist, and save.
            The planner is a high-value next step after research, not a ranking engine.
          </p>
        </div>
        <HeroRouteForm headingAs="h3" />
      </div>
    </section>
  );
}
