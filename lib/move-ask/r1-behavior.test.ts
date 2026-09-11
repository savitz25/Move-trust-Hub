import assert from 'node:assert/strict';
import test from 'node:test';
import { parseMoveIdentifiers, normalizeStoredIdentifier } from './identifier';
import { planMoveRequest, inputFromSearchParams } from './plan';
import { executeMoveRequest, publicAskPayload } from './execute';
import { publishedIdentity, records, fixtureFetch } from './r1-fixtures';
import { CANONICAL_SUPABASE_URL } from '../supabase/canonical-project';
import { GET } from '../../app/api/ask/route';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import AskPage from '../../app/(move)/ask/page';
import { SpecialistSearchShell } from '../../components/specialist-search/SpecialistSearchShell';
import type { MoveAskResult } from './execute';

// tsx runs the repository's JSX-preserve files outside Next's automatic runtime.
Object.assign(globalThis, { React });

function resultInTree(value: unknown): MoveAskResult | null {
  if (Array.isArray(value)) { for (const child of value) { const result = resultInTree(child); if (result) return result; } }
  if (React.isValidElement<{ result?: MoveAskResult; children?: unknown }>(value)) return value.props.result ?? resultInTree(value.props.children);
  return null;
}

async function source<T>(run: (calls: URL[]) => Promise<T>, rows: Array<Record<string, unknown>> = records) {
  const prior = { fetch: globalThis.fetch, url: process.env.NEXT_PUBLIC_SUPABASE_URL, key: process.env.SUPABASE_SERVICE_ROLE_KEY };
  const fixture = fixtureFetch(rows);
  globalThis.fetch = fixture.fetcher;
  process.env.NEXT_PUBLIC_SUPABASE_URL = CANONICAL_SUPABASE_URL;
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'fixture-only-noncredential';
  try { return await run(fixture.calls); }
  finally { globalThis.fetch = prior.fetch; for (const [key, value] of Object.entries({ NEXT_PUBLIC_SUPABASE_URL: prior.url, SUPABASE_SERVICE_ROLE_KEY: prior.key })) { if (value === undefined) delete process.env[key]; else process.env[key] = value; } }
}

test('existing supported state override remains selected in the research form', () => {
  const form=renderToStaticMarkup(React.createElement(SpecialistSearchShell,{query:'USDOT 3244649',filters:{state:'NY'}}));
  assert.match(form, /<option value="NY" selected="">NY \(recorded state\)<\/option>/);
});

test('missing identifier has an explicit recoverable terminal state', async () => {
  const r=await executeMoveRequest({q:'USDOT lookup'}); assert.equal(r.terminalState,'NEEDS_CLARIFICATION'); assert.equal(r.results.length,0);
});

test('identifier variants, full grouped span, leading zeroes and MC family', async () => source(async (calls) => {
  for (const q of ['USDOT 3244649', 'USDOT 3244 649', 'usdot #3244649', 'DOT-3244649', 'USDOT\t3244\t649', 'usdot 3244 649 miama movers', 'USDOT 3244 649 in Miami 33101', 'USDOT 3244649 in Miami in 2026', 'Find USDOT 3244649.']) {
    const result = await executeMoveRequest({ q });
    assert.equal(result.parsed.query.identifier?.value, '3244649', q);
    assert.equal(result.results.length, 1, q);
    assert.equal(result.results[0]?.usdot, '3244649', q);
    assert.equal(result.results[0]?.matchEvidence?.fields[0]?.returned, '3244649');
    const official = new URL(result.results[0]!.officialVerificationUrl!);
    assert.equal(official.hostname, 'safer.fmcsa.dot.gov'); assert.equal(official.searchParams.get('query_param'), 'USDOT'); assert.equal(official.searchParams.get('query_string'), '3244649');
    assert.match(result.results[0]!.whyMatched, /USDOT 3244649\b/);
    assert.doesNotMatch(result.results[0]!.whyMatched, /USDOT 3244\b/);
  }
  for (const q of ['MC 1019808', 'mc-1019808', 'MC #1019808', 'MC 1019 808']) {
    const result = await executeMoveRequest({ q }); assert.equal(result.results[0]?.mc, '1019808', q); assert.equal(result.parsed.query.identifier?.type, 'mc'); assert.equal(new URL(result.results[0]!.officialVerificationUrl!).searchParams.get('query_param'), 'MC_MX');
  }
  assert.equal(parseMoveIdentifiers('USDOT 0001111').identifiers[0]?.value, '0001111');
  assert.equal(normalizeStoredIdentifier('MC-0012345', 'mc'), '0012345');
  assert.ok(calls.every((c) => !c.searchParams.get('usdot_number')?.startsWith('ilike.') && !c.searchParams.get('mc_number')?.startsWith('ilike.')));
}));

