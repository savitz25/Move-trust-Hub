/**
 * FL-009 HTTP contract QA. Does not call Google APIs.
 * QA_BASE_URL defaults to production; use http://127.0.0.1:3000 for local next start.
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import { SHARE_HUB } from '../lib/seo/share-hub';

const BASE = (process.env.QA_BASE_URL || SHARE_HUB.origin).replace(/\/$/, '');

async function probe(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    redirect: 'manual',
    headers: { 'user-agent': 'MoveTrustHub-FL009-http/1.0' },
  });
  const text = await res.text();
  const title = (text.match(/<title>([^<]+)/i) ?? ['', ''])[0];
  return {
    path,
    status: res.status,
    noindex: /noindex/i.test(text),
    title,
    leaksFdacs: /FL-FDACS-IM-|IM1025|Gentletouch/i.test(text) && res.status !== 200,
  };
}

async function main() {
  const wave = loadWave1Manifest();
  const canary = loadExactCanaryManifests();
  const ingested = await probe(`/companies/${wave.members[0]!.slug}`);
  const unknown = await probe('/companies/this-slug-should-not-exist-fl009-xyz');
  const pubCanary = await probe(`/companies/${canary.FL[0]!.slug}`);
  const indexable = await probe('/companies/allied-van-lines');

  const report = {
    google_places_requests: 0,
    base: BASE,
    ingested_wave1: ingested,
    unknown_slug: unknown,
    publishable_canary: pubCanary,
    indexable_federal: indexable,
    ingested_is_404: ingested.status === 404,
    unknown_is_404: unknown.status === 404,
    canary_is_200: pubCanary.status === 200,
    indexable_is_200: indexable.status === 200,
  };
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-009-http-404-qa.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  if (BASE.includes('127.0.0.1') || BASE.includes('localhost')) {
    if (!report.ingested_is_404 || !report.unknown_is_404) {
      process.exit(2);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
