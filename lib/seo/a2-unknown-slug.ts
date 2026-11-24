import {
  A2_AUTO_SLUGS,
  A2_CITY_CLUSTER,
  A2_GUIDE_SLUGS,
  A2_ROUTE_SLUGS,
  A2_STATE_SLUGS,
} from '@/lib/seo/a2-catalog-index';

/**
 * HTTP 404 for catalog routes whose generateMetadata used to return a
 * successful metadata object. Those routes are static. notFound() on them
 * is served as HTTP 200 with the homepage canonical.
 * Known pages return null so the existing cache policy stays in place.
 * The slug index is a projection of the catalog modules so this file can run
 * on the Edge without pulling city copy or route essays into middleware.
 * /company/[slug] is database-backed and is not decided here.
 */
export const A2_UNKNOWN_CACHE_CONTROL = 'private, no-store, max-age=0';
export const A2_UNKNOWN_CDN_CACHE_CONTROL = 'no-store';
export const A2_UNKNOWN_ROBOTS = 'noindex, nofollow';

const STATE_PATH = /^\/local-movers\/([a-z0-9-]+)$/;
const GUIDE_PATH = /^\/resources\/guides\/([a-z0-9-]+)$/;
const ROUTE_PATH = /^\/resources\/routes\/([a-z0-9-]+)$/;
const CITY_PATH = /^\/moving-to\/([a-z0-9-]+)$/;
const CITY_IN_STATE_PATH = /^\/moving-to\/([a-z0-9-]+)\/([a-z0-9-]+)$/;
const AUTO_PATH = /^\/auto-transport\/([a-z0-9-]+)$/;

const NO_STORE = {
  cacheControl: A2_UNKNOWN_CACHE_CONTROL,
  cdnCacheControl: A2_UNKNOWN_CDN_CACHE_CONTROL,
};

function exact(pattern: RegExp, pathname: string): RegExpExecArray | null {
  const match = pattern.exec(pathname);
  if (!match || match[0] !== pathname) return null;
  return match;
}

function unresolvedState(pathname: string): boolean {
  const match = exact(STATE_PATH, pathname);
  if (!match) return false;
  return !A2_STATE_SLUGS.has(match[1]);
}

function unresolvedGuide(pathname: string): boolean {
  const match = exact(GUIDE_PATH, pathname);
  if (!match) return false;
  return !A2_GUIDE_SLUGS.has(match[1]);
}

function unresolvedRoute(pathname: string): boolean {
  const match = exact(ROUTE_PATH, pathname);
  if (!match) return false;
  return !A2_ROUTE_SLUGS.has(match[1]);
}

function unresolvedCity(pathname: string): boolean {
  const nested = exact(CITY_IN_STATE_PATH, pathname);
  if (nested) {
    return A2_CITY_CLUSTER[nested[2]] !== nested[1];
  }
  const standalone = exact(CITY_PATH, pathname);
  if (!standalone) return false;
  // /moving-to/florida is the state cluster page, not a city slug.
  if (A2_STATE_SLUGS.has(standalone[1])) return false;
  return !(standalone[1] in A2_CITY_CLUSTER);
}

function unresolvedAuto(pathname: string): boolean {
  const match = exact(AUTO_PATH, pathname);
  if (!match) return false;
  return !A2_AUTO_SLUGS.has(match[1]);
}

export function a2UnknownCacheHeaders(
  pathname: string
): { cacheControl: string; cdnCacheControl: string } | null {
  if (
    unresolvedState(pathname) ||
    unresolvedGuide(pathname) ||
    unresolvedRoute(pathname) ||
    unresolvedCity(pathname) ||
    unresolvedAuto(pathname)
  ) {
    return NO_STORE;
  }
  return null;
}

export function a2UnknownNotFoundHtml(): string {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Page Not Found | Move Trust Hub</title>',
    `<meta name="robots" content="${A2_UNKNOWN_ROBOTS}">`,
    '<meta name="description" content="This page could not be found on Move Trust Hub.">',
    '</head>',
    '<body>',
    '<main>',
    '<h1>Page not found</h1>',
    '<p>This page is not on Move Trust Hub.</p>',
    '</main>',
    '</body>',
    '</html>',
  ].join('');
}
