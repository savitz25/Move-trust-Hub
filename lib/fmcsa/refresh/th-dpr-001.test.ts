/**
 * TH-DPR-001 step C regression.
 *
 * The pre-fix section runs the control flow that shipped before this change
 * (maybeSingle guard, counters written only after the loop, no try/finally,
 * no time budget) against the same in-memory Supabase fake. Those core
 * assertions fail. The rest of the file runs the fixed runner.
 *
 * No network: Supabase and FMCSA fetch are mocked.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { FMCSA_REFRESH_BUDGET } from '@/lib/fmcsa/refresh/budget';
import { evaluateCanaryRequest } from '@/lib/fmcsa/refresh/canary';
import { FMCSA_REFRESH_PAUSE_REASON, fmcsaRefreshPause } from '@/lib/fmcsa/refresh/pause';
import { FMCSA_REFRESH_CONFIG } from '@/lib/fmcsa/refresh/rate-limit';
import { runFmcsaRefresh, type FmcsaRefreshDb } from '@/lib/fmcsa/refresh/runner';
import type { CompanyRefreshRow, FmcsaCarrierSnapshot, RefreshOptions } from '@/lib/fmcsa/refresh/types';

type RunRow = {
  id: string;
  idempotency_key: string;
  mode: string;
  status: string;
  triggered_by: string;
  companies_total: number;
  companies_processed: number;
  companies_updated: number;
  companies_failed: number;
  changes_detected: number;
  error_summary: string | null;
  started_at: string;
  finished_at: string | null;
  metadata: Record<string, unknown> | null;
};

type ChangeRow = Record<string, unknown>;

type Harness = {
  supabase: FmcsaRefreshDb;
  runs: RunRow[];
  companies: CompanyRefreshRow[];
  changeLog: ChangeRow[];
  runUpdates: Record<string, unknown>[];
  selectLimits: number[];
};

function company(index: number, lastChecked: string | null = '2020-01-01T00:00:00.000Z'): CompanyRefreshRow {
  return {
    id: `c${index}`,
    slug: `slug-${index}`,
    name: `Carrier ${index}`,
    headquarters: 'Miami, FL',
    usdot_number: String(1_000_000 + index),
    mc_number: null,
    fmcsa_safety_rating: 'Not Rated',
    fmcsa_complaints: 0,
    fmcsa_shipments: 0,
    authority_active: true,
    out_of_service: false,
    complaints_last_12m: 0,
    revocation_date: null,
    data_hash: null,
    fmcsa_last_checked: lastChecked,
    fmcsa_raw: null,
    services: [],
    reputation_score: 0,
    overall_rating: 4,
    review_count: 2,
    bbb_rating: 'NR',
    bbb_accredited: false,
    is_verified: false,
    years_in_business: 5,
  };
}

function snapshot(dot: string): FmcsaCarrierSnapshot {
  return {
    dotNumber: dot,
    legalName: `Legal ${dot}`,
    allowedToOperate: true,
    authorityActive: true,
    outOfService: false,
    safetyRating: 'Satisfactory',
    complaintsLast12m: 1,
    shipments: 20,
    revocationDate: null,
    raw: { legalName: `Legal ${dot}`, allowedToOperate: 'Y', dotNumber: dot },
  };
}

function createHarness(options?: {
  companies?: CompanyRefreshRow[];
  runs?: RunRow[];
  changeLog?: ChangeRow[];
  guardError?: boolean;
}): Harness {
  const runs: RunRow[] = (options?.runs ?? []).map((row) => ({ ...row, metadata: row.metadata ? { ...row.metadata } : null }));
  const companies = (options?.companies ?? []).map((row) => ({ ...row }));
  const changeLog: ChangeRow[] = [...(options?.changeLog ?? [])];
  const runUpdates: Record<string, unknown>[] = [];
  const selectLimits: number[] = [];
  let seq = 1;

  const supabase = {
    from(table: string) {
      const state: {
        op: 'select' | 'insert' | 'update';
        payload: Record<string, unknown> | Record<string, unknown>[] | null;
        filters: Array<{ col: string; val: unknown }>;
        orExpr: string | null;
        limit: number | null;
      } = { op: 'select', payload: null, filters: [], orExpr: null, limit: null };

      const execute = async () => {
        if (table === 'fmcsa_refresh_runs' && state.op === 'select') {
          const isRunningQuery =
            state.filters.length === 1 &&
            state.filters[0]?.col === 'status' &&
            state.filters[0]?.val === 'running';
          if (options?.guardError && isRunningQuery) {
            return { data: null, error: { message: 'guard query failed' } };
          }
          const matched = runs.filter((row) =>
            state.filters.every((filter) => (row as unknown as Record<string, unknown>)[filter.col] === filter.val)
          );
          return { data: matched.map((row) => ({ ...row })), error: null };
        }

        if (table === 'fmcsa_refresh_runs' && state.op === 'insert') {
          const payload = state.payload as Record<string, unknown>;
          if (runs.some((row) => row.idempotency_key === payload.idempotency_key)) {
            return { data: null, error: { message: 'duplicate key value violates unique constraint idempotency_key' } };
          }
          const row: RunRow = {
            id: `run-${seq++}`,
            idempotency_key: String(payload.idempotency_key),
            mode: String(payload.mode),
            status: String(payload.status),
            triggered_by: String(payload.triggered_by),
            companies_total: Number(payload.companies_total ?? 0),
            companies_processed: Number(payload.companies_processed ?? 0),
            companies_updated: Number(payload.companies_updated ?? 0),
            companies_failed: Number(payload.companies_failed ?? 0),
            changes_detected: Number(payload.changes_detected ?? 0),
            error_summary: (payload.error_summary as string | null) ?? null,
            started_at: String(payload.started_at ?? new Date().toISOString()),
            finished_at: (payload.finished_at as string | null) ?? null,
            metadata: (payload.metadata as Record<string, unknown> | null) ?? {},
          };
          runs.push(row);
          return { data: { id: row.id }, error: null };
        }

        if (table === 'fmcsa_refresh_runs' && state.op === 'update') {
          const id = state.filters.find((filter) => filter.col === 'id')?.val;
          const row = runs.find((candidate) => candidate.id === id);
          if (!row) return { data: null, error: { message: 'run not found' } };
          const payload = state.payload as Record<string, unknown>;
          runUpdates.push({ id, ...payload });
          Object.assign(row, payload);
          return { data: row, error: null };
        }

        if (table === 'companies' && state.op === 'select') {
          if (state.limit != null) selectLimits.push(state.limit);
          let rows = companies.filter((row) => row.usdot_number);
          if (state.orExpr) {
            const cutoff = state.orExpr.match(/lt\."([^"]+)"/)?.[1];
            rows = rows.filter((row) => !row.fmcsa_last_checked || (cutoff ? row.fmcsa_last_checked < cutoff : false));
          }
          rows = [...rows].sort((a, b) => {
            if (!a.fmcsa_last_checked && !b.fmcsa_last_checked) return 0;
            if (!a.fmcsa_last_checked) return -1;
            if (!b.fmcsa_last_checked) return 1;
            return a.fmcsa_last_checked < b.fmcsa_last_checked ? -1 : a.fmcsa_last_checked > b.fmcsa_last_checked ? 1 : 0;
          });
          if (state.limit != null) rows = rows.slice(0, state.limit);
          return { data: rows.map((row) => ({ ...row })), error: null };
        }

        if (table === 'companies' && state.op === 'update') {
          const id = state.filters.find((filter) => filter.col === 'id')?.val;
          const row = companies.find((candidate) => candidate.id === id);
          if (!row) return { data: null, error: { message: 'company not found' } };
          Object.assign(row, state.payload);
          return { data: row, error: null };
        }

        if (table === 'fmcsa_change_log' && state.op === 'insert') {
          const payload = state.payload;
          const rows = Array.isArray(payload) ? payload : payload ? [payload] : [];
          changeLog.push(...rows);
          return { data: rows, error: null };
        }

        return { data: null, error: { message: `unexpected ${table} ${state.op}` } };
      };

      const singleResult = async () => {
        const result = await execute();
        if (result.error) return result;
        const data = result.data;
        if (Array.isArray(data)) {
          if (data.length > 1) return { data: null, error: { message: 'multiple rows' } };
          return { data: data[0] ?? null, error: null };
        }
        return result;
      };

      const api = {
        select() {
          return api;
        },
        insert(payload: Record<string, unknown> | Record<string, unknown>[]) {
          state.op = 'insert';
          state.payload = payload;
          return api;
        },
        update(payload: Record<string, unknown>) {
          state.op = 'update';
          state.payload = payload;
          return api;
        },
        eq(col: string, val: unknown) {
          state.filters.push({ col, val });
          return api;
        },
        neq() {
          return api;
        },
        not() {
          return api;
        },
        or(expr: string) {
          state.orExpr = expr;
          return api;
        },
        order() {
          return api;
        },
        limit(count: number) {
          state.limit = count;
          return api;
        },
        maybeSingle: singleResult,
        single: singleResult,
        then(resolve: (value: { data: unknown; error: { message: string } | null }) => unknown, reject?: (reason: unknown) => unknown) {
          return execute().then(resolve, reject);
        },
      };
      return api;
    },
  };

  return { supabase: supabase as unknown as FmcsaRefreshDb, runs, companies, changeLog, runUpdates, selectLimits };
}

function clockFrom(start: number) {
  let current = start;
  return {
    now: () => current,
    advance(ms: number) {
      current += ms;
    },
    get current() {
      return current;
    },
  };
}

function canonicalKey(mode: 'incremental' | 'full', nowMs: number): string {
  const now = new Date(nowMs);
  const day = now.toISOString().slice(0, 10);
  if (mode === 'incremental') {
    return `incremental-${day}-${now.getUTCHours().toString().padStart(2, '0')}`;
  }
  return `full-${day}`;
}

function printCore(lines: {
  RUN_STATUS_TERMINAL: 'YES' | 'NO';
  FINISHED_AT_SET: 'YES' | 'NO';
  PARTIAL_COUNTERS_PRESERVED: 'YES' | 'NO';
  NEXT_RUN_NOT_BLOCKED: 'YES' | 'NO';
  DUPLICATE_REPLAY: string;
}) {
  process.stdout.write(`RUN_STATUS_TERMINAL = ${lines.RUN_STATUS_TERMINAL}\n`);
  process.stdout.write(`FINISHED_AT_SET = ${lines.FINISHED_AT_SET}\n`);
  process.stdout.write(`PARTIAL_COUNTERS_PRESERVED = ${lines.PARTIAL_COUNTERS_PRESERVED}\n`);
  process.stdout.write(`NEXT_RUN_NOT_BLOCKED = ${lines.NEXT_RUN_NOT_BLOCKED}\n`);
  process.stdout.write(`DUPLICATE_REPLAY = ${lines.DUPLICATE_REPLAY}\n`);
  return lines;
}

function coreLines(input: {
  row: RunRow | undefined;
  expectedProcessed: number;
  expectedUpdated: number;
  nextSkipped: boolean;
  duplicateReplay: number;
}) {
  const terminal = input.row != null && (input.row.status === 'partial' || input.row.status === 'failed' || input.row.status === 'completed');
  return printCore({
    RUN_STATUS_TERMINAL: terminal && input.row?.status !== 'running' ? 'YES' : 'NO',
    FINISHED_AT_SET: input.row?.finished_at ? 'YES' : 'NO',
    PARTIAL_COUNTERS_PRESERVED:
      input.row?.companies_processed === input.expectedProcessed &&
      input.row?.companies_updated === input.expectedUpdated
        ? 'YES'
        : 'NO',
    NEXT_RUN_NOT_BLOCKED: input.nextSkipped ? 'NO' : 'YES',
    DUPLICATE_REPLAY: String(input.duplicateReplay),
  });
}

/**
 * Control flow of lib/fmcsa/refresh/runner.ts before TH-DPR-001 step C.
 * maybeSingle ignores a multi-row error, counters flush only after the loop,
 * and a throw never writes finished_at.
 */
