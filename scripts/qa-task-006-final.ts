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
  const unsafe = await client.query(`
    SELECT
      (SELECT count(*)::int FROM federal_hhg_wave_publication w
        JOIN federal_hhg_staging s ON regexp_replace(s.usdot,'\\D','','g') = regexp_replace(w.usdot,'\\D','','g')
       WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_2' AND w.status <> 'unpublished'
         AND s.disposition <> 'NEW_CANONICAL_CANDIDATE') AS review_published,
      (SELECT count(*)::int FROM provider_capability pc
        JOIN federal_hhg_wave_publication w ON w.company_id = pc.company_id
       WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_2' AND w.status <> 'unpublished'
         AND pc.capability IN ('hhg_local','hhg_intrastate','auto_carrier','auto_broker')) AS false_caps,
      (SELECT count(*)::int FROM federal_hhg_wave_publication
        WHERE wave_id = 'FEDERAL_HHG_2026_08_WAVE_1' AND status <> 'unpublished') AS wave1,
      (SELECT count(*)::int FROM federal_hhg_wave_publication
        WHERE wave_id = 'FEDERAL_HHG_2026_08_WAVE_2' AND status <> 'unpublished') AS wave2,
      (SELECT count(*)::int FROM companies) AS companies
  `);
  const samples = await client.query(`
    SELECT w.classification, c.slug, c.usdot_number
      FROM federal_hhg_wave_publication w
      JOIN companies c ON c.id = w.company_id
     WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_2' AND w.status <> 'unpublished'
     ORDER BY w.classification, c.usdot_number
  `);
  await client.end();

  const pick = (role: string, n: number) =>
    samples.rows.filter((r) => r.classification === role).slice(0, n);
  const chosen = [...pick('HHG_CARRIER', 20), ...pick('HHG_BROKER', 20)];
  const results = [];
  for (const row of chosen) {
    const res = await fetch(`https://www.movetrusthub.com/companies/${row.slug}`, { redirect: 'manual' });
    const html = await res.text();
    const failures: string[] = [];
    if (res.status !== 200) failures.push(`status ${res.status}`);
    if (!html.includes(String(row.usdot_number))) failures.push('missing USDOT');
    if (/All 50 States/.test(html)) failures.push('false national');
    results.push({ slug: row.slug, classification: row.classification, status: res.status, ok: failures.length === 0, failures });
  }
  const report = { google_places_requests: 0, unsafe: unsafe.rows[0], sampled: results.length, failed: results.filter((r) => !r.ok).length, results };
  writeFileSync(resolve(process.cwd(), 'docs/task-006-final-qa.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ unsafe: report.unsafe, sampled: report.sampled, failed: report.failed, google_places_requests: 0 }, null, 2));
  if (report.failed || report.unsafe.review_published || report.unsafe.false_caps || report.unsafe.wave1 !== 1000 || report.unsafe.wave2 !== 1274) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
