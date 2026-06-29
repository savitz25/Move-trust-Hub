import { organizationSchema } from '@/lib/seo/schemas';
import { moverHasSchemaAggregateRating } from '@/lib/trust/verified-reviews';
import type { CityHubContent } from '@/lib/destinations/types';
import type { Market } from '@/lib/destinations/types';
import type { MarketMoverEntry } from '@/lib/destinations/get-movers-for-market';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { SITE_URL } from '@/lib/seo/site-metadata';
const DESTINATION_SERVICE_FRAGMENT = '#destination-moving-service';

function buildDestinationServiceId(canonical: string): string {
  return `${canonical}${DESTINATION_SERVICE_FRAGMENT}`;
}

function buildDestinationMoverNode(
  entry: MarketMoverEntry,
  canonical: string,
  destinationLabel: string
): Record<string, unknown> {
  const mover = entry.mover;
  return {
    '@type': ['MovingCompany', 'LocalBusiness'],
    '@id': `${canonical}#mover-${mover.id}`,
    name: mover.name,
    description: mover.shortDescription,
    url: canonical,
    ...(mover.city
      ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: mover.city,
            addressRegion: entry.stateCode,
            addressCountry: 'US',
          },
        }
      : {}),
    areaServed: {
      '@type': 'City',
      name: destinationLabel,
    },
    ...(moverHasSchemaAggregateRating(mover) &&
    mover.rating > 0 &&
    mover.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: String(mover.rating),
            reviewCount: String(mover.reviewCount),
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
  };
}

export function buildCityHubSchemaGraph(
  market: Market,
  content: CityHubContent,
  canonical: string,
  movers: MarketMoverEntry[] = []
) {
  const clusterParent = market.clusterParent
    ? getMarketBySlug(market.clusterParent)
    : undefined;

  const destinationLabel = `${market.displayName}, ${market.stateCode}`;
  const serviceId = buildDestinationServiceId(canonical);
  const featuredMovers = movers.slice(0, 6);

  const breadcrumbItems = [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem' as const,
      position: 2,
      name: 'Popular Destinations',
      item: `${SITE_URL}/moving-to`,
    },
    ...(clusterParent
      ? [
          {
            '@type': 'ListItem' as const,
            position: 3,
            name: clusterParent.displayName,
            item: `${SITE_URL}/moving-to/${clusterParent.slug}`,
          },
        ]
      : []),
    {
      '@type': 'ListItem' as const,
      position: clusterParent ? 4 : 3,
      name: destinationLabel,
      item: canonical,
    },
  ];

  const graph: Record<string, unknown>[] = [
    organizationSchema,
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumbs`,
      itemListElement: breadcrumbItems,
    },
    {
      '@type': 'WebPage',
      '@id': canonical,
      name: content.seo.title,
      description: content.seo.description,
      url: canonical,
      inLanguage: 'en-US',
      about: { '@id': `${canonical}#place` },
      mainEntity: { '@id': `${canonical}#faq` },
    },
    {
      '@type': 'City',
      '@id': `${canonical}#place`,
      name: market.displayName,
      containedInPlace: {
        '@type': 'State',
        name: market.stateName,
        addressRegion: market.stateCode,
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': serviceId,
      name: `Moving Companies Serving ${destinationLabel}`,
      description: `FMCSA-licensed interstate and local movers serving ${destinationLabel} and surrounding counties.`,
      url: canonical,
      areaServed: { '@id': `${canonical}#place` },
    },
    {
      '@type': 'Service',
      '@id': `${canonical}#quote-service`,
      name: `Free Moving Quote Matching to ${destinationLabel}`,
      serviceType: 'Interstate moving quote matching',
      provider: { '@id': `${organizationSchema['@id']}` },
      areaServed: { '@id': `${canonical}#place` },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      name: `FAQ: Moving to ${destinationLabel}`,
      mainEntity: content.faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@type': 'HowTo',
      '@id': `${canonical}#howto`,
      name: `How to Plan a Move to ${destinationLabel}`,
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Estimate your inventory',
          text: 'Use the free room-by-room moving calculator to calculate cubic feet and weight before requesting quotes.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Verify FMCSA licensing',
          text: "Check each carrier's USDOT and MC numbers on FMCSA.gov and review complaint ratios before booking.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Compare matched quotes',
          text: 'Request 2–3 competitive quotes from FMCSA-licensed movers and compare on equal inventory volume.',
        },
      ],
    },
  ];

  if (featuredMovers.length > 0) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${canonical}#movers-list`,
      name: `Top Movers Serving ${destinationLabel}`,
      numberOfItems: featuredMovers.length,
      itemListElement: featuredMovers.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: entry.mover.name,
        item: { '@id': `${canonical}#mover-${entry.mover.id}` },
      })),
    });

    for (const entry of featuredMovers) {
      graph.push(buildDestinationMoverNode(entry, canonical, destinationLabel));
    }
  }

  // Editorial destination quotes are UI-only — not emitted as Review schema (E-E-A-T).

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}