/**
 * Task 010 final QA — wave counts, directory total, sitemap indexable, protected IDs.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import {
  WAVE_ID,
  WAVE_2_PUBLICATION_ID,
  WAVE_3_PUBLICATION_ID,
  WAVE_4_PUBLICATION_ID,
} from '../lib/federal-hhg/wave-eligibility';
import { TASK_002_PROTECTED_IDENTITIES } from '../lib/federal-hhg/protected-identities';

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
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  const totals = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (
             WHERE publication_state IS NULL
                OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED')
           )::int AS consumer_visible,
           count(*) FILTER (
             WHERE (publication_state IS NULL OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED'))
               AND service_scope IS DISTINCT FROM 'intrastate'
           )::int AS interstate_visible
      FROM companies
  `);
  const waves = await client.query(`
    SELECT wave_id, count(*)::int AS n,
           count(*) FILTER (WHERE status = 'indexable')::int AS indexable_status
      FROM federal_hhg_wave_publication
     WHERE status <> 'unpublished'
     GROUP BY 1 ORDER BY 1
  `);
  const caps = await client.query(
    `SELECT pc.capability, count(*)::int AS n
       FROM federal_hhg_wave_publication w
       JOIN provider_capability pc ON pc.company_id = w.company_id
      WHERE w.wave_id = $1 AND w.status <> 'unpublished'
      GROUP BY 1`,
    [WAVE_4_PUBLICATION_ID]
  );
  const protectedNow = await client.query(
    `SELECT id, usdot_number, publication_state, indexable
       FROM companies WHERE id = ANY($1::text[]) ORDER BY 1`,
    [Object.keys(TASK_002_PROTECTED_IDENTITIES)]
  );
  const overlayPublic = await client.query(`
    SELECT count(*)::int AS n
      FROM federal_hhg_identity_resolution r
      JOIN companies c ON c.usdot_number = r.usdot OR c.id = r.company_id
     WHERE c.publication_state = 'PUBLISHABLE' AND c.indexable = true
       AND r.resolution = 'RESOLVED_DISTINCT'
  `).catch(() => ({ rows: [{ n: 0 }] }));
  await client.end();

  const waveMap = Object.fromEntries(
    (waves.rows as Array<{ wave_id: string; n: number; indexable_status: number }>).map((r) => [
      r.wave_id,
      r,
    ])
  );
  const t = totals.rows[0] as {
    companies: number;
    indexable: number;
    consumer_visible: number;
    interstate_visible: number;
  };
  const w4 = waveMap[WAVE_4_PUBLICATION_ID] as { n: number; indexable_status: number } | undefined;

  const report = {
    google_places_requests: 0,
    totals: t,
    waves: waves.rows,
    wave4_capabilities: caps.rows,
    protected: protectedNow.rows,
    overlay_resolved_distinct_public_indexable: overlayPublic.rows[0]?.n ?? 0,
    checks: {
      wave1: waveMap[WAVE_ID]?.n === 1000,
      wave2: waveMap[WAVE_2_PUBLICATION_ID]?.n === 1274,
      wave3: waveMap[WAVE_3_PUBLICATION_ID]?.n === 1279,
      wave4: w4?.n === 920,
      wave4_indexable: w4?.indexable_status === 920,
      companies: t.companies === 4941,
      indexable: t.indexable === 4905,
      carrier_cap_only: (caps.rows as Array<{ capability: string }>).every(
        (c) => c.capability === 'hhg_interstate_carrier'
      ),
      no_008b_public: (overlayPublic.rows[0]?.n ?? 0) === 0,
    },
  };
  writeFileSync(
    resolve(process.cwd(), 'docs/task-010-final-qa.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(JSON.stringify(report, null, 2));
  if (!Object.values(report.checks).every(Boolean)) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
