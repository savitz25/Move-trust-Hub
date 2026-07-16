'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';
import type { HubId } from '@/lib/hub/types';

/** Interaction-first on mobile PSI — avoids layout shifts before LCP settles. */
const UX_DEFER = {
  idleTimeout: 4000,
  maxWait: 12000,
  includeScroll: false,
  interactionOnly: false,
} as const;

const LegacyWelcomeBanner = dynamic(
  () => import('@/components/hub/legacy-welcome-banner').then((m) => m.LegacyWelcomeBanner),
  { ssr: false }
);

const MoveCoachTip = dynamic(
  () => import('@/components/ux/move-coach-tip').then((m) => m.MoveCoachTip),
  { ssr: false }
);

const JourneyTracker = dynamic(
  () => import('@/components/ux/journey-tracker').then((m) => m.JourneyTracker),
  { ssr: false }
);

const MoveTipsOptIn = dynamic(
  () => import('@/components/conversion/move-tips-opt-in').then((m) => m.MoveTipsOptIn),
  { ssr: false }
);

function useUxReady() {
  return useDeferredLoad(UX_DEFER);
}

export function DeferredLegacyWelcomeBanner({ hubId }: { hubId: HubId }) {
  const ready = useUxReady();
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <LegacyWelcomeBanner hubId={hubId} />
    </Suspense>
  );
}

export function DeferredMoveCoachTip({ hub }: { hub: HubId }) {
  const ready = useUxReady();
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <MoveCoachTip hub={hub} />
    </Suspense>
  );
}

export function DeferredJourneyTracker({ hub }: { hub: HubId }) {
  const ready = useUxReady();
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <JourneyTracker hub={hub} />
    </Suspense>
  );
}

export function DeferredMoveTipsOptIn() {
  const ready = useUxReady();
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <MoveTipsOptIn />
    </Suspense>
  );
}