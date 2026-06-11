'use client';

import React, { useState } from 'react';
import { Review } from '@/types';
import { getAllReviewsForCompany } from '@/lib/data';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';

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

  const sources = ['All', ...Array.from(new Set(reviews.map(r => r.source)))];

  const filtered = reviews
    .filter(r => filterSource === 'All' || r.source === filterSource)
    .filter(r => !showVerifiedOnly || r.verified);

  const loadMore = async () => {
    setIsLoadingMore(true);
    const more = await getAllReviewsForCompany(companyId);
    setReviews(more);
    setIsLoadingMore(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-xl">Customer Reviews</h3>
        <div className="flex gap-2 text-xs">
          <Button size="sm" variant="outline" onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}>
            {showVerifiedOnly ? 'Show All' : 'Verified Only'}
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
        {filtered.length === 0 && <p className="text-muted-foreground py-6">No reviews match the current filters.</p>}

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
            <div className="mt-2 flex items-center gap-2">
              {review.verified ? (
                <Badge variant="success" className="text-[10px]">Verified Move</Badge>
              ) : (
                <Badge variant="outline" className="text-[10px]">Unverified</Badge>
              )}
            </div>
          </Card>
        ))}
      </div>

      {reviews.length > 6 && filtered.length > 0 && (
        <div className="mt-3">
          <Button variant="outline" size="sm" onClick={loadMore} disabled={isLoadingMore}>
            {isLoadingMore ? 'Loading...' : 'Load all reviews for this company'}
          </Button>
        </div>
      )}

      <p className="text-[10px] text-muted-foreground mt-4">
        Reviews are aggregated from public sources and submitted customers. We do not guarantee authenticity of every review. Always cross-reference.
      </p>
    </div>
  );
}
