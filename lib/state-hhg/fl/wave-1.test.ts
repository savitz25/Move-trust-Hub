import assert from 'node:assert/strict';
import http from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import {
  isAnonymousPublicProfileAllowed,
  isConsumerVisibleCompany,
  isSeoIndexableCompany,
} from '@/lib/provider/publication';
import { anonymousCompanyHttpStatus } from '@/lib/provider/anonymous-company-route';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';
import {
  FL_FDACS_SCOPE_EXPLANATION,
  FL_NO_FEDERAL_ID_IN_MTH_DATA,
  FL_STATE_ONLY_REGISTRATION_COPY,
  floridaFdacsEvidenceBlock,
  floridaFederalPlusStatePresentation,
  isUnsafeEndorsementCopy,
  isUnsafeFederalAbsenceClaim,
} from '@/lib/state-hhg/fl/profile-presentation';
import {
  FL_009_GOOGLE_PLACES_REQUESTS,
  FL_STATE_WAVE_1_ID,
  abortConditions,
  buildStateOnlyProfileChrome,
  buildStateOnlyStructuredData,
  computeWave1DryRunDelta,
  hashWave1Manifest,
  isFloridaStateWave1Member,
  loadWave1Manifest,
  planWave1Rollback,
  shouldRenderFloridaStateWaveChrome,
  validateWave1ApplyPreconditions,
} from '@/lib/state-hhg/fl/wave-1';

test('Wave 1 constants and Google freeze', () => {
  assert.equal(FL_STATE_WAVE_1_ID, 'FL_STATE_WAVE_1');
  assert.equal(FL_009_GOOGLE_PLACES_REQUESTS, 0);
});

test('frozen Wave 1 manifest is 37, excludes IM4099, all intended PUBLISHABLE/indexable false', () => {
  const man = loadWave1Manifest();
  assert.equal(man.waveId, FL_STATE_WAVE_1_ID);
  assert.equal(man.members.length, 37);
  assert.ok(!man.members.some((m) => m.companyId === 'fl-im-4099'));
  assert.ok(man.members.every((m) => m.currentPublicationState === 'INGESTED'));
  assert.ok(man.members.every((m) => m.currentIndexable === false));
  assert.ok(man.members.every((m) => m.intendedPublicationState === 'PUBLISHABLE'));
  assert.ok(man.members.every((m) => m.intendedIndexable === false));
  assert.equal(man.hash, hashWave1Manifest(man.members));
  assert.equal(isFloridaStateWave1Member('fl-im-1025'), true);
  assert.equal(isFloridaStateWave1Member('fl-im-4099'), false);
  assert.equal(isFloridaStateWave1Member('fl-im-100002'), false);
});

test('canary IDs never receive Wave 1 chrome', () => {
  const canary = loadExactCanaryManifests();
  for (const id of canary.companyIds) {
    assert.equal(isFloridaStateWave1Member(id), false);
    assert.equal(
      shouldRenderFloridaStateWaveChrome({
        id,
        publicationState: 'PUBLISHABLE',
      }),
      false
    );
  }
});

test('Wave 1 chrome only when member AND PUBLISHABLE (not while INGESTED)', () => {
  assert.equal(
    shouldRenderFloridaStateWaveChrome({ id: 'fl-im-1025', publicationState: 'INGESTED' }),
    false
  );
  assert.equal(
    shouldRenderFloridaStateWaveChrome({ id: 'fl-im-1025', publicationState: 'PUBLISHABLE' }),
    true
  );
});

test('INGESTED and unknown slugs are HTTP 404; public profiles stay 200', () => {
  assert.equal(anonymousCompanyHttpStatus({ publicationState: 'INGESTED' }), 404);
  assert.equal(anonymousCompanyHttpStatus(null), 404);
  assert.equal(anonymousCompanyHttpStatus({ publicationState: 'PUBLISHABLE' }), 200);
  assert.equal(anonymousCompanyHttpStatus({ publicationState: 'INDEXABLE', indexable: true }), 200);
  assert.equal(anonymousCompanyHttpStatus({ publicationState: null }), 200);
  assert.equal(anonymousCompanyHttpStatus({ publicationState: 'VERIFIED' }), 200);
  assert.equal(isAnonymousPublicProfileAllowed({ publicationState: 'INGESTED' }), false);
});

