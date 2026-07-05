/** Routes that require Supabase session refresh or admin cookie checks. */
const AUTH_PATH_PREFIXES = ['/admin', '/insurance/admin', '/lender/admin'] as const;

export function needsAuthSession(pathname: string): boolean {
  return AUTH_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}