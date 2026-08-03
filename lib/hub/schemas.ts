import { SITE_EMAIL } from '@/lib/contact';
import { getHubConfig, insuranceHubLogoUrl, trustHubLogoUrl } from '@/lib/hub/config';
import { INSURANCE_SITE_URL, MOVE_SITE_URL } from '@/lib/hub/domains';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import { SITE_URL } from '@/lib/seo/site-metadata';

/**
 * Optional network parent for lender (and historical multi-hub graph).
 * Description stays finance/moving only — never name InsuranceTrustHub as a Move entity.
 */
export const CONSUMER_TRUST_HUB_ORG = {
  '@type': 'Organization' as const,
  '@id': `${MOVE_SITE_URL}/#consumer-trust-hub-network`,
  name: 'ConsumerTrust Hub',
  url: MOVE_SITE_URL,
  description:
    'Network of independent consumer research directories. No lead fees, no paid placements.',
};

/** MoveTrustHub organization — primary entity on Move pages. */
const MOVE_ORG = {
  '@type': 'Organization' as const,
  '@id': `${SITE_URL}/#organization`,
  name: 'Move Trust Hub',
  url: SITE_URL,
  logo: trustHubLogoUrl(SITE_URL),
  email: SITE_EMAIL,
  description:
    'Independent directory for researching FMCSA-licensed interstate and local moving companies in the United States. No lead fees, no paid placements.',
};

export function buildHubOrganizationSchema(hub: HubId) {
  const config = getHubConfig(hub);
  const hubUrl = hubCanonicalUrl(hub, '/');
  const logo =
    hub === 'insurance'
      ? insuranceHubLogoUrl(INSURANCE_SITE_URL)
      : trustHubLogoUrl(SITE_URL);

  return {
    '@type': 'Organization',
    '@id': `${hubUrl}#organization`,
    name: config.siteName,
    url: hubUrl,
    logo,
    // InsuranceTrustHub is standalone. Move org has no parent. Lender may cite network.
    ...(hub === 'lender'
      ? { parentOrganization: { '@id': CONSUMER_TRUST_HUB_ORG['@id'] } }
      : {}),
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

/** Root schema for insurancetrusthub.com only — never include Move network nodes. */
export function buildInsuranceStandaloneRootSchema() {
  const org = buildHubOrganizationSchema('insurance');
  const website = buildHubWebsiteSchema('insurance');
  return {
    '@context': 'https://schema.org',
    '@graph': [org, website],
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
    // Lender may reference network parent; insurance stays fully independent
    ...(hub === 'lender'
      ? {
          isPartOf: { '@id': CONSUMER_TRUST_HUB_ORG['@id'] },
        }
      : {}),
    inLanguage: 'en-US',
    ...(options?.searchTarget
      ? { potentialAction: buildWebsiteSearchAction(options.searchTarget) }
      : {}),
  };
}

/**
 * Root layout for Move host — Move Trust Hub Organization + WebSite only.
 * Do not emit InsuranceTrustHub (or network parent naming insurance) as a primary entity.
 * Hub-specific graphs live on lender/insurance routes / ITH host.
 */
export function buildTrustHubNetworkSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
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

  // Lender includes network parent; insurance is standalone Organization only.
  const graph: Record<string, unknown>[] =
    hub === 'lender' ? [CONSUMER_TRUST_HUB_ORG, org, website] : [org, website];

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