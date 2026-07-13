import 'server-only';

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/config';

export type SaveMyMoveOAuthProvider = 'google' | 'facebook';

type AuthSettingsExternal = Partial<Record<SaveMyMoveOAuthProvider, boolean>>;

/** True when an OAuth provider is enabled on the linked Supabase Auth project. */
export async function isOAuthProviderEnabled(
  provider: SaveMyMoveOAuthProvider
): Promise<boolean> {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) return false;

  try {
    const res = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: anonKey },
      next: { revalidate: 60 },
    });
    if (!res.ok) return false;
    const settings = (await res.json()) as { external?: AuthSettingsExternal };
    return settings.external?.[provider] === true;
  } catch {
    return false;
  }
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