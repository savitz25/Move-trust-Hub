import { hasGoogleReputationSnapshot } from '@/lib/verification/google-reputation-snapshot';
import { isAttributableReview } from '@/lib/trust/verified-reviews';
import { isVerifiedGoogleEvidence, type RatingProvenance } from '@/lib/verification/rating-provenance';
import type { GooglePlacesData } from '@/lib/verification/types';
import type { Review } from '@/types';

/**
 * MOVE-PROFILE-V3-001A: section header for the "External Reputation
 * Snapshots" section. Replaces the retired CompanyProfileReviewSources
 * card, which duplicated Google/FMCSA cards shown elsewhere on the page
 * and rendered an opaque 0-100 directory composite score and an
 * unattributed blended rating — both removed from public render (see
 * docs/MOVE-PROFILE-V3-001A-LEGACY-REMOVAL.md).
 *
 * Groups Google / BBB / other named third-party snapshots and external
 * review references into one coherent, clearly-labeled section. External
 * ratings are never presented as a Move Trust Hub rating and are never
 * mixed into schema.org AggregateRating.
 */
export function ExternalReputationHeader({
  googleData,
  reviews = [],
  provenance,
}: {
  googleData: GooglePlacesData | null | undefined;
  reviews?: Review[];
  provenance?: RatingProvenance | null;
}) {
  const googleVerified = provenance == null || isVerifiedGoogleEvidence(provenance);
  const showGoogle = googleVerified && hasGoogleReputationSnapshot(googleData);
  const showReviews =
    googleVerified && reviews.some((review) => isAttributableReview(review) && review.source === 'Google');
  // BBB remains in Regulatory & Trust Evidence; only count items rendered here.
  if (!showGoogle && !showReviews) {
    return null;
  }

  return (
    <div className="mb-3">
      <h2 className="text-xl font-semibold tracking-tight">External Reputation Snapshots</h2>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-2xl">
        Third-party ratings shown below are labeled snapshots with a source, a check date, and an
        outbound link — never a Move Trust Hub rating, and never added together or mixed into
        schema.org AggregateRating. Move Trust Hub community reviews (moderated, hosted here) are
        shown separately below.
      </p>
    </div>
  );
}
