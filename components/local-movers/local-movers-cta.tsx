'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Truck, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuoteModal, type QuotePrefillData } from '@/components/quote-modal';

type LocalMoversCtaProps = {
  countyName?: string;
  prefilledData?: QuotePrefillData;
};

export function LocalMoversCta({ countyName, prefilledData }: LocalMoversCtaProps) {
  const [open, setOpen] = useState(false);
  const locationHint = countyName ? ` in ${countyName}` : '';
  const quotePrefill: QuotePrefillData = {
    ...prefilledData,
    notes:
      prefilledData?.notes ??
      (countyName
        ? `Quote request from local movers guide: ${countyName}`
        : 'Quote request from local movers directory'),
  };

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
        <Button onClick={() => setOpen(true)} className="gap-2 min-h-[44px]">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Get Free Quotes
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Link
          href="/moving-calculator"
          prefetch={false}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors min-h-[44px]"
        >
          <Calculator className="h-4 w-4" aria-hidden="true" />
          Moving Calculator
        </Link>
        <Link
          href="/companies"
          prefetch={false}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-background text-sm font-semibold hover:bg-accent transition-colors min-h-[44px]"
        >
          <Truck className="h-4 w-4" aria-hidden="true" />
          Interstate Directory
        </Link>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Takes less than 60 seconds. No obligation.
      </p>
      <QuoteModal open={open} onOpenChange={setOpen} prefilledData={quotePrefill} />
    </div>
  );
}