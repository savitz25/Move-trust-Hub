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
    question: 'How does InsuranceTrustHub verify agents?',
    answer:
      'We verify state Department of Insurance licensing, NAIC records, and attributed reviews. Agents are listed for research only — we never accept paid placements or pay-to-rank fees.',
  },
  {
    question: 'Do you cover health insurance and Medicare?',
    answer:
      'Yes. Our market health hubs highlight ACA marketplace navigators, Medicare Advantage specialists, and employer-plan advisors in high-enrollment metros — plus free tools like the ACA subsidy calculator and Medicare research guide.',
  },
  {
    question: 'Is InsuranceTrustHub independent?',
    answer:
      'Yes. InsuranceTrustHub is an independent insurance agent directory. We do not accept paid placements or pay-to-rank fees, and we are not affiliated with listed agencies or carriers.',
  },
];

export default function InsuranceHubHomePage() {
  const schema = buildHubHomeSchemaGraph('insurance', INSURANCE_HOME_FAQ, {
    searchTarget: `${hubCanonicalUrl('insurance', '/directory')}?q={search_term_string}`,
  });

  return (
    <>
      <SchemaInjector data={schema} />
      <InsuranceHomePage />
    </>
  );
}