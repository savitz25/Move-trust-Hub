'use client';

import { createClientLoader } from '@/lib/performance/create-client-loader';
import { useInView } from '@/lib/hooks/use-in-view';

const CompaniesBelowFold = createClientLoader(
  () => import('@/components/directory/companies-below-fold'),
  'CompaniesBelowFold',
);

function BelowFoldPlaceholder() {
  return (
    <div className="mt-10 space-y-8" aria-hidden="true">
      <div className="h-32 rounded-xl border bg-muted/20 animate-pulse" />
      <div className="h-64 rounded-xl border bg-muted/20 animate-pulse" />
    </div>
  );
}

/** Verification panel + review highlights — deferred until near viewport. */
export function CompaniesBelowFoldLoader() {
  const { ref, inView } = useInView({ rootMargin: '320px 0px', idleDelay: 1000 });

  return <div ref={ref}>{inView ? <CompaniesBelowFold /> : <BelowFoldPlaceholder />}</div>;
}