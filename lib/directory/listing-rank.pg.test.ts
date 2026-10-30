/**
 * Disposable Postgres proof for the plain listing query.
 * Uses PGlite when it can be imported, or a loopback DATABASE_URL in
 * MOVE_LISTING_FIXTURE_DATABASE_URL. It never opens a remote database.
 */
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { pathToFileURL } from 'node:url';
import {
  PLAIN_REPUTATION_LISTING_SQL,
  compareReputationListing,
  hydrateListingPage,
  pageReputationListing,
  readPlainListingPage,
  type ListingRankRow,
} from '@/lib/directory/listing-rank';

type SqlClient = {
  query: (
    sql: string,
    params?: unknown[]
  ) => Promise<{ rows: Record<string, unknown>[] }>;
  close: () => Promise<void>;
};

type FixtureRow = ListingRankRow & {
  googleData: Record<string, unknown> | null;
  publicScrapeData: Record<string, unknown> | null;
};

const FIXTURE: FixtureRow[] = [
  {
    id: 'b',
    reputationScore: 5,
    publicationState: 'PUBLISHABLE',
    serviceScope: 'interstate',
    googleData: null,
    publicScrapeData: null,
  },
  {
    id: 'a',
    reputationScore: null,
    publicationState: 'INDEXABLE',
    serviceScope: 'interstate',
    googleData: { status: 'ok', rating: 4.4, review_count: 3, raw_response: 'g'.repeat(4000) },
    publicScrapeData: null,
  },
  {
    id: 'm',
    reputationScore: 0,
    publicationState: 'VERIFIED',
    serviceScope: null,
    googleData: null,
    publicScrapeData: { bbb_rating: 'A+', raw: 'p'.repeat(4000) },
  },
  {
    id: 'z',
    reputationScore: 0,
    publicationState: null,
    serviceScope: 'regional',
    googleData: { raw_response: 'x'.repeat(8000) },
    publicScrapeData: { snippets: 'y'.repeat(8000) },
  },
  {
    id: 'local',
    reputationScore: 100,
    publicationState: 'PUBLISHABLE',
    serviceScope: 'intrastate',
    googleData: { raw_response: 'local'.repeat(1000) },
    publicScrapeData: null,
  },
  {
    id: 'hidden',
    reputationScore: 99,
    publicationState: 'REVIEW_REQUIRED',
    serviceScope: 'interstate',
    googleData: { raw_response: 'hidden'.repeat(1000) },
    publicScrapeData: null,
  },
];

