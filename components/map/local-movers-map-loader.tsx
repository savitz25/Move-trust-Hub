'use client';

import dynamic from 'next/dynamic';
import { MapSectionSkeleton } from '@/components/map/map-section-skeleton';
import { useInView } from '@/lib/hooks/use-in-view';

const LocalMoversMapSection = dynamic(
  () =>
    import('@/components/map/LocalMoversMapSection').then(
      (m) => m.LocalMoversMapSection
    ),
  { ssr: false, loading: () => <MapSectionSkeleton /> }
);

export function LocalMoversMapLoader() {
  // Below-fold map: wait until near viewport + idle so it never competes with hero LCP
  const { ref, inView } = useInView({
    rootMargin: '80px 0px',
    idleDelay: 2200,
  });

  return (
    <div ref={ref} className="content-auto min-h-[20rem]">
      {inView ? <LocalMoversMapSection /> : <MapSectionSkeleton />}
    </div>
  );
}