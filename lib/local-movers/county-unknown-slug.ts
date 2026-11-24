import { getCounty } from '@/lib/local-movers/geography';

/**
 * Cache headers for a county URL that is not in the geography list.
 * Known counties keep the existing middleware and ISR policy.
 * Application revalidatePath does not expire a CDN object stored under
 * CDN-Cache-Control max-age=86400, so a miss must not enter that cache.
 */
export const UNRESOLVED_COUNTY_CACHE_CONTROL = 'private, no-store, max-age=0';
export const UNRESOLVED_COUNTY_CDN_CACHE_CONTROL = 'no-store';

const COUNTY_PATH = /^\/local-movers\/([a-z0-9-]+)\/([a-z0-9-]+)$/;

export function isUnresolvedCountySlug(stateSlug: string, countySlug: string): boolean {
  return getCounty(stateSlug, countySlug) == null;
}

export function unresolvedCountyCacheHeaders(
  pathname: string
): { cacheControl: string; cdnCacheControl: string } | null {
  const match = COUNTY_PATH.exec(pathname);
  if (!match || match[0] !== pathname) return null;
  if (!isUnresolvedCountySlug(match[1], match[2])) return null;
  return {
    cacheControl: UNRESOLVED_COUNTY_CACHE_CONTROL,
    cdnCacheControl: UNRESOLVED_COUNTY_CDN_CACHE_CONTROL,
  };
}

/**
 * Document served by middleware for an unknown county slug.
 * The county route is force-static. notFound() there is prerendered and
 * next start serves that prerender as HTTP 200 with the root canonical.
 * This document is the 404 itself: one robots directive, no canonical.
 */
export const UNRESOLVED_COUNTY_ROBOTS = 'noindex, nofollow';

export function unresolvedCountyNotFoundHtml(): string {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Page Not Found | Move Trust Hub</title>',
    `<meta name="robots" content="${UNRESOLVED_COUNTY_ROBOTS}">`,
    '<meta name="description" content="This county page could not be found on Move Trust Hub.">',
    '</head>',
    '<body>',
    '<main>',
    '<h1>Page not found</h1>',
    '<p>This county page is not on Move Trust Hub.</p>',
    '</main>',
    '</body>',
    '</html>',
  ].join('');
}
