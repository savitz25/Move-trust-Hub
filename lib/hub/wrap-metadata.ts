import type { Metadata } from 'next';
import { buildHubMetadata } from '@/lib/hub/metadata';
import type { HubId } from '@/lib/hub/types';

/** Bridge standalone hub SEO helpers into subdirectory canonicals. */
export function wrapHubPageMetadata(
  hub: HubId,
  input: { title: string; description: string; path: string; keywords?: string[] }
): Metadata {
  const cleanPath = input.path.startsWith('/') ? input.path : `/${input.path}`;
  return buildHubMetadata(hub, {
    title: input.title,
    description: input.description,
    path: cleanPath,
    keywords: input.keywords,
  });
}