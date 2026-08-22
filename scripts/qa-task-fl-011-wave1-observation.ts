/**
 * FL-011 read-only Wave 1 observation snapshot.
 * Does not mutate membership, indexable, or Trust Score. Google Places: 0.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { loadWave1Manifest, FL_STATE_WAVE_1_ID } from '../lib/state-hhg/fl/wave-1';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import { LOCAL_CANARY_WAVE_ID } from '../lib/state-hhg/canary/types';

const BASE = (process.env.QA_BASE_URL || 'https://www.movetrusthub.com').replace(/\/$/, '');
const UA = 'MoveTrustHub-FL011-observation/1.0';
const EXPECTED_HASH = 'a9165ec652ad7a27';
const LAUNCH_AT = '2026-08-22T14:45:00.000Z';
const LAUNCH_SHA = 'ab93c84195f3b36c7e2bbd70495a0ee1432d8140';
const OBSERVATION_DAYS = 14;
const SNAPSHOT_DATE = new Date().toISOString().slice(0, 10);
const OUT_DIR = resolve(process.cwd(), 'docs/observation/fl-state-wave1');

const REPS = [
  'doug-s-hourly-muscle-movers-packers-inc',
  'clover-systems-llc',
  'adios-moving-llc',
  'miss-peach-iv-true-movers-inc',
  'advance-sorensen-movers-of-south-florida-llc',
  'epaa-llc',
  'keys-movers',
  'gentletouch-moving-company',
];

const INDEXABLE = [
  { slug: 'allied-van-lines', kind: 'major-federal-carrier' },
  { slug: 'united-van-lines', kind: 'federal-mover' },
  { slug: 'mayflower-transit', kind: 'federal-carrier' },
];

const COUNTY_PAGES = [
  '/local-movers/florida/miami-dade',
  '/local-movers/florida/broward',
  '/local-movers/florida/hillsborough',
  '/local-movers/florida/pinellas',
];

const SITEMAPS = [
  '/sitemap.xml',
  '/sitemap-local/sitemap.xml',
  '/sitemap-local/sitemap/florida.xml',
];

const SEARCH_QUERIES = ['gentletouch', 'clover systems', 'adios moving', 'keys movers'];

const PROHIBITED =
  /TrustHub Approved|Certified by TrustHub|cannot move interstate|not federally licensed|no USDOT exists/i;

type Probe = {
  path: string;
  status: number;
  ms: number;
  title: string;
  robots: string | null;
  noindex: boolean;
  floridaChrome: boolean;
  fdacsBlock: boolean;
  fdacsImExact: boolean;
  noFederalIdCopy: boolean;
  verifyUsdOtEmptyState: boolean;
  fmcsaHeadline: boolean;
  licensingCard: boolean;
  phoneLabel: boolean;
  emailLabel: boolean;
  addressLabel: boolean;
  prohibited: boolean;
  jsonLdParsed: boolean;
  jsonLdFdacs: boolean;
  jsonLdAggregateRating: boolean;
  jsonLdAreaServed: boolean;
  buildId: string | null;
  errors: string[];
};

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function fetchText(
  path: string,
  extra: Record<string, string> = {}
): Promise<{ status: number; ms: number; text: string; headers: Headers; ct: string }> {
  const t0 = Date.now();
  const res = await fetch(`${BASE}${path}`, {
    redirect: 'manual',
    headers: { 'user-agent': UA, 'cache-control': 'no-cache', ...extra },
  });
  const buf = await res.arrayBuffer();
  const ct = res.headers.get('content-type') || '';
  const text =
    ct.includes('text') || ct.includes('json') || ct.includes('xml') || ct.includes('html')
      ? new TextDecoder().decode(buf)
      : '';
  return { status: res.status, ms: Date.now() - t0, text, headers: res.headers, ct };
}

function parseJsonLd(html: string): { blobs: unknown[]; parsedOk: boolean; joined: string } {
  const raw = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1]
  );
  const blobs: unknown[] = [];
  let parsedOk = true;
  for (const b of raw) {
    try {
      blobs.push(JSON.parse(b));
    } catch {
      parsedOk = false;
    }
  }
  return { blobs, parsedOk, joined: raw.join('\n') };
}

async function probeProfile(slug: string, fdacsIm?: string): Promise<Probe> {
  const path = `/companies/${slug}`;
  const errors: string[] = [];
  let status = 0;
  let ms = 0;
  let text = '';
  let headers: Headers | null = null;
  try {
    const r = await fetchText(path);
    status = r.status;
    ms = r.ms;
    text = r.text;
    headers = r.headers;
  } catch (e) {
    errors.push(String(e));
  }
  if (status >= 500) errors.push(`http_${status}`);
  if (status === 0) errors.push('fetch_failed');
  const title = (text.match(/<title>([^<]+)/i) ?? ['', ''])[1];
  const robots =
    (text.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i) ?? [])[1] ??
    headers?.get('x-robots-tag') ??
    null;
  const sd = parseJsonLd(text);
  const im = fdacsIm ? new RegExp(`\\b${escapeRe(fdacsIm)}\\b`) : null;
  return {
    path,
    status,
    ms,
    title,
    robots,
    noindex: /noindex/i.test(text) || /noindex/i.test(robots || ''),
    floridaChrome: /Florida Intrastate Mover/i.test(text),
    fdacsBlock: /Florida Department of Agriculture and Consumer Services/i.test(text),
    fdacsImExact: im ? im.test(text) : false,
    noFederalIdCopy: /No federal mover identifier is currently linked/i.test(text),
    verifyUsdOtEmptyState: /Verify USDOT on FMCSA SAFER/i.test(text),
    fmcsaHeadline: /FMCSA Profile/i.test(title),
    licensingCard: /Licensing &amp; Compliance|Licensing & Compliance/i.test(text),
    phoneLabel: /Phone reported in Florida FDACS registration/i.test(text),
    emailLabel: /Email reported in Florida FDACS registration/i.test(text),
    addressLabel: /Business address reported in Florida FDACS registration/i.test(text),
    prohibited: PROHIBITED.test(text),
    jsonLdParsed: sd.parsedOk,
    jsonLdFdacs: fdacsIm ? text.includes(fdacsIm) && /PropertyValue|FDACS|IM\d+/i.test(sd.joined) : false,
    jsonLdAggregateRating: /AggregateRating/i.test(sd.joined),
    jsonLdAreaServed: /areaServed/i.test(sd.joined),
    buildId: (text.match(/data-build-id="([^"]+)"/) ?? [])[1] ?? null,
    errors,
  };
}

async function sitemapHits(slugs: string[]) {
  const results: Array<{ path: string; status: number; hits: string[] }> = [];
  for (const path of SITEMAPS) {
    try {
      const r = await fetchText(path);
      const hits = slugs.filter((s) => r.text.includes(`/companies/${s}`) || r.text.includes(s));
      results.push({ path, status: r.status, hits });
    } catch {
      results.push({ path, status: 0, hits: [] });
    }
  }
  return results;
}

async function dbIntegrity(manifest: ReturnType<typeof loadWave1Manifest>) {
  loadEnvFiles();
  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const freeze = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable,
             count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested,
             count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int AS publishable
        FROM companies`);
    const ids = manifest.members.map((m) => m.companyId);
    const waveCompanies = await client.query(
      `SELECT id, slug, publication_state, indexable
         FROM companies WHERE id = ANY($1::text[])`,
      [ids]
    );
    const membership = await client.query(
      `SELECT company_id, wave_id, status
         FROM local_hhg_canary_publication
        WHERE wave_id = $1`,
      [FL_STATE_WAVE_1_ID]
    );
    const unexpected = membership.rows.filter((r) => !ids.includes(String(r.company_id)));
    const keep80 = await client.query(
      `SELECT state_code, count(*)::int AS n
         FROM local_hhg_canary_publication
        WHERE wave_id = $1 AND status='published'
        GROUP BY 1`,
      [LOCAL_CANARY_WAVE_ID]
    );
    const byState: Record<string, number> = {};
    for (const row of keep80.rows) byState[String(row.state_code)] = Number(row.n);
    const rows = waveCompanies.rows;
    return {
      freeze: freeze.rows[0],
      membership: membership.rows.length,
      unexpected_members: unexpected.map((r) => r.company_id),
      publishable: rows.filter((r) => r.publication_state === 'PUBLISHABLE').length,
      ingested: rows.filter((r) => r.publication_state === 'INGESTED').length,
      indexable_true: rows.filter((r) => r.indexable === true).length,
      missing: ids.filter((id) => !rows.some((r) => r.id === id)),
      keep80: { FL: byState.FL ?? 0, WA: byState.WA ?? 0, total: (byState.FL ?? 0) + (byState.WA ?? 0) },
    };
  } finally {
    await client.end();
  }
}

function observationWindow(nowIso: string) {
  const start = Date.parse(LAUNCH_AT);
  const now = Date.parse(nowIso);
  const elapsedHours = Math.max(0, (now - start) / 36e5);
  const targetEnd = new Date(start + OBSERVATION_DAYS * 864e5).toISOString();
  const elapsed = now - start;
  const remainingMs = start + OBSERVATION_DAYS * 864e5 - now;
  return {
    started_at: LAUNCH_AT,
    target_days: OBSERVATION_DAYS,
    target_end: targetEnd,
    elapsed_hours: Math.round(elapsedHours * 10) / 10,
    remaining_hours: Math.round(Math.max(0, remainingMs / 36e5) * 10) / 10,
    period_elapsed: elapsed >= OBSERVATION_DAYS * 864e5,
  };
}

async function main() {
  const retrievedAt = new Date().toISOString();
  const manifest = loadWave1Manifest();
  const canary = loadExactCanaryManifests();
  mkdirSync(OUT_DIR, { recursive: true });

  const home = await fetchText('/');
  const productionSha =
    (home.text.match(/data-build-id="([^"]+)"/) ?? [])[1] ??
    (await probeProfile('allied-van-lines')).buildId;

  const db = await dbIntegrity(manifest);

  const wave: Probe[] = [];
  for (const m of manifest.members) {
    wave.push(await probeProfile(m.slug, m.fdacsIm));
  }

  const keep80: Array<Probe & { state: string; slug: string }> = [];
  for (const m of canary.all) {
    const p = await probeProfile(m.slug);
    keep80.push({ ...p, state: m.stateCode, slug: m.slug });
  }

  const indexable = [];
  for (const row of INDEXABLE) {
    indexable.push({ ...row, ...(await probeProfile(row.slug)) });
  }

  const og = [];
  for (const slug of REPS) {
    const r = await fetchText(`/companies/${slug}/share-og`);
    og.push({
      slug,
      status: r.status,
      ct: r.ct,
      bytes: Number(r.headers.get('content-length') || 0),
    });
  }

  const sitemaps = await sitemapHits(manifest.members.map((m) => m.slug));

  const directory: Array<Record<string, unknown>> = [];
  for (const q of SEARCH_QUERIES) {
    const html = await fetchText(`/companies?search=${encodeURIComponent(q)}`);
    const api = await fetchText(`/api/directory/companies?search=${encodeURIComponent(q)}&limit=24`);
    let apiJson: { companies?: Array<{ slug?: string; name?: string }>; total?: number } = {};
    try {
      apiJson = JSON.parse(api.text);
    } catch {
      apiJson = {};
    }
    const slugs = (apiJson.companies ?? []).map((c) => String(c.slug || ''));
    directory.push({
      query: q,
      html_status: html.status,
      html_visible: html.text.toLowerCase().includes(q.toLowerCase().slice(0, 8)),
      api_status: api.status,
      api_total: apiJson.total ?? null,
      api_slugs: slugs.slice(0, 8),
      api_cache: api.headers.get('x-vercel-cache') || api.headers.get('cache-control'),
      html_cache: html.headers.get('x-vercel-cache') || html.headers.get('cache-control'),
    });
  }

  const compare = [];
  for (const slug of ['gentletouch-moving-company', 'clover-systems-llc', 'adios-moving-llc']) {
    const r = await fetchText(`/api/compare/companies?slugs=${encodeURIComponent(slug)}`);
    let body: { companies?: Array<Record<string, unknown>> } = {};
    try {
      body = JSON.parse(r.text);
    } catch {
      body = {};
    }
    const c = body.companies?.[0] ?? null;
    compare.push({
      slug,
      status: r.status,
      hydrated: Boolean(c),
      name: c?.name ?? null,
      usdot: c?.usdotNumber ?? null,
      mc: c?.mcNumber ?? null,
      countyRegulatory: Boolean(
        c && (c.countyRegulatory || c.county_regulatory || c.builder2)
      ),
    });
  }

  const county = [];
  for (const path of COUNTY_PAGES) {
    const r = await fetchText(path);
    const hits = manifest.members.filter((m) => r.text.includes(`/companies/${m.slug}`));
    county.push({
      path,
      status: r.status,
      wave1_listed: hits.map((m) => m.slug),
    });
  }

  const ttfb = wave.filter((p) => p.status === 200).map((p) => p.ms);
  const ttfbSorted = [...ttfb].sort((a, b) => a - b);
  const pct = (p: number) =>
    ttfbSorted.length ? ttfbSorted[Math.min(ttfbSorted.length - 1, Math.floor((p / 100) * ttfbSorted.length))] : null;

  const http200 = wave.filter((p) => p.status === 200).length;
  const noindex = wave.filter((p) => p.noindex).length;
  const florida = wave.filter((p) => p.floridaChrome).length;
  const fdacsExact = wave.filter((p) => p.fdacsImExact).length;
  const sitemapWaveHits = [...new Set(sitemaps.flatMap((s) => s.hits))];
  const verifyUsdOt = wave.filter((p) => p.verifyUsdOtEmptyState).length;
  const keep200 = keep80.filter((p) => p.status === 200).length;
  const keepNoindex = keep80.filter((p) => p.noindex).length;
  const keepFdacs = keep80.filter((p) => p.floridaChrome || p.fdacsBlock).length;
  const directoryHtmlOk = directory.every((d) => d.html_visible === true);
  const directoryApiOk = directory.every(
    (d) => Array.isArray(d.api_slugs) && (d.api_slugs as string[]).length > 0
  );
  const directoryCache =
    directoryHtmlOk && directoryApiOk ? 'CONSISTENT' : directoryHtmlOk && !directoryApiOk ? 'STALE_CACHE_REMAINS' : 'STALE_CACHE_REMAINS';

  const window = observationWindow(retrievedAt);
  const hashOk = manifest.hash === EXPECTED_HASH;
  const dbOk =
    db.membership === 37 &&
    db.publishable === 37 &&
    db.ingested === 0 &&
    db.indexable_true === 0 &&
    db.unexpected_members.length === 0 &&
    db.keep80.total === 80;
  const routesOk = http200 === 37 && wave.every((p) => p.status !== 404 && p.status < 500);
  const indexOk = noindex === 37 && db.indexable_true === 0;
  const sitemapOk = sitemapWaveHits.length === 0;
  const fdacsOk = fdacsExact === 37;
  const keepOk = keep200 === 80 && keepNoindex === 80 && keepFdacs === 0;
  const chromeOk = florida === 37 && wave.filter((p) => p.prohibited).length === 0;
  const shellOk = verifyUsdOt === 0;

  let status: 'OBSERVATION HEALTHY — CONTINUE' | 'OBSERVATION DEGRADED — REMEDIATION REQUIRED' | 'ROLLED_BACK' =
    'OBSERVATION HEALTHY — CONTINUE';
  if (!routesOk || !indexOk || !sitemapOk || !fdacsOk || !dbOk || !keepOk || !hashOk) {
    status = 'OBSERVATION DEGRADED — REMEDIATION REQUIRED';
  } else if (!shellOk) {
    status = 'OBSERVATION DEGRADED — REMEDIATION REQUIRED';
  }
  if (window.period_elapsed) {
    /* FL-011 is not the keep/index decision; status remains observation. */
  }

  const snapshot = {
    google_places_requests: 0,
    task: 'FL-011',
    status,
    retrieved_at: retrievedAt,
    observation: window,
    production: {
      host: BASE,
      deployed_sha: productionSha,
      launch_sha: LAUNCH_SHA,
      current_main_expected_docs_merge: 'ceeaa987982b2871662fbb41fee858b52f1a0651',
      sha_match_launch: productionSha === LAUNCH_SHA ? 'YES' : 'NO',
    },
    wave: {
      id: FL_STATE_WAVE_1_ID,
      members: 37,
      manifest_hash: manifest.hash,
      hash_ok: hashOk,
    },
    database: db,
    routes: {
      tested: wave.length,
      http200,
      failures: wave.filter((p) => p.status !== 200).map((p) => ({ slug: p.path, status: p.status })),
      noindex,
      florida_chrome: florida,
      fdacs_exact: fdacsExact,
      verify_usdot_empty_state: verifyUsdOt,
      prohibited: wave.filter((p) => p.prohibited).map((p) => p.path),
      jsonld_parsed: wave.filter((p) => p.jsonLdParsed).length,
      jsonld_aggregate_rating: wave.filter((p) => p.jsonLdAggregateRating).length,
      jsonld_area_served: wave.filter((p) => p.jsonLdAreaServed).length,
      phone_labels: wave.filter((p) => p.phoneLabel).length,
      email_labels: wave.filter((p) => p.emailLabel).length,
      address_labels: wave.filter((p) => p.addressLabel).length,
      no_federal_id_copy: wave.filter((p) => p.noFederalIdCopy).length,
    },
    sitemaps: { inclusions: sitemapWaveHits, details: sitemaps },
    keep80: {
      tested: keep80.length,
      http200: keep200,
      noindex: keepNoindex,
      fl: keep80.filter((p) => p.state === 'FL' && p.status === 200).length,
      wa: keep80.filter((p) => p.state === 'WA' && p.status === 200).length,
      accidental_wave_chrome: keepFdacs,
      failures: keep80.filter((p) => p.status !== 200).map((p) => p.slug),
    },
    indexable,
    og,
    directory: { cache: directoryCache, samples: directory },
    compare,
    county_discovery: county,
    performance: {
      label: 'CURRENT_SHELL_BASELINE',
      n: ttfb.length,
      ttfb_ms_min: ttfbSorted[0] ?? null,
      ttfb_ms_p50: pct(50),
      ttfb_ms_p95: pct(95),
      ttfb_ms_max: ttfbSorted[ttfbSorted.length - 1] ?? null,
      server_5xx: wave.filter((p) => p.status >= 500).length + keep80.filter((p) => p.status >= 500).length,
    },
    launch_baseline: {
      label: 'LAUNCH_BASELINE',
      timestamp: LAUNCH_AT,
      production_sha: LAUNCH_SHA,
      route_success: '37/37 HTTP 200',
      noindex: '37/37',
      sitemap_inclusions: 0,
      fdacs_exact: '37/37',
      note: 'Measured on ab93c841 before VISUAL-006 shell. Do not mix with CURRENT_SHELL_BASELINE.',
    },
    contracts: {
      hashOk,
      dbOk,
      routesOk,
      indexOk,
      sitemapOk,
      fdacsOk,
      keepOk,
      chromeOk,
      shellOk,
    },
    members: wave.map((p, i) => ({
      companyId: manifest.members[i].companyId,
      slug: manifest.members[i].slug,
      fdacsIm: manifest.members[i].fdacsIm,
      county: manifest.members[i].county,
      ...p,
    })),
  };

  const snapshotPath = resolve(OUT_DIR, `snapshot-${SNAPSHOT_DATE}.json`);
  writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2) + '\n');

  const baselinePath = resolve(OUT_DIR, 'baseline-launch.json');
  if (!existsSync(baselinePath)) {
    const src = resolve(process.cwd(), 'docs/task-fl-010a-observation-baseline.json');
    if (existsSync(src)) {
      writeFileSync(baselinePath, readFileSync(src, 'utf8'));
    }
  }

  const summary = {
    google_places_requests: 0,
    task: 'FL-011',
    status,
    retrieved_at: retrievedAt,
    production_sha: productionSha,
    manifest_hash: manifest.hash,
    membership: db.membership,
    publishable: db.publishable,
    ingested: db.ingested,
    indexable_true: db.indexable_true,
    http200: `${http200}/37`,
    noindex: `${noindex}/37`,
    fdacs_exact: `${fdacsExact}/37`,
    sitemap_inclusions: sitemapWaveHits.length,
    verify_usdot_empty_state: verifyUsdOt,
    keep80: `${keep200}/80`,
    directory_cache: directoryCache,
    observation: window,
    snapshot: `docs/observation/fl-state-wave1/snapshot-${SNAPSHOT_DATE}.json`,
  };
  writeFileSync(resolve(OUT_DIR, 'observation-summary.json'), JSON.stringify(summary, null, 2) + '\n');

  console.log(JSON.stringify(summary, null, 2));
  if (status !== 'OBSERVATION HEALTHY — CONTINUE' && !shellOk && routesOk && dbOk && keepOk && indexOk && sitemapOk && fdacsOk) {
    process.exitCode = 0;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
