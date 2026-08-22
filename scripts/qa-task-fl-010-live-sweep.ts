/**
 * FL-010 post-apply live sweep of all Wave 1 profiles. Google: 0.
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';

const BASE = 'https://www.movetrusthub.com';

async function probe(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    redirect: 'manual',
    headers: { 'user-agent': 'MoveTrustHub-FL010-live/1.0', 'cache-control': 'no-cache' },
  });
  const text = await res.text();
  const title = (text.match(/<title>([^<]+)/i) ?? ['', ''])[1];
  const jsonLd = [...text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  return {
    path,
    status: res.status,
    title,
    noindex: /noindex/i.test(text),
    floridaChrome: /Florida Intrastate Mover/i.test(text),
    fdacsBlock: /Florida Department of Agriculture and Consumer Services/i.test(text),
    scope: /Interstate operating authority is regulated separately/i.test(text),
    phoneLabel: /Phone reported in Florida FDACS registration/i.test(text),
    emailLabel: /Email reported in Florida FDACS registration/i.test(text),
    addressLabel: /Business address reported in Florida FDACS registration/i.test(text),
    noFederalIdCopy: /No federal mover identifier is currently linked/i.test(text),
    prohibited:
      /TrustHub Approved|Certified by TrustHub|cannot move interstate|not federally licensed|no USDOT exists/i.test(
        text
      ),
    fmcsaHeadline: /FMCSA Profile/i.test(title),
    jsonLd,
  };
}

function jsonLdSafe(blobs: string[], fdacsIm: string) {
  const joined = blobs.join('\n');
  let parsedOk = true;
  for (const b of blobs) {
    try {
      JSON.parse(b);
    } catch {
      parsedOk = false;
    }
  }
  return {
    parsedOk,
    hasFdacs: joined.includes(fdacsIm),
    hasAggregateRating: /AggregateRating/i.test(joined),
    hasAreaServed: /areaServed/i.test(joined),
  };
}

async function main() {
  const man = loadWave1Manifest();
  const rows = [];
  for (const m of man.members) {
    const p = await probe(`/companies/${m.slug}`);
    const sd = jsonLdSafe(p.jsonLd, m.fdacsIm);
    const fdacsExact = new RegExp(m.fdacsIm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(
      p.jsonLd.join('\n') + (p.fdacsBlock ? m.fdacsIm : '')
    );
    rows.push({
      companyId: m.companyId,
      slug: m.slug,
      fdacsIm: m.fdacsIm,
      status: p.status,
      noindex: p.noindex,
      floridaChrome: p.floridaChrome,
      fdacsBlock: p.fdacsBlock,
      fdacsExact: p.fdacsBlock && new RegExp(`\\b${m.fdacsIm}\\b`).test(JSON.stringify(p)),
      scope: p.scope,
      phoneLabel: p.phoneLabel,
      emailLabel: p.emailLabel,
      addressLabel: p.addressLabel,
      noFederalIdCopy: p.noFederalIdCopy,
      prohibited: p.prohibited,
      fmcsaHeadline: p.fmcsaHeadline,
      structured: sd,
    });
  }

  const sitemap = await fetch(`${BASE}/sitemap.xml`, {
    headers: { 'user-agent': 'MoveTrustHub-FL010-live/1.0' },
  }).then((r) => r.text());
  const sitemapHits = man.members.filter((m) => sitemap.includes(m.slug));

  const http200 = rows.filter((r) => r.status === 200).length;
  const noindex = rows.filter((r) => r.noindex).length;
  const chrome = rows.filter((r) => r.floridaChrome).length;
  const fdacs = rows.filter((r) => r.fdacsBlock).length;
  const prohibited = rows.filter((r) => r.prohibited || r.fmcsaHeadline);
  const report = {
    google_places_requests: 0,
    tested: rows.length,
    http200,
    noindex,
    chrome,
    fdacs,
    sitemapHits: sitemapHits.map((m) => m.slug),
    prohibited: prohibited.map((r) => r.slug),
    rows,
  };
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-010-live-sweep.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(
    JSON.stringify(
      {
        tested: rows.length,
        http200,
        noindex,
        chrome,
        fdacs,
        sitemapHits: sitemapHits.length,
        prohibited: prohibited.length,
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
