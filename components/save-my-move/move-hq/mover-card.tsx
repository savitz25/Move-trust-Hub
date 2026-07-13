'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ExternalLink, ShieldCheck, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StarRating } from '@/components/ui/star-rating';
import type { CompanySummary } from '@/lib/save-my-move/dashboard-types';
import { cn } from '@/lib/utils';

type MoverCardProps = {
  id: string;
  companySlug: string;
  companyName: string;
  summary?: CompanySummary;
  notes: string | null;
  selected: boolean;
  onToggleSelect: (slug: string) => void;
  onNotesChange: (id: string, notes: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  demo?: boolean;
};

function companyInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'M';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
}

export function MoverCard({
  id,
  companySlug,
  companyName,
  summary,
  notes,
  selected,
  onToggleSelect,
  onNotesChange,
  onRemove,
  demo = false,
}: MoverCardProps) {
  const [notesOpen, setNotesOpen] = useState(Boolean(notes?.trim()));

  return (
    <article
      className={cn(
        'rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md',
        selected && 'border-primary/40 ring-1 ring-primary/20'
      )}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(companySlug)}
          className="mt-1.5 h-4 w-4 rounded border-input accent-primary"
          aria-label={`Select ${companyName} for comparison`}
          disabled={demo}
        />

        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-emerald-500/15 text-sm font-bold text-primary"
          aria-hidden="true"
        >
          {companyInitials(companyName)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              {demo ? (
                <span className="font-semibold text-primary">{companyName}</span>
              ) : (
                <Link
                  href={`/companies/${companySlug}`}
                  className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span className="truncate">{companyName}</span>
                  <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                </Link>
              )}
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {summary?.isVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-700 font-medium">
                    <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                    FMCSA
                  </span>
                )}
                {summary && summary.overallRating > 0 && (
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" aria-hidden="true" />
                    {summary.overallRating.toFixed(1)}
                    <span className="text-muted-foreground">
                      ({summary.reviewCount.toLocaleString()})
                    </span>
                  </span>
                )}
                {summary && summary.reputationScore > 0 && (
                  <span className="tabular-nums font-medium">{summary.reputationScore} rep</span>
                )}
              </div>
              {summary && summary.overallRating > 0 && (
                <div className="mt-1.5">
                  <StarRating rating={summary.overallRating} size="sm" showNumber={false} />
                </div>
              )}
            </div>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive shrink-0"
              aria-label={`Remove ${companyName}`}
              onClick={() => void onRemove(id)}
              disabled={demo}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setNotesOpen((v) => !v)}
            className="mt-3 flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            aria-expanded={notesOpen}
          >
            Private notes
            <ChevronDown
              className={cn('h-3.5 w-3.5 transition-transform', notesOpen && 'rotate-180')}
              aria-hidden="true"
            />
          </button>
          {notesOpen && (
            <Input
              className="mt-2 text-sm"
              placeholder="Only you can see these notes"
              defaultValue={notes ?? ''}
              disabled={demo}
              onBlur={(e) => void onNotesChange(id, e.target.value)}
            />
          )}
        </div>
      </div>
    </article>
  );
}