'use client';

import React, { useState } from 'react';
import { Review } from '@/types';

import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { ReviewSourceBadge } from '@/components/trust/review-source-badge';
import { ReviewTransparencyNote } from '@/components/trust/review-transparency-note';
import { isAttributableReview } from '@/lib/trust/verified-reviews';
import { EXTERNAL_REVIEW_ATTRIBUTION_NOTE } from '@/lib/trust/review-display-policy';

interface Props {
  companyId: string;
  companyName: string;
  initialReviews: Review[];
}

export function ReviewsSection({ companyId, companyName, initialReviews }: Props) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filterSource, setFilterSource] = useState<string>('All');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const attributableOnly = reviews.filter(isAttributableReview);
  const sources = ['All', ...Array.from(new Set(attributableOnly.map(r => r.source)))];

  const filtered = attributableOnly
    .filter(r => filterSource === 'All' || r.source === filterSource)
    .filter(r => !showVerifiedOnly || r.verified);

  const loadMore = async () => {
    setIsLoadingMore(true);
    try {
      const res = await fetch(`/api/reviews?companyId=${encodeURIComponent(companyId)}`);
      if (res.ok) {
        const data = (await res.json()) as { reviews: Review[] };
        setReviews(data.reviews);
      }
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-xl">Attributed Google Reviews</h3>
        <div className="flex gap-2 text-xs">
          <Button size="sm" variant="outline" onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}>
            {showVerifiedOnly ? 'Show All Attributed' : '5-Star Only'}
          </Button>
        </div>
      </div>

      <div className="flex gap-1.5 mb-4 flex-wrap">
        {sources.map(src => (
          <button
            key={src}
            onClick={() => setFilterSource(src)}
            className={`filter-chip text-xs ${filterSource === src ? 'filter-chip-active' : ''}`}
          >
            {src}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-muted-foreground py-6">
            No attributed Google reviews on Move Trust Hub for this company yet.
          </p>
        )}

        {filtered.slice(0, 6).map((review) => (
          <Card key={review.id} className="review-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.author}</span>
                  {review.location && <span className="text-xs text-muted-foreground">• {review.location}</span>}
                </div>
                <div className="mt-0.5">
                  <StarRating rating={review.rating} size="sm" showNumber={false} />
                </div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {format(new Date(review.date), 'MMM yyyy')}<br />
                <span className="font-medium text-foreground">{review.source}</span>
              </div>
            </div>
            <div className="mt-3 text-sm leading-relaxed">{review.content}</div>
            <div className="mt-2">
              <ReviewSourceBadge review={review} companyName={companyName} />
            </div>
          </Card>
        ))}
      </div>

      {attributableOnly.length > 6 && filtered.length > 0 && (
        <div className="mt-3">
          <Button variant="outline" size="sm" onClick={loadMore} disabled={isLoadingMore}>
            {isLoadingMore ? 'Loading...' : 'Load all attributed reviews'}
          </Button>
        </div>
      )}

      <p className="text-[10px] text-muted-foreground mt-4">{EXTERNAL_REVIEW_ATTRIBUTION_NOTE}</p>
      <ReviewTransparencyNote compact className="mt-3" />
    </div>
  );
}
