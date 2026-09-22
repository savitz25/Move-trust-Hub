import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

/**
 * MOVE-PROFILE-V3-001D: static structural guard for the mobile-overflow fix.
 * Real CSS layout (flex-wrap resolution, actual overflow) needs a browser --
 * verified live at 320/390/1440px against all 12 reachable auto-transport
 * profiles this session (0 overflowing elements at every width, every
 * profile). This test locks the specific class changes that fixed it, so a
 * future edit can't silently reintroduce the three confirmed root causes
 * without this test failing first, even without a browser in CI.
 *
 * Deliberately NOT colocated in app/(move)/auto-transport/[slug]/ --
 * `node --test`'s path/glob handling treats the literal "[slug]" folder
 * name as a bracket character class and silently matches zero files.
 */

// fs.readFileSync never does glob expansion (only a shell or the node:test
// CLI's own path matcher would), so a plain path.join with the literal
// "[slug]" folder name is safe here -- it's only unsafe to pass this path
// as a `node --test <path>` CLI argument.
const PAGE_PATH = path.join(
  path.resolve(__dirname, '..', '..'),
  'app',
  '(move)',
  'auto-transport',
  '[slug]',
  'page.tsx'
);

function readPage(): string {
  return fs.readFileSync(PAGE_PATH, 'utf8');
}

test('the auto-transport page file is found at the expected path', () => {
  assert.ok(fs.existsSync(PAGE_PATH), `expected to find ${PAGE_PATH}`);
});

test('header action row (Visit official site / Add to Compare) wraps instead of overflowing', () => {
  const source = readPage();
  assert.match(
    source,
    /flex flex-wrap items-center gap-3/,
    'the header-right action row must allow wrapping -- a plain "flex items-center gap-3" with no wrap caused a confirmed 181px overflow at 390px'
  );
});

test('CompanyVerificationBadges no longer forced shrink-0 on this page', () => {
  const source = readPage();
  assert.ok(
    !/CompanyVerificationBadges[^>]*shrink-0/.test(source),
    'shrink-0 on CompanyVerificationBadges prevented its own internal flex-wrap from ever engaging, causing a confirmed 148px overflow at 320px'
  );
});

test('the header title wrapper allows its flex children to shrink/wrap (min-w-0)', () => {
  const source = readPage();
  assert.match(
    source,
    /<div className="min-w-0">\s*<div className="flex flex-wrap items-center gap-2">/,
    'without min-w-0, the default flex min-width:auto kept the title row from wrapping, overflowing the h1 by 27px at 320px'
  );
});

test('the h1 company name allows word breaking as a safety net for long names', () => {
  const source = readPage();
  assert.match(source, /text-4xl font-semibold tracking-tight break-words/);
});

test('the "Visit Company Website" sidebar button allows its label to wrap', () => {
  const source = readPage();
  assert.match(
    source,
    /Button className="w-full whitespace-normal"/,
    'the base Button component\'s whitespace-nowrap plus icon made "Visit Company Website" overflow its own w-full button by 24-45px at 320-390px'
  );
});
