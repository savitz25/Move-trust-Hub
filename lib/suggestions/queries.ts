import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { isMissingEnrichmentColumnError } from '@/lib/suggestions/jsonb-payload';
import { logger } from '@/lib/logging/logger';

export type PendingSuggestion = {
  id: string;
  name: string;
  usdot: string | null;
  mc_number: string | null;
  details: string | null;
  suggested_by_name: string | null;
  suggested_by_email: string | null;
  legal_name: string | null;
  headquarters: string | null;
  phone: string | null;
  authority_status: string | null;
  source_page: string | null;
  fmcsa_preview: Record<string, unknown> | null;
  fmcsa_raw: Record<string, unknown> | null;
  google_data: Record<string, unknown> | null;
  public_scrape_data: Record<string, unknown> | null;
  created_at: string;
};

const PENDING_SUGGESTION_COLUMNS_FULL =
  'id, name, usdot, mc_number, details, suggested_by_name, suggested_by_email, legal_name, headquarters, phone, authority_status, source_page, fmcsa_preview, fmcsa_raw, google_data, public_scrape_data, created_at';

const PENDING_SUGGESTION_COLUMNS_CORE =
  'id, name, usdot, mc_number, details, suggested_by_name, suggested_by_email, legal_name, headquarters, phone, authority_status, source_page, fmcsa_preview, fmcsa_raw, created_at';

export async function getPendingSuggestions(): Promise<PendingSuggestion[]> {
  if (!isSupabaseAdminConfigured()) return [];

  const admin = createAdminClient();

  const full = await admin
    .from('company_suggestions')
    .select(PENDING_SUGGESTION_COLUMNS_FULL)
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (!full.error && full.data) {
    return full.data as PendingSuggestion[];
  }

  if (
    full.error &&
    (isMissingEnrichmentColumnError(full.error.message) || full.error.code === 'PGRST204')
  ) {
    const core = await admin
      .from('company_suggestions')
      .select(PENDING_SUGGESTION_COLUMNS_CORE)
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (!core.error && core.data) {
      logger.warn('suggestions.pending_loaded_without_enrichment_columns', {
        count: core.data.length,
      });
      return core.data.map((row) => ({
        ...(row as PendingSuggestion),
        google_data: null,
        public_scrape_data: null,
      }));
    }

    if (core.error) {
      logger.error('suggestions.pending_load_failed', {
        code: core.error.code,
        message: core.error.message,
      });
    }
    return [];
  }

  if (full.error) {
    logger.error('suggestions.pending_load_failed', {
      code: full.error.code,
      message: full.error.message,
    });
  }

  return [];
}