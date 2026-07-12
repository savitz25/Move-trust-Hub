'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAuthenticatedUser } from '@/lib/save-my-move/auth';

export async function updateEmailPreferencesAction(input: {
  marketingOptIn: boolean;
  moverAlertsOptIn: boolean;
}) {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from('user_profiles')
    .update({
      marketing_opt_in: input.marketingOptIn,
      mover_alerts_opt_in: input.moverAlertsOptIn,
    })
    .eq('id', user.id);
  if (error) throw new Error(error.message);
  revalidatePath('/my-move');
}

export async function exportAccountDataAction() {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();

  const [profile, inventories, movers, comparisons] = await Promise.all([
    supabase.from('user_profiles').select('*').eq('id', user.id).maybeSingle(),
    supabase.from('saved_inventories').select('*').eq('user_id', user.id),
    supabase.from('saved_movers').select('*').eq('user_id', user.id),
    supabase.from('saved_comparisons').select('*').eq('user_id', user.id),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    email: user.email,
    profile: profile.data,
    savedInventories: inventories.data ?? [],
    savedMovers: movers.data ?? [],
    savedComparisons: comparisons.data ?? [],
  };
}

export async function deleteAccountAction() {
  const user = await requireAuthenticatedUser();
  let admin;
  try {
    admin = createAdminClient();
  } catch {
    throw new Error('Account deletion unavailable');
  }

  // Cascade via FK deletes user_profiles, saved_inventories, saved_movers, saved_comparisons
  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) throw new Error(error.message);

  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/my-move');
  return { deleted: true };
}