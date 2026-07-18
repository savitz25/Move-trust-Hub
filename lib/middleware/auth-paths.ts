/** Routes that require Supabase session refresh or admin cookie checks. */
const AUTH_PATH_PREFIXES = [
  '/admin',
  '/insurance/admin',
  '/lender/admin',
  '/auth',
  '/my-move',
  '/portal',
] as const;
// /my-move/reports is covered by /my-move prefix

/** Cron / mutation APIs — never cache at edge. */
const NO_CACHE_API_PREFIXES = [
  '/api/refresh',
  '/api/chat',
  '/api/send-quote-email',
  '/admin/api',
  '/insurance/admin/api',
  '/lender/admin/api',
] as const;

export function needsAuthSession(pathname: string): boolean {
  return AUTH_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function isNoCacheApi(pathname: string): boolean {
  return NO_CACHE_API_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}