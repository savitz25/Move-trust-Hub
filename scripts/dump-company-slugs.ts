import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

async function main() {
  const slugs = process.argv.slice(2);
  const admin = createAdminClient();
  const { data } = await admin
    .from('companies')
    .select('slug,name,headquarters,usdot_number,fmcsa_legal_name,website')
    .in('slug', slugs);
  console.log(JSON.stringify(data, null, 2));
}

main();