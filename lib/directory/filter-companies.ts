import {
  companyGeoPriorityScore,
  companyIsLocal,
  companyMatchesCoverageFilter,
  normalizeCoverageFilter,
  shouldPrioritizeLocalMoversInCoverage,
  extractStateCodeFromHeadquarters,
} from '@/lib/directory/coverage-filter';
import { applyScopeToCompanies, type DirectorySearchScope } from '@/lib/directory/search-scope';
import { scoreCompanySearch } from '@/lib/directory/search-scoring';
import { compareIdentityCompanies, matchCompanyIdentity } from '@/lib/search/match';
import { companyMatchesServiceFilter } from '@/lib/directory/service-filter';
import { canShowVerifiedBadge } from '@/lib/trust/company-display-policy';
import type { Company, DirectoryFilters, ServiceType } from '@/types';

export type DirectoryFilterInput = Partial<DirectoryFilters> & {
  scope?: DirectorySearchScope;
  /** URL shorthand: state=AZ */
  state?: string | null;
  /** URL shorthand: counties / counties[] */
  counties?: string[] | null;
  /** Exact recorded headquarters/address state. Never service territory. */
  recordedHqState?: string | null;
};

function hasObservedPrice(company: Company): boolean {
  return (company.avgPricePerMove ?? 0) > 0;
}

function hasObservedShipmentVolume(company: Company): boolean {
  return (company.fmcsaShipments ?? 0) > 0;
}

function compareObserved(
  aHas: boolean,
  bHas: boolean,
  whenBoth: () => number
): number {
  if (aHas !== bHas) return aHas ? -1 : 1;
  if (!aHas) return 0;
  return whenBoth();
}

function compareBySort(
  a: Company,
  b: Company,
  sort: DirectoryFilters['sort'] | undefined
): number {
  const mode = sort || 'reputation';
  switch (mode) {
    case 'relevance':
      return String(a.id).localeCompare(String(b.id));
    case 'reputation':
      return b.reputationScore - a.reputationScore;
    case 'rating':
      return b.overallRating - a.overallRating;
    case 'reviews':
      return b.reviewCount - a.reviewCount;
    case 'price-low':
      return compareObserved(hasObservedPrice(a), hasObservedPrice(b), () => {
        return a.avgPricePerMove - b.avgPricePerMove;
      });
    case 'price-high':
      return compareObserved(hasObservedPrice(a), hasObservedPrice(b), () => {
        return b.avgPricePerMove - a.avgPricePerMove;
      });
    case 'years':
      return b.yearsInBusiness - a.yearsInBusiness;
    case 'complaints':
      return compareObserved(
        hasObservedShipmentVolume(a),
        hasObservedShipmentVolume(b),
        () => {
          const ratioA = a.fmcsaComplaints / a.fmcsaShipments;
          const ratioB = b.fmcsaComplaints / b.fmcsaShipments;
          return ratioA - ratioB;
        }
      );
    default:
      return b.reputationScore - a.reputationScore;
  }
}

