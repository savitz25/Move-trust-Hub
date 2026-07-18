import { readFileSync } from 'fs';

const d = JSON.parse(readFileSync('C:/Users/makei/move-trust-hub/.lh-mobile.json', 'utf8'));
const cat = d.categories;
const a = d.audits;

console.log('Performance:', Math.round((cat.performance?.score || 0) * 100));
console.log('Accessibility:', Math.round((cat.accessibility?.score || 0) * 100));
console.log('Best Practices:', Math.round((cat['best-practices']?.score || 0) * 100));
console.log('SEO:', Math.round((cat.seo?.score || 0) * 100));

const metrics = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
  'interactive',
  'max-potential-fid',
  'server-response-time',
  'bootup-time',
  'mainthread-work-breakdown',
  'dom-size',
  'total-byte-weight',
  'unused-javascript',
  'unused-css-rules',
  'render-blocking-resources',
  'legacy-javascript',
  'long-tasks',
];

console.log('\nMetrics:');
for (const id of metrics) {
  if (a[id]) console.log(`  ${id}: ${a[id].displayValue ?? 'N/A'} (score: ${a[id].score})`);
}

console.log('\nOpportunities:');
Object.values(a)
  .filter((x) => x.details?.type === 'opportunity' && x.score !== null && x.score < 1)
  .sort((x, y) => (y.numericValue || 0) - (x.numericValue || 0))
  .slice(0, 15)
  .forEach((x) => console.log(`  ${x.id}: ${x.displayValue}`));

if (a['layout-shift-elements']?.details?.items) {
  console.log('\nCLS elements:');
  a['layout-shift-elements'].details.items.slice(0, 5).forEach((item) => {
    console.log(`  ${item.node?.snippet?.slice(0, 80) ?? 'unknown'}: ${item.score?.toFixed(4)}`);
  });
}

if (a['largest-contentful-paint-element']?.details?.items?.[0]) {
  console.log('\nLCP element:', a['largest-contentful-paint-element'].details.items[0].node?.snippet?.slice(0, 120));
}