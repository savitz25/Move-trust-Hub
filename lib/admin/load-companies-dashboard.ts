import 'server-only';

import { mapAdminListItem } from '@/lib/admin/map-company-row';
import type { AdminCompanyListItem } from '@/lib/admin/company-dashboard-types';
import { logger } from '@/lib/logging/logger';
import { getCompaniesCached } from '@/lib/supabase/queries/companies';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

const LIST_SELECT =
  'id, slug, name, headquarters, usdot_number, mc_number, authority_active, out_of_service, reputation_score, last_updated, overall_rating, review_count, bbb_rating, fmcsa_last_checked, bbb_last_checked, google_data, public_scrape_data';

function mapSeedCompanies(): Promise<AdminCompanyListItem[]> {
  return getCompaniesCached().then((seed) =>
    seed.map((c) =>
      mapAdminListItem({
        id: c.id,
        slug: c.slug,
        name: c.name,
        headquarters: c.headquarters,
        usdot_number: c.usdotNumber,
        mc_number: c.mcNumber,
        authority_active: c.authorityActive ?? c.isVerified,
        out_of_service: c.outOfService,
        reputation_score: c.reputationScore,
        last_updated: c.lastUpdated,
        overall_rating: c.overallRating,
        review_count: c.reviewCount,
        bbb_rating: c.bbbRating,
        fmcsa_last_checked: c.fmcsaLastChecked,
        bbb_last_checked: c.bbbLastChecked,
        google_data: c.googleData,
        public_scrape_data: c.publicScrapeData,
      })
    )
  );
}

export type AdminCompaniesLoadResult = {
  companies: AdminCompanyListItem[];
  source: 'supabase' | 'seed';
  warning?: string;
};

/** Server-only company list for /admin — never throws; falls back to seed on DB errors. */
export async function loadAdminCompaniesForDashboard(): Promise<AdminCompaniesLoadResult> {
  if (!isSupabaseAdminConfigured()) {
    return { companies: await mapSeedCompanies(), source: 'seed' };
  }

  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from('companies')
      .select(LIST_SELECT)
      .order('reputation_score', { ascending: false });

    if (error) {
      logger.warn('admin.companies_query_failed', { message: error.message, code: error.code });
      return {
        companies: await mapSeedCompanies(),
        source: 'seed',
        warning: `Could not read Supabase companies table (${error.message}). Showing bundled seed data.`,
      };
    }

    return {
      companies: (data ?? []).map((row) => mapAdminListItem(row as Record<string, unknown>)),
      source: 'supabase',
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error('admin.companies_load_failed', { message });
    return {
      companies: await mapSeedCompanies(),
      source: 'seed',
      warning: `Company load failed (${message}). Showing bundled seed data.`,
    };
  }
}