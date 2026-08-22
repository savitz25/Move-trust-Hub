/**
 * FL-010 pre-apply HTTP gates. Google: 0. Abort process exit 2 on 404 failure.
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';

const BASE = 'https://www.movetrusthub.com';

async function probe(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    redirect: 'manual',
    headers: { 'user-agent': 'MoveTrustHub-FL010-preapply/1.0', 'cache-control': 'no-cache' },
  });
  const text = await res.text();
  const title = (text.match(/<title>([^<]+)/i) ?? ['', ''])[1];
  const canon = (text.match(/rel="canonical" href="([^"]+)"/i) ?? ['', ''])[1];
  return {
    path,
    status: res.status,
    title,
    canon,
    noindex: /noindex/i.test(text),
    hasFdacsIm: /IM\d{3,}/.test(text) && /Florida Department of Agriculture/i.test(text),
    hasPhoneLabel: /Phone reported in Florida FDACS/i.test(text),
    floridaChrome: /Florida Intrastate Mover/i.test(text),
    fmcsaHeadline: /FMCSA Profile/i.test(title),
  };
}

async function main() {
  const man = loadWave1Manifest();
  const canary = loadExactCanaryManifests();
  const sample = [0, 8, 16, 24, 36].map((i) => man.members[i]!).filter(Boolean);
  const ingested = [];
  for (const m of sample) ingested.push({ ...m, ...(await probe(`/companies/${m.slug}`)) });
  const unknown = [];
  for (const slug of [
    'this-slug-should-not-exist-fl010-aaa',
    'this-slug-should-not-exist-fl010-bbb',
    'this-slug-should-not-exist-fl010-ccc',
  ]) {
    unknown.push(await probe(`/companies/${slug}`));
  }
  const publicOk = {
    indexable: await probe('/companies/allied-van-lines'),
    flCanary: await probe(`/companies/${canary.FL[0]!.slug}`),
    waCanary: await probe(`/companies/${canary.WA[0]!.slug}`),
  };

  const ingested404 = ingested.every((r) => r.status === 404);
  const unknown404 = unknown.every((r) => r.status === 404);
  const ingestedLeaks = ingested.some(
    (r) => r.status === 200 && (r.hasFdacsIm || r.hasPhoneLabel || r.floridaChrome)
  );
  const publicPass =
    publicOk.indexable.status === 200 &&
    publicOk.flCanary.status === 200 &&
    publicOk.waCanary.status === 200;

  const report = {
    google_places_requests: 0,
    ingested,
    unknown,
    publicOk,
    ingested404,
    unknown404,
    ingestedLeaks,
    publicPass,
    abort: !ingested404 || !unknown404 || ingestedLeaks || !publicPass,
  };
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-010-preapply-http.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ ingested404, unknown404, ingestedLeaks, publicPass, abort: report.abort, ingested: ingested.map((r) => ({ slug: r.slug, status: r.status, title: r.title })) }, null, 2));
  if (report.abort) process.exit(2);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
