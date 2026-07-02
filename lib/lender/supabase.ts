/**
 * Barrel export — prefer direct imports from lib/supabase/* for tree-shaking.
 * @deprecated Use @/lib/lender/supabase/client or @/lib/lender/supabase/server explicitly.
 */
export {
  isSupabaseConfigured,
  isSupabaseAdminConfigured,
  getSupabaseUrl,
  getSupabaseAnonKey,
} from '@/lib/lender/supabase/config';

export { createBrowserSupabaseClient } from '@/lib/lender/supabase/client';