/**
 * Google Places enrichment for a batch of directory companies.
 *
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-google-batch.ts --dry-run
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-google-batch.ts --confirm
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

type Target = {
  slug: string;
  label: string;
  googleQuery?: CompanyEnrichmentInput;
};

const TARGETS: Target[] = [
  { slug: 'horne-moving-systems', label: 'Horne Moving Systems' },
  { slug: 'nilson-van-and-storage', label: 'Nilson Van and Storage' },
  { slug: 'two-men-and-a-truck-gainesville', label: 'Two Men and a Truck Gainesville' },
  {
    slug: 'jega-movers-llc',
    label: 'JEGA Movers LLC',
    googleQuery: {
      legalName: 'JEGA Movers',
      headquarters: 'Columbia, SC',
      city: 'Columbia',
      state: 'SC',
    },
  },
  {
    slug: 'mountain-lake-mover',
    label: 'Mountain Lake Mover',
    googleQuery: {
      legalName: 'Owens Brothers Transfer Company',
      headquarters: 'South Lake Tahoe, CA',
      city: 'South Lake Tahoe',
      state: 'CA',
    },
  },
  {
    slug: 'all-my-sons-moving-storage-birmingham',
    label: 'All My Sons Moving & Storage',
  },
  {
    slug: 'brothers-ez-moving-of-alabama',
    label: 'Brothers EZ Moving of Alabama',
    googleQuery: {
      legalName: 'Brothers EZ Moving',
      headquarters: 'Florence, AL',
      city: 'Florence',
      state: 'AL',
    },
  },
  {
    slug: 'budget-movers-of-augusta',
    label: 'Budget Movers of Augusta',
    googleQuery: {
      legalName: 'Budget Movers Augusta',
      headquarters: 'Augusta, GA',
      city: 'Augusta',
      state: 'GA',
    },
  },
  {
    slug: 'lee-moving-storage',
    label: 'Lee Moving & Storage',
    googleQuery: {
      legalName: 'Lee Moving and Storage Inc',
      headquarters: 'Baton Rouge, LA',
      city: 'Baton Rouge',
      state: 'LA',
    },
  },
  {
    slug: 'mighty-moving-knoxville',
    label: 'Mighty Moving Knoxville',
    googleQuery: {
      legalName: 'Mighty Moving & Storage',
      headquarters: 'Knoxville, TN',
      city: 'Knoxville',
      state: 'TN',
    },
  },
];

type ResultRow = {
  label: string;
  status: 'updated' | 'not_found' | 'no_google_match' | 'db_missing' | 'error';
  slug?: string;
  name?: string;
  rating?: number | null;
  reviewCount?: number | null;
  snippets?: number;
  placeName?: string | null;
  message?: string;
};

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

  console.log('=== Google Places batch enrichment ===');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}\n`);

  const results: ResultRow[] = [];

  for (const target of TARGETS) {
    console.log(`\n── ${target.label} ──`);

    const { data: company, error } = await admin
      .from('companies')
      .select('id, slug, name, headquarters, verification_sources, overall_rating, review_count')
      .eq('slug', target.slug)
      .maybeSingle();

    if (error || !company) {
      console.log(`  x Company not found (slug: ${target.slug})`);
      results.push({ label: target.label, status: 'db_missing', slug: target.slug });
      continue;
    }

    console.log(`  slug: ${company.slug}`);
    console.log(`  name: ${company.name}`);
    console.log(`  hq:   ${company.headquarters ?? '—'}`);

    const googleInput: CompanyEnrichmentInput = target.googleQuery ?? {
      legalName: company.name,
      headquarters: company.headquarters,
    };

    const google = await fetchGooglePlacesData(googleInput);

    if (google.status !== 'ok') {
      console.log(`  x Google: ${google.status}${google.error ? ` — ${google.error}` : ''}`);
      results.push({
        label: target.label,
        status: 'no_google_match',
        slug: company.slug,
        name: company.name,
        message: google.error ?? google.status,
      });
      continue;
    }

    console.log(`  + Google: ${google.rating}★, ${google.review_count} reviews, ${google.review_snippets.length} snippets`);
    console.log(`    place: ${google.name}`);
    for (const s of google.review_snippets) {
      console.log(`    - ${s.author ?? 'Anonymous'} (${s.relative_time ?? 'recent'}): ${s.text.slice(0, 80)}…`);
    }

    const existingSources = parseVerificationSources(company.verification_sources);
    const nextSources: VerificationSources = {
      ...existingSources,
      google,
    };

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
          name: company.name,
          message: updateError.message,
        });
        continue;
      }
    }

    results.push({
      label: target.label,
      status: 'updated',
      slug: company.slug,
      name: company.name,
      rating: google.rating,
      reviewCount: google.review_count,
      snippets: google.review_snippets.length,
      placeName: google.name,
    });
  }

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const logPath = resolve(
    outDir,
    `google-enrichment-${dryRun ? 'dry-run-' : ''}${new Date().toISOString().slice(0, 10)}.json`
  );
  writeFileSync(
    logPath,
    JSON.stringify({ executedAt: new Date().toISOString(), dryRun, results }, null, 2),
    'utf8'
  );

  console.log('\n=== Summary ===');
  const updated = results.filter((r) => r.status === 'updated');
  const missed = results.filter((r) => r.status !== 'updated');
  console.log(`Updated: ${updated.length}`);
  console.log(`Not updated: ${missed.length}`);
  for (const r of updated) {
    console.log(`  ✓ ${r.label} → ${r.rating}★ (${r.reviewCount} reviews, ${r.snippets} snippets) [${r.placeName}]`);
  }
  for (const r of missed) {
    console.log(`  - ${r.label}: ${r.status}${r.message ? ` — ${r.message}` : ''}`);
  }
  console.log(`\nLog: ${logPath}`);

  if (dryRun) {
    console.log('\nDry run complete. Re-run with --confirm to write.');
  } else {
    try {
      const { revalidatePublishedCompany } = await import('@/lib/directory/revalidate-company');
      for (const r of updated) {
        if (r.slug) revalidatePublishedCompany(r.slug);
      }
    } catch {
      console.log('(cache revalidate skipped outside Next.js — deploy or 60s TTL)');
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});