import { SITE_URL } from '@/lib/seo/site-metadata';
import type { Company } from '@/types';

/**
 * ItemList + CollectionPage schema for the movers directory.
 * Surfaces a bounded top-N list. Never serialize the full provider universe.
 */
export function buildCompaniesDirectorySchemaGraph(
  companies: Company[],
  options: { limit?: number; total?: number } = {}
) {
  const limit = options.limit ?? 24;
  const total = options.total ?? companies.length;
  const pageUrl = `${SITE_URL}/companies`;
  const top = [...companies]
    .sort((a, b) => (b.reputationScore ?? 0) - (a.reputationScore ?? 0))
    .slice(0, limit);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        name: 'Directory of Interstate Moving Companies 2026',
        description:
          'Search FMCSA-verified interstate movers with active operating authority. Independent directory with no paid placements.',
        url: pageUrl,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@type': 'Thing', name: 'Interstate moving companies' },
        numberOfItems: total,
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#itemlist`,
        name: 'Top FMCSA-Licensed Interstate Movers',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: top.length,
        itemListElement: top.map((company, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: company.name,
          url: `${SITE_URL}/companies/${company.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Moving Companies', item: pageUrl },
        ],
      },
    ],
  };
}
