/**
 * PBC-PROD-003 — manifest-bound publication command for the exact final 11.
 *
 * Usage:
 *   node scripts/publish-pbc-prod-003-canary.mjs --dry-run
 *   node scripts/publish-pbc-prod-003-canary.mjs --apply --manifest-hash <hash>
 *   node scripts/publish-pbc-prod-003-canary.mjs --rollback --manifest-hash <hash>
 *   node scripts/publish-pbc-prod-003-canary.mjs --preconditions
 *
 * Operates only on PBC_COUNTY_CREDENTIAL_PUBLICATION_CANARY_V1 members.
 * No company/PSA/contact mutations. No INTERNAL_ONLY public render bypass.
 */
import { spawnSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';

const FINAL = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-003/publication-canary-v1.json'
);
const CANARY = resolve('scripts/pbc-prod-003-canary.mjs');

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
  if (!existsSync(FINAL)) throw new Error('Missing final canary manifest — promote first');
  const final = JSON.parse(readFileSync(FINAL, 'utf8'));
  if (final.company_count !== 11 || final.credential_count !== 11)
    throw new Error('Final canary must be 11/11');
  if (!final.membership_unchanged_from_draft)
    throw new Error('Membership must match draft');

  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('production DB URL missing');
  const c = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await c.connect();
  try {
    const mvs = final.members.map((m) => m.palm_beach_mv);
    const companies = final.members.map((m) => m.company_id);
    const creds = await c.query(
      `select credential_number, company_id, evidence_publication_state, fdacs_im, retrieved_at
         from provider_county_credential
        where source=$1 and credential_number = any($2::text[])`,
      ['pbc-consumer-affairs-moving-business-permit', mvs]
    );
    if (creds.rows.length !== 11) throw new Error(`Expected 11 creds, got ${creds.rows.length}`);
    for (const m of final.members) {
      const co = await c.query(
        `select publication_state from companies where id=$1`,
        [m.company_id]
      );
      if (!co.rows.length || co.rows[0].publication_state !== 'PUBLISHABLE')
        throw new Error(`Company not PUBLISHABLE: ${m.company_id}`);
      const row = creds.rows.find(
        (r) => String(r.credential_number).toUpperCase() === m.palm_beach_mv.toUpperCase()
      );
      if (!row) throw new Error(`Missing credential ${m.palm_beach_mv}`);
      if (row.company_id !== m.company_id) throw new Error(`Company mismatch ${m.palm_beach_mv}`);
      if (String(row.fdacs_im).toUpperCase() !== m.fdacs_im.toUpperCase())
        throw new Error(`FDACS mismatch ${m.palm_beach_mv}`);
      if (row.evidence_publication_state !== 'INTERNAL_ONLY')
        throw new Error(
          `Expected INTERNAL_ONLY for ${m.palm_beach_mv}, got ${row.evidence_publication_state}`
        );
    }
    // anon deny
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { persistSession: false } }
    );
    const anon = await sb.from('provider_county_credential').select('id').limit(1);
    const anonDenied = Boolean(anon.error) || !(anon.data || []).length;
    if (!anonDenied) throw new Error('Anon table read unexpectedly allowed');

    console.log(
      JSON.stringify(
        {
          ok: true,
          mode: 'preconditions',
          manifest_hash: final.manifest_hash,
          companies: 11,
          credentials: 11,
          all_publishable: true,
          all_internal_only: true,
          identity_exact: '11/11',
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

async function main() {
  if (has('--preconditions')) {
    await preconditions();
    return;
  }
  if (has('--dry-run') && !has('--apply') && !has('--rollback')) {
    // dry-run publish preview
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
    runCanary(['--rollback', '--manifest-hash', hash, ...(has('--dry-run') ? ['--dry-run'] : [])]);
    return;
  }
  console.error(
    'Usage: --preconditions | --dry-run | --apply --manifest-hash <hash> | --rollback --manifest-hash <hash>'
  );
  process.exit(1);
}

function loadHash() {
  const final = JSON.parse(readFileSync(FINAL, 'utf8'));
  return final.manifest_hash;
}

main().catch((e) => {
  console.error(String(e?.message || e));
  process.exit(1);
});
