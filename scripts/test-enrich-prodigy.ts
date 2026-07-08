/**
 * One-off manual enrichment test — Prodigy Moving & Storage, LLC
 *
 *   npx tsx scripts/test-enrich-prodigy.ts --dry-run
 *   npx tsx scripts/test-enrich-prodigy.ts
 *   npx tsx scripts/test-enrich-prodigy.ts --usdot=3983945
 *
 * Requires .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   GOOGLE_PLACES_API_KEY (optional)
 *
 * Updates only: google_data, public_scrape_data, overall_rating, review_count, last_updated
 * Never touches FMCSA / usdot_number / fmcsa_* columns.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';
import { FMCSA_PROTECTED_COLUMNS } from '../lib/verification/backfill-helpers';
import { fetchBbbPublicProfile } from '../lib/verification/bbb-public-profile';
import { fetchGooglePlacesData } from '../lib/verification/google-places';
import type { PublicScrapeData } from '../lib/verification/types';

const TARGET_NAME = 'Prodigy Moving & Storage, LLC';
const TARGET_NAME_PATTERN = '%Prodigy Moving%';

function loadEnvLocal(): void {
  try {
    const content = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq < 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch {
    /* env may already be exported */
  }
}

loadEnvLocal();

function parseUsdotArg(argv: string[]): string | null {
  const flag = argv.find((a) => a.startsWith('--usdot='));
  if (flag) return flag.split('=')[1]?.replace(/\D/g, '') ?? null;
  const idx = argv.indexOf('--usdot');
  if (idx >= 0 && argv[idx + 1]) return argv[idx + 1].replace(/\D/g, '');
  return null;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const usdotFilter = parseUsdotArg(process.argv);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !serviceKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log('── Prodigy enrichment test ──');
  console.log(`Target: ${TARGET_NAME}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
  console.log(`Protected (never written): ${FMCSA_PROTECTED_COLUMNS.join(', ')}\n`);

  let query = admin
    .from('companies')
    .select(
      'id, slug, name, headquarters, usdot_number, google_data, public_scrape_data, overall_rating, review_count'
    )
    .ilike('name', TARGET_NAME_PATTERN);

  if (usdotFilter) {
    query = admin
      .from('companies')
      .select(
        'id, slug, name, headquarters, usdot_number, google_data, public_scrape_data, overall_rating, review_count'
      )
      .eq('usdot_number', usdotFilter);
  }

  const { data: rows, error } = await query.limit(5);

  if (error) {
    console.error('Lookup failed:', error.message);
    process.exit(1);
  }

  if (!rows?.length) {
    console.error(`No company found matching "${TARGET_NAME}"${usdotFilter ? ` / USDOT ${usdotFilter}` : ''}.`);
    process.exit(1);
  }

  const company =
    rows.find((r) => r.name.toLowerCase().includes('prodigy moving')) ?? rows[0]!;

  console.log('Matched company:');
  console.log(`  id:     ${company.id}`);
  console.log(`  slug:   ${company.slug}`);
  console.log(`  name:   ${company.name}`);
  console.log(`  usdot:  ${company.usdot_number ?? '—'}`);
  console.log(`  hq:     ${company.headquarters ?? '—'}`);
  console.log(`  profile: https://www.movetrusthub.com/companies/${company.slug}\n`);

  console.log('Fetching BBB public profile (search → HQ profile → reviews)…');
  const bbb = await fetchBbbPublicProfile({
    companyName: company.name,
    headquarters: company.headquarters,
  });

  console.log('\n── BBB scrape results ──');
  console.log(JSON.stringify(bbb, null, 2));

  console.log('\nFetching Google Places (if API key configured)…');
  const google = await fetchGooglePlacesData({
    legalName: company.name,
    headquarters: company.headquarters,
  });

  console.log('\n── Google Places results ──');
  console.log(
    JSON.stringify(
      {
        status: google.status,
        rating: google.rating,
        review_count: google.review_count,
        place_id: google.place_id,
        snippets: google.review_snippets?.length ?? 0,
        last_fetched: google.last_fetched,
        error: google.error,
      },
      null,
      2
    )
  );

  const existingScrape = (company.public_scrape_data ?? null) as PublicScrapeData | null;
  const mergedScrape: PublicScrapeData = {
    confidence: 'public',
    bbb_rating: bbb.bbb_rating,
    bbb_review_count: bbb.bbb_review_count,
    bbb_accredited: bbb.bbb_accredited,
    bbb_accreditation_status: bbb.bbb_accreditation_status,
    bbb_file_opened: bbb.bbb_file_opened,
    bbb_accredited_since: bbb.bbb_accredited_since,
    bbb_profile_url: bbb.bbb_profile_url,
    bbb_recent_reviews: bbb.bbb_recent_reviews,
    trustpilot_rating: existingScrape?.trustpilot_rating ?? null,
    trustpilot_review_count: existingScrape?.trustpilot_review_count ?? null,
    yelp_rating: existingScrape?.yelp_rating ?? null,
    yelp_review_count: existingScrape?.yelp_review_count ?? null,
    sources: {
      bbb: bbb.meta,
      trustpilot: existingScrape?.sources?.trustpilot,
      yelp: existingScrape?.sources?.yelp,
    },
    last_scraped_at: new Date().toISOString(),
  };

  const updates: Record<string, unknown> = {
    public_scrape_data: mergedScrape,
    last_updated: new Date().toISOString().slice(0, 10),
  };

  if (google.status === 'ok') {
    updates.google_data = google;
    if (google.rating != null && google.rating > 0) {
      updates.overall_rating = google.rating;
      if (google.review_count != null) updates.review_count = google.review_count;
    }
  }

  console.log('\n── Planned DB update ──');
  console.log(JSON.stringify(updates, null, 2));

  if (dryRun) {
    console.log('\nDry run complete — no changes written.');
    console.log(`Verify profile after live run: /companies/${company.slug}`);
    return;
  }

  const { error: updateError } = await admin
    .from('companies')
    .update(updates)
    .eq('id', company.id);

  if (updateError) {
    console.error('\nUpdate failed:', updateError.message);
    process.exit(1);
  }

  console.log('\n✓ Company updated successfully.');
  console.log(`Profile: https://www.movetrusthub.com/companies/${company.slug}`);
  console.log('Directory cache refreshes within ~60s.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});