/**
 * Shared Supabase environment configuration.
 * Never import service-role keys in client components.
 */
function readEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function getSupabaseUrl(): string | undefined {
  return readEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
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