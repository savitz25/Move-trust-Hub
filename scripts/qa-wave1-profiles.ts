import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

function loadEnv() {
  const raw = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
  for (const line of raw.split('\n')) {
    const m = line.trim().match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    const k = m[1].trim();
    const v = m[2].trim().replace(/^["']|["']$/g, '');
    if (!process.env[k]) process.env[k] = v;
    if (!process.env.DATABASE_URL && /^postgres/.test(v)) process.env.DATABASE_URL = v;
  }
}

const BASE = process.env.QA_BASE_URL || 'http://127.0.0.1:3014';

async function fetchHtml(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'x-forwarded-proto': 'https' },
    redirect: 'manual',
  });
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
    SELECT DISTINCT ON (w.classification) w.classification, c.slug, c.name, c.usdot_number, c.mc_number, c.entity_type
      FROM federal_hhg_wave_publication w
      JOIN companies c ON c.id = w.company_id
     WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1' AND w.status <> 'unpublished'
     ORDER BY w.classification, c.slug
  `);
  const extra = await client.query(`
    SELECT c.slug, c.name, c.phone, c.fmcsa_legal_name
      FROM federal_hhg_wave_publication w
      JOIN companies c ON c.id = w.company_id
     WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1'
     LIMIT 8
  `);
  await client.end();

  const results = [];
  for (const row of samples.rows) {
    const page = await fetchHtml(`/companies/${row.slug}`);
    const failures: string[] = [];
    if (page.status !== 200) failures.push(`status ${page.status}`);
    if (!page.html.includes(row.usdot_number)) failures.push('missing USDOT');
    if (row.mc_number && !page.html.includes(String(row.mc_number))) failures.push('missing MC');
    if (/3BR, cross-country/.test(page.html) && /Est. avg. price/.test(page.html) && /\$0/.test(page.html)) {
      failures.push('zero price displayed');
    }
    if (/All 50 States/.test(page.html)) failures.push('false national coverage');

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

  const home = await fetchHtml('/');
  const dir = await fetchHtml('/companies');
  const sitemap = await fetchHtml('/sitemap.xml');
  const companyUrls = (sitemap.html.match(/\/companies\//g) ?? []).length;

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        samples: results,
        home: home.status,
        directory: dir.status,
        sitemapCompanies: companyUrls,
        extra: extra.rows.map((r: { slug: string }) => r.slug),
      },
      null,
      2
    )
  );
  if (results.some((row) => !row.ok) || home.status !== 200 || dir.status !== 200) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
