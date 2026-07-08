import { companyMatchesServiceFilter } from '@/lib/fmcsa/derive-directory-services';
import { Company, Review, DirectoryFilters, SortOption } from '@/types';
import { seedCompanies, getCompanyBySlug } from '@/data/seed-companies';
import { seedReviews, getReviewsForCompany } from '@/data/seed-reviews';
import { seedAutoTransportCompanies, getAutoTransportBySlug } from '@/data/seed-auto-transport';
import { createBrowserSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { computeReputationScore } from '@/data/seed-companies';

// In-memory cache for demo (in real app use React Query / server cache)
let companiesCache: Company[] | null = null;

/** Client-side company fetch. Server Components should use `@/lib/data-server`. */
export async function getAllCompanies(): Promise<Company[]> {
  if (companiesCache) return companiesCache;

  const supabase = createBrowserSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('reputation_score', { ascending: false });

    if (!error && data) {
      companiesCache = data as unknown as Company[];
      return companiesCache;
    }
    console.warn('Supabase fetch failed, falling back to seed data.');
  }

  companiesCache = [...seedCompanies];
  return companiesCache;
}

export async function getCompanyBySlugAsync(slug: string): Promise<Company | undefined> {
  const companies = await getAllCompanies();
  return companies.find(c => c.slug === slug) || getCompanyBySlug(slug);
}

export async function getReviews(companyId: string, limit = 12): Promise<Review[]> {
  const supabase = createBrowserSupabaseClient();
  if (supabase) {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('company_id', companyId)
      .order('date', { ascending: false })
      .limit(limit);
    if (data) return data as unknown as Review[];
  }
  return getReviewsForCompany(companyId, limit);
}

export async function getAllReviewsForCompany(companyId: string): Promise<Review[]> {
  const supabase = createBrowserSupabaseClient();
  if (supabase) {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('company_id', companyId)
      .order('date', { ascending: false });
    if (data) return data as unknown as Review[];
  }
  return getReviewsForCompany(companyId);
}

// Advanced filtering + sorting (client-side for demo + works great with TanStack Table later)
export async function getFilteredCompanies(filters: Partial<DirectoryFilters>): Promise<Company[]> {
  const all = await getAllCompanies();
  let result = [...all];

  // Text search
  if (filters.search && filters.search.trim().length > 1) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q) ||
      c.headquarters.toLowerCase().includes(q) ||
      c.specialties.some(s => s.toLowerCase().includes(q))
    );
  }

  // Rating floor
  if (filters.minRating && filters.minRating > 0) {
    result = result.filter(c => c.overallRating >= filters.minRating!);
  }

  // Price ceiling
  if (filters.maxPrice && filters.maxPrice < 12000) {
    result = result.filter(c => c.avgPricePerMove <= filters.maxPrice!);
  }

  // Services
  if (filters.services && filters.services.length > 0) {
    result = result.filter((c) =>
      filters.services!.some((svc) => companyMatchesServiceFilter(c, svc))
    );
  }

  // Coverage
  if (filters.coverage && filters.coverage !== 'Any') {
    result = result.filter(c => c.coverage === filters.coverage || c.coverage === 'All 50 States');
  }

  // BBB
  if (filters.bbbMin) {
    const order = ['C','B-','B','B+','A-','A','A+'];
    const minIdx = order.indexOf(filters.bbbMin);
    result = result.filter(c => {
      const idx = order.indexOf(c.bbbRating);
      return idx >= minIdx;
    });
  }

  // Full service only
  if (filters.onlyFullService) {
    result = result.filter(c => c.services.includes('Full Service'));
  }

  if (filters.onlyVerified) {
    result = result.filter(c => c.isVerified);
  }

  // Specialties
  if (filters.specialties && filters.specialties.length) {
    result = result.filter(c =>
      filters.specialties!.some(sp => c.specialties.some(cs => cs.toLowerCase().includes(sp.toLowerCase())))
    );
  }

  // Sorting
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
        return ratioA - ratioB; // lower complaints ratio = better (but for sort we want lowest first)
      }
      default:
        return b.reputationScore - a.reputationScore;
    }
  });

  return result;
}

// Utility for complaint ratio display
export function getComplaintRatio(company: Company): number {
  if (!company.fmcsaShipments) return 0;
  return Number(((company.fmcsaComplaints / company.fmcsaShipments) * 1000).toFixed(2));
}

// For admin: simple in-memory update (replace with real API + Supabase in production)
export async function saveCompany(company: Company): Promise<Company> {
  // In production: await supabase.from('companies').upsert(...)
  const companies = await getAllCompanies();
  const idx = companies.findIndex(c => c.id === company.id);
  if (idx >= 0) {
    companies[idx] = { ...company, lastUpdated: new Date().toISOString().split('T')[0] };
  } else {
    companies.push(company);
  }
  companiesCache = companies;
  return company;
}

export async function deleteCompany(id: string): Promise<void> {
  const companies = await getAllCompanies();
  companiesCache = companies.filter(c => c.id !== id);
}

// Auto Transport specific (demo seed for now)
let autoTransportCache: Company[] | null = null;

export async function getAllAutoTransportCompanies(): Promise<Company[]> {
  if (autoTransportCache) return autoTransportCache;
  autoTransportCache = [...seedAutoTransportCompanies];
  return autoTransportCache;
}

export async function getAutoTransportBySlugAsync(slug: string): Promise<Company | undefined> {
  const companies = await getAllAutoTransportCompanies();
  return companies.find(c => c.slug === slug) || getAutoTransportBySlug(slug);
}
