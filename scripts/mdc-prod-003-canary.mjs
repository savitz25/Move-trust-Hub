/**
 * MDC-PROD-003 canary tooling:
 *   --baseline
 *   --revalidate
 *   --promote-manifest
 *   --apply-publish --manifest-hash <hash>
 *   --rollback --manifest-hash <hash>
 *   --dry-run (with apply/rollback)
 *
 * Production DB evidence-state changes only via --apply-publish / --rollback.
 * Manifest-bound only — no --publish-all-miami-dade.
 */
import { createHash } from 'crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const WAVE_A = 'MDC_MR_WAVE_A_INTERNAL_V1';
const WAVE_A_HASH =
  '56cfc4c3cec43781e4188f50704ebd7740dd3d04b7af6f818629cbaaa5a1a8eb';
const DRAFT_ID = 'MDC_MR_PUBLICATION_CANARY_V1_DRAFT';
const DRAFT_HASH =
  'b50ba162bc3630b24bf8f9fff93c8f60f3beeebb06f1aca6ee9ae56f2bfdd1ac';
const FINAL_ID = 'MDC_MR_PUBLICATION_CANARY_V1';
const SOURCE_KEY = 'mdc-moving-business-registration';
const OUT = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-003'
);
const DRAFT_PATH = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-002/publication-canary-draft.json'
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

function has(f) {
  return process.argv.includes(f);
}
function arg(n) {
  const i = process.argv.indexOf(n);
  return i >= 0 ? process.argv[i + 1] : null;
}

async function client() {
  loadEnv();
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — no DATABASE_URL');
  const c = new pg.Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  });
  await c.connect();
  return c;
}

function loadDraft() {
  const draft = JSON.parse(readFileSync(DRAFT_PATH, 'utf8'));
  if (draft.wave_id !== DRAFT_ID) throw new Error('Unexpected draft wave_id');
  if (draft.manifest_hash !== DRAFT_HASH) throw new Error('Draft hash mismatch');
  if (draft.company_count !== 9 || draft.credential_count !== 9)
    throw new Error('Draft must be 9/9');
  if (draft.apply !== false) throw new Error('Draft must remain apply=false historically');
  return draft;
}

async function baseline(c) {
  const q = await c.query(
    `select count(*)::int credentials,
            count(distinct company_id)::int companies,
            count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int internal_only,
            count(*) filter (where evidence_publication_state='PUBLISHED')::int published,
            count(*) filter (where company_id is null)::int orphans
       from provider_county_credential
      where source=$1`,
    [SOURCE_KEY]
  );
  const wave = await c.query(
    `select count(*)::int n from provider_county_credential
      where wave_id=$1 and manifest_hash=$2`,
    [WAVE_A, WAVE_A_HASH]
  );
  const dups = await c.query(
    `select upper(credential_number) mr, count(*)::int n
       from provider_county_credential where source=$1
       group by 1 having count(*)>1`,
    [SOURCE_KEY]
  );
  const row = q.rows[0];
  const okPre =
    row.credentials === 70 &&
    row.companies === 70 &&
    row.internal_only === 70 &&
    row.published === 0 &&
    row.orphans === 0 &&
    dups.rows.length === 0 &&
    wave.rows[0].n === 70;
  const okFlexible =
    row.credentials === 70 &&
    row.companies === 70 &&
    row.orphans === 0 &&
    dups.rows.length === 0 &&
    row.internal_only + row.published === 70 &&
    wave.rows[0].n === 70;
  return {
    ...row,
    wave_count: wave.rows[0].n,
    duplicates: dups.rows.length,
    ok_pre_publish: okPre,
    ok: okFlexible,
  };
}

