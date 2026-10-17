import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const headerPath = join(dirname(fileURLToPath(import.meta.url)), 'move-network-header.tsx');
const header = readFileSync(headerPath, 'utf8');
const accountFn = header.slice(
  header.indexOf('function MoveCanonicalAccountEntry'),
  header.indexOf('export function MoveNetworkHeader'),
);

test('header account entry is one Ask sign-in link on desktop, mobile, and the drawer', () => {
  assert.equal(header.match(/useMyTrustHubHref\('\/my\/sign-in'\)/g)?.length, 1);
  assert.equal(header.includes('MyTrustHubAccountLink'), false);
  assert.equal(header.includes("useMyTrustHubHref('/my')"), false);
  for (const variant of ['desktop', 'mobile-header', 'drawer']) {
    const hits = header.match(new RegExp(`<MoveCanonicalAccountEntry variant="${variant}"`, 'g')) || [];
    assert.equal(hits.length, 1, variant);
  }
  assert.match(
    header,
    /<MoveCanonicalAccountEntry variant="drawer" onNavigate=\{\(\) => setOpen\(false\)\}/,
  );
});

test('My Move stays a separate workspace and the account control is not the HQ sign-in panel', () => {
  assert.match(header, /<MyMoveNavLink variant="desktop"/);
  assert.match(header, /<MyMoveNavLink variant="mobile-header"/);
  assert.equal((header.match(/href="\/my-move"/g) || []).length, 1);
  assert.match(header, /function onKey\(e: KeyboardEvent\)/);
  assert.match(header, /e\.key === 'Escape'\) setOpen\(false\)/);
  assert.doesNotMatch(header, /Email me a sign-in link|google|facebook/i);
  assert.match(accountFn, /<a[\s\S]*href=\{href\}/);
  assert.doesNotMatch(accountFn, /<button/);
  assert.doesNotMatch(accountFn, /tabIndex=\{-1\}/);
  assert.match(accountFn, /aria-label="My TrustHub"/);
  assert.match(accountFn, />\s*My TrustHub\s*</);
});
