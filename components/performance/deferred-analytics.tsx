'use client';

import dynamic from 'next/dynamic';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';
import { DeferredSpeedInsights } from '@/components/performance/deferred-speed-insights';

const Analytics = dynamic(
  () => import('@vercel/analytics/next').then((m) => m.Analytics),
  { ssr: false },
);

export function DeferredAnalytics({
  interactionOnly = true,
}: {
  interactionOnly?: boolean;
}) {
  const ready = useDeferredLoad({
    idleTimeout: 6_000,
    maxWait: 25_000,
    interactionOnly,
  });

  if (!ready) return null;

  return (
    <>
      <Analytics />
      <DeferredSpeedInsights interactionOnly={interactionOnly} />
    </>
  );
}