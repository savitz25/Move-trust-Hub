'use server';

import {
  quoteRequestSchema,
  toQuoteInsert,
  type QuoteRequestInput,
} from '@/lib/quotes/schema';
import { persistQuoteRequest } from '@/lib/quotes/persist';
import { sendQuoteNotifications } from '@/lib/quotes/notify';
import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from '@/lib/supabase/config';
import {
  logQuoteNotification,
  logQuoteSubmitted,
  logQuoteSubmitFailed,
} from '@/lib/logging/events';
import { logger } from '@/lib/logging/logger';

export type SubmitQuoteResult = {
  /** True when validation passed AND (DB saved OR notification pipeline succeeded). */
  success: boolean;
  dbSaved: boolean;
  quoteId?: string;
  errors?: Record<string, string[]>;
  dbError?: string;
  dbErrorCode?: string;
  /** Which insert path worked — visible in dev / Vercel function logs */
  persistPath?: string;
  persistAttempts?: string[];
  notification?: {
    teamEmailSent: boolean;
    confirmationSent: boolean;
    brevoSynced: boolean;
  };
  /** Env diagnostics (safe — no secrets) */
  env?: {
    supabasePublic: boolean;
    supabaseServiceRole: boolean;
  };
};

export async function submitQuoteRequest(
  raw: unknown
): Promise<SubmitQuoteResult> {
  const startedAt = Date.now();
  const env = {
    supabasePublic: isSupabaseConfigured(),
    supabaseServiceRole: isSupabaseAdminConfigured(),
  };

  logger.info('quote.action_started', { env });

  const parsed = quoteRequestSchema.safeParse(raw);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    logQuoteSubmitFailed({ reason: 'validation', errors });
    return { success: false, dbSaved: false, errors, env };
  }

  const input: QuoteRequestInput = parsed.data;
  const record = toQuoteInsert(input);

  const persist = await persistQuoteRequest(record);

  if (!persist.saved) {
    logQuoteSubmitFailed({
      reason: 'database',
      source: record.source,
      errors: {
        message: persist.error,
        code: persist.errorCode,
        hint: persist.errorHint,
        attempts: persist.attempts,
        env,
      },
    });
  }

  const notification = await sendQuoteNotifications(input);

  const dbSaved = persist.saved;
  const notificationOk =
    notification.teamEmailSent || notification.brevoSynced;

  // User-facing success: DB saved OR email/CRM delivered (lead not lost)
  const success = dbSaved || notificationOk;

  logQuoteSubmitted({
    quoteId: persist.quoteId,
    source: record.source,
    destinationSlug: record.destination_slug,
    serviceType: record.service_type,
    fromZip: record.from_zip,
    toZip: record.to_zip,
    durationMs: Date.now() - startedAt,
  });

  logQuoteNotification({
    quoteId: persist.quoteId,
    teamEmailSent: notification.teamEmailSent,
    confirmationSent: notification.confirmationSent,
    brevoSynced: notification.brevoSynced,
    durationMs: notification.durationMs,
  });

  logger.info('quote.action_completed', {
    success,
    dbSaved,
    notificationOk,
    persistPath: persist.path,
    quoteId: persist.quoteId,
    durationMs: Date.now() - startedAt,
    env,
  });

  return {
    success,
    dbSaved,
    quoteId: persist.quoteId,
    dbError: persist.saved ? undefined : persist.error,
    dbErrorCode: persist.errorCode,
    persistPath: persist.path,
    persistAttempts: persist.attempts,
    notification: {
      teamEmailSent: notification.teamEmailSent,
      confirmationSent: notification.confirmationSent,
      brevoSynced: notification.brevoSynced,
    },
    env,
  };
}