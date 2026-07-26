/**
 * Backfill Google Places + BBB for Local Movers missing enrichment.
 *
 * Onboarding often left overall_rating empty OR only seed defaults with no
 * verification_sources.google / BBB — this repairs Class A (hydrate) and
 * Class B (external Places + BBB) for the full local-mover population.
 *
 *   npm run enrich:local-movers
 *   npm run enrich:local-movers -- --confirm --limit=400
 *   npm run enrich:local-movers -- --confirm --limit=100 --offset=100
 *   npm run enrich:local-movers -- --confirm --force --limit=50
 *
 * Policy:
 *  - Local movers only (intrastate / Local Mover service / isLocalMover heuristics)
 *  - Never invent ratings; only write real Places/BBB payloads
 *  - Rate-limited; resumable via --offset
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { isLocalMover } from '../lib/companies/is-local-mover';
import {
  parseGoogleData,
  parsePublicScrapeData,
  parseVerificationSources,
  type VerificationSources,
} from '../lib/verification/backfill-helpers';
import {
  fetchGooglePlacesData,
  isGooglePlacesConfigured,
  isUsableGoogleSnapshot,
  mergeGoogleSnapshots,
} from '../lib/verification/google-places';
import { fetchBbbPublicScrape } from '../lib/verification/bbb-public-scrape';
import type { GooglePlacesData, PublicScrapeData } from '../lib/verification/types';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import {
  resolveGoogleDataFromRow,
  resolvePublicScrapeFromRow,
} from '../lib/verification/resolve-company-row';

loadEnvLocal();

const confirm = process.argv.includes('--confirm');
const force = process.argv.includes('--force');
const limit = Math.max(
  1,
  Number.parseInt(
    process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? (confirm ? '400' : '50'),
    10
  )
);
const offset = Math.max(
  0,
  Number.parseInt(process.argv.find((a) => a.startsWith('--offset='))?.split('=')[1] ?? '0', 10)
);
const delayMs = Math.max(
  300,
  Number.parseInt(
    process.argv.find((a) => a.startsWith('--delay-ms='))?.split('=')[1] ?? '650',
    10
  )
);
const onlySlug = (() => {
  const hit = process.argv.find((a) => a.startsWith('--slug='));
  if (hit) return hit.slice('--slug='.length).trim().toLowerCase();
  return null;
})();

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

type ClassCode = 'A' | 'B' | 'C';

type LocalRow = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  phone: string | null;
  website: string | null;
  usdot_number: string | null;
  mc_number?: string | null;
  fmcsa_legal_name?: string | null;
  service_scope?: string | null;
  overall_rating: number | null;
  review_count: number | null;
  bbb_rating: string | null;
  bbb_accredited: boolean | null;
  google_data?: unknown;
  public_scrape_data?: unknown;
  verification_sources: unknown;
  last_updated: string | null;
  services?: string[] | null;
  out_of_service?: boolean | null;
};

function hasUsableGoogle(row: LocalRow): boolean {
  return isUsableGoogleSnapshot(
    resolveGoogleDataFromRow(row as unknown as Record<string, unknown>)
  );
}

function hasUsableBbb(row: LocalRow): boolean {
  if (row.bbb_rating && row.bbb_rating !== 'NR' && String(row.bbb_rating).trim()) {
    return true;
  }
  const scrape = resolvePublicScrapeFromRow(row as unknown as Record<string, unknown>);
  return Boolean(scrape?.bbb_rating && scrape.bbb_rating !== 'NR');
}

function displayRating(row: LocalRow): number {
  const db = Number(row.overall_rating) || 0;
  if (db > 0) return db;
  const g = resolveGoogleDataFromRow(row as unknown as Record<string, unknown>);
  if (g?.status === 'ok' && g.rating && g.rating > 0) return g.rating;
  return 0;
}

/**
 * A = Places/BBB stored but columns empty (hydrate only)
 * B = missing Google and/or BBB — needs external enrich
 * C = both Google + BBB present (skip unless --force)
 */
