import Link from 'next/link';
import { Calculator, Truck, Scale, ArrowRight } from 'lucide-react';

type LocalMoversCtaProps = {
  countyName?: string;
  stateSlug?: string;
};

export function LocalMoversCta({ countyName, stateSlug }: LocalMoversCtaProps) {
  const locationHint = countyName ? ` in ${countyName}` : '';

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight mb-2">
        Planning a move{locationHint}?
      </h2>
      <p className="text-sm text-muted-foreground mb-5 max-w-2xl leading-relaxed">
        Local movers handle in-county and short-distance relocations. For interstate
        moves, use our free calculator to estimate volume, then compare FMCSA-licensed
        carriers in the directory.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/moving-calculator"
          prefetch={false}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors min-h-[44px]"
        >
          <Calculator className="h-4 w-4" aria-hidden="true" />
          Free Moving Calculator
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href="/companies"
          prefetch={false}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-background text-sm font-semibold hover:bg-accent transition-colors min-h-[44px]"
        >
          <Scale className="h-4 w-4" aria-hidden="true" />
          Compare Trusted Movers
        </Link>
        {stateSlug ? (
          <Link
            href={`/local-movers/${stateSlug}`}
            prefetch={false}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-background text-sm font-semibold hover:bg-accent transition-colors min-h-[44px]"
          >
            <Truck className="h-4 w-4" aria-hidden="true" />
            Browse Local Movers
          </Link>
        ) : (
          <Link
            href="/local-movers"
            prefetch={false}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-background text-sm font-semibold hover:bg-accent transition-colors min-h-[44px]"
          >
            <Truck className="h-4 w-4" aria-hidden="true" />
            Browse Local Movers
          </Link>
        )}
      </div>
    </div>
  );
}