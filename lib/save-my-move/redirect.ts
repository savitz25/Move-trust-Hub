/** Default landing page after Save My Move sign-in. */
export const DEFAULT_POST_LOGIN_PATH = '/my-move';

/**
 * Canonical OAuth / magic-link callback — must match Supabase Auth redirect allowlist.
 * Do not use window.location.origin; preview/staging hosts are not registered with Google.
 */
export const AUTH_CALLBACK_URL = 'https://www.movetrusthub.com/auth/callback';

/** Build callback URL with optional post-login path (?next=). */
export function buildAuthCallbackRedirect(next?: string | null): string {
  const safeNext = sanitizePostLoginPath(next);
  if (safeNext === DEFAULT_POST_LOGIN_PATH) {
    return AUTH_CALLBACK_URL;
  }
  return `${AUTH_CALLBACK_URL}?next=${encodeURIComponent(safeNext)}`;
}

const POST_LOGIN_REDIRECT_KEY = 'save-my-move-post-login-redirect';

/**
 * Restrict redirects to same-origin relative paths (open-redirect safe).
 * Preserves query string and hash, e.g. `/compare?slugs=a,b`.
 */
export function sanitizePostLoginPath(path?: string | null): string {
  if (!path) return DEFAULT_POST_LOGIN_PATH;
  const trimmed = path.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
    return DEFAULT_POST_LOGIN_PATH;
  }
  try {
    const url = new URL(trimmed, 'http://local');
    if (url.hostname !== 'local') return DEFAULT_POST_LOGIN_PATH;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return DEFAULT_POST_LOGIN_PATH;
  }
}

/** Current browser path including query string, safe for post-login redirect. */
export function getCurrentPathForRedirect(): string {
  if (typeof window === 'undefined') return DEFAULT_POST_LOGIN_PATH;
  return sanitizePostLoginPath(
    `${window.location.pathname}${window.location.search}${window.location.hash}`
  );
}

/** Persist intended redirect across OAuth / magic-link round trips (callback is primary). */
export function stashPostLoginRedirect(path: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(POST_LOGIN_REDIRECT_KEY, sanitizePostLoginPath(path));
}

export function consumeStashedPostLoginRedirect(): string | null {
  if (typeof window === 'undefined') return null;
  const stored = sessionStorage.getItem(POST_LOGIN_REDIRECT_KEY);
  if (!stored) return null;
  sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY);
  return sanitizePostLoginPath(stored);
}