async function runPreFix(harness: Harness, companies: CompanyRefreshRow[], fetchCompany: (dot: string) => Promise<void>) {
  const { data: running } = await harness.supabase
    .from('fmcsa_refresh_runs')
    .select('id, status')
    .eq('status', 'running')
    .maybeSingle();

  if (running) {
    return { skipped: true, runId: String(running.id), status: 'running' as const };
  }

  const inserted = await harness.supabase
    .from('fmcsa_refresh_runs')
    .insert({
      idempotency_key: `pre-fix-${harness.runs.length}`,
      mode: 'incremental',
      status: 'running',
      triggered_by: 'cron',
      companies_total: companies.length,
      metadata: { limit: companies.length },
    })
    .select('id')
    .single();

  const runId = String(inserted.data?.id);
  let processed = 0;
  let updated = 0;
  for (const row of companies) {
    processed++;
    await fetchCompany(String(row.usdot_number));
    updated++;
    await harness.supabase
      .from('companies')
      .update({ fmcsa_last_checked: new Date().toISOString() })
      .eq('id', row.id);
  }

  await harness.supabase
    .from('fmcsa_refresh_runs')
    .update({
      status: 'completed',
      companies_processed: processed,
      companies_updated: updated,
      finished_at: new Date().toISOString(),
    })
    .eq('id', runId);

  return { skipped: false, runId, status: 'completed' as const };
}

