/**
 * Shared Supabase environment configuration.
 * Never import service-role keys in client components.
 */
function readEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Reject placeholder / non-URL values so createClient never throws during
 * SSG (e.g. sitemap prerender with a malformed local .env).
 */
export function isValidSupabaseHttpUrl(url: string | undefined): boolean {
  if (!url) return false;
  if (/placeholder|your-project|example\.supabase/i.test(url)) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function getSupabaseUrl(): string | undefined {
  const url = readEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
  return isValidSupabaseHttpUrl(url) ? url : undefined;
}

export function getSupabaseAnonKey(): string | undefined {
  return readEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getSupabaseServiceRoleKey(): string | undefined {
  return readEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** True when public (anon) credentials are present — safe for browser + RSC reads. */
export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

/** True when privileged server key is present — admin dashboards, seeds, migrations. */
export function isSupabaseAdminConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseServiceRoleKey());
}

export function getAdminSecret(): string | undefined {
  return process.env.ADMIN_SECRET?.trim();
}