import type { StateMeta } from '@/lib/lender/fdic/types';
import { lenderCanonical, LENDER_HUB_URL } from '@/lib/lender/canonical';
import { AUTO_CATEGORY } from '@/lib/lender/directory/categories';

const SITE_URL = LENDER_HUB_URL;
const AUTO_HUB_URL = lenderCanonical('/auto-loan-companies');
import type { AutoLoanProvider } from './types';
import { getStateAutoStats } from './stateProviders';

const YEAR = AUTO_CATEGORY.year;

export function autoStatePath(slug: string): string {
  return AUTO_CATEGORY.statePath(slug);
}

export function autoStateUrl(slug: string): string {
  return lenderCanonical(`/auto-loan-companies/${slug}`);
}

export function buildAutoStateTitle(stateName: string, count: number): string {
  return `Auto Loan Companies in ${stateName} (${YEAR})`;
}

export function buildAutoStateDescription(
  stateName: string,
  count: number,
  verified: number,
  avgAprLow: number
): string {
  return `Compare ${count} auto loan companies in ${stateName}. ${verified} verified lenders. APRs from ${avgAprLow}%+. New, used, refinance & bad credit options. No paid placements.`;
}

export function buildAutoHubTitle(): string {
  return `Auto Loan Companies by State (${YEAR})`;
}

export function buildAutoHubDescription(total: number): string {
  return `Find ${total}+ verified auto loan companies nationwide. Compare APR ranges, trust scores, and loan types by state. Free directory — no paid placements.`;
}

export function buildAutoStateJsonLd(
  stateMeta: StateMeta,
  providers: AutoLoanProvider[]
): Record<string, unknown> {
  const stats = getStateAutoStats(stateMeta.slug);
  const pageUrl = autoStateUrl(stateMeta.slug);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Lender Trust Hub',
        url: SITE_URL,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Auto Loan Companies',
            item: `${AUTO_HUB_URL}`,
          },
          { '@type': 'ListItem', position: 3, name: stateMeta.fullName, item: pageUrl },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        name: buildAutoStateTitle(stateMeta.fullName, stats.total),
        description: buildAutoStateDescription(
          stateMeta.fullName,
          stats.total,
          stats.verified,
          stats.avgAprLow
        ),
        url: pageUrl,
        inLanguage: 'en-US',
      },
      {
        '@type': 'ItemList',
        name: `Auto Loan Companies in ${stateMeta.fullName}`,
        numberOfItems: stats.total,
        itemListElement: providers.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'FinancialService',
            name: p.name,
            url: p.website || `${AUTO_HUB_URL}/${stateMeta.slug}#provider-${p.id}`,
            areaServed: stateMeta.fullName,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: String(p.rating),
              reviewCount: String(p.reviewCount),
            },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the average auto loan APR in ${stateMeta.fullName}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Our directory shows auto loan APRs starting around ${stats.avgAprLow}% from verified lenders in ${stateMeta.fullName}. Rates vary by credit score, loan term, and vehicle type.`,
            },
          },
          {
            '@type': 'Question',
            name: `How many auto loan companies are in ${stateMeta.fullName}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `We list ${stats.total} auto loan companies in ${stateMeta.fullName}, with ${stats.verified} independently verified.`,
            },
          },
        ],
      },
      {
        '@type': 'AggregateOffer',
        name: `Free Auto Loan Directory — ${stateMeta.fullName}`,
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    ],
  };
}

export function buildAutoHubJsonLd(totalProviders: number, stateCount: number) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: buildAutoHubTitle(),
        description: buildAutoHubDescription(totalProviders),
        url: `${AUTO_HUB_URL}`,
      },
      {
        '@type': 'ItemList',
        name: 'Auto Loan Companies by US State',
        numberOfItems: stateCount,
        description: `${totalProviders} verified auto lenders across ${stateCount} states`,
      },
    ],
  };
}