import 'server-only';

import { createAdminClient } from '@/lib/lender/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/lender/supabase/config';
import type { Database } from '@/types/lender/supabase';

export type DbLender = Database['public']['Tables']['lenders']['Row'];

export async function getLenderBySlugFromDb(slug: string): Promise<DbLender | null> {
  if (!isSupabaseAdminConfigured()) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('lenders').select('*').eq('slug', slug).maybeSingle();
  return data ?? null;
}