import { Company, Review, DirectoryFilters } from '@/types';
import { filterCompanies } from '@/lib/directory/filter-companies';
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
  return filterCompanies(all, filters);
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