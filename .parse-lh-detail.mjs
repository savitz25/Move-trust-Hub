import { readFileSync } from 'fs';

const d = JSON.parse(readFileSync('C:/Users/makei/move-trust-hub/.lh-mobile.json', 'utf8'));
const a = d.audits;

if (a['largest-contentful-paint-element']?.details?.items?.[0]) {
  console.log('LCP element:', a['largest-contentful-paint-element'].details.items[0].node?.snippet);
}

if (a['bootup-time']?.details?.items) {
  console.log('\nBootup time by script:');
  a['bootup-time'].details.items
    .sort((x, y) => y.total - x.total)
    .slice(0, 12)
    .forEach((item) => console.log(`  ${item.total.toFixed(0)}ms - ${item.url?.slice(-80) ?? item.scripting}`));
}

if (a['network-requests']?.details?.items) {
  console.log('\nLargest network requests:');
  a['network-requests'].details.items
    .filter((x) => x.resourceType === 'Script' || x.resourceType === 'Image' || x.resourceType === 'Document')
    .sort((x, y) => (y.transferSize || 0) - (x.transferSize || 0))
    .slice(0, 15)
    .forEach((item) => console.log(`  ${Math.round((item.transferSize || 0) / 1024)}KB ${item.resourceType} - ${item.url?.slice(-90)}`));
}

if (a['render-blocking-resources']?.details?.items?.length) {
  console.log('\nRender-blocking:');
  a['render-blocking-resources'].details.items.forEach((item) => console.log(`  ${item.url}`));
} else {
  console.log('\nRender-blocking: none flagged');
}

if (a['dom-size']?.displayValue) {
  console.log('\nDOM:', a['dom-size'].displayValue);
  if (a['dom-size'].details?.items?.length) {
    a['dom-size'].details.items.slice(0, 5).forEach((item) => console.log(`  ${item.statistic}: ${item.value}`));
  }
}

if (a['third-party-summary']?.details?.items) {
  console.log('\nThird-party:');
  a['third-party-summary'].details.items
    .sort((x, y) => y.mainThreadTime - x.mainThreadTime)
    .slice(0, 8)
    .forEach((item) => console.log(`  ${item.entity} - ${item.mainThreadTime.toFixed(0)}ms main thread, ${Math.round(item.transferSize / 1024)}KB`));
}

if (a['diagnostics']?.details?.items) {
  console.log('\nDiagnostics notes:');
  a['diagnostics'].details.items.slice(0, 8).forEach((item) => console.log(`  ${item.label ?? item.name}: ${item.value ?? item.description}`));
}

// Network dependency tree
if (a['network-dependency-tree-insight'] || a['lcp-discovery-insight']) {
  console.log('\nInsights available:', Object.keys(a).filter((k) => k.includes('insight') && a[k].score !== null).join(', '));
}

Object.keys(a).filter((k) => k.includes('insight')).forEach((k) => {
  const audit = a[k];
  if (audit.score !== null && audit.score < 1 && audit.details?.items?.length) {
    console.log(`\n${k}:`, audit.title);
    audit.details.items.slice(0, 3).forEach((item) => console.log(' ', JSON.stringify(item).slice(0, 200)));
  }
});