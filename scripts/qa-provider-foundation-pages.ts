/**
 * HTML QA for Task 001.1 representative profiles. Does not call Google Places.
 */
const BASE = process.env.QA_BASE_URL || 'http://127.0.0.1:3011';

type Check = {
  name: string;
  path: string;
  expect: string[];
  forbid: string[];
  noindex?: boolean;
};

const checks: Check[] = [
  {
    name: 'local',
    path: '/companies/1st-choice-movers-llc',
    expect: ['Local', 'does not by itself mean'],
    forbid: ['Federal HHG Carrier Authority Verified'],
  },
  {
    name: 'carrier',
    path: '/companies/blue-hauling-llc',
    expect: ['Carrier', 'household-goods'],
    forbid: [],
  },
  {
    name: 'broker',
    path: '/companies/america-first-moving-services-inc',
    expect: ['broker', 'not itself the motor carrier'],
    forbid: [],
  },
  {
    name: 'carrier_broker',
    path: '/companies/1-800-pack-rat',
    expect: ['Carrier', 'Broker'],
    forbid: [],
  },
  {
    name: 'auto_carrier',
    path: '/auto-transport/intercity-lines',
    expect: ['Auto'],
    forbid: ['3BR', '3-bedroom', '3 bedroom'],
  },
  {
    name: 'auto_broker',
    path: '/auto-transport/sherpa-auto-transport',
    expect: ['broker', 'independent carriers'],
    forbid: ['3BR', 'Federal HHG Carrier Authority Verified'],
  },
  {
    name: 'hhg_auto',
    path: '/companies/stevens-worldwide',
    expect: ['Carrier', 'Auto'],
    forbid: [],
  },
  {
    name: 'usdot_125563_allied',
    path: '/companies/allied-van-lines',
    expect: ['Allied'],
    forbid: [],
    noindex: true,
  },
];

async function fetchPage(path: string) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      'user-agent': 'MoveTrustHub-QA/001.1',
      'x-forwarded-proto': 'https',
    },
    redirect: 'manual',
  });
  const html = await res.text();
  const robots = html.match(/<meta[^>]+name=["']robots["'][^>]*>/i)?.[0] ?? '';
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0] ?? '';
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
  return { url, status: res.status, html, text, robots, canonical };
}

async function main() {
  const results = [];
  for (const check of checks) {
    const page = await fetchPage(check.path);
    const failures: string[] = [];
    if (page.status !== 200) failures.push(`status ${page.status}`);
    for (const needle of check.expect) {
      if (!page.text.toLowerCase().includes(needle.toLowerCase())) {
        failures.push(`missing: ${needle}`);
      }
    }
    for (const needle of check.forbid) {
      if (page.text.toLowerCase().includes(needle.toLowerCase())) {
        failures.push(`forbidden: ${needle}`);
      }
    }
    if (check.noindex && !/noindex/i.test(page.robots + page.html)) {
      failures.push('expected noindex');
    }
    const slug = check.path.split('/').pop();
    if (
      slug &&
      check.path.startsWith('/companies/') &&
      page.canonical &&
      !page.canonical.includes(slug)
    ) {
      failures.push(`canonical slug mismatch: ${page.canonical}`);
    }
    results.push({
      name: check.name,
      path: check.path,
      status: page.status,
      robots: page.robots.slice(0, 180),
      canonical: page.canonical.slice(0, 220),
      ok: failures.length === 0,
      failures,
    });
  }

  const sitemap = await fetchPage('/sitemap.xml');
  const sitemapReviewLeak = /allied-van-lines|aero-mayflower-transit-company/.test(sitemap.html);
  results.push({
    name: 'sitemap',
    path: '/sitemap.xml',
    status: sitemap.status,
    robots: '',
    canonical: '',
    ok: sitemap.status === 200 && !sitemapReviewLeak,
    failures: sitemapReviewLeak ? ['REVIEW_REQUIRED brand leaked into sitemap'] : [],
  });

  console.log(JSON.stringify({ base: BASE, google_places_requests: 0, results }, null, 2));
  if (results.some((row) => !row.ok)) process.exit(1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
