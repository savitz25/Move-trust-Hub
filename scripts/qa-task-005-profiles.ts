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

async function fetchHtml(path: string) {
  const res = await fetch(`https://www.movetrusthub.com${path}`, { redirect: 'manual' });
  return { status: res.status, html: await res.text() };
}

async function main() {
  loadEnv();
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  const samples = await client.query(`
    SELECT w.classification, c.slug, c.usdot_number, c.mc_number, c.name
      FROM federal_hhg_wave_publication w
      JOIN companies c ON c.id = w.company_id
     WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1' AND w.status <> 'unpublished'
     ORDER BY w.classification, c.usdot_number
  `);
  await client.end();

  const pick = (role: string, n: number) =>
    samples.rows.filter((row) => row.classification === role).slice(0, n);

  const chosen = [
    ...pick('HHG_CARRIER', 20),
    ...pick('HHG_BROKER', 10),
    ...pick('HHG_CARRIER_BROKER', 10),
  ];

  const results = [];
  for (const row of chosen) {
    const page = await fetchHtml(`/companies/${row.slug}`);
    const failures: string[] = [];
    if (page.status !== 200) failures.push(`status ${page.status}`);
    if (!page.html.includes(String(row.usdot_number))) failures.push('missing USDOT');
    if (/All 50 States/.test(page.html)) failures.push('false national coverage');
    if (/aggregateRating/.test(page.html) && /application\/ld\+json/.test(page.html)) {
      const ld = [...page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
        .map((m) => m[1] ?? '')
        .join('\n');
      if (/aggregateRating/.test(ld)) failures.push('aggregateRating schema');
    }
    const robots = page.html.match(/name="robots" content="([^"]+)"/)?.[1] ?? '';
    results.push({
      classification: row.classification,
      slug: row.slug,
      status: page.status,
      robots,
      ok: failures.length === 0,
      failures,
    });
  }

  const report = {
    google_places_requests: 0,
    sampled: results.length,
    failed: results.filter((row) => !row.ok).length,
    results,
  };
  writeFileSync(resolve(process.cwd(), 'docs/task-005-profile-sample.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ sampled: report.sampled, failed: report.failed, google_places_requests: 0 }, null, 2));
  if (report.failed) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
