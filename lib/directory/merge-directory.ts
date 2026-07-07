import type { Company } from '@/types';

function dedupeKey(company: Company): string {
  const dot = company.usdotNumber?.replace(/\D/g, '');
  if (dot && dot.length >= 5) return `dot:${dot}`;
  const slug = (company.slug || company.id || '').trim().toLowerCase();
  if (slug) return `slug:${slug}`;
  return `name:${company.name.trim().toLowerCase()}`;
}

/**
 * Merge interstate directory companies with supplemental catalog movers.
 * Directory rows win on duplicate USDOT/slug (richer profile data).
 */
export function mergeDirectoryCompanies(
  directoryCompanies: Company[],
  catalogCompanies: Company[]
): Company[] {
  const map = new Map<string, Company>();

  for (const company of directoryCompanies) {
    map.set(dedupeKey(company), company);
  }

  for (const company of catalogCompanies) {
    const key = dedupeKey(company);
    if (!map.has(key)) {
      map.set(key, company);
    }
  }

  return [...map.values()];
}