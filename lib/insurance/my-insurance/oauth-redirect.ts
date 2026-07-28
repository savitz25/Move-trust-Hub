import 'server-only';

import {
  AUTH_CALLBACK_URL,
  PRODUCTION_SITE_ORIGIN,
  sanitizePostLoginPath,
} from '@/lib/insurance/my-insurance/constants';

/**
 * Force Supabase authorize `redirect_to` onto InsuranceTrustHub insurance callback.
 * Shared projects often use Move as Site URL; without this, Google/Facebook land on
 * movetrusthub.com/auth/callback and users end up in My Move.
 */
export function ensureInsuranceOAuthUrl(
  oauthUrl: string,
  nextPath?: string | null
): string {
  try {
    const parsed = new URL(oauthUrl);
    const next = sanitizePostLoginPath(nextPath);
    const desired = `${AUTH_CALLBACK_URL}?next=${encodeURIComponent(next)}`;
    parsed.searchParams.set('redirect_to', desired);
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

/** True when a callback URL is (or should be) the Insurance OAuth return path. */
export function isInsuranceCallbackUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host !== 'insurancetrusthub.com') return false;
    return (
      u.pathname === '/auth/insurance/callback' ||
      u.pathname === '/auth/callback' ||
      u.pathname.startsWith('/auth/insurance/')
    );
  } catch {
    return false;
  }
}
