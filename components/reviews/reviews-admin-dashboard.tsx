'use client';

import { useCallback, useState, useTransition } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  Check,
  Loader2,
  RefreshCw,
  Search,
  X,
} from 'lucide-react';
import {
  moderateReview,
  searchReviewsForAdmin,
} from '@/actions/moderate-reviews';
import type { AdminReviewRow, AdminReviewStatus } from '@/lib/reviews/queries';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type Props = {
  initialReviews: AdminReviewRow[];
  initialTotal: number;
  initialStatus: AdminReviewStatus;
  /** Query/load failure — never treat as empty queue */
  initialError?: string;
};

const STATUS_TABS: { value: AdminReviewStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Denied' },
  { value: 'all', label: 'All' },
];

function statusBadge(status: string) {
  if (status === 'approved') return <Badge variant="success">Approved</Badge>;
  if (status === 'rejected') return <Badge variant="destructive">Denied</Badge>;
  return <Badge variant="outline">Pending</Badge>;
}

export function ReviewsAdminDashboard({
  initialReviews,
  initialTotal,
  initialStatus,
  initialError,
}: Props) {
  const [reviews, setReviews] = useState(initialReviews);
  const [total, setTotal] = useState(initialTotal);
  const [status, setStatus] = useState<AdminReviewStatus>(initialStatus);
  const [loadError, setLoadError] = useState<string | undefined>(initialError);
  const [q, setQ] = useState('');
  const [rating, setRating] = useState<string>('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);
  const [pending, startTransition] = useTransition();

  const pageSize = 25;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const load = useCallback(
    (opts?: {
      status?: AdminReviewStatus;
      page?: number;
      q?: string;
      rating?: string;
      fromDate?: string;
      toDate?: string;
    }) => {
      const nextStatus = opts?.status ?? status;
      const nextPage = opts?.page ?? page;
      const nextQ = opts?.q ?? q;
      const nextRating = opts?.rating ?? rating;
      const nextFrom = opts?.fromDate ?? fromDate;
      const nextTo = opts?.toDate ?? toDate;

      startTransition(async () => {
        const res = await searchReviewsForAdmin({
          status: nextStatus,
          q: nextQ.trim() || undefined,
          rating: nextRating ? Number(nextRating) : null,
          fromDate: nextFrom || null,
          toDate: nextTo || null,
          page: nextPage,
          pageSize,
        });
        setReviews(res.reviews);
        setTotal(res.total);
        setLoadError(res.error);
        setStatus(nextStatus);
        setPage(nextPage);
        if (res.error) {
          toast.error('Could not load reviews', { description: res.error });
        }
      });
    },
    [status, page, q, rating, fromDate, toDate]
  );

  function handleAction(reviewId: string, action: 'approve' | 'reject') {
    startTransition(async () => {
      const res = await moderateReview({ reviewId, action });
      if (!res.success) {
        toast.error(res.error ?? 'Moderation failed');
        return;
      }
      toast.success(
        action === 'approve'
          ? res.approvalEmailSent
            ? 'Review approved — confirmation email sent to reviewer'
            : 'Review approved — company profiles revalidated'
          : 'Review denied'
      );
      load({ page: 1 });
    });
  }

  return (
    <div className="space-y-5">
      {/* Status tabs */}
      <div className="flex flex-wrap gap-1 rounded-xl border bg-muted/40 p-1">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => load({ status: tab.value, page: 1 })}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              status === tab.value
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
            {status === tab.value ? (
              <span className="ml-1.5 tabular-nums text-xs text-muted-foreground">
                ({total})
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="review-search">Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="review-search"
                className="pl-9"
                placeholder="Company, reviewer, keywords…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') load({ page: 1, q });
                }}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="review-rating">Rating</Label>
            <Select
              id="review-rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Any</option>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={String(n)}>
                  {n} star{n === 1 ? '' : 's'}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="review-from">From date</Label>
            <Input
              id="review-from"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="review-to">To date</Label>
            <Input
              id="review-to"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => load({ page: 1 })}
            disabled={pending}
            className="gap-1"
          >
            {pending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Search className="h-3.5 w-3.5" />
            )}
            Apply filters
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={pending}
            className="gap-1"
            onClick={() => {
              setQ('');
              setRating('');
              setFromDate('');
              setToDate('');
              load({ page: 1, q: '', rating: '', fromDate: '', toDate: '' });
            }}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </Card>

      <p className="text-sm text-muted-foreground">
        {total} review{total === 1 ? '' : 's'}
        {status !== 'all' ? ` · ${status}` : ''}
        {pending ? ' · loading…' : ''}
      </p>

      {loadError ? (
        <Card className="border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          <p className="font-semibold">Queue load error</p>
          <p className="mt-1">{loadError}</p>
        </Card>
      ) : null}

      {reviews.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          {loadError
            ? 'Reviews could not be loaded — this is not an empty queue.'
            : status === 'pending'
              ? 'No pending reviews — queue is clear.'
              : 'No reviews match your filters.'}
        </Card>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <Card key={review.id} className="p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{review.reviewer_name}</span>
                    {statusBadge(review.status)}
                    {review.verification_tier === 'verified_mth' ? (
                      <Badge variant="secondary" className="text-[10px]">
                        Verified MTH
                      </Badge>
                    ) : null}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.company_name ?? 'Unknown carrier'}
                    {review.company_dot ? (
                      <span className="tabular-nums"> · USDOT {review.company_dot}</span>
                    ) : null}
                    {review.company_slug ? (
                      <>
                        {' · '}
                        <Link
                          href={`/company/${review.company_slug}`}
                          className="text-primary hover:underline"
                          target="_blank"
                        >
                          {review.company_slug}
                        </Link>
                      </>
                    ) : null}
                    {' · '}
                    {review.reviewer_email}
                  </p>
                  <StarRating rating={review.rating} size="sm" />
                  {review.title ? (
                    <p className="font-medium text-sm">{review.title}</p>
                  ) : null}
                </div>
                <div className="text-right text-xs text-muted-foreground shrink-0">
                  <div>Submitted {format(new Date(review.created_at), 'PPp')}</div>
                  {review.moderated_at ? (
                    <div className="mt-0.5">
                      Moderated {format(new Date(review.moderated_at), 'PP')}
                    </div>
                  ) : null}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed">{review.content}</p>
              {review.moderation_note ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  Note: {review.moderation_note}
                </p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {review.status !== 'approved' ? (
                  <Button
                    size="sm"
                    className="gap-1"
                    disabled={pending}
                    onClick={() => handleAction(review.id, 'approve')}
                  >
                    {pending ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Check className="h-3.5 w-3.5" />
                    )}
                    Approve
                  </Button>
                ) : null}
                {review.status !== 'rejected' ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="gap-1"
                    disabled={pending}
                    onClick={() => handleAction(review.id, 'reject')}
                  >
                    <X className="h-3.5 w-3.5" />
                    Deny
                  </Button>
                ) : null}
                {review.status === 'approved' && review.company_slug ? (
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/company/${review.company_slug}`} target="_blank">
                      View live
                    </Link>
                  </Button>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 ? (
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || pending}
            onClick={() => load({ page: page - 1 })}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages || pending}
            onClick={() => load({ page: page + 1 })}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
