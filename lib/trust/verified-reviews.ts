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

export type CountyReviewBlock = {
  reviews: AttributableReview[];
  hasLocalSource: boolean;
  title: string;
  summary: string;
};

/**
 * Pull attributable Google reviews from directory-linked movers on this list.
 * Prefer local/in-state movers; if only national carriers contribute, title honestly.
 */
export function buildCountyReviewBlock(
  movers: LocalMover[],
  maxReviews = 3,
  options?: { preferLocalMovers?: LocalMover[]; countyLabel?: string }
): CountyReviewBlock {
  const countyLabel = options?.countyLabel ?? 'this county';
  // Explicit preferLocalMovers (even empty) means: only treat those as in-market sources.
  // Empty local segment → suppress county-page review quotes entirely (schema-safe).
  const preferProvided = options?.preferLocalMovers !== undefined;
  const prefer = preferProvided ? options!.preferLocalMovers! : movers;

  if (preferProvided && prefer.length === 0) {
    return { reviews: [], hasLocalSource: false, title: '', summary: '' };
  }

  const preferIds = new Set(prefer.map((m) => m.id));

  const collect = (pool: LocalMover[]): AttributableReview[] => {
    const out: AttributableReview[] = [];
    const seen = new Set<string>();
    for (const mover of pool) {
      if (!mover.profileSlug) continue;
      for (const review of getAttributableReviewsForMover(mover, 2)) {
        if (seen.has(review.reviewId)) continue;
        seen.add(review.reviewId);
        out.push({
          ...review,
          companyName: review.companyName ?? mover.name,
          companySlug: mover.profileSlug,
        });
        if (out.length >= maxReviews) return out;
      }
    }
    return out;
  };

  // Only collect from preferred (local/in-state) pool when prefer was provided.
  // Do not backfill national-only reviews onto county pages.
  let reviews = collect(prefer);
  if (!preferProvided && reviews.length < maxReviews) {
    const rest = movers.filter((m) => !preferIds.has(m.id));
    const seen = new Set(reviews.map((r) => r.reviewId));
    for (const r of collect(rest)) {
      if (seen.has(r.reviewId)) continue;
      reviews.push(r);
      if (reviews.length >= maxReviews) break;
    }
  }

  reviews = reviews.sort((a, b) => b.date.localeCompare(a.date)).slice(0, maxReviews);
  const hasLocalSource =
    preferProvided &&
    reviews.length > 0 &&
    reviews.some((r) =>
      prefer.some((m) => m.profileSlug && m.profileSlug === r.companySlug)
    );

  if (reviews.length === 0) {
    return { reviews: [], hasLocalSource: false, title: '', summary: '' };
  }

  if (hasLocalSource || preferProvided) {
    return {
      reviews,
      hasLocalSource: true,
      title: `Attributed reviews from local/in-state carriers on this ${countyLabel} page`,
      summary: `${reviews.length} named Google reviews from local/in-state directory listings on this page (not claimed as ${countyLabel}-only experiences).`,
    };
  }

  return {
    reviews,
    hasLocalSource: false,
    title: `Named Google reviews from directory carriers that serve ${countyLabel}`,
    summary: `These reviews are national/company-level — not ${countyLabel}-specific social proof.`,
  };
}

export function buildAttributableCountyReviews(
  movers: LocalMover[],
  maxReviews = 3
): AttributableReview[] {
  return buildCountyReviewBlock(movers, maxReviews).reviews;
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