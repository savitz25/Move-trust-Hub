/**
 * Task 010 canary QA — Wave 4 noindex profiles + freeze checks.
 * Never calls Google Places.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { WAVE_4_PUBLICATION_ID } from '../lib/federal-hhg/wave-eligibility';

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
  const wave = await client.query(
    `SELECT count(*)::int AS n,
            count(*) FILTER (WHERE status = 'published')::int AS published,
            count(*) FILTER (WHERE status = 'indexable')::int AS indexable_rows
       FROM federal_hhg_wave_publication WHERE wave_id = $1 AND status <> 'unpublished'`,
    [WAVE_4_PUBLICATION_ID]
  );
  const sample = await client.query(
    `SELECT c.slug, c.usdot_number, c.publication_state, c.indexable, c.service_scope, c.entity_type
       FROM federal_hhg_wave_publication w
       JOIN companies c ON c.id = w.company_id
      WHERE w.wave_id = $1 AND w.status <> 'unpublished'
      ORDER BY w.usdot
      LIMIT 10`,
    [WAVE_4_PUBLICATION_ID]
  );
  const caps = await client.query(
    `SELECT pc.capability, count(*)::int AS n
       FROM federal_hhg_wave_publication w
       JOIN provider_capability pc ON pc.company_id = w.company_id
      WHERE w.wave_id = $1 AND w.status <> 'unpublished'
      GROUP BY 1 ORDER BY 1`,
    [WAVE_4_PUBLICATION_ID]
  );
  const totals = await client.query(
    `SELECT count(*)::int AS companies,
            count(*) FILTER (WHERE indexable)::int AS indexable
       FROM companies`
  );
  const prior = await client.query(
    `SELECT wave_id, count(*)::int AS n FROM federal_hhg_wave_publication
      WHERE status <> 'unpublished' GROUP BY 1 ORDER BY 1`
  );
  await client.end();

  const rows = sample.rows as Array<{
    slug: string;
    indexable: boolean;
    publication_state: string;
    service_scope: string;
    entity_type: string;
  }>;
  const badIndexable = rows.filter((r) => r.indexable).length;
  const badScope = rows.filter((r) => r.service_scope !== 'interstate').length;
  const report = {
    google_places_requests: 0,
    wave4: wave.rows[0],
    sample: rows,
    capabilities: caps.rows,
    totals: totals.rows[0],
    prior_waves: prior.rows,
    checks: {
      canary_not_indexable: badIndexable === 0,
      interstate_only: badScope === 0,
      carrier_capability_only: (caps.rows as Array<{ capability: string }>).every(
        (c) => c.capability === 'hhg_interstate_carrier'
      ),
      no_local_auto_caps: !(caps.rows as Array<{ capability: string }>).some((c) =>
        /local|auto|intrastate/i.test(c.capability)
      ),
    },
  };
  writeFileSync(
    resolve(process.cwd(), 'docs/task-010-canary-qa.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(JSON.stringify(report, null, 2));
  const ok = Object.values(report.checks).every(Boolean);
  if (!ok) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
