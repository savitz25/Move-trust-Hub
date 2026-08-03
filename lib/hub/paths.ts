import type { HubId } from '@/lib/hub/types';
import {
  INSURANCE_SITE_URL,
  LENDER_SITE_URL,
  MOVE_SITE_URL,
} from '@/lib/hub/domains';

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

/** Normalize a path for hubPath / hubCanonicalUrl (leading slash, strip accidental hub prefix). */
function normalizePathForHub(hub: HubId, path: string): string {
  let clean = path.startsWith('/') ? path : `/${path}`;
  if (hub === 'lender') {
    if (clean === '/lender') return '/';
    if (clean.startsWith('/lender/')) return clean.slice('/lender'.length) || '/';
  }
  if (hub === 'insurance') {
    if (clean === '/insurance') return '/';
    if (clean.startsWith('/insurance/')) {
      // Keep monorepo admin isolation under /insurance/admin
      if (clean === '/insurance/admin' || clean.startsWith('/insurance/admin/')) {
        return clean.slice('/insurance'.length) || '/';
      }
      return clean.slice('/insurance'.length) || '/';
    }
  }
  return clean;
}

/**
 * Build a public path within a hub.
 * - Move: bare relative paths on movetrusthub.com
 * - Lender: absolute URLs on https://www.lendertrusthub.com (standalone)
 * - Insurance: absolute URLs on https://www.insurancetrusthub.com (standalone)
 *   Monorepo admin stays under relative `/insurance/admin` (Move project only).
 */
export function hubPath(hub: HubId, path: string): string {
  const clean = normalizePathForHub(hub, path);
  if (hub === 'move') return clean === '/' ? '/' : clean;
  if (hub === 'insurance') {
    // Admin remains on the Move monorepo host (not the ITH apex).
    if (clean === '/admin' || clean.startsWith('/admin/')) {
      return `/insurance${clean}`;
    }
    if (clean === '/') return `${INSURANCE_SITE_URL}/`;
    return `${INSURANCE_SITE_URL}${clean}`;
  }
  // lender → standalone apex (absolute). Next.js <Link> supports external https URLs.
  if (clean === '/') return `${LENDER_SITE_URL}/`;
  return `${LENDER_SITE_URL}${clean}`;
}

/**
 * Canonical absolute URL for a hub-relative path.
 * - Insurance: insurancetrusthub.com (bare public paths)
 * - Lender: lendertrusthub.com (bare public paths)
 * - Move: movetrusthub.com
 */
export function hubCanonicalUrl(hub: HubId, path: string = '/'): string {
  const clean = normalizePathForHub(hub, path);

  if (hub === 'insurance') {
    const relative = clean === '/' ? '' : clean;
    return relative ? `${INSURANCE_SITE_URL}${relative}` : INSURANCE_SITE_URL;
  }

  if (hub === 'lender') {
    const relative = clean === '/' ? '' : clean;
    return relative ? `${LENDER_SITE_URL}${relative}` : LENDER_SITE_URL;
  }

  const appPath = hubPath('move', clean);
  return appPath === '/' ? MOVE_SITE_URL : `${MOVE_SITE_URL}${appPath}`;
}

/**
 * Metadata and canonical builders expect hub-relative paths (`/resources/foo`).
 * Strip an accidental `/insurance` or `/lender` prefix when pages pass full app paths.
 */
export function normalizeHubMetadataPath(hub: HubId, path: string): string {
  return normalizePathForHub(hub, path);
}

/** Strip hub prefix from pathname for breadcrumb / active-link matching. */
export function stripHubPrefix(hub: HubId, pathname: string): string {
  if (hub === 'move') return pathname || '/';
  if (hub === 'insurance') {
    if (pathname === '/insurance' || pathname.startsWith('/insurance/')) {
      if (pathname === '/insurance') return '/';
      return pathname.slice('/insurance'.length) || '/';
    }
    return pathname || '/';
  }
  // lender: monorepo residual /lender/* or already-bare LTH paths
  if (pathname === '/lender') return '/';
  if (pathname.startsWith('/lender/')) return pathname.slice('/lender'.length) || '/';
  return pathname || '/';
}

/** True when href is an absolute external URL (e.g. standalone LTH). */
export function isExternalHubHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
