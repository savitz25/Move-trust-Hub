'use client';

import { useState, useTransition } from 'react';
import { format } from 'date-fns';
import { Check, Loader2, X } from 'lucide-react';
import { moderateReview } from '@/actions/moderate-reviews';
import type { PublicReview } from '@/lib/reviews/queries';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

type PendingReview = PublicReview & {
  status: string;
  reviewer_email: string;
  company_name?: string;
};

type Props = {
  initialQueue: PendingReview[];
};

export function ModerationQueue({ initialQueue }: Props) {
  const [queue, setQueue] = useState(initialQueue);
  const [pending, startTransition] = useTransition();

  function handleAction(reviewId: string, action: 'approve' | 'reject') {
    startTransition(async () => {
      const res = await moderateReview({ reviewId, action });
      if (!res.success) {
        toast.error(res.error ?? 'Moderation failed');
        return;
      }
      setQueue((q) => q.filter((r) => r.id !== reviewId));
      toast.success(action === 'approve' ? 'Review approved' : 'Review rejected');
    });
  }

  if (queue.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        No pending reviews — queue is clear.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {queue.map((review) => (
        <Card key={review.id} className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{review.reviewer_name}</span>
                <Badge variant="outline">Pending</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {review.company_name ?? 'Unknown carrier'} · {review.reviewer_email}
              </p>
              <div className="mt-1">
                <StarRating rating={review.rating} size="sm" />
              </div>
              {review.title ? (
                <p className="mt-2 font-medium">{review.title}</p>
              ) : null}
            </div>
            <time className="text-xs text-muted-foreground">
              {format(new Date(review.created_at), 'PPp')}
            </time>
          </div>
          <p className="mt-3 text-sm leading-relaxed">{review.content}</p>
          <div className="mt-4 flex gap-2">
            <Button
              size="sm"
              className="gap-1"
              disabled={pending}
              onClick={() => handleAction(review.id, 'approve')}
            >
              {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
              Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="gap-1"
              disabled={pending}
              onClick={() => handleAction(review.id, 'reject')}
            >
              <X className="h-3.5 w-3.5" /> Reject
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}