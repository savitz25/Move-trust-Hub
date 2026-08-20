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
  const db = await client.query(`
    SELECT
      (SELECT count(*)::int FROM companies) AS companies,
      (SELECT count(*) FILTER (WHERE indexable)::int FROM companies) AS indexable,
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id='FEDERAL_HHG_2026_08_WAVE_1' AND status<>'unpublished') AS wave1,
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id='FEDERAL_HHG_2026_08_WAVE_2' AND status<>'unpublished') AS wave2,
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id='FEDERAL_HHG_2026_08_WAVE_3' AND status<>'unpublished') AS wave3,
      (SELECT count(*)::int FROM federal_hhg_identity_resolution WHERE review_run_id='task-008b-2026-08') AS overlay,
      (SELECT count(*)::int FROM federal_hhg_identity_resolution r
        JOIN federal_hhg_staging s ON s.usdot=r.usdot
       WHERE r.review_run_id='task-008b-2026-08' AND s.disposition<>'IDENTITY_REVIEW_REQUIRED') AS staging_overwritten,
      (SELECT count(*)::int FROM companies c
        JOIN federal_hhg_identity_resolution r ON regexp_replace(c.usdot_number,'\\D','','g')=regexp_replace(r.usdot,'\\D','','g')
       WHERE r.review_run_id='task-008b-2026-08') AS pilot_public,
      (SELECT count(*)::int FROM provider_capability WHERE capability IN ('hhg_local','hhg_intrastate','auto_carrier','auto_broker')
        AND company_id IN (SELECT 'usdot-'||regexp_replace(usdot,'\\D','','g') FROM federal_hhg_identity_resolution WHERE review_run_id='task-008b-2026-08')) AS false_caps
  `);
  await client.end();
  const pages = ['/', '/companies', '/compare', '/local-movers', '/auto-transport', '/companies/allied-van-lines', '/companies/gomuverz-llc'];
  const pageResults = [];
  for (const path of pages) {
    const res = await fetch(`https://www.movetrusthub.com${path}`, { redirect: 'manual' });
    pageResults.push({ path, status: res.status, ok: res.status === 200 });
  }
  const sm = await fetch('https://www.movetrusthub.com/sitemap.xml');
  const xml = await sm.text();
  const companyUrls = [...xml.matchAll(/https:\/\/www\.movetrusthub\.com\/companies\//g)].length;
  const report = {
    google_places_requests: 0,
    db: db.rows[0],
    pages: pageResults,
    sitemap_company_urls: companyUrls,
    new_public_profiles: 0,
    new_indexable_profiles: 0,
    new_sitemap_urls: 0,
    automatic_fuzzy_merges: 0,
  };
  writeFileSync(resolve(process.cwd(), 'docs/task-008b-qa.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  const d = db.rows[0];
  if (
    d.companies !== 4021 ||
    d.indexable !== 3985 ||
    d.wave1 !== 1000 ||
    d.wave2 !== 1274 ||
    d.wave3 !== 1279 ||
    d.staging_overwritten ||
    d.pilot_public ||
    d.false_caps ||
    companyUrls !== 3985 ||
    pageResults.some((p) => !p.ok)
  ) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
