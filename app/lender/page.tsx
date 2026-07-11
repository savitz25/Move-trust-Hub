import type { Metadata } from 'next';
import { LenderHomePage } from '@/components/hub/lender-home';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { getHubConfig } from '@/lib/hub/config';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import { buildHubHomeSchemaGraph } from '@/lib/hub/schemas';

export const dynamic = 'force-static';

const lenderConfig = getHubConfig('lender');

export const metadata: Metadata = buildHubMetadata('lender', {
  title: lenderConfig.homeTitle,
  description: lenderConfig.homeDescription,
  path: '/',
  keywords: [
    'mortgage lenders',
    'NMLS verified lenders',
    'local mortgage brokers',
    'county lender directory',
    'mortgage calculator',
    'FDIC insured banks',
  ],
});

const LENDER_HOME_FAQ = [
  {
    question: 'How does Lender Trust Hub verify mortgage lenders?',
    answer:
      'We cross-reference NMLS Consumer Access licensing, CFPB complaint data, BBB accreditation, and attributed customer reviews. Listings are never sold or paid for.',
  },
  {
    question: 'Can I find lenders in my county?',
    answer:
      'Yes. Enter your ZIP code to auto-detect your county and view ranked local lenders with county-specific experience scores and loan-type specialties.',
  },
];

export default function LenderHubHomePage() {
  const canonical = hubCanonicalUrl('lender', '/');
  const schema = buildHubHomeSchemaGraph('lender', LENDER_HOME_FAQ);
  schema['@graph'].push({
    '@type': 'SearchAction',
    target: `${canonical}?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  });

  return (
    <>
      <SchemaInjector data={schema} />
      <LenderHomePage />
    </>
  );
}