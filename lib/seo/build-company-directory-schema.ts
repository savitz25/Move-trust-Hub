import { organizationSchema } from '@/lib/seo/schemas';
import { SITE_URL } from '@/lib/seo/site-metadata';
import type { Company } from '@/types';

/**
 * Directory company profile schema — FMCSA identifiers, no fabricated AggregateRating.
 * Community ratings live on /company/[slug] with moderated Supabase reviews only.
 */
export function buildCompanyDirectorySchemaGraph(company: Company) {
  const canonical = `${SITE_URL}/companies/${company.slug}`;

  const moverNode: Record<string, unknown> = {
    '@type': ['MovingCompany', 'LocalBusiness'],
    '@id': `${canonical}#company`,
    name: company.name,
    url: canonical,
    description: company.shortDescription || company.description,
    ...(company.website ? { sameAs: company.website } : {}),
    ...(company.headquarters
      ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: company.headquarters,
            addressCountry: 'US',
          },
        }
      : {}),
  };

  if (company.usdotNumber) {
    moverNode.identifier = {
      '@type': 'PropertyValue',
      name: 'USDOT',
      value: company.usdotNumber,
    };
  }

  if (company.mcNumber) {
    moverNode.additionalProperty = {
      '@type': 'PropertyValue',
      name: 'MC Number',
      value: company.mcNumber,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Moving Companies',
            item: `${SITE_URL}/companies`,
          },
          { '@type': 'ListItem', position: 3, name: company.name, item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: `${company.name} — Reviews, Pricing & FMCSA Info`,
        url: canonical,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${canonical}#company` },
      },
      moverNode,
    ],
  };
}