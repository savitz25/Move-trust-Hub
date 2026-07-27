import type { HubId } from '@/lib/hub/types';
import { INSURANCE_SITE_URL, MOVE_SITE_URL } from '@/lib/hub/domains';

export const HUB_HEADER = 'x-trust-hub';
export const PATHNAME_HEADER = 'x-pathname';
export const HUB_COOKIE = 'mth-hub';
export const PATHNAME_COOKIE = 'mth-pathname';

/**
 * Detect active hub from pathname (works in middleware, server, and client).
 * Prefer HUB_HEADER / layout hubId on insurancetrusthub.com (bare paths).
 */
export function getHubFromPathname(pathname: string): HubId {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (normalized === '/lender' || normalized.startsWith('/lender/')) return 'lender';
  if (normalized === '/insurance' || normalized.startsWith('/insurance/')) {
    return 'insurance';
  }
  return 'move';
}

/**
 * Build a public path within a hub.
 * - Move: bare paths
 * - Lender: `/lender/...`
 * - Insurance: bare apex paths on insurancetrusthub.com (no `/insurance` prefix).
 *   Admin stays under `/insurance/admin` (shared monorepo isolation).
 */
export function hubPath(hub: HubId, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (hub === 'move') return clean === '/' ? '/' : clean;
  if (hub === 'insurance') {
    if (clean === '/admin' || clean.startsWith('/admin/')) {
      return `/insurance${clean}`;
    }
    return clean === '/' ? '/' : clean;
  }
  // lender
  if (clean === '/') return '/lender';
  return `/lender${clean}`;
}

/**
 * Canonical absolute URL for a hub-relative path.
 * Insurance uses insurancetrusthub.com with bare public paths (no /insurance prefix).
 * Move and lender remain on movetrusthub.com (lender still under /lender).
 */
export function hubCanonicalUrl(hub: HubId, path: string = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;

  if (hub === 'insurance') {
    const relative = clean === '/' ? '' : clean;
    return relative ? `${INSURANCE_SITE_URL}${relative}` : INSURANCE_SITE_URL;
  }

  const site = MOVE_SITE_URL;
  const appPath = hubPath(hub, clean);
  return appPath === '/' ? site : `${site}${appPath}`;
}

/**
 * Metadata and canonical builders expect hub-relative paths (`/resources/foo`).
 * Strip an accidental `/insurance` or `/lender` prefix when pages pass full app paths.
 */
export function normalizeHubMetadataPath(hub: HubId, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (hub === 'move') return clean;
  const prefix = hub === 'lender' ? '/lender' : '/insurance';
  if (clean === prefix) return '/';
  if (clean.startsWith(`${prefix}/`)) {
    return clean.slice(prefix.length) || '/';
  }
  return clean;
}

/** Strip hub prefix from pathname for breadcrumb / active-link matching. */
export function stripHubPrefix(hub: HubId, pathname: string): string {
  if (hub === 'move') return pathname || '/';
  if (hub === 'insurance') {
    // Public apex paths are already bare
    if (pathname === '/insurance' || pathname.startsWith('/insurance/')) {
      if (pathname === '/insurance') return '/';
      return pathname.slice('/insurance'.length) || '/';
    }
    return pathname || '/';
  }
  const base = '/lender';
  if (pathname === base) return '/';
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || '/';
  return pathname;
}
