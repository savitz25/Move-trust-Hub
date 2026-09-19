/**
 * Sentry event scrubbing aligned to lib/analytics/posthog/privacy.ts.
 * Never send passwords, auth tokens, My TrustHub notes, claim docs, or raw search queries.
 */
import {
  FORBIDDEN_EVENT_KEYS,
  SENSITIVE_QUERY_KEYS,
  isOpaqueTrustHubId,
  sanitizeAnalyticsUrl,
} from '../analytics/posthog/privacy';

const SITE_ORIGIN = 'https://www.movetrusthub.com';

export const SENSITIVE_HEADER_NAMES = [
  'authorization',
  'cookie',
  'set-cookie',
  'x-api-key',
  'x-auth-token',
  'x-csrf-token',
  'x-supabase-auth',
  'apikey',
  'proxy-authorization',
] as const;

export const PRIVATE_PATH_PREFIXES = [
  '/my-move',
  '/auth',
  '/portal',
  '/login',
  '/claim',
  '/admin',
  '/api/save-my-move',
  '/api/auth',
  '/api/claim',
  '/api/admin',
  '/api/internal',
  '/api/client-errors',
  '/api/send-quote-email',
] as const;

const SENSITIVE_KEY_PATTERN =
  /email|password|token|secret|ssn|phone|nmls|usdot|ccn|crd|npn|authorization|cookie|note|otp|session|inventory/i;

export type SentryLikeRequest = {
  url?: string;
  query_string?: string | Record<string, unknown> | Array<[string, string]> | null;
  headers?: Record<string, string> | Array<[string, string]>;
  cookies?: Record<string, string> | Array<{ name?: string; value?: string } | [string, string]>;
  data?: unknown;
  env?: Record<string, string>;
};

export type SentryLikeBreadcrumb = {
  category?: string;
  message?: string;
  data?: Record<string, unknown>;
  [key: string]: unknown;
};

export type SentryLikeEvent = {
  request?: SentryLikeRequest;
  user?: {
    id?: string | number;
    email?: string;
    ip_address?: string;
    username?: string;
    [key: string]: unknown;
  } | null;
  extra?: Record<string, unknown>;
  contexts?: Record<string, unknown>;
  tags?: Record<string, string>;
  breadcrumbs?: { values?: SentryLikeBreadcrumb[] } | SentryLikeBreadcrumb[];
  transaction?: string;
  message?: string;
  exception?: {
    values?: Array<{ type?: string; value?: string }>;
  };
  [key: string]: unknown;
};

export function isPrivateSentryPath(pathname: string): boolean {
  const path = pathname.split('?')[0].toLowerCase();
  return PRIVATE_PATH_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export function isSensitiveSentryKey(key: string): boolean {
  const lower = key.toLowerCase();
  if (FORBIDDEN_EVENT_KEYS.includes(lower as (typeof FORBIDDEN_EVENT_KEYS)[number])) return true;
  if (SENSITIVE_QUERY_KEYS.includes(lower as (typeof SENSITIVE_QUERY_KEYS)[number])) return true;
  return SENSITIVE_KEY_PATTERN.test(lower);
}

export function redactSecretText(value: string): string {
  return value
    .replace(/Bearer\s+[A-Za-z0-9\-._~+/]+=*/gi, 'Bearer [Filtered]')
    .replace(/\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9._-]+/g, '[Filtered JWT]');
}

function pathnameFromUrl(raw: string | undefined): string {
  if (!raw) return '';
  try {
    return new URL(raw, SITE_ORIGIN).pathname;
  } catch {
    return raw.split('?')[0];
  }
}

function sanitizeQueryString(
  query: SentryLikeRequest['query_string'],
): SentryLikeRequest['query_string'] {
  if (!query) return query;
  if (typeof query === 'string') {
    const fake = sanitizeAnalyticsUrl(`${SITE_ORIGIN}/?${query.replace(/^\?/, '')}`);
    if (!fake) return '[Filtered]';
    return new URL(fake).search.replace(/^\?/, '');
  }
  if (Array.isArray(query)) {
    return query.filter(([key]) => !isSensitiveSentryKey(String(key)));
  }
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(query)) {
    if (isSensitiveSentryKey(key)) continue;
    cleaned[key] = value;
  }
  return cleaned;
}

