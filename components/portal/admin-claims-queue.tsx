'use client';

import { useState, useTransition } from 'react';
import { approveClaimAction, rejectClaimAction } from '@/actions/portal-claims';
import type { CompanyClaim } from '@/lib/portal/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

export function PortalClaimsQueue({ claims: initial }: { claims: CompanyClaim[] }) {
  const [claims, setClaims] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  if (claims.length === 0) {
    return (
      <Card className="p-6 text-sm text-muted-foreground">No pending ownership claims.</Card>
    );
  }

  function act(id: string, action: 'approve' | 'reject') {
    setError(null);
    startTransition(async () => {
      const note = notes[id];
      const result =
        action === 'approve'
          ? await approveClaimAction(id, note)
          : await rejectClaimAction(id, note);
      if (!result.success) {
        setError(result.error ?? 'Failed');
        return;
      }
      setClaims((list) => list.filter((c) => c.id !== id));
    });
  }

  return (
    <div className="space-y-4">
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {claims.map((claim) => (
        <Card key={claim.id} className="p-5 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-semibold">{claim.company_name}</p>
              <p className="text-sm text-muted-foreground">
                USDOT {claim.usdot_submitted} · {claim.company_slug}
              </p>
            </div>
            <Badge variant="warning">{claim.verification_method}</Badge>
          </div>
          <dl className="grid sm:grid-cols-2 gap-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Claimant</dt>
              <dd>
                {claim.claimant_name}
                {claim.claimant_title ? ` · ${claim.claimant_title}` : ''}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd>{claim.claimant_email}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Phone</dt>
              <dd>{claim.claimant_phone ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Signed-in user</dt>
              <dd>{claim.claimant_user_id ? claim.claimant_user_id.slice(0, 8) + '…' : 'Not yet'}</dd>
            </div>
          </dl>
          <Textarea
            placeholder="Moderation note (optional)"
            value={notes[claim.id] ?? ''}
            onChange={(e) => setNotes((n) => ({ ...n, [claim.id]: e.target.value }))}
            rows={2}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              disabled={pending || !claim.claimant_user_id}
              onClick={() => act(claim.id, 'approve')}
            >
              Approve owner
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => act(claim.id, 'reject')}
            >
              Reject
            </Button>
          </div>
          {!claim.claimant_user_id ? (
            <p className="text-xs text-amber-800">
              Wait until the claimant completes magic-link login so user_id is linked.
            </p>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
