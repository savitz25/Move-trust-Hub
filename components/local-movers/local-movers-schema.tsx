import { JsonLd } from '@/lib/seo/json-ld';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

const SITE_URL = 'https://www.movetrusthub.com';

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function LocalMoversSchema({
  title,
  description,
  path,
  breadcrumbs,
  movers,
  county,
  stateName,
}: {
  title: string;
  description: string;
  path: string;
  breadcrumbs: BreadcrumbItem[];
  movers?: LocalMover[];
  county?: LocalCounty;
  stateName?: string;
}) {
  const url = `${SITE_URL}${path}`;

  const localBusinesses = (movers ?? []).map((mover, index) => ({
    '@type': 'LocalBusiness',
    '@id': `${url}#mover-${mover.id}`,
    name: mover.name,
    description: mover.shortDescription,
    url: mover.profileSlug
      ? `${SITE_URL}/companies/${mover.profileSlug}`
      : url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: mover.city,
      addressRegion: county?.stateCode ?? undefined,
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(mover.rating),
      reviewCount: String(mover.reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    ...(mover.usdotNumber
      ? { identifier: { '@type': 'PropertyValue', name: 'USDOT', value: mover.usdotNumber } }
      : {}),
    areaServed: county
      ? {
          '@type': 'AdministrativeArea',
          name: `${county.name} County, ${stateName}`,
        }
      : undefined,
    position: index + 1,
  }));

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((crumb, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: crumb.name,
              item: `${SITE_URL}${crumb.path}`,
            })),
          },
          {
            '@type': 'CollectionPage',
            name: title,
            description,
            url,
            isPartOf: {
              '@type': 'WebSite',
              name: 'Move Trust Hub',
              url: SITE_URL,
            },
          },
          ...localBusinesses,
        ],
      }}
    />
  );
}