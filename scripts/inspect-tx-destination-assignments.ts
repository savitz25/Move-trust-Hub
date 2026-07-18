import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

function loadEnvLocal() {
  try {
    const raw = readFileSync('.env.local', 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i < 0) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {
    /* ignore */
  }
}

async function main() {
  loadEnvLocal();
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { count, error } = await sb
    .from('company_destination_assignments')
    .select('*', { count: 'exact', head: true })
    .eq('state_slug', 'texas');
  console.log('tx destination assignments', count, error?.message);

  const { data, error: e2 } = await sb
    .from('company_destination_assignments')
    .select('company_slug, county_slug, state_slug')
    .eq('state_slug', 'texas')
    .limit(50);
  console.log('sample', data?.length, e2?.message);
  console.log(data?.slice(0, 20));

  // distinct companies assigned to TX
  const { data: all } = await sb
    .from('company_destination_assignments')
    .select('company_slug, county_slug')
    .eq('state_slug', 'texas');
  const byCompany = new Map<string, Set<string>>();
  for (const row of all ?? []) {
    if (!byCompany.has(row.company_slug)) byCompany.set(row.company_slug, new Set());
    byCompany.get(row.company_slug)!.add(row.county_slug);
  }
  console.log('distinct companies with TX county assignments', byCompany.size);
  console.log(
    [...byCompany.entries()]
      .slice(0, 30)
      .map(([slug, set]) => `${slug}: ${set.size} counties`)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
