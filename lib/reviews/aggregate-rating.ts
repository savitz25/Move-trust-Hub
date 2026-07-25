import type { PublicReview } from '@/lib/reviews/queries';
import { SITE_URL } from '@/lib/seo/site-metadata';

const MIN_REVIEWS_FOR_AGGREGATE = 1;

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
  const canonical = `${SITE_URL}/company/${params.slug}`;
  const item: Record<string, unknown> = {
    '@type': 'LocalBusiness',
    additionalType: 'https://schema.org/MovingCompany',
    '@id': `${canonical}#company`,
    name: params.companyName.trim(),
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

  return item;
}

export function buildAggregateRatingSchema(params: AggregateRatingSchemaParams) {
  const {
    companyName,
    slug,
    avgRating,
    reviewCount,
    reviews = [],
    address,
    city,
    state,
    zip,
    phone,
    website,
  } = params;
  const canonical = `${SITE_URL}/company/${slug}`;
  const canEmitAggregate =
    reviewCount >= MIN_REVIEWS_FOR_AGGREGATE && avgRating > 0 && reviews.length > 0;

  const itemReviewedBase = buildCompanyReviewItemReviewed({
    companyName,
    slug,
    address,
    city,
    state,
    zip,
    phone,
    website,
  });

  // Primary company node — dual type for directory semantics + Google LocalBusiness.
  const business: Record<string, unknown> = {
    '@type': ['MovingCompany', 'LocalBusiness'],
    '@id': `${canonical}#company`,
    name: companyName,
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

  if (canEmitAggregate) {
    business.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: reviewCount,
    };
    business.review = reviews.slice(0, 5).map((r) => {
      // Each nested Review must carry a full itemReviewed (LocalBusiness) + Person author.
      // Missing itemReviewed is a GSC critical error on company review profiles.
      const authorName = (r.reviewer_name || '').replace(/\s+/g, ' ').trim() || 'Verified customer';
      return {
        '@type': 'Review',
        author: { '@type': 'Person', name: authorName },
        datePublished: r.created_at.split('T')[0],
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: '5',
          worstRating: '1',
        },
        ...(r.title ? { name: r.title } : {}),
        reviewBody: r.content,
        itemReviewed: {
          '@type': 'LocalBusiness',
          additionalType: 'https://schema.org/MovingCompany',
          '@id': `${canonical}#company`,
          name: companyName,
          url: canonical,
        },
      };
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Move Trust Hub',
        url: SITE_URL,
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: `${companyName} — Moderated Customer Reviews`,
        url: canonical,
        about: { '@id': `${canonical}#company` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      business,
    ],
  };
}
