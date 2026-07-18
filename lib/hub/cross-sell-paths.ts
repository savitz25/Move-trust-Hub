/**
 * Paths where sister-directory cross-sells (Lender / Insurance) must not appear
 * mid-funnel or on conversion-focused Move surfaces.
 */
export function isHighIntentMovePath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;

  const path = pathname.split('?')[0]?.split('#')[0] || '';

  if (path === '/companies' || path.startsWith('/companies/')) return true;
  if (path === '/compare' || path.startsWith('/compare/')) return true;
  if (path === '/auto-transport' || path.startsWith('/auto-transport/')) return true;
  if (path === '/portal' || path.startsWith('/portal/')) return true;
  if (path === '/my-move' || path.startsWith('/my-move/')) return true;

  return false;
}

/** Lower-intent / post-decision surfaces where After Your Move is appropriate. */
export function isAfterYourMoveAllowedPath(pathname: string | null | undefined): boolean {
  if (!pathname) return true;
  return !isHighIntentMovePath(pathname);
}