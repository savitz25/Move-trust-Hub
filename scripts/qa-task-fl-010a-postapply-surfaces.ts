/**
 * FL-010A post-apply KEEP_80, INDEXABLE, OG, representative profile QA.
 * Google Places: 0.
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';

const BASE = 'https://www.movetrusthub.com';

async function probe(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    redirect: 'manual',
    headers: { 'user-agent': 'MoveTrustHub-FL010A-post/1.0', 'cache-control': 'no-cache' },
  });
  const buf = await res.arrayBuffer();
  const ct = res.headers.get('content-type') || '';
  const text = ct.includes('text') || ct.includes('json') || ct.includes('html')
    ? new TextDecoder().decode(buf)
    : '';
  return {
    path,
    status: res.status,
    ct,
    noindex: /noindex/i.test(text) || /noindex/i.test(res.headers.get('x-robots-tag') || ''),
    title: (text.match(/<title>([^<]+)/i) ?? ['', ''])[1],
    florida: /Florida Intrastate Mover/i.test(text),
    fmcsaTitle: /FMCSA Profile/i.test(text),
    approved: /TrustHub Approved|Certified by TrustHub/i.test(text),
  };
}

async function main() {
  const canary = loadExactCanaryManifests();
  const wave = loadWave1Manifest();
  const keep80 = [];
  for (const m of canary.all) {
    keep80.push({ id: m.companyId, slug: m.slug, state: m.stateCode, ...(await probe(`/companies/${m.slug}`)) });
  }
  const indexable = [
    await probe('/companies/allied-van-lines'),
    await probe('/companies/united-van-lines'),
  ];
  const reps = [
    'doug-s-hourly-muscle-movers-packers-inc',
    'clover-systems-llc',
    'adios-moving-llc',
    'miss-peach-iv-true-movers-inc',
    'advance-sorensen-movers-of-south-florida-llc',
    'epaa-llc',
    'keys-movers',
  ];
  const profiles = [];
  const og = [];
  for (const slug of reps) {
    const member = wave.members.find((m) => m.slug === slug);
    profiles.push({ slug, county: member?.county, ...(await probe(`/companies/${slug}`)) });
    og.push({ slug, ...(await probe(`/companies/${slug}/share-og`)) });
  }

  const keep200 = keep80.filter((r) => r.status === 200).length;
  const keepNoindex = keep80.filter((r) => r.noindex && r.status === 200).length;
  const report = {
    google_places_requests: 0,
    keep80_tested: keep80.length,
    keep80_200: keep200,
    keep80_noindex: keepNoindex,
    keep80_fl: keep80.filter((r) => r.state === 'FL' && r.status === 200).length,
    keep80_wa: keep80.filter((r) => r.state === 'WA' && r.status === 200).length,
    keep80_failures: keep80.filter((r) => r.status !== 200).map((r) => r.slug),
    indexable,
    representatives: profiles,
    og,
  };
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-010a-postapply-surfaces.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(
    JSON.stringify(
      {
        keep80: `${keep200}/${keep80.length}`,
        keep80_noindex: keepNoindex,
        fl: report.keep80_fl,
        wa: report.keep80_wa,
        failures: report.keep80_failures,
        indexable: indexable.map((r) => r.status),
        reps200: profiles.filter((p) => p.status === 200).length,
        og200: og.filter((p) => p.status === 200).length,
        ogTypes: [...new Set(og.map((p) => p.ct))],
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
