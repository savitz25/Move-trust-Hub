import type { CountyFaqItem, CountyTestimonial } from '@/lib/local-movers/county-seo';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';
import { moverHasSchemaAggregateRating } from '@/lib/trust/verified-reviews';

const COUNTY_SUFFIX_PATTERN = /\s(county|parish|borough)$/i;

/**
 * Canonical display label for a county (e.g. "Travis County", "Miami-Dade County").
 * Avoids duplicating "County" when the name already includes it.
 */
export function buildCountyLabel(county: LocalCounty): string {
  if (COUNTY_SUFFIX_PATTERN.test(county.name) || /\sCity$/i.test(county.name)) {
    return county.name;
  }
  if (county.stateSlug === 'louisiana') {
    return `${county.name} Parish`;
  }
  if (county.stateSlug === 'district-of-columbia') {
    return county.name;
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
  iowa: {
    dallas: 'Waukee',
    story: 'Ames',
  },
  wisconsin: {
    brown: 'Green Bay',
    washington: 'West Bend',
    dodge: 'Juneau',
    wood: 'Wisconsin Rapids',
    grant: 'Lancaster',
    monroe: 'Sparta',
    portage: 'Stevens Point',
    columbia: 'Portage',
    calumet: 'Chilton',
    'st-croix': 'Hudson',
    chippewa: 'Chippewa Falls',
    sauk: 'Baraboo',
    walworth: 'Elkhorn',
    ozaukee: 'Port Washington',
    'fond-du-lac': 'Fond du Lac',
    'la-crosse': 'La Crosse',
    'eau-claire': 'Eau Claire',
    green: 'Monroe',
    iowa: 'Dodgeville',
    dunn: 'Menomonie',
    pierce: 'Ellsworth',
    douglas: 'Superior',
    door: 'Sturgeon Bay',
    oneida: 'Rhinelander',
    vilas: 'Eagle River',
    jackson: 'Black River Falls',
    juneau: 'Mauston',
    waushara: 'Wautoma',
    polk: 'Balsam Lake',
    trempealeau: 'Whitehall',
    lincoln: 'Merrill',
    adams: 'Friendship',
    barron: 'Barron',
    marinette: 'Marinette',
    shawano: 'Shawano',
    oconto: 'Oconto',
    kewaunee: 'Kewaunee',
    taylor: 'Medford',
    langlade: 'Antigo',
    'green-lake': 'Green Lake',
    sawyer: 'Hayward',
    lafayette: 'Darlington',
    burnett: 'Grantsburg',
    washburn: 'Shell Lake',
    richland: 'Richland Center',
    bayfield: 'Washburn',
    ashland: 'Ashland',
    marquette: 'Montello',
    crawford: 'Prairie du Chien',
    rusk: 'Ladysmith',
    price: 'Phillips',
    buffalo: 'Alma',
    forest: 'Crandon',
    pepin: 'Durand',
    iron: 'Hurley',
    florence: 'Florence',
    menominee: 'Keshena',
    clark: 'Neillsville',
    vernon: 'Viroqua',
  },
  minnesota: {
    dakota: 'Lakeville',
    ramsey: 'Saint Paul',
    'blue-earth': 'Mankato',
    mcleod: 'Hutchinson',
    carlton: 'Cloquet',
    nicollet: 'St. Peter',
    faribault: 'Blue Earth',
    dodge: 'Mantorville',
    lyon: 'Marshall',
    brown: 'New Ulm',
    marshall: 'Warren',
    'lac-qui-parle': 'Madison',
    'red-lake': 'Red Lake Falls',
    'yellow-medicine': 'Granite Falls',
    'big-stone': 'Ortonville',
    'lake-of-the-woods': 'Baudette',
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

/**
 * @deprecated County-level pseudo LocalBusiness is NOT a valid Review.itemReviewed target.
 * Reviews must reference a real MovingCompany / LocalBusiness (the mover being reviewed).
 * Kept only for any residual callers; prefer buildMoverItemReviewed.
 */
export function buildLocalMovingServiceName(
  county: LocalCounty | undefined,
  stateName: string | undefined
): string {
  if (county && stateName) {
    return `Movers Serving ${buildCountyLabel(county)}, ${stateName}`;
  }
  return 'Local Moving Services';
}

/** @deprecated Do not use as Review.itemReviewed — Google rejects place-like stand-ins. */
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

export function buildMoverSchemaId(pageUrl: string, moverId: string): string {
  return `${pageUrl}#mover-${moverId}`;
}

/** Resolve the mover a county testimonial is about (companySlug / companyName / profile). */
export function resolveReviewedMover(
  testimonial: CountyTestimonial,
  movers: LocalMover[] = []
): LocalMover | undefined {
  const slug = testimonial.companySlug?.trim().toLowerCase();
  if (slug) {
    const bySlug = movers.find(
      (m) =>
        m.profileSlug?.toLowerCase() === slug ||
        m.id.toLowerCase() === slug ||
        m.id.toLowerCase() === `directory-${slug}`
    );
    if (bySlug) return bySlug;
  }

  const companyName = testimonial.companyName?.trim().toLowerCase();
  if (companyName) {
    const byName = movers.find((m) => m.name.trim().toLowerCase() === companyName);
    if (byName) return byName;
  }

  return undefined;
}

/**
 * Valid Review.itemReviewed for Google rich results: MovingCompany + LocalBusiness
 * for the specific mover being reviewed — never AdministrativeArea / county place.
 */
export function buildMoverItemReviewed(
  mover: LocalMover,
  pageUrl: string,
  county: LocalCounty | undefined,
  stateName: string | undefined,
  placeId: string | undefined,
  buildMoverUrl: (mover: LocalMover, pageUrl: string) => string
): Record<string, unknown> {
  const name = mover.name.trim();
  const item: Record<string, unknown> = {
    '@type': ['MovingCompany', 'LocalBusiness'],
    '@id': buildMoverSchemaId(pageUrl, mover.id),
    name,
    url: buildMoverUrl(mover, pageUrl),
  };

  const locality = mover.city?.trim();
  if (locality || county?.stateCode) {
    item.address = {
      '@type': 'PostalAddress',
      ...(locality ? { addressLocality: locality } : {}),
      ...(county?.stateCode ? { addressRegion: county.stateCode } : {}),
      addressCountry: 'US',
    };
  }

  if (county && stateName && placeId) {
    item.areaServed = {
      '@type': 'AdministrativeArea',
      '@id': placeId,
      name: buildCountyPlaceName(county, stateName),
    };
  }

  return item;
}

/**
 * @deprecated Prefer buildMoverItemReviewed — county pseudo-business is invalid for Review snippets.
 */
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
  return `FAQ: Movers serving ${countyLabel}`;
}

export function buildMoversItemListName(
  county: LocalCounty | undefined,
  stateName: string | undefined
): string {
  if (county) {
    return `Movers Serving ${buildCountyLabel(county)}`;
  }
  return `Movers Serving ${stateName ?? 'the United States'}`;
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
    '@id': buildMoverSchemaId(pageUrl, mover.id),
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

  if (moverHasSchemaAggregateRating(mover) && mover.rating > 0 && mover.reviewCount > 0) {
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
  datePublished?: string,
  movers: LocalMover[] = [],
  buildMoverUrl: (mover: LocalMover, pageUrl: string) => string = defaultBuildMoverUrl
): Record<string, unknown> | null {
  const authorName = testimonial.name?.trim();
  const reviewBody = testimonial.quote?.trim();
  if (!authorName || !reviewBody) return null;

  // Google Review rich results require itemReviewed to be a real business (or product/service),
  // never AdministrativeArea / Place. Only emit reviews we can attribute to a listed mover.
  const mover = resolveReviewedMover(testimonial, movers);
  if (!mover?.name?.trim()) return null;

  const itemReviewed = buildMoverItemReviewed(
    mover,
    pageUrl,
    county,
    stateName,
    placeId,
    buildMoverUrl
  );

  const node: Record<string, unknown> = {
    '@type': 'Review',
    '@id': `${pageUrl}#review-${index + 1}`,
    name: buildReviewSchemaName(testimonial),
    reviewBody,
    datePublished: testimonial.date ?? datePublished ?? undefined,
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

  if (testimonial.source) {
    node.publisher = {
      '@type': 'Organization',
      name: testimonial.source,
    };
  }

  return node;
}

function defaultBuildMoverUrl(mover: LocalMover, pageUrl: string): string {
  if (mover.profileSlug) {
    return `https://www.movetrusthub.com/companies/${mover.profileSlug}`;
  }
  return `${pageUrl}#mover-${mover.id}`;
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

  const moverIds = new Set<string>();
  const moverNames = new Set<string>();
  for (const node of graph) {
    const types = nodeTypes(node);
    const nodeId = String(node['@id'] ?? '');
    if (
      (types.includes('MovingCompany') || types.includes('LocalBusiness')) &&
      nodeId.includes('#mover-')
    ) {
      moverIds.add(nodeId);
      if (node.name) moverNames.add(String(node.name));
    }
  }

  let reviewCount = 0;

  for (const node of graph) {
    const types = nodeTypes(node);
    const nodeId = String(node['@id'] ?? 'no @id');

    // Pseudo county LocalBusiness must never appear as Review.itemReviewed
    if (nodeId.endsWith(LOCAL_MOVING_SERVICE_FRAGMENT)) {
      issues.push({
        ...base,
        issue: `Deprecated local-moving-service node present (${nodeId}); Reviews must target real movers`,
      });
    }

    for (const type of types) {
      // Reviews use a human title; AdministrativeArea/WebPage already checked elsewhere
      if (SCHEMA_REQUIRED_TYPES.has(type) && type !== 'Review' && !node.name) {
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
        }

        const reviewedType = itemReviewed['@type'];
        const reviewedTypes = Array.isArray(reviewedType)
          ? reviewedType.map(String)
          : reviewedType
            ? [String(reviewedType)]
            : [];

        // Explicit ban — root GSC error
        if (
          reviewedTypes.includes('AdministrativeArea') ||
          reviewedTypes.includes('Place') ||
          reviewedTypes.includes('City') ||
          reviewedTypes.includes('State') ||
          reviewedTypes.includes('Country')
        ) {
          issues.push({
            ...base,
            issue: `Review itemReviewed must not be a place type (got "${reviewedTypes.join(', ')}") (${reviewId})`,
          });
        }

        const hasBusinessType =
          reviewedTypes.includes('LocalBusiness') ||
          reviewedTypes.includes('MovingCompany') ||
          reviewedTypes.includes('Organization');
        if (!hasBusinessType) {
          issues.push({
            ...base,
            issue: `Review itemReviewed must have @type LocalBusiness or MovingCompany, got "${reviewedTypes.join(', ') || 'none'}" (${reviewId})`,
          });
        }

        const reviewedId = String(itemReviewed['@id'] ?? '');
        if (!reviewedId) {
          issues.push({
            ...base,
            issue: `Review itemReviewed missing @id (${reviewId})`,
          });
        } else if (reviewedId.endsWith(LOCAL_MOVING_SERVICE_FRAGMENT)) {
          issues.push({
            ...base,
            issue: `Review itemReviewed must reference a mover, not #local-moving-service (${reviewId})`,
          });
        } else if (pageUrl && !reviewedId.includes('#mover-') && moverIds.size > 0) {
          issues.push({
            ...base,
            issue: `Review itemReviewed @id should be a #mover-* node, got "${reviewedId}" (${reviewId})`,
          });
        } else if (moverIds.size > 0 && !moverIds.has(reviewedId)) {
          issues.push({
            ...base,
            issue: `Review itemReviewed @id "${reviewedId}" has no matching MovingCompany node (${reviewId})`,
          });
        }

        if (
          itemReviewed.name &&
          moverNames.size > 0 &&
          !moverNames.has(String(itemReviewed.name))
        ) {
          // Soft signal — name should match a listed mover
          issues.push({
            ...base,
            issue: `Review itemReviewed.name "${String(itemReviewed.name)}" does not match a listed mover (${reviewId})`,
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

  // Ensure every Review is backed by at least one real mover business node
  if (reviewCount > 0 && moverIds.size === 0) {
    issues.push({
      ...base,
      issue: `Graph has ${reviewCount} Review node(s) but no MovingCompany/LocalBusiness mover nodes`,
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