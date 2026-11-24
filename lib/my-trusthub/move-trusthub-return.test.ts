import assert from 'node:assert/strict';
import test from 'node:test';
import {
  MOVE_RETURN_PREFIXES,
  MOVE_SIGNED_OUT_SAVE_COPY,
  moveTrustHubSignInHref,
} from './move-trusthub-return';

const ORIGIN = 'https://www.movetrusthub.com';

function href(path: string): string {
  return moveTrustHubSignInHref(`${ORIGIN}${path}`);
}

test('registered Move paths attach return and other paths omit it', () => {
  assert.deepEqual(
    [...MOVE_RETURN_PREFIXES],
    ['/companies', '/verify-dot', '/moving-calculator', '/my-move', '/auth/network-handoff']
  );
  const attached = [
    '/companies/hindman-isaacs-moving-storage-inc',
    '/companies/gentle-giant-moving',
    '/companies/caraway-moving-inc',
    '/verify-dot',
    '/moving-calculator',
    '/my-move',
    '/auth/network-handoff',
  ];
  for (const path of attached) {
    const value = href(path);
    assert.equal(value.startsWith('https://www.asktrusthub.com/my/sign-in?next=/my&return='), true, path);
    assert.equal(decodeURIComponent(value.split('return=')[1]), `${ORIGIN}${path}`);
  }
  for (const path of ['/', '/local-movers/florida', '/company/dot-227698', '/companies-extra']) {
    const value = href(path);
    assert.equal(value, 'https://www.asktrusthub.com/my/sign-in?next=/my', path);
    assert.equal(value.includes('return='), false);
  }
});

test('hostile and over-long URLs omit return', () => {
  const hostile = [
    `${ORIGIN}/companies/%252e%252e/admin`,
    `${ORIGIN}/companies/%5cadmin`,
    `${ORIGIN}/companies/.%2e`,
    `${ORIGIN}/companies/%2e.`,
    `${ORIGIN}/companies/.%2E`,
    `${ORIGIN}/companies/%25252e`,
    `${ORIGIN}/verify-dot/%5C`,
  ];
  for (const url of hostile) {
    const value = moveTrustHubSignInHref(url);
    assert.equal(value.includes('return='), false, url);
  }
  const longPath = `/companies/${'a'.repeat(500)}`;
  assert.equal(href(longPath).includes('return='), false);
  assert.equal(MOVE_SIGNED_OUT_SAVE_COPY.includes('invitation-only'), true);
});
