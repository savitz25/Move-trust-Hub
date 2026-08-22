/**
 * FL-010R strict HTTP 404 QA. Google Places: 0.
 * QA_BASE_URL=http://127.0.0.1:3000 for local next start.
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';

const BASE = (process.env.QA_BASE_URL || 'https://www.movetrusthub.com').replace(/\/$/, '');
const WAVE_LIMIT = Number(process.env.FL010R_WAVE_LIMIT || '37');
const UNKNOWN_COUNT = Number(process.env.FL010R_UNKNOWN_COUNT || '10');
const CANARY_LIMIT = Number(process.env.FL010R_CANARY_LIMIT || '80');

async function probe(path: string) {
  const started = Date.now();
  const headers: Record<string, string> = {
    'user-agent': 'MoveTrustHub-FL010R-http/1.0',
    'cache-control': 'no-cache',
  };
  if (BASE.startsWith('http://127.0.0.1') || BASE.startsWith('http://localhost')) {
    headers['x-forwarded-proto'] = 'https';
  }
  const res = await fetch(`${BASE}${path}`, {
    redirect: 'manual',
    headers,
  });
  const text = await res.text();
  const title = (text.match(/<title>([^<]+)/i) ?? ['', ''])[1];
  return {
    path,
    status: res.status,
    ms: Date.now() - started,
    title,
    noindex: /noindex/i.test(text),
    leakName: /Gentletouch|CHARLES L CARTER|FL-FDACS-IM-/i.test(text) && /Page Not Found/i.test(title) === false && res.status === 404,
    robots: (text.match(/name="robots" content="([^"]+)"/i) ?? ['', ''])[1],
    matched: res.headers.get('x-matched-path'),
    cdnCache: res.headers.get('cdn-cache-control'),
  };
}

async function main() {
  const wave = loadWave1Manifest();
  const canary = loadExactCanaryManifests();
  const ingested = [];
  for (const m of wave.members.slice(0, WAVE_LIMIT)) {
    ingested.push(await probe(`/companies/${m.slug}`));
  }
  const unknown = [];
  for (let i = 0; i < UNKNOWN_COUNT; i++) {
    unknown.push(await probe(`/companies/fl010r-unknown-${i}-${Math.random().toString(36).slice(2, 10)}`));
  }
  const canaryRows = [];
  for (const m of canary.all.slice(0, CANARY_LIMIT)) {
    canaryRows.push(await probe(`/companies/${m.slug}`));
  }
  const indexable = await probe('/companies/allied-van-lines');
  const publishableSample = await probe(`/companies/${canary.FL[0]!.slug}`);

  const report = {
    google_places_requests: 0,
    base: BASE,
    ingested_404: ingested.filter((r) => r.status === 404).length,
    ingested_tested: ingested.length,
    unknown_404: unknown.filter((r) => r.status === 404).length,
    unknown_tested: unknown.length,
    canary_200: canaryRows.filter((r) => r.status === 200).length,
    canary_tested: canaryRows.length,
    indexable_status: indexable.status,
    publishable_status: publishableSample.status,
    publishable_noindex: publishableSample.noindex,
    ingested,
    unknown,
    indexable,
    publishableSample,
  };
  const out = process.env.FL010R_OUT || 'docs/task-fl-010r-http-qa.json';
  writeFileSync(resolve(process.cwd(), out), JSON.stringify(report, null, 2) + '\n');
  console.log(
    JSON.stringify(
      {
        base: BASE,
        ingested: `${report.ingested_404}/${report.ingested_tested}`,
        unknown: `${report.unknown_404}/${report.unknown_tested}`,
        canary: `${report.canary_200}/${report.canary_tested}`,
        indexable: indexable.status,
        publishable: publishableSample.status,
        fail:
          report.ingested_404 !== report.ingested_tested ||
          report.unknown_404 !== report.unknown_tested ||
          report.canary_200 !== report.canary_tested ||
          indexable.status !== 200,
      },
      null,
      2
    )
  );
  if (
    report.ingested_404 !== report.ingested_tested ||
    report.unknown_404 !== report.unknown_tested ||
    indexable.status !== 200 ||
    publishableSample.status !== 200
  ) {
    process.exit(2);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