async function revalidateNine(c, draft) {
  const results = [];
  let fail = 0;
  for (const m of draft.members) {
    const issues = [];
    const co = await c.query(
      `select id, slug, publication_state, indexable from companies where id=$1`,
      [m.company_id]
    );
    if (!co.rows.length) issues.push('COMPANY_MISSING');
    else {
      if (co.rows[0].publication_state !== 'PUBLISHABLE')
        issues.push('NOT_PUBLISHABLE');
      if (co.rows[0].slug !== m.slug) issues.push('SLUG_DRIFT');
    }
    const cred = await c.query(
      `select * from provider_county_credential
        where source=$1 and upper(credential_number)=upper($2)`,
      [SOURCE_KEY, m.miami_dade_mr]
    );
    if (!cred.rows.length) issues.push('CREDENTIAL_MISSING');
    else {
      const r = cred.rows[0];
      if (r.company_id !== m.company_id) issues.push('WRONG_COMPANY');
      if (String(r.fdacs_im).toUpperCase() !== String(m.fdacs_im).toUpperCase())
        issues.push('FDACS_DRIFT');
      if (!['INTERNAL_ONLY', 'PUBLISHED'].includes(r.evidence_publication_state))
        issues.push('UNEXPECTED_EVIDENCE_STATE');
      const status = String(r.normalized_status || r.source_status || '');
      if (
        !/^ISSUED$/i.test(status) &&
        !/^Issued$/i.test(String(r.source_status || ''))
      )
        issues.push('STATUS_DRIFT');
    }
    // Multi-MR ambiguity on canary company → BLOCK
    const multi = await c.query(
      `select count(*)::int n from provider_county_credential
        where source=$1 and company_id=$2`,
      [SOURCE_KEY, m.company_id]
    );
    if (multi.rows[0].n !== 1) issues.push('MULTI_MR_AMBIGUITY');
    if (issues.length) fail++;
    results.push({
      miami_dade_mr: m.miami_dade_mr,
      company_id: m.company_id,
      slug: m.slug,
      pass: issues.length === 0,
      issues,
      evidence_state: cred.rows[0]?.evidence_publication_state || null,
      raw_status: cred.rows[0]?.source_status || null,
      normalized_status: cred.rows[0]?.normalized_status || null,
    });
  }
  return {
    checked: 9,
    pass: 9 - fail,
    fail,
    identity_exact: `${9 - fail}/9`,
    wrong_company: results.filter((r) => r.issues.includes('WRONG_COMPANY'))
      .length,
    rows: results,
  };
}

function promote(draft) {
  mkdirSync(OUT, { recursive: true });
  const members = draft.members.map((m) => ({
    company_id: m.company_id,
    slug: m.slug,
    company_publication_state: m.company_publication_state,
    miami_dade_mr: m.miami_dade_mr,
    fdacs_im: m.fdacs_im,
    regulator: m.regulator,
    raw_status: m.raw_status,
    normalized_status: m.normalized_status,
    consumer_status_label: m.consumer_status_label,
    freshness: m.freshness,
    identity_result: m.identity_result,
    source_key: SOURCE_KEY,
    current_evidence_state: 'INTERNAL_ONLY',
    intended_evidence_state: 'PUBLISHED',
    identity_ruleset: 'MDC_FDACS_RECONCILIATION_V1',
    rollback_state: 'INTERNAL_ONLY',
    credential_type_public: m.credential_type_public,
    multi_credential_handling: 'SINGLE_REGISTRATION',
  }));
  const body = {
    wave_id: FINAL_ID,
    companies: members.map((m) => m.company_id).sort(),
    credentials: members.map((m) => m.miami_dade_mr).sort(),
    intended_evidence_state: 'PUBLISHED',
  };
  const manifest_hash = createHash('sha256')
    .update(JSON.stringify(body))
    .digest('hex');
  const final = {
    wave_id: FINAL_ID,
    task: 'MDC-PROD-003',
    apply: true,
    created_at: new Date().toISOString(),
    company_count: 9,
    credential_count: 9,
    manifest_hash,
    draft_hash: DRAFT_HASH,
    draft_wave_id: DRAFT_ID,
    hash_note:
      manifest_hash === DRAFT_HASH
        ? 'Final hash equals draft hash'
        : 'Final hash differs from draft due to final-manifest serialization/versioning (membership unchanged)',
    membership_unchanged_from_draft: true,
    source_program_key: SOURCE_KEY,
    wave_a_id: WAVE_A,
    wave_a_hash: WAVE_A_HASH,
    members,
    google_places_api_requests: 0,
    consumer_pii: 0,
    trust_score_effect: 0,
    lbt_mutations: 0,
    structured_data_hold: 'HOLD_FROM_STRUCTURED_DATA_V1',
  };
  writeFileSync(
    resolve(OUT, 'publication-canary-v1.json'),
    JSON.stringify(final, null, 2) + '\n'
  );
  writeFileSync(
    resolve(OUT, 'canary-final-manifest.json'),
    JSON.stringify(final, null, 2) + '\n'
  );
  return final;
}

