/**
 * Task 005 van-line + Wave 1 + raw-classification audit. Never prints secrets.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { extractUsdotFromFmcsaRaw } from '../lib/companies/public-display-name';
import { TASK_002_PROTECTED_IDENTITIES } from '../lib/federal-hhg/protected-identities';
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

async function main() {
  loadEnv();
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const wave = await client.query(`
    SELECT count(*)::int AS n,
           count(*) FILTER (WHERE status <> 'unpublished')::int AS live,
           count(*) FILTER (WHERE status = 'indexable')::int AS indexable
      FROM public.federal_hhg_wave_publication
     WHERE wave_id = 'FEDERAL_HHG_2026_08_WAVE_1'
  `);
  const waveRoles = await client.query(`
    SELECT classification, count(*)::int AS n
      FROM public.federal_hhg_wave_publication
     WHERE wave_id = 'FEDERAL_HHG_2026_08_WAVE_1' AND status <> 'unpublished'
     GROUP BY 1 ORDER BY 1
  `);
  const companies = await client.query(`
    SELECT count(*)::int AS n,
           count(*) FILTER (WHERE indexable)::int AS indexable
      FROM public.companies
  `);

  const rawRows = await client.query(
    `SELECT id, usdot_number, fmcsa_raw FROM public.companies WHERE fmcsa_raw IS NOT NULL`
  );
  const classes = {
    MATCH: 0,
    RAW_USDOT_MISSING: 0,
    MISMATCH: 0,
    CANONICAL_USDOT_MISSING: 0,
    UNPARSABLE: 0,
  };
  for (const row of rawRows.rows as Array<{
    usdot_number: string | null;
    fmcsa_raw: unknown;
  }>) {
    const canonical = normalizeUsdot(row.usdot_number ?? '');
    let rawDot: string | null = null;
    try {
      rawDot = extractUsdotFromFmcsaRaw(row.fmcsa_raw);
    } catch {
      classes.UNPARSABLE += 1;
      continue;
    }
    if (!canonical && rawDot) classes.CANONICAL_USDOT_MISSING += 1;
    else if (canonical && !rawDot) classes.RAW_USDOT_MISSING += 1;
    else if (!canonical && !rawDot) classes.RAW_USDOT_MISSING += 1;
    else if (canonical === rawDot) classes.MATCH += 1;
    else classes.MISMATCH += 1;
  }

  const van = await client.query(
    `SELECT id, slug, name, fmcsa_legal_name, usdot_number, mc_number,
            publication_state, indexable, fmcsa_raw IS NOT NULL AS has_raw
       FROM public.companies
      WHERE id = ANY($1::text[])
      ORDER BY 1`,
    [Object.keys(TASK_002_PROTECTED_IDENTITIES)]
  );

  const remaining = await client.query(`
    SELECT classification, count(*)::int AS n
      FROM federal_hhg_staging
     WHERE disposition = 'NEW_CANONICAL_CANDIDATE'
       AND usdot NOT IN (
         SELECT usdot FROM federal_hhg_wave_publication WHERE status <> 'unpublished'
       )
     GROUP BY 1 ORDER BY 1
  `);

  await client.end();

  const report = {
    google_places_requests: 0,
    companies: companies.rows[0],
    wave: wave.rows[0],
    waveRoles: waveRoles.rows,
    rawClassification: classes,
    vanLines: van.rows,
    remainingUnpublished: remaining.rows,
  };
  writeFileSync(
    resolve(process.cwd(), 'docs/task-005-vanline-raw-audit.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(JSON.stringify(report, null, 2));
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
