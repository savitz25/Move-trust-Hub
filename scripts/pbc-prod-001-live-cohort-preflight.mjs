/**
 * PBC-PROD-001 — live cohort revalidation (read-only).
 * Compares frozen C009 PRODUCTION_LINK_READY (46) against live companies + PSA.
 */
import { createHash } from 'crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
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
    ) {
      v = v.slice(1, -1);
    }
    if (!keys[k]) keys[k] = v;
  }
  return keys;
}

function normalizeIm(im) {
  const s = String(im || '')
    .toUpperCase()
    .replace(/\s+/g, '');
  if (!s) return null;
  return s.startsWith('IM') ? s : `IM${s}`;
}

const OUT = resolve('data/county-regulatory/fl/palm-beach/production/pbc-prod-001');
mkdirSync(OUT, { recursive: true });

const env = loadEnv();
const url = env.DATABASE_URL || env.DIRECT_URL || env.SUPABASE_DB_URL;
if (!url) {
  console.log(
    JSON.stringify({
      ok: false,
      status: 'BLOCKED — PRODUCTION DATABASE ACCESS REQUIRED',
    })
  );
  process.exit(2);
}

const cohort = JSON.parse(
  readFileSync(
    'data/county-regulatory/fl/architecture/c009/cohort/pbc-production-link-ready-v1.json',
    'utf8'
  )
);
const qualified = JSON.parse(
  readFileSync(
    'data/county-regulatory/fl/palm-beach/qualified/pbc-fdacs-crosswalk-v1.json',
    'utf8'
  )
);
const byMv = new Map(
  (qualified.records || []).map((r) => [r.palm_beach_permit || r.mv_permit, r])
);

const client = new pg.Client({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});
await client.connect();

const still = [];
const dropped = [];
const review = [];

for (const r of cohort.records) {
  const companyId = r.current_canonical_company_id;
  const im = normalizeIm(r.fdacs_im);
  const mv = r.mv_permit;
  const q = byMv.get(mv);

  const co = await client.query(
    `select id, slug, name, publication_state, indexable
       from companies where id = $1`,
    [companyId]
  );
  if (!co.rows.length) {
    dropped.push({
      mv_permit: mv,
      fdacs_im: im,
      company_id: companyId,
      reason: 'COMPANY_MISSING',
    });
    continue;
  }
  const c = co.rows[0];

  const psa = await client.query(
    `select id, authority_number, status, verification_state, company_id, regulator
       from provider_state_authority
      where state_code = 'FL'
        and (
          upper(authority_number) = $1
          or upper(authority_number) = $2
          or upper(replace(authority_number,' ','')) = $1
        )`,
    [im, im.replace(/^IM/, '')]
  );

  const linkedExpected = psa.rows.filter((x) => x.company_id === companyId);
  const linkedElsewhere = psa.rows.filter(
    (x) => x.company_id && x.company_id !== companyId
  );

  const base = {
    mv_permit: mv,
    fdacs_im: im,
    company_id: companyId,
    slug: c.slug,
    name: c.name,
    publication_state: c.publication_state,
    indexable: c.indexable,
    county_status: r.county_status,
    match_method: r.match_method,
    ruleset: r.ruleset || 'PBC_FDACS_RECONCILIATION_V1',
    qualified_match_result: q?.match_result || null,
    psa_rows: psa.rows.length,
    psa_linked_expected: linkedExpected.length,
    psa_linked_elsewhere: linkedElsewhere.map((x) => x.company_id),
  };

  if (psa.rows.length === 0) {
    review.push({ ...base, reason: 'FDACS_PSA_NOT_FOUND' });
    continue;
  }
  if (linkedElsewhere.length && !linkedExpected.length) {
    dropped.push({ ...base, reason: 'FDACS_LINKED_ELSEWHERE' });
    continue;
  }
  if (!linkedExpected.length) {
    review.push({ ...base, reason: 'FDACS_PRESENT_BUT_NOT_ATTACHED_TO_COMPANY' });
    continue;
  }
  if (q && q.match_result && q.match_result !== 'VERIFIED') {
    review.push({ ...base, reason: 'QUALIFIED_MATCH_NOT_VERIFIED' });
    continue;
  }

  still.push({
    ...base,
    class: 'STILL_PRODUCTION_LINK_READY',
    fdacs_authority_number: linkedExpected[0].authority_number,
    fdacs_status: linkedExpected[0].status,
    fdacs_verification_state: linkedExpected[0].verification_state,
    regulator_state: linkedExpected[0].regulator,
  });
}

// newly linkable: VERIFIED qualified outside frozen 46 with live company_id
const frozenMv = new Set(cohort.records.map((r) => r.mv_permit));
const newly = [];
for (const q of qualified.records || []) {
  const mv = q.palm_beach_permit;
  if (!mv || frozenMv.has(mv)) continue;
  if (q.match_result !== 'VERIFIED') continue;
  const cid = q.canonical_company_id;
  if (!cid) continue;
  const co = await client.query(`select id, slug from companies where id = $1`, [
    cid,
  ]);
  if (!co.rows.length) continue;
  newly.push({
    mv_permit: mv,
    fdacs_im: q.fdacs_id,
    company_id: cid,
    slug: co.rows[0].slug,
    class: 'NEWLY_LINKABLE_AFTER_C009',
  });
}

const result = {
  task: 'PBC-PROD-001',
  retrieved_at: new Date().toISOString(),
  live_db: true,
  ruleset: 'PBC_FDACS_RECONCILIATION_V1',
  frozen_count: cohort.records.length,
  still_production_link_ready: still.length,
  dropped_from_current_linkage: dropped.length,
  review_required_now: review.length,
  newly_linkable_after_c009: newly.length,
  gate:
    still.length === cohort.records.length &&
    dropped.length === 0 &&
    review.length === 0
      ? 'PASS'
      : 'BLOCKED — COHORT REVALIDATION FAILED',
  publication_state_mix: still.reduce((a, r) => {
    const k = r.publication_state == null ? 'NULL' : r.publication_state;
    a[k] = (a[k] || 0) + 1;
    return a;
  }, {}),
  still,
  dropped,
  review,
  newly_linkable: newly,
};

const hash = createHash('sha256')
  .update(JSON.stringify(result.still.map((r) => [r.mv_permit, r.company_id, r.fdacs_im])))
  .digest('hex');
result.still_ready_hash = hash;

writeFileSync(
  resolve(OUT, 'live-cohort-preflight.json'),
  JSON.stringify(result, null, 2) + '\n'
);

console.log(
  JSON.stringify(
    {
      ok: result.gate === 'PASS',
      gate: result.gate,
      frozen: result.frozen_count,
      still: result.still_production_link_ready,
      dropped: result.dropped_from_current_linkage,
      review: result.review_required_now,
      newly_linkable: result.newly_linkable_after_c009,
      still_ready_hash: hash.slice(0, 16),
      publication_state_mix: result.publication_state_mix,
    },
    null,
    2
  )
);

await client.end();
if (result.gate !== 'PASS') process.exit(3);
