import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

async function main() {
  const query = process.argv[2] ?? 'amex';
  const admin = createAdminClient();

  const { data } = await admin
    .from('companies')
    .select('id, slug, name, overall_rating, review_count, bbb_rating')
    .ilike('name', `%${query}%`);

  console.log(data ?? []);
}

main().catch(console.error);