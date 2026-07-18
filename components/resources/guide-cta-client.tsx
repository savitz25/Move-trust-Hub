'use client';

import { PageHeroCta } from '@/components/conversion/page-hero-cta';

type GuideCtaClientProps = {
  calculatorHref?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function GuideCtaClient({
  calculatorHref = '/moving-calculator',
  secondaryHref = '/companies',
  secondaryLabel = 'Compare Trusted Movers',
}: GuideCtaClientProps) {
  return (
    <PageHeroCta
      primaryLabel="Use Free Moving Calculator"
      primaryHref={calculatorHref}
      secondaryLabel={secondaryLabel}
      secondaryHref={secondaryHref}
    />
  );
}