'use client';

import type { PerformanceFlags } from '@/lib/edge-config/types';
import { DeferredGtag } from '@/components/performance/deferred-gtag';
import { DeferredAnalytics } from '@/components/performance/deferred-analytics';
import { DeferredHubAnalytics } from '@/components/hub/deferred-hub-analytics';
import { DeferredWidgets } from '@/components/performance/deferred-widgets';

/**
 * Single mount for third-party scripts — all deferred off the PSI critical path.
 * Load order: gtag stub → hub page_view → Vercel analytics → widgets.
 */
export function ThirdPartyOrchestrator({ flags }: { flags: PerformanceFlags }) {
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