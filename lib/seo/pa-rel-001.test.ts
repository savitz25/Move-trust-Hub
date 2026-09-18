import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { normalizedPublishedStatePath } from './published-state-path';

const root = process.cwd();
const read = (rel: string) => readFileSync(join(root, rel), 'utf8');

test('PA-REL-001 mixed-case statewide paths normalize', () => {
  assert.equal(normalizedPublishedStatePath('/Pennsylvania'), '/pennsylvania');
  assert.equal(normalizedPublishedStatePath('/PENNSYLVANIA'), '/pennsylvania');
  assert.equal(normalizedPublishedStatePath('/PeNnSyLvAnIa'), '/pennsylvania');
  assert.equal(normalizedPublishedStatePath('/pennsylvania'), null);
  assert.equal(normalizedPublishedStatePath('/Pennsylvania/philadelphia'), null);
});

test('PA-REL-001 middleware and footer publish lowercase /pennsylvania', () => {
  const mw = read('middleware.ts');
  assert.match(mw, /normalizedPublishedStatePath/);
  assert.match(mw, /308/);
  const footer = read('lib/hub/config.ts');
  assert.match(footer, /href: '\/pennsylvania'/);
  assert.doesNotMatch(footer, /href: '\/Pennsylvania'/);
});

test('OH-MOVE-001 mixed-case statewide paths normalize', () => {
  assert.equal(normalizedPublishedStatePath('/Ohio'), '/ohio');
  assert.equal(normalizedPublishedStatePath('/OHIO'), '/ohio');
  assert.equal(normalizedPublishedStatePath('/oHiO'), '/ohio');
  assert.equal(normalizedPublishedStatePath('/ohio'), null);
  assert.equal(normalizedPublishedStatePath('/Ohio/columbus'), null);
});

test('OH-MOVE-001 middleware and footer publish lowercase /ohio', () => {
  const mw = read('middleware.ts');
  assert.match(mw, /normalizedPublishedStatePath/);
  assert.match(mw, /308/);
  const footer = read('lib/hub/config.ts');
  assert.match(footer, /href: '\/ohio'/);
  assert.doesNotMatch(footer, /href: '\/Ohio'/);
});
