/**
 * Patch phone column from verification_sources.google / fmcsa_raw when phone is empty.
 * Never overwrites an existing non-empty phone.
 *
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/sync-phones-from-sources.ts
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/sync-phones-from-sources.ts --dry-run
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import {
  extractContactFromFmcsaRaw,
  phoneFromGoogleData,
} from '../lib/fmcsa/company-from-row';
import { normalizePhoneDisplay } from '../lib/verification/website-contact-scrape';

function loadEnv() {
  for (const f of ['.env.local', '.env.production.local']) {
    const p = resolve(process.cwd(), f);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m) continue;
      let v = m[2].trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (!process.env[m[1]]) process.env[m[1]] = v;
    }
  }
}
loadEnv();

const dryRun = process.argv.includes('--dry-run');

async function main() {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: rows, error } = await admin
    .from('companies')
    .select('id, slug, phone, fmcsa_raw, verification_sources')
    .or('out_of_service.is.null,out_of_service.eq.false');

  if (error) throw error;

  let updated = 0;
  let already = 0;
  let missing = 0;

  for (const row of rows ?? []) {
    if (row.phone?.trim()) {
      already++;
      continue;
    }
    const vs = row.verification_sources as { google?: unknown } | null;
    const fromGoogle = phoneFromGoogleData(vs?.google);
    const fromFmcsa = extractContactFromFmcsaRaw(row.fmcsa_raw).phone;
    const raw = fromGoogle || fromFmcsa;
    const phone = raw ? normalizePhoneDisplay(raw) || raw.trim() : null;
    if (!phone) {
      missing++;
      continue;
    }
    console.log(`${dryRun ? '[dry] ' : ''}${row.slug} → ${phone}`);
    if (!dryRun) {
      const { error: upErr } = await admin
        .from('companies')
        .update({ phone, last_updated: new Date().toISOString().slice(0, 10) })
        .eq('id', row.id);
      if (upErr) {
        console.error(`  FAIL ${upErr.message}`);
        continue;
      }
    }
    updated++;
  }

  console.log(
    JSON.stringify(
      {
        dryRun,
        total: rows?.length ?? 0,
        alreadyHadPhone: already,
        patched: updated,
        stillMissing: missing,
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
