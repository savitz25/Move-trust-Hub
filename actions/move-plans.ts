'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { computeMoveReadiness } from '@/lib/my-move-plan/readiness';
import type { MyMovePlanState } from '@/lib/my-move-plan/types';

/**
 * Live production schema (arepfylnilkjmyduhwbz):
 * id, user_id, label, payload, origin_label, destination_label,
 * readiness_score, archived_at, created_at, updated_at
 *
 * App maps to CloudMovePlanRow for UI/local library.
 */

export type CloudMovePlanRow = {
  id: string;
  name: string;
  plan: MyMovePlanState;
  readiness: number;
  archived: boolean;
  created_at: string;
  updated_at: string;
};

type LivePlanRow = {
  id: string;
  label: string | null;
  payload: unknown;
  readiness_score: number | null;
  archived_at: string | null;
  origin_label: string | null;
  destination_label: string | null;
  created_at: string;
  updated_at: string;
};

function placeLabelFromPlan(plan: MyMovePlanState, which: 'from' | 'to'): string | null {
  const place = which === 'from' ? plan.fromPlace : plan.toPlace;
  if (!place) return null;
  // best-effort string for optional columns
  const any = place as { label?: string; formattedAddress?: string; city?: string };
  return any.label || any.formattedAddress || any.city || null;
}

function mapLiveRow(row: LivePlanRow): CloudMovePlanRow {
  const plan = (row.payload ?? {}) as MyMovePlanState;
  return {
    id: row.id,
    name: row.label?.trim() || 'My Move Plan',
    plan,
    readiness: row.readiness_score ?? 0,
    archived: Boolean(row.archived_at),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function listCloudMovePlansAction(opts?: {
  includeArchived?: boolean;
}): Promise<{ plans: CloudMovePlanRow[]; error?: string }> {
  const user = await getAuthenticatedUser();
  if (!user) return { plans: [] };

  try {
    const supabase = await createClient();
    // Untyped table — production columns differ from older migration
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let q = (supabase as any)
      .from('saved_move_plans')
      .select(
        'id, label, payload, readiness_score, archived_at, origin_label, destination_label, created_at, updated_at'
      )
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (!opts?.includeArchived) {
      q = q.is('archived_at', null);
    }

    const { data, error } = await q;
    if (error) {
      console.error('[listCloudMovePlansAction] supabase', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      // Soft-fail: empty plans, optional error for UI toast (not fatal HQ wall)
      return { plans: [], error: error.message };
    }

    return {
      plans: ((data ?? []) as LivePlanRow[]).map(mapLiveRow),
    };
  } catch (e) {
    console.error('[listCloudMovePlansAction]', e);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const row = {
    label: input.name,
    payload: input.plan as unknown as Record<string, unknown>,
    readiness_score: readiness,
    archived_at: input.archived ? new Date().toISOString() : null,
    origin_label: placeLabelFromPlan(input.plan, 'from'),
    destination_label: placeLabelFromPlan(input.plan, 'to'),
  };

  if (input.cloudId) {
    const { data, error } = await db
      .from('saved_move_plans')
      .update(row)
      .eq('id', input.cloudId)
      .eq('user_id', user.id)
      .select('id')
      .maybeSingle();

    if (error) {
      console.error('[upsertCloudMovePlanAction] update', error);
      return { success: false, error: error.message };
    }
    revalidatePath('/my-move/reports');
    revalidatePath('/my-move');
    return { success: true, cloudId: data?.id ?? input.cloudId };
  }

  const { data, error } = await db
    .from('saved_move_plans')
    .insert({
      user_id: user.id,
      ...row,
    })
    .select('id')
    .single();

  if (error) {
    console.error('[upsertCloudMovePlanAction] insert', error);
    return { success: false, error: error.message };
  }
  revalidatePath('/my-move/reports');
  revalidatePath('/my-move');
  return { success: true, cloudId: data.id as string };
}

export async function deleteCloudMovePlanAction(
  cloudId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: 'Sign in required' };

  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('saved_move_plans')
    .delete()
    .eq('id', cloudId)
    .eq('user_id', user.id);

  if (error) {
    console.error('[deleteCloudMovePlanAction]', error);
    return { success: false, error: error.message };
  }
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('saved_move_plans')
    .update({
      archived_at: archived ? new Date().toISOString() : null,
    })
    .eq('id', cloudId)
    .eq('user_id', user.id);

  if (error) {
    console.error('[archiveCloudMovePlanAction]', error);
    return { success: false, error: error.message };
  }
  revalidatePath('/my-move/reports');
  revalidatePath('/my-move');
  return { success: true };
}
