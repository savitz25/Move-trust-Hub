import type { createClient } from '@/lib/supabase/server';

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/** Create user_profiles row on first sign-in (Google or magic link). Soft-fails if upsert blocked. */
export async function ensureUserProfile(
  supabase: SupabaseServerClient,
  user: { id: string; email?: string | null }
) {
  const { data: existing, error: selectError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (selectError) {
    console.error('[ensureUserProfile] select', {
      code: selectError.code,
      message: selectError.message,
      details: selectError.details,
    });
  }

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

  if (error) {
    console.error('[ensureUserProfile] upsert', {
      code: error.code,
      message: error.message,
      details: error.details,
    });
    // Soft-fail: HQ can render without a profile row
    return {
      id: user.id,
      email: user.email?.trim().toLowerCase() ?? '',
      marketing_opt_in: false,
      mover_alerts_opt_in: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }
  return created;
}
