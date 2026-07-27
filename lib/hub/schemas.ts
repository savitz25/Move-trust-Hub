import { SITE_EMAIL } from '@/lib/contact';
import { getHubConfig, trustHubLogoUrl } from '@/lib/hub/config';
import { INSURANCE_SITE_URL, MOVE_SITE_URL } from '@/lib/hub/domains';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import { SITE_URL } from '@/lib/seo/site-metadata';

/** Network parent for specialist hubs (insurance, later lender). */
export const CONSUMER_TRUST_HUB_ORG = {
  '@type': 'Organization' as const,
  '@id': `${MOVE_SITE_URL}/#consumer-trust-hub-network`,
  name: 'ConsumerTrust Hub',
  url: MOVE_SITE_URL,
  description:
    'Network of independent consumer research directories for moving, lending, and insurance. No lead fees, no paid placements.',
};

/** MoveTrustHub organization — used on move pages and as network anchor. */
const MOVE_ORG = {
  '@type': 'Organization' as const,
  '@id': `${SITE_URL}/#organization`,
  name: 'Move Trust Hub',
  url: SITE_URL,
  logo: trustHubLogoUrl(SITE_URL),
  email: SITE_EMAIL,
  description:
    'Independent directory for researching FMCSA-licensed interstate and local moving companies in the United States. No lead fees, no paid placements.',
  parentOrganization: { '@id': CONSUMER_TRUST_HUB_ORG['@id'] },
};

export function buildHubOrganizationSchema(hub: HubId) {
  const config = getHubConfig(hub);
  const hubUrl = hubCanonicalUrl(hub, '/');
  const logoBase = hub === 'insurance' ? INSURANCE_SITE_URL : SITE_URL;

  return {
    '@type': 'Organization',
    '@id': `${hubUrl}#organization`,
    name: config.siteName,
    url: hubUrl,
    logo: `${logoBase}${config.logoSrc.split('?')[0]}`,
    parentOrganization: { '@id': CONSUMER_TRUST_HUB_ORG['@id'] },
    description: config.tagline,
    contactPoint: {
      '@type': 'ContactPoint',
      email: hub === 'insurance' ? 'hello@insurancetrusthub.com' : SITE_EMAIL,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  };
}

export function buildWebsiteSearchAction(target: string) {
  return {
    '@type': 'SearchAction',
    target,
    'query-input': 'required name=search_term_string',
  };
}

export function buildHubWebsiteSchema(
  hub: HubId,
  options?: { searchTarget?: string }
) {
  const config = getHubConfig(hub);
  const hubUrl = hubCanonicalUrl(hub, '/');

  return {
    '@type': 'WebSite',
    '@id': `${hubUrl}#website`,
    name: config.siteName,
    url: hubUrl,
    publisher: { '@id': `${hubUrl}#organization` },
    ...(hub === 'move'
      ? {}
      : {
          isPartOf: { '@id': CONSUMER_TRUST_HUB_ORG['@id'] },
        }),
    inLanguage: 'en-US',
    ...(options?.searchTarget
      ? { potentialAction: buildWebsiteSearchAction(options.searchTarget) }
      : {}),
  };
}

/**
 * Root layout only — network parent + Move site.
 * Hub-specific Organization/WebSite live on lender/insurance home graphs
 * (avoids shipping cross-hub JSON-LD on every page).
 */
export function buildTrustHubNetworkSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      CONSUMER_TRUST_HUB_ORG,
      MOVE_ORG,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Move Trust Hub',
        url: SITE_URL,
        publisher: { '@id': MOVE_ORG['@id'] },
        inLanguage: 'en-US',
      },
    ],
  };
}

export function buildHubHomeSchemaGraph(
  hub: HubId,
  faqItems?: { question: string; answer: string }[],
  options?: { searchTarget?: string }
) {
  const config = getHubConfig(hub);
  const hubUrl = hubCanonicalUrl(hub, '/');
  const org = buildHubOrganizationSchema(hub);
  const website = buildHubWebsiteSchema(hub, options);

  // Specialist hubs include the network parent node for parentOrganization resolution.
  const graph: Record<string, unknown>[] =
    hub === 'move' ? [org, website] : [CONSUMER_TRUST_HUB_ORG, org, website];

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