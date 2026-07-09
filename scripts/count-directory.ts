import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

async function main() {
  const admin = createAdminClient();

  const [
    { count: total },
    { count: withUsdot },
    { count: activeAuth },
    { count: inactiveAuth },
    { count: neverChecked },
    { count: activeWithDot },
  ] = await Promise.all([
    admin.from('companies').select('id', { count: 'exact', head: true }),
    admin
      .from('companies')
      .select('id', { count: 'exact', head: true })
      .not('usdot_number', 'is', null)
      .neq('usdot_number', ''),
    admin
      .from('companies')
      .select('id', { count: 'exact', head: true })
      .eq('authority_active', true)
      .eq('out_of_service', false),
    admin
      .from('companies')
      .select('id', { count: 'exact', head: true })
      .or('authority_active.eq.false,out_of_service.eq.true'),
    admin.from('companies').select('id', { count: 'exact', head: true }).is('fmcsa_last_checked', null),
    admin
      .from('companies')
      .select('id', { count: 'exact', head: true })
      .not('usdot_number', 'is', null)
      .neq('usdot_number', '')
      .eq('authority_active', true)
      .eq('out_of_service', false),
  ]);

  console.log('=== Live directory (production DB) ===');
  console.log(`Total companies: ${total ?? 0}`);
  console.log(`With USDOT on file: ${withUsdot ?? 0}`);
  console.log(`Active FMCSA authority (not OOS): ${activeAuth ?? 0}`);
  console.log(`Active FMCSA + USDOT: ${activeWithDot ?? 0}`);
  console.log(`Inactive authority or OOS: ${inactiveAuth ?? 0}`);
  console.log(`FMCSA never checked: ${neverChecked ?? 0}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});