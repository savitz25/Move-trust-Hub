import { format } from 'date-fns';
import type { Review } from '@/types';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { ReviewSourceBadge } from '@/components/trust/review-source-badge';
import { ReviewTransparencyNote } from '@/components/trust/review-transparency-note';
import { MetricLabel } from '@/components/trust/metric-label';
import { isAttributableReview } from '@/lib/trust/verified-reviews';
import {
  EXTERNAL_REVIEW_ATTRIBUTION_NOTE,
  formatAttributableReviewCount,
} from '@/lib/trust/review-display-policy';
import { PROFILE_METRIC_TOOLTIPS } from '@/lib/trust/profile-metrics';
import { AttributedReviewsLoadMore } from '@/components/reviews/attributed-reviews-load-more';

type Props = {
  companyId: string;
  companyName: string;
  initialReviews: Review[];
};

/** Server-rendered attributed reviews — visible to crawlers without client hydration. */
export function AttributedReviewsPanel({ companyId, companyName, initialReviews }: Props) {
  const attributable = initialReviews.filter(isAttributableReview);
  const headline = formatAttributableReviewCount(attributable.length);

  return (
    <section id="attributed-reviews" aria-labelledby="attributed-reviews-heading" className="scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3">
        <div>
          <MetricLabel
            label="Attributed Google reviews on-site"
            tooltip={PROFILE_METRIC_TOOLTIPS.onSiteReviews}
            className="mb-1"
          />
          <h3 id="attributed-reviews-heading" className="font-semibold text-xl tracking-tight">
            Attributed Google Reviews
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{headline}</p>
        </div>
      </div>

      <div className="space-y-3">
        {attributable.length === 0 ? (
          <p className="text-muted-foreground py-6 text-sm leading-relaxed">
            No attributed Google reviews on Move Trust Hub for this company yet. Industry-reported
            ratings above come from third-party platforms — confirm on Google Maps before booking.
          </p>
        ) : (
          attributable.slice(0, 6).map((review) => (
            <Card key={review.id} className="review-card p-4">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{review.author}</span>
                    {review.location ? (
                      <span className="text-xs text-muted-foreground">· {review.location}</span>
                    ) : null}
                  </div>
                  <div className="mt-0.5">
                    <StarRating rating={review.rating} size="sm" showNumber={false} />
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground shrink-0">
                  {format(new Date(review.date), 'MMM yyyy')}
                  <br />
                  <span className="font-medium text-foreground">{review.source}</span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed">{review.content}</p>
              <div className="mt-2">
                <ReviewSourceBadge review={review} companyName={companyName} />
              </div>
            </Card>
          ))
        )}
      </div>

      {attributable.length > 6 ? (
        <AttributedReviewsLoadMore
          companyId={companyId}
          companyName={companyName}
          initialCount={6}
          total={attributable.length}
        />
      ) : null}

      <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed">
        {EXTERNAL_REVIEW_ATTRIBUTION_NOTE}
      </p>
      <ReviewTransparencyNote compact className="mt-3" />
    </section>
  );
}