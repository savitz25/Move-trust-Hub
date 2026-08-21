/**
 * Task 010 — recompute final clean federal HHG carrier cohort + fresh L&I revalidation.
 * Does NOT publish. Does NOT call Google Places. Does NOT include identity-review.
 *
 * npm run select:federal-hhg-wave4
 * npm run select:federal-hhg-wave4 -- --skip-li   (staging-only dry analysis)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { classifyFederalHhgDockets, type LiAuthorityRow } from '../lib/federal-hhg/classify';
import { normalizeUsdot } from '../lib/federal-hhg/normalize';
import { selectWaveCandidates, waveSelectionStats } from '../lib/federal-hhg/select-wave';
import {
  US_STATES_AND_DC,
  WAVE_4_ID,
  WAVE_4_PUBLICATION_ID,
  isWave1Eligible,
  type StagedPublicationRow,
} from '../lib/federal-hhg/wave-eligibility';

const SOURCE = 'FMCSA L&I carrier file (data.transportation.gov/6eyk-hxee)';
const LI_RESOURCE = 'https://data.transportation.gov/resource/6eyk-hxee.json';
const META_URL = 'https://data.transportation.gov/api/views/6eyk-hxee.json';

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

type ExclusionReason =
  | 'already_published_wave'
  | 'canonical_usdot_collision'
  | 'not_eligible_gate'
  | 'ROLE_CHANGED'
  | 'AUTHORITY_CHANGED'
  | 'INACTIVE'
  | 'HHG_AUTHORITY_LOST'
  | 'became_broker_only'
  | 'became_carrier_broker'
  | 'not_us_dc'
  | 'li_fetch_failed'
  | 'li_no_rows'
  | 'identity_review_disposition';

async function fetchLiMetadata(): Promise<{
  rowsUpdatedAt: string;
  viewLastModified: string;
  descriptionNote: string;
  rowCountHint: number | null;
}> {
  const res = await fetch(META_URL);
  if (!res.ok) throw new Error(`L&I metadata HTTP ${res.status}`);
  const meta = (await res.json()) as {
    rowsUpdatedAt?: number;
    viewLastModified?: number;
    description?: string;
    columns?: Array<{ cachedContents?: { count?: string } }>;
  };
  return {
    rowsUpdatedAt: meta.rowsUpdatedAt
      ? new Date(meta.rowsUpdatedAt * 1000).toISOString()
      : 'unknown',
    viewLastModified: meta.viewLastModified
      ? new Date(meta.viewLastModified * 1000).toISOString()
      : 'unknown',
    descriptionNote: (meta.description ?? '').slice(0, 400),
    rowCountHint: meta.columns?.[0]?.cachedContents?.count
      ? Number(meta.columns[0].cachedContents.count)
      : null,
  };
}

async function fetchLiForUsdots(usdots: string[]): Promise<Map<string, LiAuthorityRow[]>> {
  const out = new Map<string, LiAuthorityRow[]>();
  const chunkSize = 40;
  for (let i = 0; i < usdots.length; i += chunkSize) {
    const chunk = usdots.slice(i, i + chunkSize);
    // Pad to 8 digits as L&I often stores zero-padded DOT numbers.
    const padded = chunk.map((d) => d.padStart(8, '0'));
    const orClauses = [
      ...chunk.map((d) => `dot_number='${d}'`),
      ...padded.map((d) => `dot_number='${d}'`),
    ];
    const where = orClauses.join(' OR ');
    const url = `${LI_RESOURCE}?$where=${encodeURIComponent(where)}&$limit=5000`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`L&I batch fetch HTTP ${res.status} at offset ${i}`);
    }
    const rows = (await res.json()) as Array<Record<string, string>>;
    for (const raw of rows) {
      const usdot = normalizeUsdot(raw.dot_number ?? '');
      if (!usdot) continue;
      const mapped: LiAuthorityRow = {
        dotNumber: usdot,
        docketNumber: raw.docket_number ?? '',
        legalName: raw.legal_name ?? '',
        dbaName: raw.dba_name ?? null,
        hhgChk: raw.hhg_chk ?? 'N',
        propertyChk: raw.property_chk ?? 'N',
        commonStat: raw.common_stat ?? 'N',
        contractStat: raw.contract_stat ?? 'N',
        brokerStat: raw.broker_stat ?? 'N',
      };
      const list = out.get(usdot) ?? [];
      list.push(mapped);
      out.set(usdot, list);
    }
    // Be polite to Socrata.
    await new Promise((r) => setTimeout(r, 120));
  }
  return out;
}

async function main() {
  loadEnv();
  const skipLi = process.argv.includes('--skip-li');
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const retrievedAt = new Date().toISOString();
  const meta = await fetchLiMetadata();

  const waves = await client.query(`
    SELECT wave_id, count(*)::int AS n
      FROM federal_hhg_wave_publication
     WHERE status <> 'unpublished'
     GROUP BY 1 ORDER BY 1
  `);
  const companies = await client.query(
    `SELECT count(*)::int AS n, count(*) FILTER (WHERE indexable)::int AS indexable FROM companies`
  );
  const publishedDots = await client.query(
    `SELECT usdot FROM federal_hhg_wave_publication WHERE status <> 'unpublished'`
  );
  const existing = await client.query(`SELECT id, slug, usdot_number FROM companies`);
  const stagingRun = await client.query(
    `SELECT source, source_updated_at, finished_at, google_places_requests
       FROM federal_hhg_staging_run
      ORDER BY started_at DESC LIMIT 1`
  );
  const overlay = await client
    .query(`SELECT count(*)::int AS n FROM federal_hhg_identity_resolution`)
    .catch(() => ({ rows: [{ n: 0 }] }));

  const clean = await client.query(`
    SELECT usdot, mc, legal_name, dba_name, phy_city, phy_state, phone,
           classification, disposition, hhg_carrier_verified, hhg_broker_verified,
           retrieved_at, match_reason
      FROM federal_hhg_staging
     WHERE disposition = 'NEW_CANONICAL_CANDIDATE'
       AND classification = 'HHG_CARRIER'
  `);
  await client.end();

  const taken = new Set([
    ...(publishedDots.rows as Array<{ usdot: string }>).map((r) => normalizeUsdot(r.usdot)),
    ...(existing.rows as Array<{ usdot_number: string | null }>)
      .map((r) => normalizeUsdot(r.usdot_number ?? ''))
      .filter(Boolean),
  ]);

  const exclusions: Record<string, number> = {};
  const bump = (reason: ExclusionReason) => {
    exclusions[reason] = (exclusions[reason] ?? 0) + 1;
  };

  const stagedRemaining: StagedPublicationRow[] = [];
  for (const row of clean.rows as StagedPublicationRow[]) {
    const usdot = normalizeUsdot(row.usdot);
    if (!usdot) continue;
    if (row.disposition !== 'NEW_CANONICAL_CANDIDATE') {
      bump('identity_review_disposition');
      continue;
    }
    if (taken.has(usdot)) {
      bump('already_published_wave');
      continue;
    }
    const gate = isWave1Eligible(row);
    if (!gate.eligible) {
      bump('not_eligible_gate');
      continue;
    }
    if (row.classification !== 'HHG_CARRIER' || !row.hhg_carrier_verified) {
      bump('ROLE_CHANGED');
      continue;
    }
    const state = (row.phy_state ?? '').trim().toUpperCase();
    if (!US_STATES_AND_DC.has(state)) {
      bump('not_us_dc');
      continue;
    }
    stagedRemaining.push(row);
  }

  let liMap = new Map<string, LiAuthorityRow[]>();
  const liExclusions: Record<string, number> = {};
  const revalidated: StagedPublicationRow[] = [];

  if (!skipLi) {
    const dots = stagedRemaining.map((r) => normalizeUsdot(r.usdot));
    liMap = await fetchLiForUsdots(dots);
    for (const row of stagedRemaining) {
      const usdot = normalizeUsdot(row.usdot);
      const liRows = liMap.get(usdot) ?? [];
      if (!liRows.length) {
        liExclusions.li_no_rows = (liExclusions.li_no_rows ?? 0) + 1;
        continue;
      }
      const classified = classifyFederalHhgDockets(liRows);
      if (classified.classification === 'INACTIVE' || classified.classification === 'NOT_HHG') {
        const key =
          classified.classification === 'NOT_HHG' ? 'HHG_AUTHORITY_LOST' : 'INACTIVE';
        liExclusions[key] = (liExclusions[key] ?? 0) + 1;
        continue;
      }
      if (classified.classification === 'HHG_BROKER') {
        liExclusions.became_broker_only = (liExclusions.became_broker_only ?? 0) + 1;
        continue;
      }
      if (classified.classification === 'HHG_CARRIER_BROKER') {
        liExclusions.became_carrier_broker = (liExclusions.became_carrier_broker ?? 0) + 1;
        continue;
      }
      if (classified.classification !== 'HHG_CARRIER' || !classified.hhgCarrierVerified) {
        liExclusions.ROLE_CHANGED = (liExclusions.ROLE_CHANGED ?? 0) + 1;
        continue;
      }
      // Prefer fresh MC from L&I when present.
      revalidated.push({
        ...row,
        mc: classified.mc ?? row.mc,
        classification: 'HHG_CARRIER',
        hhg_carrier_verified: true,
        hhg_broker_verified: false,
        retrieved_at: retrievedAt,
      });
    }
  } else {
    revalidated.push(...stagedRemaining);
  }

  // Deterministic geographic selection of the full remaining clean set.
  const selected = selectWaveCandidates(revalidated, {
    limit: revalidated.length,
    perStateCap: 10_000,
    maxBrokers: 0,
    maxDuals: 0,
  });

  const docsDir = resolve(process.cwd(), 'docs');
  if (!existsSync(docsDir)) mkdirSync(docsDir, { recursive: true });

  const freshnessDecision =
    meta.rowsUpdatedAt >= '2026-08-18'
      ? 'USE_CURRENT_OFFICIAL_LI — dataset rows updated on/after 2026-08-18; revalidated each candidate via Socrata API'
      : 'USE_CURRENT_OFFICIAL_LI_WITH_CAUTION';

  const manifest = {
    google_places_requests: 0,
    task: '010',
    publication_wave_id: WAVE_4_PUBLICATION_ID,
    candidate_wave_id: WAVE_4_ID,
    publish: false,
    source: SOURCE,
    freshness: {
      dataset: '6eyk-hxee',
      rows_updated_at: meta.rowsUpdatedAt,
      view_last_modified: meta.viewLastModified,
      retrieval_timestamp: retrievedAt,
      row_count_hint: meta.rowCountHint,
      description_note: meta.descriptionNote,
      decision: freshnessDecision,
      skip_li: skipLi,
      candidates_li_inspected: skipLi ? 0 : stagedRemaining.length,
      li_usdots_with_rows: liMap.size,
    },
    baseline: {
      companies: companies.rows[0],
      waves: waves.rows,
      staging_run: stagingRun.rows[0] ?? null,
      identity_overlay: overlay.rows[0]?.n ?? 0,
    },
    staging_pool: {
      clean_carrier_new_canonical: (clean.rows as unknown[]).length,
      remaining_after_taken_filter: stagedRemaining.length,
      exclusions_pre_li: exclusions,
    },
    li_revalidation: {
      exclusions: liExclusions,
      remaining_after_li: revalidated.length,
    },
    selected: waveSelectionStats(selected),
    historical_expected_approx: 923,
    note: '923 was historical expectation only; exact count is recomputed and L&I-revalidated.',
    candidates: selected.map((row, index) => ({
      wave_id: WAVE_4_ID,
      status: 'candidate',
      selection_rank: index + 1,
      selection_reason: 'deterministic_final_clean_carrier_round_robin_state',
      usdot: normalizeUsdot(row.usdot),
      mc: row.mc,
      classification: 'HHG_CARRIER',
      legal_name: row.legal_name,
      dba_name: row.dba_name,
      city: row.phy_city,
      state: (row.phy_state ?? '').trim().toUpperCase(),
      phone: row.phone,
      source: SOURCE,
      retrieved_at: row.retrieved_at ?? retrievedAt,
      li_revalidated: !skipLi,
    })),
  };

  const outPath = resolve(docsDir, 'task-010-final-clean-selection.json');
  writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(
    JSON.stringify(
      {
        wrote: outPath,
        google_places_requests: 0,
        remaining_after_li: revalidated.length,
        selected: manifest.selected.total,
        exclusions_pre_li: exclusions,
        li_exclusions: liExclusions,
        freshness: manifest.freshness,
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
