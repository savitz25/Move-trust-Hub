import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { HOMEPAGE_SEO_DESCRIPTION, HOMEPAGE_SEO_TITLE } from '../seo/destination-seo';
import { homepageFaqItems } from '../seo/schemas';
import { MOVE_HOME_H1 } from './home-types';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

function read(rel: string) {
  return readFileSync(join(root, rel), 'utf8');
}

test('homepage uses a single intelligence H1 and keeps planner as H2/H3', () => {
  const page = read('app/(move)/page.tsx');
  const home = read('components/home-page.tsx');
  const hero = read('components/home/home-intel-hero.tsx');
  assert.match(home, /HomeIntelHero/);
  assert.match(hero, /MOVE_HOME_H1/);
  assert.equal(MOVE_HOME_H1, 'Understand the moving market before you book.');
  assert.equal((hero.match(/<h1\b/g) ?? []).length, 1);
  assert.doesNotMatch(hero, /Where are you going\?/);
  assert.match(page, /robots: \{ index: true, follow: true \}/);
  assert.match(page, /canonical/);
});

test('homepage FAQ no longer teaches reputation ranking', () => {
  const blob = JSON.stringify(homepageFaqItems);
  assert.doesNotMatch(blob, /reputation score/i);
  assert.doesNotMatch(blob, /filter by reputation/i);
  assert.doesNotMatch(blob, /best mover/i);
  assert.doesNotMatch(blob, /recommended movers/i);
});

test('homepage SEO does not claim safety census or rankings', () => {
  assert.match(HOMEPAGE_SEO_TITLE, /research/i);
  assert.doesNotMatch(HOMEPAGE_SEO_TITLE, /best/i);
  assert.doesNotMatch(HOMEPAGE_SEO_DESCRIPTION, /reputation/i);
  assert.doesNotMatch(HOMEPAGE_SEO_DESCRIPTION, /national safety/i);
  assert.match(HOMEPAGE_SEO_DESCRIPTION, /FMCSA/i);
});

test('intelligence homepage source does not import reputation_score', () => {
  const files = [
    'lib/intelligence/home-assemble.ts',
    'lib/intelligence/home-snapshot.ts',
    'lib/intelligence/home-types.ts',
    'components/home-page.tsx',
    'components/intelligence/MoveNationalIntelligence.tsx',
    'components/home/home-intel-hero.tsx',
  ];
  for (const file of files) {
    const src = read(file);
    assert.doesNotMatch(src, /reputation_score/);
    assert.doesNotMatch(src, /\bTrust Score\b|\bSafety Score\b|\bFraud Score\b|\bRisk Meter\b/);
    assert.doesNotMatch(src, /\bbest movers\b|\btop movers\b|\brecommended movers\b/i);
  }
});

test('mature tool routes remain linked from homepage surfaces', () => {
  const home = read('components/home-page.tsx') + read('components/home/home-tools-section.tsx') +
    read('components/home/home-intel-hero.tsx') +
    read('components/intelligence/MoveNationalIntelligence.tsx');
  for (const href of ['/verify-dot', '/compare', '/moving-calculator', '/my-move', '/companies', '/local-movers', '/florida']) {
    assert.match(home, new RegExp(href.replace('/', '\\/')));
  }
});

test('planner is rendered once in the plan section, not duplicated in the hero', () => {
  const hero = read('components/home/home-intel-hero.tsx');
  const plan = read('components/home/home-plan-section.tsx');
  assert.doesNotMatch(hero, /HeroRouteForm/);
  assert.match(plan, /<HeroRouteForm/);
  assert.equal((plan.match(/<HeroRouteForm/g) ?? []).length, 1);
});
