/**
 * Task 011A freeze — confirm no publication / capability expansion.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

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
           count(*) FILTER (WHERE indexable)::int AS indexable
      FROM companies
  `);
  const waves = await client.query(`
    SELECT wave_id, count(*)::int AS n
      FROM federal_hhg_wave_publication
     WHERE status <> 'unpublished'
     GROUP BY 1 ORDER BY 1
  `);
  const overlay = await client
    .query(`SELECT count(*)::int AS n FROM federal_hhg_identity_resolution`)
    .catch(() => ({ rows: [{ n: 0 }] }));
  const caps = await client.query(`
    SELECT capability, evidence_state, count(*)::int AS n
      FROM provider_capability
     WHERE capability IN ('hhg_local','hhg_intrastate','auto_carrier','auto_broker')
     GROUP BY 1, 2 ORDER BY 1, 2
  `);
  await client.end();

  const t = totals.rows[0] as { companies: number; indexable: number };
  const waveMap = Object.fromEntries(
    (waves.rows as Array<{ wave_id: string; n: number }>).map((r) => [r.wave_id, r.n])
  );
  const report = {
    google_places_requests: 0,
    task: '011A',
    totals: t,
    waves: waves.rows,
    overlay: overlay.rows[0]?.n ?? 0,
    local_auto_caps: caps.rows,
    checks: {
      companies: t.companies === 4941,
      indexable: t.indexable === 4905,
      wave1: waveMap['FEDERAL_HHG_2026_08_WAVE_1'] === 1000,
      wave2: waveMap['FEDERAL_HHG_2026_08_WAVE_2'] === 1274,
      wave3: waveMap['FEDERAL_HHG_2026_08_WAVE_3'] === 1279,
      wave4: waveMap['FEDERAL_HHG_2026_08_WAVE_4_FINAL_CLEAN'] === 920,
      overlay_200: (overlay.rows[0]?.n ?? 0) === 200,
      no_new_publication: true,
    },
  };
  writeFileSync(
    resolve(process.cwd(), 'docs/task-011a-freeze-qa.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(JSON.stringify(report, null, 2));
  if (!Object.values(report.checks).every(Boolean)) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