const quietBudget = {
  runBudgetMs: 240_000,
  checkpointEveryCompanies: 1,
  checkpointIntervalMs: 15_000,
  heartbeatStaleMs: 90_000,
  fullInvocationCap: 120,
};

function baseOptions(extra?: Partial<RefreshOptions>): RefreshOptions {
  return {
    mode: 'incremental',
    triggeredBy: 'cron',
    force: false,
    ...extra,
  };
}

test('pre-fix control flow fails the TH-DPR-001 core assertions', async () => {
  const harness = createHarness({ companies: [1, 2, 3, 4].map((index) => company(index)) });
  const fetched: string[] = [];
  let thrown = false;
  try {
    await runPreFix(harness, harness.companies.map((row) => ({ ...row })), async (dot) => {
      fetched.push(dot);
      if (fetched.length === 3) throw new Error('mid-loop boom');
    });
  } catch {
    thrown = true;
  }
  assert.equal(thrown, true);

  const row = harness.runs[0];
  const second = await runPreFix(harness, harness.companies.map((row) => ({ ...row })), async () => {
    throw new Error('should not fetch');
  }).catch(() => ({ skipped: false, runId: '', status: 'running' as const }));

  const lines = coreLines({
    row,
    expectedProcessed: 2,
    expectedUpdated: 2,
    nextSkipped: second.skipped === true,
    duplicateReplay: 0,
  });

  assert.equal(lines.RUN_STATUS_TERMINAL, 'NO');
  assert.equal(lines.FINISHED_AT_SET, 'NO');
  assert.equal(lines.PARTIAL_COUNTERS_PRESERVED, 'NO');
  assert.equal(lines.NEXT_RUN_NOT_BLOCKED, 'NO');
  assert.equal(row?.status, 'running');
  assert.equal(row?.companies_processed, 0);
  assert.equal(row?.finished_at, null);

  const multi = createHarness({
    runs: [
      blankRun('a', 'running', '2020-01-01T00:00:00.000Z'),
      blankRun('b', 'running', '2020-01-01T00:00:00.000Z'),
    ],
  });
  const { data, error } = await multi.supabase.from('fmcsa_refresh_runs').select('id').eq('status', 'running').maybeSingle();
  assert.equal(data, null);
  assert.match(error?.message ?? '', /multiple/);
});

