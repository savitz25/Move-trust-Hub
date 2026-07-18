'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { computeMoveReadiness } from '@/lib/my-move-plan/readiness';
import type { MyMovePlanState } from '@/lib/my-move-plan/types';

export type CloudMovePlanRow = {
  id: string;
  name: string;
  plan: MyMovePlanState;
  readiness: number;
  archived: boolean;
  created_at: string;
  updated_at: string;
};

export async function listCloudMovePlansAction(opts?: {
  includeArchived?: boolean;
}): Promise<{ plans: CloudMovePlanRow[]; error?: string }> {
  const user = await getAuthenticatedUser();
  if (!user) return { plans: [] };

  try {
    const supabase = await createClient();
    let q = supabase
      .from('saved_move_plans')
      .select('id, name, plan, readiness, archived, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (!opts?.includeArchived) {
      q = q.eq('archived', false);
    }

    const { data, error } = await q;
    if (error) {
      // Table may not exist yet in some envs
      return { plans: [], error: error.message };
    }

    return {
      plans: (data ?? []).map((row) => ({
        id: row.id,
        name: row.name,
        plan: row.plan as MyMovePlanState,
        readiness: row.readiness ?? 0,
        archived: Boolean(row.archived),
        created_at: row.created_at,
        updated_at: row.updated_at,
      })),
    };
  } catch (e) {
    return {
      plans: [],
      error: e instanceof Error ? e.message : 'Could not load plans',
    };
  }
}

export async function upsertCloudMovePlanAction(input: {
  cloudId?: string | null;
  name: string;
  plan: MyMovePlanState;
  archived?: boolean;
}): Promise<{ success: boolean; cloudId?: string; error?: string }> {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: 'Sign in required' };

  const readiness = computeMoveReadiness(input.plan);
  const supabase = await createClient();

  if (input.cloudId) {
    const { data, error } = await supabase
      .from('saved_move_plans')
      .update({
        name: input.name,
        plan: input.plan as unknown as Record<string, unknown>,
        readiness,
        archived: input.archived ?? false,
      })
      .eq('id', input.cloudId)
      .eq('user_id', user.id)
      .select('id')
      .maybeSingle();

    if (error) return { success: false, error: error.message };
    revalidatePath('/my-move/reports');
    revalidatePath('/my-move');
    return { success: true, cloudId: data?.id ?? input.cloudId };
  }

  const { data, error } = await supabase
    .from('saved_move_plans')
    .insert({
      user_id: user.id,
      name: input.name,
      plan: input.plan as unknown as Record<string, unknown>,
      readiness,
      archived: input.archived ?? false,
    })
    .select('id')
    .single();

  if (error) return { success: false, error: error.message };
  revalidatePath('/my-move/reports');
  revalidatePath('/my-move');
  return { success: true, cloudId: data.id };
}

export async function deleteCloudMovePlanAction(
  cloudId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: 'Sign in required' };

  const supabase = await createClient();
  const { error } = await supabase
    .from('saved_move_plans')
    .delete()
    .eq('id', cloudId)
    .eq('user_id', user.id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/my-move/reports');
  revalidatePath('/my-move');
  return { success: true };
}

export async function archiveCloudMovePlanAction(
  cloudId: string,
  archived: boolean
): Promise<{ success: boolean; error?: string }> {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: 'Sign in required' };

  const supabase = await createClient();
  const { error } = await supabase
    .from('saved_move_plans')
    .update({ archived })
    .eq('id', cloudId)
    .eq('user_id', user.id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/my-move/reports');
  revalidatePath('/my-move');
  return { success: true };
}