function classify(row: LocalRow): ClassCode {
  const googleOk = hasUsableGoogle(row);
  const bbbOk = hasUsableBbb(row);
  const rating = displayRating(row);

  if (googleOk && bbbOk && !force) return 'C';
  if (rating <= 0 && (googleOk || bbbOk)) return 'A';
  if (!googleOk || !bbbOk || force) return 'B';
  return 'C';
}

function isLocalRow(row: LocalRow): boolean {
  if (row.out_of_service === true) return false;
  return isLocalMover({
    serviceScope: row.service_scope,
    services: row.services,
    usdotNumber: row.usdot_number,
    mcNumber: row.mc_number,
  });
}

async function loadAllLocalMovers(admin: SupabaseClient): Promise<LocalRow[]> {
  const selectAttempts = [
    'id, slug, name, headquarters, phone, website, usdot_number, mc_number, fmcsa_legal_name, service_scope, overall_rating, review_count, bbb_rating, bbb_accredited, google_data, public_scrape_data, verification_sources, last_updated, services, out_of_service',
    'id, slug, name, headquarters, phone, website, usdot_number, mc_number, fmcsa_legal_name, service_scope, overall_rating, review_count, bbb_rating, bbb_accredited, verification_sources, last_updated, services',
    'id, slug, name, headquarters, phone, website, usdot_number, overall_rating, review_count, bbb_rating, bbb_accredited, verification_sources, last_updated, services',
    'id, slug, name, headquarters, phone, website, usdot_number, overall_rating, review_count, bbb_rating, bbb_accredited, verification_sources, last_updated',
  ];

  const all: LocalRow[] = [];
  let selectCols = selectAttempts[0]!;

  // Probe which select works
  for (const cols of selectAttempts) {
    const probe = await admin.from('companies').select(cols).limit(1);
    if (!probe.error) {
      selectCols = cols;
      break;
    }
  }

  for (let from = 0; ; from += 500) {
    let q = admin.from('companies').select(selectCols).range(from, from + 499);
    // Prefer intrastate when column exists
    if (selectCols.includes('service_scope')) {
      // Load broader set and filter client-side so we also catch mis-tagged locals
      // (some onboarded locals may lack service_scope)
    }
    const { data, error } = await q;
    if (error) {
      console.warn(`  load page ${from}: ${error.message}`);
      break;
    }
    if (!data?.length) break;
    for (const raw of data as LocalRow[]) {
      if (onlySlug && raw.slug !== onlySlug) continue;
      if (isLocalRow(raw)) all.push(raw);
    }
    if (data.length < 500) break;
  }

  // If service_scope filter path returned nothing but we have onlySlug, try direct fetch
  if (!all.length && onlySlug) {
    const { data } = await admin.from('companies').select(selectCols).eq('slug', onlySlug).maybeSingle();
    if (data) all.push(data as LocalRow);
  }

  return all;
}

