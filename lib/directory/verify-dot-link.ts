import type { ParsedCarrierNumber } from '@/lib/verify-dot/schema';

/** Build /verify-dot URL with the user's search term pre-filled. */
export function buildVerifyDotHref(
  searchTerm: string,
  parsedCarrier?: ParsedCarrierNumber | null
): string {
  const q = (parsedCarrier?.display ?? searchTerm).trim();
  if (!q) return '/verify-dot';
  const params = new URLSearchParams({ q });
  return `/verify-dot?${params.toString()}`;
}

export function buildCompaniesSearchHref(searchTerm: string): string {
  const q = searchTerm.trim();
  if (!q) return '/companies';
  return `/companies?${new URLSearchParams({ search: q }).toString()}`;
}