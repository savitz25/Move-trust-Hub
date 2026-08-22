/**
 * Post-apply DB audit + anon/service access checks for PBC-PROD-001.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

function loadEnv() {
  const raw = readFileSync('.env.local', 'utf8');
  const keys = {};
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
    )
      v = v.slice(1, -1);
    if (!keys[k]) keys[k] = v;
  }
  Object.assign(process.env, keys);
  return keys;
}

const OUT = resolve('data/county-regulatory/fl/palm-beach/production/pbc-prod-001');
mkdirSync(OUT, { recursive: true });
const env = loadEnv();
const manifest = JSON.parse(
  readFileSync(
    resolve(OUT, 'pbc-county-credential-wave-a-internal-v1.json'),
    'utf8'
  )
);

const c = new pg.Client({
  connectionString: env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
await c.connect();

const audit = await c.query(
  `select
     count(*)::int as total,
     count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int as internal_only,
     count(*) filter (where evidence_publication_state='PUBLICATION_ELIGIBLE')::int as publication_eligible,
     count(*) filter (where evidence_publication_state='PUBLISHED')::int as published,
     count(distinct company_id)::int as distinct_companies,
     count(*) filter (where company_id is null)::int as orphans
   from provider_county_credential
   where manifest_hash = $1`,
  [manifest.manifest_hash]
);

const dups = await c.query(
  `select upper(credential_number) as mv, count(*)::int n
     from provider_county_credential
    where manifest_hash = $1
    group by 1 having count(*) > 1`,
  [manifest.manifest_hash]
);

let mismatches = [];
for (const m of manifest.members) {
  const r = await c.query(
    `select company_id, fdacs_im, credential_number, evidence_publication_state
       from provider_county_credential
      where manifest_hash = $1 and upper(credential_number) = upper($2)`,
    [manifest.manifest_hash, m.palm_beach_mv]
  );
  if (!r.rows.length) {
    mismatches.push({ mv: m.palm_beach_mv, reason: 'MISSING' });
    continue;
  }
  const row = r.rows[0];
  if (row.company_id !== m.company_id || String(row.fdacs_im).toUpperCase() !== m.fdacs_im) {
    mismatches.push({
      mv: m.palm_beach_mv,
      reason: 'MISMATCH',
      got: row,
      expected: { company_id: m.company_id, fdacs_im: m.fdacs_im },
    });
  }
}

const freezes = {
  companies: (await c.query(`select count(*)::int n from companies`)).rows[0].n,
  psa: (await c.query(`select count(*)::int n from provider_state_authority`)).rows[0].n,
  contacts: (await c.query(`select count(*)::int n from provider_contact_observation`))
    .rows[0].n,
};

// Anon PostgREST probe
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anon = createClient(url, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
const service = createClient(url, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const anonCred = await anon.from('provider_county_credential').select('id').limit(1);
const anonProg = await anon.from('county_regulatory_program').select('id').limit(1);
const svcCred = await service
  .from('provider_county_credential')
  .select('id, company_id, credential_number, fdacs_im, evidence_publication_state')
  .eq('manifest_hash', manifest.manifest_hash);

const result = {
  task: 'PBC-PROD-001',
  retrieved_at: new Date().toISOString(),
  wave_id: manifest.wave_id,
  manifest_hash: manifest.manifest_hash,
  database: audit.rows[0],
  duplicate_mv: dups.rows,
  reconciliation: {
    checked: 46,
    mismatches: mismatches.length,
    mismatch_rows: mismatches,
  },
  freezes,
  anon: {
    provider_county_credential: {
      error: anonCred.error?.message || null,
      rows: anonCred.data?.length || 0,
      denied: Boolean(anonCred.error) || (anonCred.data || []).length === 0,
    },
    county_regulatory_program: {
      error: anonProg.error?.message || null,
      rows: anonProg.data?.length || 0,
      denied: Boolean(anonProg.error) || (anonProg.data || []).length === 0,
    },
  },
  service_role: {
    rows: svcCred.data?.length || 0,
    error: svcCred.error?.message || null,
    sample: (svcCred.data || []).slice(0, 3),
  },
  ok:
    audit.rows[0].total === 46 &&
    audit.rows[0].internal_only === 46 &&
    audit.rows[0].publication_eligible === 0 &&
    audit.rows[0].published === 0 &&
    audit.rows[0].orphans === 0 &&
    dups.rows.length === 0 &&
    mismatches.length === 0 &&
    (Boolean(anonCred.error) || (anonCred.data || []).length === 0) &&
    (svcCred.data || []).length === 46,
};

writeFileSync(resolve(OUT, 'post-apply-database-audit.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
await c.end();
if (!result.ok) process.exit(4);
