import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';
import {
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from '@/lib/supabase/config';

/**
 * Public read client for county pages / directory.
 * Prefer anon (RLS public select) so ISR works without service role on the edge path.
 * Fall back to service role when available (admin tooling / backfill).
 */
export function createPublicSupabaseClient(): SupabaseClient<Database> | null {
  const url = getSupabaseUrl();
  if (!url) return null;

  if (isSupabaseConfigured()) {
    return createClient<Database>(url, getSupabaseAnonKey()!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  if (isSupabaseAdminConfigured()) {
    return createClient<Database>(url, getSupabaseServiceRoleKey()!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return null;
}
