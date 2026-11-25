import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LegacyExportControl } from '@/components/my-move/legacy-export-control';
import { LegacyPageBanner } from '@/components/my-move/legacy-page-banner';
import {
  LEGACY_EXPORT_WINDOW_DAYS,
  LEGACY_TABLES,
  LINK_NOT_MERGE_PATH,
  PRODUCTION_VERCEL_PROJECT_ID,
  PRODUCTION_VERCEL_PROJECT_NAME,
  buildLegacyExport,
  buildLinkNotMergeRequest,
  myMoveRetirementPrepActive,
  type LegacyExportRow,
  type RetirementEnv,
} from '@/lib/my-move/retirement-prep';

const qa: RetirementEnv = { flag: '1', projectId: 'prj_local_m5', projectName: 'move-m5-local' };
const off: RetirementEnv = { flag: undefined, projectId: 'prj_local_m5', projectName: 'move-m5-local' };

const moveSession = { hub: 'move' as const, sessionId: 'move-session-1' };
const mySession = { hub: 'my-trusthub' as const, sessionId: 'mth-session-1' };

function walk(dir: string, out: string[]) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next') continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
}

test('retirement prep stays off unless the flag is exact and the project is not production', () => {
  assert.equal(myMoveRetirementPrepActive(), false);
  assert.equal(myMoveRetirementPrepActive(off), false);
  assert.equal(myMoveRetirementPrepActive({ ...qa, flag: '1 ' }), false);
  assert.equal(myMoveRetirementPrepActive({ ...qa, flag: ' 1' }), false);
  assert.equal(myMoveRetirementPrepActive({ flag: '1' }), false);
  assert.equal(
    myMoveRetirementPrepActive({ flag: '1', projectId: PRODUCTION_VERCEL_PROJECT_ID, projectName: 'move-m5-local' }),
    false
  );
  assert.equal(
    myMoveRetirementPrepActive({ flag: '1', projectId: 'prj_local_m5', projectName: PRODUCTION_VERCEL_PROJECT_NAME }),
    false
  );
  assert.equal(myMoveRetirementPrepActive(qa), true);
});

test('link-not-merge requires both sessions and consent, and repeats the same request key', async () => {
  const first = await buildLinkNotMergeRequest(
    { moveSession, myTrustHubSession: mySession, consent: true },
    qa
  );
  const second = await buildLinkNotMergeRequest(
    { moveSession, myTrustHubSession: mySession, consent: true },
    qa
  );
  assert.equal(first.outcome, 'ready');
  assert.equal(second.outcome, 'ready');
  if (first.outcome !== 'ready' || second.outcome !== 'ready') return;
  assert.equal(first.path, LINK_NOT_MERGE_PATH);
  assert.equal(first.method, 'POST');
  assert.deepEqual(first.legacyTablesUntouched, LEGACY_TABLES);
  assert.deepEqual(first.mutations, []);
  assert.equal(first.requestKey, second.requestKey);
  assert.equal(first.requestKey.length, 64);

  const changed = await buildLinkNotMergeRequest(
    { moveSession, myTrustHubSession: { ...mySession, sessionId: 'mth-session-2' }, consent: true },
    qa
  );
  assert.equal(changed.outcome, 'ready');
  if (changed.outcome === 'ready') assert.notEqual(changed.requestKey, first.requestKey);
});

test('link-not-merge refuses a missing session, email identity, or missing consent', async () => {
  const cases = [
    buildLinkNotMergeRequest({ moveSession, myTrustHubSession: mySession, consent: true }, off),
    buildLinkNotMergeRequest({ moveSession: null, myTrustHubSession: null, consent: true, email: 'person@example.com' }, qa),
    buildLinkNotMergeRequest({ moveSession: null, myTrustHubSession: mySession, consent: true }, qa),
    buildLinkNotMergeRequest({ moveSession, myTrustHubSession: null, consent: true }, qa),
    buildLinkNotMergeRequest({ moveSession: { hub: 'my-trusthub', sessionId: 'x' }, myTrustHubSession: mySession, consent: true }, qa),
    buildLinkNotMergeRequest({ moveSession: { hub: 'move', sessionId: 'person@example.com' }, myTrustHubSession: mySession, consent: true }, qa),
    buildLinkNotMergeRequest({ moveSession, myTrustHubSession: mySession, consent: false }, qa),
  ];
  const results = await Promise.all(cases);
  assert.deepEqual(
    results.map((result) => result.outcome === 'refused' ? result.reason : result.outcome),
    [
      'inactive',
      'email_only',
      'missing_move_session',
      'missing_my_trusthub_session',
      'hub_mismatch',
      'email_shaped_session',
      'consent_required',
    ]
  );
});

