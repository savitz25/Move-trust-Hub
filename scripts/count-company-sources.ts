import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import { seedCompanies } from '../data/seed-companies';

function loadEnvLocal() {
  const path = resolve(process.cwd(), '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) {
      process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}

loadEnvLocal();

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing Supabase env');
    process.exit(1);
  }

  const supabase = createClient(url, key);
  const tables = ['companies', 'moving_companies', 'company_suggestions'] as const;

  console.log('=== Supabase tables ===');
  for (const table of tables) {
    const { count, error } = await supabase.from(table).select('id', { count: 'exact', head: true });
    console.log(`${table}: ${count ?? 0}${error ? ` (${error.message})` : ''}`);
  }

  console.log('\n=== Static catalogs ===');
  console.log(`seed-companies.ts: ${seedCompanies.length}`);
  console.log(`local-movers catalog: ${Object.keys(fullMoversCatalog).length}`);
  const withProfile = Object.values(fullMoversCatalog).filter((m) => m.profileSlug);
  console.log(`local movers with profileSlug: ${withProfile.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});