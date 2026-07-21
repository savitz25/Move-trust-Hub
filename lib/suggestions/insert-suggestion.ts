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
    // Drop only optional enrichment / contact columns — NEVER drop service_scope
    // or selected_counties (required for Intrastate publish + county placement).
    const {
      google_data: _g,
      public_scrape_data: _p,
      contact_email: _ce,
      ...coreRow
    } = row;

    let retry = await insertRow(admin, coreRow);

    // If scope/county columns are also missing in a lagging schema, try core identity only
    // but log loudly — local auto-publish needs those fields.
    if (
      !retry.data?.id &&
      retry.error &&
      (isMissingEnrichmentColumnError(retry.error.message) ||
        retry.error.code === 'PGRST204')
    ) {
      const {
        service_scope: _s,
        selected_counties: _c,
        ...identityOnly
      } = coreRow;
      logger.error('suggestion.insert_dropping_scope_columns', {
        message: retry.error.message,
        serviceScope: row.service_scope,
        countyCount: Array.isArray(row.selected_counties)
          ? (row.selected_counties as unknown[]).length
          : 0,
        hint: 'Apply service_scope / selected_counties migration before bulk local onboarding.',
      });
      retry = await insertRow(admin, identityOnly);
    }

    if (retry.data?.id) {
      logger.warn('suggestion.insert_without_enrichment_columns', {
        suggestionId: retry.data.id,
        usdot: row.usdot,
        serviceScope: row.service_scope,
        hint: 'Google/BBB snapshot packed in fmcsa_preview._enrichment; run migration 20260707120000_multi_source_verification.sql for dedicated columns',
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