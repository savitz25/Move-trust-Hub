import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import {
  isLegacyFallbackAllowed,
  resolveDirectoryQueryEngine,
  resetDirectoryQueryPathCounts,
  recordDirectoryQueryPath,
  getDirectoryQueryPathCounts,
} from '@/lib/directory/directory-query-engine';

describe('resolveDirectoryQueryEngine (009A.2 cutover)', () => {
  const prevEngine = process.env.DIRECTORY_QUERY_ENGINE;
  const prevVercel = process.env.VERCEL_ENV;
  const prevNode = process.env.NODE_ENV;
  const prevFallback = process.env.DIRECTORY_ENGINE_LEGACY_FALLBACK;
  const prevHint = process.env.DIRECTORY_ENGINE_ALLOW_LEGACY_HINT;

  afterEach(() => {
    if (prevEngine === undefined) delete process.env.DIRECTORY_QUERY_ENGINE;
    else process.env.DIRECTORY_QUERY_ENGINE = prevEngine;
    if (prevVercel === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = prevVercel;
    if (prevFallback === undefined) delete process.env.DIRECTORY_ENGINE_LEGACY_FALLBACK;
    else process.env.DIRECTORY_ENGINE_LEGACY_FALLBACK = prevFallback;
    if (prevHint === undefined) delete process.env.DIRECTORY_ENGINE_ALLOW_LEGACY_HINT;
    else process.env.DIRECTORY_ENGINE_ALLOW_LEGACY_HINT = prevHint;
    (process.env as { NODE_ENV?: string }).NODE_ENV = prevNode;
    resetDirectoryQueryPathCounts();
  });

  it('defaults to db after 009A.2 cutover', () => {
    delete process.env.DIRECTORY_QUERY_ENGINE;
    process.env.VERCEL_ENV = 'production';
    (process.env as { NODE_ENV?: string }).NODE_ENV = 'production';
    assert.equal(resolveDirectoryQueryEngine(), 'db');
  });

  it('honors DIRECTORY_QUERY_ENGINE=legacy rollback switch', () => {
    process.env.DIRECTORY_QUERY_ENGINE = 'legacy';
    assert.equal(resolveDirectoryQueryEngine(), 'legacy');
  });

  it('honors DIRECTORY_QUERY_ENGINE=db', () => {
    process.env.DIRECTORY_QUERY_ENGINE = 'db';
    assert.equal(resolveDirectoryQueryEngine(), 'db');
  });

  it('ignores public engine=legacy on production unless hint allowed', () => {
    delete process.env.DIRECTORY_QUERY_ENGINE;
    delete process.env.DIRECTORY_ENGINE_ALLOW_LEGACY_HINT;
    process.env.VERCEL_ENV = 'production';
    (process.env as { NODE_ENV?: string }).NODE_ENV = 'production';
    assert.equal(resolveDirectoryQueryEngine({ requestEngine: 'legacy' }), 'db');
  });

  it('allows engine=legacy hint when DIRECTORY_ENGINE_ALLOW_LEGACY_HINT=1', () => {
    delete process.env.DIRECTORY_QUERY_ENGINE;
    process.env.DIRECTORY_ENGINE_ALLOW_LEGACY_HINT = '1';
    process.env.VERCEL_ENV = 'production';
    (process.env as { NODE_ENV?: string }).NODE_ENV = 'production';
    assert.equal(resolveDirectoryQueryEngine({ requestEngine: 'legacy' }), 'legacy');
  });

  it('legacy fallback is off by default', () => {
    delete process.env.DIRECTORY_ENGINE_LEGACY_FALLBACK;
    assert.equal(isLegacyFallbackAllowed(), false);
  });

  it('legacy fallback can be enabled explicitly', () => {
    process.env.DIRECTORY_ENGINE_LEGACY_FALLBACK = '1';
    assert.equal(isLegacyFallbackAllowed(), true);
  });

  it('records db / hybrid / legacy_fallback path counters', () => {
    resetDirectoryQueryPathCounts();
    recordDirectoryQueryPath('db');
    recordDirectoryQueryPath('hybrid');
    recordDirectoryQueryPath('legacy_fallback');
    assert.deepEqual(getDirectoryQueryPathCounts(), {
      db: 1,
      hybrid: 1,
      legacy: 0,
      legacy_fallback: 1,
    });
  });
});
