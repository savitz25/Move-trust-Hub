'use client';

import dynamic from 'next/dynamic';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';

const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((m) => m.SpeedInsights),
  { ssr: false },
);

/** Speed Insights — lowest priority; loads after analytics or on long idle. */
export function DeferredSpeedInsights({
  interactionOnly = true,
}: {
  interactionOnly?: boolean;
}) {
  const ready = useDeferredLoad({
    idleTimeout: 12_000,
    maxWait: 45_000,
    interactionOnly,
  });

  if (!ready) return null;
  return <SpeedInsights />;
}