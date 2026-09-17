import { analyticsEnvironment, type AnalyticsEnvironment } from '../analytics/posthog/environment';

export function sentryClientDsn(): string {
  return (process.env.NEXT_PUBLIC_SENTRY_DSN || '').trim();
}

export function sentryServerDsn(): string {
  return (process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || '').trim();
}

export function sentryRelease(): string | undefined {
  const sha = (
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    process.env.SENTRY_RELEASE ||
    ''
  ).trim();
  return sha || undefined;
}

export function sentryEnvironment(): AnalyticsEnvironment {
  return analyticsEnvironment();
}

/** Prod 10% (packet 5–10%). Preview lower than prod. Local/dev is full. Never 100% production. */
export function sentryTracesSampleRate(env: AnalyticsEnvironment = sentryEnvironment()): number {
  if (env === 'production') return 0.1;
  if (env === 'preview') return 0.05;
  return 1;
}

export function shouldDropSentryTransaction(name: string): boolean {
  const lower = name.toLowerCase();
  return (
    lower.includes('/sentry-tunnel') ||
    lower.includes('/monitoring') ||
    lower.includes('/api/cron') ||
    lower.includes('/api/refresh/fmcsa') ||
    lower.includes('/api/refresh/bbb') ||
    lower.includes('healthcheck') ||
    lower.includes('/health')
  );
}
