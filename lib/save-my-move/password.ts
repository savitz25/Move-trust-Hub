import 'server-only';

import type { User } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { PORTAL_PASSWORD_ENABLED_KEY } from '@/lib/portal/password-meta';
import { mergeUserMetadata } from '@/lib/portal/password';
import {
  MY_MOVE_PASSWORD_ENABLED_KEY,
  MY_MOVE_PASSWORD_PROMPT_DISMISSED_KEY,
} from '@/lib/save-my-move/password-meta';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';

export {
  MY_MOVE_PASSWORD_ENABLED_KEY,
  MY_MOVE_PASSWORD_PROMPT_DISMISSED_KEY,
} from '@/lib/save-my-move/password-meta';
export { validateMyMovePassword } from '@/lib/save-my-move/password-validation';

export type MyMovePasswordStatus = {
  passwordEnabled: boolean;
  promptDismissed: boolean;
  /** Show one-time “create a password?” screen */
  shouldOfferCreatePassword: boolean;
};

/**
 * Password is shared at the Supabase Auth user level with the mover portal.
 * Treat either product flag as “password already available”.
 */
export function passwordStatusFromUser(user: User | null | undefined): MyMovePasswordStatus {
  if (!user) {
    return {
      passwordEnabled: false,
      promptDismissed: false,
      shouldOfferCreatePassword: false,
    };
  }
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const myMoveEnabled = meta[MY_MOVE_PASSWORD_ENABLED_KEY] === true;
  const portalEnabled = meta[PORTAL_PASSWORD_ENABLED_KEY] === true;
  const passwordEnabled = myMoveEnabled || portalEnabled;
  const promptDismissed = meta[MY_MOVE_PASSWORD_PROMPT_DISMISSED_KEY] === true;
  return {
    passwordEnabled,
    promptDismissed,
    shouldOfferCreatePassword: !passwordEnabled && !promptDismissed,
  };
}

export async function getMyMovePasswordStatus(): Promise<MyMovePasswordStatus | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return passwordStatusFromUser(user);
}

export { mergeUserMetadata };

/**
 * After customer sign-in: optionally offer create-password before destination.
 * Portal destinations are handled separately by portalPathAfterAuth.
 */
export async function myMovePathAfterAuth(nextPath: string): Promise<string> {
  const next = sanitizePostLoginPath(nextPath);

  if (
    next.startsWith('/my-move/create-password') ||
    next.startsWith('/portal')
  ) {
    return next;
  }

  try {
    const pw = await getMyMovePasswordStatus();
    if (pw?.shouldOfferCreatePassword) {
      return `/my-move/create-password?next=${encodeURIComponent(next)}`;
    }
  } catch {
    // continue to destination
  }

  return next;
}

/**
 * Invalidate password login only when neither My Move nor Portal still needs it.
 * Always clears the My Move enabled flag.
 */
export async function revokeMyMovePasswordLogin(
  userId: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseAdminConfigured()) {
    return {
      ok: false,
      error:
        'Password disable requires server admin configuration. Contact support if this persists.',
    };
  }
  try {
    const admin = createAdminClient();
    const { data, error: getErr } = await admin.auth.admin.getUserById(userId);
    if (getErr || !data.user) return { ok: false, error: getErr?.message ?? 'User not found' };

    const meta = (data.user.user_metadata ?? {}) as Record<string, unknown>;
    const portalStillEnabled = meta[PORTAL_PASSWORD_ENABLED_KEY] === true;

    const nextMeta = {
      ...meta,
      [MY_MOVE_PASSWORD_ENABLED_KEY]: false,
      [MY_MOVE_PASSWORD_PROMPT_DISMISSED_KEY]: true,
    };

    if (portalStillEnabled) {
      // Keep the shared Auth password for the mover portal.
      const { error } = await admin.auth.admin.updateUserById(userId, {
        user_metadata: nextMeta,
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    }

    const randomPassword = randomBytes(32).toString('base64url');
    const { error } = await admin.auth.admin.updateUserById(userId, {
      password: randomPassword,
      user_metadata: nextMeta,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Could not disable password' };
  }
}
