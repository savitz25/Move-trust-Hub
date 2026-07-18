/**
 * Safe re-enrichment: companies missing verification_sources.google
 * (or with non-ok status). Writes only into verification_sources + rating fields.
 *
 * Usage:
 *   npx tsx scripts/reenrich-missing-google.ts --dry-run
 *   npx tsx scripts/reenrich-missing-google.ts --limit=20
 *   npx tsx scripts/reenrich-missing-google.ts --slug=jk-moving-services
 */
import { createClient } from '@supabase/supabase-js';
import { fetchGooglePlacesData } from '../lib/verification/google-places';
import {
  parseVerificationSources,
  type VerificationSources,
} from '../lib/verification/backfill-helpers';

function loadEnv() {
  try {
    const fs = require('fs') as typeof import('fs');
    const path = require('path') as typeof import('path');
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) return;
    for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
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
  } catch {
    /* ignore */
  }
}

loadEnv();

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

const dryRun = process.argv.includes('--dry-run');
const force = process.argv.includes('--force');
const limit = Math.max(1, Number.parseInt(argValue('--limit') ?? '50', 10));
const onlySlug = argValue('--slug');
const delayMs = Math.max(0, Number.parseInt(argValue('--delay-ms') ?? '350', 10));

function needsGoogle(sources: VerificationSources): boolean {
  if (force) return true;
  const g = sources.google;
  if (!g) return true;
  if (g.status === 'ok' && (g.rating != null || (g.review_snippets?.length ?? 0) > 0)) {
    return false;
  }
  return true;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  if (!process.env.GOOGLE_PLACES_API_KEY?.trim()) {
    console.error('Missing GOOGLE_PLACES_API_KEY');
    process.exit(1);
  }

  const admin = createClient(url, key, { auth: { persistSession: false } });

  type Row = {
    id: string;
    slug: string;
    name: string;
    headquarters: string | null;
    verification_sources: unknown;
    overall_rating: number | null;
    review_count: number | null;
  };

  const rows: Row[] = [];
  if (onlySlug) {
    const { data, error } = await admin
      .from('companies')
      .select('id, slug, name, headquarters, verification_sources, overall_rating, review_count')
      .eq('slug', onlySlug)
      .maybeSingle();
    if (error) throw error;
    if (data) rows.push(data as Row);
  } else {
    for (let from = 0; ; from += 500) {
      const { data, error } = await admin
        .from('companies')
        .select('id, slug, name, headquarters, verification_sources, overall_rating, review_count')
        .range(from, from + 499);
      if (error) throw error;
      if (!data?.length) break;
      rows.push(...(data as Row[]));
      if (data.length < 500) break;
    }
  }

  const targets = rows.filter((r) => needsGoogle(parseVerificationSources(r.verification_sources)));
  console.log(
    JSON.stringify(
      {
        dryRun,
        force,
        totalCompanies: rows.length,
        missingOrStaleGoogle: targets.length,
        willProcess: Math.min(limit, targets.length),
      },
      null,
      2
    )
  );

  let updated = 0;
  let errors = 0;
  let ok = 0;
  let notFound = 0;

  for (const row of targets.slice(0, limit)) {
    const existing = parseVerificationSources(row.verification_sources);
    process.stdout.write(`→ ${row.slug} … `);

    try {
      const google = await fetchGooglePlacesData({
        legalName: row.name,
        headquarters: row.headquarters,
      });

      if (google.status === 'ok') {
        ok++;
        console.log(
          `ok rating=${google.rating} reviews=${google.review_count} snippets=${google.review_snippets?.length ?? 0}`
        );
      } else {
        if (google.status === 'not_found') notFound++;
        else errors++;
        console.log(`${google.status}${google.error ? `: ${google.error}` : ''}`);
      }

      if (dryRun) continue;

      const nextSources: VerificationSources = {
        ...existing,
        google,
      };

      const overallRating =
        google.status === 'ok' && google.rating != null && google.rating > 0
          ? google.rating
          : row.overall_rating;
      const reviewCount =
        google.status === 'ok' && google.review_count != null
          ? google.review_count
          : row.review_count;

      const { error } = await admin
        .from('companies')
        .update({
          verification_sources: nextSources,
          overall_rating: overallRating,
          review_count: reviewCount,
          last_updated: new Date().toISOString(),
        })
        .eq('id', row.id);

      if (error) {
        console.error(`  update failed: ${error.message}`);
        errors++;
      } else {
        updated++;
      }
    } catch (err) {
      errors++;
      console.error(err instanceof Error ? err.message : err);
    }

    if (delayMs > 0) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  console.log(JSON.stringify({ updated, ok, notFound, errors, dryRun }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
