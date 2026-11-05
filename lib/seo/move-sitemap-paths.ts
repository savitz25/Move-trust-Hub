/** Paths that must never appear in a Move-host sitemap. */

const FORBIDDEN_PREFIXES = ['/lender', '/insurance', '/local-lenders', '/api/auth/network-handoff'] as const;

export function isForbiddenMoveSitemapPath(path: string): boolean {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/lender' || normalized === '/insurance' || normalized === '/local-lenders') {
    return true;
  }
  return FORBIDDEN_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`) || normalized.startsWith(`${prefix}?`)
  );
}

export function assertMoveSitemapPathsAllowed(paths: readonly string[]): string[] {
  return paths.filter((path) => isForbiddenMoveSitemapPath(path.split('?')[0] ?? path));
}
