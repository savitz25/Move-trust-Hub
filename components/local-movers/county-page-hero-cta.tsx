'use client';

import { PageHeroCta } from '@/components/conversion/page-hero-cta';

type Props = {
  countyLabel: string;
  stateName: string;
};

export function CountyPageHeroCta({ countyLabel, stateName }: Props) {
  return (
    <PageHeroCta
      quoteLabel="Get Free Interstate Quotes"
      calculatorHref="/moving-calculator"
      prefilledData={{
        notes: `Local movers directory: ${countyLabel}, ${stateName}`,
      }}
    />
  );
}