async function applyPublish(c, final, dryRun) {
  const mrs = final.members.map((m) => m.miami_dade_mr);
  const companyIds = final.members.map((m) => m.company_id);
  const pre = await c.query(
    `select credential_number, company_id, evidence_publication_state
       from provider_county_credential
      where source=$1 and credential_number = any($2::text[])`,
    [SOURCE_KEY, mrs]
  );
  if (pre.rows.length !== 9)
    throw new Error(`Expected 9 rows, got ${pre.rows.length}`);
  for (const r of pre.rows) {
    if (
      r.evidence_publication_state !== 'INTERNAL_ONLY' &&
      r.evidence_publication_state !== 'PUBLISHED'
    ) {
      throw new Error(
        `Bad state for ${r.credential_number}: ${r.evidence_publication_state}`
      );
    }
  }
  // multi-MR safety
  const multi = await c.query(
    `select company_id, count(*)::int n from provider_county_credential
      where source=$1 and company_id = any($2::text[])
      group by 1 having count(*)>1`,
    [SOURCE_KEY, companyIds]
  );
  if (multi.rows.length)
    throw new Error('BLOCKED — multi-MR ambiguity on canary companies');

  if (dryRun) {
    const would = pre.rows.filter(
      (r) => r.evidence_publication_state === 'INTERNAL_ONLY'
    ).length;
    return {
      mode: 'dry-run',
      credential_transitions: {
        from: 'INTERNAL_ONLY',
        to: 'PUBLISHED',
        count: would,
      },
      would_publish: would,
      already_published: pre.rows.filter(
        (r) => r.evidence_publication_state === 'PUBLISHED'
      ).length,
      companies: 0,
      company_publication: 0,
      indexable: 0,
      psa: 0,
      contacts: 0,
      lbt: 0,
      complaints: 0,
      enforcement: 0,
      trust_score: 0,
      pbc: 0,
      state: 0,
      unexpected: 0,
    };
  }

  await c.query('begin');
  try {
    const upd = await c.query(
      `update provider_county_credential
          set evidence_publication_state='PUBLISHED',
              updated_at=now()
        where source=$1
          and credential_number = any($2::text[])
          and company_id = any($3::text[])
          and evidence_publication_state='INTERNAL_ONLY'
        returning credential_number, company_id`,
      [SOURCE_KEY, mrs, companyIds]
    );
    const after = await c.query(
      `select count(*)::int n from provider_county_credential
        where source=$1 and credential_number = any($2::text[])
          and evidence_publication_state='PUBLISHED'`,
      [SOURCE_KEY, mrs]
    );
    if (after.rows[0].n !== 9)
      throw new Error(`Post-publish count ${after.rows[0].n} != 9`);
    const other = await c.query(
      `select count(*)::int published_non_canary
         from provider_county_credential
        where source=$1
          and evidence_publication_state='PUBLISHED'
          and not (credential_number = any($2::text[]))`,
      [SOURCE_KEY, mrs]
    );
    if (other.rows[0].published_non_canary !== 0)
      throw new Error('Non-canary published rows detected');
    await c.query('commit');
    return {
      mode: 'apply',
      attempted: 9,
      successful: upd.rows.length,
      failed: 9 - upd.rows.length,
      published_now: upd.rows.length,
      published_total_canary: 9,
      non_canary_published: 0,
    };
  } catch (e) {
    await c.query('rollback');
    throw e;
  }
}

