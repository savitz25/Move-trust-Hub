/**
 * Next.js startup hook — Sentry (client/server/edge) + env sanity on Node.
 * Non-strict env check so `next build` succeeds without every optional secret.
 */
import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
    const { validateEnv } = await import('@/lib/env');
    validateEnv({ strict: false });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
