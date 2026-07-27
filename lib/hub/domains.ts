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

export function normalizeRequestHost(host: string | null | undefined): string {
  if (!host) return '';
  return host.toLowerCase().replace(/:\d+$/, '');
}

export function isInsuranceStandaloneHost(host: string | null | undefined): boolean {
  return INSURANCE_STANDALONE_HOSTS.has(normalizeRequestHost(host));
}

/**
 * Paths that must NOT be rewritten under /insurance on the insurance apex.
 * Shared assets and Next internals stay at the monorepo root.
 */
export function shouldRewriteInsurancePath(pathname: string): boolean {
  if (!pathname || pathname === '/') return true;
  if (pathname.startsWith('/insurance')) return false;
  if (pathname.startsWith('/lender')) return false;
  if (pathname.startsWith('/api')) return false;
  if (pathname.startsWith('/_next')) return false;
  if (pathname.startsWith('/admin')) return false;
  // Root legal on Move only — insurance has its own /privacy and /terms under the hub.
  if (pathname === '/privacy-policy' || pathname === '/terms-of-service') return false;
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
  return `/insurance${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}
