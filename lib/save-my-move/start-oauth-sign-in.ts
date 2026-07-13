import 'server-only';

import type { Provider } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
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
import {
  generateCodeChallenge,
  generateCodeVerifier,
  supabasePkceVerifierCookieName,
} from '@/lib/save-my-move/oauth-pkce';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/config';

type OAuthKickoffOptions = {
  provider: SaveMyMoveOAuthProvider;
  scopes: string;
  queryParams?: Record<string, string>;
};

type OAuthKickoffResult =
  | { ok: true; redirectUrl: string; method: 'signInWithOAuth' | 'manual_authorize' }
  | { ok: false; reason: string; detail?: string; diagnostics?: Record<string, unknown> };

function logOAuthDiagnostics(
  provider: SaveMyMoveOAuthProvider,
  phase: string,
  payload: Record<string, unknown>
) {
  console.info(`[auth/${provider}] ${phase}`, payload);
}

/**
 * Build authorize URL directly — bypasses SDK provider preflight when signInWithOAuth fails.
 * Stores PKCE verifier in the cookie Supabase SSR expects for /auth/callback.
 */
async function buildManualAuthorizeUrl(
  provider: SaveMyMoveOAuthProvider,
  scopes: string,
  queryParams?: Record<string, string>
): Promise<string | null> {
  const supabaseUrl = getSupabaseUrl();
  const projectRef = getSupabaseProjectRef();
  if (!supabaseUrl || !projectRef) return null;

  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const cookieStore = await cookies();
  cookieStore.set(supabasePkceVerifierCookieName(projectRef), verifier, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
  });

  const params = new URLSearchParams({
    provider,
    redirect_to: AUTH_CALLBACK_URL,
    scopes,
    code_challenge: challenge,
    code_challenge_method: 's256',
  });
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      params.set(key, value);
    }
  }

  return `${supabaseUrl}/auth/v1/authorize?${params.toString()}`;
}

async function trySignInWithOAuth(
  options: OAuthKickoffOptions
): Promise<{ url: string | null; error: string | null }> {
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

  return {
    url: data.url ? ensureProductionOAuthUrl(data.url) : null,
    error: error?.message ?? null,
  };
}

/**
 * Start OAuth — signInWithOAuth is authoritative; settings API is diagnostic only.
 */
export async function startOAuthSignIn(
  options: OAuthKickoffOptions
): Promise<OAuthKickoffResult> {
  const { provider, scopes, queryParams } = options;
  const settingsBefore = await fetchOAuthProviderSettings({ forceRefresh: true });

  logOAuthDiagnostics(provider, 'settings_snapshot_before_oauth', {
    projectRef: settingsBefore.projectRef,
    settingsApiFacebook: settingsBefore.providers.facebook,
    settingsApiGoogle: settingsBefore.providers.google,
    settingsFetchedAt: settingsBefore.fetchedAt,
    settingsHttpStatus: settingsBefore.httpStatus,
    note: 'Advisory only — never blocks OAuth',
  });

  const oauthAttempt = await trySignInWithOAuth(options);

  if (oauthAttempt.url) {
    logOAuthDiagnostics(provider, 'signInWithOAuth_success', {
      projectRef: getSupabaseProjectRef(),
      settingsApiFlag: settingsBefore.providers[provider],
      oauthResult: 'url_returned',
    });
    return { ok: true, redirectUrl: oauthAttempt.url, method: 'signInWithOAuth' };
  }

  logOAuthDiagnostics(provider, 'signInWithOAuth_failed', {
    projectRef: getSupabaseProjectRef(),
    error: oauthAttempt.error,
    settingsApiFlag: settingsBefore.providers[provider],
    settingsFetchedAt: settingsBefore.fetchedAt,
  });

  return {
    ok: false,
    reason: mapOAuthErrorReason(provider, oauthAttempt.error ?? 'unknown'),
    detail: oauthAttempt.error ?? undefined,
    diagnostics: {
      projectRef: getSupabaseProjectRef(),
      settingsApiFlag: settingsBefore.providers[provider],
      settingsFetchedAt: settingsBefore.fetchedAt,
    },
  };
}

/**
 * Facebook OAuth — never blocks on settings API; falls back to manual authorize URL.
 */
export async function startFacebookOAuthSignIn(): Promise<OAuthKickoffResult> {
  const provider = 'facebook' as const;
  const scopes = 'email public_profile';
  const settingsBefore = await fetchOAuthProviderSettings({ forceRefresh: true });

  logOAuthDiagnostics(provider, 'facebook_kickoff_start', {
    projectRef: settingsBefore.projectRef,
    settingsApiFacebook: settingsBefore.providers.facebook,
    settingsApiRaw: settingsBefore.rawExternal,
    settingsFetchedAt: settingsBefore.fetchedAt,
    settingsHttpStatus: settingsBefore.httpStatus,
    bypassSettingsGate: true,
  });

  const oauthAttempt = await trySignInWithOAuth({ provider, scopes });

  if (oauthAttempt.url) {
    logOAuthDiagnostics(provider, 'signInWithOAuth_success', {
      projectRef: getSupabaseProjectRef(),
      settingsApiFacebook: settingsBefore.providers.facebook,
      oauthResult: 'url_returned',
      mismatch: settingsBefore.providers.facebook !== true,
    });
    return { ok: true, redirectUrl: oauthAttempt.url, method: 'signInWithOAuth' };
  }

  logOAuthDiagnostics(provider, 'signInWithOAuth_failed_trying_manual_authorize', {
    projectRef: getSupabaseProjectRef(),
    error: oauthAttempt.error,
    settingsApiFacebook: settingsBefore.providers.facebook,
  });

  const manualUrl = await buildManualAuthorizeUrl(provider, scopes);
  if (manualUrl) {
    logOAuthDiagnostics(provider, 'manual_authorize_fallback_success', {
      projectRef: getSupabaseProjectRef(),
      settingsApiFacebook: settingsBefore.providers.facebook,
      priorOAuthError: oauthAttempt.error,
    });
    return {
      ok: true,
      redirectUrl: ensureProductionOAuthUrl(manualUrl),
      method: 'manual_authorize',
    };
  }

  const anonKeyPresent = Boolean(getSupabaseAnonKey());
  const urlPresent = Boolean(getSupabaseUrl());

  console.error(`[auth/facebook] all kickoff methods failed`, {
    projectRef: getSupabaseProjectRef(),
    oauthError: oauthAttempt.error,
    settingsApiFacebook: settingsBefore.providers.facebook,
    settingsFetchedAt: settingsBefore.fetchedAt,
    env: { urlPresent, anonKeyPresent },
  });

  return {
    ok: false,
    reason: mapOAuthErrorReason(provider, oauthAttempt.error ?? 'unknown'),
    detail: oauthAttempt.error ?? undefined,
    diagnostics: {
      projectRef: getSupabaseProjectRef(),
      settingsApiFacebook: settingsBefore.providers.facebook,
      settingsFetchedAt: settingsBefore.fetchedAt,
      triedManualAuthorize: true,
    },
  };
}

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