test('a throw midway leaves a terminal run and does not block or replay', async () => {
  const start = Date.parse('2026-10-09T12:00:00.000Z');
  const clock = clockFrom(start);
  const harness = createHarness({ companies: [1, 2, 3, 4].map((index) => company(index)) });
  const fetched: string[] = [];
  let calls = 0;

  const first = await runFmcsaRefresh(baseOptions(), {
    supabase: harness.supabase,
    now: clock.now,
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async (input) => {
      calls += 1;
      fetched.push(input.usdot);
      if (calls === 3) throw new Error('mid-loop boom');
      return { snapshot: snapshot(input.usdot), lookupMethod: 'dot' };
    },
  });

  const doneIds = harness.companies
    .filter((row) => row.fmcsa_last_checked && row.fmcsa_last_checked >= '2026-10-09T12:00:00.000Z')
    .map((row) => row.id);
  assert.deepEqual(doneIds, ['c1', 'c2']);

  const checkpoint = harness.runUpdates.find(
    (update) => update.status == null && update.companies_processed === 2 && update.companies_updated === 2
  );
  assert.ok(checkpoint, 'expected an incremental checkpoint of the work done before the throw');

  harness.runs.push(
    blankRun('hard-kill', 'running', new Date(clock.now() - 20 * 60 * 1000).toISOString(), {
      idempotency_key: canonicalKey('incremental', clock.now()),
      companies_processed: 7,
      companies_updated: 7,
      metadata: { last_heartbeat_at: new Date(clock.now() - 5 * 60 * 1000).toISOString() },
    })
  );
  harness.changeLog.push({ run_id: 'hard-kill', company_id: 'already-written', field_name: 'authority_active' });

  const secondFetched: string[] = [];
  const second = await runFmcsaRefresh(baseOptions(), {
    supabase: harness.supabase,
    now: clock.now,
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async (input) => {
      secondFetched.push(input.usdot);
      return { snapshot: snapshot(input.usdot), lookupMethod: 'dot' };
    },
  });

  const doneDots = new Set(
    harness.companies.filter((row) => doneIds.includes(row.id)).map((row) => row.usdot_number)
  );
  const duplicateReplay = secondFetched.filter((dot) => doneDots.has(dot)).length;
  const row = harness.runs.find((candidate) => candidate.id === first.runId);
  const lines = coreLines({
    row,
    expectedProcessed: 2,
    expectedUpdated: 2,
    nextSkipped: second.skipped === true,
    duplicateReplay,
  });

  assert.equal(lines.RUN_STATUS_TERMINAL, 'YES');
  assert.equal(lines.FINISHED_AT_SET, 'YES');
  assert.equal(lines.PARTIAL_COUNTERS_PRESERVED, 'YES');
  assert.equal(lines.NEXT_RUN_NOT_BLOCKED, 'YES');
  assert.equal(lines.DUPLICATE_REPLAY, '0');
  assert.equal(row?.status, 'partial');
  assert.equal((row?.metadata as { exit_reason?: string } | null)?.exit_reason, 'loop_exception');
  assert.match(row?.error_summary ?? '', /mid-loop boom/);

  const abandoned = harness.runs.find((candidate) => candidate.id === 'hard-kill');
  assert.equal(abandoned?.status, 'failed');
  assert.ok(abandoned?.finished_at);
  assert.equal(abandoned?.companies_processed, 7);
  assert.equal(abandoned?.companies_updated, 7);
  assert.equal((abandoned?.metadata as { exit_reason?: string } | null)?.exit_reason, 'abandoned_detected_by_guard');
  assert.equal(harness.changeLog.filter((entry) => entry.run_id === 'hard-kill').length, 1);
  assert.equal(second.skipped, undefined);
  assert.deepEqual(secondFetched, ['1000003', '1000004']);
});

