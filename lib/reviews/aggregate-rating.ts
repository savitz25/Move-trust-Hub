import type { PublicReview } from '@/lib/reviews/queries';

export function buildAggregateRatingSchema(params: {
  companyName: string;
  slug: string;
  avgRating: number;
  reviewCount: number;
  reviews?: PublicReview[];
}) {
  const { companyName, slug, avgRating, reviewCount, reviews = [] } = params;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: companyName,
    url: `https://www.movetrusthub.com/company/${slug}`,
  };

  if (reviewCount > 0 && avgRating > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: reviewCount,
    };
  }

  if (reviews.length > 0) {
    schema.review = reviews.slice(0, 5).map((r) => ({
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

  return schema;
}