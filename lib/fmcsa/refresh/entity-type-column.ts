import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

let entityTypeColumnReady: boolean | null = null;

/** Whether public.companies.entity_type exists (migration 20260712180000). */
export async function supportsEntityTypeColumn(
  supabase: SupabaseClient<Database>
): Promise<boolean> {
  if (entityTypeColumnReady !== null) return entityTypeColumnReady;

  const { error } = await supabase.from('companies').select('entity_type').limit(1);
  entityTypeColumnReady = !error;
  return entityTypeColumnReady;
}

export function resetEntityTypeColumnCache(): void {
  entityTypeColumnReady = null;
}