test('prefix fixture, exact miss and publication gates', async () => source(async () => {
  const exact = await executeMoveRequest({ q: 'USDOT 3244' }); assert.deepEqual(exact.results.map((r) => r.usdot), ['3244']);
  for (const q of ['USDOT 9999999', 'USDOT 7777776', 'USDOT 003244649']) {
    const r = await executeMoveRequest({ q }); assert.equal(r.results.length, 0); assert.notEqual(r.parsed.query.executor, 'directory');
  }
}));

test('matching and conflicting USDOT/MC pairs retain both grains', async () => source(async () => {
  const good = await executeMoveRequest({ q: 'USDOT 3244649 MC 1019808' });
  assert.equal(good.results.length, 1); assert.equal(good.results[0]?.matchEvidence?.fields.length, 2);
  const bad = await executeMoveRequest({ q: 'USDOT 3244649 MC 649' });
  assert.equal(bad.results.length, 0); assert.equal(bad.terminalState, 'NEEDS_CLARIFICATION');
  assert.equal(parseMoveIdentifiers('USDOT 3244 MC 649').identifiers[0]?.value, '3244');
}));

test('malformed/ambiguous/missing identifiers never reach a source', async () => source(async (calls) => {
  for (const q of ['USDOT lookup', 'MC lookup', 'USDOT 3244.649', 'USDOT 3.244649e6', 'USDOT 3244649e2', 'USDOT -3244649.5', 'USDOT 3244 649 2026', 'USDOT 3244649 33101', 'USDOT 3244 USDOT 649', 'USDOT 123456789', 'USDOT 3244649 MC lookup', '3244649', 'x'.repeat(181)]) {
    const result = await executeMoveRequest({ q });
    assert.equal(result.results.length, 0, q); assert.equal(result.parsed.query.mode, 'fail_closed', q);
  }
  assert.equal(calls.length, 0);
}));

test('native/API request validation, encoding and typed overrides agree', async () => source(async () => {
  for (const input of [{ q: 'USDOT 3244 649' }, { q: 'usdot 3244 649 miama movers' }, { q: 'MC #1019808' }, { q: 'USDOT 3244649', role: 'carrier', state: 'NJ', authority: 'current', page: '1' }]) {
    const params = new URLSearchParams(Object.entries(input).filter((entry): entry is [string, string] => typeof entry[1] === 'string'));
    const native = publicAskPayload(await executeMoveRequest(inputFromSearchParams(params)));
    const api = await (await GET(new Request(`https://www.movetrusthub.com/api/ask?${params}`))).json();
    for (const key of ['elapsedMs']) { delete (native as Record<string, unknown>)[key]; delete api[key]; }
    assert.deepEqual(api, JSON.parse(JSON.stringify(native)));
  }
  for (const input of [{q:'USDOT 3244649',page:'1.5'},{q:'USDOT 3244649',page:'2e1'},{q:'USDOT 3244649',role:'admin'},{q:'USDOT 3244649',state:'XX'},{q:'USDOT 3244649',authority:'unknown'}]) {
    assert.equal((await executeMoveRequest(input)).terminalState, 'INVALID_INPUT');
  }
  assert.equal((await GET(new Request('https://www.movetrusthub.com/api/ask?q=USDOT+3244&q=USDOT+3244649'))).status, 400);
}));

test('homepage GET form and actual native page execute the same identity request as API', async () => source(async () => {
  for (const q of ['USDOT 3244649', 'usdot 3244 649 miama movers', 'MC 1019808']) {
    const home = renderToStaticMarkup(React.createElement(SpecialistSearchShell, { query: q, compact: true }));
    assert.match(home, /action="\/ask"/); assert.match(home, /method="get"/); assert.match(home, /name="q"/);
    assert.ok(home.includes(q)); assert.doesNotMatch(home, /maxlength=/i);
    const native = resultInTree(await AskPage({searchParams: Promise.resolve({q})})); assert.ok(native);
    const api = await (await GET(new Request(`https://www.movetrusthub.com/api/ask?${new URLSearchParams({q})}`))).json();
    assert.deepEqual(JSON.parse(JSON.stringify(publicAskPayload(native).results)), api.results);
    assert.deepEqual(JSON.parse(JSON.stringify(publicAskPayload(native).query)), api.query);
    assert.equal(native.coverageState, api.coverageState); assert.equal(native.terminalState, api.terminalState);
  }
}));

