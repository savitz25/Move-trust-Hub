import { testimonials } from '@/lib/trust/trust-data';
import { SITE_EMAIL } from '@/lib/contact';

const SITE_URL = 'https://www.movetrusthub.com';

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Move Trust Hub',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: SITE_EMAIL,
  contactPoint: {
    '@type': 'ContactPoint',
    email: SITE_EMAIL,
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: 'English',
  },
  description:
    'Independent directory and quote-matching service for FMCSA-licensed interstate and long-distance moving companies in the United States.',
};

function buildAttributableReviewSchemas() {
  return testimonials
    .filter((t) => t.date && t.source === 'Google')
    .map((testimonial, index) => ({
      '@type': 'Review',
      '@id': `${SITE_URL}/#attributed-review-${index + 1}`,
      name: testimonial.companyName
        ? `${testimonial.companyName} — ${testimonial.source} review`
        : `Attributed ${testimonial.source} review`,
      author: {
        '@type': 'Person',
        name: testimonial.name,
      },
      reviewBody: testimonial.quote,
      datePublished: testimonial.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(testimonial.rating),
        bestRating: '5',
        worstRating: '1',
      },
      itemReviewed: testimonial.companySlug
        ? {
            '@type': 'MovingCompany',
            name: testimonial.companyName,
            url: `${SITE_URL}/companies/${testimonial.companySlug}`,
          }
        : {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'Move Trust Hub',
          },
    }));
}

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
  '@id': `${SITE_URL}/#moving-quote-service`,
  name: 'Interstate Moving Quote Matching',
  serviceType: 'Interstate moving company comparison and free quote matching',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  description:
    'Compare FMCSA-licensed interstate movers by reputation, reviews, and pricing. Get matched with 2-3 free long-distance moving quotes within 24 hours.',
  url: SITE_URL,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free quote matching for interstate moves',
  },
};

export const homepageFaqItems = [
  {
    question: 'How do I get free interstate moving quotes on Move Trust Hub?',
    answer:
      'Fill out our free quote form or use the moving calculator first, then submit your move details. We match you with 2-3 FMCSA-licensed interstate movers who contact you directly with personalized quotes within 24 hours.',
  },
  {
    question: 'How does Move Trust Hub help me compare long-distance movers?',
    answer:
      'Move Trust Hub combines attributed customer reviews where available, FMCSA licensing data, reputation scores, and side-by-side comparison tools so you can research movers before requesting quotes.',
  },
  {
    question: 'Why should I use the moving calculator before requesting quotes?',
    answer:
      'Knowing your cubic footage and estimated weight helps you compare quotes fairly, avoid lowball estimates, and spot inflated pricing. Our free room-by-room inventory calculator calculates volume, weight, and recommended truck size instantly.',
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
  const attributableReviews = buildAttributableReviewSchemas();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      homepageServiceSchema,
      buildFaqSchema(homepageFaqItems, `${SITE_URL}/#homepage-faq`),
      ...(attributableReviews.length > 0 ? attributableReviews : []),
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