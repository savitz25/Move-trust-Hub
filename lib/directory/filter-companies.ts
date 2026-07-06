import { scoreCompanySearch } from '@/lib/directory/search-scoring';
import type { Company, DirectoryFilters } from '@/types';

function compareBySort(
  a: Company,
  b: Company,
  sort: DirectoryFilters['sort'] | undefined
): number {
  const mode = sort || 'reputation';
  switch (mode) {
    case 'reputation':
      return b.reputationScore - a.reputationScore;
    case 'rating':
      return b.overallRating - a.overallRating;
    case 'reviews':
      return b.reviewCount - a.reviewCount;
    case 'price-low':
      return a.avgPricePerMove - b.avgPricePerMove;
    case 'price-high':
      return b.avgPricePerMove - a.avgPricePerMove;
    case 'years':
      return b.yearsInBusiness - a.yearsInBusiness;
    case 'complaints': {
      const ratioA = a.fmcsaComplaints / Math.max(a.fmcsaShipments, 1);
      const ratioB = b.fmcsaComplaints / Math.max(b.fmcsaShipments, 1);
      return ratioA - ratioB;
    }
    default:
      return b.reputationScore - a.reputationScore;
  }
}

/** Pure client-safe filter/sort — no Supabase or seed imports. */
export function filterCompanies(
  companies: Company[],
  filters: Partial<DirectoryFilters>
): Company[] {
  let result = [...companies];
  const searchQuery = filters.search?.trim() ?? '';

  if (searchQuery.length > 0) {
    result = result
      .map((company) => ({ company, score: scoreCompanySearch(company, searchQuery) }))
      .filter((row) => row.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return compareBySort(a.company, b.company, filters.sort);
      })
      .map((row) => row.company);
  }

  if (filters.minRating && filters.minRating > 0) {
    result = result.filter((c) => c.overallRating >= filters.minRating!);
  }

  if (filters.maxPrice && filters.maxPrice < 12000) {
    result = result.filter((c) => c.avgPricePerMove <= filters.maxPrice!);
  }

  if (filters.services && filters.services.length > 0) {
    result = result.filter((c) => {
      const services = Array.isArray(c.services) ? c.services : [];
      return filters.services!.some((svc) => services.includes(svc));
    });
  }

  if (filters.coverage && filters.coverage !== 'Any') {
    result = result.filter(
      (c) => c.coverage === filters.coverage || c.coverage === 'All 50 States'
    );
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
    result = result.filter((c) => c.isVerified);
  }

  if (filters.specialties && filters.specialties.length) {
    result = result.filter((c) => {
      const specialties = Array.isArray(c.specialties) ? c.specialties : [];
      return filters.specialties!.some((sp) =>
        specialties.some((cs) => String(cs).toLowerCase().includes(sp.toLowerCase()))
      );
    });
  }

  if (searchQuery.length === 0) {
    result.sort((a, b) => compareBySort(a, b, filters.sort));
  }

  return result;
}