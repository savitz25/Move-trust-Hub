import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { interpretMoveAskQuery } from './interpret';
import { MOVE_GOLDEN_QUESTIONS } from './golden-questions';
import { MOVE_SEARCH_CAPABILITIES } from '../specialist-search/capabilities';
import { SPECIALIST_SEARCH_ANALYTICS_EVENTS, SPECIALIST_SEARCH_VERSION } from '../specialist-search/contract';

test('portable contract and Move capability states are frozen', () => {
  assert.equal(SPECIALIST_SEARCH_VERSION, 'trusthub-specialist-search-v1');
  assert.deepEqual(new Set(MOVE_SEARCH_CAPABILITIES.map((c) => c.supportState)), new Set(['KNOWN', 'PARTIAL', 'REQUEST_ONLY', 'NOT_ACQUIRED', 'UNSUPPORTED']));
  assert.equal(SPECIALIST_SEARCH_ANALYTICS_EVENTS.length, 7);
});

test('60+ golden questions remain deterministic and fail safely', () => {
  assert.ok(MOVE_GOLDEN_QUESTIONS.length >= 60);
  for (const item of MOVE_GOLDEN_QUESTIONS) {
    const parsed = interpretMoveAskQuery(item.query);
    assert.ok(parsed.interpretation.length > 0, item.query || '<empty>');
    assert.ok(parsed.raw.length <= 180, item.query || '<empty>');
    if (item.expected === 'UNSUPPORTED_SAFE') assert.equal(parsed.query.mode, 'fail_closed', item.query || '<empty>');
    if (item.expected === 'PASS') assert.notEqual(parsed.query.mode, 'fail_closed', item.query);
  }
});

test('Move regulatory boundaries and shared UI are explicit', () => {
  const root = join(__dirname, '..', '..');
  const shell = readFileSync(join(root, 'components/specialist-search/SpecialistSearchShell.tsx'), 'utf8');
  const result = readFileSync(join(root, 'components/ask-move-result.tsx'), 'utf8');
  const ask = readFileSync(join(root, 'app/(move)/ask/page.tsx'), 'utf8');
  const home = readFileSync(join(root, 'components/home/home-mover-search.tsx'), 'utf8');
  assert.match(shell, /What do you want to find out/);
  assert.match(shell, /Advanced filters/);
  assert.match(shell, /headquarters is not service territory/i);
  assert.match(result, /Why this matched/);
  assert.match(result, /Trace this result/);
  assert.match(result, /Research this mover/);
  assert.match(ask, /index: false/);
  assert.match(home, /SpecialistSearchShell/);
  assert.doesNotMatch(shell + result, /best mover|recommended mover|quality rank/i);
});
