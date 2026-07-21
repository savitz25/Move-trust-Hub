'use server';

import { assertAdminSession } from '@/lib/admin/auth';
import { revalidatePublishedCompany } from '@/lib/directory/revalidate-company';
import { enrichCompanySources } from '@/lib/verification/enrich-company';
import { persistGoogleSnapshot } from '@/lib/verification/persist-google-snapshot';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { logger } from '@/lib/logging/logger';
import {
  parsePublicScrapeData,
  parseVerificationSources,
  type VerificationSources,
} from '@/lib/verification/backfill-helpers';
import { toJsonbColumn } from '@/lib/suggestions/jsonb-payload';

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
    .select(
      'id, slug, name, headquarters, google_data, public_scrape_data, verification_sources, overall_rating, review_count'
    )
    .eq('id', companyId)
    .maybeSingle();

  if (fetchError || !company) {
    return { success: false, error: 'Company not found' };
  }

  const enrichment = await enrichCompanySources({
    legalName: company.name,
    headquarters: company.headquarters,
  });

  if (enrichment.google) {
    const persisted = await persistGoogleSnapshot(
      admin,
      companyId,
      enrichment.google,
      { existingRow: company as Record<string, unknown> }
    );
    if (!persisted.ok) {
      return { success: false, error: persisted.error ?? 'Failed to save Google data' };
    }
  }

  // Merge public scrape into verification_sources without clobbering google.
  if (enrichment.publicScrape) {
    const sources = parseVerificationSources(
      (company as { verification_sources?: unknown }).verification_sources
    );
    const nextSources: VerificationSources = {
      ...sources,
      public_scrape: enrichment.publicScrape,
    };
    // Re-read google after persist
    const { data: afterGoogle } = await admin
      .from('companies')
      .select('verification_sources')
      .eq('id', companyId)
      .maybeSingle();
    const afterSources = parseVerificationSources(
      (afterGoogle as { verification_sources?: unknown } | null)?.verification_sources
    );
    if (afterSources.google) nextSources.google = afterSources.google;

    const patch: Record<string, unknown> = {
      verification_sources: toJsonbColumn(nextSources, { label: 'verification_sources' }),
      public_scrape_data: toJsonbColumn(enrichment.publicScrape, {
        label: 'public_scrape_data',
      }),
      last_updated: new Date().toISOString().slice(0, 10),
    };

    const { error: scrapeError } = await admin
      .from('companies')
      .update(patch as never)
      .eq('id', companyId);

    if (scrapeError && scrapeError.code === 'PGRST204') {
      const { public_scrape_data: _p, ...withoutLegacy } = patch;
      await admin.from('companies').update(withoutLegacy as never).eq('id', companyId);
    } else if (scrapeError) {
      logger.error('verification.refresh_scrape_failed', {
        companyId,
        error: scrapeError.message,
      });
    }
  }

  revalidatePublishedCompany(company.slug);
  return { success: true };
}
