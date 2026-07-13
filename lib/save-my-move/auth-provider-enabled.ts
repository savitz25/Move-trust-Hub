import 'server-only';

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/config';

export type SaveMyMoveOAuthProvider = 'google' | 'facebook';

type AuthSettingsExternal = Partial<Record<SaveMyMoveOAuthProvider, boolean>>;

export type OAuthProviderSettingsSnapshot = {
  projectRef: string | null;
  providers: AuthSettingsExternal;
  fetchedAt: string;
};

/** Live provider flags from Supabase — never cached (settings API can lag the dashboard). */
export async function fetchOAuthProviderSettings(): Promise<OAuthProviderSettingsSnapshot> {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  const projectRef = getSupabaseProjectRef();

  if (!url || !anonKey) {
    return { projectRef, providers: {}, fetchedAt: new Date().toISOString() };
  }

  try {
    const res = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: anonKey },
      cache: 'no-store',
    });
    if (!res.ok) {
      return { projectRef, providers: {}, fetchedAt: new Date().toISOString() };
    }
    const settings = (await res.json()) as { external?: AuthSettingsExternal };
    return {
      projectRef,
      providers: settings.external ?? {},
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return { projectRef, providers: {}, fetchedAt: new Date().toISOString() };
  }
}

/**
 * Advisory check only — do NOT block OAuth on this result.
 * Supabase /auth/v1/settings can report false while signInWithOAuth still works.
 */
export async function isOAuthProviderEnabled(
  provider: SaveMyMoveOAuthProvider
): Promise<boolean> {
  const { providers } = await fetchOAuthProviderSettings();
  return providers[provider] === true;
}

export function getSupabaseProjectRef(): string | null {
  const url = getSupabaseUrl();
  if (!url) return null;
  try {
    return new URL(url).hostname.split('.')[0] ?? null;
  } catch {
    return null;
  }
}

/** Map Supabase OAuth errors to user-facing redirect reasons. */
export function mapOAuthErrorReason(
  provider: SaveMyMoveOAuthProvider,
  message: string
): string {
  const lower = message.toLowerCase();
  if (
    lower.includes('provider is not enabled') ||
    lower.includes('unsupported provider') ||
    lower.includes('validation_failed')
  ) {
    return `${provider}_not_enabled`;
  }
  if (lower.includes('redirect') || lower.includes('callback')) {
    return `${provider}_redirect`;
  }
  return provider;
}