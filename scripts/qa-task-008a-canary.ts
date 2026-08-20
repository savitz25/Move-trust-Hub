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
  const samples = await client.query(`
    SELECT c.slug, c.usdot_number, c.entity_type, c.indexable
      FROM federal_hhg_wave_publication w
      JOIN companies c ON c.id = w.company_id
     WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_3' AND w.status <> 'unpublished'
     ORDER BY c.usdot_number
     LIMIT 30
  `);
  await client.end();
  const results = [];
  for (const row of samples.rows) {
    const res = await fetch(`https://www.movetrusthub.com/companies/${row.slug}`, { redirect: 'manual' });
    const html = await res.text();
    const failures: string[] = [];
    if (res.status !== 200) failures.push(`status ${res.status}`);
    if (!html.includes(String(row.usdot_number))) failures.push('missing USDOT');
    if (row.entity_type !== 'Carrier') failures.push('role');
    if (/All 50 States/.test(html)) failures.push('false national');
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((m) => m[1] ?? '')
      .join('\n');
    if (/aggregateRating/.test(ld)) failures.push('aggregateRating');
    const robots = html.match(/name="robots" content="([^"]+)"/)?.[1] ?? '';
    results.push({ slug: row.slug, status: res.status, robots, ok: failures.length === 0, failures });
  }
  const report = { google_places_requests: 0, sampled: results.length, failed: results.filter((r) => !r.ok).length, results };
  writeFileSync(resolve(process.cwd(), 'docs/task-008a-canary-qa.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ sampled: report.sampled, failed: report.failed, google_places_requests: 0 }, null, 2));
  if (report.failed) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
