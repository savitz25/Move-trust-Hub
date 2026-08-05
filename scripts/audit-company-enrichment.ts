/**
 * Audit Google Places + confirmed BBB coverage on public.companies.
 *
 * Usage:
 *   npx tsx scripts/audit-company-enrichment.ts
 *   npx tsx scripts/audit-company-enrichment.ts --limit=50
 *   npx tsx scripts/audit-company-enrichment.ts --slugs=spyder-moving-kalamazoo,jk-moving-services
 *
 * Env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)
 *   GOOGLE_PLACES_API_KEY (reported only; not required for audit)
 */
import { createClient } from '@supabase/supabase-js';
import {
  parseGoogleData,
  parsePublicScrapeData,
  parseVerificationSources,
} from '../lib/verification/backfill-helpers';
import { hasBbbPublicScrapeData } from '../lib/verification/bbb-public-display';
import { isDisplayableGooglePlacesRating } from '../lib/verification/google-places';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

function argValue(name: string): string | undefined {
  const pref = `${name}=`;
  const hit = process.argv.find((a) => a.startsWith(pref));
  if (hit) return hit.slice(pref.length);
  const idx = process.argv.indexOf(name);
  if (idx >= 0 && process.argv[idx + 1] && !process.argv[idx + 1]!.startsWith('--')) {
    return process.argv[idx + 1];
  }
  return undefined;
}

function googleFromRow(row: {
  verification_sources?: unknown;
  google_data?: unknown;
}) {
  const vs = parseVerificationSources(row.verification_sources);
  return parseGoogleData(row.google_data) ?? parseGoogleData(vs.google);
}

function scrapeFromRow(row: {
  verification_sources?: unknown;
  public_scrape_data?: unknown;
}) {
  const direct = parsePublicScrapeData(row.public_scrape_data);
  if (direct) return direct;
  const vs = parseVerificationSources(row.verification_sources);
  return parsePublicScrapeData(vs.public_scrape);
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  console.log(
    JSON.stringify(
      {
        hasUrl: Boolean(url),
        hasKey: Boolean(key),
        hasPlacesKey: Boolean(process.env.GOOGLE_PLACES_API_KEY?.trim()),
      },
      null,
      2
    )
  );

  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key');
    process.exit(1);
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });
  const limit = Math.max(1, Number.parseInt(argValue('--limit') ?? '200', 10));
  const slugArg = argValue('--slugs') ?? argValue('--slug');
  const slugs = slugArg
    ? slugArg.split(',').map((s) => s.trim()).filter(Boolean)
    : null;

  const probe = await sb
    .from('companies')
    .select('slug, verification_sources, google_data, public_scrape_data')
    .limit(1);

  let selectCols =
    'slug, name, overall_rating, review_count, bbb_rating, bbb_accredited, authority_active, verification_sources';
  let hasLegacyCols = true;
  if (probe.error) {
    hasLegacyCols = false;
    console.log('legacy_columns', {
      available: false,
      error: probe.error.message,
      code: probe.error.code,
    });
  } else {
    selectCols =
      'slug, name, overall_rating, review_count, bbb_rating, bbb_accredited, authority_active, verification_sources, google_data, public_scrape_data';
    console.log('legacy_columns', { available: true });
  }

  let rows: Record<string, unknown>[] = [];
  if (slugs?.length) {
    for (const slug of slugs) {
      const { data, error } = await sb
        .from('companies')
        .select(selectCols)
        .eq('slug', slug)
        .maybeSingle();
      if (error) {
        console.log(JSON.stringify({ slug, error: error.message }));
        continue;
      }
      if (data) rows.push(data as Record<string, unknown>);
      else console.log(JSON.stringify({ slug, found: false }));
    }
  } else {
    const { data, error } = await sb
      .from('companies')
      .select(selectCols)
      .order('reputation_score', { ascending: false })
      .limit(limit);
    if (error) {
      console.error(error.message);
      process.exit(1);
    }
    rows = (data ?? []) as Record<string, unknown>[];
  }

  let googleOk = 0;
  let googleMiss = 0;
  let bbbConfirmed = 0;
  let bbbColumnOnly = 0;
  let vsGoogle = 0;
  let gdCol = 0;
  const misses: string[] = [];

  for (const row of rows) {
    const g = googleFromRow(row);
    const scrape = scrapeFromRow(row);
    if (row.google_data) gdCol++;
    if (parseVerificationSources(row.verification_sources).google) vsGoogle++;
    if (isDisplayableGooglePlacesRating(g)) googleOk++;
    else {
      googleMiss++;
      if (misses.length < 25) misses.push(String(row.slug));
    }
    if (hasBbbPublicScrapeData(scrape)) bbbConfirmed++;
    else if (row.bbb_rating && row.bbb_rating !== 'NR') bbbColumnOnly++;
  }

  const n = rows.length;
  console.log(
    JSON.stringify(
      {
        n,
        google_displayable: googleOk,
        google_miss: googleMiss,
        google_pct: n ? Math.round((googleOk / n) * 100) : 0,
        bbb_confirmed_scrape: bbbConfirmed,
        bbb_confirmed_pct: n ? Math.round((bbbConfirmed / n) * 100) : 0,
        bbb_column_grade_without_confirmed_scrape: bbbColumnOnly,
        has_verification_sources_google: vsGoogle,
        has_google_data_column_value: gdCol,
        legacy_columns_in_schema: hasLegacyCols,
        sample_google_misses: misses,
      },
      null,
      2
    )
  );

  if (slugs?.length) {
    for (const row of rows) {
      const g = googleFromRow(row);
      const scrape = scrapeFromRow(row);
      console.log(
        JSON.stringify({
          slug: row.slug,
          overall_rating: row.overall_rating,
          review_count: row.review_count,
          google_displayable: isDisplayableGooglePlacesRating(g),
          google_status: g?.status ?? null,
          google_rating: g?.rating ?? null,
          google_reviews: g?.review_count ?? null,
          bbb_confirmed: hasBbbPublicScrapeData(scrape),
          bbb_column: row.bbb_rating ?? null,
          scrape_bbb: scrape?.bbb_rating ?? null,
        })
      );
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
