import type { PublicReview } from '@/lib/reviews/queries';

const MIN_REVIEWS_FOR_AGGREGATE = 1;

export function buildAggregateRatingSchema(params: {
  companyName: string;
  slug: string;
  avgRating: number;
  reviewCount: number;
  reviews?: PublicReview[];
}) {
  const { companyName, slug, avgRating, reviewCount, reviews = [] } = params;
  const canonical = `https://www.movetrusthub.com/company/${slug}`;
  const canEmitAggregate =
    reviewCount >= MIN_REVIEWS_FOR_AGGREGATE && avgRating > 0 && reviews.length > 0;

  const business: Record<string, unknown> = {
    '@type': ['MovingCompany', 'LocalBusiness'],
    '@id': `${canonical}#company`,
    name: companyName,
    url: canonical,
    publisher: {
      '@type': 'Organization',
      name: 'Move Trust Hub',
      url: 'https://www.movetrusthub.com',
    },
  };

  if (canEmitAggregate) {
    business.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: reviewCount,
    };
    business.review = reviews.slice(0, 5).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.reviewer_name },
      datePublished: r.created_at.split('T')[0],
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: '5',
        worstRating: '1',
      },
      name: r.title || undefined,
      reviewBody: r.content,
    }));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: `${companyName} — Moderated Customer Reviews`,
        url: canonical,
        about: { '@id': `${canonical}#company` },
      },
      business,
    ],
  };
}