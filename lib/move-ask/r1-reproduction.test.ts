import assert from 'node:assert/strict';
import test from 'node:test';
import { interpretMoveAskQuery } from './interpret';
import { executeMoveAsk } from './execute';
import { CANONICAL_SUPABASE_URL } from '../supabase/canonical-project';

test('R1: spaced and messy explicitly labelled identifiers preserve the complete value', () => {
  for (const q of ['USDOT 3244 649', 'usdot 3244 649 miama movers', 'USDOT 3244 649 in Miami 33101']) {
    assert.equal(interpretMoveAskQuery(q).query.identifier?.value, '3244649', q);
  }
});
test('R1: broad NJ discovery is independent of the state-license roster', () => {
  assert.notEqual(interpretMoveAskQuery('mover in new jersey').query.mode, 'fail_closed');
});
test('R1: exact 3244 miss does not query or explain a substring identity', async () => {
  const savedFetch = globalThis.fetch;
  const savedUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const savedKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const calls: URL[] = [];
  process.env.NEXT_PUBLIC_SUPABASE_URL = CANONICAL_SUPABASE_URL;
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'fixture-only-noncredential';
  globalThis.fetch = async (input) => {
    const url = new URL(String(input)); calls.push(url);
    const substring = url.searchParams.get('usdot_number')?.startsWith('ilike.');
    return new Response(JSON.stringify(substring ? [{ id: 'fixture-shifl', name: 'SHIFL INC', usdot_number: '3244649', mc_number: '1019808', entity_type: 'BROKER', publication_state: 'INDEXABLE', slug: 'shifl-inc' }] : []), { headers: { 'content-type': 'application/json' } });
  };
  try {
    const result = await executeMoveAsk('USDOT 3244');
    assert.equal(result.results.length, 0);
    assert.ok(calls.every((url) => !url.searchParams.get('usdot_number')?.startsWith('ilike.')));
  } finally {
    globalThis.fetch = savedFetch;
    if (savedUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL; else process.env.NEXT_PUBLIC_SUPABASE_URL = savedUrl;
    if (savedKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY; else process.env.SUPABASE_SERVICE_ROLE_KEY = savedKey;
  }
});