test('time budget expiry mid-loop finalizes partial and the next run is not blocked', async () => {
  const start = Date.parse('2026-10-09T15:00:00.000Z');
  const clock = clockFrom(start);
  const harness = createHarness({ companies: [1, 2, 3, 4].map((index) => company(index)) });
  const fetched: string[] = [];

  const first = await runFmcsaRefresh(baseOptions(), {
    supabase: harness.supabase,
    now: clock.now,
    budget: { ...quietBudget, runBudgetMs: 1_000 },
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async (input) => {
      clock.advance(400);
      fetched.push(input.usdot);
      return { snapshot: snapshot(input.usdot), lookupMethod: 'dot' };
    },
  });

  const doneIds = harness.companies
    .filter((row) => row.fmcsa_last_checked && row.fmcsa_last_checked >= '2026-10-09T15:00:00.000Z')
    .map((row) => row.id);
  assert.deepEqual(doneIds, ['c1', 'c2']);
  assert.equal(fetched.length, 3);

  harness.runs.push(
    blankRun('hard-kill', 'running', new Date(clock.now() - 20 * 60 * 1000).toISOString(), {
      idempotency_key: 'stale-hard-kill',
      companies_processed: 4,
      companies_updated: 4,
      metadata: { last_heartbeat_at: new Date(clock.now() - 5 * 60 * 1000).toISOString() },
    })
  );

  const secondFetched: string[] = [];
  const second = await runFmcsaRefresh(baseOptions(), {
    supabase: harness.supabase,
    now: clock.now,
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async (input) => {
      secondFetched.push(input.usdot);
      return { snapshot: snapshot(input.usdot), lookupMethod: 'dot' };
    },
  });

  const doneDots = new Set(
    harness.companies.filter((row) => doneIds.includes(row.id)).map((row) => row.usdot_number)
  );
  const row = harness.runs.find((candidate) => candidate.id === first.runId);
  const lines = coreLines({
    row,
    expectedProcessed: 2,
    expectedUpdated: 2,
    nextSkipped: second.skipped === true,
    duplicateReplay: secondFetched.filter((dot) => doneDots.has(dot)).length,
  });

  assert.equal(lines.RUN_STATUS_TERMINAL, 'YES');
  assert.equal(lines.FINISHED_AT_SET, 'YES');
  assert.equal(lines.PARTIAL_COUNTERS_PRESERVED, 'YES');
  assert.equal(lines.NEXT_RUN_NOT_BLOCKED, 'YES');
  assert.equal(lines.DUPLICATE_REPLAY, '0');
  assert.equal(row?.status, 'partial');
  assert.equal((row?.metadata as { exit_reason?: string } | null)?.exit_reason, 'time_budget_exhausted');
  assert.match(row?.error_summary ?? '', /time_budget_exhausted/);
  assert.equal(secondFetched.includes('1000001'), false);
  assert.equal(secondFetched.includes('1000002'), false);
  const abandoned = harness.runs.find((candidate) => candidate.id === 'hard-kill');
  assert.equal(abandoned?.status, 'failed');
  assert.equal(abandoned?.companies_processed, 4);
  assert.ok(abandoned?.finished_at);
});

