import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
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
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing Supabase env');
    process.exit(1);
  }
  const sb = createClient(url, key);

  const { count: allCount, error: e1 } = await sb
    .from('companies')
    .select('*', { count: 'exact', head: true });
  console.log('all companies', allCount, e1?.message);

  // Try common filters for "active"
  for (const filter of [
    { is_verified: true },
    { is_verified: true, out_of_service: false },
  ] as const) {
    let q = sb.from('companies').select('*', { count: 'exact', head: true });
    for (const [k, v] of Object.entries(filter)) {
      q = q.eq(k, v as never);
    }
    const { count, error } = await q;
    console.log('filter', filter, 'count', count, error?.message);
  }

  // Fetch verified companies
  // Full directory: user reports 129 active verified companies = full companies table
  const { data, error } = await sb
    .from('companies')
    .select(
      'id, slug, name, headquarters, usdot_number, mc_number, is_verified, out_of_service, authority_active, coverage, services, specialties, overall_rating, review_count'
    )
    .order('name');

  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('all rows', data?.length);
  const byFlag = {
    verified: data?.filter((c) => c.is_verified).length,
    oos: data?.filter((c) => c.out_of_service).length,
    authFalse: data?.filter((c) => c.authority_active === false).length,
    authTrue: data?.filter((c) => c.authority_active === true).length,
    authNull: data?.filter((c) => c.authority_active == null).length,
  };
  console.log('flags', byFlag);

  // Active = in companies table and not out of service
  const active =
    data?.filter((c) => !c.out_of_service) ?? [];
  console.log('active (not OOS)', active.length);

  const txish = active.filter((c) => {
    const blob = `${c.headquarters ?? ''} ${c.name} ${c.coverage ?? ''} ${c.slug}`.toLowerCase();
    return /\btx\b|texas|houston|dallas|austin|san antonio|fort worth|el paso|lubbock|plano|irving|arlington/.test(
      blob
    );
  });
  console.log('tx-ish among active', txish.length);
  console.log(
    'tx-ish list',
    txish.map((c) => `${c.slug} | ${c.headquarters} | v=${c.is_verified}`)
  );
  console.log(
    'sample 15',
    active.slice(0, 15).map((c) => ({
      slug: c.slug,
      hq: c.headquarters,
      v: c.is_verified,
      oos: c.out_of_service,
      auth: c.authority_active,
    }))
  );

  mkdirSync('scripts/output', { recursive: true });
  writeFileSync(
    'scripts/output/active-verified-companies.json',
    JSON.stringify(active, null, 2)
  );
  console.log(
    'wrote scripts/output/active-verified-companies.json',
    active.length
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
