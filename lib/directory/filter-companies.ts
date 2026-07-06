import type { Company, DirectoryFilters } from '@/types';

/** Pure client-safe filter/sort — no Supabase or seed imports. */
export function filterCompanies(
  companies: Company[],
  filters: Partial<DirectoryFilters>
): Company[] {
  let result = [...companies];

  if (filters.search && filters.search.trim().length > 1) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter((c) => {
      const name = (c.name ?? '').toLowerCase();
      const description = (c.shortDescription ?? '').toLowerCase();
      const headquarters = (c.headquarters ?? '').toLowerCase();
      const specialties = Array.isArray(c.specialties) ? c.specialties : [];
      return (
        name.includes(q) ||
        description.includes(q) ||
        headquarters.includes(q) ||
        specialties.some((s) => String(s).toLowerCase().includes(q))
      );
    });
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

  const sort = filters.sort || 'reputation';
  result.sort((a, b) => {
    switch (sort) {
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
  });

  return result;
}