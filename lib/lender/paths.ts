import { hubPath } from '@/lib/hub/paths';

/** Full App Router href under the Lender hub (includes `/lender` prefix). */
export function lenderHref(path: string = '/'): string {
  return hubPath('lender', path);
}

/** Hub-relative path for metadata/canonical helpers (no `/lender` prefix). */
export function lenderMetaPath(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (clean === '/lender' || clean === '/lender/') return '/';
  if (clean.startsWith('/lender/')) return clean.slice('/lender'.length) || '/';
  return clean;
}

const LENDER_ROUTE_ROOTS = [
  '/local-lenders',
  '/fdic-insured-banks',
  '/auto-loan-companies',
  '/calculators',
  '/lenders',
  '/about',
  '/contact',
  '/compare',
  '/credit-repair',
  '/mca-companies',
] as const;

/** Normalize lender links that omit the `/lender` prefix after subdirectory migration. */
export function normalizeLenderHref(href: string): string {
  if (!href.startsWith('/')) return href;
  if (href.startsWith('/lender')) return href;
  if (href === '/') return lenderHref('/');
  for (const root of LENDER_ROUTE_ROOTS) {
    if (href === root || href.startsWith(`${root}/`) || href.startsWith(`${root}#`)) {
      return lenderHref(href);
    }
  }
  return href;
}