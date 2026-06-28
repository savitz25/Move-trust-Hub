'use client';

import { PageHeroCta } from '@/components/conversion/page-hero-cta';

type GuideCtaClientProps = {
  quoteLabel?: string;
  calculatorHref?: string;
  prefilledNotes?: string;
};

export function GuideCtaClient({
  quoteLabel = 'Get Free Quotes',
  calculatorHref = '/moving-calculator',
  prefilledNotes = 'Quote request from moving resources guide',
}: GuideCtaClientProps) {
  return (
    <PageHeroCta
      quoteLabel={quoteLabel}
      calculatorHref={calculatorHref}
      prefilledData={{ notes: prefilledNotes }}
      showTrustBadges
    />
  );
}