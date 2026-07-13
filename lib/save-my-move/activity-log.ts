import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

export type MyMoveActivityEventType =
  | 'email_inventory'
  | 'email_mover'
  | 'save_inventory'
  | 'save_mover'
  | 'save_comparison';

export async function logMyMoveActivity(
  userId: string,
  eventType: MyMoveActivityEventType,
  metadata: Record<string, unknown> = {}
): Promise<void> {
  if (!isSupabaseAdminConfigured()) return;

  try {
    const admin = createAdminClient();
    await admin.from('my_move_activity_events').insert({
      user_id: userId,
      event_type: eventType,
      metadata: metadata as Record<string, never>,
    });
  } catch (err) {
    console.error('[logMyMoveActivity]', eventType, err);
  }
}