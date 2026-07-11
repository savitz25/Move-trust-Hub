import { Suspense } from 'react';
import type { Lender } from '@/lib/lender/mockData';
import { MortgageLenderDirectory } from '@/components/lender/mortgage-lender-directory';

function DirectorySkeleton() {
  return (
    <section className="border-t bg-card py-12 md:py-16" aria-hidden="true">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mx-auto h-4 w-40 animate-pulse rounded bg-muted" />
          <div className="mx-auto mt-4 h-10 w-96 max-w-full animate-pulse rounded bg-muted" />
        </div>
        <div className="mx-auto h-14 max-w-3xl animate-pulse rounded-xl bg-muted" />
        <div className="mx-auto mt-8 max-w-3xl space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function MortgageLenderDirectoryBoundary({ lenders }: { lenders: Lender[] }) {
  return (
    <Suspense fallback={<DirectorySkeleton />}>
      <MortgageLenderDirectory lenders={lenders} />
    </Suspense>
  );
}