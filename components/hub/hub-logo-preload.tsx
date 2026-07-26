import type { HubId } from '@/lib/hub/types';

/**
 * Intentionally a no-op.
 *
 * Preloading the logo with fetchPriority=high competed with the SSR H1 for LCP
 * on mobile PSI. Header logo loads via normal img (eager only when priority).
 */
export function HubLogoPreload({ hubId: _hubId }: { hubId: HubId }) {
  return null;
}
