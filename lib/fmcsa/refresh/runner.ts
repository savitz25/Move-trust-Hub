import 'server-only';

import { revalidatePath } from 'next/cache';
import { computeReputationScore } from '@/data/seed-companies';
import { extractContactFromFmcsaRaw } from '@/lib/fmcsa/company-from-row';
import { extractDisplayFieldsFromSnapshot } from '@/lib/fmcsa/refresh/batch-fields';
import {
  FMCSA_REFRESH_BUDGET,
  createFetchTimeout,
  isFetchAbortError,
  isRunningRowAbandoned,
  releaseIdempotencyKey,
  type FmcsaRefreshBudgetConfig,
} from '@/lib/fmcsa/refresh/budget';
import { mergeServicesWithEntityType } from '@/lib/fmcsa/derive-directory-services';
import { detectFieldChanges } from '@/lib/fmcsa/refresh/changes';
import { fetchFmcsaCarrierForCompany } from '@/lib/fmcsa/refresh/fetch-carrier';
import type { FmcsaCompanyFetchResult } from '@/lib/fmcsa/refresh/fetch-company';
import { computeFmcsaDataHash } from '@/lib/fmcsa/refresh/hash';
import { sendRefreshSummaryAlert } from '@/lib/fmcsa/refresh/notify';
import { fmcsaRefreshPause } from '@/lib/fmcsa/refresh/pause';
import { FMCSA_REFRESH_CONFIG } from '@/lib/fmcsa/refresh/rate-limit';
import type {
  CompanyRefreshRow,
  FieldChange,
  RefreshOptions,
  RefreshRunResult,
  RefreshRunStatus,
} from '@/lib/fmcsa/refresh/types';
import { FMCSA_CANARY_MAX_LIMIT } from '@/lib/fmcsa/refresh/canary';
import { resolvePublicCompanyNameFromSources } from '@/lib/companies/public-display-name';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

/** Query builder surface used by the refresh runner. Tests pass an in-memory fake. */
export type FmcsaRefreshDb = {
  from: (table: string) => FmcsaRefreshQuery;
};

export type FmcsaRefreshQuery = {
  select: (columns?: string) => FmcsaRefreshQuery;
  insert: (row: Record<string, unknown> | Record<string, unknown>[]) => FmcsaRefreshQuery;
  update: (row: Record<string, unknown>) => FmcsaRefreshQuery;
  eq: (column: string, value: unknown) => FmcsaRefreshQuery;
  neq: (column: string, value: unknown) => FmcsaRefreshQuery;
  not: (column: string, operator: string, value: unknown) => FmcsaRefreshQuery;
  or: (filters: string) => FmcsaRefreshQuery;
  order: (
    column: string,
    options?: { ascending?: boolean; nullsFirst?: boolean }
  ) => FmcsaRefreshQuery;
  limit: (count: number) => FmcsaRefreshQuery;
  maybeSingle: () => Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }>;
  single: () => Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }>;
  then: PromiseLike<{ data: unknown; error: { message: string } | null }>['then'];
};

export type FmcsaRefreshDeps = {
  supabase?: FmcsaRefreshDb;
  fetchCompany?: (input: {
    usdot: string;
    mcNumber?: string | null;
    companyName?: string | null;
    headquarters?: string | null;
    fmcsaLastChecked?: string | null;
    fmcsaRaw?: Record<string, unknown> | null;
    signal?: AbortSignal;
  }) => Promise<FmcsaCompanyFetchResult>;
  notify?: typeof sendRefreshSummaryAlert;
  revalidate?: (path: string) => void;
  now?: () => number;
  budget?: Partial<FmcsaRefreshBudgetConfig>;
};

type RunMetadata = {
  limit?: number;
  canary?: boolean;
  run_budget_ms?: number;
  deadline_at?: string;
  last_heartbeat_at?: string;
  exit_reason?: string | null;
  checkpoint_processed?: number;
  full_invocation_cap?: number;
  limit_clamped_from?: number;
  has_more_beyond_cap?: boolean;
  notify_error?: string;
};

type RunningRow = {
  id: string;
  status: string;
  started_at: string | null;
  idempotency_key: string;
  companies_processed?: number | null;
  companies_updated?: number | null;
  companies_failed?: number | null;
  error_summary?: string | null;
  metadata?: RunMetadata | null;
};

