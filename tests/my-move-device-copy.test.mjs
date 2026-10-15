import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../app/(move)/my-move/page.tsx', import.meta.url), 'utf8');

test('My Move does not claim cross-device sync while parent Save is off', () => {
  assert.equal(source.includes('synced across devices'), false);
  assert.match(
    source,
    /user\s*\?\s*'Your independent command center — inventories, shortlists, and comparisons\. Every tool on Move Trust Hub still works without signing in\.'/,
  );
  assert.match(
    source,
    /: 'Your independent command center — inventories, shortlists, and comparisons stay on this device\. Every tool on Move Trust Hub still works without signing in\.'/,
  );
  assert.match(
    source,
    /'Your Move workspace — plans, inventories, reports, and comparisons\. Your account is My TrustHub, one sign-in across every TrustHub site\. Every tool here works without signing in\.'/,
  );
});
