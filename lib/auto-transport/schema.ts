const SITE_URL = 'https://www.movetrusthub.com';

export function buildAutoTransportSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/auto-transport#webpage`,
        url: `${SITE_URL}/auto-transport`,
        name: 'Auto Transport Calculator & Car Shipping Directory',
        description:
          'Estimate open and enclosed auto transport costs by ZIP code, then compare FMCSA-licensed car shipping companies.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/auto-transport#calculator`,
        name: 'Auto Transport Cost Calculator',
        serviceType: 'Vehicle shipping estimate',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        description:
          'Free calculator that estimates open and enclosed car shipping prices based on route distance, vehicle size, and transport type.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description:
            'Free instant auto transport price range estimates before requesting carrier quotes.',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much does it cost to ship a car?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most U.S. routes fall between $0.50 and $1.40 per mile depending on vehicle size and whether you choose open or enclosed transport. Use the calculator for a route-specific range.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between open and enclosed auto transport?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Open transport loads vehicles on a multi-car carrier exposed to weather. Enclosed transport uses a covered trailer for added protection and typically costs about $0.15 more per mile.',
            },
          },
        ],
      },
    ],
  };
}