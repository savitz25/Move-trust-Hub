'use client';

import { useEffect, useState } from 'react';
import type { PerformanceFlags } from '@/lib/edge-config/types';
import { DEFAULT_PERFORMANCE_FLAGS } from '@/lib/edge-config/types';
import { DeferredGtag } from '@/components/performance/deferred-gtag';
import { DeferredAnalytics } from '@/components/performance/deferred-analytics';
import { DeferredHubAnalytics } from '@/components/hub/deferred-hub-analytics';
import { DeferredWidgets } from '@/components/performance/deferred-widgets';

/**
 * Single mount for third-party scripts — all deferred off the PSI critical path.
 * Flags load client-side so the root layout does not block on Edge Config.
 */
export function ThirdPartyOrchestrator({
  flags: initialFlags,
}: {
  flags?: PerformanceFlags;
}) {
  const [flags, setFlags] = useState(initialFlags ?? DEFAULT_PERFORMANCE_FLAGS);

  useEffect(() => {
    if (initialFlags) return;
    void fetch('/api/performance-flags')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: PerformanceFlags | null) => {
        if (data) setFlags(data);
      })
      .catch(() => {});
  }, [initialFlags]);

  const interactionOnly = flags.deferThirdPartyUntilInteraction;

  return (
    <>
      {flags.enableGtag ? <DeferredGtag interactionOnly={interactionOnly} /> : null}
      {flags.enableHubAnalytics ? (
        <DeferredHubAnalytics interactionOnly={interactionOnly} />
      ) : null}
      {flags.enableVercelAnalytics ? (
        <DeferredAnalytics interactionOnly={interactionOnly} />
      ) : null}
      <DeferredWidgets
        enableChatbot={flags.enableChatbot}
        interactionOnly={interactionOnly}
      />
    </>
  );
}