import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILE, PROFILE_SLUG } from './config';
import { resolveSource, resolveExactPublished, publicPublicationReader } from './exact-publication';

// Explicit public-source and parent-metadata fixtures, not hosted identity proof.
const row = { id: PROFILE.nativeId, slug: PROFILE_SLUG, publication_state: 'PUBLISHABLE' };
const binding = { id: '11111111-1111-4111-8111-111111111111', networkEntityId: '22222222-2222-4222-8222-222222222222', status: 'accepted' };
test('source resolve requires exact current PUBLISHABLE record with fresh checkedAt', async () => {
  const now = Date.now(); const result = await resolveSource(PROFILE, async () => [row], () => now);
  assert.deepEqual(result, { identity: PROFILE, canonicalSlug: PROFILE_SLUG, publicationState: 'PUBLISHABLE', reviewedClass: 'mover', checkedAt: now });
});
for (const state of [null,'INDEXABLE','INGESTED','REVIEW_REQUIRED','INACTIVE']) test('source rejects publication ' + state, async () => {
  await assert.rejects(resolveSource(PROFILE, async () => [{ ...row, publication_state: state }]));
});
test('source rejects wrong identity/class/slug and duplicate/missing records', async () => {
  for (const identity of [{ ...PROFILE, nativeId: 'usdot-1' }, { ...PROFILE, profileClass: 'auto' }, { ...PROFILE, name: 'same name' }]) await assert.rejects(resolveSource(identity, async () => [row]));
  for (const rows of [[],[row,row],[{...row,slug:'alias'}],[{...row,id:'wrong'}]]) await assert.rejects(resolveSource(PROFILE, async () => rows));
});
test('exact resolver requires single exact current parent metadata', async () => {
  const result = await resolveExactPublished(PROFILE_SLUG, 'b'.repeat(43), async () => [row], { binding: async () => ({ profile: PROFILE, binding }) });
  assert.deepEqual(result?.binding, binding);
  for (const metadata of [null,[],[{profile:PROFILE,binding}],{profile:PROFILE,binding:null},{profile:{...PROFILE,nativeId:'wrong'},binding},{profile:PROFILE,binding:{...binding,status:'review_required'}}]) {
    assert.equal(await resolveExactPublished(PROFILE_SLUG,'b'.repeat(43),async()=>[row],{binding:async()=>metadata}),null);
  }
  assert.equal(await resolveExactPublished('alias','b'.repeat(43),async()=>[row],{binding:async()=>({profile:PROFILE,binding})}),null);
});
test('public reader permits only fixed anonymous GET, no production write capability', async () => {
  let calls = 0;
  const read = publicPublicationReader('https://arepfylnilkjmyduhwbz.supabase.co', 'sb_publishable_test_fixture', (async (url, init) => {
    calls++; assert.equal(init?.method,'GET'); assert.equal(init?.redirect,'error'); assert.equal(init?.cache,'no-store');
    assert.equal(new URL(String(url)).searchParams.get('id'),'eq.'+PROFILE.nativeId);
    assert.deepEqual(Object.keys(init?.headers ?? {}),['apikey']);
    return Response.json([row]);
  }) as typeof fetch);
  await read(); assert.equal(calls,1);
  assert.throws(()=>publicPublicationReader('https://other.supabase.co','sb_publishable_test_fixture'));
  assert.throws(()=>publicPublicationReader('https://arepfylnilkjmyduhwbz.supabase.co','service_role'));
});
