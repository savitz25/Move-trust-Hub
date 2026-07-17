import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

/**
 * Untyped admin access for portal tables (not yet in generated Database types).
 * All portal writes go through server actions that enforce ownership / admin checks.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function portalAdmin(): any {
  if (!isSupabaseAdminConfigured()) {
    throw new Error('Portal requires SUPABASE_SERVICE_ROLE_KEY');
  }
  return createAdminClient();
}

export function isPortalDbReady(): boolean {
  return isSupabaseAdminConfigured();
}
