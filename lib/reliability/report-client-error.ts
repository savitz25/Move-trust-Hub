import type { ClientErrorPayload } from '@/lib/reliability/client-error-types';

/**
 * Fire-and-forget client error report. Never throws; never blocks UI.
 */
export function reportClientError(payload: ClientErrorPayload): void {
  if (typeof window === 'undefined') return;

  try {
    // Always leave a console breadcrumb for PSI / DevTools
    console.error('[mth.client_error]', payload.kind, payload.message, {
      pathname: payload.pathname,
      source: payload.source,
    });
  } catch {
    // ignore
  }

  try {
    const body = JSON.stringify(payload);
    const url = '/api/client-errors';
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      if (navigator.sendBeacon(url, blob)) return;
    }
    void fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
      credentials: 'same-origin',
    }).catch(() => {});
  } catch {
    // ignore
  }
}

export function buildClientErrorPayload(
  partial: Omit<ClientErrorPayload, 'at' | 'pathname' | 'userAgent' | 'href' | 'buildId'> &
    Partial<Pick<ClientErrorPayload, 'pathname' | 'userAgent' | 'href' | 'buildId'>>
): ClientErrorPayload {
  const win = typeof window !== 'undefined' ? window : null;
  return {
    ...partial,
    at: new Date().toISOString(),
    pathname: partial.pathname ?? (win?.location?.pathname || undefined),
    href: partial.href ?? (win?.location?.href || undefined),
    userAgent:
      partial.userAgent ??
      (typeof navigator !== 'undefined' ? navigator.userAgent : undefined),
    buildId:
      partial.buildId ??
      (typeof document !== 'undefined'
        ? document.documentElement.dataset.buildId
        : undefined),
  };
}
