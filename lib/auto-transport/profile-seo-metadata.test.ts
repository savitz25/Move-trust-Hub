import assert from 'node:assert/strict';
import test from 'node:test';
import { buildAutoTransportProfileSeoMetadata } from './profile-seo-metadata';

test('indexable auto transport profiles self-canonicalize to the resolved company slug', () => {
  const metadata = buildAutoTransportProfileSeoMetadata({
    slug: 'canonical-carrier',
    indexable: true,
    publicationState: 'INDEXABLE',
  });

  assert.equal(
    metadata.alternates?.canonical,
    'https://www.movetrusthub.com/auto-transport/canonical-carrier'
  );
  assert.deepEqual(metadata.robots, { index: true, follow: true });
});

test('nonindexable company profiles keep their robots gate and use their resolved slug canonical', () => {
  const metadata = buildAutoTransportProfileSeoMetadata({
    slug: 'thin-carrier',
    indexable: false,
    publicationState: 'INGESTED',
  });

  assert.equal(
    metadata.alternates?.canonical,
    'https://www.movetrusthub.com/auto-transport/thin-carrier'
  );
  assert.deepEqual(metadata.robots, { index: false, follow: true });
});
