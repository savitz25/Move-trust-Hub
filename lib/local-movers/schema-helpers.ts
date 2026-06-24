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

/** Types Google accepts for Review.itemReviewed (Review snippet rich results). */
export const REVIEW_ITEM_REVIEWED_TYPES = new Set([
  'LocalBusiness',
  'MovingCompany',
  'Organization',
  'Product',
  'Service',
]);

export const LOCAL_MOVING_SERVICE_FRAGMENT = '#local-moving-service';

export function buildLocalMovingServiceId(pageUrl: string): string {
  return `${pageUrl}${LOCAL_MOVING_SERVICE_FRAGMENT}`;
}

/** Display name for the county-level LocalBusiness that Reviews reference. */
export function buildLocalMovingServiceName(
  county: LocalCounty | undefined,
  stateName: string | undefined
): string {
  if (county && stateName) {
    return `Local Moving Companies in ${buildCountyLabel(county)}, ${stateName}`;
  }
  return 'Local Moving Services';
}

export function buildLocalMovingServiceSchemaNode(
  county: LocalCounty | undefined,
  stateName: string | undefined,
  placeId: string,
  pageUrl: string
): Record<string, unknown> {
  const serviceId = buildLocalMovingServiceId(pageUrl);

  if (county && stateName) {
    const placeName = buildCountyPlaceName(county, stateName);
    return {
      '@type': 'LocalBusiness',
      '@id': serviceId,
      name: buildLocalMovingServiceName(county, stateName),
      description: `Licensed local and regional moving companies serving ${placeName}.`,
      url: pageUrl,
      areaServed: {
        '@type': 'AdministrativeArea',
        '@id': placeId,
        name: placeName,
      },
    };
  }

  return {
    '@type': 'LocalBusiness',
    '@id': serviceId,
    name: buildLocalMovingServiceName(county, stateName),
    url: pageUrl,
  };
}

