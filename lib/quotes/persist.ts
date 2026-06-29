import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Database } from '@/types/supabase';
import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from '@/lib/supabase/config';
import type { QuoteRequestInsert } from '@/lib/quotes/schema';
import { logger } from '@/lib/logging/logger';

export type QuotePersistResult = {
  saved: boolean;
  quoteId?: string;
  path: 'service_role' | 'anon_no_return' | 'skipped_not_configured' | 'failed';
  error?: string;
  errorCode?: string;
  errorDetails?: string;
  errorHint?: string;
  attempts: string[];
};

type SupabaseErrorShape = {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
};

function formatDbError(error: SupabaseErrorShape): QuotePersistResult {
  return {
    saved: false,
    path: 'failed',
    error: error.message,
    errorCode: error.code,
    errorDetails: error.details,
    errorHint: error.hint,
    attempts: [],
  };
}

/** Columns present before the hardening migration. */
function toLegacyRecord(record: QuoteRequestInsert) {
  const {
    estimated_weight: _w,
    inventory: _i,
    service_type: _s,
    auto_transport: _a,
    ...legacy
  } = record;
  return legacy;
}

/** Minimal columns guaranteed by base schema.sql. */
function toBaseRecord(record: QuoteRequestInsert) {
  const {
    estimated_weight: _w,
    inventory: _i,
    service_type: _s,
    auto_transport: _a,
    destination_slug: _d,
    market_priority: _m,
    ...base
  } = record;
  return base;
}

async function tryInsert(
  client: SupabaseClient<Database>,
  payload: Record<string, unknown>,
  options: { returning: boolean; label: string }
): Promise<{ data: { id: string } | null; error: SupabaseErrorShape | null }> {
  if (options.returning) {
    const result = await client
      .from('quote_requests')
      .insert(payload)
      .select('id')
      .single();
    return { data: result.data, error: result.error };
  }

  // CRITICAL: anon role has INSERT but no SELECT — never use .select() for anon.
  const result = await client.from('quote_requests').insert(payload);
  return { data: null, error: result.error };
}

/**
 * Persist a quote to Supabase.
 * 1. service_role + RETURNING (preferred on Vercel)
 * 2. anon insert without RETURNING (RLS-safe)
 * 3. Retry with reduced columns if schema migration not applied
 */
export async function persistQuoteRequest(
  record: QuoteRequestInsert
): Promise<QuotePersistResult> {
  const attempts: string[] = [];

  if (!isSupabaseConfigured()) {
    logger.warn('quote.persist_skipped', {
      reason: 'NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing',
    });
    return {
      saved: false,
      path: 'skipped_not_configured',
      error: 'Supabase public env vars not configured',
      attempts,
    };
  }

  const payloads: { label: string; data: Record<string, unknown> }[] = [
    { label: 'full', data: { ...record } },
    { label: 'legacy', data: toLegacyRecord(record) },
    { label: 'base', data: toBaseRecord(record) },
  ];

  // --- Path 1: service_role (bypasses RLS, can RETURNING id) ---
  if (isSupabaseAdminConfigured()) {
    const admin = createAdminClient();

    for (const payload of payloads) {
      const attemptLabel = `service_role:${payload.label}`;
      attempts.push(attemptLabel);

      const { data, error } = await tryInsert(admin, payload.data, {
        returning: true,
        label: attemptLabel,
      });

      if (!error) {
        logger.info('quote.persist_ok', {
          path: 'service_role',
          payload: payload.label,
          quoteId: data?.id,
        });
        return {
          saved: true,
          quoteId: data?.id,
          path: 'service_role',
          attempts,
        };
      }

      logger.warn('quote.persist_attempt_failed', {
        attempt: attemptLabel,
        code: error.code,
        message: error.message,
        hint: error.hint,
      });

      if (!error.message?.toLowerCase().includes('column')) {
        return { ...formatDbError(error), path: 'failed', attempts };
      }
    }
  } else {
    logger.warn('quote.persist_no_service_role', {
      hint: 'Set SUPABASE_SERVICE_ROLE_KEY in Vercel for reliable server-side inserts',
    });
  }

  // --- Path 2: anon via server client — INSERT only, no SELECT ---
  const supabase = await createClient();

  for (const payload of payloads) {
    const attemptLabel = `anon_no_return:${payload.label}`;
    attempts.push(attemptLabel);

    const { error } = await tryInsert(supabase, payload.data, {
      returning: false,
      label: attemptLabel,
    });

    if (!error) {
      logger.info('quote.persist_ok', {
        path: 'anon_no_return',
        payload: payload.label,
      });
      return {
        saved: true,
        path: 'anon_no_return',
        attempts,
      };
    }

    logger.warn('quote.persist_attempt_failed', {
      attempt: attemptLabel,
      code: error.code,
      message: error.message,
      hint: error.hint,
    });

    if (
      error.code === '42501' ||
      error.message?.toLowerCase().includes('permission denied') ||
      error.message?.toLowerCase().includes('row-level security')
    ) {
      return {
        ...formatDbError(error),
        path: 'failed',
        attempts,
        error: `${error.message} — check RLS INSERT policy for anon role`,
      };
    }

    if (!error.message?.toLowerCase().includes('column')) {
      return { ...formatDbError(error), path: 'failed', attempts };
    }
  }

  return {
    saved: false,
    path: 'failed',
    error: 'All insert attempts failed',
    attempts,
  };
}