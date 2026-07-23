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
  /** Reset visible window when zone filter (or other parent key) changes. */
  listKey?: string;
  pageSize?: number;
  className?: string;
};

/**
 * Progressive county mover list: SSR first page + remaining in DOM (collapsed).
 * Matches main directory “show next N / show all” interaction pattern.
 */
export function ProgressiveCountyMoverList({
  movers,
  countyLabel,
  stateCode,
  profileReturnPath,
  listKey = 'all',
  pageSize = COUNTY_MOVER_PAGE_SIZE,
  className,
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
      <ol className="space-y-4 list-none p-0 m-0">
        {movers.map((mover, index) => {
          const isVisible = index < visibleCount;
          return (
            <li
              key={mover.id}
              // Keep remaining cards in the DOM for crawlability; collapse for performance.
              className={cn(!isVisible && 'hidden')}
              hidden={!isVisible}
              aria-hidden={!isVisible}
            >
              <LocalMoverCard
                mover={mover}
                rank={index + 1}
                countyLabel={countyLabel}
                stateCode={stateCode}
                profileReturnPath={profileReturnPath}
              />
            </li>
          );
        })}
      </ol>

      {hasMore ? (
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-border/60 pt-6">
          <p className="text-sm text-muted-foreground">
            Showing {visibleCount} of {movers.length} movers
            {remaining > 0 ? ` · ${remaining} more available` : ''}
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
              Show all movers ({movers.length})
            </button>
          ) : null}
        </div>
      ) : movers.length > pageSize ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Showing all {movers.length} movers for {countyLabel}
        </p>
      ) : null}
    </div>
  );
}
