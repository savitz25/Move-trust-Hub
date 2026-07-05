import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

export type PendingSuggestion = {
  id: string;
  name: string;
  usdot: string | null;
  mc_number: string | null;
  details: string | null;
  suggested_by_name: string | null;
  suggested_by_email: string | null;
  legal_name: string | null;
  headquarters: string | null;
  phone: string | null;
  authority_status: string | null;
  source_page: string | null;
  fmcsa_preview: Record<string, unknown> | null;
  fmcsa_raw: Record<string, unknown> | null;
  created_at: string;
};

export async function getPendingSuggestions(): Promise<PendingSuggestion[]> {
  if (!isSupabaseAdminConfigured()) return [];

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('company_suggestions')
    .select(
      'id, name, usdot, mc_number, details, suggested_by_name, suggested_by_email, legal_name, headquarters, phone, authority_status, source_page, fmcsa_preview, fmcsa_raw, created_at'
    )
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (error || !data) return [];
  return data as PendingSuggestion[];
}