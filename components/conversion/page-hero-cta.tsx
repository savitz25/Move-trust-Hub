'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuoteModal, type QuotePrefillData } from '@/components/quote-modal';
import { TrustBadges } from '@/components/trust/trust-badges';
import { cn } from '@/lib/utils';

type PageHeroCtaProps = {
  quoteLabel?: string;
  calculatorHref?: string;
  calculatorLabel?: string;
  prefilledData?: QuotePrefillData;
  showTrustBadges?: boolean;
  showMicrocopy?: boolean;
  className?: string;
};

export function PageHeroCta({
  quoteLabel = 'Get Free Quotes',
  calculatorHref = '/moving-calculator',
  calculatorLabel = 'Estimate My Move First',
  prefilledData,
  showTrustBadges = true,
  showMicrocopy = true,
  className,
}: PageHeroCtaProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={cn('flex flex-col sm:flex-row gap-3', className)}>
        <Button
          onClick={() => setOpen(true)}
          className="gap-2 min-h-[48px] w-full sm:w-auto"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          {quoteLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Link
          href={calculatorHref}
          prefetch={false}
          className="inline-flex items-center justify-center gap-2 rounded-md border bg-card px-6 py-3 text-sm font-medium hover:border-primary/40 transition-colors min-h-[48px] w-full sm:w-auto"
        >
          <Calculator className="h-4 w-4" aria-hidden="true" />
          {calculatorLabel}
        </Link>
      </div>
      {showMicrocopy ? (
        <p className="text-xs text-muted-foreground mt-3">
          Takes less than 60 seconds. No obligation.
        </p>
      ) : null}
      {showTrustBadges ? (
        <TrustBadges variant="compact" className="mt-6" />
      ) : null}
      <QuoteModal
        open={open}
        onOpenChange={setOpen}
        prefilledData={prefilledData}
      />
    </>
  );
}