import { cache } from 'react';
import { resolveHubLegacyPath } from '@/lib/migration/hub-legacy-resolver';
import type { HubId } from '@/lib/hub/types';

/**
 * Per-request dedupe for [[...legacy]] catch-all:
 * generateMetadata + page both call the resolver once.
 */
export const resolveHubLegacyPathCached = cache(
  (hub: HubId, legacy: string[] | undefined) => resolveHubLegacyPath(hub, legacy),
);