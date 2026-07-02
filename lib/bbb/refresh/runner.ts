import 'server-only';

import { revalidatePath } from 'next/cache';
import { computeReputationScore } from '@/data/seed-companies';
import { detectFieldChanges } from '@/lib/bbb/refresh/changes';
import { fetchBbbBusinessSnapshot } from '@/lib/bbb/refresh/fetch-business';
import { computeBbbDataHash } from '@/lib/bbb/refresh/hash';
import { sendRefreshSummaryAlert } from '@/lib/bbb/refresh/notify';
import { BBB_REFRESH_CONFIG } from '@/lib/bbb/refresh/rate-limit';
import type {
  CompanyRefreshRow,
  FieldChange,
  RefreshOptions,
  RefreshRunResult,
  RefreshRunStatus,
} from '@/lib/bbb/refresh/types';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

function idempotencyKey(mode: string): string {
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  if (mode === 'incremental') {
    const hour = now.getUTCHours().toString().padStart(2, '0');
    return `incremental-${day}-${hour}`;
  }
  return `full-${day}`;
}

function staleCutoffIso(): string {
  const ms = BBB_REFRESH_CONFIG.staleAfterHours * 60 * 60 * 1000;
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
      'id, slug, name, headquarters, website, bbb_rating, bbb_accredited, complaints_last_36m, bbb_customer_reviews, bbb_alert_count, bbb_data_hash, bbb_business_id, bbb_last_checked, reputation_score, overall_rating, review_count, fmcsa_complaints, fmcsa_shipments, is_verified, years_in_business'
    )
    .order('bbb_last_checked', { ascending: true, nullsFirst: true });

  if (mode === 'incremental') {
    const cutoff = staleCutoffIso();
    query = query.or(`bbb_last_checked.is.null,bbb_last_checked.lt."${cutoff}"`);
  }

  if (limit > 0) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Company query failed: ${error.message}`);
  return (data ?? []) as CompanyRefreshRow[];
}

export async function runBbbRefresh(options: RefreshOptions): Promise<RefreshRunResult> {
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

  if (!process.env.BBB_API_KEY?.trim()) {
    return {
      runId: '',
      mode: options.mode,
      status: 'failed',
      companiesTotal: 0,
      companiesProcessed: 0,
      companiesUpdated: 0,
      companiesFailed: 0,
      changesDetected: 0,
      errors: ['BBB_API_KEY not configured'],
      durationMs: Date.now() - started,
    };
  }

  const supabase = createAdminClient();

  if (!options.force) {
    const { data: running } = await supabase
      .from('bbb_refresh_runs')
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
        skipReason: 'Another BBB refresh run is in progress',
      };
    }

    if (options.mode === 'full') {
      const { data: existingFull } = await supabase
        .from('bbb_refresh_runs')
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
          skipReason: `Full BBB refresh already completed for ${idemKey}`,
        };
      }
    }
  }

  const limit =
    options.limit ??
    (options.mode === 'full'
      ? BBB_REFRESH_CONFIG.fullBatchSize || 10_000
      : BBB_REFRESH_CONFIG.incrementalBatchSize);

  const companies = await selectCompanies(options.mode, limit);

  const { data: runRow, error: runInsertError } = await supabase
    .from('bbb_refresh_runs')
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
    throw new Error(`Failed to create BBB refresh run: ${runInsertError?.message}`);
  }

  const runId = runRow.id as string;
  let processed = 0;
  let updated = 0;
  let failed = 0;
  let changesDetected = 0;
  const alertCandidates: { companyName: string; slug: string; changes: FieldChange[] }[] = [];

  for (const company of companies) {
    processed++;

    const snapshot = await fetchBbbBusinessSnapshot({
      slug: company.slug,
      name: company.name,
      headquarters: company.headquarters,
      website: company.website,
      bbbBusinessId: company.bbb_business_id,
    });

    if (!snapshot) {
      failed++;
      errors.push(`${company.slug}: BBB lookup failed`);
      continue;
    }

    const dataHash = computeBbbDataHash(snapshot);
    const fieldChanges = detectFieldChanges(company, snapshot, dataHash);
    const hashChanged = company.bbb_data_hash !== dataHash;

    if (!hashChanged && company.bbb_last_checked) {
      await supabase
        .from('companies')
        .update({ bbb_last_checked: new Date().toISOString() })
        .eq('id', company.id);
      continue;
    }

    const reputationScore = computeReputationScore({
      overallRating: company.overall_rating ?? 0,
      reviewCount: company.review_count,
      fmcsaComplaints: company.fmcsa_complaints ?? 0,
      fmcsaShipments: company.fmcsa_shipments ?? 1000,
      bbbRating: snapshot.rating as any,
      bbbAccredited: snapshot.accredited,
      isVerified: company.is_verified,
      yearsInBusiness: company.years_in_business ?? 0,
    });

    const { error: updateError } = await supabase
      .from('companies')
      .update({
        bbb_rating: snapshot.rating,
        bbb_accredited: snapshot.accredited,
        complaints_last_36m: snapshot.complaintsLast36m,
        bbb_customer_reviews: snapshot.customerReviews,
        bbb_alert_count: snapshot.alertCount,
        bbb_business_id: `${snapshot.bbbId}-${snapshot.businessId}`,
        bbb_data_hash: dataHash,
        bbb_last_checked: new Date().toISOString(),
        bbb_raw: snapshot.raw,
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

      await supabase.from('bbb_change_log').insert(logRows);

      const material = fieldChanges.filter((c) => c.severity !== 'info');
      if (material.length) {
        alertCandidates.push({
          companyName: company.name,
          slug: company.slug,
          changes: material,
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
    .from('bbb_refresh_runs')
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
  revalidatePath('/admin/bbb');

  return result;
}

export async function getBbbRefreshStats() {
  if (!isSupabaseAdminConfigured()) {
    return { runs: [], changes: [], companyStats: null };
  }

  const supabase = createAdminClient();

  const [{ data: runs }, { data: changes }, { count: total }, { count: stale }] =
    await Promise.all([
      supabase
        .from('bbb_refresh_runs')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(10),
      supabase
        .from('bbb_change_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50),
      supabase.from('companies').select('id', { count: 'exact', head: true }),
      supabase
        .from('companies')
        .select('id', { count: 'exact', head: true })
        .or(`bbb_last_checked.is.null,bbb_last_checked.lt."${staleCutoffIso()}"`),
    ]);

  return {
    runs: runs ?? [],
    changes: changes ?? [],
    companyStats: {
      total: total ?? 0,
      stale: stale ?? 0,
    },
  };
}