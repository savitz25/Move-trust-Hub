import 'server-only';

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/config';

export type SaveMyMoveOAuthProvider = 'google' | 'facebook';

type AuthSettingsExternal = Partial<Record<SaveMyMoveOAuthProvider, boolean>>;

export type OAuthProviderSettingsSnapshot = {
  projectRef: string | null;
  providers: AuthSettingsExternal;
  /** Complete /auth/v1/settings JSON — diagnostic only. */
  fullResponse: Record<string, unknown> | null;
  fetchedAt: string;
  httpStatus?: number;
  cacheBuster: string;
};

const SUPABASE_PROJECT_REF = 'uvqkyupfnpswdozmuzih';

/**
 * Force-refresh Supabase auth settings — diagnostic only, never used to gate OAuth.
 */
export async function fetchOAuthProviderSettings(
  options: { forceRefresh?: boolean } = {}
): Promise<OAuthProviderSettingsSnapshot> {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  const projectRef = getSupabaseProjectRef();
  const cacheBuster = String(options.forceRefresh !== false ? Date.now() : 0);

  if (!url || !anonKey) {
    return {
      projectRef,
      providers: {},
      fullResponse: null,
      fetchedAt: new Date().toISOString(),
      cacheBuster,
    };
  }

  try {
    const res = await fetch(`${url}/auth/v1/settings?_=${cacheBuster}&force=1`, {
      headers: {
        apikey: anonKey,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    const fullResponse = (await res.json()) as Record<string, unknown>;
    const external = (fullResponse.external ?? {}) as AuthSettingsExternal;
    return {
      projectRef,
      providers: external,
      fullResponse,
      fetchedAt: new Date().toISOString(),
      httpStatus: res.status,
      cacheBuster,
    };
  } catch (err) {
    return {
      projectRef,
      providers: {},
      fullResponse: { error: err instanceof Error ? err.message : 'fetch_failed' },
      fetchedAt: new Date().toISOString(),
      cacheBuster,
    };
  }
}

/** Fire-and-forget settings log — never awaited before OAuth kickoff. */
export function logSettingsSnapshotAsync(label: string): void {
  void fetchOAuthProviderSettings({ forceRefresh: true }).then((snapshot) => {
    console.info(`[auth/facebook] ${label}`, {
      projectRef: snapshot.projectRef,
      cacheBuster: snapshot.cacheBuster,
      httpStatus: snapshot.httpStatus,
      settingsApiFacebook: snapshot.providers.facebook,
      fullSettingsResponse: snapshot.fullResponse,
      note: 'Diagnostic only — does not gate OAuth',
    });
  });
}

export function getSupabaseProjectRef(): string | null {
  const url = getSupabaseUrl();
  if (!url) return SUPABASE_PROJECT_REF;
  try {
    return new URL(url).hostname.split('.')[0] ?? SUPABASE_PROJECT_REF;
  } catch {
    return SUPABASE_PROJECT_REF;
  }
}

export function getSupabaseProjectIdForErrors(): string {
  return getSupabaseProjectRef() ?? SUPABASE_PROJECT_REF;
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