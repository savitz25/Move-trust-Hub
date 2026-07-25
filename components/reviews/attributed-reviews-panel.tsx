import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import type { Review } from '@/types';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { ReviewTransparencyNote } from '@/components/trust/review-transparency-note';
import { MetricLabel } from '@/components/trust/metric-label';
import { isAttributableReview } from '@/lib/trust/verified-reviews';
import {
  buildGoogleAttributionSearchUrl,
  formatAttributableReviewCount,
} from '@/lib/trust/review-display-policy';
import { PROFILE_METRIC_TOOLTIPS } from '@/lib/trust/profile-metrics';

type Props = {
  companyId: string;
  companyName: string;
  initialReviews: Review[];
};

/**
 * Third-party attributed references as short cards with outbound links.
 * Never republish full review body text; never emit schema.org Review for these.
 */
export function AttributedReviewsPanel({ companyName, initialReviews }: Props) {
  const attributable = initialReviews.filter(isAttributableReview);
  const headline = formatAttributableReviewCount(attributable.length);
  const googleSearch = buildGoogleAttributionSearchUrl(companyName);

  return (
    <section id="attributed-reviews" aria-labelledby="attributed-reviews-heading" className="scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3">
        <div>
          <MetricLabel
            label="External review references"
            tooltip={PROFILE_METRIC_TOOLTIPS.onSiteReviews}
            className="mb-1"
          />
          <h3 id="attributed-reviews-heading" className="font-semibold text-xl tracking-tight">
            External review references
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{headline}</p>
        </div>
      </div>

      <div className="space-y-3">
        {attributable.length === 0 ? (
          <p className="text-muted-foreground py-6 text-sm leading-relaxed">
            No attributed external review references on file. Industry-reported ratings above come
            from third-party platforms — confirm on Google Maps before booking. Moderated community
            reviews (when available) are separate and may appear on the community review profile.
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
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {review.rating.toFixed(1)}★ on {review.source} — full review text is not republished
                here. View the original on {review.source}.
              </p>
              <Link
                href={
                  review.source === 'Google'
                    ? googleSearch
                    : buildGoogleAttributionSearchUrl(`${companyName} ${review.author}`)
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                View on {review.source}
                <ExternalLink className="h-3 w-3" aria-hidden />
              </Link>
            </Card>
          ))
        )}
      </div>

      <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed">
        External references only — Move Trust Hub does not republish full third-party review bodies.
        These cards are not emitted as AggregateRating / Review structured data.
      </p>
      <ReviewTransparencyNote compact className="mt-3" />
    </section>
  );
}
