'use client';

import dynamic from 'next/dynamic';
import { MapSkeleton } from '@/components/map/MapSkeleton';
import type { MapStateMeta } from '@/lib/map/types';

const InteractiveUSMap = dynamic(
  () => import('@/components/map/InteractiveUSMap').then((m) => m.InteractiveUSMap),
  { ssr: false, loading: () => <MapSkeleton /> }
);

type Props = {
  statesMeta: MapStateMeta[];
  viewMode?: 'all' | 'curated';
  onViewModeChange?: (mode: 'all' | 'curated') => void;
  hideCoverageToggle?: boolean;
};

export function LocalMoversMapLazy({
  statesMeta,
  viewMode,
  onViewModeChange,
  hideCoverageToggle,
}: Props) {
  return (
    <InteractiveUSMap
      statesMeta={statesMeta}
      viewMode={viewMode}
      onViewModeChange={onViewModeChange}
      hideCoverageToggle={hideCoverageToggle}
    />
  );
}
