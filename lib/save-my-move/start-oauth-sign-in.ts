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
 * Start OAuth via signInWithOAuth — authoritative provider check.
 * Settings API preflight is diagnostic only (can falsely report disabled).
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

  if (error) {
    const settings = await fetchOAuthProviderSettings();
    const settingsFlag = settings.providers[provider];
    console.error(`[auth/${provider}] signInWithOAuth failed`, {
      message: error.message,
      projectRef: getSupabaseProjectRef(),
      settingsApiFlag: settingsFlag,
      settingsFetchedAt: settings.fetchedAt,
    });
    return {
      ok: false,
      reason: mapOAuthErrorReason(provider, error.message),
      detail: error.message,
    };
  }

  if (!data.url) {
    return { ok: false, reason: provider };
  }

  const settings = await fetchOAuthProviderSettings();
  if (settings.providers[provider] !== true) {
    console.warn(`[auth/${provider}] settings API reports disabled but OAuth URL returned`, {
      projectRef: getSupabaseProjectRef(),
      settingsApiFlag: settings.providers[provider],
      settingsFetchedAt: settings.fetchedAt,
    });
  }

  return { ok: true, redirectUrl: ensureProductionOAuthUrl(data.url) };
}

export function oauthErrorRedirect(reason: string, request?: Request): string {
  const params = new URLSearchParams({ auth: 'error', reason });
  return productionAuthRedirect(`/my-move?${params.toString()}`, request);
}