test('directory dispatch preserves NJ, structured role, integer pagination and unavailable state', async () => {
  let called = false;
  const r = await executeMoveRequest({q:'mover in new jersey',role:'broker',page:'2'}, { directory: async (request) => {
    called = true; assert.equal(request.queryType,'cohort'); assert.equal(request.entityClass,'mover'); assert.equal(request.role,'Broker'); assert.equal(request.page,2); assert.equal(request.geography?.stateCode,'NJ'); assert.equal(request.geography?.intent,'RECORDED_HQ');
    throw new Error('isolated source timeout');
  }});
  assert.equal(called,true); assert.equal(r.terminalState,'UNAVAILABLE'); assert.equal(r.counts.length,0);
});

test('NJ current carrier count preserves operation, role, source boolean and recorded state', async () => source(async () => {
  const result = await executeMoveRequest({ q: 'How many current household-goods carriers are headquartered in New Jersey?' });
  assert.equal(result.parsed.query.mode, 'count'); assert.equal(result.parsed.query.role, 'carrier');
  assert.equal(result.parsed.query.authorityCurrent, true); assert.equal(result.parsed.query.jurisdiction?.state, 'NJ');
  assert.equal(result.pagination.total, 2); assert.equal(result.counts.reduce((n, r) => n + r.value, 0), 2);
  const p = planMoveRequest({q: 'mover in new jersey'}); assert.equal(p.query.executor, 'directory'); assert.equal(p.query.directoryRequest?.geography?.stateCode, 'NJ');
  const licensed = planMoveRequest({q:'licensed New Jersey PM movers'}); assert.equal(licensed.query.mode, 'fail_closed'); assert.equal(licensed.query.coverageState, 'REQUEST_ONLY');
  assert.equal(planMoveRequest({q:'NJ intrastate movers'}).query.mode, 'fail_closed');
  assert.equal(planMoveRequest({q:'movers in New Jersey and Florida'}).query.mode, 'fail_closed');
  for (const q of ['movers in Miami', 'movers in Broward County, Florida', 'movers in Dallas, Texas']) {
    const p = planMoveRequest({q}); assert.equal(p.query.mode, 'fail_closed', q); assert.ok(p.query.constraints?.some((c) => c.outcome === 'UNSUPPORTED'), q);
  }
}));

test('constraint conflicts stay visible and no implicit relaxation is applied', async () => source(async () => {
  const result = await executeMoveRequest({q:'USDOT 3244649',role:'carrier',state:'NJ'});
  assert.equal(result.results.length, 1); assert.ok(result.parsed.query.constraints?.some((c) => c.field === 'role' && c.outcome === 'CONFLICT'));
  assert.ok(result.parsed.query.constraints?.some((c) => c.field === 'recorded headquarters state' && c.outcome === 'CONFLICT'));
  const plan = planMoveRequest({q:'current carriers headquartered in Florida',state:'NJ'}); assert.equal(plan.query.mode, 'fail_closed');
  assert.ok((await executeMoveRequest({q:'usdot 3244 649 miama movers'})).parsed.query.constraints?.some((c) => c.value.includes('miama') && c.outcome === 'NEEDS_CLARIFICATION'));
}));

test('supported state cohorts larger than one database response remain complete', async () => source(async (calls) => {
  const result = await executeMoveRequest({q:'How many current carriers are headquartered in Florida?'});
  assert.equal(result.pagination.total, 1001);
  assert.ok(calls.some((url) => url.searchParams.get('offset') === '1000'));
  const page = await executeMoveRequest({q:'current carriers headquartered in Florida',page:'51'});
  assert.equal(page.results.length, 1); assert.equal(page.pagination.total, 1001);
}, Array.from({length:1001}, (_,i)=>({...publishedIdentity,id:`fixture-large-${i}`,entity_type:'CARRIER',headquarters:'ORLANDO, FL'}))));

test('duplicate observations of one identity do not inflate the identity count', async () => source(async () => {
  const result = await executeMoveRequest({q:'USDOT 3244649'}); assert.equal(result.results.length, 1); assert.equal(result.pagination.total, 1);
}, [publishedIdentity, {...publishedIdentity}]));

test('source error/timeout and contradictory evidence are unavailable, never zero or fallback', async () => source(async () => {
  for (const failedFetch of [async () => new Response(JSON.stringify({message:'fixture source failure'}), {status:503}), async () => {throw new Error('fixture timeout');}]) {
    globalThis.fetch = failedFetch;
    const r = await executeMoveRequest({q:'USDOT 3244649'}); assert.equal(r.terminalState, 'UNAVAILABLE'); assert.equal(r.coverageState, 'UNKNOWN'); assert.equal(r.counts.length, 0);
  }
  globalThis.fetch = async () => new Response(JSON.stringify([{...publishedIdentity,usdot_number:'3244'}]), {headers:{'content-type':'application/json'}});
  const r = await executeMoveRequest({q:'USDOT 3244649'}); assert.equal(r.terminalState, 'UNAVAILABLE'); assert.equal(r.results.length, 0);
}));
