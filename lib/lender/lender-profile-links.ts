import { hubPath } from '@/lib/hub/paths';

/** Only allow in-app lender hub return paths (prevents open redirects). */
export function sanitizeLenderReturnPath(from: string | null | undefined): string | null {
  if (!from) return null;
  try {
    const decoded = decodeURIComponent(from);
    if (!decoded.startsWith('/lender')) return null;
    if (decoded.includes('://') || decoded.startsWith('//')) return null;
    return decoded;
  } catch {
    return null;
  }
}

export function buildLenderProfileHref(
  slug: string,
  returnPath?: string | null
): string {
  const base = `/lender/lenders/${slug}`;
  const safeReturn = sanitizeLenderReturnPath(returnPath ?? null);
  if (!safeReturn) return base;
  const params = new URLSearchParams({ from: safeReturn });
  return `${base}?${params.toString()}`;
}

export function buildLenderSearchReturnPath(
  basePath: '/' | '/local-lenders',
  searchQuery: string
): string {
  const params = new URLSearchParams({ search: searchQuery.trim() });
  return `${hubPath('lender', basePath)}?${params.toString()}#lender-search-results`;
}