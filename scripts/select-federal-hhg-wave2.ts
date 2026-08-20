/**
 * Task 005 — select (do not publish) Federal HHG Wave 2 candidates.
 * Fail-closed: NEW_CANONICAL_CANDIDATE only, US+DC, never REVIEW_REQUIRED/INACTIVE.
 *
 * npm run select:federal-hhg-wave2:dry -- --limit 500
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { selectWaveCandidates, waveSelectionStats } from '../lib/federal-hhg/select-wave';
import {
  WAVE_ID,
  WAVE_2_ID,
  isWave1Eligible,
  type StagedPublicationRow,
} from '../lib/federal-hhg/wave-eligibility';
import { normalizeUsdot } from '../lib/federal-hhg/normalize';

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

function argNum(flag: string, fallback: number): number {
  const idx = process.argv.indexOf(flag);
  if (idx >= 0 && process.argv[idx + 1]) return Number(process.argv[idx + 1]);
  return fallback;
}

async function main() {
  loadEnv();
  const limit = argNum('--limit', 500);
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const staged = await client.query(`
    SELECT usdot, mc, legal_name, dba_name, phy_city, phy_state, phone,
           classification, disposition, hhg_carrier_verified, hhg_broker_verified, retrieved_at
      FROM public.federal_hhg_staging
     WHERE disposition = 'NEW_CANONICAL_CANDIDATE'
       AND classification IN ('HHG_CARRIER','HHG_BROKER','HHG_CARRIER_BROKER')
  `);
  const published = await client.query(
    `SELECT usdot FROM public.federal_hhg_wave_publication WHERE status <> 'unpublished'`
  );
  const existing = await client.query(`SELECT usdot_number FROM public.companies`);
  await client.end();

  const taken = new Set<string>([
    ...(published.rows as Array<{ usdot: string }>).map((row) => normalizeUsdot(row.usdot)),
    ...(existing.rows as Array<{ usdot_number: string | null }>)
      .map((row) => normalizeUsdot(row.usdot_number ?? ''))
      .filter(Boolean),
  ]);

  const remaining = (staged.rows as StagedPublicationRow[]).filter((row) => {
    const usdot = normalizeUsdot(row.usdot);
    return usdot && !taken.has(usdot) && isWave1Eligible(row).eligible;
  });

  const selected = selectWaveCandidates(remaining, {
    limit,
    perStateCap: 16,
    maxBrokers: 80,
    maxDuals: Math.max(
      remaining.filter((row) => row.classification === 'HHG_CARRIER_BROKER').length,
      0
    ),
  });

  const report = {
    google_places_requests: 0,
    published_wave: WAVE_ID,
    proposed_wave: WAVE_2_ID,
    publish: false,
    remaining_eligible: remaining.length,
    selected: waveSelectionStats(selected),
    usdots: selected.map((row) => row.usdot),
  };

  writeFileSync(
    resolve(process.cwd(), 'docs/task-005-wave2-selection.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(
    JSON.stringify(
      {
        ...report,
        usdots: `${selected.length} USDOTs written to docs/task-005-wave2-selection.json`,
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
