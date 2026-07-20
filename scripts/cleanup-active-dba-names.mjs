/**
 * Targeted cleanup: active companies — set public name to FMCSA DBA when safe.
 *
 * Prefer DBA when it exists and is meaningfully different from the current name,
 * with quality guards so parent-agent / franchise DBA noise does not destroy
 * curated brand names (e.g. Allied Van Lines must not become Mayflower).
 *
 * Guards:
 *  - Active companies only (out_of_service is not true)
 *  - Distinct usable DBA (not placeholder, not legal with spaces removed)
 *  - Shared DBA across 3+ active carriers: only apply if current ≈ legal
 *  - Curated current (≠ legal): require token overlap with DBA; skip pure location strip
 *  - Current ≈ legal: always prefer distinct DBA
 *
 * Legal name stays in fmcsa_legal_name. Slug can update; id is kept for redirects.
 *
 * Usage:
 *   node scripts/cleanup-active-dba-names.mjs --dry-run
 *   node scripts/cleanup-active-dba-names.mjs --update-slugs
 *   node scripts/cleanup-active-dba-names.mjs --limit=20
 *   node scripts/cleanup-active-dba-names.mjs --aggressive   # fewer guards (not recommended)
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
const aggressive = process.argv.includes('--aggressive');
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

const STOP_TOKENS = new Set([
  'llc',
  'inc',
  'corp',
  'ltd',
  'lp',
  'pllc',
  'co',
  'the',
  'and',
  'of',
  'a',
  'an',
  'company',
  'companies',
]);

/** Tokens that are brand-generic, not location/variant discriminators. */
const BRAND_GENERIC_TOKENS = new Set([
  'moving',
  'movers',
  'move',
  'storage',
  'van',
  'lines',
  'line',
  'junk',
  'hauling',
  'truck',
  'trucking',
  'transfer',
  'relocation',
  'relocations',
  'logistics',
  'services',
  'service',
  'delivery',
  'interstate',
  'nationwide',
  'worldwide',
  'world',
  'wide',
  'systems',
  'system',
  'group',
  'express',
  'premier',
  'brothers',
  'guys',
  'men',
  'man',
  'hunks',
  'college',
  'two',
  'and',
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

function stripEntitySuffixKey(value) {
  return normalizeCompanyNameKey(value).replace(
    /(llc|inc|incorporated|corp|corporation|ltd|pllc|lp|co)$/g,
    ''
  );
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

function nameTokens(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !STOP_TOKENS.has(t) && t.length > 1);
}

function tokenOverlapRatio(a, b) {
  const ta = new Set(nameTokens(a));
  const tb = new Set(nameTokens(b));
  if (!ta.size || !tb.size) return 0;
  let hit = 0;
  for (const t of ta) if (tb.has(t)) hit++;
  return hit / Math.min(ta.size, tb.size);
}

function isDistinctFromCurrent(dbaRaw, currentName) {
  const dba = stringOrNull(dbaRaw);
  if (!dba) return false;
  const current = stringOrNull(currentName);
  if (!current) return true;
  if (normalizeCompanyNameKey(dba) === normalizeCompanyNameKey(current)) return false;
  if (stripEntitySuffixKey(dba) === stripEntitySuffixKey(current)) return false;
  // Jammed DBA vs spaced current with same letters
  if (!/\s/.test(dba) && /\s/.test(current) && normalizeCompanyNameKey(dba).length >= 10) {
    const dk = normalizeCompanyNameKey(dba);
    const ck = normalizeCompanyNameKey(current);
    if (dk === ck || ck.includes(dk) || dk.includes(ck)) return false;
  }
  return true;
}

function isDistinctFromLegal(dbaRaw, legalName) {
  const dba = stringOrNull(dbaRaw);
  if (!dba) return false;
  const legal = stringOrNull(legalName);
  if (!legal) return true;
  if (normalizeCompanyNameKey(dba) === normalizeCompanyNameKey(legal)) return false;
  if (stripEntitySuffixKey(dba) === stripEntitySuffixKey(legal)) return false;
  return true;
}

function exclusiveNonBrandTokens(fromName, otherName) {
  const other = new Set(nameTokens(otherName));
  return nameTokens(fromName).filter(
    (t) => !other.has(t) && !BRAND_GENERIC_TOKENS.has(t) && t.length >= 3
  );
}

/**
 * Safe to replace current public name with DBA?
 */
function shouldReplaceWithDba({ current, dba, legal, sharedDbaCount }) {
  if (!isDistinctFromCurrent(dba, current)) return { ok: false, reason: 'same-as-current' };
  if (!isDistinctFromLegal(dba, legal) && !aggressive) {
    return { ok: false, reason: 'dba-equals-legal' };
  }

  const currentKey = normalizeCompanyNameKey(current || '');
  const legalKey = legal ? normalizeCompanyNameKey(legal) : '';
  const currentIsLegal =
    Boolean(legalKey) &&
    (currentKey === legalKey ||
      stripEntitySuffixKey(current || '') === stripEntitySuffixKey(legal));

  if (aggressive) {
    return { ok: true, reason: 'aggressive' };
  }

  // Conflicting place/variant tokens (Auburn vs Annapolis, etc.)
  const locCur = exclusiveNonBrandTokens(current, dba);
  const locDba = exclusiveNonBrandTokens(dba, current);
  if (locCur.length > 0 && locDba.length > 0) {
    return { ok: false, reason: 'location-mismatch' };
  }

  // Shared parent DBA (Mayflower noise): only when still titled as legal entity
  if (sharedDbaCount >= 3 && !currentIsLegal) {
    return { ok: false, reason: `shared-dba-x${sharedDbaCount}` };
  }

  const overlap = tokenOverlapRatio(current, dba);
  const legalOverlap = legal ? tokenOverlapRatio(legal, dba) : 0;

  if (currentIsLegal) {
    // Legal-titled records still need DBA related to the brand (not a random co-listed DBA)
    if (Math.max(overlap, legalOverlap) < 0.34) {
      return { ok: false, reason: 'legal-but-unrelated-dba' };
    }
    return { ok: true, reason: 'current-is-legal' };
  }

  // Curated current name: require brand token overlap with DBA
  if (overlap < 0.5) {
    return { ok: false, reason: `low-overlap-${overlap.toFixed(2)}` };
  }

  const curTokens = nameTokens(current);
  const dbaTokens = nameTokens(dba);

  // Keep city/market variants on curated listings (Chattanooga, Knoxville, etc.)
  if (locCur.length > 0) {
    return { ok: false, reason: 'drops-location-variant' };
  }

  if (curTokens.length >= dbaTokens.length + 1 && dbaTokens.length <= 3 && overlap < 0.85) {
    return { ok: false, reason: 'location-or-variant-curated' };
  }

  // Prefer readable current over bloated multi-brand DBA strings
  if (dbaTokens.length >= curTokens.length + 3 && dba.length > current.length * 1.4) {
    return { ok: false, reason: 'bloated-dba' };
  }

  // Prefer current when DBA is only a truncated subset (Good Guys Moving… → Good Guys)
  if (
    dbaTokens.length <= 2 &&
    curTokens.length >= dbaTokens.length + 2 &&
    dbaTokens.every((t) => curTokens.includes(t))
  ) {
    return { ok: false, reason: 'truncated-dba' };
  }

  return { ok: true, reason: `curated-overlap-${overlap.toFixed(2)}` };
}

function slugifyCompanyName(name) {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

async function fetchActiveCompanies() {
  const pageSize = 500;
  let from = 0;
  const all = [];
  for (;;) {
    const { data, error } = await admin
      .from('companies')
      .select(
        'id, slug, name, usdot_number, fmcsa_legal_name, fmcsa_raw, out_of_service, authority_active'
      )
      .or('out_of_service.is.null,out_of_service.eq.false')
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
  const { data: bySlug } = await admin
    .from('companies')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();
  if (bySlug && bySlug.id !== excludeId) return true;

  const { data: byId } = await admin
    .from('companies')
    .select('id')
    .eq('id', slug)
    .maybeSingle();
  if (byId && byId.id !== excludeId) return true;

  return false;
}

async function main() {
  console.log(
    `Active DBA name cleanup (${dryRun ? 'DRY RUN' : 'LIVE'}${
      updateSlugs ? ', update-slugs' : ''
    }${aggressive ? ', AGGRESSIVE' : ''})…`
  );

  let companies = await fetchActiveCompanies();
  companies = companies.filter((c) => c.out_of_service !== true);
  if (limit > 0) companies = companies.slice(0, limit);
  console.log(`Loaded ${companies.length} active companies`);

  // Frequency of distinct DBAs among candidates (detect shared parent brands)
  const dbaFreq = new Map();
  for (const row of companies) {
    const dba = extractDba(row.fmcsa_raw);
    if (!dba) continue;
    const key = normalizeCompanyNameKey(dba);
    dbaFreq.set(key, (dbaFreq.get(key) || 0) + 1);
  }

  const changes = [];
  const skipped = [];
  let updated = 0;
  let skippedNoDba = 0;
  let errors = 0;

  for (const row of companies) {
    const dbaRaw = extractDba(row.fmcsa_raw);
    const legalRaw =
      stringOrNull(row.fmcsa_legal_name) || extractLegal(row.fmcsa_raw) || null;

    if (!dbaRaw) {
      skippedNoDba++;
      continue;
    }

    const sharedDbaCount = dbaFreq.get(normalizeCompanyNameKey(dbaRaw)) || 1;
    const decision = shouldReplaceWithDba({
      current: row.name,
      dba: dbaRaw,
      legal: legalRaw,
      sharedDbaCount,
    });

    if (!decision.ok) {
      skipped.push({
        slug: row.slug,
        name: row.name,
        dba: formatFmcsaDisplayName(dbaRaw),
        reason: decision.reason,
      });
      continue;
    }

    const newPublicName = formatFmcsaDisplayName(dbaRaw);
    if (!newPublicName) continue;
    if (normalizeCompanyNameKey(newPublicName) === normalizeCompanyNameKey(row.name || '')) {
      skipped.push({
        slug: row.slug,
        name: row.name,
        dba: newPublicName,
        reason: 'same-after-format',
      });
      continue;
    }

    const patch = {
      name: newPublicName,
      last_updated: new Date().toISOString().slice(0, 10),
    };

    if (legalRaw && !stringOrNull(row.fmcsa_legal_name)) {
      patch.fmcsa_legal_name = formatFmcsaDisplayName(legalRaw);
    }

    let newSlug = null;
    const oldSlug = row.slug;
    if (updateSlugs) {
      const candidate = slugifyCompanyName(newPublicName);
      if (
        candidate &&
        candidate !== row.slug &&
        candidate !== 'company' &&
        !(await slugTaken(candidate, row.id))
      ) {
        newSlug = candidate;
        patch.slug = candidate;
      }
    }

    const change = {
      id: row.id,
      oldSlug,
      newSlug: newSlug || oldSlug,
      oldName: row.name,
      newName: newPublicName,
      legal: legalRaw ? formatFmcsaDisplayName(legalRaw) : null,
      usdot: row.usdot_number,
      reason: decision.reason,
      sharedDbaCount,
    };
    changes.push(change);

    if (dryRun) {
      updated++;
      console.log(
        `  [dry] ${oldSlug}: "${row.name}" → "${newPublicName}" (${decision.reason})`
      );
      continue;
    }

    const { error } = await admin.from('companies').update(patch).eq('id', row.id);
    if (error) {
      console.error(`  FAIL ${oldSlug}: ${error.message}`);
      errors++;
    } else {
      updated++;
      console.log(
        `  ✓ ${oldSlug}: "${row.name}" → "${newPublicName}" (${decision.reason})${
          newSlug ? ` [slug→${newSlug}; id kept]` : ''
        }`
      );
    }
  }

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outPath = resolve(outDir, `active-dba-cleanup-${stamp}.json`);
  writeFileSync(
    outPath,
    JSON.stringify(
      {
        dryRun,
        updateSlugs,
        aggressive,
        scanned: companies.length,
        updated,
        skippedNoDba,
        skippedGuarded: skipped.length,
        errors,
        changes,
        skippedSample: skipped.slice(0, 80),
      },
      null,
      2
    )
  );

  console.log('\n========== CLEANUP LOG ==========');
  console.log(`Active companies scanned: ${companies.length}`);
  console.log(`Updated (DBA applied):    ${updated}`);
  console.log(`Skipped (no DBA):         ${skippedNoDba}`);
  console.log(`Skipped (quality guard):  ${skipped.length}`);
  console.log(`Errors:                   ${errors}`);
  console.log(`Report:                   ${outPath}`);
  if (changes.length) {
    console.log('\nAll changes (old → DBA):');
    for (const c of changes) {
      console.log(
        `  - ${c.oldName} → ${c.newName}${c.legal ? `  [legal: ${c.legal}]` : ''}  (${c.reason})`
      );
    }
  }
  if (skipped.length) {
    console.log('\nGuarded skips (first 20):');
    for (const s of skipped.slice(0, 20)) {
      console.log(`  · ${s.name}  (would be "${s.dba}") — ${s.reason}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
