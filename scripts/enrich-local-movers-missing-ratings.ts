/**
 * Targeted re-enrichment for Local Mover companies missing Google/BBB display fields.
 *
 * Phases:
 *  1) Audit classes A/B/C/D (always)
 *  2) Re-enrich class B (and A with incomplete ratings) when --confirm
 *
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-local-movers-missing-ratings.ts
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-local-movers-missing-ratings.ts --confirm
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-local-movers-missing-ratings.ts --confirm --limit=25
 *
 * Safety: Local/intrastate only. Never fabricates ratings. Rate-limited.
 */
import { createClient } from '@supabase/supabase-js';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
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
import { resolveGoogleDataFromRow, resolvePublicScrapeFromRow } from '../lib/verification/resolve-company-row';

loadEnvLocal();

const confirm = process.argv.includes('--confirm');
const force = process.argv.includes('--force');
const limit = Math.max(
  1,
  Number.parseInt(
    process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? '50',
    10
  )
);
const delayMs = Math.max(
  300,
  Number.parseInt(
    process.argv.find((a) => a.startsWith('--delay-ms='))?.split('=')[1] ?? '700',
    10
  )
);

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

type ClassCode = 'A' | 'B' | 'C' | 'D';

type LocalRow = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  phone: string | null;
  website: string | null;
  usdot_number: string | null;
  service_scope: string | null;
  overall_rating: number | null;
  review_count: number | null;
  bbb_rating: string | null;
  bbb_accredited: boolean | null;
  google_data: unknown;
  public_scrape_data: unknown;
  verification_sources: unknown;
  last_updated: string | null;
  created_at?: string | null;
};

function hasUsableGoogle(row: LocalRow): boolean {
  const g = resolveGoogleDataFromRow(row as unknown as Record<string, unknown>);
  return isUsableGoogleSnapshot(g);
}

function displayRating(row: LocalRow): number {
  const db = Number(row.overall_rating) || 0;
  if (db > 0) return db;
  const g = resolveGoogleDataFromRow(row as unknown as Record<string, unknown>);
  if (g?.status === 'ok' && g.rating && g.rating > 0) return g.rating;
  return 0;
}

