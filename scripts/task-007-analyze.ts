/**
 * Task 007 — remaining clean pool, Wave 3 candidate selection, identity-review triage.
 * Does not publish. Does not call Google Places.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { selectWaveCandidates, waveSelectionStats } from '../lib/federal-hhg/select-wave';
import {
  WAVE_3_ID,
  isWave1Eligible,
  type StagedPublicationRow,
} from '../lib/federal-hhg/wave-eligibility';
import { normalizeUsdot } from '../lib/federal-hhg/normalize';
import { classifyIdentityReview } from '../lib/federal-hhg/identity-review';
import { namesLookSimilar } from '../lib/federal-hhg/match';

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

  const waves = await client.query(`
    SELECT wave_id, classification, count(*)::int AS n
      FROM federal_hhg_wave_publication
     WHERE status <> 'unpublished'
     GROUP BY 1, 2
     ORDER BY 1, 2
  `);
  const companies = await client.query(
    `SELECT count(*)::int AS n, count(*) FILTER (WHERE indexable)::int AS indexable FROM companies`
  );
  const publishedDots = await client.query(
    `SELECT usdot FROM federal_hhg_wave_publication WHERE status <> 'unpublished'`
  );
  const existing = await client.query(
    `SELECT id, name, slug, usdot_number, headquarters FROM companies`
  );
  const clean = await client.query(`
    SELECT usdot, mc, legal_name, dba_name, phy_city, phy_state, phone,
           classification, disposition, hhg_carrier_verified, hhg_broker_verified,
           retrieved_at, match_reason
      FROM federal_hhg_staging
     WHERE disposition = 'NEW_CANONICAL_CANDIDATE'
       AND classification IN ('HHG_CARRIER','HHG_BROKER','HHG_CARRIER_BROKER')
  `);
  const review = await client.query(`
    SELECT usdot, mc, legal_name, dba_name, phy_city, phy_state, classification,
           match_reason, matched_company_id
      FROM federal_hhg_staging
     WHERE disposition = 'IDENTITY_REVIEW_REQUIRED'
       AND classification IN ('HHG_CARRIER','HHG_BROKER','HHG_CARRIER_BROKER')
  `);
  const stagingRun = await client.query(
    `SELECT source, source_updated_at, finished_at, google_places_requests
       FROM federal_hhg_staging_run
      ORDER BY started_at DESC LIMIT 1`
  );
  await client.end();

  const taken = new Set([
    ...(publishedDots.rows as Array<{ usdot: string }>).map((r) => normalizeUsdot(r.usdot)),
    ...(existing.rows as Array<{ usdot_number: string | null }>)
      .map((r) => normalizeUsdot(r.usdot_number ?? ''))
      .filter(Boolean),
  ]);
  const existingById = new Map(
    (existing.rows as Array<{
      id: string;
      name: string;
      headquarters: string | null;
    }>).map((row) => [row.id, row])
  );

  const remaining = (clean.rows as StagedPublicationRow[]).filter((row) => {
    const usdot = normalizeUsdot(row.usdot);
    return usdot && !taken.has(usdot) && isWave1Eligible(row).eligible;
  });
  const remainingAll = (clean.rows as StagedPublicationRow[]).filter(
    (row) => !taken.has(normalizeUsdot(row.usdot))
  );

  const selected = selectWaveCandidates(remaining, {
    limit: 1500,
    perStateCap: 80,
    maxBrokers: remaining.filter((r) => r.classification === 'HHG_BROKER').length,
    maxDuals: remaining.filter((r) => r.classification === 'HHG_CARRIER_BROKER').length,
  });

  const wave3 = {
    google_places_requests: 0,
    proposed_wave: WAVE_3_ID,
    publish: false,
    remaining_unpublished: remainingAll.length,
    remaining_eligible: remaining.length,
    remaining_by_role: {
      carrier: remainingAll.filter((r) => r.classification === 'HHG_CARRIER').length,
      broker: remainingAll.filter((r) => r.classification === 'HHG_BROKER').length,
      dual: remainingAll.filter((r) => r.classification === 'HHG_CARRIER_BROKER').length,
    },
    eligible_by_role: {
      carrier: remaining.filter((r) => r.classification === 'HHG_CARRIER').length,
      broker: remaining.filter((r) => r.classification === 'HHG_BROKER').length,
      dual: remaining.filter((r) => r.classification === 'HHG_CARRIER_BROKER').length,
    },
    selected: waveSelectionStats(selected),
    candidates: selected.map((row, index) => ({
      wave_id: WAVE_3_ID,
      status: 'candidate',
      selection_rank: index + 1,
      selection_reason: 'deterministic_remaining_clean_round_robin_state',
      usdot: normalizeUsdot(row.usdot),
      mc: row.mc,
      classification: row.classification,
      legal_name: row.legal_name,
      dba_name: row.dba_name,
      city: row.phy_city,
      state: (row.phy_state ?? '').trim().toUpperCase(),
      phone: row.phone,
      source: 'FMCSA L&I carrier file (data.transportation.gov/6eyk-hxee)',
      retrieved_at: row.retrieved_at ?? null,
    })),
  };

  const categoryCounts: Record<string, number> = {};
  const queues: Record<string, number> = {};
  const reviewRows = review.rows as Array<{
    usdot: string;
    legal_name: string | null;
    dba_name: string | null;
    phy_city: string | null;
    phy_state: string | null;
    classification: string;
    match_reason: string | null;
    matched_company_id: string | null;
  }>;
  const sample = [];
  for (const row of reviewRows) {
    let existingCo = row.matched_company_id
      ? existingById.get(row.matched_company_id)
      : undefined;
    if (!existingCo) {
      existingCo = (existing.rows as Array<{
        id: string;
        name: string;
        headquarters: string | null;
      }>).find((company) => namesLookSimilar(row.legal_name ?? '', company.name ?? ''));
    }
    const hq = (existingCo?.headquarters ?? '').split(',');
    const triage = classifyIdentityReview({
      matchReason: row.match_reason,
      legalName: row.legal_name,
      dbaName: row.dba_name,
      phyCity: row.phy_city,
      phyState: row.phy_state,
      existingName: existingCo?.name,
      existingCity: hq[0]?.trim(),
      existingState: hq[1]?.trim(),
    });
    categoryCounts[triage.category] = (categoryCounts[triage.category] ?? 0) + 1;
    queues[triage.queue] = (queues[triage.queue] ?? 0) + 1;
    if (sample.length < 120) {
      sample.push({
        usdot: row.usdot,
        classification: row.classification,
        legal_name: row.legal_name,
        dba_name: row.dba_name,
        hq: `${row.phy_city}, ${row.phy_state}`,
        match_reason: row.match_reason,
        ...triage,
      });
    }
  }

  const reviewSummary = {
    google_places_requests: 0,
    total: reviewRows.length,
    by_role: {
      carrier: reviewRows.filter((r) => r.classification === 'HHG_CARRIER').length,
      broker: reviewRows.filter((r) => r.classification === 'HHG_BROKER').length,
      dual: reviewRows.filter((r) => r.classification === 'HHG_CARRIER_BROKER').length,
    },
    categories: categoryCounts,
    queues,
    automatic_fuzzy_merges: 0,
    sample,
  };

  writeFileSync(
    resolve(process.cwd(), 'docs/task-007-wave3-selection.json'),
    JSON.stringify(wave3, null, 2) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-007-identity-review-segmentation.json'),
    JSON.stringify(reviewSummary, null, 2) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-007-observation.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        companies: companies.rows[0],
        waves: waves.rows,
        staging_run: stagingRun.rows[0] ?? null,
        remaining_clean: wave3.remaining_by_role,
        remaining_eligible: wave3.eligible_by_role,
        wave3_selected: wave3.selected,
        review_total: reviewRows.length,
      },
      null,
      2
    ) + '\n'
  );

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        companies: companies.rows[0],
        waves: waves.rows,
        remaining_clean: wave3.remaining_by_role,
        remaining_eligible: wave3.eligible_by_role,
        wave3: wave3.selected,
        publish: false,
        review_total: reviewRows.length,
        review_categories: categoryCounts,
        queues,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(
    String(error instanceof Error ? error.message : error).replace(
      /postgresql:\/\/[^@\s]+@/g,
      'postgresql://***@'
    )
  );
  process.exit(1);
});
