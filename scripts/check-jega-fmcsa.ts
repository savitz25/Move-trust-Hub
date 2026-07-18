import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';
import { fetchFmcsaCarrierByParsed } from '@/lib/fmcsa/refresh/fetch-carrier';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

loadEnvLocal();

async function main() {
  const admin = createAdminClient();
  const { data: company, error } = await admin
    .from('companies')
    .select('id, slug, name, headquarters, usdot_number, mc_number, verification_sources')
    .eq('slug', 'jega-movers-llc')
    .maybeSingle();

  if (error) {
    console.error('DB error:', error.message);
    return;
  }
  console.log('DB record:', JSON.stringify(company, null, 2));

  const dot = company?.usdot_number;
  if (dot) {
    const parsed = parseCarrierNumber(String(dot));
    if (parsed) {
      const snap = await fetchFmcsaCarrierByParsed(parsed);
      console.log('\nFMCSA snapshot:', JSON.stringify(snap, null, 2));
    }
  } else {
    console.log('\nNo USDOT on record');
  }
}

main().catch(console.error);