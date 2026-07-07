import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';
import {
  buildCompanySuggestionInsertRow,
  type CompanySuggestionInsertRow,
} from '@/lib/suggestions/submit-payload';
import {
  isMissingEnrichmentColumnError,
  suggestionInsertErrorMessage,
} from '@/lib/suggestions/jsonb-payload';
import { logger } from '@/lib/logging/logger';

type InsertResult =
  | { ok: true; id: string; enrichmentStored: boolean }
  | { ok: false; error: string; code?: string };

async function insertRow(
  admin: SupabaseClient<Database>,
  row: CompanySuggestionInsertRow
): Promise<{ data: { id: string } | null; error: { code?: string; message?: string } | null }> {
  const { data, error } = await admin
    .from('company_suggestions')
    .insert(row)
    .select('id')
    .single();

  return { data, error };
}

export async function insertCompanySuggestion(
  admin: SupabaseClient<Database>,
  row: CompanySuggestionInsertRow
): Promise<InsertResult> {
  const first = await insertRow(admin, row);

  if (first.data?.id) {
    return { ok: true, id: first.data.id, enrichmentStored: true };
  }

  const firstError = first.error;
  if (!firstError) {
    return { ok: false, error: suggestionInsertErrorMessage({}), code: undefined };
  }

  logger.error('suggestion.insert_failed', {
    code: firstError.code,
    message: firstError.message,
    hasGoogle: row.google_data != null,
    hasPublicScrape: row.public_scrape_data != null,
    usdot: row.usdot,
  });

  if (
    isMissingEnrichmentColumnError(firstError.message) ||
    firstError.code === 'PGRST204'
  ) {
    const { google_data: _g, public_scrape_data: _p, ...coreRow } = row;
    const retry = await insertRow(admin, coreRow);

    if (retry.data?.id) {
      logger.warn('suggestion.insert_without_enrichment_columns', {
        suggestionId: retry.data.id,
        usdot: row.usdot,
        hint: 'Run migration 20260707120000_multi_source_verification.sql',
      });
      return { ok: true, id: retry.data.id, enrichmentStored: false };
    }

    if (retry.error) {
      logger.error('suggestion.insert_retry_failed', {
        code: retry.error.code,
        message: retry.error.message,
      });
    }
  }

  return {
    ok: false,
    error: suggestionInsertErrorMessage(firstError),
    code: firstError.code,
  };
}

export { buildCompanySuggestionInsertRow } from '@/lib/suggestions/submit-payload';