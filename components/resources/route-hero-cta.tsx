'use client';

import { PageHeroCta } from '@/components/conversion/page-hero-cta';

type RouteHeroCtaProps = {
  from: string;
  to: string;
  destinationHubPath?: string;
};

export function RouteHeroCta({ from, to, destinationHubPath }: RouteHeroCtaProps) {
  return (
    <PageHeroCta
      quoteLabel={`Get Free Quotes: ${from} → ${to}`}
      calculatorHref="/moving-calculator"
      prefilledData={{
        notes: `Route guide quote request: ${from} to ${to}`,
      }}
      showTrustBadges
      className="mb-8"
    />
  );
}