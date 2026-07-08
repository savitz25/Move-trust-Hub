import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

async function main() {
  const admin = createAdminClient();
  for (const table of ['companies', 'company_suggestions'] as const) {
    console.log(`\n=== ${table} ===`);
    for (const col of [
      'google_data',
      'public_scrape_data',
      'verification_sources',
      'fmcsa_preview',
      'fmcsa_raw',
      'details',
    ]) {
      const { error } = await admin.from(table).select(col).limit(1);
      console.log(col, error ? 'MISSING' : 'OK');
    }
  }
}

main().catch(console.error);