function loopbackFixtureUrl(): string | null {
  const raw = process.env.MOVE_LISTING_FIXTURE_DATABASE_URL?.trim();
  if (!raw) return null;
  let host = '';
  try {
    host = new URL(raw.replace(/^postgres(?:ql)?:\/\//i, 'http://')).hostname;
  } catch {
    throw new Error('MOVE_LISTING_FIXTURE_DATABASE_URL is not a database URL');
  }
  if (host !== '127.0.0.1' && host !== 'localhost') {
    throw new Error('listing fixture database must be loopback');
  }
  return raw;
}

async function openDisposablePostgres(): Promise<SqlClient | null> {
  const fixtureUrl = loopbackFixtureUrl();
  if (fixtureUrl) {
    const pg = await import('pg');
    const client = new pg.Client({
      connectionString: fixtureUrl,
      connectionTimeoutMillis: 5_000,
    });
    await client.connect();
    return {
      query: (sql, params) => client.query(sql, params),
      close: () => client.end(),
    };
  }

  const candidates = [
    process.env.MOVE_DISPOSABLE_PGLITE_ROOT?.trim(),
    '@electric-sql/pglite',
  ].filter((value): value is string => Boolean(value));
  let lastError: unknown = null;
  for (const name of candidates) {
    const specifier = path.isAbsolute(name)
      ? pathToFileURL(
          existsSync(path.join(name, 'package.json')) ? path.join(name, 'dist', 'index.js') : name
        ).href
      : name;
    try {
      const loaded = (await import(specifier)) as {
        PGlite: new () => {
          query: (sql: string, params?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }>;
          exec: (sql: string) => Promise<unknown>;
          close: () => Promise<void>;
        };
      };
      const db = new loaded.PGlite();
      return {
        query: async (sql, params) => {
          const result = await db.query(sql, params ?? []);
          return { rows: result.rows ?? [] };
        },
        close: () => db.close(),
      };
    } catch (error) {
      lastError = error;
    }
  }
  if (process.env.MOVE_DISPOSABLE_PGLITE_ROOT?.trim()) {
    throw lastError instanceof Error ? lastError : new Error('disposable PGlite did not load');
  }
  return null;
}

async function seed(db: SqlClient): Promise<void> {
  await db.query('DROP TABLE IF EXISTS public.companies');
  await db.query(`
    CREATE TABLE public.companies (
      id text PRIMARY KEY,
      publication_state text,
      service_scope text,
      reputation_score numeric,
      google_data jsonb,
      public_scrape_data jsonb
    )
  `);
  for (const row of FIXTURE) {
    await db.query(
      `INSERT INTO public.companies (
         id, publication_state, service_scope, reputation_score, google_data, public_scrape_data
       ) VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb)`,
      [
        row.id,
        row.publicationState,
        row.serviceScope,
        row.reputationScore,
        row.googleData ? JSON.stringify(row.googleData) : null,
        row.publicScrapeData ? JSON.stringify(row.publicScrapeData) : null,
      ]
    );
  }
}

function expectedPage(offset: number, limit: number) {
  return pageReputationListing(FIXTURE, offset, limit);
}

describe('disposable postgres listing fixture', () => {
  it('matches publication, null/zero order, empty-page count, and page hydration', async (t) => {
    const db = await openDisposablePostgres();
    if (!db) {
      t.skip('no loopback Postgres or PGlite available');
      return;
    }
    try {
      await seed(db);
      const sizes = await db.query(`
        SELECT coalesce(sum(pg_column_size(id) + pg_column_size(reputation_score)), 0)::int AS narrow_bytes,
               coalesce(sum(octet_length(google_data::text) + octet_length(coalesce(public_scrape_data::text, ''))), 0)::int AS json_text_bytes
          FROM public.companies
      `);
      const narrowBytes = Number(sizes.rows[0]?.narrow_bytes ?? 0);
      const jsonBytes = Number(sizes.rows[0]?.json_text_bytes ?? 0);
      assert.ok(jsonBytes > narrowBytes * 20, `json ${jsonBytes} narrow ${narrowBytes}`);

      for (const [offset, limit] of [
        [0, 2],
        [2, 2],
        [4, 2],
        [100, 2],
      ] as const) {
        const result = await db.query(PLAIN_REPUTATION_LISTING_SQL, [offset, limit]);
        const page = readPlainListingPage(
          result.rows.map((row) => ({
            company_id: row.company_id == null ? null : String(row.company_id),
            total_count: row.total_count as number | string | null,
          }))
        );
        const expected = expectedPage(offset, limit);
        assert.deepEqual(page.ids, expected.ids, `offset ${offset}`);
        assert.equal(page.total, expected.total);
        assert.equal(page.ids.includes('local'), false);
        assert.equal(page.ids.includes('hidden'), false);
      }

      const first = await db.query(PLAIN_REPUTATION_LISTING_SQL, [0, 2]);
      const second = await db.query(PLAIN_REPUTATION_LISTING_SQL, [2, 2]);
      const firstIds = readPlainListingPage(
        first.rows.map((row) => ({
          company_id: String(row.company_id),
          total_count: row.total_count as number | string,
        }))
      ).ids;
      const secondIds = readPlainListingPage(
        second.rows.map((row) => ({
          company_id: String(row.company_id),
          total_count: row.total_count as number | string,
        }))
      ).ids;
      assert.equal(firstIds.some((id) => secondIds.includes(id)), false);
      assert.deepEqual(firstIds, ['b', 'a']);
      assert.deepEqual(
        FIXTURE.filter((row) => firstIds.includes(row.id))
          .slice()
          .sort(compareReputationListing)
          .map((row) => row.id),
        firstIds
      );

      const nullsLast = FIXTURE.filter(
        (row) => row.publicationState !== 'REVIEW_REQUIRED' && row.serviceScope !== 'intrastate'
      )
        .slice()
        .sort((left, right) => {
          const leftNull = left.reputationScore == null;
          const rightNull = right.reputationScore == null;
          if (leftNull !== rightNull) return leftNull ? 1 : -1;
          const byScore = (right.reputationScore ?? 0) - (left.reputationScore ?? 0);
          if (byScore !== 0) return byScore;
          return left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
        })
        .map((row) => row.id);
      assert.notDeepEqual(nullsLast, ['b', 'a', 'm', 'z']);
      assert.deepEqual(
        pageReputationListing(FIXTURE, 0, 10).ids,
        ['b', 'a', 'm', 'z']
      );

      const shuffled = [...FIXTURE].reverse();
      const hydrated = hydrateListingPage(pageReputationListing(FIXTURE, 0, 10).ids, shuffled);
      assert.deepEqual(
        hydrated.map((row) => row.id),
        ['b', 'a', 'm', 'z']
      );
      assert.equal(new Set(hydrated.map((row) => row.id)).size, hydrated.length);

      console.log(
        JSON.stringify({
          fixture: 'disposable-postgres',
          productionMeasurement: false,
          rows: FIXTURE.length,
          narrowBytes,
          jsonTextBytes: jsonBytes,
          eligible: 4,
          emptyPageOffset: 100,
          emptyPageTotal: 4,
        })
      );
    } finally {
      await db.close();
    }
  });
});
