import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/config';
import type { CapabilityEvidenceState, ProviderCapability } from '@/lib/provider/types';
import { evidenceStateForCopy } from '@/lib/provider/identity-resolution';

const VAN_LINE_IDS = new Set([
  'allied',
  'mayflower',
  'atlas',
  'wheaton',
  'arpin',
  'graebel',
  'national',
  'north-american',
]);

export async function loadCapabilityEvidenceState(
  companyId: string
): Promise<CapabilityEvidenceState> {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return 'INFERRED';
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from('provider_capability')
    .select('capability, evidence_state')
    .eq('company_id', companyId);
  if (error || !data?.length) return 'INFERRED';
  const relevant = (data as Array<{ capability: ProviderCapability; evidence_state: string }>)
    .filter((row) =>
      ['hhg_interstate_carrier', 'hhg_broker', 'auto_carrier', 'auto_broker'].includes(
        row.capability
      )
    )
    .map((row) => row.evidence_state as CapabilityEvidenceState);
  if (!relevant.length) return 'INFERRED';
  return evidenceStateForCopy(relevant);
}

export function isVanLineNetworkCompany(companyId: string): boolean {
  return VAN_LINE_IDS.has(companyId);
}
