const ONE_WEEK = 604_800;

/** Public HTML — browser revalidates, CDN holds full page. */
export function htmlCacheControl(sMaxAge: number): string {
  return `public, max-age=0, s-maxage=${sMaxAge}, stale-while-revalidate=${ONE_WEEK}`;
}

/** Read-only JSON APIs — safe to cache at edge. */
export function apiCacheControl(sMaxAge: number): string {
  return `public, max-age=0, s-maxage=${sMaxAge}, stale-while-revalidate=${ONE_WEEK}`;
}

/** Auth / personalized responses — never cache. */
export const PRIVATE_NO_STORE = 'private, no-store, max-age=0';

/** Immutable build assets. */
export const IMMUTABLE_ASSET = 'public, max-age=31536000, immutable';

/** Vercel CDN-only TTL — mirrors s-maxage without changing browser max-age. */
export function cdnCacheControl(sMaxAge: number): string {
  return `max-age=${sMaxAge}`;
}

/**
 * /florida is force-dynamic with a 6s fail-closed snapshot timeout.
 * Middleware runs before the snapshot, so it cannot distinguish healthy vs
 * timed-out HTML. A 60s CDN TTL lets a timeout recover without a 24h pin
 * while the snapshot itself stays in unstable_cache for 1800s.
 */
export const FLORIDA_HTML_CDN_SECONDS = 60;

/**
 * Path-specific HTML CDN TTL — must stay aligned with vercel.json.
 * Default is DEFAULT_PERFORMANCE_FLAGS.htmlCacheSeconds (86400) for most public HTML.
 */
export function htmlCacheSecondsForPath(pathname: string, defaultSeconds: number): number {
  if (pathname.includes('/share-og')) return 3600;
  if (pathname === '/companies' || pathname.startsWith('/companies/')) return 300;
  if (pathname === '/florida' || pathname === '/new-jersey') return FLORIDA_HTML_CDN_SECONDS;
  return defaultSeconds;
}

/**
 * Company profile HTML must not get a middleware CDN TTL.
 * A 300s CDN cache was storing streamed HTTP 200 "not found" shells (FL-010R).
 * `/companies` index and `/share-og` keep their existing TTLs.
 */
export function shouldApplyMiddlewareHtmlCache(pathname: string): boolean {
  if (pathname.includes('/share-og')) return true;
  if (pathname === '/companies') return true;
  if (pathname.startsWith('/companies/')) return false;
  return true;
}