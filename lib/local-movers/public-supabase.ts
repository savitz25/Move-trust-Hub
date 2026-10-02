import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';
import {
  getServiceRoleSupabaseTarget,
  getSupabaseAnonKey,
  getSupabaseUrl,
  isIsolatedMoveBrowserAuthAdmitted,
  isSupabaseConfigured,
} from '@/lib/supabase/config';

/**
 * Privileged fallback for this helper. Null while isolated browser auth is
 * admitted, and never built from the browser URL.
 */
export function publicSupabasePrivilegedTarget(): { url: string; key: string } | null {
  if (isIsolatedMoveBrowserAuthAdmitted()) return null;
  if (isSupabaseConfigured()) return null;
  return getServiceRoleSupabaseTarget();
}

/**
 * Public read client for county pages / directory.
 * Prefer anon (RLS public select) so ISR works without service role on the edge path.
 * Fall back to the canonical service-role target only outside isolated browser auth.
 */
export const publicSupabaseClientBuilds = { count: 0 };

export function createPublicSupabaseClient(): SupabaseClient<Database> | null {
  if (isIsolatedMoveBrowserAuthAdmitted()) return null;
  publicSupabaseClientBuilds.count += 1;

  const url = getSupabaseUrl();
  const anon = getSupabaseAnonKey();
  if (url && anon) {
    return createClient<Database>(url, anon, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  const target = publicSupabasePrivilegedTarget();
  if (!target) return null;
  return createClient<Database>(target.url, target.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
