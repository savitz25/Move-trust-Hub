import Link from 'next/link';
import { Calculator, ArrowRight, Package, Truck } from 'lucide-react';
import type { RouteGuide } from '@/lib/resources/routes';

type Props = {
  route: RouteGuide;
};

export function RouteCalculatorEmbed({ route }: Props) {
  const calculatorHref = `/moving-calculator?route=${encodeURIComponent(route.slug)}&notes=${encodeURIComponent(`${route.from} to ${route.to} interstate move`)}`;

  return (
    <section
      className="mb-10 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-background p-6"
      aria-labelledby="route-calculator-heading"
    >
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 id="route-calculator-heading" className="text-xl font-semibold tracking-tight">
          Estimate your {route.from} → {route.to} move
        </h2>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        Accurate cubic footage is the #1 factor in interstate pricing on this corridor (
        {route.distance}). Build a room-by-room inventory before comparing carrier quotes.
      </p>
      <div className="rounded-lg border bg-card p-3 text-sm mb-4 grid sm:grid-cols-2 gap-2">
        <div>
          <span className="text-muted-foreground">Typical cost:</span>{' '}
          <span className="font-medium">{route.avgCostRange}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Transit window:</span>{' '}
          <span className="font-medium">{route.deliveryWindow}</span>
        </div>
      </div>
      <ul className="text-xs text-muted-foreground space-y-2 mb-5">
        <li className="flex items-start gap-2">
          <Package className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
          Room-by-room inventory with industry-standard item volumes
        </li>
        <li className="flex items-start gap-2">
          <Truck className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
          Weight estimate at 7 lbs/cu ft + recommended truck size
        </li>
      </ul>
      <Link
        href={calculatorHref}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Open Free Moving Calculator
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}