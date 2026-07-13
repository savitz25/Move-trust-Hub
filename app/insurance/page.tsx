import type { Metadata } from 'next';
import { InsuranceHomePage } from '@/components/hub/insurance-home';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { getHubConfig } from '@/lib/hub/config';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import { buildHubHomeSchemaGraph } from '@/lib/hub/schemas';

export const dynamic = 'force-static';

const insuranceConfig = getHubConfig('insurance');

export const metadata: Metadata = buildHubMetadata('insurance', {
  title: insuranceConfig.homeTitle,
  description: insuranceConfig.homeDescription,
  path: '/',
});

const INSURANCE_HOME_FAQ = [
  {
    question: 'How does Insurance Trust Hub verify agents?',
    answer:
      'We verify state Department of Insurance licensing, NAIC records, and attributed reviews. Agents are listed for research only — we never accept paid placements.',
  },
  {
    question: 'Do you cover health insurance and Medicare?',
    answer:
      'Yes. Our 54 market health hubs highlight ACA marketplace navigators, Medicare Advantage specialists, and employer-plan advisors in high-enrollment metros.',
  },
];

export default function InsuranceHubHomePage() {
  const schema = buildHubHomeSchemaGraph('insurance', INSURANCE_HOME_FAQ, {
    searchTarget: `${hubCanonicalUrl('insurance', '/')}/hubs/browse?zip={search_term_string}`,
  });

  return (
    <>
      <SchemaInjector data={schema} />
      <InsuranceHomePage />
    </>
  );
}