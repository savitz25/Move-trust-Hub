import { SITE_EMAIL } from '@/lib/contact';
import { getHubConfig, trustHubLogoUrl } from '@/lib/hub/config';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import { SITE_URL } from '@/lib/seo/site-metadata';

const PARENT_ORG = {
  '@type': 'Organization' as const,
  '@id': `${SITE_URL}/#organization`,
  name: 'Move Trust Hub',
  url: SITE_URL,
  logo: trustHubLogoUrl(SITE_URL),
  email: SITE_EMAIL,
  description:
    'Independent Trust Hub network for verified movers, mortgage lenders, and insurance agents in the United States.',
};

export function buildHubOrganizationSchema(hub: HubId) {
  const config = getHubConfig(hub);
  const hubUrl = hubCanonicalUrl(hub, '/');

  return {
    '@type': 'Organization',
    '@id': `${hubUrl}#organization`,
    name: config.siteName,
    url: hubUrl,
    logo: `${SITE_URL}${config.logoSrc}`,
    parentOrganization: { '@id': PARENT_ORG['@id'] },
    description: config.tagline,
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_EMAIL,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  };
}

export function buildHubWebsiteSchema(hub: HubId) {
  const config = getHubConfig(hub);
  const hubUrl = hubCanonicalUrl(hub, '/');

  return {
    '@type': 'WebSite',
    '@id': `${hubUrl}#website`,
    name: config.siteName,
    url: hubUrl,
    publisher: { '@id': `${hubUrl}#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en-US',
  };
}

export function buildTrustHubNetworkSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      PARENT_ORG,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Move Trust Hub',
        url: SITE_URL,
        publisher: { '@id': PARENT_ORG['@id'] },
        inLanguage: 'en-US',
      },
      ...(['lender', 'insurance'] as const).map((hub) => [
        buildHubOrganizationSchema(hub),
        buildHubWebsiteSchema(hub),
      ]).flat(),
    ],
  };
}

export function buildHubHomeSchemaGraph(hub: HubId, faqItems?: { question: string; answer: string }[]) {
  const config = getHubConfig(hub);
  const hubUrl = hubCanonicalUrl(hub, '/');
  const org = buildHubOrganizationSchema(hub);
  const website = buildHubWebsiteSchema(hub);

  const graph: Record<string, unknown>[] = [org, website];

  if (hub === 'move') {
    graph.push({
      '@type': 'Service',
      '@id': `${hubUrl}#service`,
      name: 'Interstate Moving Company Directory',
      serviceType: 'Moving company comparison and mover research',
      provider: { '@id': org['@id'] },
      areaServed: { '@type': 'Country', name: 'United States' },
      url: hubUrl,
    });
  }

  if (hub === 'lender') {
    graph.push({
      '@type': 'Service',
      '@id': `${hubUrl}#service`,
      name: 'Mortgage Lender Directory',
      serviceType: 'NMLS-verified mortgage lender comparison',
      provider: { '@id': org['@id'] },
      areaServed: { '@type': 'Country', name: 'United States' },
      url: hubUrl,
    });
  }

  if (hub === 'insurance') {
    graph.push({
      '@type': 'Service',
      '@id': `${hubUrl}#service`,
      name: 'Insurance Agent Directory',
      serviceType: 'DOI-verified insurance agent comparison',
      provider: { '@id': org['@id'] },
      areaServed: { '@type': 'Country', name: 'United States' },
      url: hubUrl,
    });
  }

  if (faqItems?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${hubUrl}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
    name: config.siteName,
  };
}

export function buildBreadcrumbSchema(
  hub: HubId,
  items: { name: string; path: string }[]
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: hubCanonicalUrl(hub, item.path),
    })),
  };
}