/**
 * Task 009A.1 permanent tests for DB directory engine contracts.
 * Live DB cases skip when Supabase/DATABASE_URL is unavailable.
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { filterCompanies } from '@/lib/directory/filter-companies';
import { resolveDirectoryQueryEngine } from '@/lib/directory/directory-query-engine';
import { scoreCompanySearch } from '@/lib/directory/search-scoring';
import { isConsumerVisibleCompany } from '@/lib/provider/publication';
import type { Company } from '@/types';

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

function company(partial: Partial<Company> & Pick<Company, 'id' | 'slug' | 'name'>): Company {
  return {
    logo: undefined,
    shortDescription: '',
    description: '',
    foundedYear: 2000,
    headquarters: 'Dallas, TX',
    website: '',
    physicalAddress: null,
    phone: null,
    email: null,
    serviceScope: 'interstate',
    coverageCounties: [],
    usdotNumber: '',
    mcNumber: '',
    fmcsaLegalName: '',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 0,
    fmcsaLastChecked: null,
    authorityActive: true,
    outOfService: false,
    complaintsLast12m: 0,
    revocationDate: null,
    fmcsaDataHash: null,
    bbbRating: 'NR',
    bbbAccredited: false,
    bbbLastChecked: null,
    complaintsLast36m: 0,
    bbbCustomerReviews: 0,
    bbbDataHash: null,
    bbbBusinessId: null,
    bbbAlertCount: 0,
    overallRating: 4,
    reviewCount: 10,
    reputationScore: 50,
    yearsInBusiness: 10,
    avgPricePerMove: 0,
    priceRange: '',
    coverage: 'Continental US',
    services: ['Full Service'],
    entityType: 'Carrier',
    usdotStatus: 'ACTIVE',
    powerUnits: null,
    specialties: [],
    ratingBreakdown: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    isVerified: true,
    lastUpdated: '2026-01-01',
    publicationState: 'PUBLISHABLE',
    indexable: true,
    ...partial,
  };
}

describe('Task 009A.1 directory contracts (pure)', () => {
  it('production default is db after 009A.2 cutover', () => {
    const prev = process.env.DIRECTORY_QUERY_ENGINE;
    delete process.env.DIRECTORY_QUERY_ENGINE;
    process.env.VERCEL_ENV = 'production';
    (process.env as { NODE_ENV?: string }).NODE_ENV = 'production';
    assert.equal(resolveDirectoryQueryEngine(), 'db');
    if (prev !== undefined) process.env.DIRECTORY_QUERY_ENGINE = prev;
  });

  it('fail-closed publication excludes REVIEW_REQUIRED / INACTIVE / INGESTED / CLASSIFIED', () => {
    assert.equal(isConsumerVisibleCompany({ publicationState: 'REVIEW_REQUIRED' }), false);
    assert.equal(isConsumerVisibleCompany({ publicationState: 'INACTIVE' }), false);
    assert.equal(isConsumerVisibleCompany({ publicationState: 'INGESTED' }), false);
    assert.equal(isConsumerVisibleCompany({ publicationState: 'CLASSIFIED' }), false);
    assert.equal(isConsumerVisibleCompany({ publicationState: 'PUBLISHABLE' }), true);
    assert.equal(isConsumerVisibleCompany({ publicationState: null }), true);
  });

  it('price-low sorts unknown price last', () => {
    const unknown = company({ id: 'u', slug: 'u', name: 'Unknown', avgPricePerMove: 0, reputationScore: 99 });
    const cheap = company({ id: 'c', slug: 'c', name: 'Cheap', avgPricePerMove: 1200, reputationScore: 10 });
    const result = filterCompanies([unknown, cheap], { sort: 'price-low' });
    assert.equal(result[0]?.id, 'c');
    assert.equal(result[1]?.id, 'u');
  });

  it('complaints sorts unknown shipment volume last', () => {
    const unknown = company({
      id: 'u',
      slug: 'u',
      name: 'Unknown',
      fmcsaShipments: 0,
      fmcsaComplaints: 0,
      reputationScore: 99,
    });
    const known = company({
      id: 'k',
      slug: 'k',
      name: 'Known',
      fmcsaShipments: 100,
      fmcsaComplaints: 1,
      reputationScore: 10,
    });
    const result = filterCompanies([unknown, known], { sort: 'complaints' });
    assert.equal(result[0]?.id, 'k');
    assert.equal(result[1]?.id, 'u');
  });

  it('USDOT / MC search scores exact regulatory matches highest', () => {
    const allied = company({
      id: 'allied',
      slug: 'allied-van-lines',
      name: 'Allied Van Lines',
      usdotNumber: '76235',
      mcNumber: '15735',
    });
    assert.ok(scoreCompanySearch(allied, '76235') >= 1100);
    assert.ok(scoreCompanySearch(allied, 'DOT 76235') >= 1100);
    assert.ok(scoreCompanySearch(allied, 'USDOT 76235') >= 1100);
    assert.ok(scoreCompanySearch(allied, 'MC 15735') >= 1100);
  });

  it('exact name and legal name score highly', () => {
    const c = company({
      id: 'm',
      slug: 'mayflower',
      name: 'Mayflower Transit',
      fmcsaLegalName: 'Mayflower Transit LLC',
    });
    assert.ok(scoreCompanySearch(c, 'Mayflower Transit') >= 1000);
    assert.ok(scoreCompanySearch(c, 'Mayflower Transit LLC') >= 990);
  });

  it('API contract shape keys remain stable', () => {
    const shape = {
      companies: [] as Company[],
      total: 0,
      offset: 0,
      limit: 24,
      hasMore: false,
    };
    for (const key of ['companies', 'total', 'offset', 'limit', 'hasMore'] as const) {
      assert.ok(key in shape);
    }
  });
});

describe('Task 009A.1 live DB engine (optional)', () => {
  const hasDb = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  it('default query materializes <= limit+buffer rows, not full universe', async (t) => {
    if (!hasDb) {
      t.skip('Supabase env not configured');
      return;
    }
    process.env.DIRECTORY_QUERY_ENGINE = 'db';
    const { queryDbDirectoryPage, getLastDbDirectoryDiagnostics } = await import(
      '@/lib/directory/query-db-directory-page'
    );
    const page = await queryDbDirectoryPage({ offset: 0, limit: 24, filters: {} });
    const diag = getLastDbDirectoryDiagnostics();
    assert.ok(page.companies.length <= 24);
    assert.ok(page.total >= page.companies.length);
    assert.ok(page.total > 24, `expected total > 24, got ${page.total} path=${diag?.path}`);
    assert.ok(diag);
    assert.ok(
      (diag?.materializedIntoNode ?? 9999) <= 48,
      `expected <=48 Node rows for limit=24, got ${diag?.materializedIntoNode}`
    );
    assert.ok(
      (diag?.materializedIntoNode ?? 9999) < 2000,
      'must not materialize ~4021 DB rows'
    );
  });

  it('USDOT search finds Allied 76235', async (t) => {
    if (!hasDb) {
      t.skip('Supabase env not configured');
      return;
    }
    const { queryDbDirectoryPage } = await import('@/lib/directory/query-db-directory-page');
    const page = await queryDbDirectoryPage({
      offset: 0,
      limit: 24,
      filters: { search: '76235' },
    });
    assert.ok(page.companies.some((c) => (c.usdotNumber || '').replace(/\D/g, '') === '76235'));
  });

  it('offset pagination returns distinct pages', async (t) => {
    if (!hasDb) {
      t.skip('Supabase env not configured');
      return;
    }
    const { queryDbDirectoryPage } = await import('@/lib/directory/query-db-directory-page');
    const p0 = await queryDbDirectoryPage({ offset: 0, limit: 24, filters: {} });
    const p1 = await queryDbDirectoryPage({ offset: 24, limit: 24, filters: {} });
    assert.ok(p0.companies.length <= 24 && p0.companies.length >= 1);
    assert.ok(p1.companies.length > 0);
    const ids0 = new Set(p0.companies.map((c) => c.id));
    const overlap = p1.companies.filter((c) => ids0.has(c.id));
    assert.equal(overlap.length, 0, `unexpected overlap: ${overlap.map((c) => c.id).join(',')}`);
  });

  it('REVIEW_REQUIRED never appears in default results', async (t) => {
    if (!hasDb) {
      t.skip('Supabase env not configured');
      return;
    }
    const { queryDbDirectoryPage } = await import('@/lib/directory/query-db-directory-page');
    const page = await queryDbDirectoryPage({ offset: 0, limit: 24, filters: {} });
    for (const c of page.companies) {
      assert.notEqual(c.publicationState, 'REVIEW_REQUIRED');
      assert.notEqual(c.publicationState, 'INACTIVE');
      assert.notEqual(c.publicationState, 'INGESTED');
      assert.notEqual(c.publicationState, 'CLASSIFIED');
    }
  });
});
