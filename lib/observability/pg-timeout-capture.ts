import * as Sentry from '@sentry/nextjs';

type DataRoute = 'companies' | 'company_destination_assignments' | 'directory_query_page';

let lastCaptureAt: number | undefined;

/** Best-effort signal only: never forward the error or alter loader control flow. */
export function captureStatementTimeout(error: unknown, dataRoute: DataRoute): void {
  try {
    if (!error || typeof error !== 'object' || !('code' in error) || error.code !== '57014') return;
    const now = Date.now();
    if (lastCaptureAt !== undefined && now - lastCaptureAt < 10_000) return;
    // Reserve before calling Sentry, including when capture itself fails.
    lastCaptureAt = now;
    const context = {
      level: 'warning' as const,
      fingerprint: ['pg-57014'],
      tags: { pg_code: '57014', data_route: dataRoute },
    };
    Sentry.withScope((scope) => {
      // Scope/request integrations can enrich captureMessage. Strip their data
      // for this event only, retaining just SDK identity/time and this signal.
      scope.addEventProcessor((event) => ({
        event_id: event.event_id,
        timestamp: event.timestamp,
        message: 'pg_statement_timeout_57014',
        ...context,
      }));
      Sentry.captureMessage('pg_statement_timeout_57014', context);
    });
  } catch {
    // No logging, retry, or queue: observability must not affect the caller.
  }
}
