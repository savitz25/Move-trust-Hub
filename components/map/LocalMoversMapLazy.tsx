'use client';

import dynamic from 'next/dynamic';
import { MapSkeleton } from '@/components/map/MapSkeleton';
import type { MapStateMeta } from '@/lib/map/types';

const InteractiveUSMap = dynamic(
  () => import('@/components/map/InteractiveUSMap').then((m) => m.InteractiveUSMap),
  { ssr: false, loading: () => <MapSkeleton /> }
);

export function LocalMoversMapLazy({ statesMeta }: { statesMeta: MapStateMeta[] }) {
  return <InteractiveUSMap statesMeta={statesMeta} />;
}