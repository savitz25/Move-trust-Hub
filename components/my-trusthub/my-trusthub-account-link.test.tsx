import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { keepAllowed } from '../../lib/save-my-move/save-control';
import { MyTrustHubAccountLink } from './my-trusthub-account-link';
import {
  CANARY_SLUGS,
  ONE_ACCOUNT_ENABLED,
  PARENT_SAVE_ENABLED,
  keepAllowedForSlug,
} from './my-trusthub-origin';

const CANONICAL = 'https://www.asktrusthub.com/my';

test('parent Save gates stay at their closed defaults', () => {
  assert.equal(process.env.NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED, undefined);
  assert.equal(PARENT_SAVE_ENABLED, false);
  assert.deepEqual([...CANARY_SLUGS], []);
  assert.equal(ONE_ACCOUNT_ENABLED, false);
  assert.equal(keepAllowedForSlug('hindman-isaacs-moving-storage-inc'), false);
  assert.equal(keepAllowed('hindman-isaacs-moving-storage-inc', { parentSaveEnabled: false, canarySlugs: [] }), false);
  assert.equal(keepAllowed('other-mover', { parentSaveEnabled: true, canarySlugs: ['hindman-isaacs-moving-storage-inc'] }), false);
  assert.equal(keepAllowed('hindman-isaacs-moving-storage-inc', { parentSaveEnabled: true, canarySlugs: ['hindman-isaacs-moving-storage-inc'] }), true);
  const origin = readFileSync(new URL('./my-trusthub-origin.tsx', import.meta.url), 'utf8');
  assert.match(origin, /export const PARENT_SAVE_ENABLED = process\.env\.NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED === '1'/);
  assert.match(origin, /export const ONE_ACCOUNT_ENABLED = PARENT_SAVE_ENABLED && CANARY_SLUGS\.length === 0/);
  assert.match(origin, /return keepAllowed\(slug, \{ parentSaveEnabled: PARENT_SAVE_ENABLED, canarySlugs: CANARY_SLUGS \}\)/);
});

test('neutral My TrustHub link is visible in desktop, mobile header, and drawer', () => {
  const header = readFileSync(new URL('../move-network-header.tsx', import.meta.url), 'utf8');
  assert.match(header, /<MyTrustHubAccountLink variant="desktop" \/>/);
  assert.match(header, /<MyTrustHubAccountLink variant="mobile-header" \/>/);
  assert.match(header, /<MyTrustHubAccountLink variant="drawer" onNavigate=\{/);
  assert.match(header, /<MyMoveNavLink variant="desktop"/);
  assert.match(header, /<MyMoveNavLink variant="mobile-header"/);
  assert.match(header, /href="\/my-move"/);

  for (const variant of ['desktop', 'mobile-header', 'drawer'] as const) {
    const html = renderToStaticMarkup(React.createElement(MyTrustHubAccountLink, { variant }));
    assert.match(html, /href="https:\/\/www\.asktrusthub\.com\/my"/, variant);
    assert.equal(html.includes(CANONICAL), true, variant);
    assert.match(html, /data-mth-neutral-account="true"/, variant);
    assert.doesNotMatch(html, /data-mth-account-entry/, variant);
    assert.match(html, /My TrustHub/, variant);
    assert.doesNotMatch(html, /sign up|signup|Sign in|saved research|Keep this|cross-hub Save/i, variant);
    if (variant === 'mobile-header') assert.match(html, /aria-label="My TrustHub"/, variant);
    else assert.match(html, />My TrustHub</, variant);
  }
});
