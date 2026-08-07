'use client';

import { useEffect } from 'react';
import {
  CLIENT_ERROR_RELOAD_KEY,
  classifyError,
  isChunkLoadFailure,
} from '@/lib/reliability/client-error-types';
import {
  buildClientErrorPayload,
  reportClientError,
} from '@/lib/reliability/report-client-error';

/**
 * Production client reliability:
 * - Recover once from stale-deploy ChunkLoadError (hard reload)
 * - Report chunk / hydration / uncaught errors for ops (not only PSI)
 *
 * Mount once from root layout. Side-effect only — renders null.
 */
export function ClientRuntimeGuard() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const report = (
      kind: Parameters<typeof buildClientErrorPayload>[0]['kind'],
      message: string,
      extra?: { stack?: string; source?: string }
    ) => {
      reportClientError(
        buildClientErrorPayload({
          kind,
          message: message.slice(0, 800),
          stack: extra?.stack?.slice(0, 2000),
          source: extra?.source,
        })
      );
    };

    const tryRecoverChunk = (message: string, name?: string) => {
      if (!isChunkLoadFailure(message, name)) return false;
      try {
        if (sessionStorage.getItem(CLIENT_ERROR_RELOAD_KEY) === '1') {
          // Already reloaded once this tab session — surface fallback instead of loop
          return false;
        }
        sessionStorage.setItem(CLIENT_ERROR_RELOAD_KEY, '1');
      } catch {
        // sessionStorage blocked — still attempt one soft recovery via location
      }
      report('chunk_load', message, { source: 'chunk_recovery' });
      // Full document load picks up the new deployment’s HTML + chunk map
      window.location.reload();
      return true;
    };

    const onError = (event: ErrorEvent) => {
      const message = event.message || String(event.error?.message || 'unknown');
      const name = event.error?.name;
      if (tryRecoverChunk(message, name)) {
        event.preventDefault();
        return;
      }
      const kind = classifyError(message, name);
      report(kind, message, {
        stack: event.error?.stack,
        source: event.filename
          ? `${event.filename}:${event.lineno || 0}:${event.colno || 0}`
          : 'window.onerror',
      });
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        reason instanceof Error
          ? reason.message
          : typeof reason === 'string'
            ? reason
            : 'Unhandled rejection';
      const name = reason instanceof Error ? reason.name : undefined;
      if (tryRecoverChunk(message, name)) {
        event.preventDefault();
        return;
      }
      report(
        isChunkLoadFailure(message, name) ? 'chunk_load' : 'unhandled_rejection',
        message,
        {
          stack: reason instanceof Error ? reason.stack : undefined,
          source: 'unhandledrejection',
        }
      );
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);

    // Clear reload flag after a clean run (chunks loaded successfully)
    try {
      const clear = window.setTimeout(() => {
        try {
          sessionStorage.removeItem(CLIENT_ERROR_RELOAD_KEY);
        } catch {
          // ignore
        }
      }, 12_000);
      return () => {
        window.clearTimeout(clear);
        window.removeEventListener('error', onError);
        window.removeEventListener('unhandledrejection', onRejection);
      };
    } catch {
      return () => {
        window.removeEventListener('error', onError);
        window.removeEventListener('unhandledrejection', onRejection);
      };
    }
  }, []);

  return null;
}
