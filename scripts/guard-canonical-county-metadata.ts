/**
 * CI guard — county pages must use resolveCountyPageSeo / buildCountyPageMetadata only.
 */
import { readFileSync } from 'node:fs';

const COUNTY_PAGE = 'app/(move)/(marketing)/local-movers/[stateSlug]/[countySlug]/page.tsx';
const content = readFileSync(COUNTY_PAGE, 'utf8');

const violations: string[] = [];

if (!content.includes('resolveCountyPageSeo')) {
  violations.push('county page must use resolveCountyPageSeo()');
}
if (content.includes('buildCountyPageMetadata(')) {
  violations.push('county page must not call buildCountyPageMetadata directly — use resolveCountyPageSeo');
}
if (/evaluateCountyIndexabilityFromResult\s*\(/.test(content)) {
  violations.push('county page must not call evaluateCountyIndexabilityFromResult directly — use resolveCountyPageSeo');
}
if (/keywords\s*:/.test(content)) {
  violations.push('county page must not set metadata keywords');
}

if (violations.length > 0) {
  console.error('Canonical county metadata guard failed:');
  violations.forEach((v) => console.error(`  - ${v}`));
  process.exit(1);
}

console.log('OK: county page uses canonical resolveCountyPageSeo metadata path');