test('real HTTP server returns 404 for INGESTED and 200 for PUBLISHABLE', async () => {
  const server = http.createServer((req, res) => {
    const ingested = req.url?.includes('ingested');
    const company = ingested
      ? { publicationState: 'INGESTED' as const }
      : req.url?.includes('unknown')
        ? null
        : { publicationState: 'PUBLISHABLE' as const };
    const status = anonymousCompanyHttpStatus(company);
    res.writeHead(status, { 'content-type': 'text/plain' });
    res.end(status === 404 ? 'Not Found' : 'OK');
  });
  await new Promise<void>((resolveP) => server.listen(0, resolveP));
  const { port } = server.address() as { port: number };
  const ingested = await fetch(`http://127.0.0.1:${port}/ingested`);
  const unknown = await fetch(`http://127.0.0.1:${port}/unknown`);
  const pub = await fetch(`http://127.0.0.1:${port}/publishable`);
  server.close();
  assert.equal(ingested.status, 404);
  assert.equal(unknown.status, 404);
  assert.equal(pub.status, 200);
});

test('state-only chrome is not FMCSA-led and is not an endorsement', () => {
  const chrome = buildStateOnlyProfileChrome({
    displayName: 'Gentletouch Moving Company',
    fdacsNumber: 'IM1025',
    fdacsStatus: 'active',
    hasFederalId: false,
  });
  assert.equal(chrome.headline, 'Florida Intrastate Mover');
  assert.equal(chrome.endorsement, false);
  assert.doesNotMatch(chrome.title, /FMCSA/i);
  assert.doesNotMatch(chrome.description, /interstate mover profile/i);
  assert.equal(isUnsafeFederalAbsenceClaim(chrome.federalCopy), false);
  assert.equal(chrome.federalCopy, FL_NO_FEDERAL_ID_IN_MTH_DATA);
  assert.equal(isUnsafeEndorsementCopy(chrome.detail), false);
});

test('FDACS evidence block copy is registration fact, not certification', () => {
  const block = floridaFdacsEvidenceBlock({ authorityNumber: 'IM1025', status: 'active' });
  assert.equal(block.regulator, 'Florida Department of Agriculture and Consumer Services');
  assert.equal(block.registrationNumber, 'IM1025');
  assert.equal(block.registrationType, 'Intrastate Mover');
  assert.equal(block.endorsement, false);
  assert.equal(block.scope, FL_FDACS_SCOPE_EXPLANATION);
  assert.match(block.verificationWording, /Registration verified from Florida FDACS records/);
  assert.equal(isUnsafeEndorsementCopy('TrustHub Approved'), true);
  assert.equal(isUnsafeEndorsementCopy('Fully insured'), false);
  assert.match(FL_STATE_ONLY_REGISTRATION_COPY, /intrastate household-goods mover/i);
});

test('dual-authority presentation keeps federal and Florida separate', () => {
  const both = floridaFederalPlusStatePresentation({
    fdacsNumber: 'IM4099',
    fdacsStatus: 'active',
    usdot: '1018395',
    mcNumber: '425403',
  });
  assert.equal(both.floridaImpliesFederal, false);
  assert.equal(both.federalImpliesFlorida, false);
  assert.equal(both.federal?.usdot, '1018395');
  assert.notEqual(both.florida.registrationNumber, both.federal?.usdot);
});

