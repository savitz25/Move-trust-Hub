import { createClient } from '@supabase/supabase-js';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const OUT = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-001'
);

function loadEnv() {
  for (const f of ['.env.local', '.env']) {
    if (!existsSync(f)) continue;
    for (const line of readFileSync(f, 'utf8').split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i < 0) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      )
        v = v.slice(1, -1);
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

loadEnv();
mkdirSync(OUT, { recursive: true });
const c = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
await c.connect();
const mdc = await c.query(
  `select count(*)::int total,
          count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int internal_only,
          count(*) filter (where evidence_publication_state='PUBLISHED')::int published,
          count(*) filter (where evidence_publication_state='PUBLICATION_ELIGIBLE')::int eligible,
          count(distinct company_id)::int companies
     from provider_county_credential
    where source='mdc-moving-business-registration'`
);
const pbc = await c.query(
  `select count(*)::int total,
          count(*) filter (where evidence_publication_state='PUBLISHED')::int published,
          count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int internal_only
     from provider_county_credential
    where source='pbc-consumer-affairs-moving-business-permit'`
);
const priv = await c.query(
  `select has_table_privilege('anon','provider_county_credential','select') anon_sel,
          has_table_privilege('authenticated','provider_county_credential','select') auth_sel`
);
await c.end();

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);
const anon = await sb.from('provider_county_credential').select('id').limit(1);

const out = {
  task: 'MDC-PROD-001',
  mdc: mdc.rows[0],
  palm_beach: pbc.rows[0],
  anon_direct_select:
    Boolean(anon.error) || !(anon.data || []).length ? 'DENIED' : 'ALLOWED',
  anon_error: anon.error?.message || null,
  authenticated_privilege_select: priv.rows[0].auth_sel,
  anon_privilege_select: priv.rows[0].anon_sel,
  pass:
    mdc.rows[0].total === 70 &&
    mdc.rows[0].internal_only === 70 &&
    mdc.rows[0].published === 0 &&
    mdc.rows[0].eligible === 0 &&
    mdc.rows[0].companies === 70 &&
    pbc.rows[0].total === 46 &&
    pbc.rows[0].published === 11 &&
    pbc.rows[0].internal_only === 35 &&
    (Boolean(anon.error) || !(anon.data || []).length) &&
    priv.rows[0].auth_sel === false &&
    priv.rows[0].anon_sel === false,
};
writeFileSync(resolve(OUT, 'post-apply-database-audit.json'), JSON.stringify(out, null, 2) + '\n');
console.log(JSON.stringify(out, null, 2));
if (!out.pass) process.exit(3);
