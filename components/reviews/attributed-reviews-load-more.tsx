'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import type { Review } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { ReviewSourceBadge } from '@/components/trust/review-source-badge';
import { getAllReviewsForCompany } from '@/lib/data';
import { isAttributableReview } from '@/lib/trust/verified-reviews';

type Props = {
  companyId: string;
  companyName: string;
  initialCount: number;
  total: number;
};

/** Client island — only hydrates when the user loads additional attributed reviews. */
export function AttributedReviewsLoadMore({
  companyId,
  companyName,
  initialCount,
  total,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [extraReviews, setExtraReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

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
            <p className="mt-3 text-sm leading-relaxed">{review.content}</p>
            <ReviewSourceBadge review={review} companyName={companyName} />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3">
      <Button variant="outline" size="sm" onClick={loadAll} disabled={loading}>
        {loading ? 'Loading…' : `Load all ${total} attributed reviews`}
      </Button>
    </div>
  );
}