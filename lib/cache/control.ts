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