export function buildSchemaItemReviewed(
  county: LocalCounty | undefined,
  stateName: string | undefined,
  _placeId: string,
  pageUrl: string
): Record<string, unknown> {
  return {
    '@type': 'LocalBusiness',
    '@id': buildLocalMovingServiceId(pageUrl),
    name: buildLocalMovingServiceName(county, stateName),
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
    node.areaServed = { '@id': placeId };
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
  placeId: string,
  datePublished?: string
): Record<string, unknown> | null {
  const authorName = testimonial.name?.trim();
  const reviewBody = testimonial.quote?.trim();
  if (!authorName || !reviewBody) return null;

  const itemReviewed = buildSchemaItemReviewed(county, stateName, placeId, pageUrl);

  return {
    '@type': 'Review',
    '@id': `${pageUrl}#review-${index + 1}`,
    name: buildReviewSchemaName(testimonial),
    reviewBody,
    datePublished: datePublished ?? '2026-01-15',
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
    itemReviewed,
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
function nodeTypes(node: Record<string, unknown>): string[] {
  const rawType = node['@type'];
  return Array.isArray(rawType) ? rawType.map(String) : rawType ? [String(rawType)] : [];
}

function findGraphPageUrl(graph: Record<string, unknown>[]): string | undefined {
  for (const node of graph) {
    if (nodeTypes(node).includes('WebPage') && node.url) {
      return String(node.url);
    }
  }
  return undefined;
}

export function validateCountySchemaGraph(
  graph: Record<string, unknown>[],
  county: LocalCounty,
  stateName?: string
): SchemaValidationIssue[] {
  const issues: SchemaValidationIssue[] = [];
  const base = { stateSlug: county.stateSlug, countySlug: county.slug };
  const pageUrl = findGraphPageUrl(graph);
  const expectedServiceId = pageUrl ? buildLocalMovingServiceId(pageUrl) : undefined;
  const expectedServiceName = buildLocalMovingServiceName(county, stateName);

  let reviewCount = 0;
  let hasLocalMovingServiceNode = false;

  for (const node of graph) {
    const types = nodeTypes(node);
    const nodeId = String(node['@id'] ?? 'no @id');

    if (nodeId.endsWith(LOCAL_MOVING_SERVICE_FRAGMENT)) {
      hasLocalMovingServiceNode = true;
      if (!types.includes('LocalBusiness')) {
        issues.push({
          ...base,
          issue: `local-moving-service node must have @type LocalBusiness (${nodeId})`,
        });
      }
      if (expectedServiceId && nodeId !== expectedServiceId) {
        issues.push({
          ...base,
          issue: `local-moving-service @id must be "${expectedServiceId}", got "${nodeId}"`,
        });
      }
      if (!node.name) {
        issues.push({
          ...base,
          issue: `local-moving-service node missing name (${nodeId})`,
        });
      } else if (node.name !== expectedServiceName) {
        issues.push({
          ...base,
          issue: `local-moving-service name must be "${expectedServiceName}", got "${String(node.name)}"`,
        });
      }
    }

    for (const type of types) {
      if (SCHEMA_REQUIRED_TYPES.has(type) && !node.name) {
        issues.push({
          ...base,
          issue: `${type} node missing required "name" (${nodeId})`,
        });
      }
    }

    if (types.includes('Review')) {
      reviewCount += 1;
      const itemReviewed = node.itemReviewed as Record<string, unknown> | undefined;
      const reviewId = nodeId;

      if (!itemReviewed) {
        issues.push({
          ...base,
          issue: `Review missing itemReviewed (${reviewId})`,
        });
      } else {
        if (!itemReviewed.name) {
          issues.push({
            ...base,
            issue: `Review missing itemReviewed.name (${reviewId})`,
          });
        } else if (itemReviewed.name !== expectedServiceName) {
          issues.push({
            ...base,
            issue: `Review itemReviewed.name must be "${expectedServiceName}", got "${String(itemReviewed.name)}" (${reviewId})`,
          });
        }

        const reviewedType = itemReviewed['@type'];
        const reviewedTypes = Array.isArray(reviewedType)
          ? reviewedType.map(String)
          : reviewedType
            ? [String(reviewedType)]
            : [];

        if (!reviewedTypes.includes('LocalBusiness')) {
          issues.push({
            ...base,
            issue: `Review itemReviewed must have @type LocalBusiness, got "${reviewedTypes.join(', ') || 'none'}" (${reviewId})`,
          });
        }

        const reviewedId = String(itemReviewed['@id'] ?? '');
        if (!reviewedId) {
          issues.push({
            ...base,
            issue: `Review itemReviewed missing @id (${reviewId})`,
          });
        } else if (expectedServiceId && reviewedId !== expectedServiceId) {
          issues.push({
            ...base,
            issue: `Review itemReviewed @id must be "${expectedServiceId}", got "${reviewedId}" (${reviewId})`,
          });
        }
      }

      if (!node.reviewBody) {
        issues.push({
          ...base,
          issue: `Review missing reviewBody (${reviewId})`,
        });
      }

      if (!node.datePublished) {
        issues.push({
          ...base,
          issue: `Review missing datePublished (${reviewId})`,
        });
      }

      const author = node.author as Record<string, unknown> | undefined;
      if (!author?.name) {
        issues.push({
          ...base,
          issue: `Review missing author.name (${reviewId})`,
        });
      }

      const reviewRating = node.reviewRating as Record<string, unknown> | undefined;
      if (!reviewRating?.ratingValue) {
        issues.push({
          ...base,
          issue: `Review missing reviewRating.ratingValue (${reviewId})`,
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

    if (types.includes('LocalBusiness') || types.includes('MovingCompany')) {
      if (node.position !== undefined) {
        issues.push({
          ...base,
          issue: `Mover node must not duplicate ListItem position (${nodeId})`,
        });
      }
    }
  }

  if (reviewCount > 0 && !hasLocalMovingServiceNode) {
    issues.push({
      ...base,
      issue: `Graph has ${reviewCount} Review node(s) but no local-moving-service LocalBusiness node`,
    });
  }

  const moverUrls = new Map<string, string[]>();
  for (const node of graph) {
    const types = nodeTypes(node);
    if (!types.includes('LocalBusiness') && !types.includes('MovingCompany')) continue;
    if (String(node['@id'] ?? '').includes(LOCAL_MOVING_SERVICE_FRAGMENT)) continue;

    const url = String(node.url ?? '');
    if (!url) continue;
    const id = String(node['@id'] ?? 'unknown');
    const existing = moverUrls.get(url) ?? [];
    existing.push(id);
    moverUrls.set(url, existing);
  }

  for (const [url, ids] of moverUrls) {
    if (ids.length > 1) {
      issues.push({
        ...base,
        issue: `Duplicate mover url "${url}" on nodes: ${ids.join(', ')}`,
      });
    }
  }

  return issues;
}