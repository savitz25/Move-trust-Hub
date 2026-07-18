import { readFileSync } from 'fs';

const d = JSON.parse(readFileSync('C:/Users/makei/move-trust-hub/.lh-mobile.json', 'utf8'));
const a = d.audits;

const insights = [
  'render-blocking-insight',
  'lcp-breakdown-insight',
  'legacy-javascript-insight',
  'font-display-insight',
  'third-parties-insight',
  'forced-reflow-insight',
  'network-dependency-tree-insight',
  'cache-insight',
  'image-delivery-insight',
  'duplicated-javascript-insight',
  'dom-size-insight',
];

for (const id of insights) {
  const audit = a[id];
  if (!audit) continue;
  console.log(`\n=== ${id} ===`);
  console.log('Title:', audit.title);
  console.log('Score:', audit.score);
  console.log('Display:', audit.displayValue ?? 'n/a');
  if (audit.details?.items?.length) {
    audit.details.items.slice(0, 5).forEach((item, i) => {
      if (item.url) console.log(`  ${i + 1}. ${item.url?.slice(-80)} wastedMs=${item.wastedMs ?? 'n/a'} bytes=${item.totalBytes ?? item.wastedBytes ?? 'n/a'}`);
      else if (item.label || item.subpart) console.log(`  ${i + 1}. ${item.label ?? item.subpart}: ${item.duration ?? item.value ?? JSON.stringify(item).slice(0, 100)}`);
      else console.log(`  ${i + 1}.`, JSON.stringify(item).slice(0, 150));
    });
  }
}

// Standard opportunities with savings
console.log('\n=== STANDARD OPPORTUNITIES ===');
Object.values(a)
  .filter((x) => x.details?.type === 'opportunity' && x.score !== null && x.score < 1)
  .sort((x, y) => (y.numericValue || 0) - (x.numericValue || 0))
  .forEach((x) => {
    console.log(`${x.id}: ${x.displayValue} (numericMs=${x.numericValue ?? 0})`);
  });