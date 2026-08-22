/**
 * MDC-PROD-003 — manifest-bound publication command for the exact final 9.
 *
 * Usage:
 *   node scripts/publish-mdc-prod-003-canary.mjs --preconditions
 *   node scripts/publish-mdc-prod-003-canary.mjs --dry-run
 *   node scripts/publish-mdc-prod-003-canary.mjs --apply --manifest-hash <hash>
 *   node scripts/publish-mdc-prod-003-canary.mjs --rollback --manifest-hash <hash>
 *
 * Operates only on MDC_MR_PUBLICATION_CANARY_V1 members.
 * No company/PSA/contact/LBT mutations. No INTERNAL_ONLY public render bypass.
 * No --publish-all-miami-dade.
 */
import { spawnSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';

const FINAL = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-003/publication-canary-v1.json'
);
const CANARY = resolve('scripts/mdc-prod-003-canary.mjs');
const SOURCE_KEY = 'mdc-moving-business-registration';

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

function runCanary(args) {
  const r = spawnSync(process.execPath, [CANARY, ...args], {
    stdio: 'inherit',
    env: process.env,
  });
  if (r.status) process.exit(r.status);
}

async function preconditions() {
  loadEnv();
  if (!existsSync(FINAL))
    throw new Error('Missing final canary manifest — promote first');
  const final = JSON.parse(readFileSync(FINAL, 'utf8'));
  if (final.company_count !== 9 || final.credential_count !== 9)
    throw new Error('Final canary must be 9/9');
  if (!final.membership_unchanged_from_draft)
    throw new Error('Membership must match draft');

  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('production DB URL missing');
  const c = new pg.Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  });
  await c.connect();
  try {
    const mrs = final.members.map((m) => m.miami_dade_mr);
    const creds = await c.query(
      `select credential_number, company_id, evidence_publication_state, fdacs_im, source_status, normalized_status
         from provider_county_credential
        where source=$1 and credential_number = any($2::text[])`,
      [SOURCE_KEY, mrs]
    );
    if (creds.rows.length !== 9)
      throw new Error(`Expected 9 creds, got ${creds.rows.length}`);
    for (const m of final.members) {
      const co = await c.query(
        `select publication_state from companies where id=$1`,
        [m.company_id]
      );
      if (!co.rows.length || co.rows[0].publication_state !== 'PUBLISHABLE')
        throw new Error(`Company not PUBLISHABLE: ${m.company_id}`);
      const row = creds.rows.find(
        (r) =>
          String(r.credential_number).toUpperCase() ===
          m.miami_dade_mr.toUpperCase()
      );
      if (!row) throw new Error(`Missing credential ${m.miami_dade_mr}`);
      if (row.company_id !== m.company_id)
        throw new Error(`Company mismatch ${m.miami_dade_mr}`);
      if (String(row.fdacs_im).toUpperCase() !== m.fdacs_im.toUpperCase())
        throw new Error(`FDACS mismatch ${m.miami_dade_mr}`);
      if (row.evidence_publication_state !== 'INTERNAL_ONLY')
        throw new Error(
          `Expected INTERNAL_ONLY for ${m.miami_dade_mr}, got ${row.evidence_publication_state}`
        );
    }
    const multi = await c.query(
      `select company_id, count(*)::int n from provider_county_credential
        where source=$1 and company_id = any($2::text[])
        group by 1 having count(*)>1`,
      [SOURCE_KEY, final.members.map((m) => m.company_id)]
    );
    if (multi.rows.length)
      throw new Error('BLOCKED — multi-MR ambiguity on canary');

    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { persistSession: false } }
    );
    const anon = await sb
      .from('provider_county_credential')
      .select('id')
      .limit(1);
    const anonDenied = Boolean(anon.error) || !(anon.data || []).length;
    if (!anonDenied) throw new Error('Anon table read unexpectedly allowed');

    console.log(
      JSON.stringify(
        {
          ok: true,
          mode: 'preconditions',
          manifest_hash: final.manifest_hash,
          companies: 9,
          credentials: 9,
          all_publishable: true,
          all_internal_only: true,
          identity_exact: '9/9',
          multi_mr: 0,
          anon_denied: true,
          public_read_code_note:
            'Caller must confirm production serves merge SHA with public-read path before --apply',
        },
        null,
        2
      )
    );
  } finally {
    await c.end();
  }
}

function loadHash() {
  const final = JSON.parse(readFileSync(FINAL, 'utf8'));
  return final.manifest_hash;
}

async function main() {
  if (has('--publish-all-miami-dade')) {
    console.error('Refused: unbounded program-wide apply is not allowed');
    process.exit(2);
  }
  if (has('--preconditions')) {
    await preconditions();
    return;
  }
  if (has('--dry-run') && !has('--apply') && !has('--rollback')) {
    runCanary(['--apply-publish', '--dry-run', '--manifest-hash', loadHash()]);
    return;
  }
  if (has('--apply')) {
    const hash = arg('--manifest-hash') || loadHash();
    await preconditions();
    runCanary(['--apply-publish', '--manifest-hash', hash]);
    return;
  }
  if (has('--rollback')) {
    const hash = arg('--manifest-hash') || loadHash();
    runCanary([
      '--rollback',
      '--manifest-hash',
      hash,
      ...(has('--dry-run') ? ['--dry-run'] : []),
    ]);
    return;
  }
  console.error(
    'Usage: --preconditions | --dry-run | --apply --manifest-hash <hash> | --rollback --manifest-hash <hash>'
  );
  process.exit(1);
}

main().catch((e) => {
  console.error(String(e?.message || e));
  process.exit(1);
});