test('legacy export keeps older research and labels the 180-day access window', () => {
  const asOf = '2026-11-25T00:00:00.000Z';
  const rows: LegacyExportRow[] = [
    { table: 'saved_movers', id: 'keep', recordedAt: '2026-06-01T00:00:00.000Z', payload: { slug: 'a' } },
    { table: 'saved_move_plans', id: 'edge', recordedAt: '2026-05-29T00:00:00.000Z', payload: { id: 'plan' } },
    { table: 'saved_inventories', id: 'old', recordedAt: '2026-05-27T00:00:00.000Z', payload: { items: [] } },
    { table: 'user_profiles', id: 'future', recordedAt: '2026-11-26T00:00:00.000Z', payload: {} },
  ];
  const before = JSON.stringify(rows);
  const refused = buildLegacyExport({ userInitiated: true, asOf, rows }, off);
  const unasked = buildLegacyExport({ userInitiated: false, asOf, rows }, qa);
  const ready = buildLegacyExport({ userInitiated: true, asOf, rows }, qa);
  assert.equal(refused.outcome, 'refused');
  assert.equal(unasked.outcome, 'refused');
  assert.equal(ready.outcome, 'ready');
  if (ready.outcome !== 'ready') return;
  assert.equal(ready.windowDays, LEGACY_EXPORT_WINDOW_DAYS);
  assert.equal(ready.deleted, false);
  assert.deepEqual(
    ready.rows.map((row) => [row.id, row.accessWindow]),
    [
      ['keep', 'inside'],
      ['edge', 'inside'],
      ['old', 'outside'],
    ]
  );
  assert.deepEqual(ready.rows.find((row) => row.id === 'old')?.payload, { items: [] });
  assert.equal(ready.omitted, 1);
  assert.equal(JSON.stringify(rows), before);
});

test('the banner renders only when prep is active and no page mounts it', () => {
  assert.equal(renderToStaticMarkup(React.createElement(LegacyPageBanner, { env: off })), '');
  const html = renderToStaticMarkup(React.createElement(LegacyPageBanner, { env: qa }));
  assert.match(html, /data-my-move-legacy-banner="on"/);
  assert.match(html, /preparing to retire/);

  const root = join(__dirname, '..', '..');
  const files: string[] = [];
  walk(join(root, 'app'), files);
  walk(join(root, 'components'), files);
  assert.equal(renderToStaticMarkup(React.createElement(LegacyExportControl, { env: off })), '');
  const exportHtml = renderToStaticMarkup(React.createElement(LegacyExportControl, { env: qa }));
  assert.match(exportHtml, /data-my-move-legacy-export="ready"/);
  assert.equal(exportHtml.includes('fetch('), false);

  const importers = files.filter((path) => {
    if (path.endsWith('legacy-page-banner.tsx')) return false;
    if (path.endsWith('legacy-export-control.tsx')) return false;
    const source = readFileSync(path, 'utf8');
    return source.includes('LegacyPageBanner') || source.includes('LegacyExportControl');
  });
  assert.deepEqual(importers, []);
});

test('retirement prep source does not fetch or touch a database client', () => {
  const source = readFileSync(join(__dirname, 'retirement-prep.ts'), 'utf8');
  const banner = readFileSync(join(__dirname, '..', '..', 'components', 'my-move', 'legacy-page-banner.tsx'), 'utf8');
  const exportControl = readFileSync(join(__dirname, '..', '..', 'components', 'my-move', 'legacy-export-control.tsx'), 'utf8');
  for (const text of [source, banner, exportControl]) {
    assert.equal(text.includes('fetch('), false);
    assert.equal(text.includes('supabase'), false);
    assert.equal(text.includes('.from('), false);
    assert.equal(text.includes('removeItem'), false);
  }
  for (const table of LEGACY_TABLES) assert.equal(source.includes(table), true);
});
