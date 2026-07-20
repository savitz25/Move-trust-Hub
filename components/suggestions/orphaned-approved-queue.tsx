'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Loader2, RefreshCw, Trash2 } from 'lucide-react';
import {
  deleteSuggestion,
  repairOrphanedApprovedSuggestion,
} from '@/actions/moderate-suggestions';
import {
  predictedProfileSlugForSuggestion,
  type OrphanedApprovedSuggestion,
} from '@/lib/suggestions/suggestion-shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

type Props = {
  initialOrphans: OrphanedApprovedSuggestion[];
};

export function OrphanedApprovedQueue({ initialOrphans }: Props) {
  const [orphans, setOrphans] = useState(initialOrphans);
  const [pending, startTransition] = useTransition();

  if (orphans.length === 0) return null;

  function handleRepair(suggestionId: string) {
    startTransition(async () => {
      const res = await repairOrphanedApprovedSuggestion({ suggestionId });
      if (!res.success) {
        toast.error(res.error ?? 'Publish failed');
        return;
      }
      setOrphans((rows) => rows.filter((row) => row.id !== suggestionId));
      toast.success(
        <span>
          Profile published.{' '}
          {res.companySlug ? (
            <Link href={`/companies/${res.companySlug}`} className="underline">
              View profile
            </Link>
          ) : null}
        </span>
      );
    });
  }

  function handleDelete(suggestion: OrphanedApprovedSuggestion) {
    const label = suggestion.name || suggestion.legal_name;
    if (
      !confirm(
        `Permanently delete suggestion “${label}” from the system?\n\nThis cannot be undone. It will not recreate a company profile.`
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
      setOrphans((rows) => rows.filter((row) => row.id !== suggestion.id));
      toast.success(`Deleted ${label}`);
    });
  }

  return (
    <div className="mb-8 space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Approved but missing profile</h2>
        <p className="text-sm text-muted-foreground">
          These suggestions were marked approved but no readable company row exists. Use
          &quot;Publish profile&quot; to create the directory entry, or delete them permanently
          if they should not be on the site.
        </p>
      </div>
      {orphans.map((suggestion) => {
        const predictedSlug = predictedProfileSlugForSuggestion(suggestion);
        return (
          <Card key={suggestion.id} className="border-amber-200 bg-amber-50/40 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">
                    {suggestion.name || suggestion.legal_name}
                  </span>
                  <Badge variant="warning">Missing profile</Badge>
                  {suggestion.usdot ? (
                    <Badge variant="secondary">DOT {suggestion.usdot}</Badge>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Expected URL:{' '}
                  <Link href={`/companies/${predictedSlug}`} className="underline">
                    /companies/{predictedSlug}
                  </Link>
                </p>
              </div>
              <time className="text-xs text-muted-foreground">
                {format(new Date(suggestion.created_at), 'PPp')}
              </time>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                className="gap-1"
                disabled={pending}
                onClick={() => handleRepair(suggestion.id)}
              >
                {pending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" />
                )}
                Publish profile
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