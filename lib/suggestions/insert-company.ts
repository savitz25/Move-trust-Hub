import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import {
  isMissingEnrichmentColumnError,
  toGoogleDataColumn,
  toJsonbColumn,
  toPublicScrapeColumn,
} from '@/lib/suggestions/jsonb-payload';
import {
  COMPANIES_RPC_SETUP_MESSAGE,
  COMPANIES_TABLE_SETUP_MESSAGE,
  isCompaniesTableUnavailableError,
} from '@/lib/suggestions/companies-table-error';
import {
  fetchDirectoryHealthRpc,
  publishCompanyViaRpc,
} from '@/lib/suggestions/publish-company-rpc';
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
  const enrichmentCols = [
    'google_data',
    'public_scrape_data',
    'verification_sources',
    'verification_last_synced_at',
  ];
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
  const contactCols = ['physical_address', 'phone'];
  const scopeCols = ['service_scope', 'coverage_counties'];

  const withoutEnrichment = stripKeys(baseRow, enrichmentCols);
  const withoutFmcsaExtended = stripKeys(withoutEnrichment, fmcsaExtendedCols);
  const withoutContact = stripKeys(withoutFmcsaExtended, contactCols);
  const withoutScope = stripKeys(withoutContact, scopeCols);

  return [
    { label: 'full', row: baseRow },
    { label: 'without_enrichment', row: withoutEnrichment },
    { label: 'without_fmcsa_extended', row: withoutFmcsaExtended },
    { label: 'without_contact_cols', row: withoutContact },
    { label: 'without_scope_cols', row: withoutScope },
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
  if ('verification_sources' in next && next.verification_sources != null) {
    next.verification_sources = toJsonbColumn(next.verification_sources, {
      label: 'verification_sources',
    });
  }
  if ('services' in next && !Array.isArray(next.services)) {
    next.services = ['Full Service'];
  }
  if ('specialties' in next && !Array.isArray(next.specialties)) {
    next.specialties = [];
  }
  return next;
}

export type CompanyInsertResult =
  | { ok: true; slug: string; companyId: string; existing: boolean }
  | { ok: false; error: string; code?: string };

export async function insertCompanyWithFallback(
  admin: SupabaseClient<Database>,
  row: CompanyInsertPayload
): Promise<CompanyInsertResult> {
  const sanitized = sanitizeCompanyInsertRow(row);
  const health = await fetchDirectoryHealthRpc(admin);

  if (health?.companies_table_exists) {
    const rpcFirst = await publishCompanyViaRpc(admin, sanitized);
    if (rpcFirst.ok) {
      logger.info('company.insert_rpc_primary_succeeded', {
        slug: rpcFirst.slug,
        existing: rpcFirst.existing,
      });
      return {
        ok: true,
        slug: rpcFirst.slug,
        companyId: rpcFirst.companyId,
        existing: rpcFirst.existing,
      };
    }
    if (rpcFirst.rpcMissing) {
      return { ok: false, error: COMPANIES_RPC_SETUP_MESSAGE, code: rpcFirst.code };
    }
    return { ok: false, error: rpcFirst.error, code: rpcFirst.code };
  }

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
      const publishedSlug = String(attempt.row.slug ?? attempt.row.id ?? '');
      return {
        ok: true,
        slug: publishedSlug,
        companyId: publishedSlug,
        existing: false,
      };
    }

    lastError = error;

    if (error.code === '23505') {
      return { ok: false, error: error.message, code: error.code };
    }

    if (isCompaniesTableUnavailableError(error.message, error.code)) {
      const rpc = await publishCompanyViaRpc(admin, sanitized);
      if (rpc.ok) {
        logger.info('company.insert_rpc_succeeded', {
          slug: rpc.slug,
          existing: rpc.existing,
        });
        return {
          ok: true,
          slug: rpc.slug,
          companyId: rpc.companyId,
          existing: rpc.existing,
        };
      }
      if (rpc.rpcMissing) {
        return { ok: false, error: COMPANIES_RPC_SETUP_MESSAGE, code: rpc.code };
      }
      logger.error('company.insert_missing_table', { slug: attempt.row.slug, message: error.message });
      return { ok: false, error: COMPANIES_TABLE_SETUP_MESSAGE, code: error.code };
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

  if (lastError && isCompaniesTableUnavailableError(lastError.message, lastError.code)) {
    const rpc = await publishCompanyViaRpc(admin, sanitized);
    if (rpc.ok) {
      logger.info('company.insert_rpc_succeeded', {
        slug: rpc.slug,
        existing: rpc.existing,
      });
      return {
        ok: true,
        slug: rpc.slug,
        companyId: rpc.companyId,
        existing: rpc.existing,
      };
    }

    if (rpc.rpcMissing) {
      return { ok: false, error: COMPANIES_RPC_SETUP_MESSAGE, code: rpc.code };
    }

    return { ok: false, error: rpc.error, code: rpc.code };
  }

  return {
    ok: false,
    error: lastError?.message ?? 'Company insert failed',
    code: lastError?.code,
  };
}