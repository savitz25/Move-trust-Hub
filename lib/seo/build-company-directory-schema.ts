import { organizationSchema } from '@/lib/seo/schemas';
import { SITE_URL } from '@/lib/seo/site-metadata';
import { parseHeadquarters } from '@/lib/local-movers/parse-headquarters';
import { resolveCompanyTypeBadgesFromCompany } from '@/lib/companies/type-badges';
import type { Company } from '@/types';

/**
 * Directory company profile schema — FMCSA identifiers, no fabricated AggregateRating.
 * Community ratings live on /company/[slug] with moderated Supabase reviews only.
 * Google/BBB snapshots are never emitted as Review / AggregateRating.
 */
export function buildCompanyDirectorySchemaGraph(company: Company) {
  const canonical = `${SITE_URL}/companies/${company.slug}`;
  const publicName = (company.name || '').replace(/\s+/g, ' ').trim() || 'Moving company';
  const typeBadges = resolveCompanyTypeBadgesFromCompany(company);
  const isBrokerOnly = typeBadges.some((b) => b.id === 'broker') &&
    !typeBadges.some((b) => b.id === 'carrier' || b.id === 'carrier-broker');
  const isCarrierBroker = typeBadges.some((b) => b.id === 'carrier-broker');

  // Brokers arrange transportation — do not mark as MovingCompany alone.
  const entityTypes = isBrokerOnly
    ? (['Organization', 'ProfessionalService'] as const)
    : (['LocalBusiness', 'MovingCompany'] as const);

  const baseDescription =
    company.shortDescription?.trim() ||
    company.description?.trim() ||
    `${publicName} research profile on Move Trust Hub.`;

  const roleNote = isBrokerOnly
    ? ' Household goods broker — arranges transportation with motor carriers; does not itself operate as the hauling carrier unless carrier authority is also held.'
    : isCarrierBroker
      ? ' Holds both motor carrier and broker authority — confirm in writing who will physically transport the shipment.'
      : '';

  const hq = parseHeadquarters(company.headquarters);
  const additionalProperty: Array<Record<string, unknown>> = [];

  if (company.mcNumber?.trim()) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'MC Number',
      value: company.mcNumber.trim(),
    });
  }

  if (typeBadges[0]) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Entity type (research label)',
      value: typeBadges.map((b) => b.label).join('; '),
    });
  }

  // Reputation score as a named property — never AggregateRating
  if ((company.reputationScore ?? 0) > 0) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Move Trust Hub Reputation Score',
      value: String(company.reputationScore),
      description:
        'Editorial composite 0–100 from public licensing and listing signals — not a star rating and not Google/BBB AggregateRating.',
    });
  }

  const moverNode: Record<string, unknown> = {
    '@type': [...entityTypes],
    '@id': `${canonical}#company`,
    name: publicName,
    url: canonical,
    description: `${baseDescription}${roleNote}`.trim(),
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Move Trust Hub',
      url: SITE_URL,
    },
  };

  if (company.fmcsaLegalName?.trim() && company.fmcsaLegalName.trim() !== publicName) {
    moverNode.legalName = company.fmcsaLegalName.trim();
  }

  const sameAs: string[] = [];
  if (company.website?.trim()) sameAs.push(company.website.trim());
  if (sameAs.length === 1) moverNode.sameAs = sameAs[0];
  else if (sameAs.length > 1) moverNode.sameAs = sameAs;

  if (company.phone?.trim()) {
    moverNode.telephone = company.phone.trim();
  }

  if (company.physicalAddress?.trim() || hq.city || company.headquarters?.trim()) {
    moverNode.address = {
      '@type': 'PostalAddress',
      ...(company.physicalAddress?.trim()
        ? { streetAddress: company.physicalAddress.trim() }
        : {}),
      ...(hq.city ? { addressLocality: hq.city } : {}),
      ...(hq.stateCode ? { addressRegion: hq.stateCode } : {}),
      addressCountry: 'US',
    };
  }

  if (company.usdotNumber?.trim()) {
    moverNode.identifier = {
      '@type': 'PropertyValue',
      name: 'USDOT',
      value: company.usdotNumber.trim(),
    };
  }

  if (additionalProperty.length === 1) {
    moverNode.additionalProperty = additionalProperty[0];
  } else if (additionalProperty.length > 1) {
    moverNode.additionalProperty = additionalProperty;
  }

  // Never invent AggregateRating / Review from Google/BBB/editorial snapshots.
  delete moverNode.areaServed;
  delete moverNode.containedInPlace;
  delete moverNode.containsPlace;
  delete moverNode.aggregateRating;
  delete moverNode.review;

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
        name: `${publicName} — FMCSA research profile`,
        url: canonical,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${canonical}#company` },
        description: moverNode.description,
      },
      moverNode,
    ],
  };
}
