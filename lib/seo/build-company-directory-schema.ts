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
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Move Trust Hub',
      url: SITE_URL,
    },
  };

  const sameAs: string[] = [];
  if (company.website) sameAs.push(company.website);
  if (sameAs.length === 1) moverNode.sameAs = sameAs[0];
  else if (sameAs.length > 1) moverNode.sameAs = sameAs;

  if (company.phone?.trim()) {
    moverNode.telephone = company.phone.trim();
  }

  if (company.physicalAddress?.trim() || company.headquarters) {
    moverNode.address = {
      '@type': 'PostalAddress',
      ...(company.physicalAddress?.trim()
        ? { streetAddress: company.physicalAddress.trim() }
        : {}),
      ...(company.headquarters
        ? { addressLocality: company.headquarters }
        : {}),
      addressCountry: 'US',
    };
  }

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

  // Never invent AggregateRating / Review here — community ratings live on /company/[slug]
  // with moderated Supabase reviews only (see buildAggregateRatingSchema).

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