async function safeUpdate(
  admin: SupabaseClient,
  id: string,
  patch: Record<string, unknown>
): Promise<{ ok: boolean; error?: string }> {
  const attempts = [
    { ...patch },
    (() => {
      const p = { ...patch };
      delete p.google_data;
      delete p.public_scrape_data;
      delete p.verification_last_synced_at;
      return p;
    })(),
    (() => {
      const p: Record<string, unknown> = {
        verification_sources: patch.verification_sources,
        last_updated: patch.last_updated,
      };
      if (patch.overall_rating != null) p.overall_rating = patch.overall_rating;
      if (patch.review_count != null) p.review_count = patch.review_count;
      if (patch.bbb_rating != null) p.bbb_rating = patch.bbb_rating;
      if (patch.bbb_accredited != null) p.bbb_accredited = patch.bbb_accredited;
      if (patch.phone) p.phone = patch.phone;
      if (patch.website) p.website = patch.website;
      return p;
    })(),
  ];

  let lastErr = '';
  for (const p of attempts) {
    const { error } = await admin.from('companies').update(p).eq('id', id);
    if (!error) return { ok: true };
    lastErr = error.message;
  }
  return { ok: false, error: lastErr };
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key || key.startsWith('<') || key.length < 40) {
    console.error(
      'Missing real Supabase credentials.\n' +
        'Set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.\n' +
        'Also set GOOGLE_PLACES_API_KEY for Places enrichment.'
    );
    process.exit(1);
  }

  const admin = createClient(url, key, { auth: { persistSession: false } });
  console.log('── Local Mover enrichment (Google + BBB) ──');
  console.log(`Mode: ${confirm ? 'LIVE WRITE' : 'AUDIT ONLY (pass --confirm to write)'}`);
  console.log(`Google Places: ${isGooglePlacesConfigured() ? 'configured' : 'MISSING'}`);
  console.log(`Limit: ${limit}  offset: ${offset}${force ? '  force=true' : ''}`);
  if (onlySlug) console.log(`Slug filter: ${onlySlug}`);
  console.log('');

  const all = await loadAllLocalMovers(admin);
  const classified = all.map((row) => ({
    row,
    class: classify(row),
    rating: displayRating(row),
    googleOk: hasUsableGoogle(row),
    bbbOk: hasUsableBbb(row),
  }));

  const counts = { A: 0, B: 0, C: 0 };
  for (const c of classified) counts[c.class]++;

  const missingGoogle = classified.filter((c) => !c.googleOk).length;
  const missingBbb = classified.filter((c) => !c.bbbOk).length;
  const missingBoth = classified.filter((c) => !c.googleOk && !c.bbbOk).length;

  console.log(`Local movers found: ${all.length}`);
  console.log(`  Missing usable Google snapshot: ${missingGoogle}`);
  console.log(`  Missing BBB grade: ${missingBbb}`);
  console.log(`  Missing both Google + BBB: ${missingBoth}`);
  console.log(`Class A (hydrate display from stored enrichment): ${counts.A}`);
  console.log(`Class B (needs external Google and/or BBB): ${counts.B}`);
  console.log(`Class C (complete — skip unless --force): ${counts.C}`);
  console.log('');

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const auditPath = resolve(outDir, 'local-mover-enrichment-audit.json');
  writeFileSync(
    auditPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalLocal: all.length,
        missingGoogle,
        missingBbb,
        missingBoth,
        counts,
        needsWork: classified
          .filter((c) => c.class !== 'C')
          .map((c) => ({
            slug: c.row.slug,
            name: c.row.name,
            class: c.class,
            overall_rating: c.row.overall_rating,
            googleOk: c.googleOk,
            bbbOk: c.bbbOk,
            headquarters: c.row.headquarters,
          })),
      },
      null,
      2
    )
  );
  console.log(`Audit: ${auditPath}`);

  if (!confirm) {
    console.log('\nAudit only. Re-run with --confirm --limit=400 to backfill.');
    return;
  }

  // ── Class A: hydrate overall_rating from stored Google ──
  const classA = classified.filter((c) => c.class === 'A');
  let repairedA = 0;
  if (classA.length) {
    console.log(`\nRepairing Class A (${classA.length})…`);
    for (const item of classA) {
      const g = resolveGoogleDataFromRow(item.row as unknown as Record<string, unknown>);
      const scrape = resolvePublicScrapeFromRow(item.row as unknown as Record<string, unknown>);
      if (!isUsableGoogleSnapshot(g) && !scrape?.bbb_rating) continue;

      const sources: VerificationSources = {
        ...parseVerificationSources(item.row.verification_sources),
        ...(g ? { google: g } : {}),
        ...(scrape ? { public_scrape: scrape } : {}),
      };
      const patch: Record<string, unknown> = {
        verification_sources: sources,
        last_updated: new Date().toISOString().slice(0, 10),
        verification_last_synced_at: new Date().toISOString(),
      };
      if (g?.rating && g.rating > 0) {
        patch.overall_rating = g.rating;
        patch.review_count = g.review_count ?? item.row.review_count ?? 0;
      }
      if (scrape?.bbb_rating) {
        patch.bbb_rating = scrape.bbb_rating;
        patch.bbb_accredited = scrape.bbb_accredited ?? false;
      }
      const res = await safeUpdate(admin, item.row.id, patch);
      if (res.ok) {
        repairedA++;
        console.log(`  repaired ${item.row.slug}`);
      } else {
        console.log(`  FAIL ${item.row.slug}: ${res.error}`);
      }
    }
  }

  // ── Class B: external Places + BBB ──
  const classB = classified.filter((c) => c.class === 'B');
  const queue = classB.slice(offset, offset + limit);
  console.log(
    `\nClass B queue: ${queue.length} (offset=${offset}, limit=${limit}, pool=${classB.length})`
  );

  if (!isGooglePlacesConfigured()) {
    console.warn('GOOGLE_PLACES_API_KEY missing — will still attempt BBB only.');
  }

  let updated = 0;
  let googleOkCount = 0;
  let bbbOkCount = 0;
  let noGoogle = 0;
  let errors = 0;
  const failures: Array<{ slug: string; error: string }> = [];

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i]!;
    const row = item.row;
    console.log(`\n[${i + 1}/${queue.length}] ${row.slug} — ${row.name}`);
    await sleep(delayMs);

    try {
      const existingGoogle = resolveGoogleDataFromRow(
        row as unknown as Record<string, unknown>
      );
      let google: GooglePlacesData | null = isUsableGoogleSnapshot(existingGoogle)
        ? existingGoogle
        : null;

      if (isGooglePlacesConfigured() && (force || !google)) {
        const fmcsaLegal = row.fmcsa_legal_name?.trim();
        const googleIncoming = await fetchGooglePlacesData({
          legalName: fmcsaLegal || row.name,
          dbaName:
            fmcsaLegal && row.name && row.name !== fmcsaLegal ? row.name : null,
          headquarters: row.headquarters,
          phone: row.phone,
          businessCategory: 'moving company movers',
        });
        const merged = mergeGoogleSnapshots(existingGoogle, googleIncoming);
        if (isUsableGoogleSnapshot(googleIncoming) || isUsableGoogleSnapshot(merged)) {
          google = isUsableGoogleSnapshot(googleIncoming) ? googleIncoming : merged;
          googleOkCount++;
          console.log(
            `  google: ok ${google!.rating}★ / ${google!.review_count} reviews`
          );
        } else {
          noGoogle++;
          console.log(
            `  google: ${googleIncoming.status}${
              googleIncoming.error ? ` (${googleIncoming.error.slice(0, 70)})` : ''
            }`
          );
        }
      } else if (google) {
        console.log(`  google: keep existing ${google.rating}★ / ${google.review_count}`);
      }

      await sleep(Math.min(delayMs, 450));
      let scrape: PublicScrapeData | null = resolvePublicScrapeFromRow(
        row as unknown as Record<string, unknown>
      );
      const needsBbb = force || !hasUsableBbb(row);
      if (needsBbb) {
        try {
          const hq = row.headquarters || '';
          const parts = hq.split(',').map((s) => s.trim());
          const statePart =
            parts.length > 1
              ? parts[parts.length - 1]?.replace(/\d+/g, '').trim()
              : undefined;
          const bbbHit = await fetchBbbPublicScrape({
            companyName: row.name,
            city: parts[0] || undefined,
            state: statePart,
            headquarters: hq,
            usdotNumber: row.usdot_number?.replace(/\D/g, '') || undefined,
          });
          if (bbbHit.listed && bbbHit.meta.status === 'ok') {
            scrape = {
              bbb_rating: bbbHit.bbb_rating,
              bbb_review_count: bbbHit.bbb_review_count,
              bbb_accredited: bbbHit.bbb_accredited,
              bbb_details: bbbHit.bbb_details,
              bbb_accreditation_status: bbbHit.bbb_accreditation_status,
              bbb_file_opened: bbbHit.bbb_file_opened,
              bbb_accredited_since: bbbHit.bbb_accredited_since,
              bbb_profile_url: bbbHit.bbb_profile_url,
              bbb_recent_reviews: bbbHit.bbb_recent_reviews,
              trustpilot_rating: null,
              trustpilot_review_count: null,
              yelp_rating: null,
              yelp_review_count: null,
              last_scraped_at: new Date().toISOString(),
              sources: { bbb: bbbHit.meta },
            };
            bbbOkCount++;
            console.log(
              `  bbb: ok grade=${scrape.bbb_rating ?? '—'} accredited=${scrape.bbb_accredited ?? '—'}`
            );
          } else {
            console.log(`  bbb: ${bbbHit.meta.status}`);
          }
        } catch (err) {
          console.log(`  bbb: error ${err instanceof Error ? err.message : String(err)}`);
        }
      } else {
        console.log(`  bbb: keep existing ${row.bbb_rating}`);
      }

      if (!google && !scrape?.bbb_rating) {
        console.log('  skip save (no Google + no BBB)');
        continue;
      }

      const sources: VerificationSources = {
        ...parseVerificationSources(row.verification_sources),
        ...(google ? { google } : {}),
        ...(scrape ? { public_scrape: scrape } : {}),
      };

      const oldRating = Number(row.overall_rating) || 0;
      const oldCount = Number(row.review_count) || 0;
      // Fill empty display rating from Google; do not clobber a higher existing rating
      // unless --force and Google is usable.
      let newRating = oldRating;
      let newCount = oldCount;
      if (google?.rating && google.rating > 0) {
        if (force || oldRating <= 0) {
          newRating = google.rating;
          newCount =
            google.review_count != null && google.review_count > 0
              ? google.review_count
              : oldCount;
        }
      }

      const patch: Record<string, unknown> = {
        verification_sources: sources,
        verification_last_synced_at: new Date().toISOString(),
        last_updated: new Date().toISOString().slice(0, 10),
      };
      if (newRating > 0) patch.overall_rating = newRating;
      if (newCount > 0) patch.review_count = newCount;
      if (scrape?.bbb_rating) {
        patch.bbb_rating = scrape.bbb_rating;
        patch.bbb_accredited = scrape.bbb_accredited ?? false;
      }
      if (google?.phone && !row.phone) patch.phone = google.phone;
      if (google?.website_url && !row.website) patch.website = google.website_url;
      if (google) patch.google_data = google;
      if (scrape) patch.public_scrape_data = scrape;

      const res = await safeUpdate(admin, row.id, patch);
      if (!res.ok) {
        errors++;
        failures.push({ slug: row.slug, error: res.error || 'update failed' });
        console.log(`  FAIL update: ${res.error}`);
        continue;
      }

      updated++;
      console.log(`  saved: rating ${oldRating}→${newRating} reviews ${oldCount}→${newCount}`);
    } catch (err) {
      errors++;
      const msg = err instanceof Error ? err.message : String(err);
      failures.push({ slug: row.slug, error: msg });
      console.log(`  ERROR: ${msg}`);
    }
  }

  const reportPath = resolve(outDir, 'local-mover-enrichment-report.json');
  writeFileSync(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalLocal: all.length,
        missingGoogle,
        missingBbb,
        missingBoth,
        classA: counts.A,
        classB: counts.B,
        classC: counts.C,
        repairedA,
        queueSize: queue.length,
        offset,
        limit,
        updated,
        googleOkCount,
        bbbOkCount,
        noGoogle,
        errors,
        failures: failures.slice(0, 50),
        nextOffset: offset + queue.length < classB.length ? offset + queue.length : null,
      },
      null,
      2
    )
  );

  console.log('\n── Summary ──');
  console.log(`Class A repaired: ${repairedA}`);
  console.log(`Class B saved: ${updated}`);
  console.log(`  Google matches this run: ${googleOkCount}`);
  console.log(`  BBB matches this run: ${bbbOkCount}`);
  console.log(`  No Google match: ${noGoogle}`);
  console.log(`Errors: ${errors}`);
  console.log(`Report: ${reportPath}`);
  if (offset + queue.length < classB.length) {
    console.log(
      `\nMore remaining. Next batch:\n  npm run enrich:local-movers -- --confirm --limit=${limit} --offset=${offset + queue.length}`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
