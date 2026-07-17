'use client';

import { useState, useTransition } from 'react';
import { format } from 'date-fns';
import {
  postOwnerResponseAction,
  disputeReviewAction,
} from '@/actions/portal-owner';
import {
  DISPUTE_CATEGORIES,
  DISPUTE_UNDER_REVIEW_TAG,
  OWNER_RESPONSE_BADGE,
  type DisputeCategoryId,
} from '@/lib/portal/messaging';
import type { OwnerReview } from '@/lib/portal/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';

type Props = {
  companySlug: string;
  reviews: OwnerReview[];
};

export function OwnerReviewsPanel({ companySlug, reviews: initial }: Props) {
  const [reviews, setReviews] = useState(initial);

  if (reviews.length === 0) {
    return (
      <Card className="p-6 text-sm text-muted-foreground">
        No moderated community reviews yet. When customers leave Move Trust Hub reviews, you can
        respond with a Verified Owner badge — you still cannot remove legitimate feedback.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <OwnerReviewCard
          key={review.id}
          companySlug={companySlug}
          review={review}
          onUpdate={(next) =>
            setReviews((list) => list.map((r) => (r.id === next.id ? next : r)))
          }
        />
      ))}
    </div>
  );
}

function OwnerReviewCard({
  companySlug,
  review,
  onUpdate,
}: {
  companySlug: string;
  review: OwnerReview;
  onUpdate: (r: OwnerReview) => void;
}) {
  const [pending, startTransition] = useTransition();
  const [response, setResponse] = useState(review.owner_response ?? '');
  const [disputeOpen, setDisputeOpen] = useState(false);
  const [category, setCategory] = useState<DisputeCategoryId>('mistaken_identity');
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  function saveResponse() {
    setError(null);
    setOk(null);
    startTransition(async () => {
      const result = await postOwnerResponseAction({
        companySlug,
        reviewId: review.id,
        response,
      });
      if (!result.success) {
        setError(result.error ?? 'Could not save response');
        return;
      }
      setOk('Response published with Verified Owner badge.');
      onUpdate({
        ...review,
        owner_response: response.trim(),
        owner_response_at: new Date().toISOString(),
      });
    });
  }

  function submitDispute() {
    setError(null);
    setOk(null);
    startTransition(async () => {
      const result = await disputeReviewAction({
        companySlug,
        reviewId: review.id,
        category,
        reason,
      });
      if (!result.success) {
        setError(result.error ?? 'Could not submit dispute');
        return;
      }
      setOk('Dispute submitted. The review stays public with an Under Review tag.');
      setDisputeOpen(false);
      onUpdate({
        ...review,
        dispute_status: 'under_review',
        dispute_category: category,
        dispute_reason: reason,
        disputed_at: new Date().toISOString(),
      });
    });
  }

  return (
    <Card className="p-5 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium">{review.reviewer_name}</p>
          <StarRating rating={review.rating} size="sm" showNumber={false} />
          {review.title ? <p className="text-sm font-medium mt-1">{review.title}</p> : null}
        </div>
        <div className="flex flex-col items-end gap-1">
          <time className="text-xs text-muted-foreground">
            {format(new Date(review.created_at), 'MMM d, yyyy')}
          </time>
          {review.dispute_status === 'under_review' ? (
            <Badge variant="warning">{DISPUTE_UNDER_REVIEW_TAG}</Badge>
          ) : null}
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>

      {review.owner_response ? (
        <div className="rounded-lg border bg-muted/30 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {OWNER_RESPONSE_BADGE}
          </p>
          <p className="mt-1 text-sm">{review.owner_response}</p>
          {review.owner_response_at ? (
            <p className="mt-1 text-[11px] text-muted-foreground">
              {format(new Date(review.owner_response_at), 'MMM d, yyyy')}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="space-y-2 border-t pt-3">
        <label className="text-sm font-medium" htmlFor={`resp-${review.id}`}>
          Your response
        </label>
        <Textarea
          id={`resp-${review.id}`}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          rows={3}
          maxLength={2000}
          placeholder="Thank the customer, clarify facts, and stay professional. You cannot delete the review."
        />
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={saveResponse} disabled={pending}>
            {review.owner_response ? 'Update response' : 'Publish response'}
          </Button>
          {review.dispute_status === 'none' || review.dispute_status === 'resolved_rejected' ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setDisputeOpen((v) => !v)}
              disabled={pending}
            >
              Dispute (policy only)
            </Button>
          ) : null}
        </div>
      </div>

      {disputeOpen ? (
        <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50/50 p-3">
          <p className="text-xs text-amber-900">
            Disputes are limited to clear policy violations (mistaken identity, fraud, harassment,
            etc.). The review stays visible with an Under Review tag until moderators decide.
          </p>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as DisputeCategoryId)}
            aria-label="Dispute category"
          >
            {DISPUTE_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </Select>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="Describe the violation with enough detail for moderators (min 40 characters)."
          />
          <Button size="sm" variant="destructive" onClick={submitDispute} disabled={pending}>
            Submit dispute
          </Button>
        </div>
      ) : null}

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {ok ? <p className="text-sm text-emerald-700">{ok}</p> : null}
    </Card>
  );
}