test('a fresh heartbeat still blocks the next run', async () => {
  const start = Date.parse('2026-10-09T16:00:00.000Z');
  const clock = clockFrom(start);
  const harness = createHarness({
    companies: [company(1)],
    runs: [
      blankRun('live', 'running', new Date(start - 5_000).toISOString(), {
        companies_processed: 3,
        companies_updated: 3,
        metadata: { last_heartbeat_at: new Date(start).toISOString() },
      }),
    ],
  });

  const result = await runFmcsaRefresh(baseOptions(), {
    supabase: harness.supabase,
    now: clock.now,
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async () => {
      throw new Error('should not fetch');
    },
  });

  assert.equal(result.skipped, true);
  assert.equal(result.status, 'running');
  assert.equal(result.runId, 'live');
  assert.equal(harness.runs.length, 1);
  assert.equal(harness.runs[0]?.status, 'running');
  assert.equal(harness.runs[0]?.companies_processed, 3);
});

test('a 6-minute-old row with a heartbeat older than 90s still blocks', async () => {
  const start = Date.parse('2026-10-09T16:30:00.000Z');
  const clock = clockFrom(start);
  const harness = createHarness({
    companies: [company(1)],
    runs: [
      blankRun('stale-beat', 'running', new Date(start - 6 * 60 * 1000).toISOString(), {
        companies_processed: 11,
        companies_updated: 11,
        metadata: { last_heartbeat_at: new Date(start - 2 * 60 * 1000).toISOString() },
      }),
    ],
  });

  const result = await runFmcsaRefresh(baseOptions({ limit: 1 }), {
    supabase: harness.supabase,
    now: clock.now,
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async () => {
      throw new Error('should not fetch');
    },
  });

  const live = harness.runs.find((row) => row.id === 'stale-beat');
  assert.equal(result.skipped, true);
  assert.equal(result.status, 'running');
  assert.equal(result.runId, 'stale-beat');
  assert.equal(harness.runs.length, 1);
  assert.equal(live?.status, 'running');
  assert.equal(live?.companies_processed, 11);
  assert.equal(live?.companies_updated, 11);
  assert.equal(live?.finished_at, null);
});

test('a 2-minute-old row with a 120s-stale heartbeat still blocks', async () => {
  const start = Date.parse('2026-10-09T16:40:00.000Z');
  const clock = clockFrom(start);
  const harness = createHarness({
    companies: [company(1)],
    runs: [
      blankRun('young', 'running', new Date(start - 2 * 60 * 1000).toISOString(), {
        companies_processed: 4,
        companies_updated: 4,
        metadata: { last_heartbeat_at: new Date(start - 120_000).toISOString() },
      }),
    ],
  });

  const result = await runFmcsaRefresh(baseOptions({ limit: 1 }), {
    supabase: harness.supabase,
    now: clock.now,
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async () => {
      throw new Error('should not fetch');
    },
  });

  const live = harness.runs.find((row) => row.id === 'young');
  assert.equal(result.skipped, true);
  assert.equal(result.status, 'running');
  assert.equal(result.runId, 'young');
  assert.equal(harness.runs.length, 1);
  assert.equal(live?.status, 'running');
  assert.equal(live?.companies_processed, 4);
  assert.equal(live?.finished_at, null);
});

test('a 16-minute-old running row is abandoned', async () => {
  const start = Date.parse('2026-10-09T16:50:00.000Z');
  const clock = clockFrom(start);
  const harness = createHarness({
    companies: [company(1)],
    runs: [
      blankRun('old', 'running', new Date(start - 16 * 60 * 1000).toISOString(), {
        companies_processed: 8,
        companies_updated: 6,
        metadata: { last_heartbeat_at: new Date(start).toISOString() },
      }),
    ],
  });

  const result = await runFmcsaRefresh(baseOptions({ limit: 1 }), {
    supabase: harness.supabase,
    now: clock.now,
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async (input) => ({ snapshot: snapshot(input.usdot), lookupMethod: 'dot' }),
  });

  const abandoned = harness.runs.find((row) => row.id === 'old');
  assert.equal(result.skipped, undefined);
  assert.notEqual(result.runId, 'old');
  assert.equal(abandoned?.status, 'failed');
  assert.equal(abandoned?.companies_processed, 8);
  assert.equal(abandoned?.companies_updated, 6);
  assert.ok(abandoned?.finished_at);
  assert.equal((abandoned?.metadata as { exit_reason?: string } | null)?.exit_reason, 'abandoned_detected_by_guard');
});

