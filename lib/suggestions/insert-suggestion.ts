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
  | { ok: true; id: string; enrichmentStored: boolean; attempt: string }
  | { ok: false; error: string; code?: string; attempts: string[] };

async function insertRow(
  admin: SupabaseClient<Database>,
  row: Record<string, unknown>
): Promise<{ data: { id: string } | null; error: { code?: string; message?: string } | null }> {
  const { data, error } = await admin
    .from('company_suggestions')
    .insert(row as never)
    .select('id')
    .single();

  return { data, error };
}

/** Columns that may be missing on lagging schemas — strip progressively. */
const OPTIONAL_STRIP_TIERS: Array<{ label: string; keys: string[] }> = [
  {
    label: 'without_enrichment_json',
    keys: ['google_data', 'public_scrape_data'],
  },
  {
    label: 'without_contact_email',
    keys: ['contact_email'],
  },
  {
    label: 'without_fmcsa_json',
    keys: ['fmcsa_preview', 'fmcsa_raw'],
  },
  {
    label: 'without_hashes',
    keys: ['ip_hash', 'email_hash', 'submitter_ip'],
  },
  {
    label: 'without_scope_columns',
    keys: ['service_scope', 'selected_counties'],
  },
  {
    label: 'identity_only',
    keys: [
      'google_data',
      'public_scrape_data',
      'contact_email',
      'fmcsa_preview',
      'fmcsa_raw',
      'ip_hash',
      'email_hash',
      'submitter_ip',
      'service_scope',
      'selected_counties',
      'authority_status',
      'headquarters',
      'phone',
      'legal_name',
      'details',
      'mc_number',
      'usdot',
    ],
  },
];

function stripKeys(
  row: Record<string, unknown>,
  keys: string[]
): Record<string, unknown> {
  const next = { ...row };
  for (const k of keys) delete next[k];
  return next;
}

function isRetryableColumnError(message?: string | null, code?: string): boolean {
  if (code === 'PGRST204') return true;
  if (isMissingEnrichmentColumnError(message)) return true;
  const lower = (message ?? '').toLowerCase();
  return (
    lower.includes('column') &&
    (lower.includes('does not exist') || lower.includes('schema cache'))
  );
}

/**
 * Insert a company suggestion with progressive fallbacks when optional columns
 * are missing. Logs every attempt so local onboarding failures are diagnosable.
 */
export async function insertCompanySuggestion(
  admin: SupabaseClient<Database>,
  row: CompanySuggestionInsertRow
): Promise<InsertResult> {
  const base = { ...row } as Record<string, unknown>;
  const attempts: string[] = [];

  // Attempt 0: full row
  {
    attempts.push('full');
    const first = await insertRow(admin, base);
    if (first.data?.id) {
      logger.info('suggestion.insert_ok', {
        attempt: 'full',
        suggestionId: first.data.id,
        name: row.name,
        serviceScope: row.service_scope,
        countyCount: Array.isArray(row.selected_counties)
          ? (row.selected_counties as unknown[]).length
          : 0,
      });
      return { ok: true, id: first.data.id, enrichmentStored: true, attempt: 'full' };
    }

    logger.error('suggestion.insert_failed', {
      attempt: 'full',
      code: first.error?.code,
      message: first.error?.message,
      name: row.name,
      serviceScope: row.service_scope,
      hasGoogle: row.google_data != null,
      hasPublicScrape: row.public_scrape_data != null,
      hasFmcsaPreview: row.fmcsa_preview != null,
      usdot: row.usdot,
      email: row.suggested_by_email,
      payloadKeys: Object.keys(base),
    });

    // Unique constraint — do not retry with stripped payload
    if (first.error?.code === '23505') {
      return {
        ok: false,
        error: suggestionInsertErrorMessage(first.error),
        code: first.error.code,
        attempts,
      };
    }

    if (!isRetryableColumnError(first.error?.message, first.error?.code)) {
      // Still try lighter payloads for unexpected JSON/size errors
      if (
        !first.error?.message?.toLowerCase().includes('json') &&
        first.error?.code !== '22P02' &&
        !first.error?.message?.toLowerCase().includes('payload')
      ) {
        return {
          ok: false,
          error: suggestionInsertErrorMessage(first.error ?? {}),
          code: first.error?.code,
          attempts,
        };
      }
    }
  }

  let current = base;
  let stripped: string[] = [];

  for (const tier of OPTIONAL_STRIP_TIERS) {
    current = stripKeys(current, tier.keys);
    stripped = [...stripped, ...tier.keys];
    attempts.push(tier.label);

    const retry = await insertRow(admin, current);
    if (retry.data?.id) {
      const droppedScope = stripped.includes('service_scope');
      logger.warn('suggestion.insert_fallback_ok', {
        attempt: tier.label,
        suggestionId: retry.data.id,
        name: row.name,
        droppedKeys: stripped,
        droppedScope,
        serviceScope: row.service_scope,
        countyCount: Array.isArray(row.selected_counties)
          ? (row.selected_counties as unknown[]).length
          : 0,
        hint: droppedScope
          ? 'Apply service_scope / selected_counties migration; re-publish may need admin queue.'
          : undefined,
      });
      return {
        ok: true,
        id: retry.data.id,
        enrichmentStored: !stripped.includes('google_data'),
        attempt: tier.label,
      };
    }

    logger.error('suggestion.insert_fallback_failed', {
      attempt: tier.label,
      code: retry.error?.code,
      message: retry.error?.message,
      name: row.name,
      remainingKeys: Object.keys(current),
    });

    if (retry.error?.code === '23505') {
      return {
        ok: false,
        error: suggestionInsertErrorMessage(retry.error),
        code: retry.error.code,
        attempts,
      };
    }
  }

  // Absolute minimal identity insert
  const minimal = {
    name: row.name.slice(0, 200),
    status: 'pending' as const,
    suggested_by_name: row.suggested_by_name,
    suggested_by_email: row.suggested_by_email,
    source_page: row.source_page || '/verify-dot',
    legal_name: row.legal_name || row.name,
  };
  attempts.push('minimal_identity');
  const last = await insertRow(admin, minimal);
  if (last.data?.id) {
    logger.warn('suggestion.insert_minimal_ok', {
      suggestionId: last.data.id,
      name: row.name,
      hint: 'Only identity columns saved — enrich via admin.',
    });
    return {
      ok: true,
      id: last.data.id,
      enrichmentStored: false,
      attempt: 'minimal_identity',
    };
  }

  logger.error('suggestion.insert_all_attempts_failed', {
    name: row.name,
    serviceScope: row.service_scope,
    attempts,
    lastCode: last.error?.code,
    lastMessage: last.error?.message,
  });

  return {
    ok: false,
    error: suggestionInsertErrorMessage(last.error ?? {}),
    code: last.error?.code,
    attempts,
  };
}

export { buildCompanySuggestionInsertRow } from '@/lib/suggestions/submit-payload';
