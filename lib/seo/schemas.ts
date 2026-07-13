import { SITE_EMAIL } from '@/lib/contact';
import { trustHubLogoUrl } from '@/lib/hub/config';

const SITE_URL = 'https://www.movetrusthub.com';

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Move Trust Hub',
  url: SITE_URL,
  logo: trustHubLogoUrl(SITE_URL),
  email: SITE_EMAIL,
  contactPoint: {
    '@type': 'ContactPoint',
    email: SITE_EMAIL,
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: 'English',
  },
  description:
    'Independent directory for researching FMCSA-licensed interstate and long-distance moving companies in the United States. No lead fees, no paid placements.',
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Move Trust Hub',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-US',
};

export const homepageServiceSchema = {
  '@type': 'Service',
  '@id': `${SITE_URL}/#moving-directory-service`,
  name: 'Interstate Moving Company Directory',
  serviceType: 'Interstate moving company research and comparison',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  description:
    'Compare FMCSA-licensed interstate movers by reputation, reviews, and pricing. Free moving calculator, destination guides, and county-level directories — independent research with no lead fees.',
  url: SITE_URL,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free moving research tools and directory access',
  },
};

export const homepageFaqItems = [
  {
    question: 'How do I research interstate movers on Move Trust Hub?',
    answer:
      'Start with our free moving calculator to estimate volume and weight, then browse our FMCSA-licensed mover directory. Filter by reputation, compare companies side-by-side, and contact movers directly when you are ready.',
  },
  {
    question: 'How does Move Trust Hub help me compare long-distance movers?',
    answer:
      'Move Trust Hub combines attributed customer reviews where available, FMCSA licensing data, reputation scores, and side-by-side comparison tools so you can research movers independently before contacting carriers.',
  },
  {
    question: 'Why should I use the moving calculator before contacting movers?',
    answer:
      'Knowing your cubic footage and estimated weight helps you compare estimates fairly, avoid lowball pricing, and spot inflated quotes. Our free room-by-room inventory calculator calculates volume, weight, and recommended truck size instantly.',
  },
  {
    question: 'Is Move Trust Hub affiliated with the moving companies listed?',
    answer:
      'No. Move Trust Hub is an independent informational directory. We are not affiliated with, endorsed by, or a partner of the companies listed. Company names and data are used for identification and research purposes only.',
  },
];

export const calculatorFaqItems = [
  {
    question: 'How do I calculate cubic feet for an interstate move?',
    answer:
      'Add each furniture item and box to your inventory using room-by-room or quick-add mode. Move Trust Hub sums industry-standard item volumes to calculate your total cubic feet automatically.',
  },
  {
    question: 'How accurate is the weight estimate in this moving calculator?',
    answer:
      'Weight is estimated at 7 pounds per cubic foot, a common industry average for household goods. Actual weight varies by item density and packing style, but the estimate is useful for comparing mover quotes.',
  },
  {
    question: 'What truck size do I need based on cubic footage?',
    answer:
      'The calculator recommends a move size bracket based on your total cubic feet, including suggested truck or container size, crew size, and estimated loading time for studio through large home moves.',
  },
  {
    question: 'Should I add items by room or use quick add?',
    answer:
      'Room-by-room mode is recommended for the most accurate inventory because items are organized by space. Quick add is faster when you already know what you are moving and want a rapid estimate.',
  },
];

function buildFaqSchema(items: { question: string; answer: string }[], id: string) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildHomepageSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      homepageServiceSchema,
      buildFaqSchema(homepageFaqItems, `${SITE_URL}/#homepage-faq`),
    ],
  };
}

export function buildAboutPageSchemaGraph() {
  const aboutUrl = `${SITE_URL}/about`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'AboutPage',
        '@id': `${aboutUrl}#webpage`,
        url: aboutUrl,
        name: 'About Move Trust Hub & Trust Center',
        description:
          'Our mission, how we calculate reputation scores, data sources, tools we offer, and important disclaimers.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${aboutUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About',
            item: aboutUrl,
          },
        ],
      },
    ],
  };
}

export function buildCalculatorSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'WebApplication',
        '@id': `${SITE_URL}/moving-calculator#app`,
        name: 'Move Trust Hub Free Moving Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        url: `${SITE_URL}/moving-calculator`,
        description:
          'Free room-by-room moving inventory calculator that estimates total cubic feet, weight, and recommended truck size for interstate moves.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        provider: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/moving-calculator#service`,
        name: 'Moving Volume & Weight Estimation',
        serviceType: 'Moving inventory and cubic feet estimation',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        url: `${SITE_URL}/moving-calculator`,
      },
      buildFaqSchema(calculatorFaqItems, `${SITE_URL}/moving-calculator#faq`),
    ],
  };
}