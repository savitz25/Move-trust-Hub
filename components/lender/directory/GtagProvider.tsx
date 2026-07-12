'use client';

import { DeferredGtag } from '@/components/performance/deferred-gtag';

/**
 * @deprecated Use root `ThirdPartyOrchestrator` + `DeferredGtag` instead.
 * Kept for lender directory docs — never loads gtag at `afterInteractive`.
 */
export function GtagProvider() {
  return <DeferredGtag interactionOnly />;
}