import { hubPath } from '@/lib/hub/paths';
import { getCountyFromZip } from '@/lib/lender/lenders';

export function isLenderZipQuery(value: string): boolean {
  return /^\d{5}$/.test(value.trim());
}

export function resolveLenderZipTarget(zip: string): string {
  const county = getCountyFromZip(zip);
  if (county) {
    return `${hubPath('lender', `/local-lenders/${county.stateSlug}/${county.countySlug}`)}?zip=${zip}`;
  }
  return `${hubPath('lender', '/local-lenders')}?zip=${zip}`;
}

export function resolveLenderNameResultsPath(
  query: string,
  basePath: '/local-lenders' | '/' = '/local-lenders'
): string {
  const params = new URLSearchParams({ search: query.trim() });
  return `${hubPath('lender', basePath)}?${params.toString()}`;
}