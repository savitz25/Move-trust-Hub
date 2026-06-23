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
import {
  buildCountyLabel,
  buildCountyPlaceSchema,
  buildFaqSchema,
  buildMoverSchemaNode,
  buildMoversItemListName,
  buildReviewSchemaNode,
} from '@/lib/local-movers/schema-helpers';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

const SITE_URL = 'https://www.movetrusthub.com';
const ORG_ID = `${SITE_URL}/#organization`;
const CONTENT_PUBLISHED = '2026-01-15';

type BreadcrumbItem = {
  name: string;
  path: string;
};

function buildMoverUrl(mover: LocalMover, pageUrl: string): string {
  if (mover.profileSlug) return `${SITE_URL}/companies/${mover.profileSlug}`;
  if (mover.website) return mover.website;
  return pageUrl;
}

function resolveContentModified(county: LocalCounty): string {
  if (county.stateSlug === 'california') return CALIFORNIA_COUNTY_CONTENT_UPDATED;
  if (county.stateSlug === 'florida') return FLORIDA_COUNTY_CONTENT_UPDATED;
  if (county.stateSlug === 'new-jersey') return NEW_JERSEY_COUNTY_CONTENT_UPDATED;
  if (county.stateSlug === 'new-york') return NEW_YORK_COUNTY_CONTENT_UPDATED;
  if (county.stateSlug === 'texas') return TEXAS_COUNTY_CONTENT_UPDATED;
  if (county.stateSlug === 'georgia' && getGeorgiaCountyResearch(county.slug)) {
    return GEORGIA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'south-carolina' &&
    getSouthCarolinaCountyResearch(county.slug)
  ) {
    return SOUTH_CAROLINA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'north-carolina' &&
    getNorthCarolinaCountyResearch(county.slug)
  ) {
    return NORTH_CAROLINA_COUNTY_CONTENT_UPDATED;
  }
  return new Date().toISOString().slice(0, 10);
}

export function buildCountySchemaGraph({
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
}): Record<string, unknown>[] {
  const url = `${SITE_URL}${path}`;
  const placeId = `${url}#place`;
  const countyLabel = county ? buildCountyLabel(county) : undefined;
  const contentModified = county ? resolveContentModified(county) : CONTENT_PUBLISHED;

  const movingCompanies = (movers ?? [])
    .map((mover, index) =>
      buildMoverSchemaNode(
        mover,
        index,
        url,
        county,
        stateName,
        placeId,
        buildMoverUrl
      )
    )
    .filter((node): node is Record<string, unknown> => node !== null);

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
      name: 'Breadcrumb',
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
      ...(county && stateName ? { about: { '@id': placeId } } : {}),
      ...(faqItems?.length ? { mainEntity: { '@id': `${url}#faq` } } : {}),
    },
  ];

  if (county && stateName) {
    graph.push(buildCountyPlaceSchema(county, stateName, placeId));
  }

  if (movingCompanies.length > 0) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#movers`,
      name: buildMoversItemListName(county, stateName),
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

  if (faqItems?.length && countyLabel) {
    graph.push(buildFaqSchema(faqItems, `${url}#faq`, countyLabel));
  }

  if (testimonials?.length) {
    graph.push(
      ...testimonials
        .map((testimonial, index) =>
          buildReviewSchemaNode(
            testimonial,
            index,
            url,
            county,
            stateName,
            placeId
          )
        )
        .filter((node): node is Record<string, unknown> => node !== null)
    );
  }

  return graph;
}