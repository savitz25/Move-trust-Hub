import type { Company } from '@/types';

/** Optional geographic scope for destination-aware directory search. */
export type DirectorySearchScope = {
  stateCode?: string;
  stateName?: string;
  countyLabel?: string;
  /** Mover catalog IDs assigned to this county/region — used for relevance boost. */
  preferredMoverIds?: string[];
  /** When true, only return movers serving the scoped region (still searches full catalog logic). */
  restrictToScope?: boolean;
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function companyMatchesSearchScope(
  company: Company,
  scope?: DirectorySearchScope
): boolean {
  if (!scope) return true;

  if (scope.preferredMoverIds?.length) {
    const id = company.id || company.slug;
    if (scope.preferredMoverIds.includes(id)) return true;
  }

  const hq = normalize(company.headquarters || '');
  const stateCode = scope.stateCode?.toUpperCase();
  const stateName = scope.stateName ? normalize(scope.stateName) : '';

  if (stateCode) {
    const codePattern = new RegExp(`\\b${stateCode.toLowerCase()}\\b`);
    if (codePattern.test(hq) || hq.endsWith(` ${stateCode.toLowerCase()}`)) {
      return true;
    }
  }

  if (stateName && hq.includes(stateName)) return true;

  if (scope.countyLabel) {
    const county = normalize(scope.countyLabel.replace(/county|parish/i, ''));
    if (county && hq.includes(county)) return true;
  }

  return !scope.restrictToScope;
}

export function applyScopeToCompanies(
  companies: Company[],
  scope?: DirectorySearchScope
): Company[] {
  if (!scope?.restrictToScope) return companies;
  return companies.filter((company) => companyMatchesSearchScope(company, scope));
}