async function rollback(c, final, dryRun) {
  const mrs = final.members.map((m) => m.miami_dade_mr);
  if (dryRun) {
    const n = await c.query(
      `select count(*)::int n from provider_county_credential
        where source=$1 and credential_number=any($2::text[])
          and evidence_publication_state='PUBLISHED'`,
      [SOURCE_KEY, mrs]
    );
    return {
      mode: 'rollback-dry-run',
      credential_transitions: {
        from: 'PUBLISHED',
        to: 'INTERNAL_ONLY',
        count: n.rows[0].n,
      },
      would_revert: n.rows[0].n,
      companies: 0,
      company_publication: 0,
      credential_delete: 0,
      program_delete: 0,
      state: 0,
      pbc: 0,
      lbt: 0,
      schema_drop: 0,
      unrelated_county_credentials: 0,
    };
  }
  await c.query('begin');
  try {
    const upd = await c.query(
      `update provider_county_credential
          set evidence_publication_state='INTERNAL_ONLY', updated_at=now()
        where source=$1 and credential_number=any($2::text[])
          and evidence_publication_state='PUBLISHED'
        returning credential_number`,
      [SOURCE_KEY, mrs]
    );
    await c.query('commit');
    return { mode: 'rollback', reverted: upd.rows.length };
  } catch (e) {
    await c.query('rollback');
    throw e;
  }
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const c = await client();
  try {
    if (has('--baseline')) {
      const b = await baseline(c);
      writeFileSync(
        resolve(OUT, 'live-mdc-baseline.json'),
        JSON.stringify(b, null, 2) + '\n'
      );
      console.log(JSON.stringify({ ok: b.ok, ...b }, null, 2));
      if (!b.ok_pre_publish && !b.ok) process.exit(3);
      return;
    }
    if (has('--revalidate')) {
      const draft = loadDraft();
      const r = await revalidateNine(c, draft);
      const notInternal = r.rows.filter(
        (x) => x.evidence_state && x.evidence_state !== 'INTERNAL_ONLY'
      );
      const gate =
        r.fail === 0 && (has('--allow-published') || notInternal.length === 0)
          ? 'PASS'
          : 'BLOCKED — CANARY NOT APPLIED';
      const out = { ...r, gate, not_internal: notInternal.length };
      writeFileSync(
        resolve(OUT, 'canary-revalidation.json'),
        JSON.stringify(out, null, 2) + '\n'
      );
      console.log(JSON.stringify(out, null, 2));
      if (gate !== 'PASS') process.exit(3);
      return;
    }
    if (has('--promote-manifest')) {
      const draft = loadDraft();
      const final = promote(draft);
      console.log(
        JSON.stringify(
          {
            ok: true,
            wave_id: final.wave_id,
            companies: final.company_count,
            credentials: final.credential_count,
            manifest_hash: final.manifest_hash,
            draft_hash: final.draft_hash,
            hash_note: final.hash_note,
            membership_unchanged_from_draft: true,
          },
          null,
          2
        )
      );
      return;
    }

    const finalPath = resolve(OUT, 'publication-canary-v1.json');
    if (!existsSync(finalPath)) throw new Error('Run --promote-manifest first');
    const final = JSON.parse(readFileSync(finalPath, 'utf8'));
    const expectedHash = arg('--manifest-hash');

    if (has('--apply-publish')) {
      if (!expectedHash || expectedHash !== final.manifest_hash)
        throw new Error('--apply-publish requires matching --manifest-hash');
      const draft = loadDraft();
      const r = await revalidateNine(c, draft);
      if (r.fail !== 0) {
        console.log(
          JSON.stringify({
            ok: false,
            status: 'BLOCKED — CANARY NOT APPLIED',
            r,
          })
        );
        process.exit(3);
      }
      const res = await applyPublish(c, final, has('--dry-run'));
      writeFileSync(
        resolve(OUT, 'publish-apply-result.json'),
        JSON.stringify(res, null, 2) + '\n'
      );
      console.log(JSON.stringify({ ok: true, ...res }, null, 2));
      return;
    }
    if (has('--rollback')) {
      if (!expectedHash || expectedHash !== final.manifest_hash)
        throw new Error('--rollback requires matching --manifest-hash');
      const res = await rollback(c, final, has('--dry-run'));
      writeFileSync(
        resolve(OUT, 'rollback-result.json'),
        JSON.stringify(res, null, 2) + '\n'
      );
      console.log(JSON.stringify({ ok: true, ...res }, null, 2));
      return;
    }
    console.error(
      'Usage: --baseline | --revalidate | --promote-manifest | --apply-publish|--rollback --manifest-hash'
    );
    process.exit(1);
  } finally {
    await c.end();
  }
}

main().catch((e) => {
  console.error(String(e?.message || e));
  process.exit(1);
});
