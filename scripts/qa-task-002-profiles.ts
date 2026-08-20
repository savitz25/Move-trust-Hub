const BASE = process.env.QA_BASE_URL || 'http://127.0.0.1:3013';

const pages = [
  { path: '/companies/allied-van-lines', expect: ['76235', 'independently authorized agents'], forbid: ['125563'], noindex: false },
  { path: '/companies/aero-mayflower-transit-company', expect: ['125563', 'MAYFLOWER'], forbid: [], noindex: false },
  { path: '/companies/atlas-van-lines', expect: ['125550'], forbid: ['USDOT 125563'], noindex: false },
  { path: '/companies/wheaton-world-wide', expect: ['70719'], forbid: [], noindex: false },
  { path: '/companies/graebel-van-lines', expect: ['inactive'], forbid: [], noindex: true },
  { path: '/companies/arpin-van-lines', expect: ['49922'], forbid: [], noindex: false },
  { path: '/companies/national-van-lines', expect: ['76628'], forbid: [], noindex: false },
  { path: '/companies/north-american-moving-storage', expect: ['70851'], forbid: [], noindex: false },
  { path: '/companies/northern-michigan-moving', expect: ['Northern Michigan'], forbid: [], noindex: true },
];

async function main() {
  const results = [];
  for (const page of pages) {
    const res = await fetch(`${BASE}${page.path}`, {
      headers: { 'x-forwarded-proto': 'https' },
      redirect: 'manual',
    });
    const html = await res.text();
    const robots = html.match(/name="robots" content="([^"]+)"/)?.[1] ?? '';
    const failures: string[] = [];
    if (res.status !== 200) failures.push(`status ${res.status}`);
    for (const needle of page.expect) {
      if (!html.toLowerCase().includes(needle.toLowerCase())) failures.push(`missing ${needle}`);
    }
    for (const needle of page.forbid) {
      if (html.includes(needle)) failures.push(`forbidden ${needle}`);
    }
    if (page.noindex && !/noindex/i.test(robots)) failures.push('expected noindex');
    results.push({ path: page.path, status: res.status, robots, ok: failures.length === 0, failures });
  }
  const sitemap = await fetch(`${BASE}/sitemap.xml`, {
    headers: { 'x-forwarded-proto': 'https' },
  });
  const xml = await sitemap.text();
  const companyCount = (xml.match(/\/companies\//g) ?? []).length;
  const graebelIn = /graebel-van-lines/.test(xml);
  const northernIn = /northern-michigan-moving</.test(xml);
  results.push({
    path: '/sitemap.xml',
    status: sitemap.status,
    robots: '',
    ok: sitemap.status === 200 && !graebelIn && !northernIn,
    failures: [
      ...(graebelIn ? ['graebel in sitemap'] : []),
      ...(northernIn ? ['northern michigan in sitemap'] : []),
    ],
  });
  console.log(JSON.stringify({ base: BASE, companyCount, google_places_requests: 0, results }, null, 2));
  if (results.some((row) => !row.ok)) process.exit(1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
