'use client';

import { Search } from 'lucide-react';
import { LenderCard } from '@/components/lender/LenderCard';
import { useLenderSearch } from '@/components/lender/lender-search-context';
import { Button } from '@/components/ui/button';
import { buildLenderSearchReturnPath } from '@/lib/lender/lender-profile-links';

const PREVIEW_COUNT = 12;

type Props = {
  showPreview?: boolean;
  compact?: boolean;
};

export function LenderSearchResults({ showPreview = true, compact = false }: Props) {
  const { hasQuery, results, totalCount, clear, activeQuery, basePath } = useLenderSearch();
  const profileReturnPath = hasQuery
    ? buildLenderSearchReturnPath(basePath, activeQuery)
    : undefined;

  if (!hasQuery && !showPreview) return null;

  const displayResults = hasQuery ? results : results.slice(0, PREVIEW_COUNT);

  return (
    <section
      id="lender-search-results"
      className={`scroll-mt-24 ${compact ? 'py-8' : 'border-t bg-card py-12 md:py-16'}`}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          {!compact ? (
            <h2 className="text-2xl font-bold text-[#0A2540] md:text-3xl">Verified Mortgage Lenders</h2>
          ) : null}
          <p className={`text-sm text-zinc-600 ${compact ? '' : 'mt-2'}`} role="status" aria-live="polite">
            {hasQuery ? (
              <>
                Showing {results.length.toLocaleString()} lender{results.length !== 1 ? 's' : ''}
                {activeQuery ? <> matching &ldquo;{activeQuery}&rdquo;</> : null}
              </>
            ) : (
              <>Top {PREVIEW_COUNT} of {totalCount.toLocaleString()} lenders — search above to find more</>
            )}
          </p>
          {hasQuery ? (
            <Button type="button" variant="outline" size="sm" className="mt-3" onClick={clear}>
              Clear search
            </Button>
          ) : null}
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {displayResults.length > 0 ? (
            displayResults.map((lender, index) => (
              <LenderCard
                key={lender.id}
                lender={lender}
                rank={index + 1}
                countyLabel={`${lender.county} County, ${lender.state}`}
                profileReturnPath={profileReturnPath}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-200 bg-white px-6 py-12 text-center">
              <Search className="mx-auto mb-4 h-10 w-10 text-[#3B82F6]/60" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-[#0A2540]">No lenders found</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
                Try a different lender name, city, state, or loan type like FHA or VA.
              </p>
              <Button type="button" variant="outline" className="mt-6" onClick={clear}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}