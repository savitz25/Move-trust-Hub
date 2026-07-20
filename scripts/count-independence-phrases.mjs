const urls = [
  'https://www.movetrusthub.com/',
  'https://www.movetrusthub.com/moving-to/florida/boca-raton',
  'https://www.movetrusthub.com/companies',
  'https://www.movetrusthub.com/compare',
];

for (const u of urls) {
  const h = await (await fetch(u, { headers: { 'cache-control': 'no-cache' } })).text();
  const visible = h
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
  const phrases = [
    'no lead fees',
    'no paid placements',
    'Independent directory',
    'INDEPENDENT & VERIFIED',
    'INDEPENDENT &amp; VERIFIED',
  ];
  const counts = {};
  for (const p of phrases) {
    const re = new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    counts[p] = (visible.match(re) || []).length;
  }
  console.log(u.replace('https://www.movetrusthub.com', '') || '/', counts);
}