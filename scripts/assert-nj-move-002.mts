import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const page = readFileSync('app/(move)/new-jersey/page.tsx', 'utf8');
const ui = readFileSync('components/intelligence/NewJerseyMoveIntelligence.tsx', 'utf8');
const sitemap = readFileSync('app/sitemap.ts', 'utf8');
const home = readFileSync('components/home-page.tsx', 'utf8');

assert.match(page, /path: '\/new-jersey'/);
assert.match(page, /buildMovePageMetadata/);
assert.match(page, /getNjMoveIntelligenceSnapshot/);
assert.doesNotMatch(page, /robots:\s*\{\s*index:\s*false/);
assert.equal((ui.match(/<h1\b/g) ?? []).length, 1);
assert.match(ui, /NOTICE OF VIOLATION/);
assert.match(ui, /PW-only is not mover authority/);
assert.match(ui, /Federal interstate authority and New Jersey intrastate authority are separate/);
assert.doesNotMatch(ui, /0 NJ movers|0 NJ licenses/);
assert.doesNotMatch(ui, /best movers|cheapest mover|NJ UNLICENSED/);
assert.match(sitemap, /['"]\/new-jersey['"]/);
assert.match(home, /href="\/new-jersey"/);
assert.equal(existsSync('app/(move)/new-jersey/loading.tsx'), false);
assert.match(ui, /row\.wording/);
assert.match(ui, /Official source-level enforcement record/);
assert.match(ui, /finalOrder\.caption/);
console.log('NJ-MOVE-002 publication assertions: PASS');
