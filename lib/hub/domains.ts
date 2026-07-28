/**
 * Multi-domain hosts for the ConsumerTrust Hub monorepo.
 * Insurance is a standalone apex destination; lender still redirects to Move.
 */

export const MOVE_SITE_URL = 'https://www.movetrusthub.com';
export const INSURANCE_SITE_URL = 'https://www.insurancetrusthub.com';
export const LENDER_SITE_URL = 'https://www.lendertrusthub.com';

/** Apex + www hosts that serve InsuranceTrustHub content (no 308 to Move). */
export const INSURANCE_STANDALONE_HOSTS = new Set([
  'insurancetrusthub.com',
  'www.insurancetrusthub.com',
]);

/**
 * Move / lender vertical prefixes — never render on insurancetrusthub.com.
 * These 301 to the Move (or lender) apex with the same path.
 */
export const MOVE_ONLY_PATH_PREFIXES = [
  '/local-movers',
  '/companies',
  '/auto-transport',
  '/moving-to',
  '/verify-dot',
  '/lender',
  '/from-georgia-to-huntsville',
  '/from-georgia-to-huntsville-al',
  '/sitemap-local',
  '/compare',
  '/review',
  '/suggest',
  '/privacy-policy',
  '/terms-of-service',
] as const;

/** Public insurance IA prefixes on the insurance apex (rewritten under /insurance). */
export const INSURANCE_APEX_ALLOW_PREFIXES = [
  '/directory',
  '/providers',
  '/hubs',
  '/tools',
  '/calculators',
  '/data',
  '/resources',
  '/destinations',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/admin',
] as const;

export function normalizeRequestHost(host: string | null | undefined): string {
  if (!host) return '';
  return host.toLowerCase().replace(/:\d+$/, '');
}

export function isInsuranceStandaloneHost(host: string | null | undefined): boolean {
  return INSURANCE_STANDALONE_HOSTS.has(normalizeRequestHost(host));
}

/** True when this path is Move (or lender) vertical content. */
export function isMoveOnlyPath(pathname: string): boolean {
  if (!pathname) return false;
  const path = pathname.toLowerCase();
  for (const prefix of MOVE_ONLY_PATH_PREFIXES) {
    if (path === prefix || path.startsWith(`${prefix}/`)) return true;
  }
  // Move route guides live at /resources/routes/*
  if (path === '/resources/routes' || path.startsWith('/resources/routes/')) return true;
  if (path === '/resources/scams' || path.startsWith('/resources/scams/')) return true;
  return false;
}

/**
 * Paths that should be rewritten under /insurance on the insurance apex.
 * Uses an allowlist for known IA + home; unknown non-move paths still rewrite so
 * 404s use insurance chrome (not Move).
 */
export function shouldRewriteInsurancePath(pathname: string): boolean {
  if (!pathname || pathname === '/') return true;
  if (pathname.startsWith('/insurance')) return false;
  if (pathname.startsWith('/api')) return false;
  if (pathname.startsWith('/_next')) return false;
  if (isMoveOnlyPath(pathname)) return false;
  if (pathname === '/privacy-policy' || pathname === '/terms-of-service') return false;

  for (const prefix of INSURANCE_APEX_ALLOW_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return true;
  }

  // Sitemap / social images on apex
  if (
    pathname === '/sitemap.xml' ||
    pathname === '/sitemap' ||
    pathname === '/opengraph-image' ||
    pathname.startsWith('/opengraph-image/') ||
    pathname === '/twitter-image' ||
    pathname.startsWith('/twitter-image/')
  ) {
    return true;
  }

  // Unknown paths → insurance rewrite (soft 404 with ITH chrome), not Move pages
  return true;
}

/** Map public path on insurance apex → internal Next app path. */
export function insuranceApexToAppPath(pathname: string): string {
  if (pathname === '/' || pathname === '') return '/insurance';
  if (pathname === '/sitemap.xml' || pathname === '/sitemap') return '/insurance/sitemap.xml';
  if (pathname === '/opengraph-image' || pathname.startsWith('/opengraph-image/')) {
    return `/insurance${pathname}`;
  }
  if (pathname === '/twitter-image' || pathname.startsWith('/twitter-image/')) {
    return `/insurance${pathname}`;
  }
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return `/insurance${pathname}`;
  }
  return `/insurance${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

/** Absolute Move URL for a path that must leave the insurance apex. */
export function moveAbsoluteUrl(pathname: string, search = ''): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${MOVE_SITE_URL}${path}${search}`;
}
