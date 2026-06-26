'use client';

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
  return <LocalMoversMapSection />;
}