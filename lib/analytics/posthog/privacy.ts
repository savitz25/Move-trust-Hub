/**
 * MoveTrustHub analytics privacy. Never send raw search text, PII, tokens, notes, or regulatory IDs.
 */

export const SENSITIVE_QUERY_KEYS = [
  'q',
  'query',
  'question',
  'email',
  'token',
  'code',
  'password',
  'access_token',
  'refresh_token',
  'session',
  'note',
  'notes',
  'body',
  'message',
  'otp',
  'usdot',
  'dot',
  'mc',
] as const;

export const FORBIDDEN_EVENT_KEYS = [
  'q',
  'query',
  'question',
  'email',
  'name',
  'first_name',
  'last_name',
  'phone',
  'address',
  'ssn',
  'password',
  'token',
  'authorization',
  'cookie',
  'nmls',
  'usdot',
  'dot',
  'mc',
  'ccn',
  'crd',
  'npn',
  'note',
  'notes',
  'body',
  'message',
  'href',
  'url',
  'search',
  'entityName',
  'identifierValue',
  'companyName',
  'slug',
] as const;

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isOpaqueTrustHubId(value: string): boolean {
  return UUID.test(value.trim());
}

/** SDK/ingest fields. Stripping `token` makes posthog-js drop the event. */
export const POSTHOG_RESERVED_KEYS = [
  'token',
  'distinct_id',
  'timestamp',
  'uuid',
  'event',
  'offset',
  'api_key',
] as const;

export function isPosthogReservedKey(key: string): boolean {
  const lower = key.toLowerCase();
  if (lower.startsWith('$')) return true;
  return (POSTHOG_RESERVED_KEYS as readonly string[]).includes(lower);
}

export function sanitizePageviewProperties(properties: Record<string, unknown>): Record<string, unknown> {
  if (typeof properties.$current_url === 'string') {
    properties.$current_url = sanitizeAnalyticsUrl(properties.$current_url);
  }
  if (typeof properties.$pathname === 'string') {
    properties.$pathname = String(properties.$pathname).split('?')[0];
  }
  if (typeof properties.$referrer === 'string') {
    properties.$referrer = sanitizeAnalyticsUrl(properties.$referrer);
  }
  const path = String(properties.$pathname || '');
  if (path === '/ask' || path.startsWith('/ask/') || path === '/search' || path === '/verify-dot') {
    properties.$title = 'Move Trust Hub';
    properties.title = 'Move Trust Hub';
    properties.$document_title = 'Move Trust Hub';
  }
  for (const key of Object.keys(properties)) {
    if (isPosthogReservedKey(key)) continue;
    if (FORBIDDEN_EVENT_KEYS.includes(key.toLowerCase() as (typeof FORBIDDEN_EVENT_KEYS)[number])) {
      delete properties[key];
    }
  }
  return properties;
}

export function sanitizeCaptureResult<T extends { event?: string; properties?: Record<string, unknown> } | null>(
  event: T,
): T {
  if (!event) return event;
  if (event.properties) sanitizePageviewProperties(event.properties);
  return event;
}

const SENSITIVE_QUERY_KEY_PATTERN = /token|email|code|password|note|error|handoff|secret|otp|search|phone|address|ssn|authorization|usdot/i;

const SAFE_QUERY_KEYS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'page',
  'sort',
  'ref',
  'next',
  'view',
  'form',
]);

const MAX_URL_LENGTH = 2048;
const MAX_DECODES = 3;
const MAX_NESTED_DEPTH = 3;
const MAX_QUERY_VALUE_LENGTH = 256;
const EMAIL_SHAPED_VALUE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

function canonicalQueryKey(key: string): string {
  return key.trim().toLowerCase().replace(/-/g, '_');
}

function isRegulatoryIdKey(key: string): boolean {
  const compact = canonicalQueryKey(key).replace(/[^a-z0-9]/g, '');
  return compact === 'dot' || compact === 'mc' || compact === 'usdot';
}

export function isSensitiveQueryKey(key: string): boolean {
  const canonical = canonicalQueryKey(key);
  const compact = canonical.replace(/[^a-z0-9]/g, '');
  if (!compact) return true;
  return (
    SENSITIVE_QUERY_KEYS.includes(canonical as (typeof SENSITIVE_QUERY_KEYS)[number]) ||
    SENSITIVE_QUERY_KEY_PATTERN.test(canonical) ||
    SENSITIVE_QUERY_KEY_PATTERN.test(compact) ||
    isRegulatoryIdKey(key) ||
    compact === 'searchterm' ||
    compact === 'authcode' ||
    compact === 'idtoken'
  );
}

function decodeBounded(value: string): string | null {
  let current = value;
  for (let attempt = 0; attempt <= MAX_DECODES; attempt += 1) {
    if (!/%[0-9A-Fa-f]{2}/.test(current)) return current;
    if (/%(?![0-9A-Fa-f]{2})/.test(current)) return null;
    try {
      const next = decodeURIComponent(current);
      if (next === current) return current;
      current = next;
    } catch {
      return null;
    }
  }
  return /%[0-9A-Fa-f]{2}/.test(current) ? null : current;
}

