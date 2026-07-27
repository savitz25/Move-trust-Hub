/**
 * Fail if >50% of auto-transport brands still lack displayable Google Places data.
 *
 * Usage (after vercel env pull .env.local):
 *   npm run verify:auto-transport-places
 */
import { createClient } from '@supabase/supabase-js';
import { seedAutoTransportCompanies } from '../data/seed-auto-transport';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import { isDisplayableGooglePlacesRating } from '../lib/verification/google-places';
import { resolveGoogleDataFromRow } from '../lib/verification/resolve-company-row';
import { getAutoTransportGoogleFileSnapshot } from '../lib/auto-transport/apply-google-enrichment';

loadEnvLocal();

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || '';
  const urlOk =
    Boolean(url) && !url.includes('placeholder') && !url.includes('<project');
  const keyOk = Boolean(key) && !key.startsWith('<') && key.length > 40;

  if (!urlOk || !keyOk) {
    console.error(
      'FATAL: verify requires real NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.\n' +
        '  Run: vercel env pull .env.local'
    );
    process.exit(1);
  }

  const admin = createClient(url, key, { auth: { persistSession: false } });
  const slugs = seedAutoTransportCompanies.map((c) => c.slug);
  const { data, error } = await admin
    .from('companies')
    .select('slug, google_data, verification_sources, overall_rating, review_count')
    .in('slug', slugs);

  if (error) {
    // retry without google_data
    const res2 = await admin
      .from('companies')
      .select('slug, verification_sources, overall_rating, review_count')
      .in('slug', slugs);
    if (res2.error) {
      console.error('DB read failed:', res2.error.message);
      process.exit(1);
    }
    return evaluate(slugs, (res2.data ?? []) as Record<string, unknown>[]);
  }

  return evaluate(slugs, (data ?? []) as Record<string, unknown>[]);
}

function evaluate(slugs: string[], rows: Record<string, unknown>[]) {
  const bySlug = new Map(rows.map((r) => [String(r.slug), r]));
  let withPlaces = 0;
  const missing: string[] = [];

  for (const slug of slugs) {
    const row = bySlug.get(slug);
    const fromDb = row
      ? isDisplayableGooglePlacesRating(resolveGoogleDataFromRow(row))
      : false;
    const fromFile = isDisplayableGooglePlacesRating(
      getAutoTransportGoogleFileSnapshot(slug)
    );
    if (fromDb || fromFile) {
      withPlaces++;
      if (!fromDb && fromFile) {
        console.log(`  ${slug}: file snapshot only (not yet in DB)`);
      } else {
        console.log(`  ${slug}: ok`);
      }
    } else {
      missing.push(slug);
      console.log(`  ${slug}: MISSING Places`);
    }
  }

  const total = slugs.length;
  const pct = total ? (withPlaces / total) * 100 : 0;
  console.log(`\nPlaces coverage: ${withPlaces}/${total} (${pct.toFixed(0)}%)`);
  console.log(`Missing: ${missing.join(', ') || 'none'}`);

  if (pct < 50) {
    console.error(
      `FAIL: only ${pct.toFixed(0)}% of auto brands have Places data (need ≥50%).\n` +
        '  npm run enrich:auto-transport -- --confirm --force --limit=50'
    );
    process.exit(1);
  }

  console.log('PASS: ≥50% of auto-transport brands have displayable Places data.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
