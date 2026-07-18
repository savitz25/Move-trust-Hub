import { readFileSync } from 'fs';

const file = process.argv[2];
const d = JSON.parse(readFileSync(file, 'utf8'));
const cat = d.categories;
const a = d.audits;

const scores = {
  file,
  url: d.finalUrl,
  fetchTime: d.fetchTime,
  performance: Math.round((cat.performance?.score || 0) * 100),
  accessibility: Math.round((cat.accessibility?.score || 0) * 100),
  bestPractices: Math.round((cat['best-practices']?.score || 0) * 100),
  seo: Math.round((cat.seo?.score || 0) * 100),
  metrics: {},
};

for (const id of [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
  'interactive',
  'max-potential-fid',
]) {
  if (a[id]) scores.metrics[id] = a[id].displayValue;
}

const opps = Object.values(a)
  .filter((x) => (x.details?.type === 'opportunity' || x.scoreDisplayMode === 'metricSavings') && x.score !== null && x.score < 1 && x.displayValue)
  .map((x) => ({ id: x.id, title: x.title, displayValue: x.displayValue, metricSavings: x.metricSavings }))
  .slice(0, 12);

scores.opportunities = opps;
console.log(JSON.stringify(scores, null, 2));