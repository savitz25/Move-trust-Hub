import Link from 'next/link';
import { Calculator, Truck, ArrowRight } from 'lucide-react';

export function LocalMoversCta({ countyName }: { countyName?: string }) {
  const locationHint = countyName ? ` in ${countyName}` : '';

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight mb-2">
        Planning a move{locationHint}?
      </h2>
      <p className="text-sm text-muted-foreground mb-5 max-w-2xl leading-relaxed">
        Local movers handle in-county and short-distance relocations. For interstate
        moves, use our calculator to estimate volume and compare FMCSA-licensed
        carriers in our national directory.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/moving-calculator"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Calculator className="h-4 w-4" aria-hidden="true" />
          Moving Calculator
        </Link>
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-background text-sm font-semibold hover:bg-accent transition-colors"
        >
          <Truck className="h-4 w-4" aria-hidden="true" />
          Interstate Directory
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-background text-sm font-semibold hover:bg-accent transition-colors"
        >
          Get Free Quotes
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}