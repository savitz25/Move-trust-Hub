/**
 * Task 010 production QA — profiles, search API, sitemap, directory totals.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { WAVE_4_PUBLICATION_ID } from '../lib/federal-hhg/wave-eligibility';
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

async function fetchText(url: string) {
  const t0 = Date.now();
  const res = await fetch(url, { cache: 'no-store', redirect: 'follow' });
  const text = await res.text();
  return { status: res.status, ms: Date.now() - t0, text, headers: res.headers };
}

function median(values: number[]): number | null {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
}

async function timeUrl(url: string, n = 3) {
  const times: number[] = [];
  let lastStatus = 0;
  for (let i = 0; i < n; i++) {
    const r = await fetchText(`${url}${url.includes('?') ? '&' : '?'}cb=${i}-${Date.now()}`);
    times.push(r.ms);
    lastStatus = r.status;
  }
  return { url, samples: n, times, medianMs: median(times), status: lastStatus };
}

async function main() {
  loadEnv();
  const base = process.env.TASK_010_PROD_BASE || 'https://www.movetrusthub.com';
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  const sample = await client.query(
    `SELECT c.slug, c.usdot_number, c.name, c.fmcsa_legal_name, c.mc_number, c.headquarters
       FROM federal_hhg_wave_publication w
       JOIN companies c ON c.id = w.company_id
      WHERE w.wave_id = $1 AND w.status <> 'unpublished'
      ORDER BY w.usdot
      LIMIT 40`,
    [WAVE_4_PUBLICATION_ID]
  );
  const searchDots = await client.query(
    `SELECT c.usdot_number, c.name, c.slug
       FROM federal_hhg_wave_publication w
       JOIN companies c ON c.id = w.company_id
      WHERE w.wave_id = $1 AND w.status <> 'unpublished'
      ORDER BY w.usdot
      OFFSET 100 LIMIT 20`,
    [WAVE_4_PUBLICATION_ID]
  );
  const totals = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable
      FROM companies
  `);
  await client.end();

  const profileResults = [];
  for (const row of sample.rows as Array<{
    slug: string;
    usdot_number: string;
    name: string;
    fmcsa_legal_name: string | null;
    mc_number: string | null;
  }>) {
    const url = `${base}/companies/${row.slug}`;
    const res = await fetchText(url);
    const robots = res.headers.get('x-robots-tag') || '';
    const hasNoindex = /noindex/i.test(robots) || /noindex/i.test(res.text.slice(0, 5000));
    const body = res.text;
    const usdotOk = body.includes(row.usdot_number) || body.includes(normalizeUsdot(row.usdot_number));
    const nameOk = body.toLowerCase().includes(row.name.toLowerCase().slice(0, 12));
    const fakeNational = /serves all 50|all 50 states/i.test(body);
    profileResults.push({
      slug: row.slug,
      status: res.status,
      ms: res.ms,
      usdotOk,
      nameOk,
      noindex: hasNoindex,
      fakeNational,
      ok: res.status === 200 && usdotOk && nameOk && !fakeNational && !hasNoindex,
    });
  }

  const protectedSearches = [];
  for (const q of ['76235', '125563', '125550', 'Allied Van Lines', 'Mayflower']) {
    const api = await fetchText(`${base}/api/directory/companies?search=${encodeURIComponent(q)}&limit=5`);
    let parsed: { companies?: Array<{ usdotNumber?: string; name?: string }> } = {};
    try {
      parsed = JSON.parse(api.text);
    } catch {
      parsed = {};
    }
    protectedSearches.push({
      q,
      status: api.status,
      first: parsed.companies?.[0]?.name ?? null,
      firstUsdot: parsed.companies?.[0]?.usdotNumber ?? null,
      ok: api.status === 200 && (parsed.companies?.length ?? 0) > 0,
    });
  }

  const newUsdotSearches = [];
  for (const row of searchDots.rows as Array<{ usdot_number: string; name: string; slug: string }>) {
    const api = await fetchText(
      `${base}/api/directory/companies?search=${encodeURIComponent(row.usdot_number)}&limit=5`
    );
    let parsed: { companies?: Array<{ usdotNumber?: string; slug?: string }> } = {};
    try {
      parsed = JSON.parse(api.text);
    } catch {
      parsed = {};
    }
    const hit = parsed.companies?.some(
      (c) => normalizeUsdot(c.usdotNumber ?? '') === normalizeUsdot(row.usdot_number)
    );
    newUsdotSearches.push({ usdot: row.usdot_number, ok: api.status === 200 && Boolean(hit) });
  }

  const newNameSearches = [];
  for (const row of (searchDots.rows as Array<{ usdot_number: string; name: string }>).slice(0, 20)) {
    const api = await fetchText(
      `${base}/api/directory/companies?search=${encodeURIComponent(row.name)}&limit=10`
    );
    let parsed: { companies?: Array<{ usdotNumber?: string; name?: string }> } = {};
    try {
      parsed = JSON.parse(api.text);
    } catch {
      parsed = {};
    }
    const hit = parsed.companies?.some(
      (c) => normalizeUsdot(c.usdotNumber ?? '') === normalizeUsdot(row.usdot_number)
    );
    newNameSearches.push({ name: row.name, usdot: row.usdot_number, ok: api.status === 200 && Boolean(hit) });
  }

  const dirApi = await fetchText(`${base}/api/directory/companies?offset=0&limit=24`);
  let dirParsed: { total?: number; companies?: unknown[] } = {};
  try {
    dirParsed = JSON.parse(dirApi.text);
  } catch {
    dirParsed = {};
  }

  const perf = {
    companies: await timeUrl(`${base}/companies`, 5),
    apiDefault: await timeUrl(`${base}/api/directory/companies?offset=0&limit=24`, 5),
    usdot: await timeUrl(`${base}/api/directory/companies?search=76235&limit=5`, 3),
    deep: await timeUrl(`${base}/api/directory/companies?offset=1000&limit=24`, 3),
    compare: await timeUrl(`${base}/compare`, 2),
    sitemap: await timeUrl(`${base}/sitemap.xml`, 2),
  };

  // Sitemap company URL estimate: fetch sitemap index and count company entries if possible.
  const sitemap = await fetchText(`${base}/sitemap.xml`);
  const companyUrlMatches = sitemap.text.match(/\/companies\/[a-z0-9-]+/gi) ?? [];
  const uniqueCompanyUrls = new Set(companyUrlMatches.map((u) => u.toLowerCase()));

  const report = {
    google_places_requests: 0,
    generatedAt: new Date().toISOString(),
    base,
    db_totals: totals.rows[0],
    directory_api: {
      status: dirApi.status,
      total: dirParsed.total ?? null,
      returned: dirParsed.companies?.length ?? null,
    },
    profiles: {
      sampled: profileResults.length,
      ok: profileResults.filter((p) => p.ok).length,
      failures: profileResults.filter((p) => !p.ok),
    },
    protected_searches: protectedSearches,
    new_usdot_searches: {
      tested: newUsdotSearches.length,
      ok: newUsdotSearches.filter((x) => x.ok).length,
      failures: newUsdotSearches.filter((x) => !x.ok),
    },
    new_name_searches: {
      tested: newNameSearches.length,
      ok: newNameSearches.filter((x) => x.ok).length,
      failures: newNameSearches.filter((x) => !x.ok).slice(0, 10),
    },
    performance: perf,
    sitemap: {
      status: sitemap.status,
      company_url_mentions: companyUrlMatches.length,
      unique_company_urls_in_index_doc: uniqueCompanyUrls.size,
      note: 'Root sitemap.xml may be an index; unique path mentions are approximate.',
    },
    checks: {
      profiles_all_ok: profileResults.every((p) => p.ok),
      protected_ok: protectedSearches.every((p) => p.ok),
      new_usdot_ok: newUsdotSearches.every((x) => x.ok),
      directory_total_ge_4600: (dirParsed.total ?? 0) >= 4600,
      companies_cold_median_le_3000: (perf.companies.medianMs ?? 99999) <= 3000,
      api_median_le_1000: (perf.apiDefault.medianMs ?? 99999) <= 1000,
      usdot_median_le_1000: (perf.usdot.medianMs ?? 99999) <= 1000,
      deep_median_le_2000: (perf.deep.medianMs ?? 99999) <= 2000,
    },
  };

  const docs = resolve(process.cwd(), 'docs');
  if (!existsSync(docs)) mkdirSync(docs, { recursive: true });
  writeFileSync(resolve(docs, 'task-010-production-qa.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(
    JSON.stringify(
      {
        wrote: 'docs/task-010-production-qa.json',
        profiles_ok: report.profiles.ok,
        profiles_sampled: report.profiles.sampled,
        directory_total: report.directory_api.total,
        checks: report.checks,
        google_places_requests: 0,
      },
      null,
      2
    )
  );
  if (!Object.values(report.checks).every(Boolean)) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
