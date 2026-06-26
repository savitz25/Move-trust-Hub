'use client';

import dynamic from 'next/dynamic';
import { useInView } from '@/lib/hooks/use-in-view';

const HomeBelowFold = dynamic(
  () =>
    import('@/components/home/home-below-fold').then((m) => m.HomeBelowFold),
  { ssr: false }
);

function BelowFoldPlaceholder() {
  return (
    <div className="content-auto" aria-hidden="true">
      <div className="container mx-auto px-4 py-16">
        <div className="h-8 w-64 mx-auto rounded-lg bg-muted/30 animate-pulse mb-8" />
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-48 rounded-xl border bg-muted/20 animate-pulse" />
          ))}
        </div>
      </div>
      <div className="bg-muted/30 py-16 border-y">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-muted/20 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeBelowFoldLoader() {
  const { ref, inView } = useInView({
    rootMargin: '300px 0px',
    idleDelay: 1200,
  });

  return (
    <div ref={ref}>
      {inView ? <HomeBelowFold /> : <BelowFoldPlaceholder />}
    </div>
  );
}