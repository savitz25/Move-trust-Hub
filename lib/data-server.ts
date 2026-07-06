import 'server-only';

import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { getCompaniesCached } from '@/lib/supabase/queries/companies';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { resolveCompanyBySlug } from '@/lib/directory/resolve-company';
import { getReviewsForCompany } from '@/data/seed-reviews';
import { seedAutoTransportCompanies, getAutoTransportBySlug } from '@/data/seed-auto-transport';
import { isPubliclyDisplayableCompany } from '@/lib/trust/company-display-policy';
import type { Company, Review } from '@/types';

/** Server Component / Route Handler entry point — React cache() dedupes per request. */
export const getAllCompanies = getCompaniesCached;

export async function getCompanyBySlugAsync(slug: string): Promise<Company | undefined> {
  const companies = await getAllCompanies();
  return resolveCompanyBySlug(slug, companies);
}

export const getReviews = cache(async (companyId: string, limit = 12): Promise<Review[]> => {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('company_id', companyId)
      .order('date', { ascending: false })
      .limit(limit);
    if (data) return data as unknown as Review[];
  }
  return getReviewsForCompany(companyId, limit);
});

export const getAllAutoTransportCompanies = cache(async (): Promise<Company[]> => {
  return seedAutoTransportCompanies.filter(isPubliclyDisplayableCompany);
});

export async function getAutoTransportBySlugAsync(
  slug: string
): Promise<Company | undefined> {
  const company =
    seedAutoTransportCompanies.find((c) => c.slug === slug) || getAutoTransportBySlug(slug);
  if (!company || !isPubliclyDisplayableCompany(company)) return undefined;
  return company;
}