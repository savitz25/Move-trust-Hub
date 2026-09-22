import type { PublicReview } from '@/lib/reviews/queries';
import { SITE_URL } from '@/lib/seo/site-metadata';

// MOVE-PROFILE-V3-001E: schema.org AggregateRating is intentionally NEVER emitted
// from this builder, regardless of review count (1, 2, 10, or more). The prior
// `MIN_REVIEWS_FOR_AGGREGATE = 1` threshold produced false-precision aggregate
// ratings (e.g. a public "5.0★" company-wide score) off a single community
// review. Founder has not approved a statistical minimum-review methodology for
// a company-level aggregate. Fail closed until one is explicitly documented —
// do NOT reintroduce a threshold (2, 3, 5, 10, ...) without that approval.
// Individual `Review` nodes (see buildNestedReviewNode / nestedReviews below)
// are unaffected: those map 1:1 to real hosted reviews and remain legitimate
// structured data on their own.

export type AggregateRatingSchemaParams = {
  companyName: string;
  slug: string;
  avgRating: number;
  reviewCount: number;
  reviews?: PublicReview[];
  /** Optional postal-style fields for LocalBusiness address */
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  phone?: string | null;
  website?: string | null;
};

/**
 * Build a Google-valid Review.itemReviewed node.
 * Prefer LocalBusiness (allow-listed) with MovingCompany as additionalType —
 * bare MovingCompany alone is rejected by GSC for Review snippets.
 * Never use AdministrativeArea / Place as itemReviewed.
 * Never nest areaServed / Place types here (GSC treats that as invalid itemReviewed).
 */
export function buildCompanyReviewItemReviewed(params: {
  companyName: string;
  slug: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  phone?: string | null;
  website?: string | null;
}): Record<string, unknown> {
  const name = params.companyName.replace(/\s+/g, ' ').trim();
  const canonical = `${SITE_URL}/company/${params.slug}`;
  const item: Record<string, unknown> = {
    // LocalBusiness first — Google Review allow-list; MovingCompany alone fails GSC.
    '@type': 'LocalBusiness',
    additionalType: 'https://schema.org/MovingCompany',
    '@id': `${canonical}#company`,
    name,
    url: canonical,
  };

  const street = params.address?.trim();
  const city = params.city?.trim();
  const region = params.state?.trim();
  const postal = params.zip?.trim();
  if (street || city || region || postal) {
    item.address = {
      '@type': 'PostalAddress',
      ...(street ? { streetAddress: street } : {}),
      ...(city ? { addressLocality: city } : {}),
      ...(region ? { addressRegion: region } : {}),
      ...(postal ? { postalCode: postal } : {}),
      addressCountry: 'US',
    };
  }

  if (params.phone?.trim()) {
    item.telephone = params.phone.trim();
  }
  if (params.website?.trim()) {
    item.sameAs = params.website.trim();
  }

  // Hard ban: place-like nesting must never appear under itemReviewed.
  delete item.areaServed;
  delete item.containedInPlace;
  delete item.containsPlace;

  return item;
}

function buildPersonAuthor(rawName: string | null | undefined): Record<string, unknown> | null {
  const name = (rawName || '').replace(/\s+/g, ' ').trim();
  if (!name || !/[\p{L}\p{N}]/u.test(name)) return null;
  return { '@type': 'Person', name };
}

function buildNestedReviewNode(
  review: PublicReview,
  itemReviewed: Record<string, unknown>
): Record<string, unknown> | null {
  const body = (review.content || '').trim();
  if (!body) return null;

  const ratingValue = Number(review.rating);
  if (!Number.isFinite(ratingValue) || ratingValue < 1 || ratingValue > 5) return null;

  const author = buildPersonAuthor(review.reviewer_name) ?? {
    '@type': 'Person',
    name: 'Verified customer',
  };

  // Clone itemReviewed without place nesting — never rely on bare @id expansion alone.
  const reviewed: Record<string, unknown> = {
    '@type': 'LocalBusiness',
    additionalType: 'https://schema.org/MovingCompany',
    '@id': itemReviewed['@id'],
    name: itemReviewed.name,
    url: itemReviewed.url,
  };
  if (itemReviewed.address) reviewed.address = itemReviewed.address;
  if (itemReviewed.telephone) reviewed.telephone = itemReviewed.telephone;

  const node: Record<string, unknown> = {
    '@type': 'Review',
    author,
    datePublished: review.created_at?.split('T')[0] || undefined,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(ratingValue),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: body,
    itemReviewed: reviewed,
  };
  if (review.title?.trim()) node.name = review.title.trim();
  return node;
}

export function buildAggregateRatingSchema(params: AggregateRatingSchemaParams) {
  const {
    companyName,
    slug,
    // avgRating / reviewCount are intentionally NOT used to compute a
    // schema.org AggregateRating here — see the module-level comment. They
    // stay in the params type for caller compatibility (and in case a future,
    // Founder-approved aggregation methodology needs them), but this builder
    // must never derive a company-wide rating from them.
    reviews = [],
    address,
    city,
    state,
    zip,
    phone,
    website,
  } = params;
  const canonical = `${SITE_URL}/company/${slug}`;
  const safeName = companyName.replace(/\s+/g, ' ').trim() || 'Moving company';

  const itemReviewedBase = buildCompanyReviewItemReviewed({
    companyName: safeName,
    slug,
    address,
    city,
    state,
    zip,
    phone,
    website,
  });

  // LocalBusiness first so @id resolution of Review.itemReviewed stays allow-listed.
  const business: Record<string, unknown> = {
    '@type': ['LocalBusiness', 'MovingCompany'],
    '@id': `${canonical}#company`,
    name: safeName,
    url: canonical,
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Move Trust Hub',
      url: SITE_URL,
    },
  };

  if (itemReviewedBase.address) business.address = itemReviewedBase.address;
  if (itemReviewedBase.telephone) business.telephone = itemReviewedBase.telephone;
  if (itemReviewedBase.sameAs) business.sameAs = itemReviewedBase.sameAs;

  // Never attach AdministrativeArea / Place to the business node Google may expand
  // as itemReviewed via @id.
  delete business.areaServed;
  delete business.containedInPlace;
  delete business.containsPlace;

  const nestedReviews = reviews
    .slice(0, 5)
    .map((r) => buildNestedReviewNode(r, itemReviewedBase))
    .filter((n): n is Record<string, unknown> => n !== null);

  // MOVE-PROFILE-V3-001E: business.aggregateRating is permanently disabled — see
  // the module-level comment above. We still attach the individual Review nodes
  // (business.review) whenever real reviews exist; that's legitimate per-review
  // structured data, decoupled from any company-wide aggregate claim.
  if (nestedReviews.length > 0) {
    business.review = nestedReviews;
  }

  // Standalone Review nodes (full itemReviewed) help Rich Results Test / GSC
  // without relying on nested expansion alone.
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Move Trust Hub',
      url: SITE_URL,
    },
    {
      '@type': 'WebPage',
      '@id': canonical,
      name: `${safeName} — Moderated Customer Reviews`,
      url: canonical,
      about: { '@id': `${canonical}#company` },
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    business,
  ];

  for (const [index, review] of nestedReviews.entries()) {
    graph.push({
      ...review,
      '@id': `${canonical}#review-${index + 1}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
