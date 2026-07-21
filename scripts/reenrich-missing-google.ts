/**
 * Safe re-enrichment for companies missing usable Google Places snapshots.
 * Writes verification_sources.google (+ google_data when column exists).
 * Never overwrites a usable snapshot with a failed fetch.
 *
 * Usage:
 *   npx tsx scripts/reenrich-missing-google.ts --dry-run
 *   npx tsx scripts/reenrich-missing-google.ts --limit=30
 *   npx tsx scripts/reenrich-missing-google.ts --slug=jk-moving-services
 *   npx tsx scripts/reenrich-missing-google.ts --stats-only
 *   npx tsx scripts/reenrich-missing-google.ts --active-only
 */
import { createClient } from '@supabase/supabase-js';
import {
  fetchGooglePlacesData,
  isUsableGoogleSnapshot,
  mergeGoogleSnapshots,
} from '../lib/verification/google-places';
import {
  parseGoogleData,
  parseVerificationSources,
  type VerificationSources,
} from '../lib/verification/backfill-helpers';

function loadEnv() {
  try {
    const fs = require('fs') as typeof import('fs');
    const path = require('path') as typeof import('path');
    for (const file of ['.env.local', '.env.production.local', '.env']) {
      const envPath = path.join(process.cwd(), file);
      if (!fs.existsSync(envPath)) continue;
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
const statsOnly = process.argv.includes('--stats-only');
const activeOnly = process.argv.includes('--active-only');
const limit = Math.max(1, Number.parseInt(argValue('--limit') ?? '50', 10));
const onlySlug = argValue('--slug');
const delayMs = Math.max(0, Number.parseInt(argValue('--delay-ms') ?? '400', 10));

function resolveExistingGoogle(row: {
  verification_sources: unknown;
  google_data?: unknown;
}) {
  const fromSources = parseGoogleData(
    parseVerificationSources(row.verification_sources).google
  );
  const fromCol = parseGoogleData(row.google_data);
  return mergeGoogleSnapshots(fromSources, fromCol);
}

function needsGoogle(existing: ReturnType<typeof resolveExistingGoogle>): boolean {
  if (force) return true;
  return !isUsableGoogleSnapshot(existing);
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  if (!statsOnly && !process.env.GOOGLE_PLACES_API_KEY?.trim()) {
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
    google_data?: unknown;
    overall_rating: number | null;
    review_count: number | null;
    out_of_service?: boolean | null;
  };

  const rows: Row[] = [];
  if (onlySlug) {
    const { data, error } = await admin
      .from('companies')
      .select(
        'id, slug, name, headquarters, verification_sources, google_data, overall_rating, review_count, out_of_service'
      )
      .eq('slug', onlySlug)
      .maybeSingle();
    if (error) throw error;
    if (data) rows.push(data as Row);
  } else {
    for (let from = 0; ; from += 500) {
      let q = admin
        .from('companies')
        .select(
          'id, slug, name, headquarters, verification_sources, google_data, overall_rating, review_count, out_of_service'
        )
        .range(from, from + 499);
      if (activeOnly) {
        q = q.or('out_of_service.is.null,out_of_service.eq.false');
      }
      const { data, error } = await q;
      if (error) {
        // Retry without google_data / out_of_service if columns lag
        const retry = await admin
          .from('companies')
          .select(
            'id, slug, name, headquarters, verification_sources, overall_rating, review_count'
          )
          .range(from, from + 499);
        if (retry.error) throw retry.error;
        if (!retry.data?.length) break;
        rows.push(...(retry.data as Row[]));
        if (retry.data.length < 500) break;
        continue;
      }
      if (!data?.length) break;
      rows.push(...(data as Row[]));
      if (data.length < 500) break;
    }
  }

  let withUsable = 0;
  let missing = 0;
  let failedStatus = 0;
  const missingList: Array<{ slug: string; name: string; status: string | null }> = [];

  for (const r of rows) {
    const g = resolveExistingGoogle(r);
    if (isUsableGoogleSnapshot(g)) {
      withUsable++;
    } else {
      missing++;
      if (g?.status && g.status !== 'ok') failedStatus++;
      missingList.push({
        slug: r.slug,
        name: r.name,
        status: g?.status ?? null,
      });
    }
  }

  console.log(
    JSON.stringify(
      {
        totalCompanies: rows.length,
        withUsableGoogle: withUsable,
        missingOrUnusableGoogle: missing,
        failedOrNotFoundStatus: failedStatus,
        fillRate:
          rows.length > 0
            ? `${((withUsable / rows.length) * 100).toFixed(1)}%`
            : '0%',
        sampleMissing: missingList.slice(0, 15),
      },
      null,
      2
    )
  );

  if (statsOnly) return;

  const targets = rows.filter((r) => needsGoogle(resolveExistingGoogle(r)));
  console.log(
    JSON.stringify(
      {
        dryRun,
        force,
        willProcess: Math.min(limit, targets.length),
        queue: targets.length,
      },
      null,
      2
    )
  );

  let updated = 0;
  let kept = 0;
  let errors = 0;
  let ok = 0;
  let notFound = 0;

  for (const row of targets.slice(0, limit)) {
    const existing = resolveExistingGoogle(row);
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

      const merged = mergeGoogleSnapshots(existing, google);
      if (!merged) {
        kept++;
        continue;
      }

      // Skip write if we would only store a failed result over nothing useful and already had nothing
      if (!isUsableGoogleSnapshot(merged) && isUsableGoogleSnapshot(existing)) {
        kept++;
        console.log('  (kept existing usable snapshot)');
        continue;
      }

      if (dryRun) {
        if (isUsableGoogleSnapshot(merged)) updated++;
        continue;
      }

      const nextSources: VerificationSources = {
        ...parseVerificationSources(row.verification_sources),
        google: merged,
      };

      const patch: Record<string, unknown> = {
        verification_sources: nextSources,
        last_updated: new Date().toISOString().slice(0, 10),
      };

      if (isUsableGoogleSnapshot(merged) && merged.rating != null && merged.rating > 0) {
        patch.overall_rating = merged.rating;
        if (merged.review_count != null) patch.review_count = merged.review_count;
      }

      // Prefer dual-write google_data when column exists
      const withLegacy = { ...patch, google_data: merged };
      let { error } = await admin.from('companies').update(withLegacy).eq('id', row.id);
      if (error && (error.message?.includes('google_data') || error.code === 'PGRST204')) {
        const retry = await admin.from('companies').update(patch).eq('id', row.id);
        error = retry.error;
      }

      if (error) {
        console.error(`  update failed: ${error.message}`);
        errors++;
      } else if (isUsableGoogleSnapshot(merged)) {
        updated++;
      } else {
        kept++;
      }
    } catch (err) {
      errors++;
      console.error(err instanceof Error ? err.message : err);
    }

    if (delayMs > 0) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  console.log(JSON.stringify({ updated, kept, ok, notFound, errors, dryRun }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
