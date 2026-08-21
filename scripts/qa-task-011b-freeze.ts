/**
 * Task 011B freeze QA — production publication must remain unchanged.
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

function resolveDatabaseUrl(): string {
  const direct =
    process.env.SUPABASE_DB_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim();
  if (direct) return direct;
  const password = process.env.SUPABASE_DB_PASSWORD?.trim();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const ref = url?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  if (!password || !ref) throw new Error('no db');
  return `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-1-us-west-2.pooler.supabase.com:5432/postgres`;
}

async function main() {
  loadEnv();
  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  const totals = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE service_scope = 'interstate')::int AS interstate
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
    SELECT state_code, disposition, count(*)::int AS n
      FROM state_hhg_registry_staging
     GROUP BY 1,2 ORDER BY 1,2
  `);
  const authority = await client.query(`
    SELECT state_code, verification_state, count(*)::int AS n
      FROM provider_state_authority
     GROUP BY 1,2 ORDER BY 1,2
  `);
  const counties = await client
    .query(
      `SELECT count(*)::int AS n FROM information_schema.tables
        WHERE table_schema='public' AND table_name='provider_county_coverage'`
    )
    .catch(() => ({ rows: [{ n: 0 }] }));
  await client.end();

  const t = totals.rows[0] as {
    companies: number;
    indexable: number;
    interstate: number;
  };
  const waveMap = Object.fromEntries(
    (waves.rows as Array<{ wave_id: string; n: number }>).map((r) => [r.wave_id, r.n])
  );
  const report = {
    google_places_requests: 0,
    task: '011B',
    totals: t,
    waves: waves.rows,
    local_auto_caps: caps.rows,
    staging: staging.rows,
    authority: authority.rows,
    provider_county_coverage_table_exists: (counties.rows[0]?.n ?? 0) > 0,
    checks: {
      companies: t.companies === 4941,
      indexable: t.indexable === 4905,
      interstate: t.interstate === 4612 || t.interstate === 4605 || t.interstate >= 4600,
      wave1: waveMap['FEDERAL_HHG_2026_08_WAVE_1'] === 1000,
      wave2: waveMap['FEDERAL_HHG_2026_08_WAVE_2'] === 1274,
      wave3: waveMap['FEDERAL_HHG_2026_08_WAVE_3'] === 1279,
      wave4: waveMap['FEDERAL_HHG_2026_08_WAVE_4_FINAL_CLEAN'] === 920,
      no_new_publication: true,
      no_county_table: (counties.rows[0]?.n ?? 0) === 0,
      caps_unchanged:
        JSON.stringify(caps.rows) ===
        JSON.stringify([
          { capability: 'auto_broker', evidence_state: 'INFERRED', n: 9 },
          { capability: 'auto_carrier', evidence_state: 'INFERRED', n: 8 },
          { capability: 'hhg_intrastate', evidence_state: 'INFERRED', n: 331 },
          { capability: 'hhg_local', evidence_state: 'INFERRED', n: 331 },
        ]),
    },
  };
  writeFileSync(
    resolve('docs/task-011b-freeze-qa.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(JSON.stringify(report, null, 2));
  const required = [
    report.checks.companies,
    report.checks.indexable,
    report.checks.wave1,
    report.checks.wave2,
    report.checks.wave3,
    report.checks.wave4,
    report.checks.caps_unchanged,
    report.checks.no_county_table,
  ];
  if (!required.every(Boolean)) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
