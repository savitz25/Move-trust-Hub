import 'server-only';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import {
  AUTH_CALLBACK_URL,
  ensureProductionOAuthUrl,
} from '@/lib/save-my-move/auth-redirect';
import {
  fetchOAuthProviderSettings,
  getSupabaseProjectRef,
  mapOAuthErrorReason,
} from '@/lib/save-my-move/auth-provider-enabled';
import {
  generateCodeChallenge,
  generateCodeVerifier,
  supabasePkceVerifierCookieName,
} from '@/lib/save-my-move/oauth-pkce';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/config';
import type { Database } from '@/types/supabase';

const FACEBOOK_SCOPES = 'email public_profile';

export type FacebookKickoffResult =
  | { ok: true; redirectUrl: string; method: 'signInWithOAuth_ssr' | 'signInWithOAuth_plain' | 'manual_authorize' }
  | { ok: false; reason: string; detail?: string; diagnostics?: Record<string, unknown> };

async function buildManualAuthorizeUrl(): Promise<string | null> {
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
    provider: 'facebook',
    redirect_to: AUTH_CALLBACK_URL,
    scopes: FACEBOOK_SCOPES,
    code_challenge: challenge,
    code_challenge_method: 's256',
  });

  return `${supabaseUrl}/auth/v1/authorize?${params.toString()}`;
}

async function trySignInWithOAuthSsr(): Promise<{ url: string | null; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: AUTH_CALLBACK_URL,
      scopes: FACEBOOK_SCOPES,
    },
  });
  return {
    url: data.url ? ensureProductionOAuthUrl(data.url) : null,
    error: error?.message ?? null,
  };
}

/** Plain client — avoids SSR cookie edge cases during URL generation. */
async function trySignInWithOAuthPlain(): Promise<{ url: string | null; error: string | null }> {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return { url: null, error: 'missing_env' };

  const supabase = createSupabaseClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: AUTH_CALLBACK_URL,
      scopes: FACEBOOK_SCOPES,
    },
  });
  return {
    url: data.url ? ensureProductionOAuthUrl(data.url) : null,
    error: error?.message ?? null,
  };
}

/**
 * Facebook OAuth — zero settings preflight. Always attempts OAuth, then fallbacks.
 * Settings API is logged for diagnostics only (can report false while OAuth works).
 */
export async function kickoffFacebookOAuth(): Promise<FacebookKickoffResult> {
  const errors: string[] = [];

  // 1) signInWithOAuth via SSR client — no settings check
  const ssrAttempt = await trySignInWithOAuthSsr();
  if (ssrAttempt.url) {
    console.info('[auth/facebook] signInWithOAuth_ssr success', {
      projectRef: getSupabaseProjectRef(),
    });
    void logSettingsAfterSuccess('signInWithOAuth_ssr');
    return { ok: true, redirectUrl: ssrAttempt.url, method: 'signInWithOAuth_ssr' };
  }
  if (ssrAttempt.error) errors.push(`ssr: ${ssrAttempt.error}`);

  console.warn('[auth/facebook] signInWithOAuth_ssr failed, trying plain client', {
    error: ssrAttempt.error,
    projectRef: getSupabaseProjectRef(),
  });

  // 2) signInWithOAuth via plain client
  const plainAttempt = await trySignInWithOAuthPlain();
  if (plainAttempt.url) {
    console.info('[auth/facebook] signInWithOAuth_plain success', {
      projectRef: getSupabaseProjectRef(),
      priorErrors: errors,
    });
    void logSettingsAfterSuccess('signInWithOAuth_plain');
    return { ok: true, redirectUrl: plainAttempt.url, method: 'signInWithOAuth_plain' };
  }
  if (plainAttempt.error) errors.push(`plain: ${plainAttempt.error}`);

  console.warn('[auth/facebook] signInWithOAuth_plain failed, trying manual authorize URL', {
    errors,
    projectRef: getSupabaseProjectRef(),
  });

  // 3) Manual authorize URL — bypasses SDK provider validation entirely
  const manualUrl = await buildManualAuthorizeUrl();
  if (manualUrl) {
    console.info('[auth/facebook] manual_authorize fallback success', {
      projectRef: getSupabaseProjectRef(),
      priorErrors: errors,
    });
    void logSettingsAfterSuccess('manual_authorize');
    return {
      ok: true,
      redirectUrl: ensureProductionOAuthUrl(manualUrl),
      method: 'manual_authorize',
    };
  }
  errors.push('manual: could not build authorize URL');

  const settings = await fetchOAuthProviderSettings({ forceRefresh: true });
  console.error('[auth/facebook] all kickoff methods failed', {
    projectRef: getSupabaseProjectRef(),
    errors,
    fullSettingsResponse: settings.fullResponse,
    settingsApiFacebook: settings.providers.facebook,
    settingsFetchedAt: settings.fetchedAt,
    cacheBuster: settings.cacheBuster,
  });

  const lastError = plainAttempt.error ?? ssrAttempt.error ?? 'unknown';
  return {
    ok: false,
    reason: mapOAuthErrorReason('facebook', lastError),
    detail: errors.join(' | '),
    diagnostics: {
      projectRef: getSupabaseProjectRef(),
      errors,
      settingsApiFacebook: settings.providers.facebook,
      fullSettingsResponse: settings.fullResponse,
    },
  };
}

async function logSettingsAfterSuccess(method: string): Promise<void> {
  const settings = await fetchOAuthProviderSettings({ forceRefresh: true });
  console.info(`[auth/facebook] settings_after_${method}`, {
    projectRef: settings.projectRef,
    settingsApiFacebook: settings.providers.facebook,
    mismatch: settings.providers.facebook !== true,
    fullSettingsResponse: settings.fullResponse,
    cacheBuster: settings.cacheBuster,
    note: 'Settings API is advisory — OAuth succeeded regardless',
  });
}