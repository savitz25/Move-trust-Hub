import 'server-only';

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';
import { legacyClientDisabled } from '@/lib/my-trusthub/preview-isolation';
import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseAdminConfigured,
} from '@/lib/supabase/config';

/**
 * Privileged Supabase client — SERVER ONLY.
 * Bypasses RLS via service_role. Never import in client components.
 */
export function createAdminClient() {
  if (legacyClientDisabled()) throw new Error('Legacy writes unavailable in isolated preview');
  if (!isSupabaseAdminConfigured()) {
    throw new Error(
      'Supabase admin client requires SUPABASE_SERVICE_ROLE_KEY (server-only).'
    );
  }

  return createClient<Database>(getSupabaseUrl()!, getSupabaseServiceRoleKey()!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
