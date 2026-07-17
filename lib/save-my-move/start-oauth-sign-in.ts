import 'server-only';

import type { Provider } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import {
  ensureProductionOAuthUrl,
  productionAuthRedirect,
} from '@/lib/save-my-move/auth-redirect';
import {
  authCallbackUrlWithNext,
  sanitizePostLoginPath,
} from '@/lib/save-my-move/redirect';
import {
  fetchOAuthProviderSettings,
  getSupabaseProjectIdForErrors,
  getSupabaseProjectRef,
  mapOAuthErrorReason,
  type SaveMyMoveOAuthProvider,
} from '@/lib/save-my-move/auth-provider-enabled';

type OAuthKickoffOptions = {
  provider: SaveMyMoveOAuthProvider;
  scopes: string;
  queryParams?: Record<string, string>;
  /** Post-login path (e.g. /portal, /portal/claim/…). Defaults to /my-move. */
  nextPath?: string | null;
};

type OAuthKickoffResult =
  | { ok: true; redirectUrl: string }
  | { ok: false; reason: string; detail?: string };

/**
 * Google (and other) OAuth — signInWithOAuth only; settings logged for diagnostics.
 */
export async function startOAuthSignIn(
  options: OAuthKickoffOptions
): Promise<OAuthKickoffResult> {
  const { provider, scopes, queryParams, nextPath } = options;
  const supabase = await createClient();
  const redirectTo = authCallbackUrlWithNext(nextPath);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as Provider,
    options: {
      redirectTo,
      scopes,
      ...(queryParams ? { queryParams } : {}),
    },
  });

  if (data.url) {
    return { ok: true, redirectUrl: ensureProductionOAuthUrl(data.url) };
  }

  const settings = await fetchOAuthProviderSettings({ forceRefresh: true });
  console.error(`[auth/${provider}] signInWithOAuth failed`, {
    message: error?.message,
    projectRef: getSupabaseProjectRef(),
    fullSettingsResponse: settings.fullResponse,
    settingsApiFlag: settings.providers[provider],
  });

  return {
    ok: false,
    reason: mapOAuthErrorReason(provider, error?.message ?? 'unknown'),
    detail: error?.message,
  };
}

export { kickoffFacebookOAuth as startFacebookOAuthSignIn } from '@/lib/save-my-move/facebook-oauth-kickoff';

export function oauthErrorRedirect(
  reason: string,
  request?: Request,
  extra?: Record<string, string>
): string {
  const next = sanitizePostLoginPath(extra?.next);
  const params = new URLSearchParams({
    auth: 'error',
    reason,
    project: getSupabaseProjectIdForErrors(),
  });
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      if (key === 'next') continue;
      if (value) params.set(key, value);
    }
  }
  if (next.startsWith('/portal')) {
    params.set('next', next);
    return productionAuthRedirect(`/portal/login?${params.toString()}`, request);
  }
  return productionAuthRedirect(`/my-move?${params.toString()}`, request);
}