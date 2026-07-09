/**
 * Google Places enrichment for service-area businesses that text search misses.
 *
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-google-three.ts --dry-run
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-google-three.ts --confirm
 */
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import {
  parseVerificationSources,
  type VerificationSources,
} from '@/lib/verification/backfill-helpers';
import { fetchGooglePlacesData, isGooglePlacesConfigured } from '@/lib/verification/google-places';
import type { CompanyEnrichmentInput } from '@/lib/verification/types';
import { createAdminClient } from '@/lib/supabase/admin';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

const TARGETS: Array<{
  slug: string;
  label: string;
  googleQuery: CompanyEnrichmentInput;
}> = [
  {
    slug: 'brothers-ez-moving-of-alabama',
    label: 'Brothers EZ Moving of Alabama',
    googleQuery: {
      legalName: 'Brothers EZ Moving of Alabama',
      headquarters: 'Killen, AL',
      city: 'Killen',
      state: 'AL',
      placeId: 'ChIJZ0ctCyA2fYgRVuEY-Xx6MPY',
    },
  },
  {
    slug: 'jega-movers-llc',
    label: 'JEGA Movers LLC',
    googleQuery: {
      legalName: 'JEGA Movers LLC',
      headquarters: 'Columbia, SC',
      city: 'Columbia',
      state: 'SC',
      placeId: 'ChIJdWWq1siz-IgRBpOyf38-9Ls',
    },
  },
  {
    slug: 'budget-movers-of-augusta',
    label: 'Budget Movers of Augusta',
    googleQuery: {
      legalName: 'Budget Movers of Augusta, Inc.',
      headquarters: 'Augusta, GA',
      city: 'Augusta',
      state: 'GA',
      placeId: 'ChIJ_ZGsQsrFYSYRsEFd7jRMBQ4',
    },
  },
];

function parseArgs(argv: string[]) {
  return { dryRun: argv.includes('--dry-run') || !argv.includes('--confirm') };
}

async function main() {
  const { dryRun } = parseArgs(process.argv.slice(2));
  const admin = createAdminClient();

  if (!isGooglePlacesConfigured()) {
    console.error('GOOGLE_PLACES_API_KEY not configured');
    process.exit(1);
  }

  console.log('=== Google Places enrichment (3 SAB movers) ===');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}\n`);

  const results: Array<Record<string, unknown>> = [];

  for (const target of TARGETS) {
    console.log(`── ${target.label} ──`);

    const { data: company, error } = await admin
      .from('companies')
      .select('id, slug, name, headquarters, verification_sources, overall_rating, review_count')
      .eq('slug', target.slug)
      .maybeSingle();

    if (error || !company) {
      console.log(`  x Company not found (${target.slug})`);
      results.push({ label: target.label, status: 'db_missing', slug: target.slug });
      continue;
    }

    const google = await fetchGooglePlacesData(target.googleQuery);

    if (google.status !== 'ok') {
      console.log(`  x Google: ${google.status}${google.error ? ` — ${google.error}` : ''}`);
      results.push({
        label: target.label,
        status: 'no_google_match',
        slug: company.slug,
        message: google.error ?? google.status,
      });
      continue;
    }

    console.log(
      `  + Google: ${google.rating}★, ${google.review_count} reviews, ${google.review_snippets.length} snippets`
    );
    console.log(`    place: ${google.name} (${google.place_id})`);

    const existingSources = parseVerificationSources(company.verification_sources);
    const nextSources: VerificationSources = { ...existingSources, google };

    const updates: Record<string, unknown> = {
      verification_sources: nextSources,
      verification_last_synced_at: new Date().toISOString(),
      overall_rating: google.rating ?? company.overall_rating,
      review_count: google.review_count ?? company.review_count,
      last_updated: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString(),
    };

    if (!dryRun) {
      const { error: updateError } = await admin.from('companies').update(updates).eq('id', company.id);
      if (updateError) {
        console.log(`  x DB update failed: ${updateError.message}`);
        results.push({
          label: target.label,
          status: 'error',
          slug: company.slug,
          message: updateError.message,
        });
        continue;
      }
    }

    results.push({
      label: target.label,
      status: 'updated',
      slug: company.slug,
      rating: google.rating,
      reviewCount: google.review_count,
      snippets: google.review_snippets.length,
      placeName: google.name,
      placeId: google.place_id,
    });
  }

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const logPath = resolve(
    outDir,
    `google-enrichment-three-${dryRun ? 'dry-run-' : ''}${new Date().toISOString().slice(0, 10)}.json`
  );
  writeFileSync(
    logPath,
    JSON.stringify({ executedAt: new Date().toISOString(), dryRun, results }, null, 2),
    'utf8'
  );

  console.log('\n=== Summary ===');
  for (const r of results) {
    if (r.status === 'updated') {
      console.log(`  ✓ ${r.label} → ${r.rating}★ (${r.reviewCount} reviews)`);
    } else {
      console.log(`  - ${r.label}: ${r.status}`);
    }
  }
  console.log(`\nLog: ${logPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});