function idempotencyKey(mode: string, nowMs: number): string {
  const now = new Date(nowMs);
  const day = now.toISOString().slice(0, 10);
  // Incremental: one slot per hour (multiple batches/day). Full: once per day.
  if (mode === 'incremental') {
    const hour = now.getUTCHours().toString().padStart(2, '0');
    return `incremental-${day}-${hour}`;
  }
  return `full-${day}`;
}

function staleCutoffIso(nowMs: number, staleAfterHours: number): string {
  const ms = staleAfterHours * 60 * 60 * 1000;
  return new Date(nowMs - ms).toISOString();
}

function emptyResult(
  options: RefreshOptions,
  started: number,
  now: () => number,
  patch: Partial<RefreshRunResult> & Pick<RefreshRunResult, 'status'>
): RefreshRunResult {
  return {
    runId: '',
    mode: options.mode,
    companiesTotal: 0,
    companiesProcessed: 0,
    companiesUpdated: 0,
    companiesFailed: 0,
    changesDetected: 0,
    errors: [],
    durationMs: now() - started,
    ...patch,
  };
}

function asMetadata(value: unknown): RunMetadata {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as RunMetadata;
}

function resolveBudget(options: RefreshOptions, deps?: FmcsaRefreshDeps): FmcsaRefreshBudgetConfig {
  return {
    ...FMCSA_REFRESH_BUDGET,
    ...deps?.budget,
    ...(options.runBudgetMs != null ? { runBudgetMs: options.runBudgetMs } : {}),
  };
}

function selectionLimit(
  options: RefreshOptions,
  budget: FmcsaRefreshBudgetConfig
): { limit: number; clampedFrom?: number } {
  if (options.canary) {
    return { limit: options.limit ?? 0 };
  }
  if (options.mode === 'full') {
    const requested =
      options.limit != null && options.limit > 0
        ? options.limit
        : FMCSA_REFRESH_CONFIG.fullBatchSize > 0
          ? FMCSA_REFRESH_CONFIG.fullBatchSize
          : 10_000;
    if (requested > budget.fullInvocationCap) {
      return { limit: budget.fullInvocationCap, clampedFrom: requested };
    }
    return { limit: requested };
  }
  if (options.limit != null && options.limit > 0) return { limit: options.limit };
  return { limit: FMCSA_REFRESH_CONFIG.incrementalBatchSize };
}

