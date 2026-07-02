import type { HubId } from '@/lib/hub/types';

export const HUB_HEADER = 'x-trust-hub';

/** Detect active hub from pathname (works in middleware, server, and client). */
export function getHubFromPathname(pathname: string): HubId {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (normalized === '/lender' || normalized.startsWith('/lender/')) return 'lender';
  if (normalized === '/insurance' || normalized.startsWith('/insurance/')) {
    return 'insurance';
  }
  return 'move';
}

/** Build an absolute app path within a hub. Move hub paths have no prefix. */
export function hubPath(hub: HubId, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (hub === 'move') return clean === '/' ? '/' : clean;
  const base = hub === 'lender' ? '/lender' : '/insurance';
  if (clean === '/') return base;
  return `${base}${clean}`;
}

/** Canonical URL on movetrusthub.com for a hub-relative path. */
export function hubCanonicalUrl(hub: HubId, path: string = '/'): string {
  const site = 'https://www.movetrusthub.com';
  const appPath = hubPath(hub, path);
  return appPath === '/' ? site : `${site}${appPath}`;
}

/** Strip hub prefix from pathname for breadcrumb / active-link matching. */
export function stripHubPrefix(hub: HubId, pathname: string): string {
  if (hub === 'move') return pathname || '/';
  const base = hub === 'lender' ? '/lender' : '/insurance';
  if (pathname === base) return '/';
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || '/';
  return pathname;
}