'use server';

import { revalidatePath } from 'next/cache';
import { assertAdminSession } from '@/lib/admin/auth';
import { enrichCompanySources } from '@/lib/verification/enrich-company';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { logger } from '@/lib/logging/logger';

export type RefreshVerificationResult = {
  success: boolean;
  error?: string;
};

export async function refreshCompanyVerificationData(
  companyId: string
): Promise<RefreshVerificationResult> {
  try {
    await assertAdminSession();
  } catch {
    return { success: false, error: 'Unauthorized' };
  }

  if (!isSupabaseAdminConfigured()) {
    return { success: false, error: 'Database not configured' };
  }

  const admin = createAdminClient();
  const { data: company, error: fetchError } = await admin
    .from('companies')
    .select('id, slug, name, headquarters, google_data, public_scrape_data, overall_rating, review_count')
    .eq('id', companyId)
    .maybeSingle();

  if (fetchError || !company) {
    return { success: false, error: 'Company not found' };
  }

  const enrichment = await enrichCompanySources({
    legalName: company.name,
    headquarters: company.headquarters,

  });

  const googleRating = enrichment.google?.rating ?? null;
  const googleCount = enrichment.google?.review_count ?? null;

  const updates: Record<string, unknown> = {
    google_data: enrichment.google,
    public_scrape_data: enrichment.publicScrape,
    last_updated: new Date().toISOString(),
  };

  if (googleRating != null && googleRating > 0) {
    updates.overall_rating = googleRating;
    if (googleCount != null) updates.review_count = googleCount;
  }

  const { error: updateError } = await admin
    .from('companies')
    .update(updates)
    .eq('id', companyId);

  if (updateError) {
    logger.error('verification.refresh_failed', { companyId, error: updateError.message });
    return { success: false, error: 'Failed to save refreshed data' };
  }

  revalidatePath(`/companies/${company.slug}`);
  revalidatePath('/companies');

  return { success: true };
}