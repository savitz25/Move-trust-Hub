'use client';

import { useState, useTransition } from 'react';
import { format } from 'date-fns';
import { RefreshCw, Loader2 } from 'lucide-react';
import { syncReputationAction } from '@/actions/portal-owner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { REPUTATION_SYNC_COOLDOWN_DAYS } from '@/lib/portal/messaging';
import type { ReputationSyncSummary } from '@/lib/portal/types';

type Props = {
  companySlug: string;
  canSync: boolean;
  daysRemaining: number;
  lastSyncAt: string | null;
  lastSummary: ReputationSyncSummary | null;
};

export function ReputationSyncPanel({
  companySlug,
  canSync,
  daysRemaining,
  lastSyncAt,
  lastSummary,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [summary, setSummary] = useState(lastSummary);

  function onSync() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const result = await syncReputationAction(companySlug);
      if (!result.success) {
        const msg = result.error ?? 'Sync failed';
        setError(
          result.daysRemaining
            ? `${msg} (${result.daysRemaining} day(s) remaining)`
            : msg
        );
        return;
      }
      setMessage(result.message);
      setSummary(result.summary);
    });
  }

  return (
    <Card className="p-5 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-lg">Sync reputation data</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Refresh Google, BBB, and FMCSA public data for your listing. Limited to once every{' '}
            {REPUTATION_SYNC_COOLDOWN_DAYS} days. This never changes how we score rankings — and you
            cannot buy placement.
          </p>
        </div>
        <Button
          onClick={onSync}
          disabled={!canSync || pending}
          className="gap-2"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          {pending ? 'Syncing…' : 'Sync reputation data'}
        </Button>
      </div>

      {!canSync ? (
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
          Next sync available in {daysRemaining} day{daysRemaining === 1 ? '' : 's'}.
          {lastSyncAt
            ? ` Last refreshed ${format(new Date(lastSyncAt), 'MMM d, yyyy h:mm a')}.`
            : null}
        </p>
      ) : lastSyncAt ? (
        <p className="text-xs text-muted-foreground">
          Last refreshed {format(new Date(lastSyncAt), 'MMM d, yyyy h:mm a')}.
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">Never synced from the portal.</p>
      )}

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

      {summary ? (
        <ul className="text-sm space-y-1 border-t pt-3">
          <li>
            <span className="font-medium">FMCSA:</span>{' '}
            {summary.fmcsa?.ok ? summary.fmcsa.message ?? 'OK' : summary.fmcsa?.message ?? '—'}
          </li>
          <li>
            <span className="font-medium">Google:</span>{' '}
            {summary.google?.ok ? summary.google.message ?? 'OK' : summary.google?.message ?? '—'}
          </li>
          <li>
            <span className="font-medium">BBB:</span>{' '}
            {summary.bbb?.ok ? summary.bbb.message ?? 'OK' : summary.bbb?.message ?? '—'}
          </li>
        </ul>
      ) : null}

      {pending ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-2/3 animate-pulse bg-primary/60 rounded-full" />
          </div>
          Pulling latest public sources…
        </div>
      ) : null}
    </Card>
  );
}