function classify(row: LocalRow): ClassCode {
  const rating = displayRating(row);
  const googleOk = hasUsableGoogle(row);
  const scrape = resolvePublicScrapeFromRow(row as unknown as Record<string, unknown>);
  const bbbOk = Boolean(scrape?.bbb_rating || (row.bbb_rating && row.bbb_rating !== 'NR'));

  // A: enrichment present (google snapshot or bbb) but display rating empty → mapping/hydrate issue
  if (rating <= 0 && (googleOk || bbbOk)) return 'A';
  // D: no enrichment, recently updated local — likely lost on save (heuristic)
  if (rating <= 0 && !googleOk && !bbbOk) {
    // Without created_at reliability, treat missing as B candidate for re-match
    return 'B';
  }
  // Has display rating already
  if (rating > 0) return 'C'; // "complete enough" — skip re-enrich unless --force
  return 'B';
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key || key.startsWith('<') || key.length < 40) {
    console.error(
      'Missing real Supabase credentials.\n' +
        'Set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local (not placeholders).\n' +
        'Also set GOOGLE_PLACES_API_KEY for re-enrichment of missing Places data.'
    );
    process.exit(1);
  }

  const admin = createClient(url, key, { auth: { persistSession: false } });
  console.log('── Local Mover enrichment audit + re-enrich ──');
  console.log(`Mode: ${confirm ? 'LIVE WRITE' : 'AUDIT ONLY (pass --confirm to write)'}`);
  console.log(`Google Places: ${isGooglePlacesConfigured() ? 'configured' : 'MISSING'}`);
  console.log(`Limit: ${limit}`);
  console.log('');

  const selectCols =
    'id, slug, name, headquarters, phone, website, usdot_number, service_scope, overall_rating, review_count, bbb_rating, bbb_accredited, google_data, public_scrape_data, verification_sources, last_updated';

  const all: LocalRow[] = [];
  for (let from = 0; ; from += 500) {
    const { data, error } = await admin
      .from('companies')
      .select(selectCols)
      .eq('service_scope', 'intrastate')
      .or('out_of_service.is.null,out_of_service.eq.false')
      .order('last_updated', { ascending: false })
      .range(from, from + 499);
    if (error) {
      // Fallback: service_scope filter might fail — pull and filter client-side
      if (error.message?.includes('service_scope') || error.code === '42703') {
        console.warn('service_scope column lag — loading all companies and filtering Local Mover services');
        break;
      }
      throw error;
    }
    if (!data?.length) break;
    all.push(...(data as LocalRow[]));
    if (data.length < 500) break;
  }

  if (!all.length) {
    // Fallback path without service_scope
    for (let from = 0; ; from += 500) {
      const { data, error } = await admin
        .from('companies')
        .select(selectCols + ', services')
        .or('out_of_service.is.null,out_of_service.eq.false')
        .order('last_updated', { ascending: false })
        .range(from, from + 499);
      if (error) throw error;
      if (!data?.length) break;
      for (const row of data as Array<LocalRow & { services?: string[] }>) {
        const services = Array.isArray(row.services) ? row.services : [];
        if (
          row.service_scope === 'intrastate' ||
          services.some((s) => /local\s*mover/i.test(String(s)))
        ) {
          all.push(row);
        }
      }
      if (data.length < 500) break;
    }
  }

  const classified = all.map((row) => ({
    row,
    class: force && displayRating(row) > 0 ? ('B' as ClassCode) : classify(row),
    rating: displayRating(row),
    googleOk: hasUsableGoogle(row),
  }));

  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const c of classified) counts[c.class]++;

  console.log(`Local movers found: ${all.length}`);
  console.log(`Class A (enrichment in DB, display missing): ${counts.A}`);
  console.log(`Class B (needs re-enrich / Google match): ${counts.B}`);
  console.log(`Class C (complete / leave blank): ${counts.C}`);
  console.log(`Class D (lost on save heuristic): ${counts.D}`);
  console.log('');

  const auditPath = resolve(process.cwd(), 'scripts/output/local-mover-enrichment-audit.json');
  mkdirSync(resolve(process.cwd(), 'scripts/output'), { recursive: true });
  writeFileSync(
    auditPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        counts,
        sample: classified.slice(0, 100).map((c) => ({
          slug: c.row.slug,
          name: c.row.name,
          class: c.class,
          overall_rating: c.row.overall_rating,
          review_count: c.row.review_count,
          displayRating: c.rating,
          googleOk: c.googleOk,
          bbb_rating: c.row.bbb_rating,
          last_updated: c.row.last_updated,
        })),
      },
      null,
      2
    )
  );
  console.log(`Audit written: ${auditPath}`);

  // Class A: repair display columns from existing google snapshot (no external API)
  const classA = classified.filter((c) => c.class === 'A');
  let repairedA = 0;
  if (confirm && classA.length) {
    console.log(`\nRepairing Class A display fields from stored Google snapshots (${classA.length})…`);
    for (const item of classA) {
      const g = resolveGoogleDataFromRow(item.row as unknown as Record<string, unknown>);
      if (!isUsableGoogleSnapshot(g)) continue;
      const scrape = resolvePublicScrapeFromRow(
        item.row as unknown as Record<string, unknown>
      );
      const patch: Record<string, unknown> = {
        overall_rating: g!.rating,
        review_count: g!.review_count ?? item.row.review_count ?? 0,
        last_updated: new Date().toISOString().slice(0, 10),
      };
      if (scrape?.bbb_rating) {
        patch.bbb_rating = scrape.bbb_rating;
        patch.bbb_accredited = scrape.bbb_accredited ?? false;
      }
      // Ensure verification_sources.google present
      const sources = parseVerificationSources(item.row.verification_sources);
      sources.google = g!;
      if (scrape) sources.public_scrape = scrape;
      patch.verification_sources = sources;
      patch.verification_last_synced_at = new Date().toISOString();

      const { error } = await admin
        .from('companies')
        .update(patch)
        .eq('id', item.row.id);
      if (error) {
        console.log(`  FAIL ${item.row.slug}: ${error.message}`);
      } else {
        repairedA++;
        console.log(
          `  repaired ${item.row.slug}: rating ${item.row.overall_rating ?? 0} → ${g!.rating} (${g!.review_count ?? 0} reviews)`
        );
      }
    }
  }

  // Class B: external re-enrich
  const classB = classified.filter((c) => c.class === 'B' || (force && c.class === 'C'));
  const queue = classB.slice(0, limit);
  console.log(`\nClass B queue (limit ${limit}): ${queue.length}`);

  if (!confirm) {
    console.log('Audit only. Re-run with --confirm to repair A + re-enrich B.');
    return;
  }

  if (!isGooglePlacesConfigured()) {
    console.warn('GOOGLE_PLACES_API_KEY missing — skipping Class B external Places enrichment.');
    console.log(`Class A repaired: ${repairedA}`);
    return;
  }

  let updated = 0;
  let noMatch = 0;
  let errors = 0;

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i]!;
    const row = item.row;
    console.log(`\n[${i + 1}/${queue.length}] ${row.slug} — ${row.name}`);
    await sleep(delayMs);

    try {
      const existingGoogle = resolveGoogleDataFromRow(
        row as unknown as Record<string, unknown>
      );
      const googleIncoming = await fetchGooglePlacesData({
        legalName: row.name,
        headquarters: row.headquarters,
      });
      const googleMerged = mergeGoogleSnapshots(existingGoogle, googleIncoming);

      if (!isUsableGoogleSnapshot(googleIncoming) && !isUsableGoogleSnapshot(existingGoogle)) {
        noMatch++;
        console.log(
          `  google: ${googleIncoming.status}${googleIncoming.error ? ` (${googleIncoming.error.slice(0, 60)})` : ''}`
        );
        // Still try BBB public scrape
      } else {
        console.log(
          `  google: ok rating=${googleMerged?.rating} reviews=${googleMerged?.review_count}`
        );
      }

      await sleep(Math.min(delayMs, 500));
      let scrape: PublicScrapeData | null = resolvePublicScrapeFromRow(
        row as unknown as Record<string, unknown>
      );
      try {
        const hq = row.headquarters || '';
        const parts = hq.split(',').map((s) => s.trim());
        const bbbHit = await fetchBbbPublicScrape({
          companyName: row.name,
          city: parts[0],
          state: parts.length > 1 ? parts[parts.length - 1] : undefined,
          headquarters: hq,
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
          console.log(
            `  bbb: ok grade=${scrape.bbb_rating ?? '—'} accredited=${scrape.bbb_accredited ?? '—'}`
          );
        } else {
          console.log(`  bbb: ${bbbHit.meta.status}`);
        }
      } catch (err) {
        console.log(`  bbb: error ${err instanceof Error ? err.message : String(err)}`);
      }

      const google = isUsableGoogleSnapshot(googleMerged) ? googleMerged : null;
      if (!google && !scrape?.bbb_rating) {
        continue;
      }

      const sources: VerificationSources = {
        ...parseVerificationSources(row.verification_sources),
        ...(google ? { google } : {}),
        ...(scrape ? { public_scrape: scrape } : {}),
      };

      const oldRating = Number(row.overall_rating) || 0;
      const oldCount = Number(row.review_count) || 0;
      const newRating = google?.rating && google.rating > 0 ? google.rating : oldRating;
      const newCount =
        google?.review_count != null && google.review_count > 0
          ? google.review_count
          : oldCount;

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
      // Best-effort legacy columns
      if (google) patch.google_data = google;
      if (scrape) patch.public_scrape_data = scrape;

      const { error } = await admin.from('companies').update(patch).eq('id', row.id);
      if (error) {
        // Retry without legacy columns
        delete patch.google_data;
        delete patch.public_scrape_data;
        const retry = await admin.from('companies').update(patch).eq('id', row.id);
        if (retry.error) {
          errors++;
          console.log(`  FAIL update: ${retry.error.message}`);
          continue;
        }
      }

      updated++;
      console.log(
        `  saved: rating ${oldRating}→${newRating} reviews ${oldCount}→${newCount}`
      );
    } catch (err) {
      errors++;
      console.log(`  ERROR: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log('\n── Summary ──');
  console.log(`Class A repaired: ${repairedA}`);
  console.log(`Class B updated: ${updated}`);
  console.log(`Class B no match: ${noMatch}`);
  console.log(`Errors: ${errors}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
