'use client';

import { useState, useTransition } from 'react';
import { resolveDisputeAction } from '@/actions/portal-owner';
import type { OwnerReview } from '@/lib/portal/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/ui/star-rating';

type DisputeRow = OwnerReview & {
  company_name?: string;
  reviewer_email?: string;
};

export function PortalDisputesQueue({ disputes: initial }: { disputes: DisputeRow[] }) {
  const [disputes, setDisputes] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  if (disputes.length === 0) {
    return <Card className="p-6 text-sm text-muted-foreground">No open disputes.</Card>;
  }

  function resolve(
    id: string,
    resolution: 'resolved_upheld' | 'resolved_rejected',
    removeReview?: boolean
  ) {
    setError(null);
    startTransition(async () => {
      const result = await resolveDisputeAction({
        reviewId: id,
        resolution,
        note: notes[id],
        removeReview,
      });
      if (!result.success) {
        setError(result.error ?? 'Failed');
        return;
      }
      setDisputes((list) => list.filter((d) => d.id !== id));
    });
  }

  return (
    <div className="space-y-4">
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {disputes.map((d) => (
        <Card key={d.id} className="p-5 space-y-3">
          <div>
            <p className="font-semibold">{d.company_name ?? d.company_id}</p>
            <p className="text-sm text-muted-foreground">
              Category: {d.dispute_category ?? '—'} · {d.reviewer_name}
            </p>
            <StarRating rating={d.rating} size="sm" showNumber={false} />
          </div>
          <p className="text-sm">{d.content}</p>
          <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 text-sm">
            <p className="font-medium text-amber-900">Owner dispute reason</p>
            <p className="mt-1 text-amber-950/80">{d.dispute_reason}</p>
          </div>
          <Textarea
            placeholder="Moderator note"
            value={notes[d.id] ?? ''}
            onChange={(e) => setNotes((n) => ({ ...n, [d.id]: e.target.value }))}
            rows={2}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="destructive"
              disabled={pending}
              onClick={() => resolve(d.id, 'resolved_upheld', true)}
            >
              Uphold & remove review
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => resolve(d.id, 'resolved_upheld', false)}
            >
              Uphold (keep public)
            </Button>
            <Button
              size="sm"
              disabled={pending}
              onClick={() => resolve(d.id, 'resolved_rejected')}
            >
              Reject dispute (keep review)
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
