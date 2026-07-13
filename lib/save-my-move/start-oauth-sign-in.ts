import 'server-only';

import type { Provider } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import {
  AUTH_CALLBACK_URL,
  ensureProductionOAuthUrl,
  productionAuthRedirect,
} from '@/lib/save-my-move/auth-redirect';
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
  const { provider, scopes, queryParams } = options;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as Provider,
    options: {
      redirectTo: AUTH_CALLBACK_URL,
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
  const params = new URLSearchParams({
    auth: 'error',
    reason,
    project: getSupabaseProjectIdForErrors(),
    ...extra,
  });
  return productionAuthRedirect(`/my-move?${params.toString()}`, request);
}