import 'server-only';

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/config';

export type SaveMyMoveOAuthProvider = 'google' | 'facebook';

type AuthSettingsExternal = Partial<Record<SaveMyMoveOAuthProvider, boolean>>;

export type OAuthProviderSettingsSnapshot = {
  projectRef: string | null;
  providers: AuthSettingsExternal;
  rawExternal?: AuthSettingsExternal;
  fetchedAt: string;
  httpStatus?: number;
};

const SUPABASE_PROJECT_REF = 'uvqkyupfnpswdozmuzih';

/**
 * Live provider flags from Supabase — always force-refreshed (never cached).
 * Settings API can lag the dashboard; advisory only — never block OAuth on this.
 */
export async function fetchOAuthProviderSettings(
  options: { forceRefresh?: boolean } = {}
): Promise<OAuthProviderSettingsSnapshot> {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  const projectRef = getSupabaseProjectRef();

  if (!url || !anonKey) {
    return { projectRef, providers: {}, fetchedAt: new Date().toISOString() };
  }

  const cacheBuster = options.forceRefresh !== false ? `?_=${Date.now()}` : '';

  try {
    const res = await fetch(`${url}/auth/v1/settings${cacheBuster}`, {
      headers: {
        apikey: anonKey,
        'Cache-Control': 'no-cache, no-store',
        Pragma: 'no-cache',
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      return {
        projectRef,
        providers: {},
        fetchedAt: new Date().toISOString(),
        httpStatus: res.status,
      };
    }
    const settings = (await res.json()) as { external?: AuthSettingsExternal };
    const external = settings.external ?? {};
    return {
      projectRef,
      providers: external,
      rawExternal: external,
      fetchedAt: new Date().toISOString(),
      httpStatus: res.status,
    };
  } catch {
    return { projectRef, providers: {}, fetchedAt: new Date().toISOString() };
  }
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