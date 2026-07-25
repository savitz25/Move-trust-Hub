import { organizationSchema } from '@/lib/seo/schemas';
import { SITE_URL } from '@/lib/seo/site-metadata';
import type { Company } from '@/types';

/**
 * Directory company profile schema — FMCSA identifiers, no fabricated AggregateRating.
 * Community ratings live on /company/[slug] with moderated Supabase reviews only.
 */
export function buildCompanyDirectorySchemaGraph(company: Company) {
  const canonical = `${SITE_URL}/companies/${company.slug}`;
  // Prefer public DBA-facing name already resolved onto company.name.
  const publicName = (company.name || '').replace(/\s+/g, ' ').trim() || 'Moving company';

  // LocalBusiness first (Google allow-list); MovingCompany for domain semantics.
  const moverNode: Record<string, unknown> = {
    '@type': ['LocalBusiness', 'MovingCompany'],
    '@id': `${canonical}#company`,
    name: publicName,
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
  if (company.website?.trim()) sameAs.push(company.website.trim());
  if (sameAs.length === 1) moverNode.sameAs = sameAs[0];
  else if (sameAs.length > 1) moverNode.sameAs = sameAs;

  if (company.phone?.trim()) {
    moverNode.telephone = company.phone.trim();
  }

  if (company.physicalAddress?.trim() || company.headquarters?.trim()) {
    moverNode.address = {
      '@type': 'PostalAddress',
      ...(company.physicalAddress?.trim()
        ? { streetAddress: company.physicalAddress.trim() }
        : {}),
      ...(company.headquarters?.trim()
        ? { addressLocality: company.headquarters.trim() }
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
  // Never attach AdministrativeArea / Place nesting (Review expand path safety).
  delete moverNode.areaServed;
  delete moverNode.containedInPlace;
  delete moverNode.containsPlace;

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
          { '@type': 'ListItem', position: 3, name: publicName, item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: `${publicName} — Reviews, Pricing & FMCSA Info`,
        url: canonical,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${canonical}#company` },
      },
      moverNode,
    ],
  };
}
