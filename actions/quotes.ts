'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import {
  quoteRequestSchema,
  toQuoteInsert,
  type QuoteRequestInput,
} from '@/lib/quotes/schema';
import { sendQuoteNotifications } from '@/lib/quotes/notify';
import {
  logQuoteNotification,
  logQuoteSubmitted,
  logQuoteSubmitFailed,
} from '@/lib/logging/events';

export type SubmitQuoteResult = {
  success: boolean;
  quoteId?: string;
  errors?: Record<string, string[]>;
  notification?: {
    teamEmailSent: boolean;
    confirmationSent: boolean;
    brevoSynced: boolean;
  };
};

export async function submitQuoteRequest(
  raw: unknown
): Promise<SubmitQuoteResult> {
  const startedAt = Date.now();
  const parsed = quoteRequestSchema.safeParse(raw);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    logQuoteSubmitFailed({ reason: 'validation', errors });
    return { success: false, errors };
  }

  const input: QuoteRequestInput = parsed.data;
  const record = toQuoteInsert(input);
  let quoteId: string | undefined;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      let { data, error } = await supabase
        .from('quote_requests')
        .insert(record)
        .select('id')
        .single();

      // Graceful fallback if extended columns migration not yet applied
      if (error?.message?.includes('column')) {
        const {
          estimated_weight: _w,
          inventory: _i,
          service_type: _s,
          auto_transport: _a,
          ...legacyRecord
        } = record;
        const retry = await supabase
          .from('quote_requests')
          .insert(legacyRecord)
          .select('id')
          .single();
        data = retry.data;
        error = retry.error;
      }

      if (error) {
        logQuoteSubmitFailed({
          reason: 'database',
          source: record.source,
          errors: error.message,
        });
      } else {
        quoteId = data?.id;
      }
    } catch (err) {
      logQuoteSubmitFailed({
        reason: 'database_exception',
        source: record.source,
        errors: err instanceof Error ? err.message : 'unknown',
      });
    }
  }

  const notification = await sendQuoteNotifications(input);

  logQuoteSubmitted({
    quoteId,
    source: record.source,
    destinationSlug: record.destination_slug,
    serviceType: record.service_type,
    fromZip: record.from_zip,
    toZip: record.to_zip,
    durationMs: Date.now() - startedAt,
  });

  logQuoteNotification({
    quoteId,
    teamEmailSent: notification.teamEmailSent,
    confirmationSent: notification.confirmationSent,
    brevoSynced: notification.brevoSynced,
    durationMs: notification.durationMs,
  });

  return {
    success: true,
    quoteId,
    notification: {
      teamEmailSent: notification.teamEmailSent,
      confirmationSent: notification.confirmationSent,
      brevoSynced: notification.brevoSynced,
    },
  };
}