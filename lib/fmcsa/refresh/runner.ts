import 'server-only';

import { revalidatePath } from 'next/cache';
import { computeReputationScore } from '@/data/seed-companies';
import { detectFieldChanges } from '@/lib/fmcsa/refresh/changes';
import { fetchFmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/fetch-carrier';
import { computeFmcsaDataHash } from '@/lib/fmcsa/refresh/hash';
import { sendRefreshSummaryAlert } from '@/lib/fmcsa/refresh/notify';
import { FMCSA_REFRESH_CONFIG } from '@/lib/fmcsa/refresh/rate-limit';
import type {
  CompanyRefreshRow,
  FieldChange,
  RefreshOptions,
  RefreshRunResult,
  RefreshRunStatus,
} from '@/lib/fmcsa/refresh/types';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

function idempotencyKey(mode: string): string {
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  // Incremental: one slot per hour (multiple batches/day). Full: once per day.
  if (mode === 'incremental') {
    const hour = now.getUTCHours().toString().padStart(2, '0');
    return `incremental-${day}-${hour}`;
  }
  return `full-${day}`;
}

function staleCutoffIso(): string {
  const ms = FMCSA_REFRESH_CONFIG.staleAfterHours * 60 * 60 * 1000;
  return new Date(Date.now() - ms).toISOString();
}

async function selectCompanies(
  mode: RefreshOptions['mode'],
  limit: number
): Promise<CompanyRefreshRow[]> {
  const supabase = createAdminClient();

  let query = supabase
    .from('companies')
    .select(
      'id, slug, name, usdot_number, mc_number, fmcsa_safety_rating, fmcsa_complaints, fmcsa_shipments, authority_active, out_of_service, complaints_last_12m, revocation_date, data_hash, fmcsa_last_checked, reputation_score, overall_rating, review_count, bbb_rating, bbb_accredited, is_verified, years_in_business'
    )
    .not('usdot_number', 'is', null)
    .neq('usdot_number', '')
    .order('fmcsa_last_checked', { ascending: true, nullsFirst: true });

  if (mode === 'incremental') {
    const cutoff = staleCutoffIso();
    query = query.or(`fmcsa_last_checked.is.null,fmcsa_last_checked.lt."${cutoff}"`);
  }

  if (limit > 0) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Company query failed: ${error.message}`);
  return (data ?? []) as CompanyRefreshRow[];
}

export async function runFmcsaRefresh(options: RefreshOptions): Promise<RefreshRunResult> {
  const started = Date.now();
  const errors: string[] = [];
  const idemKey = idempotencyKey(options.mode);

  if (!isSupabaseAdminConfigured()) {
    return {
      runId: '',
      mode: options.mode,
      status: 'failed',
      companiesTotal: 0,
      companiesProcessed: 0,
      companiesUpdated: 0,
      companiesFailed: 0,
      changesDetected: 0,
      errors: ['SUPABASE_SERVICE_ROLE_KEY not configured'],
      durationMs: Date.now() - started,
    };
  }

  if (!process.env.FMCSA_WEB_KEY?.trim()) {
    return {
      runId: '',
      mode: options.mode,
      status: 'failed',
      companiesTotal: 0,
      companiesProcessed: 0,
      companiesUpdated: 0,
      companiesFailed: 0,
      changesDetected: 0,
      errors: ['FMCSA_WEB_KEY not configured'],
      durationMs: Date.now() - started,
    };
  }

  const supabase = createAdminClient();

  if (!options.force) {
    const { data: running } = await supabase
      .from('fmcsa_refresh_runs')
      .select('id, status')
      .eq('status', 'running')
      .maybeSingle();

    if (running) {
      return {
        runId: running.id,
        mode: options.mode,
        status: 'running',
        companiesTotal: 0,
        companiesProcessed: 0,
        companiesUpdated: 0,
        companiesFailed: 0,
        changesDetected: 0,
        errors: [],
        durationMs: Date.now() - started,
        skipped: true,
        skipReason: 'Another refresh run is in progress',
      };
    }

    if (options.mode === 'full') {
      const { data: existingFull } = await supabase
        .from('fmcsa_refresh_runs')
        .select('id, status')
        .eq('idempotency_key', idemKey)
        .eq('status', 'completed')
        .maybeSingle();

      if (existingFull) {
        return {
          runId: existingFull.id,
          mode: options.mode,
          status: 'completed',
          companiesTotal: 0,
          companiesProcessed: 0,
          companiesUpdated: 0,
          companiesFailed: 0,
          changesDetected: 0,
          errors: [],
          durationMs: Date.now() - started,
          skipped: true,
          skipReason: `Full refresh already completed for ${idemKey}`,
        };
      }
    }
  }

  const limit =
    options.limit ??
    (options.mode === 'full'
      ? FMCSA_REFRESH_CONFIG.fullBatchSize || 10_000
      : FMCSA_REFRESH_CONFIG.incrementalBatchSize);

  const companies = await selectCompanies(options.mode, limit);

  const { data: runRow, error: runInsertError } = await supabase
    .from('fmcsa_refresh_runs')
    .insert({
      idempotency_key: idemKey,
      mode: options.mode,
      status: 'running',
      triggered_by: options.triggeredBy,
      companies_total: companies.length,
      metadata: { limit },
    })
    .select('id')
    .single();

  if (runInsertError || !runRow) {
    throw new Error(`Failed to create refresh run: ${runInsertError?.message}`);
  }

  const runId = runRow.id as string;
  let processed = 0;
  let updated = 0;
  let failed = 0;
  let changesDetected = 0;
  const alertCandidates: { companyName: string; slug: string; changes: FieldChange[] }[] = [];

  for (const company of companies) {
    processed++;
    const dot = company.usdot_number?.replace(/\D/g, '');
    if (!dot) {
      failed++;
      errors.push(`${company.slug}: missing USDOT`);
      continue;
    }

    const snapshot = await fetchFmcsaCarrierSnapshot(dot, company.mc_number);
    if (!snapshot) {
      failed++;
      errors.push(`${company.slug}: FMCSA lookup failed for DOT ${dot}`);
      continue;
    }

    const dataHash = computeFmcsaDataHash(snapshot);
    const fieldChanges = detectFieldChanges(company, snapshot, dataHash);
    const hashChanged = company.data_hash !== dataHash;

    if (!hashChanged && company.fmcsa_last_checked) {
      await supabase
        .from('companies')
        .update({ fmcsa_last_checked: new Date().toISOString() })
        .eq('id', company.id);
      continue;
    }

    const reputationScore = computeReputationScore({
      overallRating: company.overall_rating ?? 0,
      reviewCount: company.review_count,
      fmcsaComplaints: snapshot.complaintsLast12m,
      fmcsaShipments: snapshot.shipments,
      bbbRating: (company.bbb_rating as any) ?? 'NR',
      bbbAccredited: company.bbb_accredited,
      isVerified: company.is_verified,
      yearsInBusiness: company.years_in_business ?? 0,
    });

    const { error: updateError } = await supabase
      .from('companies')
      .update({
        fmcsa_safety_rating: snapshot.safetyRating,
        fmcsa_complaints: snapshot.complaintsLast12m,
        fmcsa_shipments: snapshot.shipments,
        complaints_last_12m: snapshot.complaintsLast12m,
        authority_active: snapshot.authorityActive,
        out_of_service: snapshot.outOfService,
        revocation_date: snapshot.revocationDate,
        data_hash: dataHash,
        fmcsa_last_checked: new Date().toISOString(),
        fmcsa_legal_name: snapshot.legalName ?? null,
        fmcsa_raw: snapshot.raw,
        reputation_score: reputationScore,
        last_updated: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', company.id);

    if (updateError) {
      failed++;
      errors.push(`${company.slug}: DB update failed — ${updateError.message}`);
      continue;
    }

    updated++;
    changesDetected += fieldChanges.length;

    if (fieldChanges.length) {
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
  }

  const status: RefreshRunStatus =
    failed === 0 ? 'completed' : processed === failed ? 'failed' : 'partial';

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
    durationMs: Date.now() - started,
  };

  await supabase
    .from('fmcsa_refresh_runs')
    .update({
      status,
      companies_processed: processed,
      companies_updated: updated,
      companies_failed: failed,
      changes_detected: changesDetected,
      error_summary: errors.slice(0, 20).join('\n') || null,
      finished_at: new Date().toISOString(),
    })
    .eq('id', runId);

  await sendRefreshSummaryAlert(result, alertCandidates);

  revalidatePath('/companies');
  revalidatePath('/admin/fmcsa');

  return result;
}

export async function getFmcsaRefreshStats() {
  if (!isSupabaseAdminConfigured()) {
    return { runs: [], changes: [], companyStats: null };
  }

  const supabase = createAdminClient();

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
        .or(`fmcsa_last_checked.is.null,fmcsa_last_checked.lt."${staleCutoffIso()}"`),
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