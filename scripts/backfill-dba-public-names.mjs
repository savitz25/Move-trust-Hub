/**
 * Normalize directory public names to prefer FMCSA DBA over legal entity name.
 *
 * Only rewrites companies whose stored `name` is still the legal entity name.
 * Curated trade names (different from legal) are left alone.
 *
 * Usage:
 *   node scripts/backfill-dba-public-names.mjs              # live
 *   node scripts/backfill-dba-public-names.mjs --dry-run
 *   node scripts/backfill-dba-public-names.mjs --limit=50
 *   node scripts/backfill-dba-public-names.mjs --update-slugs
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
const updateSlugs = process.argv.includes('--update-slugs');
const limitArg = process.argv.find((a) => a.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : 0;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const admin = createClient(url, key, { auth: { persistSession: false } });

const LEGAL_SUFFIX_UPPER = new Set([
  'llc',
  'inc',
  'corp',
  'ltd',
  'lp',
  'pllc',
  'pc',
  'pa',
  'co',
  'usa',
  'us',
  'dba',
]);

function stringOrNull(value) {
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  if (!s) return null;
  const upper = s.toUpperCase();
  if (
    upper === '-' ||
    upper === '--' ||
    upper === 'N/A' ||
    upper === 'NA' ||
    upper === 'NONE' ||
    upper === 'NULL' ||
    upper === 'UNKNOWN' ||
    upper === 'TBD'
  ) {
    return null;
  }
  if (!/[a-z0-9]/i.test(s)) return null;
  return s;
}

function normalizeCompanyNameKey(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function formatFmcsaDisplayName(name) {
  const trimmed = String(name || '')
    .trim()
    .replace(/\s+/g, ' ');
  if (!trimmed) return '';
  if (/[a-z]/.test(trimmed)) return trimmed;
  return trimmed
    .toLowerCase()
    .split(/(\s+|&)/)
    .map((token) => {
      if (!token || /^\s+$/.test(token) || token === '&') return token;
      const bare = token.replace(/[^a-z0-9]/gi, '');
      if (LEGAL_SUFFIX_UPPER.has(bare.toLowerCase())) return token.toUpperCase();
      if (/^\d/.test(token)) {
        return token
          .split(/(-)/)
          .map((part) =>
            part === '-' || /^\d+$/.test(part)
              ? part
              : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join('');
      }
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join('');
}

function stripEntitySuffixKey(value) {
  // Do not strip "company" — often part of the trade name.
  return normalizeCompanyNameKey(value).replace(
    /(llc|inc|incorporated|corp|corporation|ltd|pllc|lp|co)$/g,
    ''
  );
}

function isDistinctUsableDba(dbaName, legalName) {
  const dba = stringOrNull(dbaName);
  if (!dba) return false;
  const legal = stringOrNull(legalName);
  if (!legal) return true;
  if (normalizeCompanyNameKey(dba) === normalizeCompanyNameKey(legal)) return false;
  if (stripEntitySuffixKey(dba) === stripEntitySuffixKey(legal)) return false;
  return true;
}

function preferPublicCompanyName({ legalName, dbaName, fallback }) {
  const dba = stringOrNull(dbaName);
  const legal = stringOrNull(legalName);
  const fb = stringOrNull(fallback);
  if (dba && isDistinctUsableDba(dba, legal)) {
    return formatFmcsaDisplayName(dba);
  }
  if (legal) return formatFmcsaDisplayName(legal);
  if (fb) return formatFmcsaDisplayName(fb);
  return '';
}

function extractDba(raw) {
  if (!raw || typeof raw !== 'object') return null;
  return (
    stringOrNull(raw.dbaName) ||
    stringOrNull(raw.dba_name) ||
    stringOrNull(raw.doingBusinessAsName)
  );
}

function extractLegal(raw) {
  if (!raw || typeof raw !== 'object') return null;
  return (
    stringOrNull(raw.legalName) ||
    stringOrNull(raw.legal_name) ||
    stringOrNull(raw.name)
  );
}

function slugifyCompanyName(name) {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

function resolveNames(row) {
  const dbaRaw = extractDba(row.fmcsa_raw);
  const legalRaw =
    stringOrNull(row.fmcsa_legal_name) ||
    extractLegal(row.fmcsa_raw) ||
    null;
  const stored = stringOrNull(row.name);
  const fmcsaPreferred = preferPublicCompanyName({
    legalName: legalRaw,
    dbaName: dbaRaw,
    fallback: stored,
  });
  const prefersDba = Boolean(
    dbaRaw &&
      isDistinctUsableDba(dbaRaw, legalRaw) &&
      fmcsaPreferred &&
      normalizeCompanyNameKey(fmcsaPreferred) ===
        normalizeCompanyNameKey(formatFmcsaDisplayName(dbaRaw))
  );
  const legalName = legalRaw ? formatFmcsaDisplayName(legalRaw) : null;
  const dbaName = dbaRaw ? formatFmcsaDisplayName(dbaRaw) : null;

  let publicName = fmcsaPreferred || stored || '';
  let shouldUpdate = false;

  if (!stored) {
    shouldUpdate = Boolean(publicName);
  } else if (
    prefersDba &&
    legalName &&
    normalizeCompanyNameKey(stored) === normalizeCompanyNameKey(legalName)
  ) {
    publicName = fmcsaPreferred;
    shouldUpdate = true;
  } else if (
    publicName &&
    normalizeCompanyNameKey(stored) === normalizeCompanyNameKey(publicName) &&
    stored.trim() !== publicName.trim()
  ) {
    // Soft title-case ALL CAPS only; keep spaced curated names over jammed DBAs.
    if (/\s/.test(stored) && !/\s/.test(publicName)) {
      publicName = stored;
      shouldUpdate = false;
    } else if (/[a-z]/.test(stored)) {
      publicName = stored;
      shouldUpdate = false;
    } else {
      shouldUpdate = true;
    }
  } else {
    publicName = stored;
    shouldUpdate = false;
  }

  return { publicName, legalName, dbaName, prefersDba, shouldUpdate };
}

async function fetchAllCompanies() {
  const pageSize = 500;
  let from = 0;
  const all = [];
  for (;;) {
    const { data, error } = await admin
      .from('companies')
      .select('id, slug, name, usdot_number, fmcsa_legal_name, fmcsa_raw')
      .order('id', { ascending: true })
      .range(from, from + pageSize - 1);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    all.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }
  return all;
}

async function slugTaken(slug, excludeId) {
  const { data } = await admin
    .from('companies')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();
  if (!data) return false;
  return data.id !== excludeId;
}

async function main() {
  console.log(
    `DBA public-name backfill (${dryRun ? 'DRY RUN' : 'LIVE'}${
      updateSlugs ? ', update-slugs' : ''
    })…`
  );

  let companies = await fetchAllCompanies();
  if (limit > 0) companies = companies.slice(0, limit);
  console.log(`Loaded ${companies.length} companies`);

  const changes = [];
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  let legalOnly = 0;

  for (const row of companies) {
    const resolved = resolveNames(row);
    const legalStored = resolved.legalName;
    const patch = {};

    if (resolved.shouldUpdate && resolved.publicName) {
      if (
        normalizeCompanyNameKey(resolved.publicName) !==
          normalizeCompanyNameKey(row.name || '') ||
        row.name?.trim() !== resolved.publicName.trim()
      ) {
        patch.name = resolved.publicName;
      }
    }

    if (
      legalStored &&
      normalizeCompanyNameKey(legalStored) !==
        normalizeCompanyNameKey(row.fmcsa_legal_name || '')
    ) {
      patch.fmcsa_legal_name = legalStored;
      legalOnly++;
    } else if (legalStored && !row.fmcsa_legal_name) {
      patch.fmcsa_legal_name = legalStored;
    }

    let newSlug = null;
    if (updateSlugs && patch.name) {
      const candidate = slugifyCompanyName(patch.name);
      if (candidate && candidate !== row.slug && !(await slugTaken(candidate, row.id))) {
        newSlug = candidate;
        patch.slug = candidate;
      }
    }

    if (!Object.keys(patch).length) {
      skipped++;
      continue;
    }

    changes.push({
      id: row.id,
      slug: row.slug,
      oldName: row.name,
      newName: patch.name || row.name,
      legal: legalStored,
      dba: resolved.dbaName,
      prefersDba: resolved.prefersDba,
      newSlug,
      fields: Object.keys(patch),
    });

    if (dryRun) {
      updated++;
      continue;
    }

    const { error } = await admin.from('companies').update(patch).eq('id', row.id);
    if (error) {
      console.error(`  FAIL ${row.slug}: ${error.message}`);
      errors++;
    } else {
      updated++;
      console.log(
        `  ✓ ${row.slug}: "${row.name}" → "${patch.name || row.name}"${
          newSlug ? ` [slug→${newSlug}]` : ''
        }${patch.fmcsa_legal_name && !patch.name ? ' [legal only]' : ''}`
      );
    }
  }

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, `dba-public-names-${Date.now()}.json`);
  writeFileSync(
    outPath,
    JSON.stringify({ dryRun, updateSlugs, updated, skipped, errors, changes }, null, 2)
  );

  console.log('\nSummary');
  console.log(`  updated: ${updated}`);
  console.log(`  skipped: ${skipped}`);
  console.log(`  errors:  ${errors}`);
  console.log(`  report:  ${outPath}`);

  const nameChanges = changes.filter((c) => c.fields.includes('name'));
  console.log(`  name rewrites: ${nameChanges.length}`);
  if (nameChanges.length) {
    console.log('\nName rewrites (first 25):');
    for (const c of nameChanges.slice(0, 25)) {
      console.log(
        `  - ${c.oldName} → ${c.newName}${c.dba ? ` (DBA ${c.dba})` : ''}`
      );
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
