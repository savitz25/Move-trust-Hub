import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

async function main() {
  const supabase = createAdminClient();
  const slugs = [
    'jk-moving-services',
    'safeway-moving',
    'alachua-county-movers',
    'allied-van-lines',
    'corrigan-moving-systems-grand-rapids',
  ];
  const { data, error } = await supabase
    .from('companies')
    .select('slug, name, usdot_number, authority_active, out_of_service, fmcsa_raw')
    .in('slug', slugs);

  if (error) throw error;

  for (const r of data ?? []) {
    const raw = (r.fmcsa_raw ?? {}) as Record<string, unknown>;
    console.log('---', r.slug, '|', r.name);
    console.log('  USDOT:', r.usdot_number, '| stored auth=', r.authority_active, '| oos=', r.out_of_service);
    console.log('  allowedToOperate:', raw.allowedToOperate);
    console.log('  commonAuthorityStatus:', raw.commonAuthorityStatus);
    console.log('  contractAuthorityStatus:', raw.contractAuthorityStatus);
    console.log('  brokerAuthorityStatus:', raw.brokerAuthorityStatus);
    console.log('  oosDate:', raw.oosDate);
    const sup = raw._supplemental as Record<string, unknown> | undefined;
    if (sup?.authority) {
      console.log('  supplemental authority rows:', JSON.stringify(sup.authority).slice(0, 300));
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});