test('multiple running rows are closed when abandoned and a live one still blocks', async () => {
  const start = Date.parse('2026-10-09T17:00:00.000Z');
  const clock = clockFrom(start);
  const abandonedOnly = createHarness({
    companies: [company(1)],
    runs: [
      blankRun('old-a', 'running', new Date(start - 30 * 60 * 1000).toISOString(), {
        companies_processed: 2,
        companies_updated: 1,
      }),
      blankRun('old-b', 'running', new Date(start - 40 * 60 * 1000).toISOString(), {
        companies_processed: 5,
        companies_updated: 5,
        metadata: { last_heartbeat_at: new Date(start - 30 * 60 * 1000).toISOString() },
      }),
    ],
  });

  const proceeded = await runFmcsaRefresh(baseOptions({ limit: 1 }), {
    supabase: abandonedOnly.supabase,
    now: clock.now,
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async (input) => ({ snapshot: snapshot(input.usdot), lookupMethod: 'dot' }),
  });

  assert.equal(proceeded.skipped, undefined);
  assert.equal(abandonedOnly.runs.find((row) => row.id === 'old-a')?.status, 'failed');
  assert.equal(abandonedOnly.runs.find((row) => row.id === 'old-b')?.status, 'failed');
  assert.equal(abandonedOnly.runs.find((row) => row.id === 'old-a')?.companies_processed, 2);
  assert.equal(abandonedOnly.runs.find((row) => row.id === 'old-b')?.companies_updated, 5);
  assert.ok(abandonedOnly.runs.some((row) => row.id === proceeded.runId && row.status !== 'running'));

  const mixed = createHarness({
    companies: [company(1)],
    runs: [
      blankRun('old', 'running', new Date(start - 30 * 60 * 1000).toISOString(), { companies_processed: 9 }),
      blankRun('live', 'running', new Date(start - 2_000).toISOString(), {
        companies_processed: 1,
        metadata: { last_heartbeat_at: new Date(start).toISOString() },
      }),
    ],
  });
  const blocked = await runFmcsaRefresh(baseOptions(), {
    supabase: mixed.supabase,
    now: clock.now,
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async () => {
      throw new Error('should not fetch');
    },
  });
  assert.equal(blocked.skipped, true);
  assert.equal(blocked.runId, 'live');
  assert.equal(mixed.runs.find((row) => row.id === 'old')?.status, 'failed');
  assert.equal(mixed.runs.find((row) => row.id === 'old')?.companies_processed, 9);
  assert.equal(mixed.runs.find((row) => row.id === 'live')?.status, 'running');
  assert.equal(mixed.runs.length, 2);
});

test('a guard query error fails closed', async () => {
  const harness = createHarness({ companies: [company(1)], guardError: true });
  const result = await runFmcsaRefresh(baseOptions(), {
    supabase: harness.supabase,
    now: () => Date.parse('2026-10-09T18:00:00.000Z'),
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async () => {
      throw new Error('should not fetch');
    },
  });

  assert.equal(result.skipped, true);
  assert.equal(result.status, 'failed');
  assert.match(result.skipReason ?? '', /failing closed/);
  assert.equal(harness.runs.length, 0);
});

test('a notify throw still leaves the run terminal', async () => {
  const harness = createHarness({ companies: [company(1)] });
  const result = await runFmcsaRefresh(baseOptions({ limit: 1 }), {
    supabase: harness.supabase,
    now: () => Date.parse('2026-10-09T19:00:00.000Z'),
    budget: quietBudget,
    revalidate() {
      throw new Error('revalidate down');
    },
    notify: async () => {
      throw new Error('notify down');
    },
    fetchCompany: async (input) => ({ snapshot: snapshot(input.usdot), lookupMethod: 'dot' }),
  });

  const row = harness.runs.find((candidate) => candidate.id === result.runId);
  assert.equal(result.status, 'completed');
  assert.equal(row?.status, 'completed');
  assert.ok(row?.finished_at);
  assert.notEqual(row?.status, 'running');
  assert.match(row?.error_summary ?? '', /notify_failed: notify down/);
});

