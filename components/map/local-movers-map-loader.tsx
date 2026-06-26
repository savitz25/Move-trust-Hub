'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { MapSectionSkeleton } from '@/components/map/map-section-skeleton';

const LocalMoversMapSection = dynamic(
  () =>
    import('@/components/map/LocalMoversMapSection').then(
      (m) => m.LocalMoversMapSection
    ),
  { ssr: false, loading: () => <MapSectionSkeleton /> }
);

export function LocalMoversMapLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? <LocalMoversMapSection /> : <MapSectionSkeleton />}
    </div>
  );
}