import { logger } from '@/lib/logging/logger';

export function logQuoteSubmitted(context: {
  quoteId?: string;
  source?: string | null;
  destinationSlug?: string | null;
  serviceType?: string;
  fromZip: string;
  toZip: string;
  durationMs?: number;
}) {
  logger.info('quote.submitted', context);
}

export function logQuoteSubmitFailed(context: {
  reason: string;
  source?: string | null;
  errors?: unknown;
  persistPath?: string;
  dbErrorCode?: string;
}) {
  logger.error('quote.submit_failed', context);
}

export function logQuoteNotification(context: {
  quoteId?: string;
  teamEmailSent: boolean;
  confirmationSent: boolean;
  brevoSynced: boolean;
  durationMs?: number;
}) {
  logger.info('quote.notification_processed', context);
}

export function logAdminAccess(context: { path: string; authenticated: boolean }) {
  logger.info('admin.access', context);
}