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
      primaryLabel="Use Free Moving Calculator"
      primaryHref="/moving-calculator"
      secondaryLabel="Compare Trusted Movers"
      secondaryHref="/companies"
      tertiaryLabel={
        destinationHubPath ? `Explore ${to} Moving Guide` : 'Learn More About This Route'
      }
      tertiaryHref={destinationHubPath ?? '#route-overview'}
      className="mb-8"
    />
  );
}