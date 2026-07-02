import type { Metadata } from 'next';
import { LenderHomePage } from '@/components/hub/lender-home';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { hubCanonicalUrl } from '@/lib/hub/paths';

export const dynamic = 'force-static';

export const metadata: Metadata = buildHubMetadata('lender', {
  title: 'Lender Trust Hub • Trusted Local Lenders | Move Trust Hub',
  description:
    'Compare NMLS-verified mortgage lenders and brokers by county. Free mortgage calculators, FDIC bank directory, and zero paid placements on Move Trust Hub.',
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

export default function LenderHubHomePage() {
  const canonical = hubCanonicalUrl('lender', '/');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Lender Trust Hub',
            url: canonical,
            publisher: {
              '@type': 'Organization',
              name: 'Move Trust Hub',
              url: 'https://www.movetrusthub.com',
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: `${canonical}/local-lenders?zip={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <LenderHomePage />
    </>
  );
}