/** Pure client-safe filter/sort — no Supabase or seed imports. */
export function filterCompanies(
  companies: Company[],
  filters: DirectoryFilterInput
): Company[] {
  let result = applyScopeToCompanies([...companies], filters.scope);
  const searchQuery = filters.search?.trim() ?? '';

  const searchScores = new Map<string, number>();
  if (searchQuery.length > 0) {
    result = result
      .map((company) => {
        const score = scoreCompanySearch(company, searchQuery, filters.scope);
        searchScores.set(company.id || company.slug, score);
        return { company, score };
      })
      .filter((row) => row.score > 0)
      .map((row) => row.company);
  }

  if (filters.minRating && filters.minRating > 0) {
    result = result.filter((c) => c.overallRating >= filters.minRating!);
  }

  if (filters.maxPrice && filters.maxPrice < 12000) {
    result = result.filter(
      (c) => hasObservedPrice(c) && c.avgPricePerMove <= filters.maxPrice!
    );
  }

  if (filters.services && filters.services.length > 0) {
    const services = filters.services;
    const hasAuto = services.includes('Auto Transport');
    const roleServices = new Set<ServiceType>(['Carrier', 'Broker', 'Carrier / Broker']);
    const roles = services.filter((svc) => roleServices.has(svc));
    result = result.filter((c) => {
      if (hasAuto && !companyMatchesServiceFilter(c, 'Auto Transport')) return false;
      if (roles.length && !roles.some((role) => companyMatchesServiceFilter(c, role))) return false;
      const remaining = services.filter((svc) => svc !== 'Auto Transport' && !roleServices.has(svc));
      return remaining.length === 0 || remaining.some((svc) => companyMatchesServiceFilter(c, svc));
    });
  }

  if (filters.recordedHqState) {
    const state = filters.recordedHqState.trim().toUpperCase();
    result = result.filter((company) => extractStateCodeFromHeadquarters(company.headquarters) === state);
  }

  const coverageFilter = normalizeCoverageFilter({
    coverage: filters.coverage,
    coverageFilter: filters.coverageFilter,
    state: filters.state,
    counties: filters.counties,
  });

  if (coverageFilter.mode !== 'any') {
    result = result.filter((c) => companyMatchesCoverageFilter(c, coverageFilter));
  }

  // Default /companies browse stays interstate-focused unless the user:
  // - selects Local Mover service filter,
  // - filters by state/county coverage, or
  // - enters a search term (name/slug/DOT) — local/intrastate companies must be findable.
  const hasActiveSearch = searchQuery.length > 0;
  const wantsLocalMovers =
    Boolean(filters.services?.includes('Local Mover')) ||
    coverageFilter.mode === 'state' ||
    hasActiveSearch;
  if (!wantsLocalMovers) {
    result = result.filter((c) => !companyIsLocal(c));
  }

  if (filters.bbbMin) {
    const order = ['C', 'B-', 'B', 'B+', 'A-', 'A', 'A+'];
    const minIdx = order.indexOf(filters.bbbMin);
    result = result.filter((c) => {
      const idx = order.indexOf(c.bbbRating);
      return idx >= minIdx;
    });
  }

  if (filters.onlyFullService) {
    result = result.filter((c) => {
      const services = Array.isArray(c.services) ? c.services : [];
      return services.includes('Full Service');
    });
  }

  if (filters.onlyVerified) {
    result = result.filter((c) => canShowVerifiedBadge(c));
  }

  if (filters.specialties && filters.specialties.length) {
    result = result.filter((c) => {
      const specialties = Array.isArray(c.specialties) ? c.specialties : [];
      return filters.specialties!.some((sp) =>
        specialties.some((cs) => String(cs).toLowerCase().includes(sp.toLowerCase()))
      );
    });
  }

  const prioritizeLocals = shouldPrioritizeLocalMoversInCoverage(
    filters.services,
    coverageFilter
  );

  result.sort((a, b) => {
    const geoA = companyGeoPriorityScore(a, coverageFilter, {
      prioritizeLocalMovers: prioritizeLocals,
    });
    const geoB = companyGeoPriorityScore(b, coverageFilter, {
      prioritizeLocalMovers: prioritizeLocals,
    });
    if (geoB !== geoA) return geoB - geoA;

    if (searchQuery.length > 0) {
      const sa = searchScores.get(a.id || a.slug) ?? 0;
      const sb = searchScores.get(b.id || b.slug) ?? 0;
      if (sb !== sa) return sb - sa;
      const ma = matchCompanyIdentity(a, searchQuery);
      const mb = matchCompanyIdentity(b, searchQuery);
      if (ma && mb) return compareIdentityCompanies(a, b, ma, mb);
      const explicitQuality =
        filters.sort && filters.sort !== 'relevance' && filters.sort !== 'reputation';
      if (explicitQuality) return compareBySort(a, b, filters.sort);
      return String(a.id).localeCompare(String(b.id));
    }

    return compareBySort(a, b, filters.sort);
  });

  return result;
}
