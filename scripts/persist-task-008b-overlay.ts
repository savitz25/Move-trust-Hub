/**
 * Persist Task 008B overlay from the reviewed pilot JSON.
 * Does not publish companies. Does not call Google Places.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const RUN_ID = 'task-008b-2026-08';
const SOURCE = 'FMCSA L&I carrier file (data.transportation.gov/6eyk-hxee)';

function loadEnv() {
  for (const file of ['.env.local', '.env.production.local']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const match = raw.trim().match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
      if (!process.env.DATABASE_URL && /^postgres/.test(value)) process.env.DATABASE_URL = value;
    }
  }
}

async function main() {
  loadEnv();
  const report = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-008b-identity-review-pilot.json'), 'utf8')
  ) as {
    candidates: Array<{
      usdot: string;
      original_disposition: string;
      current_match_reason: string | null;
      current_review_category: string;
      matched_existing_company_id: string | null;
      matched_existing_usdot: string | null;
      matched_existing_company_slug: string | null;
      matched_existing_public_name: string | null;
      resolution: string;
      resolution_confidence: string;
      eligible_for_canonicalization: boolean;
      evidence: string[];
      selection_rank: number;
    }>;
  };
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.federal_hhg_identity_resolution (
      usdot text PRIMARY KEY,
      review_run_id text NOT NULL,
      original_disposition text NOT NULL,
      original_review_reason text,
      original_review_category text NOT NULL,
      matched_company_id text,
      matched_company_usdot text,
      matched_company_slug text,
      matched_company_name text,
      resolution text NOT NULL,
      resolution_confidence text NOT NULL,
      eligible_for_canonicalization boolean NOT NULL DEFAULT false,
      evidence_json jsonb NOT NULL DEFAULT '{}'::jsonb,
      source text NOT NULL,
      resolved_at timestamptz NOT NULL DEFAULT now()
    )
  `);
  await client.query(
    `CREATE INDEX IF NOT EXISTS federal_hhg_identity_resolution_run_idx
       ON public.federal_hhg_identity_resolution (review_run_id, resolution)`
  );
  await client.query(`REVOKE ALL ON public.federal_hhg_identity_resolution FROM anon, authenticated`);
  let upserts = 0;
  for (const row of report.candidates) {
    await client.query(
      `INSERT INTO public.federal_hhg_identity_resolution (
         usdot, review_run_id, original_disposition, original_review_reason, original_review_category,
         matched_company_id, matched_company_usdot, matched_company_slug, matched_company_name,
         resolution, resolution_confidence, eligible_for_canonicalization, evidence_json, source
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb,$14)
       ON CONFLICT (usdot) DO UPDATE SET
         review_run_id = EXCLUDED.review_run_id,
         resolution = EXCLUDED.resolution,
         resolution_confidence = EXCLUDED.resolution_confidence,
         eligible_for_canonicalization = EXCLUDED.eligible_for_canonicalization,
         evidence_json = EXCLUDED.evidence_json,
         resolved_at = now()`,
      [
        row.usdot,
        RUN_ID,
        row.original_disposition,
        row.current_match_reason,
        row.current_review_category,
        row.matched_existing_company_id,
        row.matched_existing_usdot,
        row.matched_existing_company_slug,
        row.matched_existing_public_name,
        row.resolution,
        row.resolution_confidence,
        row.eligible_for_canonicalization,
        JSON.stringify({
          reasons: row.evidence,
          public: false,
          indexable: false,
          auto_merge: false,
          selection_rank: row.selection_rank,
        }),
        SOURCE,
      ]
    );
    upserts += 1;
  }
  const counts = await client.query(`
    SELECT
      (SELECT count(*)::int FROM companies) AS companies,
      (SELECT count(*) FILTER (WHERE indexable)::int FROM companies) AS indexable,
      (SELECT count(*)::int FROM federal_hhg_identity_resolution WHERE review_run_id=$1) AS overlay,
      (SELECT count(*) FILTER (WHERE eligible_for_canonicalization)::int FROM federal_hhg_identity_resolution WHERE review_run_id=$1) AS eligible,
      (SELECT count(*)::int FROM federal_hhg_staging WHERE disposition='IDENTITY_REVIEW_REQUIRED'
         AND classification IN ('HHG_CARRIER','HHG_BROKER','HHG_CARRIER_BROKER')) AS review_required
  `, [RUN_ID]);
  await client.end();
  console.log(JSON.stringify({ google_places_requests: 0, upserts, ...counts.rows[0] }, null, 2));
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