test('state-only structured data omits ratings, USDOT, areaServed', () => {
  const sd = buildStateOnlyStructuredData({
    name: 'Gentletouch Moving Company',
    slug: 'gentletouch-moving-company',
    street: '1900 FLORA RD',
    city: 'CLEARWATER',
    state: 'FL',
    zip: '33755',
    phone: '7274460712',
    fdacsNumber: 'IM1025',
    usdot: null,
  });
  const raw = JSON.stringify(sd);
  assert.equal(sd.ok, true);
  assert.doesNotMatch(raw, /AggregateRating/);
  assert.doesNotMatch(raw, /areaServed/);
  assert.doesNotMatch(raw, /USDOT/);
  assert.match(raw, /IM1025/);
});

test('PUBLISHABLE + indexable=false is noindex and sitemap-excluded', () => {
  const pub = { publicationState: 'PUBLISHABLE' as const, indexable: false };
  assert.equal(isConsumerVisibleCompany(pub), true);
  assert.equal(isSeoIndexableCompany(pub), false);
});

test('dry-run delta is publication_state only; indexable 0; companies 0', () => {
  const man = loadWave1Manifest();
  const delta = computeWave1DryRunDelta(man, {
    rows: man.members.map((m) => ({
      companyId: m.companyId,
      publicationState: 'INGESTED',
      indexable: false,
      authorityStatus: 'active',
      inKeep80Canary: false,
    })),
  });
  assert.equal(delta.ok, true);
  assert.equal(delta.companies, 0);
  assert.equal(delta.indexable, 0);
  assert.equal(delta.publicationStateChanges, man.members.length);
  assert.equal(delta.psa, 0);
  assert.equal(delta.contacts, 0);
  assert.equal(delta.trustScore, 0);
  assert.equal(delta.keep80CanaryTouched, 0);
  assert.equal(delta.applyExecuted, false);
});

test('apply preconditions fail closed on hash, INGESTED, indexable, and canary collision', () => {
  const man = loadWave1Manifest();
  const live = man.members.map((m) => ({
    companyId: m.companyId,
    publicationState: 'INGESTED' as const,
    indexable: false,
    authorityStatus: 'active',
    inKeep80Canary: false,
  }));
  assert.equal(validateWave1ApplyPreconditions(man, live, man.hash).ok, true);
  assert.equal(validateWave1ApplyPreconditions(man, live, 'deadbeefdeadbeef').ok, false);
  const indexed = live.map((r, i) => (i === 0 ? { ...r, indexable: true } : r));
  assert.equal(validateWave1ApplyPreconditions(man, indexed, man.hash).ok, false);
  const published = live.map((r, i) => (i === 0 ? { ...r, publicationState: 'PUBLISHABLE' } : r));
  assert.equal(validateWave1ApplyPreconditions(man, published, man.hash).ok, false);
  const canaryHit = live.map((r, i) => (i === 0 ? { ...r, inKeep80Canary: true } : r));
  assert.equal(validateWave1ApplyPreconditions(man, canaryHit, man.hash).ok, false);
});

test('rollback restores INGESTED and does not touch KEEP_80', () => {
  const man = loadWave1Manifest();
  const rb = planWave1Rollback(man);
  assert.equal(rb.companyIds.length, 37);
  assert.equal(rb.toPublicationState, 'INGESTED');
  assert.equal(rb.toIndexable, false);
  assert.equal(rb.preservePsa, true);
  assert.equal(rb.preserveCanary80, true);
  assert.equal(rb.waveId, FL_STATE_WAVE_1_ID);
});

test('abort conditions are explicit', () => {
  assert.ok(abortConditions().includes('manifest_hash_mismatch'));
  assert.ok(abortConditions().includes('indexable_delta_nonzero'));
  assert.ok(abortConditions().includes('ingested_http_not_404'));
  assert.ok(abortConditions().includes('keep80_canary_regression'));
});

test('FL-008 wave recommendation IDs match frozen Wave 1 members', () => {
  const rec = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-fl-008-wave-recommendation.json'), 'utf8')
  ) as { recommended_company_ids: string[] };
  const man = loadWave1Manifest();
  assert.deepEqual(
    [...man.members.map((m) => m.companyId)].sort(),
    [...rec.recommended_company_ids].sort()
  );
});
