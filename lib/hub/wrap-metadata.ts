import type { Metadata } from 'next';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { normalizeHubMetadataPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

/** Bridge standalone hub SEO helpers into subdirectory canonicals. */
export function wrapHubPageMetadata(
  hub: HubId,
  input: { title: string; description: string; path: string; keywords?: string[] }
): Metadata {
  const cleanPath = normalizeHubMetadataPath(hub, input.path);
  return buildHubMetadata(hub, {
    title: input.title,
    description: input.description,
    path: cleanPath,
    keywords: input.keywords,
  });
}