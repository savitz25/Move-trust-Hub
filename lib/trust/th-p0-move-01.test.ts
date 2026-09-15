/**
 * TH-P0-MOVE-01 regression guard.
 *
 * Confirmed live production contradiction (fixed by this ticket):
 *   /companies (and the shared mover-evidence explainer it links to) publicly
 *   described a proprietary "How We Score Movers (0-100)" methodology with a
 *   weighted formula and an "85-point safer interstate choice" threshold —
 *   contradicting the network's no-score, evidence-first doctrine. Individual
 *   Move company profiles were already clean; this explainer infrastructure
 *   was the confirmed remaining contradiction.
 *
 *   npx tsx --test lib/trust/th-p0-move-01.test.ts
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  REPUTATION_SCORE_FACTORS,
  REPUTATION_SCORE_SUMMARY,
} from './reputation-score-factors';

const root = join(__dirname, '..', '..');
function read(p: string): string {
  return readFileSync(join(root, p), 'utf8');
}

test('reputation score data no longer carries weights or a numeric safer-choice threshold', () => {
  for (const factor of REPUTATION_SCORE_FACTORS) {
    assert.ok(
      !('weight' in factor),
      `factor "${factor.label}" must not carry a percentage weight`
    );
  }
  assert.doesNotMatch(REPUTATION_SCORE_SUMMARY, /0.100|editorial composite/i);
  assert.doesNotMatch(REPUTATION_SCORE_SUMMARY, /safer interstate choice/i);
});

const SURFACES = [
  'components/trust/how-we-score-panel.tsx',
  'components/trust/how-we-score-accordion.tsx',
  'app/(move)/(marketing)/about/page.tsx',
  'app/(move)/(marketing)/about/how-we-score-movers/page.tsx',
  'app/(move)/(marketing)/resources/how-to-choose/page.tsx',
  'lib/nav/move-nav-config.ts',
];

for (const surface of SURFACES) {
  test(`${surface} no longer publishes the banned 0-100 scoring pattern`, () => {
    const src = read(surface);
    assert.doesNotMatch(src, /How We Score Movers/);
    assert.doesNotMatch(src, /safer interstate choice/i);
    assert.doesNotMatch(src, /Scores? (?:at or )?above\b/i);
    assert.doesNotMatch(src, /score of 85|85\+/i);
    assert.doesNotMatch(src, /Reputation Score \(0/i);
    assert.doesNotMatch(src, /REPUTATION_SCORE_THRESHOLD/);
    assert.doesNotMatch(src, /factor\.weight/);
    assert.doesNotMatch(src, /How We Calculate Reputation Scores/);
  });
}

test('/companies renders the shared evidence panel, not a bespoke score block', () => {
  const src = read('app/(move)/companies/page.tsx');
  assert.match(src, /HowWeScorePanel/);
  assert.doesNotMatch(src, /85.point|0.100|safer interstate choice/i);
});
