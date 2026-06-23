import type { CountyFaqItem, CountyTestimonial } from '@/lib/local-movers/county-seo';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

const COUNTY_SUFFIX_PATTERN = /\s(county|parish|borough)$/i;

/**
 * Canonical display label for a county (e.g. "Travis County", "Miami-Dade County").
 * Avoids duplicating "County" when the name already includes it.
 */
export function buildCountyLabel(county: LocalCounty): string {
  if (COUNTY_SUFFIX_PATTERN.test(county.name)) {
    return county.name;
  }
  if (county.stateSlug === 'louisiana') {
    return `${county.name} Parish`;
  }
  return `${county.name} County`;
}

/** Full place name for schema.org AdministrativeArea nodes. */
export function buildCountyPlaceName(county: LocalCounty, stateName: string): string {
  return `${buildCountyLabel(county)}, ${stateName}`;
}

/**
 * Primary city for schema containsPlace — uses county seat with overrides for
 * ambiguous names (e.g. New York County → Manhattan, not "New York").
 */
const SCHEMA_PRIMARY_CITY_OVERRIDES: Record<string, Record<string, string>> = {
  'new-york': {
    'new-york': 'Manhattan',
    bronx: 'Bronx',
    kings: 'Brooklyn',
    queens: 'Queens',
    richmond: 'Staten Island',
  },
  texas: {
    austin: 'Bellville',
  },
};

export function buildSchemaPrimaryCity(county: LocalCounty): string | undefined {
  const override = SCHEMA_PRIMARY_CITY_OVERRIDES[county.stateSlug]?.[county.slug];
  if (override) return override;
  return county.seat;
}

export function buildSchemaItemReviewed(
  county: LocalCounty | undefined,
  stateName: string | undefined,
  placeId: string,
  pageUrl: string
): Record<string, unknown> {
  if (county && stateName) {
    return {
      '@type': 'AdministrativeArea',
      '@id': placeId,
      name: buildCountyPlaceName(county, stateName),
    };
  }
  return {
    '@type': 'WebPage',
    '@id': pageUrl,
    name: 'Local Movers',
  };
}

export function buildSchemaAreaServed(
  county: LocalCounty,
  stateName: string,
  placeId: string
): Record<string, unknown> {
  return {
    '@type': 'AdministrativeArea',
    '@id': placeId,
    name: buildCountyPlaceName(county, stateName),
  };
}

export function buildReviewSchemaName(testimonial: CountyTestimonial): string {
  if (testimonial.moveType) {
    return `${testimonial.moveType} move — ${testimonial.location}`;
  }
  return `Local move review — ${testimonial.location}`;
}

export function buildFaqSchemaName(countyLabel: string): string {
  return `FAQ: Local movers in ${countyLabel}`;
}

export function buildMoversItemListName(
  county: LocalCounty | undefined,
  stateName: string | undefined
): string {
  if (county) {
    return `Top Local Movers in ${buildCountyLabel(county)}`;
  }
  return `Local Movers in ${stateName ?? 'the United States'}`;
}

export function buildCountyPlaceSchema(
  county: LocalCounty,
  stateName: string,
  placeId: string
): Record<string, unknown> {
  const primaryCity = buildSchemaPrimaryCity(county);
  const place: Record<string, unknown> = {
    '@type': 'AdministrativeArea',
    '@id': placeId,
    name: buildCountyPlaceName(county, stateName),
    containedInPlace: {
      '@type': 'State',
      name: stateName,
      addressRegion: county.stateCode,
    },
  };

  if (primaryCity) {
    place.containsPlace = {
      '@type': 'City',
      name: primaryCity,
      containedInPlace: {
        '@type': 'State',
        name: stateName,
        addressRegion: county.stateCode,
      },
    };
  }

  return place;
}

export function buildFaqSchema(
  items: CountyFaqItem[],
  id: string,
  countyLabel: string
): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    '@id': id,
    name: buildFaqSchemaName(countyLabel),
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