test('full mode stops at the invocation cap and a later same-day run is not blocked', async () => {
  assert.equal(FMCSA_REFRESH_CONFIG.fullInvocationCap, 120);
  assert.equal(FMCSA_REFRESH_BUDGET.fullInvocationCap, FMCSA_REFRESH_CONFIG.fullInvocationCap);

  const start = Date.parse('2026-10-09T20:00:00.000Z');
  const clock = clockFrom(start);
  const harness = createHarness({
    companies: [1, 2, 3, 4, 5].map((index) =>
      company(index, `2020-01-0${index}T00:00:00.000Z`)
    ),
  });
  const firstFetched: string[] = [];
  const first = await runFmcsaRefresh(baseOptions({ mode: 'full' }), {
    supabase: harness.supabase,
    now: clock.now,
    budget: { ...quietBudget, fullInvocationCap: 2, runBudgetMs: 60_000 },
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async (input) => {
      firstFetched.push(input.usdot);
      return { snapshot: snapshot(input.usdot), lookupMethod: 'dot' };
    },
  });

  const firstRow = harness.runs.find((row) => row.id === first.runId);
  assert.equal(first.status, 'partial');
  assert.equal(first.companiesProcessed, 2);
  assert.equal((firstRow?.metadata as { exit_reason?: string } | null)?.exit_reason, 'invocation_cap_reached');
  assert.match(firstRow?.idempotency_key ?? '', /#partial-/);
  assert.equal(harness.selectLimits[0], 3);
  assert.deepEqual(firstFetched, ['1000001', '1000002']);

  const secondFetched: string[] = [];
  const second = await runFmcsaRefresh(baseOptions({ mode: 'full' }), {
    supabase: harness.supabase,
    now: clock.now,
    budget: { ...quietBudget, fullInvocationCap: 2, runBudgetMs: 60_000 },
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async (input) => {
      secondFetched.push(input.usdot);
      return { snapshot: snapshot(input.usdot), lookupMethod: 'dot' };
    },
  });

  assert.equal(second.skipped, undefined);
  assert.equal(second.status, 'partial');
  assert.deepEqual(secondFetched, ['1000003', '1000004']);
  assert.equal(secondFetched.filter((dot) => firstFetched.includes(dot)).length, 0);
});

test('canary limit is at most 10 and honors the step A pause', async () => {
  const route = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../../../app/api/refresh/fmcsa/route.ts'), 'utf8');
  const authAt = route.indexOf('verifyRefreshAuth(');
  const pauseAt = route.indexOf('fmcsaRefreshPause(');
  const runAt = route.indexOf('runFmcsaRefresh(');
  assert.ok(authAt >= 0 && pauseAt > authAt && runAt > pauseAt);
  assert.equal(fmcsaRefreshPause('incremental').paused, true);

  const tooBig = evaluateCanaryRequest({ canary: true, limit: 11, mode: 'incremental' });
  assert.equal(tooBig?.ok, false);
  if (tooBig && !tooBig.ok) assert.equal(tooBig.status, 400);
  const full = evaluateCanaryRequest({ canary: true, limit: 5, mode: 'full' });
  assert.equal(full?.ok, false);
  assert.equal(evaluateCanaryRequest({ canary: false, limit: 80, mode: 'incremental' }), null);

  const paused = evaluateCanaryRequest({ canary: true, limit: 5, mode: 'incremental' });
  assert.equal(paused?.ok, false);
  if (paused && !paused.ok) {
    assert.equal(paused.paused, true);
    assert.equal(paused.error, FMCSA_REFRESH_PAUSE_REASON);
  }

  const harness = createHarness({ companies: [company(1)] });
  const rejected = await runFmcsaRefresh(baseOptions({ canary: true, limit: 5 }), {
    supabase: harness.supabase,
    now: () => Date.parse('2026-10-09T21:00:00.000Z'),
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async () => {
      throw new Error('should not fetch');
    },
  });
  assert.equal(rejected.skipped, true);
  assert.equal(rejected.skipReason, FMCSA_REFRESH_PAUSE_REASON);
  assert.equal(harness.runs.length, 0);

  const malformed = await runFmcsaRefresh(baseOptions({ canary: true, limit: 11 }), {
    supabase: harness.supabase,
    now: () => Date.parse('2026-10-09T21:00:00.000Z'),
    budget: quietBudget,
    revalidate() {},
    notify: async () => ({ emailSent: false, smsSent: false }),
    fetchCompany: async () => {
      throw new Error('should not fetch');
    },
  });
  assert.equal(malformed.skipped, true);
  assert.match(malformed.skipReason ?? '', /1 to 10/);
  assert.equal(harness.runs.length, 0);
});

function blankRun(
  id: string,
  status: string,
  startedAt: string,
  patch?: Partial<RunRow>
): RunRow {
  return {
    id,
    idempotency_key: `key-${id}`,
    mode: 'incremental',
    status,
    triggered_by: 'cron',
    companies_total: 10,
    companies_processed: 0,
    companies_updated: 0,
    companies_failed: 0,
    changes_detected: 0,
    error_summary: null,
    started_at: startedAt,
    finished_at: null,
    metadata: null,
    ...patch,
  };
}
