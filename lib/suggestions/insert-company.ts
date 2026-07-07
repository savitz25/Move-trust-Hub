import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import {
  isMissingEnrichmentColumnError,
  toGoogleDataColumn,
  toPublicScrapeColumn,
} from '@/lib/suggestions/jsonb-payload';
import { logger } from '@/lib/logging/logger';
import type { Database } from '@/types/supabase';
import type { Json } from '@/types/supabase';

export type CompanyInsertPayload = Record<string, unknown>;

type InsertAttempt = {
  label: string;
  row: CompanyInsertPayload;
};

function isMissingColumnError(message?: string | null, code?: string): boolean {
  if (code === 'PGRST204') return true;
  if (!message) return false;
  const lower = message.toLowerCase();
  return (
    lower.includes('schema cache') ||
    (lower.includes('column') && lower.includes('does not exist')) ||
    isMissingEnrichmentColumnError(message)
  );
}

function stripKeys(row: CompanyInsertPayload, keys: string[]): CompanyInsertPayload {
  const next = { ...row };
  for (const key of keys) delete next[key];
  return next;
}

function buildInsertAttempts(baseRow: CompanyInsertPayload): InsertAttempt[] {
  const enrichmentCols = ['google_data', 'public_scrape_data'];
  const fmcsaExtendedCols = [
    'fmcsa_last_checked',
    'fmcsa_legal_name',
    'fmcsa_raw',
    'data_hash',
    'authority_active',
    'out_of_service',
    'complaints_last_12m',
    'revocation_date',
  ];

  const withoutEnrichment = stripKeys(baseRow, enrichmentCols);
  const withoutFmcsaExtended = stripKeys(withoutEnrichment, fmcsaExtendedCols);

  return [
    { label: 'full', row: baseRow },
    { label: 'without_enrichment', row: withoutEnrichment },
    { label: 'without_fmcsa_extended', row: withoutFmcsaExtended },
  ];
}

export function sanitizeCompanyInsertRow(row: CompanyInsertPayload): CompanyInsertPayload {
  const next = { ...row };
  if ('google_data' in next) {
    next.google_data = toGoogleDataColumn(next.google_data as never);
  }
  if ('public_scrape_data' in next) {
    next.public_scrape_data = toPublicScrapeColumn(next.public_scrape_data as never);
  }
  if ('fmcsa_raw' in next && next.fmcsa_raw != null) {
    next.fmcsa_raw = next.fmcsa_raw as Json;
  }
  if ('services' in next && !Array.isArray(next.services)) {
    next.services = ['Full Service'];
  }
  if ('specialties' in next && !Array.isArray(next.specialties)) {
    next.specialties = [];
  }
  return next;
}

export async function insertCompanyWithFallback(
  admin: SupabaseClient<Database>,
  row: CompanyInsertPayload
): Promise<{ ok: true } | { ok: false; error: string; code?: string }> {
  const sanitized = sanitizeCompanyInsertRow(row);
  const attempts = buildInsertAttempts(sanitized);

  let lastError: { message?: string; code?: string } | null = null;

  for (const attempt of attempts) {
    const { error } = await admin.from('companies').insert(attempt.row);
    if (!error) {
      if (attempt.label !== 'full') {
        logger.warn('company.insert_fallback_succeeded', {
          attempt: attempt.label,
          slug: attempt.row.slug,
          usdot: attempt.row.usdot_number,
        });
      }
      return { ok: true };
    }

    lastError = error;

    if (error.code === '23505') {
      return { ok: false, error: error.message, code: error.code };
    }

    const missingTable =
      error.code === '42P01' ||
      (error.message.toLowerCase().includes('relation') &&
        error.message.toLowerCase().includes('does not exist'));

    if (missingTable) {
      const msg =
        'Directory table public.companies is missing in Supabase. Run migration 20260708140000_ensure_companies_directory.sql, then approve again.';
      logger.error('company.insert_missing_table', { slug: attempt.row.slug, message: error.message });
      return { ok: false, error: msg, code: error.code };
    }

    if (!isMissingColumnError(error.message, error.code)) {
      logger.error('company.insert_failed', {
        attempt: attempt.label,
        code: error.code,
        message: error.message,
        slug: attempt.row.slug,
      });
      return { ok: false, error: error.message, code: error.code };
    }

    logger.warn('company.insert_retry_missing_columns', {
      attempt: attempt.label,
      code: error.code,
      message: error.message,
      slug: attempt.row.slug,
    });
  }

  return {
    ok: false,
    error: lastError?.message ?? 'Company insert failed',
    code: lastError?.code,
  };
}