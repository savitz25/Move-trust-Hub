import 'server-only';

import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import {
  getCompaniesCached,
  getCompanyBySlugOrUsdotFromDb,
} from '@/lib/supabase/queries/companies';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { resolveCompanyBySlug } from '@/lib/directory/resolve-company';
import { getReviewsForCompany } from '@/data/seed-reviews';
import { seedAutoTransportCompanies, getAutoTransportBySlug } from '@/data/seed-auto-transport';
import { isPubliclyDisplayableCompany } from '@/lib/trust/company-display-policy';
import type { Company, Review } from '@/types';

/** Server Component / Route Handler entry point — React cache() dedupes per request. */
export const getAllCompanies = getCompaniesCached;

/**
 * Profile lookup: prefer single-row DB (or seed) resolution before materializing
 * the full directory — avoids loading every company on cold profile/metadata paths.
 */
export async function getCompanyBySlugAsync(slug: string): Promise<Company | undefined> {
  const fromDb = await getCompanyBySlugOrUsdotFromDb(slug);
  if (fromDb && isPubliclyDisplayableCompany(fromDb)) return fromDb;

  const companies = await getUnifiedDirectoryCompanies();
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

export const getAllReviewsForCompany = cache(async (companyId: string): Promise<Review[]> => {
  return getReviews(companyId, 500);
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