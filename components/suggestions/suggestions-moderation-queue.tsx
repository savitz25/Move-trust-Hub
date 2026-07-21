'use client';

import { useState, useTransition } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Check, ExternalLink, Loader2, MapPin, Trash2, X } from 'lucide-react';
import {
  deleteSuggestion,
  moderateSuggestion,
} from '@/actions/moderate-suggestions';
import { AdminCoveragePreview } from '@/components/suggestions/admin-coverage-preview';
import { AdminEnrichedPreview } from '@/components/verification/admin-enriched-preview';
import type { PendingSuggestion } from '@/lib/suggestions/queries';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

type Props = {
  initialQueue: PendingSuggestion[];
};

export function SuggestionsModerationQueue({ initialQueue }: Props) {
  const [queue, setQueue] = useState(initialQueue);
  const [pending, startTransition] = useTransition();

  function handleAction(suggestionId: string, action: 'approve' | 'reject') {
    startTransition(async () => {
      const res = await moderateSuggestion({ suggestionId, action });
      if (!res.success) {
        toast.error(res.error ?? 'Moderation failed');
        return;
      }
      setQueue((q) => q.filter((s) => s.id !== suggestionId));
      if (action === 'approve' && res.companySlug) {
        toast.success(
          <span>
            Company approved.{' '}
            <Link href={`/companies/${res.companySlug}`} className="underline">
              View profile
            </Link>
          </span>
        );
      } else {
        toast.success(action === 'approve' ? 'Suggestion approved' : 'Suggestion rejected');
      }
    });
  }

  function handleDelete(suggestion: PendingSuggestion) {
    // Prefer stored public name (DBA when available) over legal entity name.
    const label = suggestion.name || suggestion.legal_name;
    if (
      !confirm(
        `Permanently delete suggestion “${label}” from the system?\n\nThis cannot be undone.`
      )
    ) {
      return;
    }
    startTransition(async () => {
      const res = await deleteSuggestion({ suggestionId: suggestion.id });
      if (!res.success) {
        toast.error(res.error ?? 'Delete failed');
        return;
      }
      setQueue((q) => q.filter((s) => s.id !== suggestion.id));
      toast.success(`Deleted ${label}`);
    });
  }

  if (queue.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        No pending suggestions — queue is clear.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {queue.map((suggestion) => {
        const hasFmcsa = Boolean(suggestion.usdot || suggestion.fmcsa_raw || suggestion.fmcsa_preview);
        const hasGoogle = Boolean(suggestion.google_data);
        const hasPublic = Boolean(suggestion.public_scrape_data);
        const isLocal =
          (suggestion as { service_scope?: string }).service_scope === 'intrastate';
        const publicName = suggestion.name || suggestion.legal_name;
        const countyCount = Array.isArray(suggestion.selected_counties)
          ? suggestion.selected_counties.length
          : 0;
        const contactBits = [
          suggestion.phone ? 'Phone' : null,
          suggestion.headquarters ? 'Address' : null,
          hasGoogle ? 'Google' : null,
          hasFmcsa ? 'FMCSA' : null,
        ].filter(Boolean);

        return (
          <Card key={suggestion.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-lg">{publicName}</span>
                  {suggestion.legal_name &&
                  suggestion.name &&
                  suggestion.legal_name !== suggestion.name ? (
                    <span className="text-xs text-muted-foreground">
                      Legal: {suggestion.legal_name}
                    </span>
                  ) : null}
                  <Badge variant="outline">Pending</Badge>
                  {isLocal ? (
                    <Badge variant="secondary">
                      Local / intrastate
                      {countyCount > 0 ? ` · ${countyCount} counties` : ''}
                    </Badge>
                  ) : hasFmcsa ? (
                    <Badge variant="default">FMCSA primary</Badge>
                  ) : (
                    <Badge variant="destructive">Missing FMCSA</Badge>
                  )}
                  {hasGoogle ? <Badge variant="outline">Google supplemental</Badge> : null}
                  {hasPublic ? <Badge variant="secondary">Public scrape</Badge> : null}
                  {suggestion.usdot ? (
                    <Badge variant="secondary">DOT {suggestion.usdot}</Badge>
                  ) : null}
                  {suggestion.mc_number ? (
                    <Badge variant="secondary">MC-{suggestion.mc_number}</Badge>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {suggestion.suggested_by_name} · {suggestion.suggested_by_email}
                </p>
                {contactBits.length ? (
                  <p className="text-xs text-muted-foreground mt-1">
                    Contact fields: {contactBits.join(' · ')}
                    {suggestion.phone ? ` · ${suggestion.phone}` : ''}
                  </p>
                ) : (
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    Weak contact data — review phone/website before approve when possible.
                  </p>
                )}
              </div>
              <time className="text-xs text-muted-foreground">
                {format(new Date(suggestion.created_at), 'PPp')}
              </time>
            </div>

            {hasFmcsa || hasGoogle || hasPublic ? (
              <div className="mt-4">
                <AdminEnrichedPreview suggestion={suggestion} />
                <AdminCoveragePreview suggestion={suggestion} />
              </div>
            ) : (
              <>
                {suggestion.headquarters ? (
                  <p className="mt-3 text-sm flex items-start gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                    {suggestion.headquarters}
                  </p>
                ) : null}
                {suggestion.details ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{suggestion.details}</p>
                ) : null}
              </>
            )}

            {suggestion.source_page ? (
              <p className="mt-2 text-xs text-muted-foreground">Source: {suggestion.source_page}</p>
            ) : null}

            {suggestion.usdot ? (
              <a
                href={`https://safer.fmcsa.dot.gov/query.asp?searchtype=DOT&querytype=queryCarrier&query_param=USDOT&query_string=${suggestion.usdot}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs text-primary underline underline-offset-2"
              >
                View FMCSA SAFER record
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : null}

            <p className="mt-3 text-xs text-muted-foreground">
              {isLocal
                ? 'Approving publishes as a local/in-state mover on the selected county pages only — not the main interstate /companies directory.'
                : 'Approving publishes the company profile to the interstate directory, attaches source data, and revalidates directory caches.'}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                className="gap-1"
                disabled={
                  pending ||
                  ((suggestion as { service_scope?: string }).service_scope !==
                    'intrastate' &&
                    !hasFmcsa)
                }
                onClick={() => handleAction(suggestion.id, 'approve')}
              >
                {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                Approve &amp; publish
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1"
                disabled={pending}
                onClick={() => handleAction(suggestion.id, 'reject')}
              >
                {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
                Reject
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1 text-destructive border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
                disabled={pending}
                onClick={() => handleDelete(suggestion)}
              >
                {pending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
                Delete permanently
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}