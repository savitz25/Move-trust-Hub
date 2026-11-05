/**
 * Move-host /lender and /local-lenders URLs.
 * 308 when the stripped path is on the Lender sitemap. Otherwise 410.
 */

import { LENDER_SITE_URL } from '@/lib/hub/domains';
import { LENDER_EQUIVALENT_PATHS } from '@/lib/seo/lender-equivalent-paths';

const EQUIVALENT = new Set<string>(LENDER_EQUIVALENT_PATHS);

export type MoveLenderLegacyDecision =
  | { status: 308; destination: string }
  | { status: 410 };

function normalizePath(pathname: string): string {
  const bare = pathname.split('?')[0] || '/';
  if (bare.length > 1 && bare.endsWith('/')) return bare.slice(0, -1);
  return bare || '/';
}

export function lenderHasEquivalentPath(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (path === '/') return EQUIVALENT.has('/') || EQUIVALENT.has('');
  return EQUIVALENT.has(path);
}

function destinationFor(pathname: string): string {
  const path = normalizePath(pathname);
  return path === '/' ? `${LENDER_SITE_URL}/` : `${LENDER_SITE_URL}${path}`;
}

/**
 * Returns null when the path is not a Move-host lender legacy URL.
 */
export function moveLenderLegacyDecision(pathname: string): MoveLenderLegacyDecision | null {
  const path = normalizePath(pathname);

  if (path === '/local-lenders' || path.startsWith('/local-lenders/')) {
    return lenderHasEquivalentPath(path)
      ? { status: 308, destination: destinationFor(path) }
      : { status: 410 };
  }

  if (path !== '/lender' && !path.startsWith('/lender/')) return null;

  let bare = '/';
  if (path === '/lender') {
    bare = '/';
  } else if (path === '/lender/lender' || path.startsWith('/lender/lender/')) {
    bare = normalizePath(path.replace(/^\/lender\/lender(?=\/|$)/, '') || '/');
  } else {
    bare = normalizePath(path.slice('/lender'.length) || '/');
  }

  if (!lenderHasEquivalentPath(bare)) return { status: 410 };
  return { status: 308, destination: destinationFor(bare) };
}
