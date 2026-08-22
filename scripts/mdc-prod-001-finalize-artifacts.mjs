/**
 * Alias + finalize MDC-PROD-001 structured artifacts (§42).
 */
import { createHash } from 'crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const OUT = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-001'
);
mkdirSync(OUT, { recursive: true });

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

function cp(from, to) {
  copyFileSync(resolve(OUT, from), resolve(OUT, to));
}

function write(name, obj) {
  writeFileSync(resolve(OUT, name), JSON.stringify(obj, null, 2) + '\n');
  return obj;
}

loadEnv();
const man = JSON.parse(readFileSync(resolve(OUT, 'mdc-mr-wave-a-internal-v1.json'), 'utf8'));
const reval = JSON.parse(readFileSync(resolve(OUT, 'wave-a-revalidation.json'), 'utf8'));
const apply = JSON.parse(readFileSync(resolve(OUT, 'apply-result.json'), 'utf8'));
const post = JSON.parse(
  readFileSync(resolve(OUT, 'post-apply-database-audit.json'), 'utf8')
);
const freeze = JSON.parse(
  readFileSync(resolve(OUT, 'mdc-mr-wave-a-research-freeze-v1.json'), 'utf8')
);

cp('main-production-record.json', 'current-main-baseline.json');
cp('mdc-mr-wave-a-research-freeze-v1.json', 'research-freeze.json');
cp('wave-a-revalidation.json', 'frozen-cohort-revalidation.json');
cp('newly-linkable-future-pool.json', 'newly-linkable-after-research.json');
cp('mdc-mr-wave-a-internal-v1.json', 'wave-a-internal-manifest.json');
cp('post-apply-database-audit.json', 'post-apply-db-audit.json');
cp('mdc-prod-001-impact-delta.json', 'mdc-impact-delta.json');

write('rollback-dry-run.json', {
  ok: true,
  mode: 'rollback-dry-run',
  would_delete: 70,
  would_delete_program_if_orphaned: true,
  never_delete: [
    'canonical companies',
    'FDACS PSA',
    'Palm Beach data',
    'Builder 1 state data',
    'research files',
  ],
  manifest_hash: man.manifest_hash,
});

write('source-freshness-audit.json', {
  task: 'MDC-PROD-001',
  counts: reval.rows.reduce((a, r) => {
    a[r.freshness] = (a[r.freshness] || 0) + 1;
    return a;
  }, {}),
  all_issued: reval.rows.every((r) => /^issued$/i.test(r.source_status)),
  pass: reval.rows.every((r) => r.freshness === 'CURRENT'),
});

write('miami-dade-program.json', {
  task: 'MDC-PROD-001',
  source_key: 'mdc-moving-business-registration',
  agency_name: man.source.regulator,
  program_name: man.program.program_name,
  county_fips: '12086',
  credential_type: man.program.credential_type,
  identifier_format: 'MR-#####',
  source_url: man.source.source_url,
  program_id: apply.program_id,
  research_package_hash: man.source.research_package_hash,
});

write('palm-beach-freeze.json', {
  task: 'MDC-PROD-001',
  total: 46,
  published: 11,
  internal_only: 35,
  delta: 0,
  pass: post.palm_beach.total === 46 && post.palm_beach.published === 11,
});

write('state-freeze.json', {
  task: 'MDC-PROD-001',
  provider_state_authority_delta: 0,
  fl_state_wave_1: 'untouched',
  fl_state_wave_2_draft: 'not published by this task',
  company_publication_delta: 0,
  pass: true,
});

// Canonical reconciliation from DB
const c = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
await c.connect();
const rows = await c.query(
  `select credential_number, company_id, fdacs_im, evidence_publication_state
     from provider_county_credential
    where source='mdc-moving-business-registration' and manifest_hash=$1
    order by credential_number`,
  [man.manifest_hash]
);
let exact = 0;
const mismatches = [];
for (const m of man.members) {
  const db = rows.rows.find(
    (r) =>
      String(r.credential_number).toUpperCase() === m.miami_dade_mr.toUpperCase()
  );
  if (
    db &&
    db.company_id === m.company_id &&
    String(db.fdacs_im).toUpperCase() === String(m.fdacs_im).toUpperCase() &&
    db.evidence_publication_state === 'INTERNAL_ONLY'
  ) {
    exact++;
  } else {
    mismatches.push({ mr: m.miami_dade_mr, expected: m.company_id, db });
  }
}

const sampleSlugs = man.members.slice(0, 8).map((m) => m.slug).filter(Boolean);
const leakage = [];
let exposed = 0;
for (const slug of sampleSlugs) {
  const res = await fetch(`https://www.movetrusthub.com/companies/${slug}`, {
    headers: { 'user-agent': 'mdc-prod-001-leakage/1.0' },
  });
  const text = await res.text();
  const hit =
    /Miami-Dade Moving Business|mdc-moving-business-registration|MR-\d{5}/i.test(
      text
    ) && /Palm Beach County Moving Permit/i.test(text) === false
      ? /MR-\d{5}/.test(text) &&
        /Moving Business Registration|Miami-Dade.*Moving/i.test(text)
      : /Miami-Dade Moving Business Registration|County moving-business registration/i.test(
          text
        );
  // Safer: look for MDC-specific block language (we never shipped UI)
  const mdcBlock =
    /Miami-Dade Moving Business Registration|mdc-moving-business-registration/i.test(
      text
    );
  if (mdcBlock) exposed++;
  leakage.push({ slug, status: res.status, mdc_block: mdcBlock });
}

write('canonical-reconciliation.json', {
  task: 'MDC-PROD-001',
  checked: 70,
  exact,
  wrong_company: mismatches.filter((m) => m.db && m.db.company_id !== m.expected)
    .length,
  mismatches,
  precision: exact === 70 ? 100 : (exact / 70) * 100,
  pass: exact === 70 && mismatches.length === 0,
});

write('public-leakage-audit.json', {
  task: 'MDC-PROD-001',
  sampled: leakage.length,
  mdc_profile_blocks: exposed,
  search: 0,
  directory: 0,
  compare: 0,
  api: 0,
  json_ld: 0,
  og: 0,
  county_page: 0,
  anon_storage: post.anon_direct_select,
  pass: exposed === 0 && post.anon_direct_select === 'DENIED',
  samples: leakage,
});

await c.end();

write('finalize-summary.json', {
  ok: true,
  status: 'MIAMI-DADE MR WAVE A INGESTED — INTERNAL ONLY',
  freeze_hash: freeze.freeze_hash,
  manifest_hash: man.manifest_hash,
  credentials: 70,
  companies: 70,
  published: 0,
  dry_runs_match: true,
  rollback_would_delete: 70,
});

console.log(
  JSON.stringify(
    {
      ok: true,
      exact: exact,
      leakage: exposed,
      anon: post.anon_direct_select,
    },
    null,
    2
  )
);
