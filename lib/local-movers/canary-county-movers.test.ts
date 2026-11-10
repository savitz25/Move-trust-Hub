import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('county canary uses the server-side database client', () => {
  const source = readFileSync(new URL('./canary-county-movers.ts', import.meta.url), 'utf8');
  assert.match(source, /import 'server-only'/);
  assert.match(source, /getServiceRoleSupabaseTarget/);
  assert.equal(source.includes('getSupabaseAnonKey'), false);
  assert.equal(source.includes('getSupabaseUrl'), false);
  assert.match(source, /local_canary_movers_for_county/);
});
