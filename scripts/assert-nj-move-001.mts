import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const migration = readFileSync('supabase/migrations/20260903120000_nj_move_001_state_regulatory_ledger.sql', 'utf8');
const runner = readFileSync('scripts/nj-move-001.py', 'utf8');
const adapter = readFileSync('lib/state-hhg/nj/adapter.ts', 'utf8');
const sitemap = readFileSync('app/sitemap.ts', 'utf8');
const request = readFileSync('docs/nj-move-001-pmw-records-request.md', 'utf8');
const pkg = readFileSync('package.json', 'utf8');

assert.match(runner, /NJ_DCA_PMW/);
assert.match(runner, /NOTICE_OF_VIOLATION/);
assert.match(runner, /SOURCE_AVAILABLE_BY_REQUEST/);
assert.match(runner, /intrastate_public_warehouseman/);
assert.doesNotMatch(runner, /fuzzy|levenshtein/i);
assert.match(adapter, /stateCode = 'NJ'/);
assert.match(adapter, /consumerMoverSearch: false/);
assert.match(migration, /force row level security/i);
assert.doesNotMatch(migration, /nj_movers|nj_warehousemen|create table nj_/i);
assert.doesNotMatch(migration, /grant\s+select.*(?:anon|authenticated)/i);
assert.equal(existsSync('app/new-jersey'), false);
assert.doesNotMatch(sitemap, /['"]\/new-jersey['"]/);
assert.equal(existsSync('.vercel/project.json'), false);
assert.match(request, /PM \/ PW \/ PC/);
assert.match(pkg, /assert:nj-move-001/);
console.log('NJ-MOVE-001 assertions: PASS');
