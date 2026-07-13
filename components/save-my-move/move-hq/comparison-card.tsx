'use client';

import Link from 'next/link';
import { ArrowRight, GitCompare, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CompanySummary } from '@/lib/save-my-move/dashboard-types';
import { formatPriceDelta, formatRatingDelta } from '@/lib/save-my-move/dashboard-utils';

type ComparisonCardProps = {
  id: string;
  name: string | null;
  slugs: string[];
  companyNames: Record<string, string>;
  companySummaries: Record<string, CompanySummary>;
  onDelete: (id: string) => Promise<void>;
  demo?: boolean;
};

export function ComparisonCard({
  id,
  name,
  slugs,
  companyNames,
  companySummaries,
  onDelete,
  demo = false,
}: ComparisonCardProps) {
  const summaries = slugs.map((slug) => companySummaries[slug]).filter(Boolean) as CompanySummary[];
  const prices = summaries.map((s) => s.avgPricePerMove).filter((p) => p > 0);
  const ratings = summaries.map((s) => s.overallRating).filter((r) => r > 0);

  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const priceDelta = maxPrice - minPrice;

  const maxRating = ratings.length ? Math.max(...ratings) : 0;
  const minRating = ratings.length ? Math.min(...ratings) : 0;
  const ratingDelta = maxRating - minRating;

  const compareHref = `/compare?${slugs.map((s) => `add=${s}`).join('&')}`;
  const title = name ?? `Comparison (${slugs.length} movers)`;

  return (
    <article className="rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <GitCompare className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
            <span className="truncate">{title}</span>
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {slugs.map((slug) => {
              const summary = companySummaries[slug];
              const label = companyNames[slug] ?? slug.replace(/-/g, ' ');
              const isCheapest = summary && summary.avgPricePerMove === minPrice && prices.length > 1;
              const isTopRated = summary && summary.overallRating === maxRating && ratings.length > 1;

              return (
                <div
                  key={slug}
                  className="rounded-lg border bg-muted/30 px-2.5 py-2 text-xs min-w-[7rem] max-w-[10rem]"
                >
                  <p className="font-medium truncate">{label}</p>
                  <div className="mt-1 space-y-0.5 text-muted-foreground tabular-nums">
                    {summary?.avgPricePerMove ? (
                      <p className={isCheapest ? 'text-emerald-600 font-semibold' : undefined}>
                        {formatPriceDelta(summary.avgPricePerMove)}
                        {isCheapest && ' · lowest'}
                      </p>
                    ) : null}
                    {summary?.overallRating ? (
                      <p className={isTopRated ? 'text-primary font-semibold' : undefined}>
                        {summary.overallRating.toFixed(1)}★
                        {isTopRated && ' · top'}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {(priceDelta > 0 || ratingDelta > 0) && (
            <div className="mt-3 flex flex-wrap gap-3 text-[11px] font-medium">
              {priceDelta > 0 && (
                <span className="inline-flex items-center gap-1 text-emerald-700">
                  <TrendingDown className="h-3 w-3" aria-hidden="true" />
                  Up to {formatPriceDelta(priceDelta)} spread
                </span>
              )}
              {ratingDelta > 0 && (
                <span className="inline-flex items-center gap-1 text-primary">
                  <TrendingUp className="h-3 w-3" aria-hidden="true" />
                  {formatRatingDelta(ratingDelta)} gap
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <Button size="sm" variant="outline" className="gap-1" asChild={!demo} disabled={demo}>
            {demo ? (
              <span>
                Open <ArrowRight className="h-3 w-3" />
              </span>
            ) : (
              <Link href={compareHref}>
                Open <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive"
            aria-label="Delete comparison"
            onClick={() => void onDelete(id)}
            disabled={demo}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}