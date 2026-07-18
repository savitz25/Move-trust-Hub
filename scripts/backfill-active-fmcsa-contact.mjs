/**
 * Targeted backfill: Physical Address + Phone for active directory companies only.
 *
 * Usage:
 *   node scripts/backfill-active-fmcsa-contact.mjs           # live
 *   node scripts/backfill-active-fmcsa-contact.mjs --dry-run
 *   node scripts/backfill-active-fmcsa-contact.mjs --limit=20
 *
 * Prefer columns physical_address + phone when present.
 * Always refreshes fmcsa_raw so profile display can fall back immediately.
 * Does not overwrite safety ratings, scores, or non-empty headquarters.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

function loadEnv(file) {
  const p = resolve(process.cwd(), file);
  if (!existsSync(p)) return;
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
loadEnv('.env.local');
loadEnv('.env.production.local');

const dryRun = process.argv.includes('--dry-run');
const limitArg = process.argv.find((a) => a.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : 0;
const DELAY_MS = Number(process.env.FMCSA_BACKFILL_DELAY_MS || 350);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const webKey = process.env.FMCSA_WEB_KEY?.trim();

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}
if (!webKey && !dryRun) {
  console.error('Missing FMCSA_WEB_KEY (required for live re-pull)');
  process.exit(1);
}

const admin = createClient(url, key, { auth: { persistSession: false } });

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function stringOrNull(v) {
  if (v == null) return null;
  const s = String(v).trim();
  return s || null;
}

function buildAddress(carrier) {
  if (!carrier || typeof carrier !== 'object') return null;
  const parts = [
    carrier.phyStreet,
    carrier.phyCity,
    carrier.phyState ?? carrier.phyStateCode,
    carrier.phyZipcode ?? carrier.phyZip,
  ]
    .map(stringOrNull)
    .filter(Boolean);
  return parts.length ? parts.join(', ') : null;
}

function extractContact(carrier) {
  return {
    physical_address: buildAddress(carrier),
    phone: stringOrNull(carrier?.telephone) || stringOrNull(carrier?.phone),
  };
}

function phoneFromGoogle(google) {
  if (!google || typeof google !== 'object') return null;
  const direct = stringOrNull(google.phone);
  if (direct) return direct;
  const raw = google.raw_response;
  if (raw && typeof raw === 'object') {
    return (
      stringOrNull(raw.nationalPhoneNumber) ||
      stringOrNull(raw.internationalPhoneNumber) ||
      stringOrNull(raw.formattedPhoneNumber) ||
      stringOrNull(raw.phone)
    );
  }
  return null;
}

async function detectContactColumns() {
  const { error } = await admin
    .from('companies')
    .select('id, physical_address, phone')
    .limit(1);
  if (!error) return true;
  console.warn(
    'Note: physical_address/phone columns not in schema yet — will update fmcsa_raw (+ empty headquarters). Apply migration 20260718150000_companies_physical_address_phone.sql for dedicated columns.',
    error.message
  );
  return false;
}

async function fetchFmcsaByDot(dot) {
  const endpoint = `https://mobile.fmcsa.dot.gov/qc/services/carriers/${encodeURIComponent(dot)}?webKey=${encodeURIComponent(webKey)}`;
  const res = await fetch(endpoint, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) {
    return { error: `HTTP ${res.status}`, carrier: null };
  }
  const json = await res.json();
  const content = json?.content ?? json;
  let carrier = content?.carrier ?? content;
  if (Array.isArray(carrier)) carrier = carrier[0];
  if (carrier?.carrier) carrier = carrier.carrier;
  if (!carrier || typeof carrier !== 'object') {
    return { error: 'no carrier in response', carrier: null };
  }
  return { error: null, carrier };
}

async function main() {
  const hasContactCols = await detectContactColumns();

  const selectCols = hasContactCols
    ? 'id, slug, name, usdot_number, headquarters, physical_address, phone, fmcsa_raw, google_data, out_of_service'
    : 'id, slug, name, usdot_number, headquarters, fmcsa_raw, google_data, out_of_service';

  let query = admin
    .from('companies')
    .select(selectCols)
    .or('out_of_service.is.null,out_of_service.eq.false')
    .order('slug');

  if (limit > 0) query = query.limit(limit);

  const { data: companies, error } = await query;
  if (error) {
    console.error('Failed to load companies', error.message);
    process.exit(1);
  }

  console.log(
    `Loaded ${companies.length} active companies${dryRun ? ' (dry-run)' : ''} · contact columns=${hasContactCols}`
  );

  const stats = {
    total: companies.length,
    updated: 0,
    unchanged: 0,
    withAddress: 0,
    withPhone: 0,
    missingAddress: 0,
    missingPhone: 0,
    noUsdot: 0,
    fetchFailed: 0,
    errors: [],
  };

  const results = [];

  for (let i = 0; i < companies.length; i++) {
    const c = companies[i];
    const dot = (c.usdot_number || '').replace(/\D/g, '');
    const prefix = `[${i + 1}/${companies.length}] ${c.slug}`;

    if (!dot) {
      stats.noUsdot++;
      console.log(`${prefix}: skip (no USDOT)`);
      results.push({ slug: c.slug, status: 'no_usdot' });
      continue;
    }

    let carrier = null;
    if (dryRun && c.fmcsa_raw && typeof c.fmcsa_raw === 'object') {
      carrier = c.fmcsa_raw;
    } else if (webKey) {
      await sleep(DELAY_MS);
      const { error: fetchErr, carrier: fetched } = await fetchFmcsaByDot(dot);
      if (fetchErr || !fetched) {
        if (c.fmcsa_raw && typeof c.fmcsa_raw === 'object') {
          carrier = c.fmcsa_raw;
          console.log(`${prefix}: fetch failed (${fetchErr}), using stored fmcsa_raw`);
        } else {
          stats.fetchFailed++;
          console.log(`${prefix}: fetch failed — ${fetchErr}`);
          results.push({ slug: c.slug, status: 'fetch_failed', error: fetchErr });
          continue;
        }
      } else {
        carrier = fetched;
      }
    } else if (c.fmcsa_raw && typeof c.fmcsa_raw === 'object') {
      carrier = c.fmcsa_raw;
    } else {
      stats.fetchFailed++;
      results.push({ slug: c.slug, status: 'no_source' });
      continue;
    }

    const contact = extractContact(carrier);
    if (!contact.phone) {
      contact.phone = phoneFromGoogle(c.google_data);
    }
    if (contact.physical_address) stats.withAddress++;
    else stats.missingAddress++;
    if (contact.phone) stats.withPhone++;
    else stats.missingPhone++;

    const patch = {
      fmcsa_raw: carrier,
      fmcsa_last_checked: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (hasContactCols) {
      if (contact.physical_address) patch.physical_address = contact.physical_address;
      if (contact.phone) patch.phone = contact.phone;
    }
    if (contact.physical_address && !(c.headquarters || '').trim()) {
      patch.headquarters = contact.physical_address;
    }

    // Detect meaningful change for stats
    const prevAddr = hasContactCols ? (c.physical_address || '').trim() : '';
    const prevPhone = hasContactCols ? (c.phone || '').trim() : '';
    const addrChanged =
      Boolean(contact.physical_address) && contact.physical_address !== prevAddr;
    const phoneChanged = Boolean(contact.phone) && contact.phone !== prevPhone;
    const rawChanged = JSON.stringify(c.fmcsa_raw) !== JSON.stringify(carrier);

    if (!addrChanged && !phoneChanged && !rawChanged && !patch.headquarters) {
      stats.unchanged++;
      console.log(
        `${prefix}: unchanged (addr=${Boolean(contact.physical_address)} phone=${Boolean(contact.phone)})`
      );
      results.push({
        slug: c.slug,
        status: 'unchanged',
        hasAddress: Boolean(contact.physical_address),
        hasPhone: Boolean(contact.phone),
      });
      continue;
    }

    if (dryRun) {
      stats.updated++;
      console.log(`${prefix}: would update`, {
        physical_address: contact.physical_address,
        phone: contact.phone,
        headquarters: patch.headquarters,
      });
      results.push({
        slug: c.slug,
        status: 'would_update',
        hasAddress: Boolean(contact.physical_address),
        hasPhone: Boolean(contact.phone),
      });
      continue;
    }

    const { error: upErr } = await admin.from('companies').update(patch).eq('id', c.id);

    if (upErr) {
      // Strip contact cols and retry
      const fallback = { ...patch };
      delete fallback.physical_address;
      delete fallback.phone;
      const { error: up2 } = await admin.from('companies').update(fallback).eq('id', c.id);
      if (up2) {
        stats.errors.push(`${c.slug}: ${up2.message}`);
        console.log(`${prefix}: update failed — ${up2.message}`);
        continue;
      }
      console.log(`${prefix}: updated fmcsa_raw only (${upErr.message})`);
    } else {
      console.log(
        `${prefix}: updated (addr=${Boolean(contact.physical_address)} phone=${Boolean(contact.phone)})`
      );
    }

    stats.updated++;
    results.push({
      slug: c.slug,
      status: 'updated',
      hasAddress: Boolean(contact.physical_address),
      hasPhone: Boolean(contact.phone),
    });
  }

  console.log('\n=== Summary ===');
  console.log(JSON.stringify(stats, null, 2));
  console.log(
    `\nCoverage: address ${stats.withAddress}/${stats.total}, phone ${stats.withPhone}/${stats.total}`
  );

  mkdirSync(resolve('scripts/output'), { recursive: true });
  const outPath = resolve(
    'scripts/output',
    `backfill-fmcsa-contact-${new Date().toISOString().slice(0, 10)}.json`
  );
  writeFileSync(
    outPath,
    JSON.stringify({ stats, results, dryRun, hasContactCols }, null, 2)
  );
  console.log('Wrote', outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