function valueHidesSensitivePair(value: string): boolean {
  if (!value.includes('=')) return false;
  for (const piece of value.split(/[?&#]/)) {
    const eq = piece.indexOf('=');
    if (eq <= 0) continue;
    const decoded = decodeBounded(piece.slice(0, eq));
    if (decoded == null || isSensitiveQueryKey(decoded)) return true;
  }
  return false;
}

function looksLikeNestedUrl(value: string): boolean {
  return /^(?:https?:)?\/\//i.test(value) || /%3A%2F%2F/i.test(value);
}

/**
 * Fail closed. Sensitive names are removed in any case or encoding. Only an explicit
 * allowlist of campaign and navigation keys can remain. Malformed, ambiguous, or
 * excessively nested input is dropped instead of forwarded.
 */
export function sanitizeAnalyticsUrl(raw: string | undefined | null, depth = 0): string | undefined {
  if (!raw) return undefined;
  if (depth > MAX_NESTED_DEPTH || raw.length > MAX_URL_LENGTH) return undefined;
  try {
    const url = new URL(raw, 'https://www.movetrusthub.com');
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined;
    const kept: Array<[string, string]> = [];
    for (const [rawKey, rawValue] of url.searchParams.entries()) {
      const key = decodeBounded(rawKey);
      if (key == null || /[=&\s#]/.test(key)) continue;
      const canonical = canonicalQueryKey(key);
      if (!canonical || isSensitiveQueryKey(key) || !SAFE_QUERY_KEYS.has(canonical)) continue;
      const decodedValue = decodeBounded(rawValue);
      if (decodedValue == null || decodedValue.length > MAX_QUERY_VALUE_LENGTH) continue;
      if (EMAIL_SHAPED_VALUE.test(decodedValue) || valueHidesSensitivePair(decodedValue)) continue;
      if (looksLikeNestedUrl(decodedValue) || looksLikeNestedUrl(rawValue)) {
        const nested = sanitizeAnalyticsUrl(decodedValue, depth + 1);
        if (!nested || valueHidesSensitivePair(nested) || nested.length > MAX_QUERY_VALUE_LENGTH) continue;
        kept.push([canonical, nested]);
        continue;
      }
      kept.push([canonical, decodedValue]);
    }
    const cleaned = new URL(`${url.origin}${url.pathname}`);
    for (const [key, value] of kept) cleaned.searchParams.append(key, value);
    return `${cleaned.origin}${cleaned.pathname}${cleaned.search}`;
  } catch {
    return undefined;
  }
}

export function stripForbiddenProperties(
  props: Record<string, unknown> | undefined,
): Record<string, string | number | boolean> {
  const cleaned: Record<string, string | number | boolean> = {};
  if (!props) return cleaned;
  for (const [key, value] of Object.entries(props)) {
    const lower = key.toLowerCase();
    if (FORBIDDEN_EVENT_KEYS.includes(lower as (typeof FORBIDDEN_EVENT_KEYS)[number])) continue;
    if (/email|password|token|ssn|phone|nmls|usdot|ccn|crd|npn/.test(lower)) continue;
    if (value === null || value === undefined) continue;
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

const APPROVED_PROPERTY_KEYS = new Set([
  'hub',
  'environment',
  'surface',
  'authenticated',
  'specialist_hub',
  'state',
  'capability',
  'result_count',
  'capability_state',
  'success',
  'profile_type',
  'provider_class',
  'action_source',
  'failure_reason',
  'failurereason',
  'auth_state',
  'outcome',
  'profile_class',
]);

const ENVELOPE_PROPERTY_KEYS = new Set(['token', 'api_key']);
const EMAIL_SHAPED = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const URL_PROPERTY_KEY = /url|referrer|href/i;

function isIdentityPropertyKey(key: string): boolean {
  return /distinct_id|device_id|user_id|anonymous_id|person_id/i.test(key);
}

function isApprovedPropertyKey(key: string): boolean {
  if (isIdentityPropertyKey(key)) return false;
  if (ENVELOPE_PROPERTY_KEYS.has(key)) return true;
  if (key.startsWith('$')) {
    if (key === '$ip' || key.startsWith('$exception') || key.startsWith('$snapshot') || key === '$heatmap') return false;
    return true;
  }
  return APPROVED_PROPERTY_KEYS.has(key.toLowerCase());
}

/** New object. Caller identity and unknown keys cannot survive by merging the original bag back. */
function rebuildOutboundProperties(bag: Record<string, unknown>, personBag = false): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(bag)) {
    if (isIdentityPropertyKey(key)) continue;
    if (key === 'token' || key === 'api_key') {
      if (!personBag && (typeof value === 'string' || typeof value === 'number')) out[key] = value;
      continue;
    }
    if (!isApprovedPropertyKey(key) || (!key.startsWith('$') && isSensitiveQueryKey(key))) continue;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      out[key] = rebuildOutboundProperties(value as Record<string, unknown>, personBag || key === '$set' || key === '$set_once');
      continue;
    }
    if (typeof value === 'string') {
      if (EMAIL_SHAPED.test(value)) continue;
      if (URL_PROPERTY_KEY.test(key)) {
        const cleaned = sanitizeAnalyticsUrl(value);
        if (cleaned) out[key] = cleaned;
        continue;
      }
      out[key] = value;
      continue;
    }
    if (typeof value === 'number' || typeof value === 'boolean') out[key] = value;
  }
  return out;
}

/** Allowlisted events only. Replay, exceptions, and unknown names are dropped. */
export function prepareOutboundCapture<T extends { event?: string; properties?: Record<string, unknown> } | null>(
  event: T,
  allowedEvents: ReadonlySet<string>,
): T | null {
  if (!event?.event || !allowedEvents.has(event.event)) return null;
  const sanitized = sanitizeCaptureResult(event);
  if (!sanitized?.properties) return sanitized;
  const rebuilt = rebuildOutboundProperties(sanitized.properties);
  rebuilt.$geoip_disable = true;
  delete rebuilt.$ip;
  sanitized.properties = rebuilt;
  return sanitized;
}
