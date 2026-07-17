/** Default landing page after Save My Move sign-in. */
export const DEFAULT_POST_LOGIN_PATH = '/my-move';

/** Production site origin — never use localhost or Vercel preview URLs for auth. */
export const PRODUCTION_SITE_ORIGIN = 'https://www.movetrusthub.com';

/**
 * Canonical OAuth / magic-link callback — must match Supabase Auth redirect allowlist.
 * Do not use window.location.origin; preview/staging hosts are not registered with Google.
 */
export const AUTH_CALLBACK_URL = `${PRODUCTION_SITE_ORIGIN}/auth/callback`;

const LOCAL_HOST_PATTERN = /localhost|127\.0\.0\.1/i;

/** True when a URL points at local development (must not be used for OAuth redirects). */
export function isLocalAuthUrl(url: string): boolean {
  try {
    return LOCAL_HOST_PATTERN.test(new URL(url).host);
  } catch {
    return LOCAL_HOST_PATTERN.test(url);
  }
}

/**
 * Post-auth browser redirect — production always uses movetrusthub.com,
 * never request origin (avoids Supabase Site URL localhost fallback leaking through).
 */
export function productionAuthRedirect(path: string, request?: Request): string {
  const safePath = path.startsWith('/') ? path : `/${path}`;
  if (process.env.NODE_ENV === 'development') {
    const origin = request ? new URL(request.url).origin : 'http://localhost:3000';
    return `${origin}${safePath}`;
  }
  return `${PRODUCTION_SITE_ORIGIN}${safePath}`;
}

/** Auth callback URL with optional post-login `next` path (portal, my-move, etc.). */
export function authCallbackUrlWithNext(nextPath?: string | null): string {
  const next = sanitizePostLoginPath(nextPath);
  return `${AUTH_CALLBACK_URL}?next=${encodeURIComponent(next)}`;
}

/**
 * Force redirect_to / emailRedirectTo to the production callback.
 * Supabase may substitute Site URL (e.g. localhost:3000) when allowlist is wrong.
 * Preserves `next` when present so portal OAuth still lands on /portal.
 */
export function ensureProductionOAuthUrl(oauthUrl: string): string {
  try {
    const parsed = new URL(oauthUrl);
    const redirectTo = parsed.searchParams.get('redirect_to');
    if (!redirectTo || isLocalAuthUrl(redirectTo)) {
      let nextFromRedirect: string | null = null;
      if (redirectTo) {
        try {
          nextFromRedirect = new URL(redirectTo).searchParams.get('next');
        } catch {
          nextFromRedirect = null;
        }
      }
      parsed.searchParams.set(
        'redirect_to',
        nextFromRedirect
          ? authCallbackUrlWithNext(nextFromRedirect)
          : AUTH_CALLBACK_URL
      );
    }
    return parsed.toString();
  } catch {
    return oauthUrl;
  }
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