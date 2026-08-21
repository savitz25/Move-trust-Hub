/**
 * FL-C003 — READ-ONLY snapshot of current Florida company / PSA identity state.
 * Uses Supabase REST (service role) from a provided env file path.
 * Writes local JSON under data/county-regulatory/fl/palm-beach/evidence/ — no DB writes.
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const envPath = process.argv[2] || resolve('../move-trust-hub-fl001/.env.local');
if (!existsSync(envPath)) {
  console.error('Missing env file:', envPath);
  process.exit(1);
}

function loadEnv(path) {
  const text = readFileSync(path, 'utf8');
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) continue;
    const m = line.match(/^([A-Za-z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

const env = loadEnv(envPath);
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceKey) {
  console.error('Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const outDir = resolve('data/county-regulatory/fl/palm-beach/evidence');
mkdirSync(outDir, { recursive: true });

async function fetchAll(table, select, filters = '') {
  const pageSize = 1000;
  let from = 0;
  const rows = [];
  while (true) {
    const url = `${supabaseUrl}/rest/v1/${table}?select=${encodeURIComponent(select)}${filters}&limit=${pageSize}&offset=${from}`;
    const res = await fetch(url, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: 'count=exact',
      },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`${table} ${res.status}: ${body.slice(0, 400)}`);
    }
    const batch = await res.json();
    rows.push(...batch);
    if (batch.length < pageSize) break;
    from += pageSize;
  }
  return rows;
}

const psa = await fetchAll(
  'provider_state_authority',
  'company_id,state_code,regulator,authority_number,authority_type,status,verification_state,source,legal_name,dba_name,raw_source_key,match_method,matched_company_id,source_record_id',
  '&state_code=eq.FL'
);

// Companies: fl-* ids and FL state. Two queries to avoid complex or filters.
// Live companies schema has no separate city/state/dba columns; identity is on name/address/phone/email.
const companies = await fetchAll(
  'companies',
  'id,name,slug,phone,email,physical_address,website,publication_state,indexable,usdot_number,mc_number,fmcsa_legal_name,entity_type,service_scope',
  '&id=like.fl-*'
);

const counts = {
  psa_fl_rows: psa.length,
  companies_fl_heuristic: companies.length,
  fl_im_company_ids: companies.filter((c) => String(c.id).startsWith('fl-im-')).length,
  fl_im_indexable: companies.filter((c) => String(c.id).startsWith('fl-im-') && c.indexable === true)
    .length,
};

const imToCompanies = {};
function addIm(im, row) {
  if (!imToCompanies[im]) imToCompanies[im] = [];
  if (!imToCompanies[im].some((x) => x.company_id === row.company_id && x.source === row.source)) {
    imToCompanies[im].push(row);
  }
}

for (const row of psa) {
  const candidates = [row.authority_number, row.raw_source_key]
    .filter(Boolean)
    .map((x) => String(x).toUpperCase());
  const ims = new Set();
  for (const c of candidates) {
    const m = c.match(/\bIM\d+\b/);
    if (m) ims.add(m[0]);
    if (/^IM\d+$/.test(c)) ims.add(c);
  }
  for (const im of ims) {
    addIm(im, {
      company_id: row.company_id,
      status: row.status,
      verification_state: row.verification_state,
      source: row.source,
      regulator: row.regulator,
      authority_number: row.authority_number,
      authority_type: row.authority_type,
      match_method: row.match_method,
    });
  }
}

for (const c of companies) {
  const m = String(c.id).match(/^fl-im-0*(\d+)$/i);
  if (!m) continue;
  const im = `IM${m[1]}`;
  addIm(im, {
    company_id: c.id,
    status: null,
    verification_state: null,
    source: 'companies.id_pattern',
    regulator: 'FDACS',
    authority_number: im,
    from_company_id_pattern: true,
  });
}

const snapshot = {
  task: 'FL-C003',
  mode: 'READ_ONLY_SUPABASE_REST',
  retrieved_at: new Date().toISOString(),
  origin_main_at_task_start: 'd486e5a8eadef9639f70561ecac31ba2b226e7b4',
  identity_reference_note:
    'Snapshot taken from live Supabase via service role (read-only GETs). County stack not rebased onto main. FL-006 worktree may be ahead of origin/main; live DB is the identity authority.',
  google_places_api_requests: 0,
  production_writes: false,
  counts,
  psa_fl: psa,
  companies_fl: companies,
  im_to_companies: imToCompanies,
};

writeFileSync(resolve(outDir, 'florida-identity-snapshot.json'), JSON.stringify(snapshot, null, 2));

const compact = {
  task: 'FL-C003',
  retrieved_at: snapshot.retrieved_at,
  counts,
  im_to_company_ids: Object.fromEntries(
    Object.entries(imToCompanies).map(([im, rows]) => [
      im,
      [...new Set(rows.map((r) => r.company_id).filter(Boolean))],
    ])
  ),
  companies_by_id: Object.fromEntries(
    companies.map((c) => [
      c.id,
      {
        id: c.id,
        name: c.name,
        phone: c.phone,
        email: c.email,
        physical_address: c.physical_address,
        website: c.website,
        publication_state: c.publication_state,
        indexable: c.indexable,
        slug: c.slug,
        usdot_number: c.usdot_number,
        mc_number: c.mc_number,
        fmcsa_legal_name: c.fmcsa_legal_name,
      },
    ])
  ),
};
writeFileSync(resolve(outDir, 'florida-im-company-crosswalk.json'), JSON.stringify(compact, null, 2));

console.log(
  JSON.stringify(
    {
      ok: true,
      outDir,
      counts,
      im_keys: Object.keys(imToCompanies).length,
      google: 0,
      writes: 0,
    },
    null,
    2
  )
);
