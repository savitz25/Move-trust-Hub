import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

function loadEnvLocal() {
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
}

async function main() {
  loadEnvLocal();
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const majors = ['harris', 'dallas', 'travis', 'bexar', 'tarrant'];
  const { data } = await sb
    .from('company_destination_assignments')
    .select('company_slug,county_slug')
    .eq('state_slug', 'texas')
    .in('county_slug', majors);
  console.log('majors hits', data);

  for (const slug of [
    'juggernauts-moving-n-storage-llc',
    'morse-moving-storage-inc',
    'safebound-logistics-llc',
  ]) {
    const { data: rows } = await sb
      .from('company_destination_assignments')
      .select('county_slug')
      .eq('state_slug', 'texas')
      .eq('company_slug', slug);
    const set = new Set((rows ?? []).map((r) => r.county_slug));
    console.log(
      slug,
      'count',
      set.size,
      'has harris',
      set.has('harris'),
      'has dallas',
      set.has('dallas'),
      'sample',
      [...set].slice(0, 15)
    );
  }

  // check companies exist
  const { data: cos } = await sb
    .from('companies')
    .select('slug, is_verified, out_of_service')
    .in('slug', [
      'juggernauts-moving-n-storage-llc',
      'morse-moving-storage-inc',
      'safebound-logistics-llc',
    ]);
  console.log('companies', cos);
}

main();
