'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { MyMovePlanWizard } from '@/components/my-move-plan/my-move-plan-wizard';
import { openPlanInSession } from '@/lib/my-move-plan/plan-library';
import { saveMyMovePlan } from '@/lib/my-move-plan/storage';
import { MY_MOVE_PLAN_RETURN_PATH } from '@/lib/my-move-plan/return-path';
import type { MyMovePlanStep } from '@/lib/my-move-plan/types';

type Props = {
  planId: string;
  /** Initial wizard step after load */
  step?: MyMovePlanStep | null;
  /** After load, trigger email-me-report once (signed-in users) */
  autoSend?: boolean;
};

/**
 * Loads a library plan into session storage, then mounts the full wizard
 * on /my-move/plans/[id] (not the homepage).
 */
export function PlanWorkspace({ planId, step = null, autoSend = false }: Props) {
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState(false);
  const [planName, setPlanName] = useState<string | null>(null);

  useEffect(() => {
    const record = openPlanInSession(planId);
    if (!record) {
      setMissing(true);
      setReady(true);
      toast.error('Plan not found', {
        description: 'It may have been deleted on this device.',
      });
      return;
    }
    setPlanName(record.name);
    if (step) {
      saveMyMovePlan({ ...record.plan, step });
    }
    setReady(true);
  }, [planId, step]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm">Loading your move plan…</p>
      </div>
    );
  }

  if (missing) {
    return (
      <div className="mx-auto max-w-lg space-y-4 rounded-2xl border bg-card p-8 text-center">
        <h1 className="text-xl font-semibold">Plan not found</h1>
        <p className="text-sm text-muted-foreground">
          This plan is not available on this device. Open Move HQ to see your saved plans.
        </p>
        <Button asChild>
          <Link href="/my-move">Back to My Move</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" className="-ml-2 gap-1.5 text-muted-foreground" asChild>
            <Link href="/my-move">
              <ArrowLeft className="h-4 w-4" />
              Back to Move HQ
            </Link>
          </Button>
          {planName ? (
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{planName}</h1>
          ) : (
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Move plan</h1>
          )}
          <p className="mt-1 text-sm text-muted-foreground">
            Edit route, shortlist, inventory, and email your report — without leaving My Move.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={MY_MOVE_PLAN_RETURN_PATH}>Use in homepage wizard</Link>
        </Button>
      </div>

      <MyMovePlanWizard
        workspaceMode
        planReturnPath={`/my-move/plans/${encodeURIComponent(planId)}`}
        autoSendReport={autoSend}
      />
    </div>
  );
}
