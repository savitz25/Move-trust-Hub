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
  const { ref, inView } = useInView({
    rootMargin: '200px 0px',
    idleDelay: 1000,
  });

  return (
    <div ref={ref}>
      {inView ? <LocalMoversMapSection /> : <MapSectionSkeleton />}
    </div>
  );
}