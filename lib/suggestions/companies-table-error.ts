export function isCompaniesTableUnavailableError(
  message?: string | null,
  code?: string | null
): boolean {
  if (!message) return false;
  const lower = message.toLowerCase();
  return (
    code === '42P01' ||
    code === 'PGRST205' ||
    (lower.includes('public.companies') && lower.includes('schema cache')) ||
    (lower.includes('relation') && lower.includes('does not exist') && lower.includes('companies'))
  );
}

export const COMPANIES_TABLE_SETUP_MESSAGE =
  'Directory publish is not ready. In Supabase SQL Editor run, in order: (1) supabase/migrations/20260708140000_ensure_companies_directory.sql, (2) supabase/migrations/20260709140000_publish_directory_company_rpc.sql, (3) notify pgrst, \'reload schema\'; then Settings → API → Reload schema. Confirm Vercel NEXT_PUBLIC_SUPABASE_URL matches this project.';

export const COMPANIES_RPC_SETUP_MESSAGE =
  'Run supabase/migrations/20260709140000_publish_directory_company_rpc.sql in Supabase SQL Editor, reload API schema, then approve again. This adds a publish function that works even when the API table cache is stale.';