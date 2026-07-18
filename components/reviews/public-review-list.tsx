'use client';

import { useState, useTransition } from 'react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { IMAGE_SIZES } from '@/lib/images/constants';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, MessageSquarePlus, ShieldCheck } from 'lucide-react';
import { NativeReviewVerifiedBadge } from '@/components/trust/review-source-badge';
import { fetchCompanyReviews } from '@/actions/reviews';
import type { PublicReview, ReviewSort } from '@/lib/reviews/queries';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';

type Props = {
  companyId: string;
  companyIds?: string[];
  companyName: string;
  initialReviews: PublicReview[];
  initialTotal: number;
  pageSize?: number;
  showHeading?: boolean;
};

const SORT_OPTIONS: { value: ReviewSort; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'highest', label: 'Highest rated' },
  { value: 'lowest', label: 'Lowest rated' },
];

export function PublicReviewList({
  companyId,
  companyIds,
  companyName,
  initialReviews,
  initialTotal,
  pageSize = 10,
  showHeading = true,
}: Props) {
  const [reviews, setReviews] = useState(initialReviews);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<ReviewSort>('newest');
  const [pending, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const ids = companyIds && companyIds.length > 0 ? companyIds : [companyId];

  function loadPage(nextPage: number, nextSort: ReviewSort = sort) {
    startTransition(async () => {
      const res = await fetchCompanyReviews({
        companyId,
        companyIds: ids,
        page: nextPage,
        pageSize,
        sort: nextSort,
      });
      setReviews(res.reviews);
      setTotal(res.total);
      setPage(nextPage);
    });
  }

  function handleSortChange(value: string) {
    const nextSort = value as ReviewSort;
    setSort(nextSort);
    loadPage(1, nextSort);
  }

  return (
    <div>
      {showHeading ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-semibold">Customer Reviews</h2>
            <p className="text-sm text-muted-foreground">
              Moderated submissions for {companyName}
            </p>
          </div>
          <Select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            disabled={pending}
            className="w-full sm:w-[180px]"
            aria-label="Sort reviews"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      ) : (
        <div className="mb-3 flex justify-end">
          <Select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            disabled={pending}
            className="w-full sm:w-[180px]"
            aria-label="Sort reviews"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      )}

      {reviews.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-muted">
            <MessageSquarePlus className="h-5 w-5 text-muted-foreground" aria-hidden />
          </div>
          <p className="font-medium text-foreground">No approved reviews yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Be the first to share your experience with {companyName}.
          </p>
        </Card>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="overflow-hidden border bg-card p-0 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-foreground">{review.reviewer_name}</span>
                      <NativeReviewVerifiedBadge />
                    </div>
                    <StarRating rating={review.rating} size="sm" showNumber={false} />
                    {review.title ? (
                      <p className="pt-0.5 font-medium text-sm leading-snug">{review.title}</p>
                    ) : null}
                  </div>
                  <time
                    className="text-xs text-muted-foreground shrink-0 tabular-nums"
                    dateTime={review.created_at}
                  >
                    {format(new Date(review.created_at), 'MMM d, yyyy')}
                    {review.move_date ? (
                      <span className="block text-[11px]">Move: {review.move_date}</span>
                    ) : null}
                  </time>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {review.content}
                </p>

                {review.dispute_status === 'under_review' ? (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                    Under Review
                  </p>
                ) : null}

                {review.owner_response ? (
                  <div className="mt-3 rounded-lg border bg-muted/40 p-3">
                    <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      <ShieldCheck className="h-3 w-3" aria-hidden />
                      Verified Owner
                    </p>
                    <p className="mt-1 text-sm text-foreground">{review.owner_response}</p>
                    {review.owner_response_at ? (
                      <time
                        className="mt-1 block text-[11px] text-muted-foreground"
                        dateTime={review.owner_response_at}
                      >
                        {format(new Date(review.owner_response_at), 'MMM d, yyyy')}
                      </time>
                    ) : null}
                  </div>
                ) : null}

                {review.photo_urls.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {review.photo_urls.map((url) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block h-20 w-20 rounded-md overflow-hidden border"
                      >
                        <OptimizedImage
                          src={url}
                          alt="Review photo"
                          fill
                          loading="lazy"
                          className="object-cover"
                          sizes={IMAGE_SIZES.reviewThumb}
                        />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || pending}
            onClick={() => loadPage(page - 1)}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            Page {page} of {totalPages} ({total} reviews)
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages || pending}
            onClick={() => loadPage(page + 1)}
            className="gap-1"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ) : null}

      <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
        Reviews are submitted with a working email, screened for spam and duplicates, and
        approved by Move Trust Hub moderators before display. Approved reviews are labeled
        &ldquo;Verified by Move Trust Hub.&rdquo; Always cross-check FMCSA licensing before booking.
      </p>
    </div>
  );
}
