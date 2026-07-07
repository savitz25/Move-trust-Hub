import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { getSupabaseUrl, isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/config';
import {
  COMPANIES_RPC_SETUP_MESSAGE,
  COMPANIES_TABLE_SETUP_MESSAGE,
  isCompaniesTableUnavailableError,
} from '@/lib/suggestions/companies-table-error';
import { fetchDirectoryHealthRpc } from '@/lib/suggestions/publish-company-rpc';
import { seedCompanies } from '@/data/seed-companies';

export type DirectoryDbStatus = {
  supabaseConfigured: boolean;
  adminConfigured: boolean;
  supabaseProjectHost: string | null;
  companiesTableReadable: boolean;
  companiesPublishReady: boolean;
  publishUsesRpc: boolean;
  companiesRowCount: number;
  seedFallbackActive: boolean;
  suggestionsTableReadable: boolean;
  pendingSuggestions: number;
  approvedSuggestions: number;
  approvedWithoutCompany: number;
  message: string;
};

function supabaseHost(): string | null {
  const url = getSupabaseUrl();
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

export async function getDirectoryDbStatus(): Promise<DirectoryDbStatus> {
  const base: DirectoryDbStatus = {
    supabaseConfigured: isSupabaseConfigured(),
    adminConfigured: isSupabaseAdminConfigured(),
    supabaseProjectHost: supabaseHost(),
    companiesTableReadable: false,
    companiesPublishReady: false,
    publishUsesRpc: false,
    companiesRowCount: 0,
    seedFallbackActive: true,
    suggestionsTableReadable: false,
    pendingSuggestions: 0,
    approvedSuggestions: 0,
    approvedWithoutCompany: 0,
    message: 'Checking directory database…',
  };

  if (!isSupabaseAdminConfigured()) {
    return {
      ...base,
      message:
        'Supabase admin is not configured. Directory is serving bundled seed companies only.',
    };
  }

  const admin = createAdminClient();
  const health = await fetchDirectoryHealthRpc(admin);

  let rowCount = 0;
  let readable = false;
  let publishReady = false;
  let publishUsesRpc = false;

  if (health?.companies_table_exists) {
    readable = true;
    rowCount = health.companies_row_count ?? 0;
    publishReady = true;
    publishUsesRpc = true;
  }

  const { count: restCount, error: companiesError } = await admin
    .from('companies')
    .select('id', { count: 'exact', head: true });

  if (!companiesError) {
    readable = true;
    rowCount = restCount ?? rowCount;
    publishReady = true;
  } else if (!health?.companies_table_exists) {
    const missingTable = isCompaniesTableUnavailableError(
      companiesError.message,
      companiesError.code
    );

    return {
      ...base,
      message: missingTable ? COMPANIES_TABLE_SETUP_MESSAGE : `Cannot read public.companies: ${companiesError.message}`,
    };
  } else {
    publishUsesRpc = true;
    publishReady = true;
  }

  if (health && !publishReady) {
    if (!health.companies_table_exists) {
      return {
        ...base,
        message: COMPANIES_TABLE_SETUP_MESSAGE,
      };
    }
  }

  if (readable && !publishReady && health?.companies_table_exists) {
    publishReady = true;
    publishUsesRpc = true;
  }

  const seedFallback = rowCount === 0;

  const pendingSuggestions =
    health?.suggestions_pending ??
    (
      await admin
        .from('company_suggestions')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending')
    ).count ??
    0;

  const { count: approvedCount, error: approvedError } = await admin
    .from('company_suggestions')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'approved');

  let approvedWithoutCompany = 0;
  if (!approvedError) {
    const { data: approvedRows } = await admin
      .from('company_suggestions')
      .select('id, company_id')
      .eq('status', 'approved');

    for (const row of approvedRows ?? []) {
      if (!row.company_id) {
        approvedWithoutCompany++;
      }
    }
  }

  let message: string;
  if (!publishReady) {
    message = COMPANIES_RPC_SETUP_MESSAGE;
  } else if (publishUsesRpc && companiesError) {
    message =
      `PostgreSQL has public.companies (${rowCount} rows) but the REST API cannot insert directly — approvals will use the publish RPC.`;
  } else if (seedFallback) {
    message =
      `public.companies is ready but has 0 rows. The live site is showing ${seedCompanies.length} bundled seed movers until you approve suggestions.`;
  } else {
    message = `Directory database is active with ${rowCount} published mover${rowCount === 1 ? '' : 's'}.`;
  }

  if (approvedWithoutCompany > 0) {
    message += ` ${approvedWithoutCompany} approved suggestion${approvedWithoutCompany === 1 ? '' : 's'} still need publishing.`;
  }

  return {
    supabaseConfigured: isSupabaseConfigured(),
    adminConfigured: true,
    supabaseProjectHost: supabaseHost(),
    companiesTableReadable: readable,
    companiesPublishReady: publishReady,
    publishUsesRpc,
    companiesRowCount: rowCount,
    seedFallbackActive: seedFallback,
    suggestionsTableReadable: health?.suggestions_pending != null || pendingSuggestions >= 0,
    pendingSuggestions,
    approvedSuggestions: approvedCount ?? 0,
    approvedWithoutCompany,
    message,
  };
}