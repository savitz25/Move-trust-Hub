import { organizationSchema } from '@/lib/seo/schemas';
import type { CityHubContent } from '@/lib/destinations/types';
import type { Market } from '@/lib/destinations/types';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function buildCityHubSchemaGraph(
  market: Market,
  content: CityHubContent,
  canonical: string
) {
  const clusterParent = market.clusterParent
    ? getMarketBySlug(market.clusterParent)
    : undefined;

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
      name: `${market.displayName}, ${market.stateCode}`,
      item: canonical,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
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
        '@type': 'Service',
        '@id': `${canonical}#quote-service`,
        name: `Free Moving Quote Matching to ${market.displayName}, ${market.stateCode}`,
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
        name: `How to Plan a Move to ${market.displayName}, ${market.stateCode}`,
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
            text: 'Check each carrier\'s USDOT and MC numbers on FMCSA.gov and review complaint ratios before booking.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Compare matched quotes',
            text: 'Request 2–3 competitive quotes from FMCSA-licensed movers and compare on equal inventory volume.',
          },
        ],
      },
    ],
  };
}