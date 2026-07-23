'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LocalMoverCard } from '@/components/local-movers/local-mover-card';
import {
  COUNTY_MOVER_PAGE_SIZE,
  nextRevealCount,
  revealButtonLabel,
} from '@/lib/local-movers/rank-county-movers';
import type { LocalMover } from '@/lib/local-movers/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  movers: LocalMover[];
  countyLabel: string;
  stateCode: string;
  profileReturnPath: string;
  listKey?: string;
  pageSize?: number;
  className?: string;
  /** Section heading for segmented lists */
  heading?: string;
  headingHint?: string;
  /** Starting rank offset when multiple segments appear on a page */
  rankOffset?: number;
};

/**
 * Progressive county mover list: SSR first page + remaining in DOM (collapsed).
 */
export function ProgressiveCountyMoverList({
  movers,
  countyLabel,
  stateCode,
  profileReturnPath,
  listKey = 'all',
  pageSize = COUNTY_MOVER_PAGE_SIZE,
  className,
  heading,
  headingHint,
  rankOffset = 0,
}: Props) {
  const initialVisible = Math.min(pageSize, movers.length);
  const [visibleCount, setVisibleCount] = useState(initialVisible);

  useEffect(() => {
    setVisibleCount(Math.min(pageSize, movers.length));
  }, [listKey, movers.length, pageSize]);

  const hasMore = visibleCount < movers.length;
  const remaining = movers.length - visibleCount;
  const nextLabel = useMemo(
    () => revealButtonLabel(visibleCount, movers.length, pageSize),
    [visibleCount, movers.length, pageSize]
  );

  if (movers.length === 0) return null;

  return (
    <div className={className}>
      {heading ? (
        <div className="mb-4">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{heading}</h3>
          {headingHint ? (
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{headingHint}</p>
          ) : null}
        </div>
      ) : null}

      <ol className="space-y-4 list-none p-0 m-0">
        {movers.map((mover, index) => {
          const isVisible = index < visibleCount;
          return (
            <li
              key={mover.id}
              className={cn(!isVisible && 'hidden')}
              hidden={!isVisible}
              aria-hidden={!isVisible}
            >
              <LocalMoverCard
                mover={mover}
                rank={rankOffset + index + 1}
                countyLabel={countyLabel}
                stateCode={stateCode}
                profileReturnPath={profileReturnPath}
              />
            </li>
          );
        })}
      </ol>

      {hasMore ? (
        <div className="mt-6 flex flex-col items-center gap-3 border-t border-border/60 pt-5">
          <p className="text-sm text-muted-foreground">
            Showing {visibleCount} of {movers.length}
            {remaining > 0 ? ` · ${remaining} more` : ''}
          </p>
          <Button
            type="button"
            size="lg"
            className="h-12 min-w-[min(100%,20rem)] px-8 text-base font-semibold shadow-sm"
            onClick={() =>
              setVisibleCount((prev) => nextRevealCount(prev, movers.length, pageSize))
            }
          >
            {nextLabel}
            <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
          {remaining > pageSize ? (
            <button
              type="button"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              onClick={() => setVisibleCount(movers.length)}
            >
              Show all ({movers.length})
            </button>
          ) : null}
        </div>
      ) : movers.length > pageSize ? (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Showing all {movers.length} in this group
        </p>
      ) : null}
    </div>
  );
}

type SegmentedProps = {
  localInState: LocalMover[];
  national: LocalMover[];
  countyLabel: string;
  stateCode: string;
  stateName: string;
  profileReturnPath: string;
  listKey?: string;
};

/** Local/in-state first, then national carriers — clear labels, progressive each group. */
export function SegmentedCountyMoverLists({
  localInState,
  national,
  countyLabel,
  stateCode,
  stateName,
  profileReturnPath,
  listKey = 'all',
}: SegmentedProps) {
  if (localInState.length === 0 && national.length === 0) return null;

  return (
    <div className="space-y-10">
      {localInState.length > 0 ? (
        <ProgressiveCountyMoverList
          movers={localInState}
          countyLabel={countyLabel}
          stateCode={stateCode}
          profileReturnPath={profileReturnPath}
          listKey={`${listKey}-local`}
          heading={`Local & in-state movers (${localInState.length})`}
          headingHint={`Companies with ${stateName} headquarters, intrastate scope, or clear in-market presence for ${countyLabel}.`}
        />
      ) : (
        <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-100">
          No dedicated local / in-state listings are in this shortlist yet. National carriers
          below may serve {countyLabel} — confirm local capability and licensing before booking.
        </div>
      )}

      {national.length > 0 ? (
        <ProgressiveCountyMoverList
          movers={national}
          countyLabel={countyLabel}
          stateCode={stateCode}
          profileReturnPath={profileReturnPath}
          listKey={`${listKey}-national`}
          rankOffset={localInState.length}
          heading={`National / long-distance carriers serving ${countyLabel} (${national.length})`}
          headingHint="Interstate companies that can serve this county. HQ may be out of state — we do not re-label them as local."
        />
      ) : null}
    </div>
  );
}
