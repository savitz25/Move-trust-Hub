/**
 * Task 011A — recompute LOCAL_INTRASTATE_CANDIDATE universe (read-only).
 * Does NOT publish. Does NOT call Google Places.
 * Candidate status ≠ state-authorized publishability.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { normalizeUsdot } from '../lib/federal-hhg/normalize';
import { US_STATES_AND_DC } from '../lib/federal-hhg/wave-eligibility';

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
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const freeze = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE service_scope = 'intrastate')::int AS intrastate_scope,
           count(*) FILTER (WHERE service_scope = 'interstate')::int AS interstate_scope,
           count(*) FILTER (WHERE service_scope IS NULL)::int AS scope_null
      FROM companies
  `);
  const waves = await client.query(`
    SELECT wave_id, count(*)::int AS n
      FROM federal_hhg_wave_publication
     WHERE status <> 'unpublished'
     GROUP BY 1 ORDER BY 1
  `);
  const caps = await client.query(`
    SELECT capability, evidence_state, count(*)::int AS n
      FROM provider_capability
     WHERE capability IN ('hhg_local','hhg_intrastate','auto_carrier','auto_broker')
     GROUP BY 1, 2 ORDER BY 1, 2
  `);
  const staging = await client.query(`
    SELECT classification, disposition, count(*)::int AS n
      FROM federal_hhg_staging
     GROUP BY 1, 2 ORDER BY 1, 2
  `);
  const stagingUsDc = await client.query(`
    SELECT count(*)::int AS n,
           count(DISTINCT regexp_replace(usdot, '\\D', '', 'g'))::int AS unique_usdots,
           count(*) FILTER (WHERE upper(btrim(phy_state)) = ANY($1::text[]))::int AS us_dc_hq
      FROM federal_hhg_staging
  `, [[...US_STATES_AND_DC]]);
  const notHhgActiveLooking = await client.query(`
    SELECT count(*)::int AS n,
           count(DISTINCT regexp_replace(usdot, '\\D', '', 'g'))::int AS unique_usdots
      FROM federal_hhg_staging
     WHERE classification = 'NOT_HHG'
       AND upper(btrim(phy_state)) = ANY($1::text[])
  `, [[...US_STATES_AND_DC]]);
  const identityReview = await client.query(`
    SELECT count(*)::int AS n,
           count(DISTINCT regexp_replace(usdot, '\\D', '', 'g'))::int AS unique_usdots
      FROM federal_hhg_staging
     WHERE disposition = 'IDENTITY_REVIEW_REQUIRED'
  `);
  const overlay = await client
    .query(`SELECT count(*)::int AS n FROM federal_hhg_identity_resolution`)
    .catch(() => ({ rows: [{ n: 0 }] }));
  const autoServices = await client.query(`
    SELECT count(*)::int AS n
      FROM companies
     WHERE coalesce(services::text, '') ILIKE '%auto transport%'
        OR coalesce(entity_type, '') ILIKE '%auto%'
  `);
  const publishedDots = await client.query(`
    SELECT count(DISTINCT regexp_replace(usdot, '\\D', '', 'g'))::int AS n
      FROM federal_hhg_wave_publication
     WHERE status <> 'unpublished'
  `);
  const publicDots = await client.query(`
    SELECT count(DISTINCT regexp_replace(usdot_number, '\\D', '', 'g'))::int AS n
      FROM companies
     WHERE usdot_number IS NOT NULL AND btrim(usdot_number) <> ''
       AND (publication_state IS NULL OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED'))
  `);

  // Candidate pool definition (explicitly NOT authorized):
  // A) existing intrastate-scoped companies
  // B) staging NOT_HHG with US/DC HQ (property/other federal registrants — local-mover candidates only after state authority)
  // C) staging HHG with IDENTITY_REVIEW (overlap only; still not local-authorized)
  const intrastateCompanies = await client.query(`
    SELECT count(*)::int AS n,
           count(DISTINCT regexp_replace(coalesce(usdot_number,''), '\\D', '', 'g'))
             FILTER (WHERE usdot_number IS NOT NULL AND btrim(usdot_number) <> '')::int AS unique_usdots
      FROM companies
     WHERE service_scope = 'intrastate'
  `);

  await client.end();

  const report = {
    google_places_requests: 0,
    task: '011A',
    label: 'LOCAL_INTRASTATE_CANDIDATE',
    note:
      'Candidate status does NOT equal state-authorized publishability. Federal USDOT/NOT_HHG is not state HHG authority.',
    freeze_baseline: freeze.rows[0],
    waves: waves.rows,
    existing_capabilities_snapshot: caps.rows,
    staging_breakdown: staging.rows,
    staging_totals: stagingUsDc.rows[0],
    pools: {
      A_existing_intrastate_companies: intrastateCompanies.rows[0],
      B_staging_not_hhg_us_dc: notHhgActiveLooking.rows[0],
      C_identity_review_staging: identityReview.rows[0],
      identity_resolution_overlay_rows: overlay.rows[0]?.n ?? 0,
      already_public_unique_usdots: publicDots.rows[0],
      federal_wave_published_unique_usdots: publishedDots.rows[0],
      auto_service_companies: autoServices.rows[0],
    },
    candidate_universe_summary: {
      existing_intrastate_public_rows: (intrastateCompanies.rows[0] as { n: number }).n,
      staging_not_hhg_us_dc_unique_usdots: (notHhgActiveLooking.rows[0] as { unique_usdots: number })
        .unique_usdots,
      staging_not_hhg_us_dc_rows: (notHhgActiveLooking.rows[0] as { n: number }).n,
      identity_review_unique_usdots: (identityReview.rows[0] as { unique_usdots: number })
        .unique_usdots,
      interpretation:
        'Primary research pool for future local adapters is B (NOT_HHG US/DC staging) plus A (already-marked intrastate). Do not publish either without state authority verification.',
    },
    historical_96k_note:
      'Do not use historical ~96k as a hard count. Recompute from current sources each task.',
  };

  const docs = resolve(process.cwd(), 'docs');
  if (!existsSync(docs)) mkdirSync(docs, { recursive: true });
  writeFileSync(
    resolve(docs, 'task-011a-local-candidate-universe.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(JSON.stringify(report, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
