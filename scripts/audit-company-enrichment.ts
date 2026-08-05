/**
 * Production enrichment audit + optional re-enrich for Google Places.
 *
 * Usage (from move-trust-hub-temp, with .env.local):
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/audit-company-enrichment.ts
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/audit-company-enrichment.ts --slug=cirta-moving-llc
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/audit-company-enrichment.ts --sample=200
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/audit-company-enrichment.ts --reenrich --slug=cirta-moving-llc --dry-run
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/audit-company-enrichment.ts --reenrich --slugs=cirta-moving-llc,cass-county-moving,amex-moving-and-storage-llc
 *
 * Does NOT overwrite FMCSA identity fields. Google persist never replaces a usable
 * snapshot with a failed fetch (see persistGoogleSnapshot).
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import {
  fetchGooglePlacesData,
  isGooglePlacesConfigured,
  isUsableGoogleSnapshot,
} from '../lib/verification/google-places';
import {
  parseGoogleData,
  parsePublicScrapeData,
  parseVerificationSources,
} from '../lib/verification/backfill-helpers';
import { hasBbbPublicScrapeData } from '../lib/verification/bbb-public-display';
import { persistGoogleSnapshot } from '../lib/verification/persist-google-snapshot';

function loadEnv() {
  for (const file of ['.env.local', '.env.production.local', '.env']) {
    const p = join(process.cwd(), file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
      if (!line || line.startsWith('#') || !line.includes('=')) continue;
      const i = line.indexOf('=');
      let k = line.slice(0, i).trim();
      let v = line.slice(i + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (!process.env[k]) process.env[k] = v;
    }
  }
}
loadEnv();

function arg(name: string): string | undefined {
  const pref = `${name}=`;
  const hit = process.argv.find((a) => a.startsWith(pref));
  if (hit) return hit.slice(pref.length);
  const idx = process.argv.indexOf(name);
  if (idx >= 0 && process.argv[idx + 1] && !process.argv[idx + 1]!.startsWith('--')) {
    return process.argv[idx + 1];
  }
  return undefined;
}

const dryRun = process.argv.includes('--dry-run');
const doReenrich = process.argv.includes('--reenrich');
const sampleN = Math.max(10, Number.parseInt(arg('--sample') ?? '200', 10));
const onlySlug = arg('--slug');
const slugsArg = arg('--slugs');

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    console.error('Need NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  const admin = createClient(url, key, { auth: { persistSession: false } });

  const focusSlugs =
    slugsArg?.split(',').map((s) => s.trim()).filter(Boolean) ??
    (onlySlug
      ? [onlySlug]
      : ['cirta-moving-llc', 'cass-county-moving', 'amex-moving-and-storage-llc']);

  console.log('\n=== Focus companies ===\n');
  const { data: focus, error: fe } = await admin
    .from('companies')
    .select(
      'id, slug, name, overall_rating, review_count, reputation_score, bbb_rating, bbb_accredited, fmcsa_safety_rating, usdot_number, verification_sources, google_data, public_scrape_data, fmcsa_raw'
    )
    .in('slug', focusSlugs);

  if (fe) {
    console.error(fe);
    process.exit(1);
  }

  for (const r of focus ?? []) {
    const vs = parseVerificationSources(r.verification_sources);
    const g = parseGoogleData(vs.google) ?? parseGoogleData(r.google_data);
    const scrape =
      parsePublicScrapeData(vs.public_scrape) ?? parsePublicScrapeData(r.public_scrape_data);
    const raw = r.fmcsa_raw as Record<string, unknown> | null;
    const safetyRaw =
      (raw?.safetyRating as string) ||
      (raw && typeof raw.carrier === 'object'
        ? ((raw.carrier as Record<string, unknown>).safetyRating as string)
        : null);

    console.log(
      JSON.stringify(
        {
          slug: r.slug,
          overall_rating: r.overall_rating,
          review_count: r.review_count,
          reputation_score: r.reputation_score,
          bbb_rating: r.bbb_rating,
          bbb_accredited: r.bbb_accredited,
          fmcsa_safety_rating: r.fmcsa_safety_rating,
          fmcsa_raw_safety: safetyRaw ?? null,
          usdot: r.usdot_number,
          google: g
            ? {
                status: g.status,
                rating: g.rating,
                review_count: g.review_count,
                place_id: g.place_id ? 'set' : null,
                last_fetched: g.last_fetched,
              }
            : null,
          bbb_scrape_confirmed: hasBbbPublicScrapeData(scrape),
          vs_keys: Object.keys(vs),
        },
        null,
        2
      )
    );
  }

  console.log('\n=== Sample stats (active / not OOS) ===\n');
  const { data: sample } = await admin
    .from('companies')
    .select(
      'slug, overall_rating, review_count, bbb_rating, verification_sources, google_data, public_scrape_data, out_of_service'
    )
    .or('out_of_service.is.null,out_of_service.eq.false')
    .limit(sampleN);

  let googleOk = 0;
  let googleMissing = 0;
  let ratingNoGoogle = 0;
  let bbbCol = 0;
  let bbbConfirmed = 0;
  const n = (sample ?? []).length || 1;
  for (const r of sample ?? []) {
    const vs = parseVerificationSources(r.verification_sources);
    const g = parseGoogleData(vs.google) ?? parseGoogleData(r.google_data);
    if (isUsableGoogleSnapshot(g)) googleOk++;
    else googleMissing++;
    if ((Number(r.overall_rating) || 0) > 0 && !isUsableGoogleSnapshot(g)) ratingNoGoogle++;
    if (r.bbb_rating && r.bbb_rating !== 'NR') bbbCol++;
    const scrape =
      parsePublicScrapeData(vs.public_scrape) ?? parsePublicScrapeData(r.public_scrape_data);
    if (hasBbbPublicScrapeData(scrape)) bbbConfirmed++;
  }

  console.log(
    JSON.stringify(
      {
        sampleSize: (sample ?? []).length,
        googleOkPct: Math.round((100 * googleOk) / n),
        googleMissingPct: Math.round((100 * googleMissing) / n),
        ratingWithoutGoogleSnapshotPct: Math.round((100 * ratingNoGoogle) / n),
        bbbColumnNonNRPct: Math.round((100 * bbbCol) / n),
        bbbConfirmedScrapePct: Math.round((100 * bbbConfirmed) / n),
      },
      null,
      2
    )
  );

  if (!doReenrich) {
    console.log('\n(pass --reenrich to fetch Places for focus slugs; add --dry-run to preview)\n');
    return;
  }

  if (!isGooglePlacesConfigured()) {
    console.error('GOOGLE_PLACES_API_KEY required for --reenrich');
    process.exit(1);
  }

  console.log(`\n=== Re-enrich Google (${dryRun ? 'DRY RUN' : 'WRITE'}) ===\n`);
  for (const r of focus ?? []) {
    const existing =
      parseGoogleData(parseVerificationSources(r.verification_sources).google) ??
      parseGoogleData(r.google_data);
    if (isUsableGoogleSnapshot(existing) && !process.argv.includes('--force')) {
      console.log(`skip ${r.slug} — already has usable Google snapshot`);
      continue;
    }
    const google = await fetchGooglePlacesData({
      name: r.name,
      headquarters: (r as { headquarters?: string }).headquarters ?? null,
      usdotNumber: r.usdot_number,
    });
    console.log(r.slug, google.status, google.rating, google.review_count, google.place_id);
    if (dryRun) continue;
    const res = await persistGoogleSnapshot(admin as never, r.id, google, {
      existingRow: r as never,
    });
    console.log('  persist', res.ok, res.applied, res.error ?? '');
    await new Promise((r) => setTimeout(r, 400));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
