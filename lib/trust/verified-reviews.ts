import { getCompanyBySlug, seedCompanies } from '@/data/seed-companies';
import { getReviewsForCompany, seedReviews } from '@/data/seed-reviews';
import { CURATED_LISTING_POLICY } from '@/lib/trust/curated-listing-policy';
import type { CountyTestimonial } from '@/lib/local-movers/county-seo';
import type { LocalMover } from '@/lib/local-movers/types';
import type { Review } from '@/types';

export type AttributableReview = CountyTestimonial & {
  reviewId: string;
  source: string;
  date: string;
  companyName?: string;
  companySlug?: string;
};

const SLUG_TO_COMPANY_ID: Record<string, string> = Object.fromEntries(
  seedCompanies.map((c) => [c.slug, c.id])
);

export function companyIdFromProfileSlug(profileSlug: string): string | undefined {
  return SLUG_TO_COMPANY_ID[profileSlug] ?? getCompanyBySlug(profileSlug)?.id;
}

export function isAttributableReview(review: Review): boolean {
  if (!review.verified) return false;
  return (CURATED_LISTING_POLICY.attributableReviewSources as readonly string[]).includes(
    review.source
  );
}

export function toAttributableReview(review: Review, companyName?: string): AttributableReview {
  return {
    reviewId: review.id,
    quote: review.content,
    name: review.author,
    location: review.location ?? 'United States',
    rating: review.rating,
    source: review.source,
    date: review.date,
    companyName,
  };
}

export function getAttributableReviewsForCompany(
  companyId: string,
  limit = 3
): AttributableReview[] {
  const company = seedCompanies.find((c) => c.id === companyId);
  return getReviewsForCompany(companyId, limit * 2)
    .filter(isAttributableReview)
    .slice(0, limit)
    .map((r) => toAttributableReview(r, company?.name));
}

export function getAttributableReviewsForMover(mover: LocalMover, limit = 3): AttributableReview[] {
  if (!mover.profileSlug) return [];
  const companyId = companyIdFromProfileSlug(mover.profileSlug);
  if (!companyId) return [];
  return getAttributableReviewsForCompany(companyId, limit);
}

/** Pull 1–3 recent attributable Google reviews from directory-linked county movers. */
export function buildAttributableCountyReviews(
  movers: LocalMover[],
  maxReviews = 3
): AttributableReview[] {
  const reviews: AttributableReview[] = [];
  const seen = new Set<string>();

  for (const mover of movers) {
    if (!mover.profileSlug) continue;
    for (const review of getAttributableReviewsForMover(mover, 2)) {
      if (seen.has(review.reviewId)) continue;
      seen.add(review.reviewId);
      reviews.push({
        ...review,
        companyName: review.companyName ?? mover.name,
        companySlug: mover.profileSlug,
      });
      if (reviews.length >= maxReviews) return reviews;
    }
  }

  return reviews.sort((a, b) => b.date.localeCompare(a.date)).slice(0, maxReviews);
}

export function hasAttributableCountyReviews(movers: LocalMover[]): boolean {
  return buildAttributableCountyReviews(movers, 1).length > 0;
}

export function countAttributableReviews(): number {
  return seedReviews.filter(isAttributableReview).length;
}

export function getHomepageAttributableReviews(limit = 4): AttributableReview[] {
  return seedReviews
    .filter(isAttributableReview)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
    .map((r) => {
      const company = seedCompanies.find((c) => c.id === r.companyId);
      return {
        ...toAttributableReview(r, company?.name),
        companyName: company?.name,
        companySlug: company?.slug,
      };
    });
}

/** Mover may emit AggregateRating schema only when directory-linked with attributable reviews. */
export function moverHasSchemaAggregateRating(mover: LocalMover): boolean {
  if (!mover.profileSlug) return false;
  const companyId = companyIdFromProfileSlug(mover.profileSlug);
  if (!companyId) return false;
  return getAttributableReviewsForCompany(companyId, 1).length > 0;
}