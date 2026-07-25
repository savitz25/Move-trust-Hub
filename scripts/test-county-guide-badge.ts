/**
 * Unit checks for resolveStateHubDirectoryBadge (strict threshold).
 *   npx tsx scripts/test-county-guide-badge.ts
 */
import {
  DEEP_GUIDE_MOVER_THRESHOLD,
  resolveStateHubDirectoryBadge,
} from '../lib/local-movers/county-guide-badge';

const cases: Array<{
  count: number;
  opts?: {
    hasDeepResearch?: boolean;
    allowNearThresholdEditorial?: boolean;
    editorialDeepGuide?: boolean;
  };
  expect: 'Deep guide' | 'Limited';
  label: string;
}> = [
  { count: 0, expect: 'Limited', label: '0' },
  { count: 12, expect: 'Limited', label: '12' },
  { count: 28, expect: 'Limited', label: '28' },
  { count: 29, expect: 'Limited', label: '29' },
  { count: 30, expect: 'Limited', label: '30' },
  { count: 31, expect: 'Deep guide', label: '31' },
  { count: 35, expect: 'Deep guide', label: '35' },
  { count: 45, expect: 'Deep guide', label: '45' },
  // Deep research alone must NOT override ≤30
  {
    count: 26,
    opts: { hasDeepResearch: true },
    expect: 'Limited',
    label: '26+deep (no opt-in)',
  },
  {
    count: 28,
    opts: { hasDeepResearch: true },
    expect: 'Limited',
    label: '28+deep (no opt-in)',
  },
  {
    count: 30,
    opts: { hasDeepResearch: true },
    expect: 'Limited',
    label: '30+deep (no opt-in)',
  },
  // Deprecated flag must not force Deep guide
  {
    count: 25,
    opts: { editorialDeepGuide: true },
    expect: 'Limited',
    label: 'deprecated editorialDeepGuide ignored',
  },
  // Opt-in near-threshold only for 28–29
  {
    count: 28,
    opts: { hasDeepResearch: true, allowNearThresholdEditorial: true },
    expect: 'Deep guide',
    label: '28+deep+near opt-in',
  },
  {
    count: 29,
    opts: { hasDeepResearch: true, allowNearThresholdEditorial: true },
    expect: 'Deep guide',
    label: '29+deep+near opt-in',
  },
  {
    count: 27,
    opts: { hasDeepResearch: true, allowNearThresholdEditorial: true },
    expect: 'Limited',
    label: '27+deep+near opt-in still Limited',
  },
  {
    count: 30,
    opts: { hasDeepResearch: true, allowNearThresholdEditorial: true },
    expect: 'Limited',
    label: '30+deep+near opt-in still Limited',
  },
];

let failed = 0;
for (const c of cases) {
  const got = resolveStateHubDirectoryBadge(c.count, c.opts);
  const ok = got === c.expect;
  if (!ok) {
    failed += 1;
    console.error(`FAIL ${c.label}: got=${got} expect=${c.expect}`);
  } else {
    console.log(`OK   ${c.label} → ${got}`);
  }
}

console.log(`threshold=${DEEP_GUIDE_MOVER_THRESHOLD}`);
if (failed) {
  console.error(`FAILED ${failed}`);
  process.exit(1);
}
console.log('PASS');
