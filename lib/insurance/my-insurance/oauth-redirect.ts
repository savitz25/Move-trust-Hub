import 'server-only';

import {
  AUTH_CALLBACK_PATH,
  AUTH_CALLBACK_URL,
  PRODUCTION_SITE_ORIGIN,
  sanitizePostLoginPath,
} from '@/lib/insurance/my-insurance/constants';

/**
 * Supabase Site URL for the shared monorepo project is typically MoveTrustHub.
 * OAuth `redirect_to` must be on the allowlist (usually Site URL host) or Supabase
 * drops the app back on Move without `next` → My Move.
 *
 * Bridge strategy:
 * 1. Start OAuth on ITH (PKCE cookie lives on insurancetrusthub.com)
 * 2. redirect_to = Move /auth/callback?next=/my-insurance&hub=insurance  (allowlisted)
 * 3. Move callback does NOT exchange code; 302 to ITH /auth/insurance/callback
 * 4. ITH exchanges code (PKCE present) and stays on Insurance HQ
 */
export const MOVE_OAUTH_BRIDGE_CALLBACK =
  process.env.INSURANCE_OAUTH_BRIDGE_URL?.trim() ||
  'https://www.movetrusthub.com/auth/callback';

/** Build redirect_to for Insurance Google/Facebook OAuth. */
export function buildInsuranceOAuthRedirectTo(nextPath?: string | null): string {
  const next = sanitizePostLoginPath(nextPath);
  // Prefer direct ITH callback when env forces it (dedicated Supabase / allowlist ready)
  if (process.env.INSURANCE_OAUTH_DIRECT === '1') {
    return `${AUTH_CALLBACK_URL}?next=${encodeURIComponent(next)}&hub=insurance`;
  }
  const bridge = new URL(MOVE_OAUTH_BRIDGE_CALLBACK);
  bridge.searchParams.set('next', next);
  bridge.searchParams.set('hub', 'insurance');
  return bridge.toString();
}

/**
 * Force Supabase authorize `redirect_to` to the Insurance bridge/callback.
 */
export function ensureInsuranceOAuthUrl(
  oauthUrl: string,
  nextPath?: string | null
): string {
  try {
    const parsed = new URL(oauthUrl);
    parsed.searchParams.set('redirect_to', buildInsuranceOAuthRedirectTo(nextPath));
    return parsed.toString();
  } catch {
    return oauthUrl;
  }
}

/** Absolute post-login URL on ITH only. */
export function insuranceAuthSuccessUrl(nextPath?: string | null): string {
  const next = sanitizePostLoginPath(nextPath);
  return new URL(next, PRODUCTION_SITE_ORIGIN).toString();
}

export function insuranceAuthErrorUrl(nextPath?: string | null): string {
  const next = sanitizePostLoginPath(nextPath);
  return new URL(
    `/my-insurance?auth=error&next=${encodeURIComponent(next)}`,
    PRODUCTION_SITE_ORIGIN
  ).toString();
}

/** Hand off OAuth code to ITH without exchanging on Move. */
export function insuranceCallbackHandoffUrl(search: string): string {
  const q = search.startsWith('?') ? search : search ? `?${search}` : '';
  const dest = new URL(`${AUTH_CALLBACK_PATH}${q}`, PRODUCTION_SITE_ORIGIN);
  if (!dest.searchParams.get('next')) {
    dest.searchParams.set('next', '/my-insurance');
  }
  dest.searchParams.set('hub', 'insurance');
  return dest.toString();
}
