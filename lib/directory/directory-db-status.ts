import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/config';
import { seedCompanies } from '@/data/seed-companies';

export type DirectoryDbStatus = {
  supabaseConfigured: boolean;
  adminConfigured: boolean;
  companiesTableReadable: boolean;
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
    const missingTable =
      companiesError.message.includes('does not exist') ||
      companiesError.message.includes('schema cache') ||
      companiesError.code === '42P01';

    return {
      ...base,
      message: missingTable
        ? 'public.companies table is missing. Approved movers cannot be published until you run supabase/migrations/20260708140000_ensure_companies_directory.sql.'
        : `Cannot read public.companies: ${companiesError.message}`,
    };
  }

  const readable = true;
  const rowCount = companyCount ?? 0;
  const seedFallback = rowCount === 0;

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
  if (seedFallback) {
    message =
      `public.companies exists but has 0 rows. The live site is showing ${seedCompanies.length} bundled seed movers. Approve or publish suggestions to populate the directory.`;
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
    companiesRowCount: rowCount,
    seedFallbackActive: seedFallback,
    suggestionsTableReadable: !pendingError,
    pendingSuggestions: pendingCount ?? 0,
    approvedSuggestions: approvedCount ?? 0,
    approvedWithoutCompany,
    message,
  };
}