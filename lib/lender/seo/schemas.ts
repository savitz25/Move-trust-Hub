import { hubCanonicalUrl } from '@/lib/hub/paths';
import type { EnrichedLender } from '@/lib/lender/enrichment/merge';

export function buildLenderFinancialServiceSchema(lender: EnrichedLender) {
  const pageUrl = hubCanonicalUrl('lender', `/lenders/${lender.slug}`);

  return {
    '@type': ['FinancialService', 'LocalBusiness'],
    '@id': `${pageUrl}#lender`,
    name: lender.name,
    url: lender.website ?? pageUrl,
    description: lender.shortDescription,
    telephone: lender.phone ?? undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: lender.city,
      addressRegion: lender.state,
      addressCountry: 'US',
    },
    identifier: {
      '@type': 'PropertyValue',
      name: 'NMLS ID',
      value: lender.nmlsId,
    },
    aggregateRating:
      lender.reviewCount > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: lender.rating,
            reviewCount: lender.reviewCount,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${lender.county} County, ${lender.state}`,
    },
  };
}