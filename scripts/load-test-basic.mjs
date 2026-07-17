/**
 * Basic concurrent load test for www.movetrusthub.com
 * Usage: node scripts/load-test-basic.mjs
 *
 * Stages: warm-up (1) → light (10) → moderate (25) → peak (50)
 * Does not hit write/auth mutation endpoints (magic link, claims).
 */

const BASE = process.env.LOAD_TEST_BASE ?? 'https://www.movetrusthub.com';
const USER_AGENT = 'MoveTrustHub-LoadTest/1.0 (+perf-review; contact info@movetrusthub.com)';

/** Critical public flows — GET only */
const ENDPOINTS = [
  { name: 'homepage', path: '/' },
  { name: 'companies_directory', path: '/companies' },
  { name: 'company_profile', path: '/companies/all-my-sons-moving-storage' },
  { name: 'portal_login', path: '/portal/login' },
  { name: 'lender_home', path: '/lender' },
  { name: 'insurance_home', path: '/insurance' },
  { name: 'moving_calculator', path: '/moving-calculator' },
  { name: 'local_movers_index', path: '/local-movers' },
  { name: 'destination_sample', path: '/moving-to' },
  { name: 'api_companies', path: '/api/companies' },
];

const STAGES = [
  { name: 'warmup', concurrency: 1, requestsPerEndpoint: 3 },
  { name: 'light_10', concurrency: 10, requestsPerEndpoint: 5 },
  { name: 'moderate_25', concurrency: 25, requestsPerEndpoint: 4 },
  { name: 'peak_50', concurrency: 50, requestsPerEndpoint: 3 },
];

function percentile(sorted, p) {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
  return sorted[Math.max(0, idx)];
}

async function fetchOne(path) {
  const url = `${BASE}${path}`;
  const t0 = performance.now();
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/json,*/*',
      },
      redirect: 'follow',
    });
    // Drain body so connection reuse is fair
    const buf = await res.arrayBuffer();
    const ms = performance.now() - t0;
    const cache =
      res.headers.get('cf-cache-status') ||
      res.headers.get('x-vercel-cache') ||
      res.headers.get('age') ||
      '';
    return {
      ok: res.status >= 200 && res.status < 400,
      status: res.status,
      ms,
      bytes: buf.byteLength,
      cache: String(cache),
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      ms: performance.now() - t0,
      bytes: 0,
      cache: '',
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function runPool(jobs, concurrency) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < jobs.length) {
      const idx = i++;
      const job = jobs[idx];
      const r = await fetchOne(job.path);
      results.push({ ...job, ...r });
    }
  }
  const n = Math.min(concurrency, jobs.length);
  await Promise.all(Array.from({ length: n }, () => worker()));
  return results;
}

function summarize(stageName, results) {
  const byName = new Map();
  for (const r of results) {
    if (!byName.has(r.name)) byName.set(r.name, []);
    byName.get(r.name).push(r);
  }

  const rows = [];
  for (const [name, list] of byName) {
    const times = list.map((x) => x.ms).sort((a, b) => a - b);
    const errors = list.filter((x) => !x.ok).length;
    const statuses = {};
    const caches = {};
    let bytes = 0;
    for (const x of list) {
      statuses[x.status] = (statuses[x.status] || 0) + 1;
      if (x.cache) caches[x.cache] = (caches[x.cache] || 0) + 1;
      bytes += x.bytes;
    }
    rows.push({
      stage: stageName,
      endpoint: name,
      n: list.length,
      errors,
      errorRate: ((errors / list.length) * 100).toFixed(1) + '%',
      p50: Math.round(percentile(times, 50)),
      p95: Math.round(percentile(times, 95)),
      p99: Math.round(percentile(times, 99)),
      max: Math.round(times[times.length - 1] || 0),
      avgBytes: Math.round(bytes / list.length),
      statuses,
      caches,
    });
  }
  return rows;
}

async function main() {
  console.log(`Load test base: ${BASE}`);
  console.log(`Started: ${new Date().toISOString()}\n`);

  const allRows = [];
  const stageSummaries = [];

  for (const stage of STAGES) {
    console.log(
      `=== Stage: ${stage.name} (concurrency=${stage.concurrency}, n/endpoint=${stage.requestsPerEndpoint}) ===`
    );
    const jobs = [];
    for (const ep of ENDPOINTS) {
      for (let i = 0; i < stage.requestsPerEndpoint; i++) {
        jobs.push({ name: ep.name, path: ep.path });
      }
    }
    // Shuffle for more realistic mix
    for (let i = jobs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [jobs[i], jobs[j]] = [jobs[j], jobs[i]];
    }

    const t0 = performance.now();
    const results = await runPool(jobs, stage.concurrency);
    const elapsed = (performance.now() - t0) / 1000;
    const rows = summarize(stage.name, results);
    allRows.push(...rows);

    const total = results.length;
    const errs = results.filter((r) => !r.ok).length;
    const rps = (total / elapsed).toFixed(2);
    const stageLine = {
      stage: stage.name,
      concurrency: stage.concurrency,
      totalRequests: total,
      errors: errs,
      errorRate: ((errs / total) * 100).toFixed(1) + '%',
      durationSec: elapsed.toFixed(2),
      throughputRps: rps,
    };
    stageSummaries.push(stageLine);
    console.log(JSON.stringify(stageLine, null, 2));
    console.table(
      rows.map((r) => ({
        endpoint: r.endpoint,
        n: r.n,
        err: r.errorRate,
        p50_ms: r.p50,
        p95_ms: r.p95,
        p99_ms: r.p99,
        max_ms: r.max,
        kb: Math.round(r.avgBytes / 1024),
        cache: Object.keys(r.caches).slice(0, 3).join(',') || '—',
      }))
    );
    console.log('');
    // Brief pause between stages
    await new Promise((r) => setTimeout(r, 1500));
  }

  // Overall ranking by p95 at peak
  const peak = allRows.filter((r) => r.stage === 'peak_50');
  peak.sort((a, b) => b.p95 - a.p95);
  console.log('=== Slowest endpoints at peak_50 (by p95) ===');
  console.table(
    peak.map((r) => ({
      endpoint: r.endpoint,
      p50: r.p50,
      p95: r.p95,
      p99: r.p99,
      errors: r.errorRate,
      kb: Math.round(r.avgBytes / 1024),
    }))
  );

  const out = {
    base: BASE,
    finishedAt: new Date().toISOString(),
    stages: stageSummaries,
    detail: allRows,
  };
  const outPath = new URL('../scripts/output/load-test-basic-report.json', import.meta.url);
  const { writeFileSync, mkdirSync } = await import('node:fs');
  const { dirname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const fp = fileURLToPath(outPath);
  mkdirSync(dirname(fp), { recursive: true });
  writeFileSync(fp, JSON.stringify(out, null, 2));
  console.log(`\nWrote ${fp}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
