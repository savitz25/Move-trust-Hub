import { JsonLd } from '@/lib/seo/json-ld';
import {
  CALIFORNIA_COUNTY_CONTENT_UPDATED,
  FLORIDA_COUNTY_CONTENT_UPDATED,
  NEW_JERSEY_COUNTY_CONTENT_UPDATED,
  NEW_YORK_COUNTY_CONTENT_UPDATED,
  TEXAS_COUNTY_CONTENT_UPDATED,
  GEORGIA_COUNTY_CONTENT_UPDATED,
  SOUTH_CAROLINA_COUNTY_CONTENT_UPDATED,
  NORTH_CAROLINA_COUNTY_CONTENT_UPDATED,
} from '@/components/local-movers/county-editorial-trust';
import { getGeorgiaCountyResearch } from '@/data/georgia-county-research';
import { getSouthCarolinaCountyResearch } from '@/data/south-carolina-county-research';
import { getNorthCarolinaCountyResearch } from '@/data/north-carolina-county-research';
import type { CountyFaqItem, CountyTestimonial } from '@/lib/local-movers/county-seo';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

const SITE_URL = 'https://www.movetrusthub.com';
const ORG_ID = `${SITE_URL}/#organization`;
const CONTENT_PUBLISHED = '2026-01-15';

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

function buildMoverUrl(mover: LocalMover, pageUrl: string): string {
  if (mover.profileSlug) return `${SITE_URL}/companies/${mover.profileSlug}`;
  if (mover.website) return mover.website;
  return pageUrl;
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
  testimonials,
}: {
  title: string;
  description: string;
  path: string;
  breadcrumbs: BreadcrumbItem[];
  movers?: LocalMover[];
  county?: LocalCounty;
  stateName?: string;
  faqItems?: CountyFaqItem[];
  testimonials?: CountyTestimonial[];
}) {
  const url = `${SITE_URL}${path}`;
  const placeId = `${url}#place`;

  const contentModified =
    county?.stateSlug === 'california'
      ? CALIFORNIA_COUNTY_CONTENT_UPDATED
      : county?.stateSlug === 'florida'
        ? FLORIDA_COUNTY_CONTENT_UPDATED
        : county?.stateSlug === 'new-jersey'
          ? NEW_JERSEY_COUNTY_CONTENT_UPDATED
          : county?.stateSlug === 'new-york'
            ? NEW_YORK_COUNTY_CONTENT_UPDATED
            : county?.stateSlug === 'texas'
              ? TEXAS_COUNTY_CONTENT_UPDATED
              : county?.stateSlug === 'georgia' &&
                  getGeorgiaCountyResearch(county.slug)
                ? GEORGIA_COUNTY_CONTENT_UPDATED
                : county?.stateSlug === 'south-carolina' &&
                    getSouthCarolinaCountyResearch(county.slug)
                  ? SOUTH_CAROLINA_COUNTY_CONTENT_UPDATED
                  : county?.stateSlug === 'north-carolina' &&
                      getNorthCarolinaCountyResearch(county.slug)
                    ? NORTH_CAROLINA_COUNTY_CONTENT_UPDATED
                    : new Date().toISOString().slice(0, 10);

  const movingCompanies = (movers ?? []).map((mover, index) => ({
    '@type': ['MovingCompany', 'LocalBusiness'],
    '@id': `${url}#mover-${mover.id}`,
    name: mover.name,
    description: mover.shortDescription,
    url: buildMoverUrl(mover, url),
    ...(mover.website ? { sameAs: mover.website } : {}),
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
    ...(mover.bbbRating
      ? {
          award: `BBB ${mover.bbbRating}`,
        }
      : {}),
    ...(mover.usdotNumber
      ? {
          identifier: {
            '@type': 'PropertyValue',
            name: 'USDOT',
            value: mover.usdotNumber,
          },
        }
      : {}),
    ...(mover.mcNumber
      ? {
          additionalProperty: {
            '@type': 'PropertyValue',
            name: 'MC Number',
            value: mover.mcNumber,
          },
        }
      : {}),
    ...(mover.services.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${mover.name} Services`,
            itemListElement: mover.services.map((service) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service,
              },
            })),
          },
        }
      : {}),
    areaServed: county
      ? { '@id': placeId }
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
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Move Trust Hub',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: ['https://www.fmcsa.dot.gov/'],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumbs`,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })),
    },
    {
      '@type': 'WebPage',
      '@id': url,
      name: title,
      description,
      url,
      inLanguage: 'en-US',
      datePublished: CONTENT_PUBLISHED,
      dateModified: contentModified,
      author: {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Move Trust Hub Editorial Team',
      },
      publisher: { '@id': ORG_ID },
      isPartOf: {
        '@type': 'WebSite',
        name: 'Move Trust Hub',
        url: SITE_URL,
        publisher: { '@id': ORG_ID },
      },
      breadcrumb: { '@id': `${url}#breadcrumbs` },
      ...(county && stateName
        ? { about: { '@id': placeId } }
        : {}),
      ...(faqItems?.length ? { mainEntity: { '@id': `${url}#faq` } } : {}),
    },
  ];

  if (county && stateName) {
    graph.push({
      '@type': 'AdministrativeArea',
      '@id': placeId,
      name: `${county.name} County, ${stateName}`,
      ...(county.seat
        ? {
            containsPlace: {
              '@type': 'City',
              name: county.seat,
              containedInPlace: {
                '@type': 'State',
                name: stateName,
                addressRegion: county.stateCode,
              },
            },
          }
        : {}),
      containedInPlace: {
        '@type': 'State',
        name: stateName,
        addressRegion: county.stateCode,
      },
    });
  }

  if (movingCompanies.length > 0) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#movers`,
      name: county
        ? `Top Local Movers in ${county.name} County`
        : `Local Movers in ${stateName ?? 'the United States'}`,
      numberOfItems: movingCompanies.length,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: movingCompanies.map((company, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@id': company['@id'] },
      })),
    });
    graph.push(...movingCompanies);
  }

  if (faqItems?.length) {
    graph.push(buildFaqSchema(faqItems, `${url}#faq`));
  }

  if (testimonials?.length) {
    graph.push(
      ...testimonials.map((testimonial, index) => ({
        '@type': 'Review',
        '@id': `${url}#review-${index + 1}`,
        reviewBody: testimonial.quote,
        author: {
          '@type': 'Person',
          name: testimonial.name,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(testimonial.rating),
          bestRating: '5',
          worstRating: '1',
        },
        itemReviewed: county
          ? { '@id': placeId }
          : { '@type': 'WebPage', '@id': url },
        ...(testimonial.moveType
          ? { name: `${testimonial.moveType} move — ${testimonial.location}` }
          : {}),
      }))
    );
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