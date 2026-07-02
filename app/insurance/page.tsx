import type { Metadata } from 'next';
import { InsuranceHomePage } from '@/components/hub/insurance-home';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { hubCanonicalUrl } from '@/lib/hub/paths';

export const dynamic = 'force-static';

export const metadata: Metadata = buildHubMetadata('insurance', {
  title: 'Insurance Trust Hub • Trusted Local Agents | Move Trust Hub',
  description:
    'Compare DOI-verified insurance agents and agencies. Health insurance hubs, ACA and Medicare calculators, and zero paid placements on Move Trust Hub.',
  path: '/',
  keywords: [
    'insurance agents',
    'health insurance',
    'DOI verified',
    'ACA marketplace',
    'Medicare agents',
    'insurance directory',
  ],
});

export default function InsuranceHubHomePage() {
  const canonical = hubCanonicalUrl('insurance', '/');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Insurance Trust Hub',
            url: canonical,
            publisher: {
              '@type': 'Organization',
              name: 'Move Trust Hub',
              url: 'https://www.movetrusthub.com',
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: `${canonical}/hubs/browse?zip={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <InsuranceHomePage />
    </>
  );
}