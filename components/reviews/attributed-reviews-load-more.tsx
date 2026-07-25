'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import type { Review } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { getAllReviewsForCompany } from '@/lib/data';
import { isAttributableReview } from '@/lib/trust/verified-reviews';
import { buildGoogleAttributionSearchUrl } from '@/lib/trust/review-display-policy';

type Props = {
  companyId: string;
  companyName: string;
  initialCount: number;
  total: number;
};

/** Client island — only hydrates when the user loads additional external references. */
export function AttributedReviewsLoadMore({
  companyId,
  companyName,
  initialCount,
  total,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [extraReviews, setExtraReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const googleSearch = buildGoogleAttributionSearchUrl(companyName);

  const loadAll = async () => {
    setLoading(true);
    const all = await getAllReviewsForCompany(companyId);
    const attributable = all.filter(isAttributableReview);
    setExtraReviews(attributable.slice(initialCount));
    setExpanded(true);
    setLoading(false);
  };

  if (expanded) {
    return (
      <div className="space-y-3 mt-3">
        {extraReviews.map((review) => (
          <Card key={review.id} className="review-card p-4">
            <div className="flex justify-between items-start gap-3">
              <div>
                <span className="font-medium">{review.author}</span>
                <div className="mt-0.5">
                  <StarRating rating={review.rating} size="sm" showNumber={false} />
                </div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {format(new Date(review.date), 'MMM yyyy')}
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {review.rating.toFixed(1)}★ on {review.source} — full review text is not republished.
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
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3">
      <Button variant="outline" size="sm" onClick={loadAll} disabled={loading}>
        {loading ? 'Loading…' : `Load all ${total} external references`}
      </Button>
    </div>
  );
}
