'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireAuthenticatedUser } from '@/lib/save-my-move/auth';
import type { InventoryItem } from '@/store/calculator-store';
import type { SavedInventoryPayload } from '@/lib/save-my-move/types';

function inventoryTotals(inventory: InventoryItem[]) {
  const totalVolume = inventory.reduce((s, i) => s + i.volume * i.quantity, 0);
  const totalItems = inventory.reduce((s, i) => s + i.quantity, 0);
  return { totalVolume, totalItems };
}

export async function saveInventoryAction(input: {
  name?: string;
  inventory: InventoryItem[];
  mode?: string;
  movePreset?: string | null;
  id?: string;
}) {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();
  const { totalVolume, totalItems } = inventoryTotals(input.inventory);
  const name = input.name?.trim() || 'My Move';

  if (input.id) {
    const { data, error } = await supabase
      .from('saved_inventories')
      .update({
        name,
        inventory: input.inventory,
        mode: input.mode ?? 'room',
        move_preset: input.movePreset ?? null,
        total_volume: totalVolume,
        total_items: totalItems,
      })
      .eq('id', input.id)
      .eq('user_id', user.id)
      .select('id')
      .single();
    if (error) throw new Error(error.message);
    revalidatePath('/my-move');
    return { id: data.id };
  }

  const { data, error } = await supabase
    .from('saved_inventories')
    .insert({
      user_id: user.id,
      name,
      inventory: input.inventory,
      mode: input.mode ?? 'room',
      move_preset: input.movePreset ?? null,
      total_volume: totalVolume,
      total_items: totalItems,
    })
    .select('id')
    .single();
  if (error) throw new Error(error.message);
  revalidatePath('/my-move');
  return { id: data.id };
}

export async function deleteInventoryAction(id: string) {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from('saved_inventories')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);
  if (error) throw new Error(error.message);
  revalidatePath('/my-move');
}

export async function saveMoverAction(input: { companySlug: string; notes?: string }) {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('saved_movers')
    .upsert(
      {
        user_id: user.id,
        company_slug: input.companySlug,
        notes: input.notes?.trim() || null,
      },
      { onConflict: 'user_id,company_slug' }
    )
    .select('id')
    .single();
  if (error) throw new Error(error.message);
  revalidatePath('/my-move');
  return { id: data.id };
}

export async function getSavedMoverSlugsAction(): Promise<string[]> {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('saved_movers')
    .select('company_slug')
    .eq('user_id', user.id);
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => row.company_slug);
}

export async function removeSavedMoverAction(id: string) {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from('saved_movers')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);
  if (error) throw new Error(error.message);
  revalidatePath('/my-move');
}

export async function updateMoverNotesAction(id: string, notes: string) {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from('saved_movers')
    .update({ notes: notes.trim() || null })
    .eq('id', id)
    .eq('user_id', user.id);
  if (error) throw new Error(error.message);
  revalidatePath('/my-move');
}

export async function saveComparisonAction(input: {
  companySlugs: string[];
  name?: string;
  id?: string;
}) {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();
  const name = input.name?.trim() || `Comparison (${input.companySlugs.length} movers)`;

  if (input.id) {
    const { data, error } = await supabase
      .from('saved_comparisons')
      .update({ company_slugs: input.companySlugs, name })
      .eq('id', input.id)
      .eq('user_id', user.id)
      .select('id')
      .single();
    if (error) throw new Error(error.message);
    revalidatePath('/my-move');
    return { id: data.id };
  }

  const { data, error } = await supabase
    .from('saved_comparisons')
    .insert({
      user_id: user.id,
      company_slugs: input.companySlugs,
      name,
    })
    .select('id')
    .single();
  if (error) throw new Error(error.message);
  revalidatePath('/my-move');
  return { id: data.id };
}

export async function deleteComparisonAction(id: string) {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from('saved_comparisons')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);
  if (error) throw new Error(error.message);
  revalidatePath('/my-move');
}

export async function mergeLocalDataAction(input: {
  inventory?: SavedInventoryPayload | null;
  compareSlugs?: string[];
}) {
  const user = await requireAuthenticatedUser();
  const results: { inventoryId?: string; comparisonId?: string } = {};

  if (input.inventory && input.inventory.inventory.length > 0) {
    const saved = await saveInventoryAction({
      name: 'Imported from this device',
      inventory: input.inventory.inventory,
      mode: input.inventory.mode,
      movePreset: input.inventory.movePreset,
    });
    results.inventoryId = saved.id;
  }

  if (input.compareSlugs && input.compareSlugs.length > 0) {
    const saved = await saveComparisonAction({
      companySlugs: input.compareSlugs,
      name: 'Imported comparison',
    });
    results.comparisonId = saved.id;
  }

  return results;
}

export async function getSavedInventoryAction(id: string) {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('saved_inventories')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function getCompanyNamesBySlugs(
  slugs: string[]
): Promise<Record<string, string>> {
  const unique = [...new Set(slugs.map((s) => s.trim()).filter(Boolean))];
  if (unique.length === 0) return {};

  const supabase = await createClient();
  const { data } = await supabase
    .from('companies')
    .select('slug, name')
    .in('slug', unique);

  const names: Record<string, string> = {};
  for (const row of data ?? []) {
    names[row.slug] = row.name;
  }
  for (const slug of unique) {
    if (!names[slug]) {
      names[slug] = slug.replace(/-/g, ' ');
    }
  }
  return names;
}

async function ensureUserProfile(
  supabase: Awaited<ReturnType<typeof createClient>>,
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

export async function getMyMoveDashboardData() {
  const user = await requireAuthenticatedUser();
  const supabase = await createClient();
  const profile = await ensureUserProfile(supabase, user);

  const [inventoriesRes, moversRes, comparisonsRes] = await Promise.all([
    supabase
      .from('saved_inventories')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false }),
    supabase
      .from('saved_movers')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false }),
    supabase
      .from('saved_comparisons')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
  ]);

  const moverSlugs = (moversRes.data ?? []).map((m) => m.company_slug);
  const comparisonSlugs = (comparisonsRes.data ?? []).flatMap((c) => c.company_slugs ?? []);
  const companyNames = await getCompanyNamesBySlugs([...moverSlugs, ...comparisonSlugs]);

  return {
    user: { id: user.id, email: user.email ?? profile.email ?? '' },
    profile,
    inventories: inventoriesRes.data ?? [],
    movers: moversRes.data ?? [],
    comparisons: comparisonsRes.data ?? [],
    companyNames,
  };
}