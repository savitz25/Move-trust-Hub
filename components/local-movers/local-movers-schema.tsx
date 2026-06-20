import { JsonLd } from '@/lib/seo/json-ld';
import type { CountyFaqItem } from '@/lib/local-movers/county-seo';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

const SITE_URL = 'https://www.movetrusthub.com';

type BreadcrumbItem = {
  name: string;
  path: string;
};

function buildFaqSchema(items: CountyFaqItem[], id: string) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function LocalMoversSchema({
  title,
  description,
  path,
  breadcrumbs,
  movers,
  county,
  stateName,
  faqItems,
}: {
  title: string;
  description: string;
  path: string;
  breadcrumbs: BreadcrumbItem[];
  movers?: LocalMover[];
  county?: LocalCounty;
  stateName?: string;
  faqItems?: CountyFaqItem[];
}) {
  const url = `${SITE_URL}${path}`;

  const movingCompanies = (movers ?? []).map((mover, index) => ({
    '@type': 'MovingCompany',
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
      ? {
          identifier: {
            '@type': 'PropertyValue',
            name: 'USDOT',
            value: mover.usdotNumber,
          },
        }
      : {}),
    ...(mover.services.length
      ? { makesOffer: mover.services.map((service) => ({ '@type': 'Offer', itemOffered: service })) }
      : {}),
    areaServed: county
      ? {
          '@type': 'AdministrativeArea',
          name: `${county.name} County, ${stateName}`,
        }
      : stateName
        ? {
            '@type': 'State',
            name: stateName,
          }
        : undefined,
    position: index + 1,
  }));

  const graph: Record<string, unknown>[] = [
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
    ...movingCompanies,
  ];

  if (faqItems?.length) {
    graph.push(buildFaqSchema(faqItems, `${url}#faq`));
  }

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': graph,
      }}
    />
  );
}