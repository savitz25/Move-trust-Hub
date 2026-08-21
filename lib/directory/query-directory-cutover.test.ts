/**
 * Task 009A.2 cutover regression tests.
 */
import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import {
  resolveDirectoryQueryEngine,
  isLegacyFallbackAllowed,
  resetDirectoryQueryPathCounts,
  getDirectoryQueryPathCounts,
} from '@/lib/directory/directory-query-engine';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

loadEnvFiles();

describe('Task 009A.2 cutover contracts', () => {
  const prevEngine = process.env.DIRECTORY_QUERY_ENGINE;
  const prevFallback = process.env.DIRECTORY_ENGINE_LEGACY_FALLBACK;

  afterEach(() => {
    if (prevEngine === undefined) delete process.env.DIRECTORY_QUERY_ENGINE;
    else process.env.DIRECTORY_QUERY_ENGINE = prevEngine;
    if (prevFallback === undefined) delete process.env.DIRECTORY_ENGINE_LEGACY_FALLBACK;
    else process.env.DIRECTORY_ENGINE_LEGACY_FALLBACK = prevFallback;
    resetDirectoryQueryPathCounts();
  });

  it('DB engine is the default (legacy is not default)', () => {
    delete process.env.DIRECTORY_QUERY_ENGINE;
    assert.equal(resolveDirectoryQueryEngine(), 'db');
    assert.notEqual(resolveDirectoryQueryEngine(), 'legacy');
  });

  it('rollback switch forces legacy', () => {
    process.env.DIRECTORY_QUERY_ENGINE = 'legacy';
    assert.equal(resolveDirectoryQueryEngine(), 'legacy');
  });

  it('legacy fallback is not enabled by default', () => {
    delete process.env.DIRECTORY_ENGINE_LEGACY_FALLBACK;
    assert.equal(isLegacyFallbackAllowed(), false);
  });

  it('SSR and API share resolveDirectoryQueryEngine', () => {
    // Both app/(move)/companies/page.tsx and api/directory/companies/route.ts
    // call queryDirectoryPage → resolveDirectoryQueryEngine. Same default.
    delete process.env.DIRECTORY_QUERY_ENGINE;
    assert.equal(resolveDirectoryQueryEngine({ requestEngine: null }), 'db');
    assert.equal(resolveDirectoryQueryEngine({ requestEngine: undefined }), 'db');
  });
});

describe('Task 009A.2 live cutover (optional)', () => {
  const hasDb = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  it('queryDirectoryPage default uses DB and stays bounded', async (t) => {
    if (!hasDb) {
      t.skip('Supabase env not configured');
      return;
    }
    delete process.env.DIRECTORY_QUERY_ENGINE;
    resetDirectoryQueryPathCounts();
    const { queryDirectoryPage } = await import('@/lib/directory/query-directory-page');
    const { getLastDbDirectoryDiagnostics } = await import(
      '@/lib/directory/query-db-directory-page'
    );
    const page = await queryDirectoryPage({ offset: 0, limit: 24, filters: {} });
    const diag = getLastDbDirectoryDiagnostics();
    const counts = getDirectoryQueryPathCounts();
    assert.ok(page.companies.length <= 24);
    assert.ok(page.total > 1000, `expected full directory total, got ${page.total}`);
    assert.ok((diag?.materializedIntoNode ?? 9999) < 500);
    assert.ok(counts.db + counts.hybrid >= 1);
    assert.equal(counts.legacy_fallback, 0);
    assert.equal(counts.legacy, 0);
  });

  it('canonical USDOT searches remain exact', async (t) => {
    if (!hasDb) {
      t.skip('Supabase env not configured');
      return;
    }
    const { queryDirectoryPage } = await import('@/lib/directory/query-directory-page');
    for (const usdot of ['76235', '125563', '125550', '4525347']) {
      const page = await queryDirectoryPage({
        offset: 0,
        limit: 5,
        filters: { search: usdot },
      });
      assert.ok(
        page.companies.some((c) => (c.usdotNumber || '').replace(/\D/g, '') === usdot),
        `missing USDOT ${usdot}`
      );
    }
  });

  it('deep pagination has no duplicates', async (t) => {
    if (!hasDb) {
      t.skip('Supabase env not configured');
      return;
    }
    const { queryDirectoryPage } = await import('@/lib/directory/query-directory-page');
    const p0 = await queryDirectoryPage({ offset: 0, limit: 24, filters: {} });
    const p1 = await queryDirectoryPage({ offset: 24, limit: 24, filters: {} });
    const pDeep = await queryDirectoryPage({ offset: 1000, limit: 24, filters: {} });
    const ids0 = new Set(p0.companies.map((c) => c.id));
    for (const c of p1.companies) assert.ok(!ids0.has(c.id));
    assert.ok(pDeep.companies.length <= 24);
    assert.equal(p0.total, pDeep.total);
  });
});
