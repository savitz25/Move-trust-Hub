'use client';

import { PageHeroCta } from '@/components/conversion/page-hero-cta';

type Props = {
  countyLabel: string;
  stateName: string;
  stateSlug: string;
};

export function CountyPageHeroCta({ countyLabel, stateName, stateSlug }: Props) {
  return (
    <PageHeroCta
      primaryLabel="Use Free Moving Calculator"
      primaryHref="/moving-calculator"
      secondaryLabel="Compare Trusted Movers"
      secondaryHref="/companies"
      tertiaryLabel={`Browse ${stateName} Local Movers`}
      tertiaryHref={`/local-movers/${stateSlug}`}
    />
  );
}