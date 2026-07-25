const base = (process.argv[2] || 'https://www.movetrusthub.com').replace(/\/$/, '');
const bust = `cb=${Date.now()}`;
const wave2 = [
  ['portsmouth', 'Moving in Portsmouth'],
  ['suffolk', 'Moving in Suffolk'],
  ['lynchburg', 'Moving in Lynchburg'],
  ['charlottesville', 'Moving in Charlottesville'],
  ['bedford', 'Moving in Bedford'],
  ['augusta', 'Moving in Augusta'],
  ['rockingham', 'Moving in Rockingham'],
  ['culpeper', 'Moving in Culpeper'],
  ['orange', 'Moving in Orange'],
  ['louisa', 'Moving in Louisa'],
  ['gloucester', 'Moving in Gloucester'],
  ['isle-of-wight', 'Moving in Isle of Wight'],
];
const regression = [
  ['virginia', 'fairfax', 'Moving in'],
  ['virginia', 'stafford', 'Moving in Stafford'],
  ['virginia', 'norfolk', 'Moving in'],
  ['tennessee', 'sumner', 'Moving in Sumner'],
];
function extractH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return null;
  return m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().replace(/&amp;/g, '&');
}
async function fetchPage(path) {
  const res = await fetch(`${base}${path}?${bust}`, {
    headers: { 'user-agent': 'MoveTrustHub-QA/1.0', 'cache-control': 'no-cache' },
  });
  return { status: res.status, html: await res.text() };
}
let fail = 0;
console.log('\n=== VA Tier 2 Wave 2 live QA ===\n');
for (const [slug, expect] of wave2) {
  try {
    const { status, html } = await fetchPage(`/local-movers/virginia/${slug}`);
    const h1 = extractH1(html);
    const okH1 = h1 && h1.startsWith(expect) && !/^Movers Serving/i.test(h1);
    const okParent = /Compared with/i.test(html);
    const okDate = !/Invalid Date/i.test(html);
    const pass = status === 200 && okH1 && okParent && okDate;
    if (!pass) fail++;
    console.log(
      `${pass ? 'PASS' : 'FAIL'} | ${slug.padEnd(14)} | ${String(status).padEnd(3)} | ${okParent ? 'yes' : 'NO '} | ${okDate ? 'date-ok' : 'BAD-DATE'} | ${h1 || '(missing)'}`
    );
  } catch (e) {
    fail++;
    console.log(`FAIL | ${slug} | ERR | ${e.message}`);
  }
}
console.log('\n=== Regression ===\n');
for (const [state, slug, expect] of regression) {
  try {
    const { status, html } = await fetchPage(`/local-movers/${state}/${slug}`);
    const h1 = extractH1(html);
    const okDate = !/Invalid Date/i.test(html);
    const pass =
      status === 200 &&
      !!h1 &&
      h1.startsWith(expect) &&
      !/^Movers Serving/i.test(h1) &&
      okDate;
    if (!pass) fail++;
    console.log(
      `${pass ? 'PASS' : 'FAIL'} | ${state}/${slug} | ${status} | ${okDate ? 'date-ok' : 'BAD-DATE'} | ${h1 || '(missing)'}`
    );
  } catch (e) {
    fail++;
    console.log(`FAIL | ${state}/${slug} | ERR | ${e.message}`);
  }
}
console.log(fail ? `\n${fail} failure(s)` : '\nAll live QA checks passed.');
process.exit(fail ? 1 : 0);
