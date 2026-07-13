import { trustHubLogoUrl } from '@/lib/hub/config';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import { SITE_EMAIL, SITE_NAME } from '@/lib/insurance/constants';
import type { Provider } from '@/types/insurance/provider';

const INSURANCE_HUB_URL = hubCanonicalUrl('insurance', '/');

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${INSURANCE_HUB_URL}#organization`,
  name: SITE_NAME,
  url: INSURANCE_HUB_URL,
  logo: trustHubLogoUrl(),
  email: SITE_EMAIL,
  contactPoint: {
    '@type': 'ContactPoint',
    email: SITE_EMAIL,
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: 'English',
  },
  description:
    'Independent directory of licensed insurance agencies and brokers in the United States. Compare reviews, specialties, and request quotes for personal and commercial coverage.',
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${INSURANCE_HUB_URL}#website`,
  name: SITE_NAME,
  url: INSURANCE_HUB_URL,
  publisher: { '@id': `${INSURANCE_HUB_URL}#organization` },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${INSURANCE_HUB_URL}/directory?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const homepageServiceSchema = {
  '@type': 'Service',
  '@id': `${INSURANCE_HUB_URL}#insurance-quote-service`,
  name: 'Insurance Agency Matching',
  serviceType: 'Insurance agency comparison and quote referral',
  provider: { '@id': `${INSURANCE_HUB_URL}#organization` },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  description:
    'Compare licensed insurance agencies by state, specialty, and customer reviews. Research auto, home, life, and business insurance options.',
  url: INSURANCE_HUB_URL,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Independent insurance agency research directory',
  },
};

export function buildInsuranceAgencySchema(provider: Provider) {
  const providerUrl = hubCanonicalUrl('insurance', `/providers/${provider.slug}`);

  return {
    '@type': 'InsuranceAgency',
    '@id': `${providerUrl}#agency`,
    name: provider.name,
    url: provider.website ?? providerUrl,
    description: provider.short_description ?? provider.description,
    telephone: provider.phone ?? undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: provider.city,
      addressRegion: provider.state,
      postalCode: provider.zip ?? undefined,
      addressCountry: 'US',
    },
    aggregateRating: provider.review_count > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: provider.rating,
          reviewCount: provider.review_count,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    areaServed: {
      '@type': 'State',
      name: provider.state,
    },
  };
}

export function buildLocalBusinessSchema(provider: Provider) {
  const providerUrl = hubCanonicalUrl('insurance', `/providers/${provider.slug}`);

  return {
    '@type': 'LocalBusiness',
    '@id': `${providerUrl}#localbusiness`,
    name: provider.name,
    image: provider.logo ?? trustHubLogoUrl(),
    url: provider.website ?? providerUrl,
    telephone: provider.phone ?? undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: provider.city,
      addressRegion: provider.state,
      postalCode: provider.zip ?? undefined,
      addressCountry: 'US',
    },
    priceRange: '$$',
  };
}

export function buildHomepageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, websiteSchema, homepageServiceSchema],
  };
}