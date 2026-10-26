import assert from 'node:assert/strict';
import test from 'node:test';
import { canonicalProfileSlugForMover } from './canonical-profile-slug';

test('does not invent a company profile slug when a county mover has no resolved company slug', () => {
  assert.equal(canonicalProfileSlugForMover({ profileSlug: undefined }), null);
  assert.equal(canonicalProfileSlugForMover({ profileSlug: '' }), null);
});

test('keeps the exact slug provided by the resolved company record', () => {
  assert.equal(
    canonicalProfileSlugForMover({ profileSlug: 'live-company-slug-2' }),
    'live-company-slug-2'
  );
});

test('rejects malformed values instead of turning them into profile URLs', () => {
  assert.equal(canonicalProfileSlugForMover({ profileSlug: '/companies/not-a-slug' }), null);
  assert.equal(canonicalProfileSlugForMover({ profileSlug: 'company slug' }), null);
});
