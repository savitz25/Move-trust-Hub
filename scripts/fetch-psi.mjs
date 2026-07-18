const url = process.argv[2] || 'https://www.movetrusthub.com/';
const strategy = process.argv[3] || 'desktop';
const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo`;

const res = await fetch(api);
const text = await res.text();
if (!res.ok) {
  console.error('HTTP', res.status, text.slice(0, 500));
  process.exit(1);
}
const data = JSON.parse(text);
const lr = data.lighthouseResult;
const cats = lr.categories;
const audits = lr.audits;
const out = {
  strategy,
  url: lr.finalUrl,
  fetchTime: lr.fetchTime,
  performance: Math.round((cats.performance?.score ?? 0) * 100),
  accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
  bestPractices: Math.round((cats['best-practices']?.score ?? 0) * 100),
  seo: Math.round((cats.seo?.score ?? 0) * 100),
  metrics: {
    FCP: audits['first-contentful-paint']?.displayValue,
    LCP: audits['largest-contentful-paint']?.displayValue,
    TBT: audits['total-blocking-time']?.displayValue,
    CLS: audits['cumulative-layout-shift']?.displayValue,
    SI: audits['speed-index']?.displayValue,
    INP: audits.interaction?.displayValue ?? audits['experimental-interaction-to-next-paint']?.displayValue,
  },
  opportunities: Object.values(audits)
    .filter((a) => a.details?.type === 'opportunity' && a.score !== null && a.score < 1)
    .map((a) => ({ id: a.id, title: a.title, displayValue: a.displayValue, score: a.score }))
    .sort((a, b) => (a.score ?? 1) - (b.score ?? 1))
    .slice(0, 10),
  insights: Object.values(audits)
    .filter((a) => a.id?.endsWith('-insight') && a.score !== null && a.score < 1 && a.displayValue)
    .map((a) => ({ id: a.id, title: a.title, displayValue: a.displayValue, score: a.score }))
    .slice(0, 10),
};
console.log(JSON.stringify(out, null, 2));