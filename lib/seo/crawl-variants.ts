/** Query params that must canonical to the clean URL and must not create indexable variants. */

export const TRACKING_QUERY_PARAMS = ['from', 'fromLabel', 'add', 'q'] as const;

export function urlHasTrackingParam(url: URL): boolean {
  return TRACKING_QUERY_PARAMS.some((key) => url.searchParams.has(key));
}

export function cleanCanonicalUrl(url: URL): string {
  const clean = new URL(url.toString());
  for (const key of TRACKING_QUERY_PARAMS) clean.searchParams.delete(key);
  clean.hash = '';
  return clean.toString();
}

export function isCompareOrVerifyResult(pathname: string, search: string): boolean {
  if (!search || search === '?') return false;
  return pathname === '/compare' || pathname === '/verify-dot';
}
