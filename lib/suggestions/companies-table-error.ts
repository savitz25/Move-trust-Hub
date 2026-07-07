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
  'The Supabase API cannot see public.companies yet. In Supabase SQL Editor, run supabase/migrations/20260708140000_ensure_companies_directory.sql, then run supabase/runbooks/fix-companies-approve.sql, then Settings → API → Reload schema. Wait one minute and approve again.';