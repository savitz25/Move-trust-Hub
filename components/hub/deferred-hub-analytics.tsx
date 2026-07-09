'use client';

import dynamic from 'next/dynamic';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';

const HubAnalytics = dynamic(
  () => import('@/components/hub/hub-analytics').then((m) => m.HubAnalytics),
  { ssr: false }
);

export function DeferredHubAnalytics() {
  const ready = useDeferredLoad({ idleTimeout: 1500, maxWait: 5000 });

  if (!ready) return null;

  return <HubAnalytics />;
}