import 'server-only';

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';
import { getServiceRoleSupabaseTarget } from '@/lib/supabase/config';

/**
 * Privileged Supabase client — SERVER ONLY.
 * Bypasses RLS via service_role. Never import in client components.
 */
export function createAdminClient() {
  const target = getServiceRoleSupabaseTarget();
  if (!target) {
    throw new Error(
      'Supabase admin client requires SUPABASE_SERVICE_ROLE_KEY (server-only).'
    );
  }

  return createClient<Database>(target.url, target.key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}