/**
 * Unit checks for resolveStateHubDirectoryBadge.
 *   npx tsx scripts/test-county-guide-badge.ts
 */
import {
  DEEP_GUIDE_MOVER_THRESHOLD,
  resolveStateHubDirectoryBadge,
} from '../lib/local-movers/county-guide-badge';

const cases: Array<{
  count: number;
  editorial?: boolean;
  expect: 'Deep guide' | 'Limited';
}> = [
  { count: 0, expect: 'Limited' },
  { count: 1, expect: 'Limited' },
  { count: 30, expect: 'Limited' },
  { count: 31, expect: 'Deep guide' },
  { count: 45, expect: 'Deep guide' },
  { count: 100, expect: 'Deep guide' },
  { count: 25, editorial: true, expect: 'Deep guide' },
  { count: 0, editorial: true, expect: 'Deep guide' },
  { count: 30, editorial: false, expect: 'Limited' },
];

let failed = 0;
for (const c of cases) {
  const got = resolveStateHubDirectoryBadge(c.count, {
    editorialDeepGuide: c.editorial,
  });
  const ok = got === c.expect;
  if (!ok) {
    failed += 1;
    console.error(
      `FAIL count=${c.count} editorial=${Boolean(c.editorial)} got=${got} expect=${c.expect}`
    );
  } else {
    console.log(
      `OK   count=${c.count} editorial=${Boolean(c.editorial)} → ${got}`
    );
  }
}

console.log(`threshold=${DEEP_GUIDE_MOVER_THRESHOLD}`);
if (failed) {
  console.error(`FAILED ${failed}`);
  process.exit(1);
}
console.log('PASS');
