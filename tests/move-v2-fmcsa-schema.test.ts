import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const sql = readFileSync('supabase/migrations/20260816190000_move_v2_fmcsa_national_spine.sql', 'utf8').toLowerCase();

test('national spine migration is additive and scoped to move_v2', () => {
  assert.doesNotMatch(sql, /\b(drop|truncate|delete|update)\s+(table\s+)?(public\.)?(companies|movers)/);
  assert.match(sql, /create table if not exists move_v2\.fmcsa_source_release/);
  assert.match(sql, /unique\(source_release_id, source_record_key\)/);
});

test('raw national tables deny browser roles', () => {
  assert.match(sql, /enable row level security/);
  assert.match(sql, /revoke all on all tables in schema move_v2 from anon, authenticated/);
});
