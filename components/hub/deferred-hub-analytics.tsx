'use client';

import dynamic from 'next/dynamic';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';

const HubAnalytics = dynamic(
  () => import('@/components/hub/hub-analytics').then((m) => m.HubAnalytics),
  { ssr: false }
);

export function DeferredHubAnalytics({
  interactionOnly = true,
}: {
  interactionOnly?: boolean;
}) {
  const ready = useDeferredLoad({
    idleTimeout: 7_000,
    maxWait: 28_000,
    interactionOnly,
  });

  if (!ready) return null;

  return <HubAnalytics />;
}