function sanitizeHeaders(
  headers: SentryLikeRequest['headers'],
): Record<string, string> | undefined {
  if (!headers) return undefined;
  const entries = Array.isArray(headers) ? headers : Object.entries(headers);
  const cleaned: Record<string, string> = {};
  for (const [key, value] of entries) {
    const name = String(key);
    if (SENSITIVE_HEADER_NAMES.includes(name.toLowerCase() as (typeof SENSITIVE_HEADER_NAMES)[number])) {
      cleaned[name] = '[Filtered]';
      continue;
    }
    if (isSensitiveSentryKey(name)) {
      cleaned[name] = '[Filtered]';
      continue;
    }
    const raw = String(value);
    const lower = name.toLowerCase();
    if (lower === 'referer' || lower === 'referrer' || /^https?:\/\//i.test(raw)) {
      cleaned[name] = sanitizeAnalyticsUrl(raw) || '[Filtered]';
      continue;
    }
    cleaned[name] = redactSecretText(raw);
  }
  return cleaned;
}

function scrubRecord(input: Record<string, unknown> | undefined): Record<string, unknown> | undefined {
  if (!input) return input;
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (isSensitiveSentryKey(key)) continue;
    if (typeof value === 'string') {
      const maybeUrl = sanitizeAnalyticsUrl(value);
      cleaned[key] = value.startsWith('http') && maybeUrl ? maybeUrl : redactSecretText(value);
      continue;
    }
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      cleaned[key] = scrubRecord(value as Record<string, unknown>);
      continue;
    }
    cleaned[key] = value;
  }
  return cleaned;
}

export function scrubSentryBreadcrumb(breadcrumb: SentryLikeBreadcrumb | null): SentryLikeBreadcrumb | null {
  if (!breadcrumb) return breadcrumb;
  const category = String(breadcrumb.category || '');
  if (category === 'ui.input' || category.startsWith('ui.input')) return null;
  if (category === 'console' && /password|authorization|secret/i.test(String(breadcrumb.message || ''))) {
    return null;
  }
  const next: SentryLikeBreadcrumb = { ...breadcrumb };
  if (typeof next.message === 'string') next.message = redactSecretText(next.message);
  if (next.data && typeof next.data === 'object') {
    const data = { ...next.data };
    const sanitizedUrl = typeof data.url === 'string' ? sanitizeAnalyticsUrl(data.url) || '[Filtered]' : undefined;
    const cleaned = scrubRecord(data) as Record<string, unknown>;
    if (sanitizedUrl) cleaned.url = sanitizedUrl;
    next.data = cleaned;
  }
  return next;
}

export function scrubSentryEvent<T extends SentryLikeEvent>(event: T): T {
  const next = { ...event };

  if (next.request) {
    const request = { ...next.request };
    const path = pathnameFromUrl(request.url);
    if (typeof request.url === 'string') {
      request.url = sanitizeAnalyticsUrl(request.url) || '[Filtered]';
    }
    request.query_string = sanitizeQueryString(request.query_string);
    request.headers = sanitizeHeaders(request.headers);
    delete request.cookies;
    delete request.data;
    delete request.env;
    if (isPrivateSentryPath(path)) {
      delete request.cookies;
      delete request.data;
    }
    next.request = request;
  }

  if (next.user) {
    const id = next.user.id == null ? undefined : String(next.user.id);
    next.user = id && isOpaqueTrustHubId(id) ? { id } : null;
  }

  if (next.extra) next.extra = scrubRecord(next.extra);
  if (next.contexts) next.contexts = scrubRecord(next.contexts);
  if (next.tags) {
    const tags: Record<string, string> = {};
    for (const [key, value] of Object.entries(next.tags)) {
      if (isSensitiveSentryKey(key)) continue;
      tags[key] = redactSecretText(String(value));
    }
    next.tags = tags;
  }

  if (typeof next.transaction === 'string') {
    const sanitized = sanitizeAnalyticsUrl(
      `${SITE_ORIGIN}${next.transaction.startsWith('/') ? next.transaction : `/${next.transaction}`}`,
    );
    if (sanitized) {
      try {
        next.transaction = new URL(sanitized).pathname;
      } catch {
        next.transaction = next.transaction.split('?')[0];
      }
    }
  }

  if (typeof next.message === 'string') next.message = redactSecretText(next.message);
  if (next.exception?.values) {
    next.exception = {
      ...next.exception,
      values: next.exception.values.map((item) => ({
        ...item,
        value: typeof item.value === 'string' ? redactSecretText(item.value) : item.value,
      })),
    };
  }

  const crumbs = Array.isArray(next.breadcrumbs) ? next.breadcrumbs : next.breadcrumbs?.values;
  if (crumbs) {
    const cleaned = crumbs
      .map((crumb) => scrubSentryBreadcrumb(crumb))
      .filter((crumb): crumb is SentryLikeBreadcrumb => Boolean(crumb));
    if (Array.isArray(next.breadcrumbs)) next.breadcrumbs = cleaned;
    else next.breadcrumbs = { ...next.breadcrumbs, values: cleaned };
  }

  return next;
}
