import type { createClient } from '@/lib/supabase/server';

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/** Create user_profiles row on first sign-in (Google or magic link). */
export async function ensureUserProfile(
  supabase: SupabaseServerClient,
  user: { id: string; email?: string | null }
) {
  const { data: existing } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (existing) return existing;

  const { data: created, error } = await supabase
    .from('user_profiles')
    .upsert(
      {
        id: user.id,
        email: user.email?.trim().toLowerCase() ?? '',
      },
      { onConflict: 'id' }
    )
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return created;
}