export function buildMoverSchemaNode(
  mover: LocalMover,
  index: number,
  pageUrl: string,
  county: LocalCounty | undefined,
  stateName: string | undefined,
  placeId: string,
  buildMoverUrl: (mover: LocalMover, pageUrl: string) => string
): Record<string, unknown> | null {
  const name = mover.name?.trim();
  if (!name) return null;

  const node: Record<string, unknown> = {
    '@type': ['MovingCompany', 'LocalBusiness'],
    '@id': `${pageUrl}#mover-${mover.id}`,
    name,
    url: buildMoverUrl(mover, pageUrl),
    position: index + 1,
  };

  const description = mover.shortDescription?.trim();
  if (description) node.description = description;

  if (mover.website) node.sameAs = mover.website;

  const locality = mover.city?.trim();
  if (locality || county?.stateCode) {
    node.address = {
      '@type': 'PostalAddress',
      ...(locality ? { addressLocality: locality } : {}),
      ...(county?.stateCode ? { addressRegion: county.stateCode } : {}),
      addressCountry: 'US',
    };
  }

  if (mover.rating > 0 && mover.reviewCount > 0) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: String(mover.rating),
      reviewCount: String(mover.reviewCount),
      bestRating: '5',
      worstRating: '1',
    };
  }

  if (mover.bbbRating) {
    node.award = `BBB ${mover.bbbRating}`;
  }

  if (mover.usdotNumber) {
    node.identifier = {
      '@type': 'PropertyValue',
      name: 'USDOT',
      value: mover.usdotNumber,
    };
  }

  if (mover.mcNumber) {
    node.additionalProperty = {
      '@type': 'PropertyValue',
      name: 'MC Number',
      value: mover.mcNumber,
    };
  }

  if (mover.services.length) {
    node.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${name} Services`,
      itemListElement: mover.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
        },
      })),
    };
  }

  if (county && stateName) {
    node.areaServed = buildSchemaAreaServed(county, stateName, placeId);
  } else if (stateName) {
    node.areaServed = {
      '@type': 'State',
      name: stateName,
    };
  }

  return node;
}

export function buildReviewSchemaNode(
  testimonial: CountyTestimonial,
  index: number,
  pageUrl: string,
  county: LocalCounty | undefined,
  stateName: string | undefined,
  placeId: string
): Record<string, unknown> | null {
  const authorName = testimonial.name?.trim();
  const reviewBody = testimonial.quote?.trim();
  if (!authorName || !reviewBody) return null;

  return {
    '@type': 'Review',
    '@id': `${pageUrl}#review-${index + 1}`,
    name: buildReviewSchemaName(testimonial),
    reviewBody,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(testimonial.rating),
      bestRating: '5',
      worstRating: '1',
    },
    itemReviewed: buildSchemaItemReviewed(county, stateName, placeId, pageUrl),
  };
}

/** Recursively remove undefined/null entries so JSON-LD stays valid. */
export function sanitizeSchemaValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeSchemaValue(item))
      .filter((item) => item !== undefined && item !== null) as T;
  }

  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      if (entry === undefined || entry === null) continue;
      const sanitized = sanitizeSchemaValue(entry);
      if (sanitized === undefined || sanitized === null) continue;
      result[key] = sanitized;
    }
    return result as T;
  }

  return value;
}

export type SchemaValidationIssue = {
  stateSlug: string;
  countySlug: string;
  issue: string;
};

const SCHEMA_REQUIRED_TYPES = new Set([
  'WebPage',
  'BreadcrumbList',
  'AdministrativeArea',
  'ItemList',
  'FAQPage',
  'Review',
  'MovingCompany',
  'LocalBusiness',
]);

/**
 * Lightweight validator for county page schema graphs.
 * Used by scripts/validate-county-schema.ts to catch regressions before deploy.
 */
export function validateCountySchemaGraph(
  graph: Record<string, unknown>[],
  county: LocalCounty
): SchemaValidationIssue[] {
  const issues: SchemaValidationIssue[] = [];
  const base = { stateSlug: county.stateSlug, countySlug: county.slug };

  for (const node of graph) {
    const rawType = node['@type'];
    const types = Array.isArray(rawType) ? rawType : rawType ? [rawType] : [];

    for (const type of types) {
      if (typeof type !== 'string') continue;
      if (SCHEMA_REQUIRED_TYPES.has(type) && !node.name) {
        issues.push({
          ...base,
          issue: `${type} node missing required "name" (${String(node['@id'] ?? 'no @id')})`,
        });
      }
    }

    if (types.includes('Review')) {
      const itemReviewed = node.itemReviewed as Record<string, unknown> | undefined;
      if (!itemReviewed?.name) {
        issues.push({
          ...base,
          issue: `Review missing itemReviewed.name (${String(node['@id'] ?? 'no @id')})`,
        });
      }
    }

    if (types.includes('AdministrativeArea')) {
      const expected = buildCountyLabel(county);
      const name = String(node.name ?? '');
      if (!name.includes(expected)) {
        issues.push({
          ...base,
          issue: `AdministrativeArea name "${name}" does not include "${expected}"`,
        });
      }
    }
  }

  return issues;
}