async function selectCompanies(
  supabase: FmcsaRefreshDb,
  mode: RefreshOptions['mode'],
  limit: number,
  nowMs: number
): Promise<CompanyRefreshRow[]> {
  let query = supabase
    .from('companies')
    .select(
      'id, slug, name, headquarters, usdot_number, mc_number, fmcsa_safety_rating, fmcsa_complaints, fmcsa_shipments, authority_active, out_of_service, complaints_last_12m, revocation_date, data_hash, fmcsa_last_checked, fmcsa_raw, services, reputation_score, overall_rating, review_count, bbb_rating, bbb_accredited, is_verified, years_in_business'
    )
    .not('usdot_number', 'is', null)
    .neq('usdot_number', '')
    .order('fmcsa_last_checked', { ascending: true, nullsFirst: true });

  if (mode === 'incremental') {
    const cutoff = staleCutoffIso(nowMs, FMCSA_REFRESH_CONFIG.staleAfterHours);
    query = query.or(`fmcsa_last_checked.is.null,fmcsa_last_checked.lt."${cutoff}"`);
  }

  if (limit > 0) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Company query failed: ${error.message}`);
  return (data ?? []) as CompanyRefreshRow[];
}

function resolveLoopStatus(input: {
  outcome: 'ok' | 'budget' | 'cap' | 'exception';
  processed: number;
  failed: number;
}): RefreshRunStatus {
  if (input.outcome === 'budget' || input.outcome === 'cap') return 'partial';
  if (input.outcome === 'exception') return input.processed > 0 ? 'partial' : 'failed';
  if (input.failed === 0) return 'completed';
  if (input.processed > 0 && input.processed === input.failed) return 'failed';
  return 'partial';
}

function exitReasonFor(outcome: 'ok' | 'budget' | 'cap' | 'exception', status: RefreshRunStatus): string | null {
  if (outcome === 'budget') return 'time_budget_exhausted';
  if (outcome === 'cap') return 'invocation_cap_reached';
  if (outcome === 'exception') return 'loop_exception';
  if (status === 'failed') return 'companies_failed';
  if (status === 'partial') return 'companies_partial';
  return null;
}

export async function runFmcsaRefresh(
  options: RefreshOptions,
  deps?: FmcsaRefreshDeps
): Promise<RefreshRunResult> {
  const now = deps?.now ?? Date.now;
  const started = now();
  const budget = resolveBudget(options, deps);
  const usingInjectedDb = Boolean(deps?.supabase);

  if (!usingInjectedDb && !isSupabaseAdminConfigured()) {
    return emptyResult(options, started, now, {
      status: 'failed',
      errors: ['SUPABASE_SERVICE_ROLE_KEY not configured'],
    });
  }

  if (!deps?.fetchCompany && !process.env.FMCSA_WEB_KEY?.trim()) {
    return emptyResult(options, started, now, {
      status: 'failed',
      errors: ['FMCSA_WEB_KEY not configured'],
    });
  }

  if (options.canary) {
    const limit = options.limit;
    if (
      options.mode !== 'incremental' ||
      limit == null ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > FMCSA_CANARY_MAX_LIMIT
    ) {
      const reason = `Canary requires incremental mode and an integer limit from 1 to ${FMCSA_CANARY_MAX_LIMIT}.`;
      return emptyResult(options, started, now, {
        status: 'failed',
        skipped: true,
        skipReason: reason,
        errors: [reason],
      });
    }
    const pause = fmcsaRefreshPause('incremental');
    if (pause.paused) {
      return emptyResult(options, started, now, {
        status: 'failed',
        skipped: true,
        skipReason: pause.reason,
        errors: [pause.reason],
      });
    }
  }

  const supabase = deps?.supabase ?? (createAdminClient() as unknown as FmcsaRefreshDb);
  const fetchCompany = deps?.fetchCompany ?? fetchFmcsaCarrierForCompany;
  const notify = deps?.notify ?? sendRefreshSummaryAlert;
  const revalidate = deps?.revalidate ?? revalidatePath;
  const idemKey = idempotencyKey(options.mode, started);

  const guard = await loadRunningRows(supabase);
  if (guard.error) {
    const reason = `Refresh guard query failed; failing closed (${guard.error})`;
    return emptyResult(options, started, now, {
      status: 'failed',
      skipped: true,
      skipReason: reason,
      errors: [reason],
    });
  }

  const abandoned: RunningRow[] = [];
  const active: RunningRow[] = [];
  for (const row of guard.rows) {
    if (isRunningRowAbandoned(row, now(), budget)) abandoned.push(row);
    else active.push(row);
  }

  for (const row of abandoned) {
    const closed = await finalizeAbandonedRun(supabase, row, now());
    if (!closed.ok) {
      const reason = `Abandoned run ${row.id} could not be closed (${closed.error})`;
      return emptyResult(options, started, now, {
        runId: row.id,
        status: 'failed',
        skipped: true,
        skipReason: reason,
        errors: [reason],
      });
    }
  }

  // force does not overlap a live run. A non-abandoned running row always blocks.
  if (active.length > 0) {
    return emptyResult(options, started, now, {
      runId: active[0].id,
      status: 'running',
      skipped: true,
      skipReason: 'Another refresh run is in progress',
    });
  }

  if (!options.force && options.mode === 'full') {
    const { data: existingFull, error: fullError } = await supabase
      .from('fmcsa_refresh_runs')
      .select('id, status')
      .eq('idempotency_key', idemKey)
      .eq('status', 'completed')
      .maybeSingle();

    if (fullError) {
      const reason = `Refresh guard query failed; failing closed (${fullError.message})`;
      return emptyResult(options, started, now, {
        status: 'failed',
        skipped: true,
        skipReason: reason,
        errors: [reason],
      });
    }

    if (existingFull) {
      return emptyResult(options, started, now, {
        runId: String(existingFull.id),
        status: 'completed',
        skipped: true,
        skipReason: `Full refresh already completed for ${idemKey}`,
      });
    }
  }

  const released = await releaseBlockingIdempotencyKey(supabase, idemKey);
  if (released.error) {
    const reason = `Refresh guard query failed; failing closed (${released.error})`;
    return emptyResult(options, started, now, {
      status: 'failed',
      skipped: true,
      skipReason: reason,
      errors: [reason],
    });
  }

  if (released.taken && !released.terminal) {
    return emptyResult(options, started, now, {
      status: 'running',
      skipped: true,
      skipReason: 'Another refresh run is in progress',
    });
  }

  const insertKey =
    released.taken && released.terminal && options.force
      ? releaseIdempotencyKey(idemKey, `force-${started}`)
      : idemKey;

  const { limit, clampedFrom } = selectionLimit(options, budget);
  const probeLimit = options.mode === 'full' ? limit + 1 : limit;
  const selected = await selectCompanies(supabase, options.mode, probeLimit, now());
  const hasMoreBeyondCap = options.mode === 'full' && selected.length > limit;
  const companies = hasMoreBeyondCap ? selected.slice(0, limit) : selected;

  const metadata: RunMetadata = {
    limit,
    run_budget_ms: budget.runBudgetMs,
    deadline_at: new Date(started + budget.runBudgetMs).toISOString(),
    last_heartbeat_at: new Date(started).toISOString(),
    ...(options.canary ? { canary: true } : {}),
    ...(clampedFrom != null ? { limit_clamped_from: clampedFrom, full_invocation_cap: budget.fullInvocationCap } : {}),
    ...(hasMoreBeyondCap ? { has_more_beyond_cap: true } : {}),
  };

  const { data: runRow, error: runInsertError } = await supabase
    .from('fmcsa_refresh_runs')
    .insert({
      idempotency_key: insertKey,
      mode: options.mode,
      status: 'running',
      triggered_by: options.triggeredBy,
      companies_total: companies.length,
      companies_processed: 0,
      companies_updated: 0,
      companies_failed: 0,
      changes_detected: 0,
      started_at: new Date(started).toISOString(),
      metadata,
    })
    .select('id')
    .single();

  if (runInsertError || !runRow) {
    throw new Error(`Failed to create refresh run: ${runInsertError?.message}`);
  }

  const runId = String(runRow.id);
  const deadline = started + budget.runBudgetMs;
  const killAt = started + budget.maxDurationMs;
  const errors: string[] = [];
  let processed = 0;
  let updated = 0;
  let failed = 0;
  let changesDetected = 0;
  let outcome: 'ok' | 'budget' | 'cap' | 'exception' = 'ok';
  let thrown: unknown = null;
  let lastCheckpointAt = started;
  let lastCheckpointProcessed = 0;
  const alertCandidates: { companyName: string; slug: string; changes: FieldChange[] }[] = [];
  let status: RefreshRunStatus = 'failed';
  let exitReason: string | null = null;

  const pastDeadline = () => now() >= deadline;
  const insideFinalizeReserve = () => killAt - now() <= budget.finalizeReserveMs;

  async function bumpLastChecked(companyId: string): Promise<void> {
    await supabase
      .from('companies')
      .update({ fmcsa_last_checked: new Date(now()).toISOString() })
      .eq('id', companyId);
  }

  async function checkpoint(force: boolean): Promise<void> {
    if (pastDeadline()) return;
    const due =
      force ||
      processed - lastCheckpointProcessed >= budget.checkpointEveryCompanies ||
      now() - lastCheckpointAt >= budget.checkpointIntervalMs;
    if (!due) return;
    metadata.last_heartbeat_at = new Date(now()).toISOString();
    metadata.checkpoint_processed = processed;
    await supabase
      .from('fmcsa_refresh_runs')
      .update({
        companies_processed: processed,
        companies_updated: updated,
        companies_failed: failed,
        changes_detected: changesDetected,
        metadata,
      })
      .eq('id', runId);
    lastCheckpointAt = now();
    lastCheckpointProcessed = processed;
  }

  try {
    await checkpoint(true);

    for (const company of companies) {
      if (pastDeadline() || insideFinalizeReserve()) {
        outcome = 'budget';
        break;
      }

      try {
        const dot = company.usdot_number?.replace(/\D/g, '');
        if (!dot) {
          processed++;
          failed++;
          errors.push(`${company.slug}: missing USDOT`);
          await bumpLastChecked(company.id);
          await checkpoint(false);
          continue;
        }

        const timeoutMs = killAt - now() - budget.finalizeReserveMs;
        const fetchTimeout = createFetchTimeout(timeoutMs);
        const fetchPromise = fetchCompany({
          usdot: dot,
          mcNumber: company.mc_number,
          companyName: company.name,
          headquarters: company.headquarters,
          fmcsaLastChecked: company.fmcsa_last_checked,
          fmcsaRaw: company.fmcsa_raw ?? null,
          signal: fetchTimeout.signal,
        });
        void fetchPromise.catch(() => undefined);
        let fetchResult: FmcsaCompanyFetchResult;
        try {
          fetchResult = await Promise.race([
            fetchPromise,
            new Promise<never>((_, reject) => {
              if (fetchTimeout.signal.aborted) {
                reject(fetchTimeout.signal.reason);
                return;
              }
              fetchTimeout.signal.addEventListener(
                'abort',
                () => reject(fetchTimeout.signal.reason),
                { once: true }
              );
            }),
          ]);
        } catch (error) {
          if (isFetchAbortError(error) || fetchTimeout.signal.aborted) {
            processed++;
            failed++;
            errors.push(`${company.slug}: FMCSA fetch aborted before the platform deadline`);
            await bumpLastChecked(company.id);
            outcome = 'budget';
            break;
          }
          throw error;
        } finally {
          fetchTimeout.cancel();
        }

        if (fetchTimeout.signal.aborted) {
          processed++;
          failed++;
          errors.push(`${company.slug}: FMCSA fetch aborted before the platform deadline`);
          await bumpLastChecked(company.id);
          outcome = 'budget';
          break;
        }

        if (pastDeadline()) {
          outcome = 'budget';
          break;
        }

        if (fetchResult.lookupMethod === 'skipped_existing') {
          processed++;
          await checkpoint(false);
          continue;
        }

        const snapshot = fetchResult.snapshot;
        if (!snapshot) {
          processed++;
          failed++;
          const suffix = fetchResult.nameMatch
            ? ` (name search: no confident match; best query "${fetchResult.nameMatch.query}")`
            : '';
          errors.push(
            `${company.slug}: ${fetchResult.error ?? `FMCSA lookup failed for DOT ${dot}`}${suffix}`
          );
          await bumpLastChecked(company.id);
          await checkpoint(false);
          continue;
        }

        if (fetchResult.lookupMethod === 'name_search' && fetchResult.nameMatch) {
          console.log('[fmcsa-refresh] recovered via name search', {
            slug: company.slug,
            matchedDot: fetchResult.nameMatch.matchedDot,
            matchedLegalName: fetchResult.nameMatch.matchedLegalName,
            confidence: fetchResult.nameMatch.confidence,
          });
        }

        const dataHash = computeFmcsaDataHash(snapshot);
        const fieldChanges = detectFieldChanges(company, snapshot, dataHash);
        const hashChanged = company.data_hash !== dataHash;

        if (!hashChanged && company.fmcsa_last_checked) {
          if (pastDeadline()) {
            outcome = 'budget';
            break;
          }
          await supabase
            .from('companies')
            .update({ fmcsa_last_checked: new Date(now()).toISOString() })
            .eq('id', company.id);
          processed++;
          await checkpoint(false);
          continue;
        }

        const display = extractDisplayFieldsFromSnapshot(snapshot);
        const existingServices = (company.services ?? []) as import('@/types').ServiceType[];
        const services = mergeServicesWithEntityType(existingServices, display.entityType);

        const reputationScore = computeReputationScore({
          overallRating: company.overall_rating ?? 0,
          reviewCount: company.review_count,
          fmcsaComplaints: snapshot.complaintsLast12m,
          fmcsaShipments: snapshot.shipments,
          bbbRating: (company.bbb_rating as 'NR') ?? 'NR',
          bbbAccredited: company.bbb_accredited,
          isVerified: company.is_verified,
          yearsInBusiness: company.years_in_business ?? 0,
        });

        const contact = extractContactFromFmcsaRaw(snapshot.raw);
        const updateRow: Record<string, unknown> = {
          fmcsa_safety_rating: snapshot.safetyRating,
          fmcsa_complaints: snapshot.complaintsLast12m,
          fmcsa_shipments: snapshot.shipments,
          complaints_last_12m: snapshot.complaintsLast12m,
          authority_active: snapshot.authorityActive,
          out_of_service: snapshot.outOfService,
          revocation_date: snapshot.revocationDate,
          data_hash: dataHash,
          fmcsa_last_checked: new Date(now()).toISOString(),
          fmcsa_legal_name: snapshot.legalName ?? null,
          fmcsa_raw: snapshot.raw,
          services,
          reputation_score: reputationScore,
          last_updated: new Date(now()).toISOString(),
          updated_at: new Date(now()).toISOString(),
        };
        const publicNames = resolvePublicCompanyNameFromSources({
          storedName: company.name,
          legalName: snapshot.legalName,
          dbaName: snapshot.dbaName,
          fmcsaRaw: snapshot.raw,
        });
        if (publicNames.shouldUpdateStoredName && publicNames.publicName) {
          updateRow.name = publicNames.publicName;
        }
        if (contact.physicalAddress) {
          updateRow.physical_address = contact.physicalAddress;
          if (!company.headquarters?.trim()) {
            updateRow.headquarters = contact.physicalAddress;
          }
        }
        if (contact.phone) updateRow.phone = contact.phone;

        if (pastDeadline()) {
          outcome = 'budget';
          break;
        }

        const { error: updateError } = await supabase
          .from('companies')
          .update(updateRow)
          .eq('id', company.id);

        if (updateError) {
          processed++;
          failed++;
          errors.push(`${company.slug}: DB update failed — ${updateError.message}`);
          await bumpLastChecked(company.id);
          await checkpoint(false);
          continue;
        }

        processed++;
        updated++;
        changesDetected += fieldChanges.length;

        if (fieldChanges.length) {
          if (pastDeadline()) {
            outcome = 'budget';
            break;
          }
          const logRows = fieldChanges.map((change) => ({
            run_id: runId,
            company_id: company.id,
            company_slug: company.slug,
            company_name: company.name,
            field_name: change.field,
            old_value: change.oldValue,
            new_value: change.newValue,
            severity: change.severity,
          }));

          await supabase.from('fmcsa_change_log').insert(logRows);

          const critical = fieldChanges.filter((c) => c.severity !== 'info');
          if (critical.length) {
            alertCandidates.push({
              companyName: company.name,
              slug: company.slug,
              changes: critical,
            });
          }
        }

        await checkpoint(false);
      } catch (error) {
        thrown = error;
        outcome = 'exception';
        const message = error instanceof Error ? error.message : String(error);
        errors.push(message);
        break;
      }
    }

    if (outcome === 'ok' && hasMoreBeyondCap) {
      outcome = 'cap';
    }
  } catch (error) {
    thrown = error;
    outcome = 'exception';
    const message = error instanceof Error ? error.message : String(error);
    if (!errors.includes(message)) errors.push(message);
  } finally {
    status = resolveLoopStatus({ outcome, processed, failed });
    exitReason = exitReasonFor(outcome, status);
    metadata.exit_reason = exitReason;
    metadata.last_heartbeat_at = new Date(now()).toISOString();
    const summaryParts = [
      errors.slice(0, 20).join('\n'),
      thrown instanceof Error ? thrown.message : thrown ? String(thrown) : '',
      exitReason ?? '',
    ].filter((part, index, all) => part && all.indexOf(part) === index);
    const errorSummary = summaryParts.join('\n') || null;
    const terminalRow = {
      status,
      companies_processed: processed,
      companies_updated: updated,
      companies_failed: failed,
      changes_detected: changesDetected,
      error_summary: errorSummary,
      finished_at: new Date(now()).toISOString(),
      metadata,
      ...(status === 'completed'
        ? {}
        : { idempotency_key: releaseIdempotencyKey(idemKey, `${status}-${runId}`) }),
    };

    let terminalError: string | null = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const { error } = await supabase.from('fmcsa_refresh_runs').update(terminalRow).eq('id', runId);
        if (error) throw new Error(error.message);
        terminalError = null;
        break;
      } catch (finalizeError) {
        terminalError = finalizeError instanceof Error ? finalizeError.message : String(finalizeError);
        if (attempt === 1) {
          console.error('[fmcsa-refresh] failed to write terminal run status', finalizeError);
        }
      }
    }
    if (terminalError) {
      status = 'failed';
      const message = `terminal write failed: ${terminalError}`;
      if (!errors.includes(message)) errors.push(message);
    }
  }

  const result: RefreshRunResult = {
    runId,
    mode: options.mode,
    status,
    companiesTotal: companies.length,
    companiesProcessed: processed,
    companiesUpdated: updated,
    companiesFailed: failed,
    changesDetected,
    errors,
    durationMs: now() - started,
  };

  try {
    await notify(result, alertCandidates);
  } catch (notifyError) {
    const message = notifyError instanceof Error ? notifyError.message : String(notifyError);
    metadata.notify_error = message;
    try {
      await supabase
        .from('fmcsa_refresh_runs')
        .update({
          error_summary: [errors.slice(0, 20).join('\n'), exitReason, `notify_failed: ${message}`]
            .filter(Boolean)
            .join('\n'),
          metadata,
        })
        .eq('id', runId);
    } catch (updateError) {
      console.error('[fmcsa-refresh] failed to record notify error', updateError);
    }
  }

  try {
    revalidate('/companies');
    revalidate('/admin/fmcsa');
  } catch (revalidateError) {
    console.error('[fmcsa-refresh] revalidate failed after terminal run', revalidateError);
  }

  return result;
}

async function loadRunningRows(
  supabase: FmcsaRefreshDb
): Promise<{ rows: RunningRow[]; error: string | null }> {
  const { data, error } = await supabase
    .from('fmcsa_refresh_runs')
    .select(
      'id, status, started_at, idempotency_key, companies_processed, companies_updated, companies_failed, error_summary, metadata'
    )
    .eq('status', 'running');

  if (error) return { rows: [], error: error.message };
  const rows = Array.isArray(data) ? (data as RunningRow[]) : [];
  return { rows, error: null };
}

async function finalizeAbandonedRun(
  supabase: FmcsaRefreshDb,
  row: RunningRow,
  nowMs: number
): Promise<{ ok: true } | { ok: false; error: string }> {
  const metadata = {
    ...asMetadata(row.metadata),
    exit_reason: 'abandoned_detected_by_guard',
  };
  const summary = row.error_summary
    ? `${row.error_summary}\nabandoned_detected_by_guard`
    : 'abandoned_detected_by_guard';
  try {
    const { error } = await supabase
      .from('fmcsa_refresh_runs')
      .update({
        status: 'failed',
        finished_at: new Date(nowMs).toISOString(),
        error_summary: summary,
        metadata,
        idempotency_key: releaseIdempotencyKey(row.idempotency_key, `abandoned-${row.id}`),
      })
      .eq('id', row.id);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

async function releaseBlockingIdempotencyKey(
  supabase: FmcsaRefreshDb,
  idemKey: string
): Promise<{ error: string | null; taken: boolean; terminal: boolean }> {
  const { data, error } = await supabase
    .from('fmcsa_refresh_runs')
    .select('id, status, idempotency_key')
    .eq('idempotency_key', idemKey)
    .maybeSingle();

  if (error) return { error: error.message, taken: false, terminal: false };
  if (!data) return { error: null, taken: false, terminal: false };
  const status = String(data.status ?? '');
  if (status === 'running') return { error: null, taken: true, terminal: false };
  if (status === 'completed') return { error: null, taken: true, terminal: true };
  await supabase
    .from('fmcsa_refresh_runs')
    .update({
      idempotency_key: releaseIdempotencyKey(String(data.idempotency_key), `released-${String(data.id)}`),
    })
    .eq('id', String(data.id));
  return { error: null, taken: false, terminal: true };
}

export async function getFmcsaRefreshStats() {
  if (!isSupabaseAdminConfigured()) {
    return { runs: [], changes: [], companyStats: null };
  }

  const supabase = createAdminClient();
  const cutoff = staleCutoffIso(Date.now(), FMCSA_REFRESH_CONFIG.staleAfterHours);

  const [{ data: runs }, { data: changes }, { count: withDot }, { count: stale }] =
    await Promise.all([
      supabase
        .from('fmcsa_refresh_runs')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(10),
      supabase
        .from('fmcsa_change_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50),
      supabase
        .from('companies')
        .select('id', { count: 'exact', head: true })
        .not('usdot_number', 'is', null)
        .neq('usdot_number', ''),
      supabase
        .from('companies')
        .select('id', { count: 'exact', head: true })
        .not('usdot_number', 'is', null)
        .or(`fmcsa_last_checked.is.null,fmcsa_last_checked.lt."${cutoff}"`),
    ]);

  return {
    runs: runs ?? [],
    changes: changes ?? [],
    companyStats: {
      withUsdot: withDot ?? 0,
      stale: stale ?? 0,
    },
  };
}
