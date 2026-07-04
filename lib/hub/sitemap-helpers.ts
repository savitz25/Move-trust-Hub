import { hubCanonicalUrl } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

/** Build absolute sitemap URL for a hub-relative path (always one prefix). */
export function hubSitemapEntry(
  hub: HubId,
  path: string,
  meta: {
    lastModified?: Date | string;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
  } = {}
) {
  const hubRelative = path.replace(/^\/insurance/, '').replace(/^\/lender/, '') || '/';
  return {
    url: hubCanonicalUrl(hub, hubRelative.startsWith('/') ? hubRelative : `/${hubRelative}`),
    lastModified: meta.lastModified ?? new Date(),
    changeFrequency: meta.changeFrequency ?? ('weekly' as const),
    priority: meta.priority ?? 0.8,
  };
}