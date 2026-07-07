import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/config';
import {
  COMPANIES_TABLE_SETUP_MESSAGE,
  isCompaniesTableUnavailableError,
} from '@/lib/suggestions/companies-table-error';
import { seedCompanies } from '@/data/seed-companies';

const DIRECTORY_PROBE_ID = '__mth_directory_probe__';

export type DirectoryDbStatus = {
  supabaseConfigured: boolean;
  adminConfigured: boolean;
  companiesTableReadable: boolean;
  companiesPublishReady: boolean;
  companiesRowCount: number;
  seedFallbackActive: boolean;
  suggestionsTableReadable: boolean;
  pendingSuggestions: number;
  approvedSuggestions: number;
  approvedWithoutCompany: number;
  message: string;
};

export async function getDirectoryDbStatus(): Promise<DirectoryDbStatus> {
  const base: DirectoryDbStatus = {
    supabaseConfigured: isSupabaseConfigured(),
    adminConfigured: isSupabaseAdminConfigured(),
    companiesTableReadable: false,
    companiesPublishReady: false,
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

  const { count: companyCount, error: companiesError } = await admin
    .from('companies')
    .select('id', { count: 'exact', head: true });

  if (companiesError) {
    const missingTable = isCompaniesTableUnavailableError(
      companiesError.message,
      companiesError.code
    );

    return {
      ...base,
      message: missingTable ? COMPANIES_TABLE_SETUP_MESSAGE : `Cannot read public.companies: ${companiesError.message}`,
    };
  }

  const readable = true;
  const rowCount = companyCount ?? 0;
  const seedFallback = rowCount === 0;

  let publishReady = false;
  const { error: probeError } = await admin.from('companies').insert({
    id: DIRECTORY_PROBE_ID,
    slug: DIRECTORY_PROBE_ID,
    name: 'Directory publish probe',
  });

  if (!probeError) {
    await admin.from('companies').delete().eq('id', DIRECTORY_PROBE_ID);
    publishReady = true;
  } else if (probeError.code === '23505') {
    await admin.from('companies').delete().eq('id', DIRECTORY_PROBE_ID);
    publishReady = true;
  } else if (isCompaniesTableUnavailableError(probeError.message, probeError.code)) {
    publishReady = false;
  } else {
    publishReady = true;
  }

  const { count: pendingCount, error: pendingError } = await admin
    .from('company_suggestions')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'pending');

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
        continue;
      }
      const { data: linked } = await admin
        .from('companies')
        .select('id')
        .eq('id', row.company_id)
        .maybeSingle();
      if (!linked) approvedWithoutCompany++;
    }
  }

  let message: string;
  if (!publishReady) {
    message = COMPANIES_TABLE_SETUP_MESSAGE;
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
    companiesTableReadable: readable,
    companiesPublishReady: publishReady,
    companiesRowCount: rowCount,
    seedFallbackActive: seedFallback,
    suggestionsTableReadable: !pendingError,
    pendingSuggestions: pendingCount ?? 0,
    approvedSuggestions: approvedCount ?? 0,
    approvedWithoutCompany,
    message,
  };
}