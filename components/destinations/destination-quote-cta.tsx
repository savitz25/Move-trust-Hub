import Link from 'next/link';
import { ArrowRight, Calculator, Scale } from 'lucide-react';
import type { Market } from '@/lib/destinations/types';

type Props = {
  market: Market;
  variant?: 'primary' | 'footer';
};

export function DestinationQuoteCta({ market, variant = 'primary' }: Props) {
  const calculatorHref = `/moving-calculator?toZip=${market.defaultToZip}&dest=${market.slug}`;
  const isFooter = variant === 'footer';

  return (
    <div className={isFooter ? 'flex flex-col sm:flex-row gap-3 justify-center' : 'contents'}>
      <Link
        href={calculatorHref}
        prefetch={false}
        className={
          isFooter
            ? 'inline-flex items-center justify-center gap-2 rounded-md bg-background text-foreground px-6 py-3 text-sm font-medium hover:bg-background/90 transition-colors min-h-[48px]'
            : 'inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors min-h-[48px]'
        }
      >
        <Calculator className="h-4 w-4" aria-hidden="true" />
        Estimate Move to {market.displayName}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <Link
        href="/companies"
        prefetch={false}
        className={
          isFooter
            ? 'inline-flex items-center justify-center gap-2 rounded-md border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary-foreground/20 transition-colors min-h-[48px]'
            : 'inline-flex items-center justify-center gap-2 rounded-md border bg-card px-6 py-3 text-sm font-medium hover:border-primary/40 transition-colors min-h-[48px]'
        }
      >
        <Scale className="h-4 w-4" aria-hidden="true" />
        Browse Verified Movers
      </Link>
    </div>
  );
}