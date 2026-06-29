'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { fetchCompanyReviews } from '@/actions/reviews';
import type { PublicReview, ReviewSort } from '@/lib/reviews/queries';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';

type Props = {
  companyId: string;
  companyName: string;
  initialReviews: PublicReview[];
  initialTotal: number;
  pageSize?: number;
};

const SORT_OPTIONS: { value: ReviewSort; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'highest', label: 'Highest rated' },
  { value: 'lowest', label: 'Lowest rated' },
];

export function PublicReviewList({
  companyId,
  companyName,
  initialReviews,
  initialTotal,
  pageSize = 10,
}: Props) {
  const [reviews, setReviews] = useState(initialReviews);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<ReviewSort>('newest');
  const [pending, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function loadPage(nextPage: number, nextSort: ReviewSort = sort) {
    startTransition(async () => {
      const res = await fetchCompanyReviews({
        companyId,
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

      {reviews.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          <p>No approved reviews yet. Be the first to share your experience.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{review.reviewer_name}</span>
                    <Badge variant="outline" className="text-[10px] gap-1">
                      <ShieldCheck className="h-3 w-3" /> Moderated
                    </Badge>
                  </div>
                  <div className="mt-1">
                    <StarRating rating={review.rating} size="sm" showNumber={false} />
                  </div>
                  {review.title ? (
                    <p className="mt-2 font-medium text-sm">{review.title}</p>
                  ) : null}
                </div>
                <time
                  className="text-xs text-muted-foreground shrink-0"
                  dateTime={review.created_at}
                >
                  {format(new Date(review.created_at), 'MMM d, yyyy')}
                  {review.move_date ? (
                    <span className="block">Move: {review.move_date}</span>
                  ) : null}
                </time>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {review.content}
              </p>
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
                      <Image
                        src={url}
                        alt="Review photo"
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </a>
                  ))}
                </div>
              ) : null}
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
        Reviews are submitted by customers and approved by Move Trust Hub moderators.
        We verify submissions for spam and duplicates but cannot guarantee every detail.
        Always cross-check FMCSA licensing before booking.
      </p>
    </div>
  );
}