'use client';

import { useState, useTransition } from 'react';
import { Loader2, Check, X } from 'lucide-react';
import { moderateLenderOnboarding } from '@/actions/moderate-lender-onboarding';
import type {
  EnrichedLenderPreview,
  LenderOnboardingSubmissionRow,
} from '@/lib/lender/onboarding/types';
import { LenderMultiSourcePreview } from '@/components/lender/onboarding/lender-multi-source-preview';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Props = {
  initialQueue: LenderOnboardingSubmissionRow[];
};

export function LenderModerationQueue({ initialQueue }: Props) {
  const [queue, setQueue] = useState(initialQueue);
  const [pending, startTransition] = useTransition();

  function handleModerate(submissionId: string, action: 'approve' | 'reject') {
    startTransition(async () => {
      const res = await moderateLenderOnboarding({ submissionId, action });
      if (!res.success) {
        toast.error(res.error ?? 'Moderation failed');
        return;
      }
      setQueue((q) => q.filter((s) => s.id !== submissionId));
      toast.success(action === 'approve' ? `Published at /lender/lenders/${res.slug}` : 'Rejected');
    });
  }

  if (queue.length === 0) {
    return <p className="text-sm text-zinc-500">No pending lender onboarding submissions.</p>;
  }

  return (
    <div className="space-y-8">
      {queue.map((item) => {
        const enriched: EnrichedLenderPreview | null = item.nmls_preview
          ? {
              nmls: item.nmls_preview,
              google: item.google_data ?? null,
              publicScrape: item.public_scrape_data ?? null,
              cfpb: item.cfpb_data ?? null,
              countySlug: null,
              stateSlug: null,
              countyExperienceScore: 0,
              fetchedAt: item.created_at,
            }
          : null;

        return (
          <article key={item.id} className="rounded-xl border p-6 space-y-4">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h3 className="font-semibold text-lg text-[#0A2540]">{item.name}</h3>
                <p className="text-sm text-zinc-500">
                  NMLS #{item.nmls_id} · {item.submitted_by_name} ({item.submitted_by_email})
                </p>
                {item.needs_manual_review ? (
                  <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">
                    Needs manual review
                  </span>
                ) : null}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="gap-1"
                  disabled={pending || !enriched}
                  onClick={() => handleModerate(item.id, 'approve')}
                >
                  {pending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                  Approve &amp; publish
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  disabled={pending}
                  onClick={() => handleModerate(item.id, 'reject')}
                >
                  <X className="h-3 w-3" /> Reject
                </Button>
              </div>
            </div>
            {enriched ? <LenderMultiSourcePreview preview={enriched} /> : null}
          </article>
        );
      })}
    </div>
  );
}