'use client';

import { PageHeroCta } from '@/components/conversion/page-hero-cta';
import { getMarketBySlug } from '@/lib/destinations/markets';

type Props = {
  clusterSlug: string;
  clusterLabel: string;
};

export function DestinationClusterHeroCta({ clusterSlug, clusterLabel }: Props) {
  const market = getMarketBySlug(clusterSlug);
  const calculatorHref = market?.defaultToZip
    ? `/moving-calculator?toZip=${market.defaultToZip}&dest=${clusterSlug}`
    : '/moving-calculator';

  return (
    <PageHeroCta
      primaryLabel={`Estimate Your Move to ${clusterLabel}`}
      primaryHref={calculatorHref}
      secondaryLabel="Compare Trusted Movers"
      secondaryHref="/companies"
      tertiaryLabel="Browse Local Movers"
      tertiaryHref="/local-movers"
    />
  );
}