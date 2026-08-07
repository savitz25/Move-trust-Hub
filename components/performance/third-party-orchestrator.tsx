'use client';

import { useEffect, useState } from 'react';
import type { PerformanceFlags } from '@/lib/edge-config/types';
import { DEFAULT_PERFORMANCE_FLAGS } from '@/lib/edge-config/types';
import { DeferredAnalytics } from '@/components/performance/deferred-analytics';
import { DeferredWidgets } from '@/components/performance/deferred-widgets';

/**
 * Non-GA third parties (Vercel Analytics, chatbot) stay deferred for PSI.
 * GA4 loads once via GoogleAnalyticsRoot (idle/lazyOnload) — never re-mount
 * DeferredGtag here (avoids double-loading).
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