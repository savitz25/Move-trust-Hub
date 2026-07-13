import { hubCanonicalUrl } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import type { MetadataRoute } from 'next';

/** Legacy insurance hub-relative paths that 301 elsewhere — omit from sitemap. */
export const INSURANCE_SITEMAP_REDIRECT_PATHS = new Set(['/hubs/south-florida']);

const HUB_ADMIN_PREFIX: Record<Exclude<HubId, 'move'>, string> = {
  insurance: '/insurance/admin',
  lender: '/lender/admin',
};

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

/** Drop duplicate URLs and any admin / redirect paths before returning a hub sitemap. */
export function finalizeHubSitemap(
  hub: HubId,
  entries: MetadataRoute.Sitemap
): MetadataRoute.Sitemap {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;

    const pathname = entry.url.replace(/^https?:\/\/[^/]+/, '') || '/';

    if (hub !== 'move') {
      const adminPrefix = HUB_ADMIN_PREFIX[hub];
      if (pathname === adminPrefix || pathname.startsWith(`${adminPrefix}/`)) {
        return false;
      }
    }

    if (hub === 'insurance') {
      const hubRelative = pathname.replace(/^\/insurance/, '') || '/';
      if (INSURANCE_SITEMAP_REDIRECT_PATHS.has(hubRelative)) {
        return false;
      }
    }

    seen.add(entry.url);
    return true;
  });
}