import { trustHubLogoUrl } from '@/lib/hub/config';
import { CALCULATORS, CALC_DISCLAIMER } from '@/lib/lender/calculators/registry';

const SITE = 'https://www.movetrusthub.com/lender';
const PAGE = `${SITE}/calculators`;

export function calculatorsPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE}#webpage`,
        url: PAGE,
        name: 'Mortgage Calculators That Help You Make Better Decisions',
        description:
          'Free interactive mortgage calculators with live PITI, affordability, refinance, and verified lender matching. Zero paid placements.',
        isPartOf: { '@id': `${SITE}/#website` },
        breadcrumb: { '@id': `${PAGE}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Lender Trust Hub',
            item: SITE,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Calculators',
            item: PAGE,
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: SITE,
        name: 'Lender Trust Hub',
        publisher: { '@id': `${SITE}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE}/#organization`,
        name: 'Lender Trust Hub',
        url: SITE,
        logo: trustHubLogoUrl(),
        description: 'Independent NMLS-verified mortgage lender directory. Zero paid placements.',
        sameAs: ['https://www.movetrusthub.com'],
      },
      {
        '@type': 'WebApplication',
        '@id': `${PAGE}#app`,
        name: 'Lender Trust Hub Mortgage Calculators',
        url: PAGE,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description:
          'Interactive mortgage payment (PITI), affordability, refinance, amortization, and comparison tools with optional match to NMLS-verified lenders.',
        provider: { '@id': `${SITE}/#organization` },
        featureList: CALCULATORS.map((c) => c.title),
      },
      ...CALCULATORS.map((c) => ({
        '@type': 'SoftwareApplication',
        name: c.seoTitle,
        description: c.seoDescription,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        provider: { '@id': `${SITE}/#organization` },
        url: `${PAGE}#${c.id}`,
      })),
      {
        '@type': 'FAQPage',
        '@id': `${PAGE}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are Lender Trust Hub calculators free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. All calculators are free, require no sign-up, and provide educational estimates only.',
            },
          },
          {
            '@type': 'Question',
            name: 'How accurate are the mortgage calculator estimates?',
            acceptedAnswer: { '@type': 'Answer', text: CALC_DISCLAIMER },
          },
          {
            '@type': 'Question',
            name: 'What is PITI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'PITI means Principal, Interest, Taxes, and Insurance. The flagship calculator also includes PMI when LTV exceeds 80% and optional HOA dues.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does Match Me to Lenders work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'After calculating your payment or affordability, Match Me filters our NMLS-verified directory by loan type, credit tier, and your estimated loan profile. We never accept paid placements.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do calculators include PMI and property taxes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Mortgage Payment calculator includes full PITI with state-average property tax presets, homeowners insurance, HOA, and auto-calculated PMI when LTV exceeds 80%.',
            },
          },
        ],
      },
    ],
  };
}
