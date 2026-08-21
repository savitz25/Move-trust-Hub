import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import { resolveDirectoryQueryEngine } from '@/lib/directory/directory-query-engine';

describe('resolveDirectoryQueryEngine', () => {
  const prevEngine = process.env.DIRECTORY_QUERY_ENGINE;
  const prevVercel = process.env.VERCEL_ENV;
  const prevNode = process.env.NODE_ENV;
  const prevOptIn = process.env.DIRECTORY_ENGINE_PREVIEW_OPT_IN;

  afterEach(() => {
    if (prevEngine === undefined) delete process.env.DIRECTORY_QUERY_ENGINE;
    else process.env.DIRECTORY_QUERY_ENGINE = prevEngine;
    if (prevVercel === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = prevVercel;
    if (prevOptIn === undefined) delete process.env.DIRECTORY_ENGINE_PREVIEW_OPT_IN;
    else process.env.DIRECTORY_ENGINE_PREVIEW_OPT_IN = prevOptIn;
    // NODE_ENV is read-only in typings; restore via cast when needed.
    (process.env as { NODE_ENV?: string }).NODE_ENV = prevNode;
  });

  it('defaults to legacy (no cutover)', () => {
    delete process.env.DIRECTORY_QUERY_ENGINE;
    process.env.VERCEL_ENV = 'production';
    (process.env as { NODE_ENV?: string }).NODE_ENV = 'production';
    assert.equal(resolveDirectoryQueryEngine(), 'legacy');
    assert.equal(resolveDirectoryQueryEngine({ requestEngine: 'db' }), 'legacy');
  });

  it('honors DIRECTORY_QUERY_ENGINE=db', () => {
    process.env.DIRECTORY_QUERY_ENGINE = 'db';
    assert.equal(resolveDirectoryQueryEngine(), 'db');
  });

  it('allows engine=db on preview', () => {
    delete process.env.DIRECTORY_QUERY_ENGINE;
    process.env.VERCEL_ENV = 'preview';
    (process.env as { NODE_ENV?: string }).NODE_ENV = 'production';
    assert.equal(resolveDirectoryQueryEngine({ requestEngine: 'db' }), 'db');
  });

  it('allows engine=db in development', () => {
    delete process.env.DIRECTORY_QUERY_ENGINE;
    delete process.env.VERCEL_ENV;
    (process.env as { NODE_ENV?: string }).NODE_ENV = 'development';
    assert.equal(resolveDirectoryQueryEngine({ requestEngine: 'db' }), 'db');
  });
});
