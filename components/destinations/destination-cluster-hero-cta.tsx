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
      quoteLabel={`Get Free Quotes to ${clusterLabel}`}
      calculatorHref={calculatorHref}
      prefilledData={{
        toZip: market?.defaultToZip,
        destinationSlug: clusterSlug,
        marketPriority: market?.priority,
        notes: `Inbound destination cluster: ${clusterLabel}`,
      }}
    />
  );
}