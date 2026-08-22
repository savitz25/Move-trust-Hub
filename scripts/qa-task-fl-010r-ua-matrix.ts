/**
 * FL-010R user-agent HTTP matrix. Google Places: 0.
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE = process.env.QA_BASE_URL || 'https://www.movetrusthub.com';
const AGENTS = [
  ['browser', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'],
  ['curl', 'curl/8.5.0'],
  ['googlebot', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'],
  ['bingbot', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'],
  ['twitterbot', 'Twitterbot/1.0'],
  ['facebook', 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'],
] as const;

const PATHS = [
  ['ingested', '/companies/gentletouch-moving-company'],
  ['unknown', '/companies/this-slug-should-not-exist-fl010r-xyz'],
  ['publishable', '/companies/i-95-relocation-inc'],
  ['indexable', '/companies/allied-van-lines'],
] as const;

async function probe(path: string, ua: string) {
  const res = await fetch(`${BASE}${path}`, {
    redirect: 'manual',
    headers: { 'user-agent': ua, 'cache-control': 'no-cache' },
  });
  const text = await res.text();
  return {
    status: res.status,
    title: (text.match(/<title>([^<]+)/i) ?? ['', ''])[1],
    robots: (text.match(/name="robots" content="([^"]+)"/i) ?? ['', ''])[1],
    matched: res.headers.get('x-matched-path'),
    cache: res.headers.get('x-vercel-cache'),
    cacheControl: res.headers.get('cache-control'),
    cdnCache: res.headers.get('cdn-cache-control'),
  };
}

async function main() {
  const rows = [];
  for (const [kind, path] of PATHS) {
    for (const [name, ua] of AGENTS) {
      rows.push({ kind, path, ua: name, ...(await probe(path, ua)) });
    }
  }
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-010r-ua-matrix.json'), JSON.stringify({ google_places_requests: 0, base: BASE, rows }, null, 2) + '\n');
  console.log(JSON.stringify(rows.map((r) => ({ kind: r.kind, ua: r.ua, status: r.status, title: r.title, matched: r.matched })), null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
